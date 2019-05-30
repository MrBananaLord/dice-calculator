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

  describe('#dieSize', () => {
    it('returns die size', () => {
      let roll = new Roll('12d6');

      chai.expect(roll.dieSize).to.equal(6);
    });

    it('returns die size', () => {
      let roll = new Roll('d');

      chai.expect(roll.dieSize).to.equal(0);
    });

    it('returns die size', () => {
      let roll = new Roll('d20');

      chai.expect(roll.dieSize).to.equal(20);
    });
  });

  describe('#diceQuantity', () => {
    it('returns dice quantity', () => {
      let roll = new Roll('12d6');

      chai.expect(roll.diceQuantity).to.equal(12);
    });

    it('returns dice quantity', () => {
      let roll = new Roll('d');

      chai.expect(roll.diceQuantity).to.equal(1);
    });

    it('returns dice quantity', () => {
      let roll = new Roll('d20');

      chai.expect(roll.diceQuantity).to.equal(1);
    });
  });

  describe('#rollOneDie()', () => {
    let randomStub = sinon.stub(Math, 'random');

    it('returns 0 if die size is 0', () => {
      let roll = new Roll('3d');

      chai.expect(roll.rollOneDie()).to.equal(0);
    });

    it('rolls a die of given size', () => {
      let roll = new Roll('12d6');

      randomStub.returns(0.5);

      chai.expect(roll.rollOneDie()).to.equal(4);
    });

    it('rolls a die of given size', () => {
      let roll = new Roll('12d2');

      randomStub.returns(0.7);

      chai.expect(roll.rollOneDie()).to.equal(2);
    });

    it('rolls a minimum of 1', () => {
      let roll = new Roll('12d2');

      randomStub.returns(0.0);

      chai.expect(roll.rollOneDie()).to.equal(1);
    });

    it('rolls a maximum of die size', () => {
      let roll = new Roll('3d20');

      randomStub.returns(0.99);

      chai.expect(roll.rollOneDie()).to.equal(20);
    });
  });

  describe('#mergableWith(otherToken)', () => {
    context('for a Numeral', () => {
      it('returns true', () => {
        let roll = new Roll('1d1');

        chai.expect(roll.mergableWith(new Numeral('2'))).to.equal(true);
      });
    });

    context('for other tokens', () => {
      it('returns false', () => {
        let roll = new Roll('1d1');

        chai.expect(roll.mergableWith(new Token('2'))).to.equal(false);
        chai.expect(roll.mergableWith(new Roll('2d4'))).to.equal(false);
      });
    });
  });

  describe('#resolve()', () => {
    it('returns sum of all rolls', () => {
      let roll = new Roll('1d1');

      sinon.stub(roll, 'rollOneDie').returns(1);

      chai.expect(roll.resolve()).to.equal(1);
    });

    it('returns sum of all rolls', () => {
      let roll = new Roll('4d4');
      let rollStub = sinon.stub(roll, 'rollOneDie');

      rollStub.onCall(0).returns(1);
      rollStub.onCall(1).returns(2);
      rollStub.onCall(2).returns(3);
      rollStub.onCall(3).returns(4);

      chai.expect(roll.resolve()).to.equal(10);
    });

    it('returns sum of all rolls', () => {
      let roll = new Roll('6d6');
      let rollStub = sinon.stub(roll, 'rollOneDie');

      rollStub.onCall(0).returns(1);
      rollStub.onCall(1).returns(2);
      rollStub.onCall(2).returns(3);
      rollStub.onCall(3).returns(4);
      rollStub.onCall(4).returns(6);
      rollStub.onCall(5).returns(6);

      chai.expect(roll.resolve()).to.equal(22);
    });
  });
});
