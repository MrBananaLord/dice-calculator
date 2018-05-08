const Multiplier = require('../../models/tokens/Multiplier.js');
var assert       = require('assert');

describe('Multiplier', function() {
  describe('.canBeInstanciatedFrom()', function() {
    context('for *', function() {
      it('returns true', function() {
        assert.equal(Multiplier.canBeInstanciatedFrom('*'), true);
      });
    });

    context('for ×', function() {
      it('returns true', function() {
        assert.equal(Multiplier.canBeInstanciatedFrom('×'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        assert.equal(Multiplier.canBeInstanciatedFrom(']'), false);
        assert.equal(Multiplier.canBeInstanciatedFrom(' '), false);
        assert.equal(Multiplier.canBeInstanciatedFrom('+'), false);
        assert.equal(Multiplier.canBeInstanciatedFrom(''), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "operator"', function() {
      let multiplier = new Multiplier('*');

      assert.equal(multiplier.type, 'operator');
    });
  });
});
