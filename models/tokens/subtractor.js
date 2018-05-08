const Token = require('./token.js');

module.exports = class Subtractor extends Token {
  static canBeInstanciatedFrom(value) {
    return value === '-';
  }

  get type() {
    return 'operator';
  }
}
