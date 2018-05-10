class Converter {
  constructor() {
    this.output    = [];
    this.operators = [];
  }

  get lastOperator() {
    return this.operators[this.operators.length - 1];
  }

  isLastOperatorOpeningBracket() {
    return this.lastOperator.isBracket() && this.lastOperator.isOpening();
  }

  infixToPostfix(tokens) {
    tokens.forEach((token) => {
      if (token.isNumber()) {
        this.output.push(token);
      }
      else if (token.isOperator()) {
        while (this.lastOperator && !this.isLastOperatorOpeningBracket() && this.lastOperator.hasHigherPriorityThan(token)) {
          this.output.push(this.operators.pop());
        }

        this.operators.push(token);
      }
      else if (token.isBracket() && token.isOpening()) {
        this.operators.push(token);
      }
      else if (token.isBracket() && token.isClosing()) {
        while (this.lastOperator && !this.isLastOperatorOpeningBracket()) {
          this.output.push(this.operators.pop());
        }

        this.operators.pop();
      }
    });

    while (this.operators.length) {
      this.output.push(this.operators.pop());
    }

    return this.output;
  }
}
