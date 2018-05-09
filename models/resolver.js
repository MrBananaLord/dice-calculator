class Resolver {
  constructor(tokens) {
    this.tokens = tokens;
    this.stack  = [];
  }

  run() {
    this.tokens.forEach((token) => {
      console.debug();
      if (token.number) {
        this.stack.push(token.toInt);
      }
      else if (token.operator) {
        let lastValue = this.stack.pop();
        let secondToLastValue = this.stack.pop();

        this.stack.push(token.resolve(secondToLastValue, lastValue));
      }
    });

    return this.stack[0];
  }
}
