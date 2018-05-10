describe('Converter', function() {
  describe('#lastOperator', function() {
    let converter = new Converter([]);

    context('when there are no operators', function() {
      before(function() {
        converter.operators = [];
      });

      it('returns undefined', function() {
        chai.expect(converter.lastOperator).to.equal(undefined);
      });
    });

    context('when there are operators', function() {
      before(function() {
        converter.operators = [1,2,3];
      });

      it('returns last one', function() {
        chai.expect(converter.lastOperator).to.equal(3);
      });
    });
  });
});
