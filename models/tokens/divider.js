class Divider extends Operator {
  static canBeInstantiatedFrom(value) {
    return ['/', '÷'].includes(value);
  }

  get precedenceScore() {
    return 2;
  }

  resolve(a, b) {
    return a / b;
  }
}
