module.exports = class Token {
  constructor(value) {
    this.value = value;
  }

  static canBeInstanciatedFrom(value) {
    return true;
  }

  get type() {
    return 'token';
  }

  get number() {
    return this.type === 'number';
  }

  get operator() {
    return this.type === 'operator';
  }

  get bracket() {
    return this.type === 'bracket';
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
