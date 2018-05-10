class Roll extends Token {
  static canBeInstantiatedFrom(value) {
    return value.match(/^\d*d\d*$/) != null;
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
      return 1;
    }
  }

  get diceQuantity() {
    let result = this.value.match(/^\d+/);

    if (result) {
      return parseInt(result[0]);
    }
    else {
      return 1;
    }
  }

  resolve() {
    let result = 0;

    for (let rollIndex = 0; rollIndex < this.diceQuantity; rollIndex++) {
      result += this.rollOneDie();
    }

    return result;
  }

  rollOneDie() {
    return Math.floor(Math.random() * Math.floor(this.dieSize)) + 1;
  }

  mergableWith(otherToken) {
    return otherToken.isNumber();
  }
}
