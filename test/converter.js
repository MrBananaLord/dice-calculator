describe('Converter', function () {
  let converter = new Converter();

  describe('#tokens', function () {
    let token1 = new Token('asd');
    let token2 = new Token('rrf');

    it('returns tokens', function () {
      chai.expect(converter.tokens).to.deep.equal([]);

      converter.tokens = [token1, token2];
      chai.expect(converter.tokens).to.deep.equal([token1, token2]);
    });

    it('resets the output', function () {
      converter._output = [token1, token2];
      chai.expect(converter._output).to.deep.equal([token1, token2]);

      converter.tokens = [token1, token2];
      chai.expect(converter._output).to.deep.equal([]);
    });

    it('resets the operators', function () {
      converter._operators = [token1, token2];
      chai.expect(converter._operators).to.deep.equal([token1, token2]);

      converter.tokens = [token1, token2];
      chai.expect(converter._operators).to.deep.equal([]);
    });
  });

  describe('#lastOperator', function () {
    context('when there are no operators', function () {
      before(function () {
        converter._operators = [];
      });

      it('returns undefined', function () {
        chai.expect(converter.lastOperator).to.equal(undefined);
      });
    });

    context('when there are operators', function () {
      before(function () {
        converter._operators = [1, 2, 3];
      });

      it('returns last one', function () {
        chai.expect(converter.lastOperator).to.equal(3);
      });
    });
  });
});
