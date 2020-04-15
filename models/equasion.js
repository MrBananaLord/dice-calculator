class Equasion {
    constructor() {
        this.tokenizer = new Tokenizer();
        this._converter = new Converter();
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
            let result = new Resolver(this.postfixTokens).run();

            return Boolean(!isNaN(result));
        }
    }

    get result() {
        let result = new Resolver(this.postfixTokens).run();

        if (isNaN(result)) {
            throw new Error("Invalid syntax!");
        }

        return result;
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

    reset() {
        this.tokenizer.reset();
    }

    addCharacter(value) {
        this.tokenizer.addCharacter(value);
    }

    fromString(value) {
        this.tokenizer.fromString(value);

        return this;
    }

    toString() {
        return this.tokens.map((token) => token.value).join("");
    }
}