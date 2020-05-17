class Token {
    constructor(value) {
        this.value = String(value);
        this.afterInitialize();
    }

    static canBeInstantiatedFrom(value) {
        return true;
    }

    get type() {
        return 'token';
    }

    afterInitialize() {}

    mergableWith(otherToken) {
        return false;
    }

    mergedValuesWith(otherToken) {
        return `${this.value}${otherToken.value}`;
    }

    requiresPrefixBefore(otherToken) {
        return false;
    }

    isNumber() {
        return this.type === 'number';
    }

    isOperator() {
        return this.type === 'operator';
    }

    isBracket() {
        return this.type === 'bracket';
    }

    isRoll() {
        return this.type === 'roll';
    }

    isToken() {
        return this.type === 'token';
    }

    toResultHTML() {
        return `
            <div class="token">${this.value}</div>
        `;
    }

    toStaticHTML() {
        return `
            <div class="token">${this.value}</div>
        `;
    }
}