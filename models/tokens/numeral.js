class Numeral extends Token {
  static canBeInstantiatedFrom(value) {
    return String(value).match(/^\d+$/) != null;
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

  requiresPrefixBefore(otherToken) {
    return otherToken.isBracket() && otherToken.isOpening();
  }

  prefixTokenFor(otherToken) {
    return new Multiplier('×');
  }
}
