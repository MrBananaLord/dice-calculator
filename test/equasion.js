var Equasion = require('../models/equasion.js');
var assert   = require('assert');

describe('Equasion', function() {
  describe('#postfix', function() {
    it('returns postfix', function() {
      var equasion = new Equasion('301 + 4 * (20 - 1)');

      assert.equal(equasion.postfix, '301 4 20 1 - * +');
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
