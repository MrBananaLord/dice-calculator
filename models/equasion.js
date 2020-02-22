class Equasion {
  constructor() {
    this.tokenizer = new Tokenizer();
  }

  get postfixTokens() {
    return new Converter(this.tokens).run();
  }

  get postfix() {
    return this.postfixTokens.map((t) => t.value).join(' ');
  }

  get result() {
    let result = new Resolver(this.postfixTokens).run();

    if (isNaN(result)) {
      throw new Error("Invalid syntax!");
    }

    return result;
  }

  get tokens() {
    return this.tokenizer.tokens;
  }

  set tokens(value) {
    this.tokenizer.tokens = value;
  }

  reset() {
    this.tokenizer.reset();
  }

  addCharacter(value) {
    this.tokenizer.addCharacter(value);
  }

  fromString(value) {
    this.tokenizer.fromString(value);
  }
}
