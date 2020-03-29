class History {
    constructor() {
        this.visible = false;

        this.displayElement = $(".history");
        this.toggleElement = $("[data-action='toggleMenu'][data-value='history']");
        this.storage = window.localStorage;

        this.elements = [];
        if (this.storage["history"]) {
            this.elements = JSON.parse(this.storage["history"]).slice(0, 10);
        }
        this.elements.forEach((e) => this.displayElement.append(this.itemHTML(e)));

        this.updateToggleElement();
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
        if (this.hasElements()) {
            this.displayElement.removeClass("hidden");
            this.toggleElement.addClass("active");

            this.visible = true;
        }
    }

    push(equasion) {
        if (this.elements.length == 0 || this.elements[0].value != equasion.toString()) {
            this.elements.unshift({ value: equasion.toString() });

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
            this.displayElement.prepend(this.itemHTML(this.elements[0]));
        }

        this.updateToggleElement();
    }

    itemHTML(item) {
        return `
            <div class="element">
                <div class="clickable material-icons favourite" data-value="${item.value}" data-action="addFavourite">star_border</div>
                <div class="clickable value"                    data-value="${item.value}" data-action="loadEquasion">${item.value}</div>
                <div class="clickable material-icons roll"      data-value="${item.value}" data-action="roll"        >replay</div>
            </div>
        `;
    }
}