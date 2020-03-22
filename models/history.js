class History {
    constructor(calculator) {
        this.calculator = calculator;
        this.visible = false;

        this.displayElement = $("#rollingStonesCalculator .history");
        this.toggleElement = $("#rollingStonesCalculator .key[data-action='showHistory']");
        this.storage = window.localStorage;

        this.elements = [];
        if (this.storage["history"]) {
            this.elements = JSON.parse(this.storage["history"]).slice(0, 10);
        }
        this.elements.forEach((e) => this.displayElement.append(this.elementHTML(e)));

        this.updateToggleElement();

        this.displayElement.on("click", ".element .value", e => this.load(e));
        this.displayElement.on("click", ".element .reroll", e => this.reroll(e));
        this.toggleElement.on("click", (e) => this.toggle());
    }

    load(e) {
        this.calculator.loadFromHistory($(e.target).parent(".element").data("value"));
    }

    reroll(e) {
        this.calculator.loadFromHistory($(e.target).parent(".element").data("value"));
        this.calculator.calculate();
    }

    hasElements() {
        return this.elements.length > 0;
    }

    updateToggleElement() {
        if (this.hasElements()) {
            this.toggleElement.removeClass("disabled");
        } else {
            this.toggleElement.addClass("disabled");
        }
    }

    toggle() {
        if (this.visible) {
            this.hide();
        } else if (this.hasElements()) {
            this.activate();
        }
    }

    hide() {
        this.displayElement.addClass("hidden");
        this.toggleElement.removeClass("active");

        this.visible = false;
    }

    activate() {
        this.calculator.hideMenus();
        this.displayElement.removeClass("hidden");
        this.toggleElement.addClass("active");

        this.visible = true;
    }

    push(equasion) {
        if (this.elements[0] != equasion.toString()) {
            this.elements.unshift(equasion.toString());

            if (this.elements.length > 10) {
                this.elements = this.elements.slice(0, 10);
            }

            this.storage['history'] = JSON.stringify(this.elements);

            this.updateDisplay();
        }
    }

    updateDisplay() {
        if (this.displayElement.children().length > 10) {
            this.displayElement.children().last().remove();
        }

        if (this.hasElements()) {
            this.displayElement.prepend(this.elementHTML(this.elements[0]));
        }

        this.updateToggleElement();
    }

    elementHTML(value) {
        return `
            <div class="element" data-value="${value}">
                <div class="clickable value">${value}</div>
                <div class="clickable reroll material-icons">replay</div>
            </div>
        `;
    }
}