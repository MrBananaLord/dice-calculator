const Token = require('./token.js');

module.exports = class Operator extends Token {
  get type() {
    return 'operator';
  }

  get precedenceScore() {
    return 1;
  }

  precedences(otherToken) {
    return this.precedenceScore > otherToken.precedenceScore;
  }

  hasEqualPrecedence(otherToken) {
    return this.precedenceScore == otherToken.precedenceScore;
  }

  leftAssociative() {
    return true;
  }
}
