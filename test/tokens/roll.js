describe('Roll', function() {
  describe('.canBeInstantiatedFrom()', function() {
    context('for only "d"', function() {
      it('returns true', function() {
        chai.expect(Roll.canBeInstantiatedFrom('d')).to.equal(true);
      });
    });

    context('for "d" in front of digits', function() {
      it('returns true', function() {
        chai.expect(Roll.canBeInstantiatedFrom('d1')).to.equal(true);
        chai.expect(Roll.canBeInstantiatedFrom('d600')).to.equal(true);
      });
    });

    context('for "d" after digits', function() {
      it('returns true', function() {
        chai.expect(Roll.canBeInstantiatedFrom('1d')).to.equal(true);
        chai.expect(Roll.canBeInstantiatedFrom('5d')).to.equal(true);
      });
    });

    context('for "d" between digits', function() {
      it('returns true', function() {
        chai.expect(Roll.canBeInstantiatedFrom('1d4')).to.equal(true);
        chai.expect(Roll.canBeInstantiatedFrom('5d30')).to.equal(true);
      });
    });

    context('for other cases', function() {
      it('returns false', function() {
        chai.expect(Roll.canBeInstantiatedFrom('1dd4')).to.equal(false);
        chai.expect(Roll.canBeInstantiatedFrom('')).to.equal(false);
        chai.expect(Roll.canBeInstantiatedFrom('d6)')).to.equal(false);
        chai.expect(Roll.canBeInstantiatedFrom('(d)')).to.equal(false);
      });
    });
  });

  describe('#type', function() {
    it('returns "number"', function() {
      let roll = new Roll('1d6');

      chai.expect(roll.type).to.equal('roll');
    });
  });

  xdescribe('#resolve', function() {
    it('returns appropriate integer', function() {
      let Roll = new Roll('1');

      chai.expect(Roll.toInt).to.equal(1);
    });

    it('returns appropriate integer', function() {
      let Roll = new Roll('134');

      chai.expect(Roll.toInt).to.equal(134);
    });
  });
});
