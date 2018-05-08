describe('Numeral', function() {
  describe('.canBeInstanciatedFrom()', function() {
    context('for number', function() {
      it('returns true', function() {
        chai.assert.equal(Numeral.canBeInstanciatedFrom('4823'), true);
        chai.assert.equal(Numeral.canBeInstanciatedFrom('0'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        chai.assert.equal(Numeral.canBeInstanciatedFrom(']'), false);
        chai.assert.equal(Numeral.canBeInstanciatedFrom(' '), false);
        chai.assert.equal(Numeral.canBeInstanciatedFrom(''), false);
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

      chai.assert.equal(numeral.number, true);
    });
  });

});
