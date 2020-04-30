class Menu {
    constructor() {
        this.visible = false;

        this.displayElement = $(`.${this.classNamespace}`);
        this.toggleElement = $(`[data-action='toggleMenu'][data-value='${this.classNamespace}']`);

        this.items = this.loadItems();
        this.items.forEach((item) => this.addItemToDisplay(item));
        this.updateToggleElement();

        this.afterInitialize();
    }

    get storage() {
        return window.localStorage[this.classNamespace];
    }

    set storage(value) {
        window.localStorage[this.classNamespace] = value;
    }

    afterInitialize() {}

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
}