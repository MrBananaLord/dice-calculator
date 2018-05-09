describe('Subtractor', function() {
  describe('.canBeInstantiatedFrom()', function() {
    context('for -', function() {
      it('returns true', function() {
        chai.assert.equal(Subtractor.canBeInstantiatedFrom('-'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        chai.assert.equal(Subtractor.canBeInstantiatedFrom(']'), false);
        chai.assert.equal(Subtractor.canBeInstantiatedFrom(' '), false);
        chai.assert.equal(Subtractor.canBeInstantiatedFrom('+'), false);
        chai.assert.equal(Subtractor.canBeInstantiatedFrom(''), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "operator"', function() {
      let subtractor = new Subtractor('-');

      chai.assert.equal(subtractor.type, 'operator');
    });
  });

  describe('#resolve(a,b)', function() {
    it('returns result of a / b', function() {
      let adder = new Subtractor('-');

      chai.assert.equal(adder.resolve(1, 2), -1);
    });

    it('returns result of a + b', function() {
      let adder = new Subtractor('-');

      chai.assert.equal(adder.resolve(9, 3), 6);
    });
  });
});
