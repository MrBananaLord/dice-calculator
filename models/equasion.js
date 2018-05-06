const Tokenizer = require('./tokenizer.js');
const Converter = require('./converter.js');

module.exports = class Equasion {
  constructor(string) {
    this.tokens = new Tokenizer(string).run();
  }

  toPostfix() {
    return new Converter().infixToPostfix(this.tokens).map((t) => t.value).join(' ');
  }
}
