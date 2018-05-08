describe('Divider', function() {
  describe('.canBeInstanciatedFrom()', function() {
    context('for /', function() {
      it('returns true', function() {
        chai.assert.equal(Divider.canBeInstanciatedFrom('/'), true);
      });
    });

    context('for ÷', function() {
      it('returns true', function() {
        chai.assert.equal(Divider.canBeInstanciatedFrom('÷'), true);
      });
    });

    context('for other character', function() {
      it('returns false', function() {
        chai.assert.equal(Divider.canBeInstanciatedFrom(']'), false);
        chai.assert.equal(Divider.canBeInstanciatedFrom(' '), false);
        chai.assert.equal(Divider.canBeInstanciatedFrom('+'), false);
        chai.assert.equal(Divider.canBeInstanciatedFrom(''), false);
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
