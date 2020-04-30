class Roll extends Token {
  static canBeInstantiatedFrom(value) {
    return String(value).match(/^\d*d\d*$/) != null;
  }

  get type() {
    return 'roll';
  }

  get dieSize() {
    let result = this.value.match(/\d+$/);

    if (result) {
      return parseInt(result[0]);
    }
    else {
      return 0;
    }
  }

  get dieQuantity() {
    let result = this.value.match(/^\d+/);

    if (result) {
      return parseInt(result[0]);
    }
    else {
      return 1;
    }
  }

  rollOneDie() {
    let result = 0;

    if (this.dieSize > 0) {
      result = Math.floor(Math.random() * this.dieSize) + 1;
    }

    return result;
  }

  mergableWith(otherToken) {
    return otherToken.isNumber() || this.equalDieSizeWith(otherToken);
  }

  equalDieSizeWith(otherToken) {
    return otherToken.isRoll() && otherToken.dieSize == this.dieSize;
  }

  mergedValuesWith(otherToken) {
    if (this.equalDieSizeWith(otherToken)) {
      let dieQuantity = this.dieQuantity + otherToken.dieQuantity;

      return this.dieSize == 0 ? `${dieQuantity}d` : `${dieQuantity}d${this.dieSize}`;
    }
    else {
      return super.mergedValuesWith(otherToken);
    }
  }

  requiresPrefixBefore(otherToken) {
    return (otherToken.isRoll() && !this.equalDieSizeWith(otherToken)) || (otherToken.isBracket() && otherToken.isOpening());
  }

  prefixTokenFor(otherToken) {
    if (otherToken.isRoll()) {
      return new Adder('+');
    }
    else {
      return new Multiplier('×');
    }
  }

  resolve() {
    let result = 0;

    for (let rollIndex = 0; rollIndex < this.dieQuantity; rollIndex++) {
      result += this.rollOneDie();
    }

    return result;
  }

}
