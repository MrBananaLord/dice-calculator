class Multiplier extends Operator {
  static canBeInstanciatedFrom(value) {
    return ['*', '×'].includes(value);
  }

  get type() {
    return 'operator';
  }

  get precedenceScore() {
    return 2;
  }
}
