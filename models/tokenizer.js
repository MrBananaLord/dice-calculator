const Token      = require('./tokens/token.js');
const Adder      = require('./tokens/adder.js');
const Bracket    = require('./tokens/bracket.js');
const Divider    = require('./tokens/divider.js');
const Multiplier = require('./tokens/multiplier.js');
const Numeral    = require('./tokens/numeral.js');
const Subtractor = require('./tokens/subtractor.js');

module.exports = class Tokenizer {
  constructor(string) {
    this.string = string;
    this.tokens = [];
  }

  static get tokens() {
    return([ Adder, Divider, Multiplier, Subtractor, Bracket, Numeral, Token ]);
  }

  static buildToken(value) {
    let klass = this.tokens.find((klass) => klass.canBeInstanciatedFrom(value));

    return new klass(value);
  }

  lastToken() {
    return this.tokens[this.tokens.length - 1];
  }

  run() {
    this.string.split('').forEach((character) => {
      let token = this.constructor.buildToken(character);

      if (token.number && this.lastToken() && this.lastToken().number) {
        token = this.constructor.buildToken(this.tokens.pop().value + token.value);
      }

      this.tokens.push(token);
    });

    return this.tokens;
  }
}
