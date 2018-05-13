describe('Roll', () => {
  describe('.canBeInstantiatedFrom()', () => {
    context('for only "d"', () => {
      it('returns true', () => {
        chai.expect(Roll.canBeInstantiatedFrom('d')).to.equal(true);
      });
    });

    context('for "d" in front of digits', () => {
      it('returns true', () => {
        chai.expect(Roll.canBeInstantiatedFrom('d1')).to.equal(true);
        chai.expect(Roll.canBeInstantiatedFrom('d600')).to.equal(true);
      });
    });

    context('for "d" after digits', () => {
      it('returns true', () => {
        chai.expect(Roll.canBeInstantiatedFrom('1d')).to.equal(true);
        chai.expect(Roll.canBeInstantiatedFrom('5d')).to.equal(true);
      });
    });

    context('for "d" between digits', () => {
      it('returns true', () => {
        chai.expect(Roll.canBeInstantiatedFrom('1d4')).to.equal(true);
        chai.expect(Roll.canBeInstantiatedFrom('5d30')).to.equal(true);
      });
    });

    context('for other cases', () => {
      it('returns false', () => {
        chai.expect(Roll.canBeInstantiatedFrom('1dd4')).to.equal(false);
        chai.expect(Roll.canBeInstantiatedFrom('')).to.equal(false);
        chai.expect(Roll.canBeInstantiatedFrom('d6)')).to.equal(false);
        chai.expect(Roll.canBeInstantiatedFrom('(d)')).to.equal(false);
      });
    });
  });

  describe('#type', () => {
    it('returns "roll"', () => {
      let roll = new Roll('1d6');

      chai.expect(roll.type).to.equal('roll');
    });
  });

  xdescribe('#resolve', () => {
    it('returns appropriate integer', () => {
      let Roll = new Roll('1');

      chai.expect(Roll.toInt).to.equal(1);
    });

    it('returns appropriate integer', () => {
      let Roll = new Roll('134');

      chai.expect(Roll.toInt).to.equal(134);
    });
  });
});
