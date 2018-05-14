describe('Tokenizer', () => {
  describe('.tokens', () => {
    it('returns all Token subclasses', () => {
      chai.assert.deepStrictEqual(Tokenizer.tokens, [Adder, Divider, Multiplier, Subtractor, Bracket, Numeral, Roll, Token]);
    });
  });

  describe('.buildToken(string)', () => {
    let FakeToken = class FakeToken extends Token {};
    let canInstantiateStub = sinon.stub(FakeToken, 'canBeInstantiatedFrom');
    let tokensStub = sinon.stub(Tokenizer, 'tokens');

    before(() => { tokensStub.get(() => [FakeToken, Token]) });
    before(() => { tokensStub.restore() });

    context('when any class can be instantiated', () => {
      it('instantiates and returns appropriate token', () => {
        canInstantiateStub.returns(true);

        chai.expect(Tokenizer.buildToken('foo')).to.deep.equal(new FakeToken('foo'));
      });
    });

    context('when none of specific classes can be instantiated', () => {
      it('instantiates basic Token', () => {
        canInstantiateStub.returns(false);

        chai.expect(Tokenizer.buildToken('foo')).to.deep.equal(new Token('foo'));
      });
    });
  });

  describe('#lastToken', () => {
    let tokenizer = new Tokenizer('');

    context('when there are no tokens', () => {
      before(() => {
        tokenizer.tokens = [];
      });

      it('returns undefined', () => {
        chai.expect(tokenizer.lastToken).to.equal(undefined);
      });
    });

    context('when there are tokens', () => {
      before(() => {
        tokenizer.tokens = [1,2,3];
      });

      it('returns last one', () => {
        chai.expect(tokenizer.lastToken).to.equal(3);
      });
    });
  });

  describe('#run()', () => {
    it('converts string to tokens', () => {
      let tokenizer = new Tokenizer('2* 5d6-1 / (1d+d5 * 3 *2d70)');

      chai.expect(tokenizer.run().length).to.equal(15);
    });

    it('converts string to tokens', () => {
      let tokenizer = new Tokenizer('(9d1099((()))+)');

      chai.expect(tokenizer.run().length).to.equal(10);
    });

    it('ignores unknown tokens', () => {
      let tokenizer = new Tokenizer('qwlekj ;]./"d"');

      chai.expect(tokenizer.run().length).to.equal(3);
    });
  });
});
