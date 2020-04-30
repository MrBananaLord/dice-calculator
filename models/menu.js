class Menu {
    constructor() {
        this.visible = false;

        this.displayElement = $(`.${this.classNamespace}`);
        this.toggleElement = $(`[data-action='toggleMenu'][data-value='${this.classNamespace}']`);

        this.items = this.loadItems();
        this.items.forEach((e) => this.displayElement.append(this.itemHTML(e)));
        this.updateToggleElement();

        this.registerEventBindings();
    }

    get storage() {
        return window.localStorage[this.classNamespace];
    }

    set storage(value) {
        window.localStorage[this.classNamespace] = value;
    }

    registerEventBindings() {}

    loadItems() {
        if (this.storage) {
            return JSON.parse(this.storage).slice(0, 10);
        } else {
            return [];
        }
    }

    saveItems() {
        this.storage = JSON.stringify(this.items);
    }

    hasItems() {
        return this.items.length > 0;
    }

    updateToggleElement() {
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
        if (this.hasItems()) {
            this.displayElement.removeClass("hidden");
            this.toggleElement.addClass("active");

            this.visible = true;
        }
    }

    addItemToDisplay() {
        if (this.displayElement.children().length > 10) {
            this.displayElement.children().last().remove();
        }

        if (this.hasItems()) {
            this.displayElement.prepend(this.itemHTML(this.items[0]));
        }

        this.updateToggleElement();
    }
}