class Subtractor extends Operator {
  static canBeInstantiatedFrom(value) {
    return value === '-';
  }

  get type() {
    return 'operator';
  }

  get precedenceScore() {
    return 1;
  }
}
