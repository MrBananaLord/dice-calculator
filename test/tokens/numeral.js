var Numeral = require('../../models/tokens/numeral.js');
var assert  = require('assert');

describe('Numeral', function() {
  describe('.canBeInstanciatedFrom()', function() {
    context('for number', function() {
      it('returns true', function() {
        assert.equal(Numeral.canBeInstanciatedFrom('4823'), true);
        assert.equal(Numeral.canBeInstanciatedFrom('0'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        assert.equal(Numeral.canBeInstanciatedFrom(']'), false);
        assert.equal(Numeral.canBeInstanciatedFrom(' '), false);
        assert.equal(Numeral.canBeInstanciatedFrom(''), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "number"', function() {
      let numeral = new Numeral('1');

      assert.equal(numeral.type, 'number');
    });
  });

  describe('#number', function() {
    it('returns true', function() {
      let numeral = new Numeral('1');

      assert.equal(numeral.number, true);
    });
  });

});
