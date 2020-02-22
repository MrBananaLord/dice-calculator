class Converter {
  constructor() {
    this._tokens = [];
  }

  reset() {
    this.output = [];
    this.operators = [];
  }

  set tokens(value) {
    this.reset();
    this._tokens = value;
  }

  get lastOperator() {
    return this.operators[this.operators.length - 1];
  }

  get valid() {
    try {
      this.run();
      return true;
    }
    catch (error) {
      return false;
    }
  }

  run() {
    this._tokens.forEach((token) => {
      if (token.isNumber() || token.isRoll()) {
        this.output.push(token);
      }
      else if (token.isOperator()) {
        while (this.lastOperator && !this.lastOperator.isBracket() && this.lastOperator.hasHigherPriorityThan(token)) {
          this.output.push(this.operators.pop());
        }

        this.operators.push(token);
      }
      else if (token.isBracket() && token.isOpening()) {
        this.operators.push(token);
      }
      else if (token.isBracket() && token.isClosing()) {
        while (this.lastOperator && !this.lastOperator.isBracket()) {
          this.output.push(this.operators.pop());
        }

        if (this.operators.length == 0) {
          throw new Error("Invalid syntax!");
        }

        this.operators.pop();
      }
    });

    while (this.operators.length) {
      if (this.lastOperator.isBracket()) {
        throw new Error("Invalid syntax!");
      }

      this.output.push(this.operators.pop());
    }

    return this.output;
  }
}
