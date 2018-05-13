class Operator extends Token {
  get type() {
    return 'operator';
  }

  get precedenceScore() {
    return 1;
  }

  precedences(otherOperator) {
    return this.precedenceScore > otherOperator.precedenceScore;
  }

  hasSamePrecedenceAs(otherOperator) {
    return this.precedenceScore == otherOperator.precedenceScore;
  }

  hasHigherPriorityThan(otherOperator) {
    return (
      this.precedences(otherOperator) ||
      (this.hasSamePrecedenceAs(otherOperator) && this.isLeftAssociative())
    )
  }

  isLeftAssociative() {
    return true;
  }
}
