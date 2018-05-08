describe('Adder', function() {
  describe('.canBeInstanciatedFrom()', function() {
    context('for +', function() {
      it('returns true', function() {
        chai.assert.equal(Adder.canBeInstanciatedFrom('+'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        chai.assert.equal(Adder.canBeInstanciatedFrom(']'), false);
        chai.assert.equal(Adder.canBeInstanciatedFrom(' '), false);
        chai.assert.equal(Adder.canBeInstanciatedFrom('1'), false);
        chai.assert.equal(Adder.canBeInstanciatedFrom(''), false);
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
