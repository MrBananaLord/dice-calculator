const Token = require('./token.js');

module.exports = class Equasion {
  constructor(string) {
    this.equasion = string;

    this.output    = [];
    this.operators = [];
  }

  lastOperator() {
    return this.operators[this.operators.length - 1];
  }

  toPostfix() {
    this.equasion.split('').forEach((character) => {
      let token = new Token(character);

      if (token.number()) {
        this.output.push(token);
      }
      else if (token.operator()) {
        while (this.lastOperator() && !this.lastOperator().leftBracket() && (this.lastOperator().precedences(token) || (this.lastOperator().equalPrecedence(token) && this.lastOperator().leftAssociative()))) {
          this.output.push(this.operators.pop());
        }

        this.operators.push(token);
      }
      else if (token.leftBracket()) {
        this.operators.push(token);
      }
      else if (token.rightBracket()) {
        while (this.lastOperator() && !this.lastOperator().leftBracket()) {
          this.output.push(this.operators.pop());
        }

        this.operators.pop();
      }
    });

    while (this.operators.length) {
      this.output.push(this.operators.pop());
    }

    return this.output.map((token) => token.value).join(' ');
  }
}
