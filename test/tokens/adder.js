const Adder = require('../../models/tokens/Adder.js');
var assert  = require('assert');

describe('Adder', function() {
  describe('.canBeInstanciatedFrom()', function() {
    context('for +', function() {
      it('returns true', function() {
        assert.equal(Adder.canBeInstanciatedFrom('+'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        assert.equal(Adder.canBeInstanciatedFrom(']'), false);
        assert.equal(Adder.canBeInstanciatedFrom(' '), false);
        assert.equal(Adder.canBeInstanciatedFrom('1'), false);
        assert.equal(Adder.canBeInstanciatedFrom(''), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "operator"', function() {
      let adder = new Adder('+');

      assert.equal(adder.type, 'operator');
    });
  });
});
