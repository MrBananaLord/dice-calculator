class History {
    constructor(calculator) {
        this.calculator = calculator;
        this.visible = false;

        this.displayElement = $("#rollingStonesCalculator .history");
        this.toggleElement = $("#rollingStonesCalculator .key[data-action='showHistory']");
        this.storage = window.localStorage;

        this.elements = JSON.parse(this.storage["history"]) || [];
        this.elements.forEach((e) => this.displayElement.append(`<div>${e}</div>`));

        this.updateToggleElement();

        this.displayElement.children("div").click(e => this.calculator.loadFromHistory(e));
        this.toggleElement.click((e) => this.toggle());
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
        } else {
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
        this.elements.unshift(equasion.toString());

        if (this.elements.length > 10) {
            this.elements.pop();
        }

        this.storage['history'] = JSON.stringify(this.elements);

        this.updateDisplay();
    }

    updateDisplay() {
        if (this.displayElement.children().length > 10) {
            this.displayElement.children().last().remove();
        }

        if (this.hasElements()) {
            this.displayElement.prepend(`<div>${this.elements[0]}</div>`);
        }

        this.updateToggleElement();
    }
}