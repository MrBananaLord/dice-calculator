const Operator = require('./operator.js');

module.exports = class Divider extends Operator {
  static canBeInstanciatedFrom(value) {
    return ['/', '÷'].includes(value);
  }

  get type() {
    return 'operator';
  }

  get precedenceScore() {
    return 2;
  }
}
