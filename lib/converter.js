class Converter {
  constructor() {
    this._tokens = [];
    this._operators = [];
    this._output = [];
  }

  set tokens(value) {
    this._operators = [];
    this._output = [];
    this._tokens = value;
  }

  get tokens() {
    return this._tokens;
  }

  get lastOperator() {
    return this._operators[this._operators.length - 1];
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
        this._output.push(token);
      }
      else if (token.isOperator()) {
        while (this.lastOperator && !this.lastOperator.isBracket() && this.lastOperator.hasHigherPriorityThan(token)) {
          this._output.push(this._operators.pop());
        }

        this._operators.push(token);
      }
      else if (token.isBracket() && token.isOpening()) {
        this._operators.push(token);
      }
      else if (token.isBracket() && token.isClosing()) {
        while (this.lastOperator && !this.lastOperator.isBracket()) {
          this._output.push(this._operators.pop());
        }

        if (this._operators.length == 0) {
          throw new Error("Invalid syntax!");
        }

        this._operators.pop();
      }
    });

    while (this._operators.length) {
      if (this.lastOperator.isBracket()) {
        throw new Error("Invalid syntax!");
      }

      this._output.push(this._operators.pop());
    }

    return this._output;
  }
}
