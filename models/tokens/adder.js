class Adder extends Operator {
  static canBeInstantiatedFrom(value) {
    return String(value) === '+';
  }

  resolve(a, b) {
    return a + b;
  }
}
