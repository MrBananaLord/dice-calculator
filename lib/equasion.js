class Equasion {
    constructor() {
        this.tokenizer = new Tokenizer();
        this._converter = new Converter();
        this._result = NaN;
    }

    get postfixTokens() {
        return this.converter.run();
    }

    get postfix() {
        return this.postfixTokens.map((t) => t.value).join(' ');
    }

    get valid() {
        if (!this.converter.valid) {
            return false;
        } else {
            if (isNaN(this._result)) { this.run() }

            return Boolean(!isNaN(this._result));
        }
    }

    get result() {
        if (isNaN(this._result)) {
            throw new Error("Invalid syntax!");
        }

        return this._result;
    }

    get tokens() {
        return this.tokenizer.tokens;
    }

    set tokens(value) {
        this.tokenizer.tokens = value;
    }

    get converter() {
        this._converter.tokens = this.tokens;

        return this._converter;
    }

    run() {
        this._result = new Resolver(this.postfixTokens).run();
    }

    reset() {
        this.tokenizer.reset();
        this._result = NaN;
    }

    addCharacter(value) {
        this._result = NaN;
        this.tokenizer.addCharacter(value);
    }

    fromString(value) {
        this._result = NaN;
        this.tokenizer.fromString(value);

        return this;
    }

    toString() {
        return this.tokens.map(token => token.value).join("");
    }

    toResultHTML() {
        return this.tokens.map(token => token.toResultHTML()).join("");
    }

    toStaticHTML() {
        return this.tokens.map(token => token.toStaticHTML()).join("");
    }
}