class Equasion {
  constructor(string) {
    this.infixTokens = new Tokenizer(string).run();
  }

  get postfixTokens() {
    return new Converter(this.infixTokens).run();
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
}
