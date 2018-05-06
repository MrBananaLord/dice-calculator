module.exports = class Token {
  constructor(token) {
    this.value = token;
  }

  number() {
    return !!parseInt(this.value);
  }

  operator() {
    return ['*', '/', '+', '-'].includes(this.value);
  }

  leftBracket() {
    return this.value === '(';
  }

  rightBracket() {
    return this.value === ')';
  }

  precedences(otherToken) {
    return ['+', '-'].includes(otherToken.value) &&
           ['*', '/'].includes(this.value)
  }

  equalPrecedence(otherToken) {
    return (['+', '-'].includes(otherToken.value) && ['+', '-'].includes(this.value)) ||
           (['*', '/'].includes(otherToken.value) && ['*', '/'].includes(this.value))
  }

  leftAssociative() {
    return ['/', '-'].includes(this.value);
  }
}
