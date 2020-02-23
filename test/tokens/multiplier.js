describe('Multiplier', function() {
  it('inherits from Operator', function() {
    let multiplier = new Multiplier('*');

    chai.expect(multiplier instanceof Operator).to.equal(true);
  });

  describe('.canBeInstantiatedFrom()', function() {
    context('for "*"', function() {
      it('returns true', function() {
        chai.expect(Multiplier.canBeInstantiatedFrom('*')).to.equal(true);
      });
    });

    context('for "×"', function() {
      it('returns true', function() {
        chai.expect(Multiplier.canBeInstantiatedFrom('×')).to.equal(true);
      });
    });

    context('for other characters', function() {
      it('returns false', function() {
        chai.expect(Multiplier.canBeInstantiatedFrom(']')).to.equal(false);
        chai.expect(Multiplier.canBeInstantiatedFrom(' ')).to.equal(false);
        chai.expect(Multiplier.canBeInstantiatedFrom('+')).to.equal(false);
        chai.expect(Multiplier.canBeInstantiatedFrom('')).to.equal(false);
      });
    });
  });

  describe('#precedenceScore', () => {
    it('returns 1', () => {
      let multiplier = new Multiplier('*');

      chai.expect(multiplier.precedenceScore).to.equal(2);
    });
  });

  describe('#resolve(a,b)', function() {
    it('returns result of a * b', function() {
      let multiplier = new Multiplier('*');

      chai.expect(multiplier.resolve(1, 0)).to.equal(0);
      chai.expect(multiplier.resolve(9.25, 0.5)).to.equal(4.625);
    });
  });
});
