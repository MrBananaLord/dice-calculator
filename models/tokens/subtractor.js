class Subtractor extends Operator {
  static canBeInstantiatedFrom(value) {
    return String(value) === '-';
  }

  get precedenceScore() {
    return 1;
  }

  resolve(a,b) {
    return a - b;
  }
}
