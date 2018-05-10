class Token {
  constructor(value) {
    this.value = value;
  }

  static canBeInstantiatedFrom(value) {
    return true;
  }

  mergableWith(otherToken) {
    return false;
  }

  get type() {
    return 'token';
  }

  isNumber() {
    return this.type === 'number';
  }

  isOperator() {
    return this.type === 'operator';
  }

  isBracket() {
    return this.type === 'bracket';
  }

  isRoll() {
    return this.type === 'roll';
  }

  isToken() {
    return this.type === 'token';
  }
}
