class History {
    constructor() {
        this.displayElement = $("#rollingStonesCalculator .history");
        this.toggleKey = $("#rollingStonesCalculator .key[data-action='showHistory']");
        this.storage = window.localStorage;

        this.elements = JSON.parse(this.storage["history"]) || [];
        this.elements.forEach((e) => this.displayElement.append(`<div>${e}</div>`));

        if (this.elements.length > 0) {
            this.toggleKey.removeClass("disabled");
        }
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

        if (this.elements.length > 0) {
            this.displayElement.prepend(`<div>${this.elements[0]}</div>`);
        }
    }
}