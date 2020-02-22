describe('Tokenizer', () => {
  describe('.tokens', () => {
    it('returns all Token subclasses', () => {
      chai.assert.deepStrictEqual(Tokenizer.tokens, [Adder, Divider, Multiplier, Subtractor, Bracket, Numeral, Roll, Token]);
    });
  });

  describe('#buildToken(string)', () => {
    let tokenizer = new Tokenizer();
    let FakeToken = class FakeToken extends Token {};
    let canInstantiateStub = sinon.stub(FakeToken, 'canBeInstantiatedFrom');
    let tokensStub = sinon.stub(tokenizer, 'tokens');

    before(() => { tokensStub.get(() => [FakeToken, Token]) });
    before(() => { tokensStub.restore() });

    context('when any class can be instantiated', () => {
      it('instantiates and returns appropriate token', () => {
        canInstantiateStub.returns(true);

        chai.expect(tokenizer.buildToken('foo')).to.deep.equal(new FakeToken('foo'));
      });
    });

    context('when none of specific classes can be instantiated', () => {
      it('instantiates basic Token', () => {
        canInstantiateStub.returns(false);

        chai.expect(tokenizer.buildToken('foo')).to.deep.equal(new Token('foo'));
      });
    });
  });

  describe('#lastToken', () => {
    let tokenizer = new Tokenizer();

    context('when there are no tokens', () => {
      it('returns undefined', () => {
        chai.expect(tokenizer.lastToken).to.equal(undefined);
      });
    });

    context('when there are tokens', () => {
      it('returns last one', () => {
        let lastToken = new Numeral('2');

        tokenizer.addToken(new Operator('+'));
        tokenizer.addToken(lastToken);

        chai.expect(tokenizer.lastToken).to.deep.equal(lastToken);
      });
    });
  });

  describe('#addCharacter(character)', () => {
    it('builds token and adds it to queue', () => {
      let character = '3';
      let tokenizer = new Tokenizer();
      let token = new Token(character);
      let spy = sinon.spy(tokenizer, 'addToken');

      sinon.stub(tokenizer, 'buildToken').withArgs(character).returns(token);

      tokenizer.addCharacter(character);

      sinon.assert.calledWith(spy, token);
    });
  });

  describe('#addToken()', () => {
    let tokenizer = new Tokenizer();

    beforeEach(() => { tokenizer.tokens = []; });

    context('for regular Token', () => {
      it('does not add Token to queue', () => {
        tokenizer.addToken(new Token('s'));

        chai.expect(tokenizer.tokens).to.deep.equal([]);
      });
    });

    context('for special roll Token', () => {
      it('adds Token to queue', () => {
        let token = new Roll('d');
        tokenizer.addToken(token);

        chai.expect(tokenizer.tokens).to.deep.equal([token]);
      });
    });

    context('for other Tokens', () => {
      it('adds Token to queue', () => {
        let token = new Numeral('3');
        tokenizer.addToken(token);

        chai.expect(tokenizer.tokens).to.deep.equal([token]);
      });

      it('adds Token to queue', () => {
        let token = new Bracket('(');
        tokenizer.addToken(token);

        chai.expect(tokenizer.tokens).to.deep.equal([token]);
      });
    });

    context('when new token can be merged to previous token', () => {
      context('for dice roll after a number', () => {
        it('merges two tokens', () => {
          let token = new Numeral('6');
          tokenizer.addToken(token);

          let newToken = new Roll('d');
          tokenizer.addToken(newToken);

          chai.expect(tokenizer.tokens).to.deep.equal([new Roll('6d')]);
        });
      });

      context('for dice roll after same dice roll', () => {
        it('merges two tokens', () => {
          let token = new Roll('d');
          tokenizer.addToken(token);

          let newToken = new Roll('d');
          tokenizer.addToken(newToken);

          chai.expect(tokenizer.tokens).to.deep.equal([new Roll('2d')]);
        });

        it('merges two tokens', () => {
          let token = new Roll('d4');
          tokenizer.addToken(token);

          let newToken = new Roll('d4');
          tokenizer.addToken(newToken);

          chai.expect(tokenizer.tokens).to.deep.equal([new Roll('2d4')]);
        });
      });
    });
  });

  describe('#reset()', () => {
    let tokenizer = new Tokenizer();

    beforeEach(() => { tokenizer.tokens = [new Token('s')]; });

    it('removes all tokens from the list', () => {
      tokenizer.reset();

      chai.expect(tokenizer.tokens).to.deep.equal([]);
    });
  });

  describe('#fromString()', () => {
    let tokenizer = new Tokenizer();

    it('resets the list', () => {
      tokenizer.tokens = [new Token('s')];

      tokenizer.fromString('');

      chai.expect(tokenizer.tokens).to.deep.equal([]);
    });

    it('converts the string to token list', () => {
      let expectedTokens = [new Roll('3d6'), new Adder('+'), new Numeral('2')];

      tokenizer.fromString('3d6+2');

      chai.expect(tokenizer.tokens).to.deep.equal(expectedTokens);
    });
  });
});
