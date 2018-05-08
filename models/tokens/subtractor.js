const Operator = require('./operator.js');

module.exports = class Subtractor extends Operator {
  static canBeInstanciatedFrom(value) {
    return value === '-';
  }

  get type() {
    return 'operator';
  }

  get precedenceScore() {
    return 1;
  }
}
