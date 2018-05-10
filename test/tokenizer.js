describe('Tokenizer', function() {
  describe('.tokens', function() {
    it('returns all Token subclasses', function() {
      chai.assert.deepStrictEqual(Tokenizer.tokens, [Adder, Divider, Multiplier, Subtractor, Bracket, Numeral, Roll, Token]);
    });
  });

  describe('.buildToken(string)', function() {
    it('instantiates and returns appropriate token', function() {
      chai.assert.deepStrictEqual(Tokenizer.buildToken('123'), new Numeral('123'));
      chai.assert.deepStrictEqual(Tokenizer.buildToken(''), new Token(''));
      chai.assert.deepStrictEqual(Tokenizer.buildToken('['), new Bracket('['));
      chai.assert.deepStrictEqual(Tokenizer.buildToken('+'), new Adder('+'));
      chai.assert.deepStrictEqual(Tokenizer.buildToken('/'), new Divider('/'));
      chai.assert.deepStrictEqual(Tokenizer.buildToken('*'), new Multiplier('*'));
      chai.assert.deepStrictEqual(Tokenizer.buildToken('-'), new Subtractor('-'));
      chai.assert.deepStrictEqual(Tokenizer.buildToken('2d6'), new Roll('2d6'));
    });
  });

  describe('#lastToken', function() {
    let tokenizer = new Tokenizer('');

    context('when there are no tokens', function() {
      before(function() {
        tokenizer.tokens = [];
      });

      it('returns undefined', function() {
        chai.expect(tokenizer.lastToken).to.equal(undefined);
      });
    });

    context('when there are tokens', function() {
      before(function() {
        tokenizer.tokens = [1,2,3];
      });

      it('returns last one', function() {
        chai.expect(tokenizer.lastToken).to.equal(3);
      });
    });
  });

  describe('#run()', function() {
    it('converts string to tokens', function() {
      let tokenizer = new Tokenizer('2* 5d6-1 / (1d+d5 * 3 *2d70)');

      chai.expect(tokenizer.run().length).to.equal(15);
    });

    it('converts string to tokens', function() {
      let tokenizer = new Tokenizer('(9d1099((()))+)');

      chai.expect(tokenizer.run().length).to.equal(10);
    });

    it('ignores unknown tokens', function() {
      let tokenizer = new Tokenizer('qwlekj ;]./"d"');

      chai.expect(tokenizer.run().length).to.equal(3);
    });
  });
});
