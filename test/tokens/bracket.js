describe('Bracket', function() {
  describe('.openingBrackets', function() {
    it('returns opening brackets', function() {
      chai.assert.deepStrictEqual(Bracket.openingBrackets, ['(', '[', '{']);
    });
  });

  describe('.closingBrackets', function() {
    it('returns closing brackets', function() {
      chai.assert.deepStrictEqual(Bracket.closingBrackets, [')', ']', '}']);
    });
  });

  describe('.canBeInstantiatedFrom()', function() {
    context('for all brackets', function() {
      it('returns true', function() {
        chai.expect(Bracket.canBeInstantiatedFrom('(')).to.equal(true);
        chai.expect(Bracket.canBeInstantiatedFrom('[')).to.equal(true);
        chai.expect(Bracket.canBeInstantiatedFrom('{')).to.equal(true);
        chai.expect(Bracket.canBeInstantiatedFrom('}')).to.equal(true);
        chai.expect(Bracket.canBeInstantiatedFrom(']')).to.equal(true);
        chai.expect(Bracket.canBeInstantiatedFrom(')')).to.equal(true);
      });
    });

    context('for other characters', function() {
      it('returns false', function() {
        chai.expect(Bracket.canBeInstantiatedFrom('0')).to.equal(false);
        chai.expect(Bracket.canBeInstantiatedFrom('')).to.equal(false);
        chai.expect(Bracket.canBeInstantiatedFrom(' ')).to.equal(false);
        chai.expect(Bracket.canBeInstantiatedFrom('+')).to.equal(false);
      });
    });
  });

  describe('#type', function() {
    it('returns "bracket"', function() {
      let bracket = new Bracket('[');

      chai.expect(bracket.type).to.equal('bracket');
    });
  });

  describe('#opening', function() {
    context('for opening bracket', function() {
      it('returns true', function() {
        let bracket = new Bracket('[');

        chai.expect(bracket.isOpening()).to.equal(true);
      });
    });

    context('for closing bracket', function() {
      it('returns false', function() {
        let bracket = new Bracket(']');

        chai.expect(bracket.isOpening()).to.equal(false);
      });
    });
  });

  describe('#closing', function() {
    context('for opening bracket', function() {
      it('returns false', function() {
        let bracket = new Bracket('[');

        chai.expect(bracket.isClosing()).to.equal(false);
      });
    });

    context('for closing bracket', function() {
      it('returns true', function() {
        let bracket = new Bracket(']');

        chai.expect(bracket.isClosing()).to.equal(true);
      });
    });
  });
});
