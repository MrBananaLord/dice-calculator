class Divider extends Operator {
  static canBeInstantiatedFrom(value) {
    return ['/', '÷'].includes(value);
  }

  get type() {
    return 'operator';
  }

  get precedenceScore() {
    return 2;
  }
}
