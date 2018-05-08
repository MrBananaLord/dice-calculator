const Bracket = require('../../models/tokens/Bracket.js');
var assert  = require('assert');

describe('Bracket', function() {
  describe('.openingBrackets', function() {
    it('returns opening brackets', function() {
      assert.deepStrictEqual(Bracket.openingBrackets, ['(', '[', '{']);
    });
  });

  describe('.closingBrackets', function() {
    it('returns closing brackets', function() {
      assert.deepStrictEqual(Bracket.closingBrackets, [')', ']', '}']);
    });
  });

  describe('.canBeInstanciatedFrom()', function() {
    context('for all brackets', function() {
      it('returns true', function() {
        assert.equal(Bracket.canBeInstanciatedFrom('('), true);
        assert.equal(Bracket.canBeInstanciatedFrom('['), true);
        assert.equal(Bracket.canBeInstanciatedFrom('{'), true);
        assert.equal(Bracket.canBeInstanciatedFrom('}'), true);
        assert.equal(Bracket.canBeInstanciatedFrom(']'), true);
        assert.equal(Bracket.canBeInstanciatedFrom(')'), true);
      });
    });

    context('for other characters', function() {
      it('returns false', function() {
        assert.equal(Bracket.canBeInstanciatedFrom('0'), false);
        assert.equal(Bracket.canBeInstanciatedFrom(''), false);
        assert.equal(Bracket.canBeInstanciatedFrom(' '), false);
        assert.equal(Bracket.canBeInstanciatedFrom('+'), false);
      });
    });
  });

  describe('#type', function() {
    it('returns "bracket"', function() {
      let bracket = new Bracket('[');

      assert.equal(bracket.type, 'bracket');
    });
  });

  describe('#opening', function() {
    context('for opening bracket', function() {
      it('returns true', function() {
        let bracket = new Bracket('[');

        assert.equal(bracket.opening, true);
      });
    });

    context('for closing bracket', function() {
      it('returns false', function() {
        let bracket = new Bracket(']');

        assert.equal(bracket.opening, false);
      });
    });
  });

  describe('#closing', function() {
    context('for opening bracket', function() {
      it('returns false', function() {
        let bracket = new Bracket('[');

        assert.equal(bracket.closing, false);
      });
    });

    context('for closing bracket', function() {
      it('returns true', function() {
        let bracket = new Bracket(']');

        assert.equal(bracket.closing, true);
      });
    });
  });
});
