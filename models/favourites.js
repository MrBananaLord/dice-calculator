class Favourites {
    constructor() {
        this.visible = false;

        this.displayElement = $(".favourites");
        this.toggleElement = $("[data-action='toggleMenu'][data-value='favourites']");
        this.storage = window.localStorage;

        this.items = [];
        if (this.storage["favourites"]) {
            this.items = JSON.parse(this.storage["favourites"]).slice(0, 10);
        }
        this.items.forEach((e) => this.displayElement.append(this.itemHTML(e)));

        this.updateToggleItem();

        $(document).on("click", "[data-action='addFavourite']", e => this.addFavourite(e));
    }

    hasItems() {
        return this.items.length > 0;
    }

    updateToggleItem() {
        if (this.hasItems()) {
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

        if (this.items.length == 0 || this.items[0].value != equasion.toString()) {
            this.items.unshift({ value: equasion.toString(), name: equasion.toString() });

            if (this.items.length > 10) {
                this.items = this.items.slice(0, 10);
            }

            this.storage['favourites'] = JSON.stringify(this.items);

            this.updateDisplay();
        }
    }

    updateDisplay() {
        if (this.displayElement.children().length > 10) {
            this.displayElement.children().last().remove();
        }

        if (this.hasItems()) {
            this.displayElement.prepend(this.itemHTML(this.items[0]));
        }

        this.updateToggleItem();
    }

    itemHTML(item) {
        return `
            <div class="element">
                <div class="clickable value"                 data-value="${item.value}" data-action="loadEquasion">${item.value}</div>
                <div class="clickable material-icons edit"   data-value="${item.name}" data-action="renameFavourite">edit</div>
                <div class="clickable material-icons roll"   data-value="${item.value}" data-action="roll">replay</div>
            </div>
        `;
    }
}