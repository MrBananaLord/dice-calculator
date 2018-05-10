class Tokenizer {
  constructor(string) {
    this.string = string;
    this.tokens = [];
  }

  static get tokens() {
    return([ Adder, Divider, Multiplier, Subtractor, Bracket, Numeral, Roll, Token ]);
  }

  static buildToken(value) {
    let klass = this.tokens.find((klass) => klass.canBeInstantiatedFrom(value));

    return new klass(value);
  }

  get lastToken() {
    return this.tokens[this.tokens.length - 1];
  }

  run() {
    this.string.split('').forEach((character) => {
      let token = this.constructor.buildToken(character);

      if (token.token) { return; }

      if ((token.number || token.roll) && this.lastToken && this.lastToken.mergableWith(token)) {
        token = this.constructor.buildToken(this.tokens.pop().value + token.value);
      }

      this.tokens.push(token);
    });

    return this.tokens;
  }
}
