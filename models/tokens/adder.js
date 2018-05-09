class Adder extends Operator {
  static canBeInstantiatedFrom(value) {
    return value === '+';
  }

  get type() {
    return 'operator';
  }

  get precedenceScore() {
    return 1;
  }

  resolve(a, b) {
    return a + b;
  }
}
