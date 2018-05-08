describe('Tokenizer', function() {
  describe('.tokens()', function() {
    it('returns all Token subclasses', function() {
      chai.assert.deepStrictEqual(Tokenizer.tokens, [Adder, Divider, Multiplier, Subtractor, Bracket, Numeral, Token]);
    });
  });

  describe('.buildToken()', function() {
    it('instantiates and returns appropriate token', function() {
      chai.assert.deepStrictEqual(Tokenizer.buildToken('123'), new Numeral('123'));
      chai.assert.deepStrictEqual(Tokenizer.buildToken(''), new Token(''));
      chai.assert.deepStrictEqual(Tokenizer.buildToken('['), new Bracket('['));
      chai.assert.deepStrictEqual(Tokenizer.buildToken('+'), new Adder('+'));
      chai.assert.deepStrictEqual(Tokenizer.buildToken('/'), new Divider('/'));
      chai.assert.deepStrictEqual(Tokenizer.buildToken('*'), new Multiplier('*'));
      chai.assert.deepStrictEqual(Tokenizer.buildToken('-'), new Subtractor('-'));
    });
  });
});
