describe('Adder', function() {
  describe('.canBeInstantiatedFrom()', function() {
    context('for +', function() {
      it('returns true', function() {
        chai.assert.equal(Adder.canBeInstantiatedFrom('+'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        chai.assert.equal(Adder.canBeInstantiatedFrom(']'), false);
        chai.assert.equal(Adder.canBeInstantiatedFrom(' '), false);
        chai.assert.equal(Adder.canBeInstantiatedFrom('1'), false);
        chai.assert.equal(Adder.canBeInstantiatedFrom(''), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "operator"', function() {
      let adder = new Adder('+');

      chai.assert.equal(adder.type, 'operator');
    });
  });
});
