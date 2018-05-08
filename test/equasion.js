describe('Equasion', function() {
  describe('#postfix', function() {
    it('returns postfix', function() {
      var equasion = new Equasion('301 + 4 * (20 - 1)');

      chai.assert.equal(equasion.postfix, '301 4 20 1 - * +');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('3 * (2 + 5)');

      chai.assert.equal(equasion.postfix, '3 2 5 + *');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('((((1*(2+3))-3)+4)*5)');

      chai.assert.equal(equasion.postfix, '1 2 3 + * 3 - 4 + 5 *');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('(300+23)*(43-21)/(84+7)');

      chai.assert.equal(equasion.postfix, '300 23 + 43 21 - * 84 7 + /');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('(4+8)*(6-5)/((3-2)*(2+2))');

      chai.assert.equal(equasion.postfix, '4 8 + 6 5 - * 3 2 - 2 2 + * /');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('( (10+20) + 30 ) * 20-8/4');

      chai.assert.equal(equasion.postfix, '10 20 + 30 + 20 * 8 4 / -');
    });
  });
});
