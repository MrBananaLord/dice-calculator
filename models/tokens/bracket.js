class Bracket extends Token {
  static get openingBrackets() {
    return ['(', '[', '{'];
  }

  static get closingBrackets() {
    return [')', ']', '}'];
  }

  static canBeInstantiatedFrom(value) {
    return (this.openingBrackets.concat(this.closingBrackets)).includes(value);
  }

  get type() {
    return 'bracket';
  }

  isOpening() {
    return this.constructor.openingBrackets.includes(this.value);
  }

  isClosing() {
    return this.constructor.closingBrackets.includes(this.value);
  }
}
