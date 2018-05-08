const Subtractor = require('../../models/tokens/Subtractor.js');
var assert       = require('assert');

describe('Subtractor', function() {
  describe('.canBeInstanciatedFrom()', function() {
    context('for -', function() {
      it('returns true', function() {
        assert.equal(Subtractor.canBeInstanciatedFrom('-'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        assert.equal(Subtractor.canBeInstanciatedFrom(']'), false);
        assert.equal(Subtractor.canBeInstanciatedFrom(' '), false);
        assert.equal(Subtractor.canBeInstanciatedFrom('+'), false);
        assert.equal(Subtractor.canBeInstanciatedFrom(''), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "operator"', function() {
      let subtractor = new Subtractor('-');

      assert.equal(subtractor.type, 'operator');
    });
  });
});
