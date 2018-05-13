describe('Token', () => {
  let token = new Token('loloo');

  describe('.canBeInstantiatedFrom(value)', () => {
    it('returns "token"', () => {
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
});
