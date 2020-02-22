class Divider extends Operator {
  static canBeInstantiatedFrom(value) {
    return ['/', '÷'].includes(String(value));
  }

  get precedenceScore() {
    return 2;
  }

  resolve(a, b) {
    return a / b;
  }
}
