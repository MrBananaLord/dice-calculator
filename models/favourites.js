class Favourites {
    constructor() {
        this.visible = false;

        this.displayElement = $(".favourites");
        this.toggleElement = $("[data-action='toggleMenu'][data-value='favourites']");
        this.storage = window.localStorage;

        this.elements = [];
        if (this.storage["favourites"]) {
            this.elements = JSON.parse(this.storage["favourites"]).slice(0, 10);
        }
        this.elements.forEach((e) => this.displayElement.append(this.elementHTML(e)));

        this.updateToggleElement();

        $(document).on("click", "[data-action='addFavourite']", e => this.addFavourite(e));
    }

    roll(e) {
        // this.calculator.loadFromHistory($(e.target).parent(".element").data("value"));
        // this.calculator.calculate();
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

    hide() {
        this.displayElement.addClass("hidden");
        this.toggleElement.removeClass("active");

        this.visible = false;
    }

    activate() {
        this.displayElement.removeClass("hidden");
        this.toggleElement.addClass("active");

        this.visible = true;
    }

    addFavourite(e) {
        let equasion = $(e.target).data("value");

        if (this.elements[0] != equasion.toString()) {
            this.elements.unshift(equasion.toString());

            if (this.elements.length > 10) {
                this.elements = this.elements.slice(0, 10);
            }

            this.storage['favourites'] = JSON.stringify(this.elements);

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
            <div class="element">
                <div class="clickable value"                    data-value="${value}" data-action="loadEquasion">${value}</div>
                <div class="clickable material-icons roll"      data-value="${value}" data-action="roll"        >replay</div>
            </div>
        `;
    }
}