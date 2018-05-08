var Equasion = require('../models/equasion.js');
var assert   = require('assert');

describe('Equasion', function() {
  describe('#postfix', function() {
    it('returns postfix', function() {
      var equasion = new Equasion('301 + 4 * (20 - 1)');

      assert.equal(equasion.postfix, '301 4 20 1 - * +');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('3 * (2 + 5)');

      assert.equal(equasion.postfix, '3 2 5 + *');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('((((1*(2+3))-3)+4)*5)');

      assert.equal(equasion.postfix, '1 2 3 + * 3 - 4 + 5 *');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('(300+23)*(43-21)/(84+7)');

      assert.equal(equasion.postfix, '300 23 + 43 21 - * 84 7 + /');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('(4+8)*(6-5)/((3-2)*(2+2))');

      assert.equal(equasion.postfix, '4 8 + 6 5 - * 3 2 - 2 2 + * /');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('( (10+20) + 30 ) * 20-8/4');

      assert.equal(equasion.postfix, '10 20 + 30 + 20 * 8 4 / -');
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
