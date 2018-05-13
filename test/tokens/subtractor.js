describe('Subtractor', () => {
  it('inherits from Operator', () => {
    let subtractor = new Subtractor('+');

    chai.expect(subtractor instanceof Operator).to.equal(true);
  });

  describe('.canBeInstantiatedFrom()', () => {
    context('for -', () => {
      it('returns true', () => {
        chai.expect(Subtractor.canBeInstantiatedFrom('-')).to.equal(true);
      });
    });

    context('for other character', () => {
      it('returns false', () => {
        chai.expect(Subtractor.canBeInstantiatedFrom(']')).to.equal(false);
        chai.expect(Subtractor.canBeInstantiatedFrom(' ')).to.equal(false);
        chai.expect(Subtractor.canBeInstantiatedFrom('+')).to.equal(false);
        chai.expect(Subtractor.canBeInstantiatedFrom('')).to.equal(false);
      });
    });
  });

  describe('#precedenceScore', () => {
    it('returns 1', () => {
      let subtractor = new Subtractor('-');

      chai.expect(subtractor.precedenceScore).to.equal(1);
    });
  });

  describe('#resolve(a,b)', () => {
    it('returns result of a / b', () => {
      let subtractor = new Subtractor('-');

      chai.expect(subtractor.resolve(1, 2)).to.equal(-1);
    });

    it('returns result of a + b', () => {
      let subtractor = new Subtractor('-');

      chai.expect(subtractor.resolve(9, 3)).to.equal(6);
    });
  });
});
