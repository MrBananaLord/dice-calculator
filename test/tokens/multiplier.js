describe('Multiplier', function() {
  describe('.canBeInstantiatedFrom()', function() {
    context('for *', function() {
      it('returns true', function() {
        chai.assert.equal(Multiplier.canBeInstantiatedFrom('*'), true);
      });
    });

    context('for ×', function() {
      it('returns true', function() {
        chai.assert.equal(Multiplier.canBeInstantiatedFrom('×'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        chai.assert.equal(Multiplier.canBeInstantiatedFrom(']'), false);
        chai.assert.equal(Multiplier.canBeInstantiatedFrom(' '), false);
        chai.assert.equal(Multiplier.canBeInstantiatedFrom('+'), false);
        chai.assert.equal(Multiplier.canBeInstantiatedFrom(''), false);
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
