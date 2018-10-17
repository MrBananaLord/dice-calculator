class Equasion {
  constructor(string) {
    this.tokenizer = new Tokenizer();

    string.split("").forEach((character) => {
      this.add(character);
    });
  }

  get infixTokens() {
    return this.tokenizer.tokens;
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

  add(character) {
    this.tokenizer.addCharacter(character);
  }
}
