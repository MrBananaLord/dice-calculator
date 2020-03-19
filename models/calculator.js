class Calculator {
    constructor() {
        this.element = $("#rollingStonesCalculator");
        this.element.find(".key").click(e => this.keyClick(e));

        this.displayElement = this.element.find(".display input");
        this.displayElement.click(e => this.handleInput(e));
        $(window).keyup(e => this.handleInput(e));

        this.resultElement = this.element.find(".display .result");
        this.calculateElement = this.element.find(".key.calculate");

        this.equasion = new Equasion();
        this.history = new History();
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

        this.update();

        e.stopPropagation();
    }

    inputMode() {
        this.mode = "input";
        this.equasion.reset();
        this.resultElement.text("");
        this.displayElement.focus();
        this.update()
    }

    push(value) {
        this.equasion.addCharacter(value);
    }

    update() {
        this.element.removeClass('invalid');
        this.calculateElement.removeClass('disabled');

        if (!this.equasion.tokens.length) {
            this.calculateElement.addClass("disabled");
        } else if (!this.equasion.valid) {
            this.element.addClass('invalid');
        }

        this.displayElement.val(this.equasion.tokens.map((t) => t.value).join(""));
    }

    calculate() {
        if (this.equasion.valid) {
            let result = this.equasion.result;

            this.updateResults(result);
            this.history.push(this.equasion);
            this.mode = "result";
        }
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
        this.resultElement.text(`\xa0= ${roll}`);
    }

    handleInput(e) {
        if (e.which == 13) {
            // Enter
            this.calculate();
        } else if (e.which == 191) {
            // Slash "/"
            calculator.inputMode();
        } else {
            this.resultElement.text("");

            this.equasion.fromString(this.displayElement.val());

            this.update();
        }

        e.stopPropagation();
    }
}