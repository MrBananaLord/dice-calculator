const Token      = require('../models/tokens/token.js');
const Adder      = require('../models/tokens/adder.js');
const Bracket    = require('../models/tokens/bracket.js');
const Divider    = require('../models/tokens/divider.js');
const Multiplier = require('../models/tokens/multiplier.js');
const Numeral    = require('../models/tokens/numeral.js');
const Subtractor = require('../models/tokens/subtractor.js');
const Tokenizer  = require('../models/tokenizer.js');

var assert = require('assert');

describe('Tokenizer', function() {
  describe('.tokens()', function() {
    it('returns all Token subclasses', function() {
      assert.deepStrictEqual(Tokenizer.tokens, [Adder, Divider, Multiplier, Subtractor, Bracket, Numeral, Token]);
    });
  });

  describe('.buildToken()', function() {
    it('instantiates and returns appropriate token', function() {
      assert.deepStrictEqual(Tokenizer.buildToken('123'), new Numeral('123'));
      assert.deepStrictEqual(Tokenizer.buildToken(''), new Token(''));
      assert.deepStrictEqual(Tokenizer.buildToken('['), new Bracket('['));
      assert.deepStrictEqual(Tokenizer.buildToken('+'), new Adder('+'));
      assert.deepStrictEqual(Tokenizer.buildToken('/'), new Divider('/'));
      assert.deepStrictEqual(Tokenizer.buildToken('*'), new Multiplier('*'));
      assert.deepStrictEqual(Tokenizer.buildToken('-'), new Subtractor('-'));
    });
  });
});
