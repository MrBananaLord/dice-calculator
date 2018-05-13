describe('Numeral', function() {
  describe('.canBeInstantiatedFrom()', function() {
    context('for number', function() {
      it('returns true', function() {
        chai.expect(Numeral.canBeInstantiatedFrom('4823')).to.equal(true);
        chai.expect(Numeral.canBeInstantiatedFrom('0')).to.equal(true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        chai.expect(Numeral.canBeInstantiatedFrom(']')).to.equal(false);
        chai.expect(Numeral.canBeInstantiatedFrom(' ')).to.equal(false);
        chai.expect(Numeral.canBeInstantiatedFrom('')).to.equal(false);
      });
    });
  });

  describe('#type', function() {
    it('returns "number"', function() {
      let numeral = new Numeral('1');

      chai.expect(numeral.type).to.equal('number');
    });
  });

  describe('#number', function() {
    it('returns true', function() {
      let numeral = new Numeral('1');

      chai.expect(numeral.isNumber()).to.equal(true);
    });
  });

  describe('#toInt', function() {
    it('returns appropriate integer', function() {
      let numeral = new Numeral('1');

      chai.expect(numeral.toInt).to.equal(1);
    });

    it('returns appropriate integer', function() {
      let numeral = new Numeral('134');

      chai.expect(numeral.toInt).to.equal(134);
    });
  });
});
