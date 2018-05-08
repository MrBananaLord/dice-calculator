module.exports = class Converter {
  constructor() {
    this.output    = [];
    this.operators = [];
  }

  lastOperator() {
    return this.operators[this.operators.length - 1];
  }

  lastOperatorIsNotOpeningBracket() {
    let lastOperator = this.lastOperator();

    return lastOperator && !(lastOperator.bracket && lastOperator.opening);
  }

  infixToPostfix(tokens) {

    tokens.forEach((token) => {
      if (token.number) {
        this.output.push(token);
      }
      else if (token.operator) {
        while (this.lastOperatorIsNotOpeningBracket() && (this.lastOperator().precedences(token) || (this.lastOperator().hasEqualPrecedence(token) && this.lastOperator().leftAssociative()))) {
          this.output.push(this.operators.pop());
        }

        this.operators.push(token);
      }
      else if (token.bracket && token.opening) {
        this.operators.push(token);
      }
      else if (token.bracket && token.closing) {
        while (this.lastOperatorIsNotOpeningBracket()) {
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
