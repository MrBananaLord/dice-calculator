describe('Adder', function() {
  it('inherits from Operator', function() {
    let adder = new Adder('+');

    chai.expect(adder instanceof Operator).to.equal(true);
  });

  describe('.canBeInstantiatedFrom()', function() {
    context('for "+"', function() {
      it('returns true', function() {
        chai.expect(Adder.canBeInstantiatedFrom('+')).to.equal(true);
      });
    });

    context('for other characters', function() {
      it('returns false', function() {
        chai.expect(Adder.canBeInstantiatedFrom(']')).to.equal(false);
        chai.expect(Adder.canBeInstantiatedFrom(' ')).to.equal(false);
        chai.expect(Adder.canBeInstantiatedFrom('1')).to.equal(false);
        chai.expect(Adder.canBeInstantiatedFrom('')).to.equal(false);
      });
    });
  });

  describe('#precedenceScore', () => {
    it('returns 1', () => {
      let adder = new Adder('+');

      chai.expect(adder.precedenceScore).to.equal(1);
    });
  });

  describe('#resolve(a,b)', function() {
    it('returns result of a + b', function() {
      let adder = new Adder('+');

      chai.expect(adder.resolve(1, 3.5)).to.equal(4.5);
      chai.expect(adder.resolve(1.0, 0)).to.equal(1);
    });
  });
});
