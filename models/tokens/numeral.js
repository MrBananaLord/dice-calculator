class Numeral extends Token {
  static canBeInstantiatedFrom(value) {
    return value.match(/^\d+$/) != null;
  }

  get type() {
    return 'number';
  }

  get toInt() {
    return parseInt(this.value);
  }

  mergableWith(otherToken) {
    return otherToken.isNumber() || otherToken.isRoll();
  }
}
