class History {
    constructor() {
        this.displayElement = $("#rollingStonesCalculator .history");
        this.elements = [];
        this.storage = window.localStorage;
    }

    push(element) {
        this.elements.push(element);

        if (this.elements.length > 10) {
            this.elements.shift();
        }

        this.storage['history'] = JSON.stringify(this.elements);

        this.updateDisplay();
    }

    limitExceeded() {

    }

    updateDisplay() {
        if (this.displayElement.children().length > 10) {
            this.displayElement.children().last().remove();
        }

        this.displayElement.prepend(`<div>${this.elements[0].tokens.map((t) => t.value).join("")}</div>`);
    }
}