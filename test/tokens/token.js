const Token = require('../../models/tokens/token.js');
var assert  = require('assert');

describe('Token', function() {
  describe('#number', function() {
    it('returns false', function() {
      let token = new Token('');

      assert.equal(token.number, false);
    });
  });
});
