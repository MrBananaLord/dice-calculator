const Token = require('./token.js');

module.exports = class Divider extends Token {
  static canBeInstanciatedFrom(value) {
    return ['/', '÷'].includes(value);
  }

  get type() {
    return 'operator';
  }
}
