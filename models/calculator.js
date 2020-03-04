class Calculator {
    constructor() {
        this.element = $("#rollingStonesCalculator");
        this.element.find(".box div").click(e => e.stopPropagation());
        this.element.find(".reroll").click(e => this.reroll(e));
        this.element.find(".key").click(e => this.keyClick(e));

        this.displayElement = this.element.find(".display .value");
        this.resultElement = this.element.find(".display .result");

        this.equasion = new Equasion();
        this.mode = "input";
    }

    keyClick(e) {
        let target = $(e.target);
        let action = target.data("action");

        if (action == null) {
            if (this.mode == "result") {
                this.inputMode();
            }

            this.push(target.data("value"));
        } else {
            this[action]();
        }

        this.updateEquasionDisplay();

        e.stopPropagation();
    }

    inputMode() {
        this.mode = "input";
        this.equasion.reset();
        this.resultElement.addClass("hidden");
        this.resultElement.find(".regular").text();
        this.updateEquasionDisplay()
    }

    push(value) {
        this.equasion.addCharacter(value);
    }

    updateEquasionDisplay() {
        if (!this.equasion.valid) {
            this.element.addClass('invalid');
        } else {
            this.element.removeClass('invalid');
        }

        this.displayElement.text(this.equasion.tokens.map((t) => t.value).join(""));
    }

    calculate() {
        let result = this.equasion.result;

        this.updateResults(result);
        this.mode = "result";
    }

    clear() {
        this.inputMode();
    }

    revert() {
        if (this.mode == "input") {
            this.equasion.tokens.pop();
        }
    }

    updateResults(roll) {
        this.resultElement.removeClass("hidden");
        this.resultElement.find(".regular").text(roll);
    }
}