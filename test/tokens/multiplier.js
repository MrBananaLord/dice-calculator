describe('Multiplier', function() {
  describe('.canBeInstanciatedFrom()', function() {
    context('for *', function() {
      it('returns true', function() {
        chai.assert.equal(Multiplier.canBeInstanciatedFrom('*'), true);
      });
    });

    context('for ×', function() {
      it('returns true', function() {
        chai.assert.equal(Multiplier.canBeInstanciatedFrom('×'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        chai.assert.equal(Multiplier.canBeInstanciatedFrom(']'), false);
        chai.assert.equal(Multiplier.canBeInstanciatedFrom(' '), false);
        chai.assert.equal(Multiplier.canBeInstanciatedFrom('+'), false);
        chai.assert.equal(Multiplier.canBeInstanciatedFrom(''), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "operator"', function() {
      let multiplier = new Multiplier('*');

      chai.assert.equal(multiplier.type, 'operator');
    });
  });
});
