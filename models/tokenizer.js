class Tokenizer {
  constructor() {
    this.tokens = [];
  }

  static get tokens() {
    return([ Adder, Divider, Multiplier, Subtractor, Bracket, Numeral, Roll, Token ]);
  }

  buildToken(value) {
    let klass = this.constructor.tokens.find((klass) => klass.canBeInstantiatedFrom(value));

    return new klass(value);
  }

  get lastToken() {
    return this.tokens[this.tokens.length - 1];
  }

  addCharacter(character) {
    this.addToken(this.buildToken(character));
  }

  addToken(token) {
    if (token.isToken()) { return; }

    while (this.lastToken && this.lastToken.mergableWith(token)) {
      let lastToken = this.tokens.pop();

      token = this.buildToken(lastToken.mergedValuesWith(token));
    }

    if (this.lastToken && this.lastToken.requiresPrefixBefore(token)) {
      let infixToken = this.lastToken.prefixTokenFor(token);

      this.tokens.push(infixToken);
    }

    this.tokens.push(token);
  }
}
