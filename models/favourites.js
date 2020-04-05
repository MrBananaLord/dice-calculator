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
        $(document).on("click", "[data-action='editFavourite']", e => this.editFavourite(e));
        $(document).on("click", "[data-action='updateFavourite']", e => this.updateFavourite(e));
        $(document).on("click", "[data-action='deleteFavourite']", e => this.deleteFavourite(e));
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
            this.items.unshift({ id: ID(), value: equasion.toString(), name: equasion.toString() });

            if (this.items.length > 10) {
                this.items = this.items.slice(0, 10);
            }

            this.storage['favourites'] = JSON.stringify(this.items);

            this.addItemToDisplay();
        }
    }

    editFavourite(e) {
        let id = $(e.target).data("target");
        let wrapper = $(`div.element[data-id="${id}"]`);
        let input = wrapper.find("input.name");
        let originalValue = input.val();

        input.val('');
        wrapper.addClass("editing");
        input.blur().focus().val(originalValue);
    }

    updateFavourite(e) {
        let id = $(e.target).data("target");
        let wrapper = $(`div.element[data-id="${id}"]`);
        let item = this.items.find(e => e.id == id);

        item.name = wrapper.find("input.name").val();
        item.value = wrapper.find("input.equasion").val();

        this.storage['favourites'] = JSON.stringify(this.items);

        wrapper.replaceWith(this.itemHTML(item));
    }

    deleteFavourite(e) {
        let id = $(e.target).data("target");
        let wrapper = $(`div.element[data-id="${id}"]`);

        this.items = this.items.filter(e => e.id != id);
        this.storage['favourites'] = JSON.stringify(this.items);

        wrapper.remove();

        this.updateToggleItem();
    }

    addItemToDisplay() {
        if (this.displayElement.children().length > 10) {
            this.displayElement.children().last().remove();
        }

        if (this.hasItems()) {
            this.displayElement.prepend(this.itemHTML(this.items[0]));
        }

        this.updateToggleItem();
    }

    itemHTML(item) {
        // migrate to use only target-id
        return `
            <div class="element" data-id="${item.id}">
                <div class="editor">
                    <div class="clickable material-icons submit" data-target="${item.id}" data-action="updateFavourite">check</div>
                    <div class="value">
                        <input class="name" type="value" value="${item.name}">
                        <input class="equasion" type="value" value="${item.value}">
                    </div>
                    <div class="clickable material-icons delete" data-target="${item.id}" data-action="deleteFavourite">delete</div>
                </div>
                <div class="viewer">
                    <div class="clickable material-icons edit" data-target="${item.id}"   data-action="editFavourite">edit</div>
                    <div class="clickable value" data-action="loadEquasion">
                        <div class="name" data-value="${item.value}">${item.name}</div>
                        <div class="equasion" data-value="${item.value}">${item.value}</div>
                    </div>
                    <div class="clickable material-icons roll" data-value="${item.value}" data-action="roll">replay</div>
                </div>
            </div>
        `;
    }
}