class Menu {
    constructor() {
        this.beforeInitialize();

        this.model = new this.modelClass;

        this.displayElement = $(`.menu.${this.model.classNamespace}`);
        this.toggleElement = $(`[data-action='toggleMenu'][data-value='${this.model.classNamespace}Menu']`);

        this.visible = false;

        this.items = this.model.all;
        this.items.forEach((item) => this.addItemToDisplay(item));
        this.updateToggleElement();

        this.afterInitialize();
    }

    beforeInitialize() {}
    afterInitialize() {}

    get lastItem() {
        return this.items[this.items.length - 1];
    }

    reloadItems() {
        this.items = this.model.all;
    }

    hasItems() {
        return this.items.length > 0;
    }

    saveItems() {
        this.model.save(this.items);
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