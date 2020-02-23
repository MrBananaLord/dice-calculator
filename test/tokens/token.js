describe('Token(value)', () => {
  let token = new Token('loloo');

  describe('.canBeInstantiatedFrom(value)', () => {
    it('returns true', () => {
      chai.expect(Token.canBeInstantiatedFrom('')).to.equal(true);
    });
  });

  describe('#value', () => {
    it('returns value', () => {
      chai.expect(token.value).to.equal("loloo");
    });
  });

  describe('#type', () => {
    it('returns "token"', () => {
      chai.expect(token.type).to.equal("token");
    });
  });

  describe('#mergableWith(otherToken)', () => {
    it('returns false', () => {
      chai.expect(token.mergableWith('ignores everything!')).to.equal(false);
    });
  });

  describe('#mergedValuesWith(otherToken)', () => {
    it('returns joined values', () => {
      let otherToken = new Token('xoxo');

      chai.expect(token.mergedValuesWith(otherToken)).to.equal('lolooxoxo');
    });
  });

  describe('#requiresPrefixBefore(otherToken)', () => {
    it('returns false', () => {
      let otherToken = new Token('xoxo');

      chai.expect(token.requiresPrefixBefore(otherToken)).to.equal(false);
    });
  });

  describe('#isNumber()', () => {
    context('for Number', function() {
      it('returns true', () => {
        let token = new Numeral('1');

        chai.expect(token.isNumber()).to.equal(true);
      });
    });

    context('for other Token', function() {
      it('returns false', () => {
        let token = new Token('s');

        chai.expect(token.isNumber()).to.equal(false);
      });
    });
  });

  describe('#isOperator()', () => {
    context('for Operator', function() {
      it('returns true', () => {
        let token = new Operator('+');

        chai.expect(token.isOperator()).to.equal(true);
      });
    });

    context('for other Token', function() {
      it('returns false', () => {
        let token = new Token('s');

        chai.expect(token.isOperator()).to.equal(false);
      });
    });
  });

  describe('#isBracket()', () => {
    context('for Operator', function() {
      it('returns true', () => {
        let token = new Bracket('[');

        chai.expect(token.isBracket()).to.equal(true);
      });
    });

    context('for other Token', function() {
      it('returns false', () => {
        let token = new Token('s');

        chai.expect(token.isBracket()).to.equal(false);
      });
    });
  });

  describe('#isRoll()', () => {
    context('for Operator', function() {
      it('returns true', () => {
        let token = new Roll('2d4');

        chai.expect(token.isRoll()).to.equal(true);
      });
    });

    context('for other Token', function() {
      it('returns false', () => {
        let token = new Token('s');

        chai.expect(token.isRoll()).to.equal(false);
      });
    });
  });

  describe('#isToken()', () => {
    context('for Token', function() {
      it('returns true', () => {
        let token = new Token('s');

        chai.expect(token.isToken()).to.equal(true);
      });
    });

    context('for other token', function() {
      it('returns false', () => {
        let token = new Bracket('[');

        chai.expect(token.isToken()).to.equal(false);
      });
    });
  });
});
