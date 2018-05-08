const Token = require('./token.js');

module.exports = class Adder extends Token {
  static canBeInstanciatedFrom(value) {
    return value === '+';
  }

  get type() {
    return 'operator';
  }
}
