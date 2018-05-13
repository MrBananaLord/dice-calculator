describe('Numeral', () => {
  describe('.canBeInstantiatedFrom()', () => {
    context('for number', () => {
      it('returns true', () => {
        chai.expect(Numeral.canBeInstantiatedFrom('4823')).to.equal(true);
        chai.expect(Numeral.canBeInstantiatedFrom('0')).to.equal(true);
      });
    });

    context('for other character', () => {
      it('returns false', () => {
        chai.expect(Numeral.canBeInstantiatedFrom(']')).to.equal(false);
        chai.expect(Numeral.canBeInstantiatedFrom(' ')).to.equal(false);
        chai.expect(Numeral.canBeInstantiatedFrom('')).to.equal(false);
      });
    });
  });

  describe('#type', () => {
    it('returns "number"', () => {
      let numeral = new Numeral('1');

      chai.expect(numeral.type).to.equal('number');
    });
  });

  describe('#isNumber()', () => {
    it('returns true', () => {
      let numeral = new Numeral('1');

      chai.expect(numeral.isNumber()).to.equal(true);
    });
  });

  describe('#toInt', () => {
    it('returns integer', () => {
      let numeral = new Numeral('1');

      chai.expect(numeral.toInt).to.equal(1);
    });

    it('returns integer', () => {
      let numeral = new Numeral('134');

      chai.expect(numeral.toInt).to.equal(134);
    });
  });

  describe('#mergableWith(otherToken)', () => {
    let numeral = new Numeral('1');

    context('for other Numeral', () => {
      it('returns true', () => {
        let otherNumeral = new Numeral('3')

        chai.expect(numeral.mergableWith(otherNumeral)).to.equal(true);
      });
    });

    context('for a Roll', () => {
      it('returns true', () => {
        let roll = new Roll('3')

        chai.expect(numeral.mergableWith(roll)).to.equal(true);
      });
    });

    context('for other Tokens', () => {
      it('returns false', () => {
        chai.expect(numeral.mergableWith(new Token('1'))).to.equal(false);
        chai.expect(numeral.mergableWith(new Multiplier('1'))).to.equal(false);
        chai.expect(numeral.mergableWith(new Operator('1'))).to.equal(false);
      });
    });
  });
});
