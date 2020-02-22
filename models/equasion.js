class Equasion {
  constructor(tokens) {
    this.tokens = tokens;
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
}
