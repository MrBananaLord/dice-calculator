describe('Token', function() {
  describe('#type', function() {
    it('returns "token"', function() {
      let token = new Token('');

      chai.assert.equal(token.type, "token");
    });
  });
});
