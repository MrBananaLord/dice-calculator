describe('Divider', function() {
  it('inherits from Operator', function() {
    let divider = new Divider('+');

    chai.expect(divider instanceof Operator).to.equal(true);
  });

  describe('.canBeInstantiatedFrom()', function() {
    context('for "/"', function() {
      it('returns true', function() {
        chai.expect(Divider.canBeInstantiatedFrom('/')).to.equal(true);
      });
    });

    context('for "÷"', function() {
      it('returns true', function() {
        chai.expect(Divider.canBeInstantiatedFrom('÷')).to.equal(true);
      });
    });

    context('for other characters', function() {
      it('returns false', function() {
        chai.expect(Divider.canBeInstantiatedFrom(']')).to.equal(false);
        chai.expect(Divider.canBeInstantiatedFrom(' ')).to.equal(false);
        chai.expect(Divider.canBeInstantiatedFrom('+')).to.equal(false);
        chai.expect(Divider.canBeInstantiatedFrom('')).to.equal(false);
      });
    });
  });

  describe('#precedenceScore', () => {
    it('returns 2', () => {
      let divider = new Divider('-');

      chai.expect(divider.precedenceScore).to.equal(2);
    });
  });

  describe('#resolve(a,b)', function() {
    it('returns result of a / b', function() {
      let divider = new Divider('/');

      chai.expect(divider.resolve(1, 2)).to.equal(0.5);
      chai.expect(divider.resolve(9, 3)).to.equal(3);
    });
  });
});
