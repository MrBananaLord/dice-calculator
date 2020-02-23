describe('Operator', () => {
  describe('#type', () => {
    it('returns "operator"', () => {
      let operator = new Operator('');

      chai.expect(operator.type).to.equal('operator');
    });
  });

  describe('#precedenceScore', () => {
    it('returns 1', () => {
      let operator = new Operator('');

      chai.expect(operator.precedenceScore).to.equal(1);
    });
  });

  describe('#hasSamePrecedenceAs(otherOperator)', () => {
    let operator = new Operator('1');
    let otherOperator = new Operator('2');

    context("when precedence score of operator is same as other's score", () =>{
      it('returns true', () => {
        sinon.stub(operator, 'precedenceScore').get(() => 2);
        sinon.stub(otherOperator, 'precedenceScore').get(() => 2);

        chai.expect(operator.hasSamePrecedenceAs(otherOperator)).to.equal(true);
      });
    });

    context("when precedence score of operator is different than other's score", () =>{
      it('returns false', () => {
        sinon.stub(operator, 'precedenceScore').get(() => 1);
        sinon.stub(otherOperator, 'precedenceScore').get(() => 2);

        chai.expect(operator.hasSamePrecedenceAs(otherOperator)).to.equal(false);
      });
    });
  });

  describe('#precedes(otherOperator)', () => {
    let operator = new Operator('1');
    let otherOperator = new Operator('2');

    context('when precedence score of operator is higher than other operator\'s score', () =>{
      it('returns true', () => {
        sinon.stub(operator, 'precedenceScore').get(() => 2);
        sinon.stub(otherOperator, 'precedenceScore').get(() => 1);

        chai.expect(operator.precedes(otherOperator)).to.equal(true);
      });
    });

    context("when precedence score of operator is lower than other operator's score", () =>{
      it('returns false', () => {
        sinon.stub(operator, 'precedenceScore').get(() => 1);
        sinon.stub(otherOperator, 'precedenceScore').get(() => 2);

        chai.expect(operator.precedes(otherOperator)).to.equal(false);
      });
    });

    context('when precedence score of operator is equal to other operator\'s score', () =>{
      it('returns false', () => {
        sinon.stub(operator, 'precedenceScore').get(() => 2);
        sinon.stub(otherOperator, 'precedenceScore').get(() => 2);

        chai.expect(operator.precedes(otherOperator)).to.equal(false);
      });
    });
  });

  describe('.hasHigherPriorityThan(otherOperator)', () => {
    let operator = new Operator('1');
    let otherOperator = new Operator('2');
    let precedesStub = sinon.stub(operator, 'precedes');
    let samePrecedenceStub = sinon.stub(operator, 'hasSamePrecedenceAs');

    context('when operator precedes the other', () => {
      it('returns true', () => {
        precedesStub.withArgs(otherOperator).returns(true);

        chai.expect(operator.hasHigherPriorityThan(otherOperator)).to.equal(true);
      });
    });

    context('when operator does not precede the other', () => {
      before(() => { precedesStub.withArgs(otherOperator).returns(false) });

      context('but operators are not of equal precedence', () => {
        before(() => samePrecedenceStub.withArgs(otherOperator).returns(false));

        it('returns false', () => {
          chai.expect(operator.hasHigherPriorityThan(otherOperator)).to.equal(false);
        });
      });

      context('but operators are of equal precedence', () => {
        let isLeftAssociativeStub = sinon.stub(operator, 'isLeftAssociative');

        before(() => samePrecedenceStub.withArgs(otherOperator).returns(true));

        context('and operator is left associative', () => {
          it('returns true', () => {
            isLeftAssociativeStub.returns(true);

            chai.expect(operator.hasHigherPriorityThan(otherOperator)).to.equal(true);
          });
        });

        context('and operator is not left associative', () => {
          it('returns false', () => {
            isLeftAssociativeStub.returns(false);

            chai.expect(operator.hasHigherPriorityThan(otherOperator)).to.equal(false);
          });
        });
      });
    });
  });

  describe('#isLeftAssociative()', () => {
    it('returns true', () => {
      let operator = new Operator('');

      chai.expect(operator.isLeftAssociative()).to.equal(true);
    });
  });
});
