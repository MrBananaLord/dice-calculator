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

      roll = new Roll('d');
      chai.expect(roll.dieSize).to.equal(0);

      roll = new Roll('d20');
      chai.expect(roll.dieSize).to.equal(20);
    });
  });

  describe('#dieQuantity', () => {
    it('returns die quantity', () => {
      let roll = new Roll('12d6');
      chai.expect(roll.dieQuantity).to.equal(12);

      roll = new Roll('d');
      chai.expect(roll.dieQuantity).to.equal(1);

      roll = new Roll('d20');
      chai.expect(roll.dieQuantity).to.equal(1);
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

      roll = new Roll('12d2');
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
    let roll = new Roll('1d1');

    context('for a Numeral', () => {
      it('returns true', () => {
        chai.expect(roll.mergableWith(new Numeral('2'))).to.equal(true);
      });
    });

    context('for a Roll of same value', () => {
      it('returns true', () => {
        chai.expect(roll.mergableWith(new Roll('2d1'))).to.equal(true);
      });
    });

    context('for a Roll of other value', () => {
      it('returns false', () => {
        chai.expect(roll.mergableWith(new Roll('2d2'))).to.equal(false);
      });
    });

    context('for other tokens', () => {
      it('returns false', () => {
        chai.expect(roll.mergableWith(new Token('2'))).to.equal(false);
        chai.expect(roll.mergableWith(new Operator(''))).to.equal(false);
      });
    });
  });

  describe('#equalDieSizeWith(otherToken)', () => {
    let roll = new Roll('1d1');

    context('for a Roll of same value', () => {
      it('returns true', () => {
        chai.expect(roll.mergableWith(new Roll('2d1'))).to.equal(true);
      });
    });

    context('for a Roll of other value', () => {
      it('returns false', () => {
        chai.expect(roll.mergableWith(new Roll('2d2'))).to.equal(false);
      });
    });

    context('for other tokens', () => {
      it('returns false', () => {
        chai.expect(roll.mergableWith(new Token('2'))).to.equal(false);
        chai.expect(roll.mergableWith(new Operator(''))).to.equal(false);
      });
    });
  });

  describe('#mergedValuesWith(otherToken)', () => {
    let roll = new Roll('1d1');

    context('for a Roll of same value', () => {
      it('adds the dice together', () => {
        chai.expect(roll.mergedValuesWith(new Roll('2d1'))).to.equal('3d1');
      });
    });

    context('for a Numeral', () => {
      it('appends the numeral', () => {
        chai.expect(roll.mergedValuesWith(new Numeral('13'))).to.equal('1d113');
      });
    });
  });

  describe('#requiresPrefixBefore(otherToken)', () => {
    let roll = new Roll('1d1');

    context('for a Roll of same value', () => {
      it('returns false', () => {
        chai.expect(roll.requiresPrefixBefore(new Roll('2d1'))).to.equal(false);
      });
    });

    context('for a Roll of other value', () => {
      it('returns true', () => {
        chai.expect(roll.requiresPrefixBefore(new Roll('2d2'))).to.equal(true);
      });
    });

    context('for an opening Bracket', () => {
      it('returns true', () => {
        chai.expect(roll.requiresPrefixBefore(new Bracket('('))).to.equal(true);
      });
    });

    context('for a closing Bracket', () => {
      it('returns false', () => {
        chai.expect(roll.requiresPrefixBefore(new Bracket(')'))).to.equal(false);
      });
    });

    context('for other Tokens', () => {
      it('returns false', () => {
        chai.expect(roll.requiresPrefixBefore(new Token(''))).to.equal(false);
        chai.expect(roll.requiresPrefixBefore(new Operator('+'))).to.equal(false);
        chai.expect(roll.requiresPrefixBefore(new Numeral('1'))).to.equal(false);
      });
    });
  });

  describe('#prefixTokenFor(otherToken)', () => {
    let roll = new Roll('1d1');

    context('for a Roll', () => {
      it('returns an Adder', () => {
        chai.expect(roll.prefixTokenFor(new Roll('2d4'))).to.deep.equal(new Adder('+'));
      });
    });

    context('for an opening Bracket', () => {
      it('returns a Multiplier', () => {
        chai.expect(roll.prefixTokenFor(new Bracket('('))).to.deep.equal(new Multiplier('×'));
      });
    });
  });

  describe('#resolve()', () => {
    context('for a single die', function () {
      it('returns the roll value', () => {
        let roll = new Roll('1d1');

        sinon.stub(roll, 'rollOneDie').returns(1);

        chai.expect(roll.resolve()).to.equal(1);
      });
    });

    context('for couple dice', function () {
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
});
