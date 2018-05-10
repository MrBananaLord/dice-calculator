class Roll extends Token {
  static canBeInstantiatedFrom(value) {
    return value.match(/^\d*d\d*$/) != null;
  }

  get type() {
    return 'roll';
  }

  resolve() {
    return 0;
  }

  mergableWith(otherToken) {
    return otherToken.isNumber();
  }
}
