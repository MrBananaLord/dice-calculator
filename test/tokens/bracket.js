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
        chai.assert.equal(Bracket.canBeInstantiatedFrom('('), true);
        chai.assert.equal(Bracket.canBeInstantiatedFrom('['), true);
        chai.assert.equal(Bracket.canBeInstantiatedFrom('{'), true);
        chai.assert.equal(Bracket.canBeInstantiatedFrom('}'), true);
        chai.assert.equal(Bracket.canBeInstantiatedFrom(']'), true);
        chai.assert.equal(Bracket.canBeInstantiatedFrom(')'), true);
      });
    });

    context('for other characters', function() {
      it('returns false', function() {
        chai.assert.equal(Bracket.canBeInstantiatedFrom('0'), false);
        chai.assert.equal(Bracket.canBeInstantiatedFrom(''), false);
        chai.assert.equal(Bracket.canBeInstantiatedFrom(' '), false);
        chai.assert.equal(Bracket.canBeInstantiatedFrom('+'), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "bracket"', function() {
      let bracket = new Bracket('[');

      chai.assert.equal(bracket.type, 'bracket');
    });
  });

  describe('#opening', function() {
    context('for opening bracket', function() {
      it('returns true', function() {
        let bracket = new Bracket('[');

        chai.assert.equal(bracket.isOpening(), true);
      });
    });

    context('for closing bracket', function() {
      it('returns false', function() {
        let bracket = new Bracket(']');

        chai.assert.equal(bracket.isOpening(), false);
      });
    });
  });

  describe('#closing', function() {
    context('for opening bracket', function() {
      it('returns false', function() {
        let bracket = new Bracket('[');

        chai.assert.equal(bracket.isClosing(), false);
      });
    });

    context('for closing bracket', function() {
      it('returns true', function() {
        let bracket = new Bracket(']');

        chai.assert.equal(bracket.isClosing(), true);
      });
    });
  });
});
