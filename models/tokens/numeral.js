const Token = require('./token.js');

module.exports = class Numeral extends Token {
  static canBeInstanciatedFrom(value) {
    return Number.isInteger(parseInt(value));
  }

  get type() {
    return 'number';
  }
}
