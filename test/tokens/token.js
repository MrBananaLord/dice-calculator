describe('Token', function() {
  describe('#number', function() {
    it('returns false', function() {
      let token = new Token('');

      chai.assert.equal(token.number, false);
    });
  });
});
