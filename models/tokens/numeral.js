class Numeral extends Token {
  static canBeInstantiatedFrom(value) {
    return Number.isInteger(parseInt(value));
  }

  get type() {
    return 'number';
  }
}
