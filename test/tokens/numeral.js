describe('Numeral', function() {
  describe('.canBeInstantiatedFrom()', function() {
    context('for number', function() {
      it('returns true', function() {
        chai.assert.equal(Numeral.canBeInstantiatedFrom('4823'), true);
        chai.assert.equal(Numeral.canBeInstantiatedFrom('0'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        chai.assert.equal(Numeral.canBeInstantiatedFrom(']'), false);
        chai.assert.equal(Numeral.canBeInstantiatedFrom(' '), false);
        chai.assert.equal(Numeral.canBeInstantiatedFrom(''), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "number"', function() {
      let numeral = new Numeral('1');

      chai.assert.equal(numeral.type, 'number');
    });
  });

  describe('#number', function() {
    it('returns true', function() {
      let numeral = new Numeral('1');

      chai.assert.equal(numeral.isNumber(), true);
    });
  });

  describe('#toInt', function() {
    it('returns appropriate integer', function() {
      let numeral = new Numeral('1');

      chai.assert.equal(numeral.toInt, 1);
    });

    it('returns appropriate integer', function() {
      let numeral = new Numeral('134');

      chai.assert.equal(numeral.toInt, 134);
    });
  });
});
