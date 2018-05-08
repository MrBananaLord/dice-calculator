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

  describe('.canBeInstanciatedFrom()', function() {
    context('for all brackets', function() {
      it('returns true', function() {
        chai.assert.equal(Bracket.canBeInstanciatedFrom('('), true);
        chai.assert.equal(Bracket.canBeInstanciatedFrom('['), true);
        chai.assert.equal(Bracket.canBeInstanciatedFrom('{'), true);
        chai.assert.equal(Bracket.canBeInstanciatedFrom('}'), true);
        chai.assert.equal(Bracket.canBeInstanciatedFrom(']'), true);
        chai.assert.equal(Bracket.canBeInstanciatedFrom(')'), true);
      });
    });

    context('for other characters', function() {
      it('returns false', function() {
        chai.assert.equal(Bracket.canBeInstanciatedFrom('0'), false);
        chai.assert.equal(Bracket.canBeInstanciatedFrom(''), false);
        chai.assert.equal(Bracket.canBeInstanciatedFrom(' '), false);
        chai.assert.equal(Bracket.canBeInstanciatedFrom('+'), false);
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

        chai.assert.equal(bracket.opening, true);
      });
    });

    context('for closing bracket', function() {
      it('returns false', function() {
        let bracket = new Bracket(']');

        chai.assert.equal(bracket.opening, false);
      });
    });
  });

  describe('#closing', function() {
    context('for opening bracket', function() {
      it('returns false', function() {
        let bracket = new Bracket('[');

        chai.assert.equal(bracket.closing, false);
      });
    });

    context('for closing bracket', function() {
      it('returns true', function() {
        let bracket = new Bracket(']');

        chai.assert.equal(bracket.closing, true);
      });
    });
  });
});
