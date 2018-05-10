describe('Roll', function() {
  describe('.canBeInstantiatedFrom()', function() {
    context('for only "d"', function() {
      it('returns true', function() {
        chai.assert.equal(Roll.canBeInstantiatedFrom('d'), true);
      });
    });

    context('for "d" in front of digits', function() {
      it('returns true', function() {
        chai.assert.equal(Roll.canBeInstantiatedFrom('d1'), true);
        chai.assert.equal(Roll.canBeInstantiatedFrom('d600'), true);
      });
    });

    context('for "d" after digits', function() {
      it('returns true', function() {
        chai.assert.equal(Roll.canBeInstantiatedFrom('1d'), true);
        chai.assert.equal(Roll.canBeInstantiatedFrom('5d'), true);
      });
    });

    context('for "d" between digits', function() {
      it('returns true', function() {
        chai.assert.equal(Roll.canBeInstantiatedFrom('1d4'), true);
        chai.assert.equal(Roll.canBeInstantiatedFrom('5d30'), true);
      });
    });

    context('for other cases', function() {
      it('returns false', function() {
        chai.assert.equal(Roll.canBeInstantiatedFrom('1dd4'), false);
        chai.assert.equal(Roll.canBeInstantiatedFrom(''), false);
        chai.assert.equal(Roll.canBeInstantiatedFrom('d6)'), false);
        chai.assert.equal(Roll.canBeInstantiatedFrom('(d)'), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "number"', function() {
      let roll = new Roll('1d6');

      chai.assert.equal(roll.type, 'roll');
    });
  });

  xdescribe('#resolve', function() {
    it('returns appropriate integer', function() {
      let Roll = new Roll('1');

      chai.assert.equal(Roll.toInt, 1);
    });

    it('returns appropriate integer', function() {
      let Roll = new Roll('134');

      chai.assert.equal(Roll.toInt, 134);
    });
  });
});
