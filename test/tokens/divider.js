const Divider = require('../../models/tokens/Divider.js');
var assert  = require('assert');

describe('Divider', function() {
  describe('.canBeInstanciatedFrom()', function() {
    context('for /', function() {
      it('returns true', function() {
        assert.equal(Divider.canBeInstanciatedFrom('/'), true);
      });
    });

    context('for ÷', function() {
      it('returns true', function() {
        assert.equal(Divider.canBeInstanciatedFrom('÷'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        assert.equal(Divider.canBeInstanciatedFrom(']'), false);
        assert.equal(Divider.canBeInstanciatedFrom(' '), false);
        assert.equal(Divider.canBeInstanciatedFrom('+'), false);
        assert.equal(Divider.canBeInstanciatedFrom(''), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "operator"', function() {
      let divider = new Divider('/');

      assert.equal(divider.type, 'operator');
    });
  });
});
