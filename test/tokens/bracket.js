describe('Bracket', () => {
  describe('.openingBrackets', () => {
    it('returns opening brackets', () => {
      chai.assert.deepStrictEqual(Bracket.openingBrackets, ['(', '[', '{']);
    });
  });

  describe('.closingBrackets', () => {
    it('returns closing brackets', () => {
      chai.assert.deepStrictEqual(Bracket.closingBrackets, [')', ']', '}']);
    });
  });

  describe('.canBeInstantiatedFrom()', () => {
    context('for all brackets', () => {
      it('returns true', () => {
        chai.expect(Bracket.canBeInstantiatedFrom('(')).to.equal(true);
        chai.expect(Bracket.canBeInstantiatedFrom('[')).to.equal(true);
        chai.expect(Bracket.canBeInstantiatedFrom('{')).to.equal(true);
        chai.expect(Bracket.canBeInstantiatedFrom('}')).to.equal(true);
        chai.expect(Bracket.canBeInstantiatedFrom(']')).to.equal(true);
        chai.expect(Bracket.canBeInstantiatedFrom(')')).to.equal(true);
      });
    });

    context('for other characters', () => {
      it('returns false', () => {
        chai.expect(Bracket.canBeInstantiatedFrom('0')).to.equal(false);
        chai.expect(Bracket.canBeInstantiatedFrom('')).to.equal(false);
        chai.expect(Bracket.canBeInstantiatedFrom(' ')).to.equal(false);
        chai.expect(Bracket.canBeInstantiatedFrom('+')).to.equal(false);
      });
    });
  });

  describe('#type', () => {
    it('returns "bracket"', () => {
      let bracket = new Bracket('[');

      chai.expect(bracket.type).to.equal('bracket');
    });
  });

  describe('#isOpening()', () => {
    context('for opening bracket', () => {
      it('returns true', () => {
        let bracket = new Bracket('[');

        chai.expect(bracket.isOpening()).to.equal(true);
      });
    });

    context('for closing bracket', () => {
      it('returns false', () => {
        let bracket = new Bracket(']');

        chai.expect(bracket.isOpening()).to.equal(false);
      });
    });
  });

  describe('#isClosing()', () => {
    context('for opening bracket', () => {
      it('returns false', () => {
        let bracket = new Bracket('[');

        chai.expect(bracket.isClosing()).to.equal(false);
      });
    });

    context('for closing bracket', () => {
      it('returns true', () => {
        let bracket = new Bracket(']');

        chai.expect(bracket.isClosing()).to.equal(true);
      });
    });
  });
});
