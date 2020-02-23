describe('Numeral', () => {
  describe('.canBeInstantiatedFrom()', () => {
    context('for a number', () => {
      it('returns true', () => {
        chai.expect(Numeral.canBeInstantiatedFrom('4823')).to.equal(true);
        chai.expect(Numeral.canBeInstantiatedFrom('0')).to.equal(true);
      });
    });

    context('for other characters', () => {
      it('returns false', () => {
        chai.expect(Numeral.canBeInstantiatedFrom(']')).to.equal(false);
        chai.expect(Numeral.canBeInstantiatedFrom(' ')).to.equal(false);
        chai.expect(Numeral.canBeInstantiatedFrom('')).to.equal(false);
        chai.expect(Numeral.canBeInstantiatedFrom('3d')).to.equal(false);
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
        let roll = new Roll('3d6')

        chai.expect(numeral.mergableWith(roll)).to.equal(true);
      });
    });

    context('for other Tokens', () => {
      it('returns false', () => {
        chai.expect(numeral.mergableWith(new Token('e'))).to.equal(false);
        chai.expect(numeral.mergableWith(new Multiplier('*'))).to.equal(false);
        chai.expect(numeral.mergableWith(new Operator('+'))).to.equal(false);
      });
    });
  });

  describe('#requiresPrefixBefore(otherToken)', () => {
    let numeral = new Numeral('1');

    context('for an opening Bracket', () => {
      it('returns true', () => {
        let otherNumeral = new Bracket('(')

        chai.expect(numeral.requiresPrefixBefore(otherNumeral)).to.equal(true);
      });
    });

    context('for a closing Bracket', () => {
      it('returns false', () => {
        let otherNumeral = new Bracket(')')

        chai.expect(numeral.requiresPrefixBefore(otherNumeral)).to.equal(false);
      });
    });

    context('for other Tokens', () => {
      it('returns false', () => {
        chai.expect(numeral.requiresPrefixBefore(new Token('e'))).to.equal(false);
        chai.expect(numeral.requiresPrefixBefore(new Multiplier('*'))).to.equal(false);
        chai.expect(numeral.requiresPrefixBefore(new Operator('+'))).to.equal(false);
        chai.expect(numeral.requiresPrefixBefore(new Numeral('1'))).to.equal(false);
      });
    });
  });

  describe('#prefixTokenFor(otherToken)', () => {
    let numeral = new Numeral('1');
    let multiplier = new Multiplier('×');

    it('returns Multiplier regardless the other token type', () => {
      chai.expect(numeral.prefixTokenFor(new Token('e'))).to.deep.equal(multiplier);
      chai.expect(numeral.prefixTokenFor(new Bracket(')'))).to.deep.equal(multiplier);
      chai.expect(numeral.prefixTokenFor(new Operator('+'))).to.deep.equal(multiplier);
      chai.expect(numeral.prefixTokenFor(new Numeral('1'))).to.deep.equal(multiplier);
    });
  });
});
