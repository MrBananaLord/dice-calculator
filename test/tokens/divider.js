describe('Divider', function() {
  describe('.canBeInstantiatedFrom()', function() {
    context('for /', function() {
      it('returns true', function() {
        chai.assert.equal(Divider.canBeInstantiatedFrom('/'), true);
      });
    });

    context('for ÷', function() {
      it('returns true', function() {
        chai.assert.equal(Divider.canBeInstantiatedFrom('÷'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        chai.assert.equal(Divider.canBeInstantiatedFrom(']'), false);
        chai.assert.equal(Divider.canBeInstantiatedFrom(' '), false);
        chai.assert.equal(Divider.canBeInstantiatedFrom('+'), false);
        chai.assert.equal(Divider.canBeInstantiatedFrom(''), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "operator"', function() {
      let divider = new Divider('/');

      chai.assert.equal(divider.type, 'operator');
    });
  });
});
