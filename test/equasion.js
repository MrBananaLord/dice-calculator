var Equasion = require('../models/equasion.js');
var assert   = require('assert');

describe('Equasion', function() {
  describe('#toPostfix()', function() {
    it('converts infix to postfix', function() {
      var equasion = new Equasion('3 + 4 * (2 - 1)');

      assert.equal(equasion.toPostfix(), '3 4 2 1 - * +');
    });
  });

  // describe('#resolve()', function() {
  //   it('returns proper result', function() {
  //     var equasion = new Equasion('6');
  //
  //     assert.equal(equasion.resolve(), 6);
  //   });
  //
  //   it('returns proper result', function() {
  //     var equasion = new Equasion('6+2');
  //
  //     assert.equal(equasion.resolve(), 8);
  //   });
  // });
});
