describe('Subtractor', function() {
  describe('.canBeInstanciatedFrom()', function() {
    context('for -', function() {
      it('returns true', function() {
        chai.assert.equal(Subtractor.canBeInstanciatedFrom('-'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        chai.assert.equal(Subtractor.canBeInstanciatedFrom(']'), false);
        chai.assert.equal(Subtractor.canBeInstanciatedFrom(' '), false);
        chai.assert.equal(Subtractor.canBeInstanciatedFrom('+'), false);
        chai.assert.equal(Subtractor.canBeInstanciatedFrom(''), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "operator"', function() {
      let subtractor = new Subtractor('-');

      chai.assert.equal(subtractor.type, 'operator');
    });
  });
});
