class Favourites extends Menu {
    get classNamespace() {
        return "favourites";
    }

    afterInitialize() {
        $(document).on("click", "[data-action='addFavourite']", e => this.addFavourite(e));
        $(document).on("click", "[data-action='editFavourite']", e => this.editFavourite(e));
        $(document).on("click", "[data-action='updateFavourite']", e => this.updateFavourite(e));
        $(document).on("click", "[data-action='deleteFavourite']", e => this.deleteFavourite(e));
    }

    addFavourite(e) {
        let equasion = $(e.target).data("value");

        if (this.items.length >= 10) {
            alert("Reached maximum saved favourites!");
        } else if (this.items.length == 0 || this.items[0].value != equasion.toString()) {
            let item = { id: ID(), value: equasion.toString(), name: equasion.toString() };
            this.items.push(item);

            this.saveItems();
            this.addItemToDisplay(item);
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

        this.saveItems();
        wrapper.replaceWith(this.itemHTML(item));
    }

    deleteFavourite(e) {
        let id = $(e.target).data("target");
        let wrapper = $(`div.element[data-id="${id}"]`);

        this.items = this.items.filter(e => e.id != id);
        this.saveItems();

        wrapper.remove();
        this.updateToggleElement();
    }

    addItemToDisplay(item) {
        if (this.hasItems()) {
            this.displayElement.append(this.itemHTML(item));
        }

        this.updateToggleElement();
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