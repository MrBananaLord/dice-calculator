describe('Equasion', function() {
  describe('#result', function() {
    it('returns result', function() {
      var equasion = new Equasion('301 + 4 * (20 - 1)');

      chai.expect(equasion.result).to.equal(377);
    });

    it('returns result', function() {
      var equasion = new Equasion('3 * (2 + 5)');

      chai.expect(equasion.result).to.equal(21);
    });

    it('returns result', function() {
      var equasion = new Equasion('((((1*(2+3))-3)+4)*5)');

      chai.expect(equasion.result).to.equal(30);
    });

    it('returns result', function() {
      var equasion = new Equasion('(300+23)*(43-21)/(84+7)');

      chai.expect(equasion.result).to.equal(78.08791208791209);
    });

    it('returns result', function() {
      var equasion = new Equasion('(4+8)*(6-5)/((3-2)*(2+2))');

      chai.expect(equasion.result).to.equal(3);
    });

    it('returns result', function() {
      var equasion = new Equasion('( (10+20) + 30 ) * 20-8/4');

      chai.expect(equasion.result).to.equal(1198);
    });
  });

  describe('#postfix', function() {
    it('returns postfix', function() {
      var equasion = new Equasion('301 + 4 * (20 - 1)');

      chai.expect(equasion.postfix).to.equal('301 4 20 1 - * +');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('3 * (2 + 5)');

      chai.expect(equasion.postfix).to.equal('3 2 5 + *');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('((((1*(2+3))-3)+4)*5)');

      chai.expect(equasion.postfix).to.equal('1 2 3 + * 3 - 4 + 5 *');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('(300+23)*(43-21)/(84+7)');

      chai.expect(equasion.postfix).to.equal('300 23 + 43 21 - * 84 7 + /');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('(4+8)*(6-5)/((3-2)*(2+2))');

      chai.expect(equasion.postfix).to.equal('4 8 + 6 5 - * 3 2 - 2 2 + * /');
    });

    it('returns postfix', function() {
      var equasion = new Equasion('( (10+20) + 30 ) * 20-8/4');

      chai.expect(equasion.postfix).to.equal('10 20 + 30 + 20 * 8 4 / -');
    });
  });
});
