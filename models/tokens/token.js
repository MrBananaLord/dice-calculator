class Token {
  constructor(value) {
    this.value = value;
  }

  static canBeInstantiatedFrom(value) {
    return true;
  }

  get type() {
    return 'token';
  }

  mergableWith(otherToken) {
    return false;
  }

  mergedValuesWith(otherToken) {
    return `${this.value}${otherToken.value}`;
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
