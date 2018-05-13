describe('Token', function() {
  describe('#type', function() {
    it('returns "token"', function() {
      let token = new Token('');

      chai.expect(token.type).to.equal("token");
    });
  });
});
