class Bracket extends Token {
  static get openingBrackets() {
    return ['(', '[', '{'];
  }

  static get closingBrackets() {
    return [')', ']', '}'];
  }

  static canBeInstanciatedFrom(value) {
    return (this.openingBrackets.concat(this.closingBrackets)).includes(value);
  }

  get type() {
    return 'bracket';
  }

  get opening() {
    return this.constructor.openingBrackets.includes(this.value);
  }

  get closing() {
    return this.constructor.closingBrackets.includes(this.value);
  }
}
