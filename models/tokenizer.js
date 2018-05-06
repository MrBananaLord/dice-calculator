const Token = require('./token.js');

module.exports = class Tokenizer {
  constructor(string) {
    this.string = string;
    this.tokens = [];
  }

  lastToken() {
    return this.tokens[this.tokens.length - 1];
  }

  run() {
    this.string.split('').forEach((character) => {
      let token = new Token(character);

      if (token.number() && this.lastToken() && this.lastToken().number()) {
        token = new Token(this.tokens.pop().value + token.value);
      }

      this.tokens.push(token);
    });

    return this.tokens;
  }
}
