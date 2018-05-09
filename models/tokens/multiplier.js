class Multiplier extends Operator {
  static canBeInstantiatedFrom(value) {
    return ['*', '×'].includes(value);
  }

  get type() {
    return 'operator';
  }

  get precedenceScore() {
    return 2;
  }

  resolve(a, b) {
    return a * b;
  }
}
