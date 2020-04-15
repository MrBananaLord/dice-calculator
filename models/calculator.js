class Calculator {
    constructor() {
        this.element = $("#rollingStonesCalculator");
        this.displayElement = this.element.find(".display input");
        this.resultElement = this.element.find(".display .result");
        this.calculateElement = this.element.find(".key.calculate");

        this.equasion = new Equasion();
        this.history = new History();
        this.favourites = new Favourites();
        this.chains = new Chains();

        this.mode = "input";
        this.displayElement.focus();

        $(document).on("click", "[data-action='loadEquasion']", e => this.loadEquasion(e));
        $(document).on("click", "[data-action='roll']", e => this.roll(e));
        $(document).on("click", "[data-action='revert']", e => this.revert(e));
        $(document).on("click", "[data-action='clear']", e => this.clear(e));
        $(document).on("click", "[data-action='appendSymbol']", e => this.appendSymbol(e));
        $(document).on("click", "[data-action='calculate']", e => this.calculate(e));
        $(document).on("click", "[data-action='toggleMenu']", e => this.toggleMenu(e));
        $(document).on("keyup", e => this.handleInput(e));

    }

    toggleMenu(e) {
        let targetMenu = this[$(e.target).data("value")];
        let activeMenu = [this.history, this.favourites, this.chains].find(e => e.visible);

        if (targetMenu === activeMenu) {
            targetMenu.hide();
        } else if (activeMenu) {
            activeMenu.hide();
            targetMenu.activate();
        } else {
            targetMenu.activate();
        }
    }

    loadEquasion(e) {
        this.inputMode();
        this.equasion.fromString($(e.target).data("value").toString());
        this.update();
    }

    roll(e) {
        this.loadEquasion(e);
        this.calculate();
    }

    appendSymbol(e) {
        let target = $(e.target);
        if (this.mode == "result") {
            this.inputMode();
        }

        this.push(target.data("value"));
        this.update();
    }

    inputMode() {
        this.mode = "input";
        this.equasion.reset();
        this.resultElement.text("");
        this.update();
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

        this.displayElement.val(this.equasion.toString());

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
    }
}