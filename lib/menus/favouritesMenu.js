class FavouritesMenu extends Menu {
    get modelClass() {
        return Favourite;
    }

    beforeInitialize() {
        this.history = new History();
    }

    afterInitialize() {
        $(document).on("click", "[data-action='addFavouriteFromHistory']", e => this.addFavouriteFromHistory(e));
        $(document).on("click", "[data-action='editFavourite']", e => this.editFavourite(e));
        $(document).on("click", "[data-action='updateFavourite']", e => this.updateFavourite(e));
        $(document).on("click", "[data-action='deleteFavourite']", e => this.deleteFavourite(e));
    }

    addFavouriteFromHistory(e) {
        if (this.items.length >= 10) {
            alert("Reached maximum saved favourites!");
        } else {
            let element = $(e.target).parents("div.element[data-id]");
            let id = element.data("id");
            let historyItems = this.history.all;
            let historyItem = historyItems.find(item => item.id == id);

            let item = { id: ID(), name: historyItem.value.toString(), value: historyItem.value.toString() };

            this.items.push(item);
            this.saveItems();
            this.addItemToDisplay(item);

            historyItem.favouriteId = item.id;
            this.history.save(historyItems);

            $(document).trigger({ type: "favouriteUpdated", id: item.id });
        }
    }

    editFavourite(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");

        element.addClass("editing");
    }

    updateFavourite(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");
        let item = this.items.find(e => e.id == id);

        item.name = element.find("input.name").val();
        item.value = element.find("input.equasion").val();

        this.saveItems();
        element.replaceWith(this.itemHTML(item));
    }

    deleteFavourite(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");

        this.items = this.items.filter(e => e.id != id);
        this.saveItems();

        element.remove();
        this.updateToggleElement();

        let historyItems = this.history.all;

        historyItems.forEach(item => {
            if (item.favouriteId == id) {
                item.favouriteId = null;
            }
        });

        this.history.save(historyItems);

        $(document).trigger({ type: "favouriteUpdated", id: id });
    }

    addItemToDisplay(item) {
        if (this.hasItems()) {
            this.displayElement.append(this.itemHTML(item));
        }

        this.updateToggleElement();
    }

    itemHTML(item) {
        return `
            <div class="element" data-id="${item.id}">
                <div class="editor">
                    <div class="clickable material-icons submit" data-action="updateFavourite">check</div>
                    <div class="value">
                        <input class="name" type="value" value="${item.name}">
                        <input class="equasion" type="value" value="${item.value}">
                    </div>
                    <div class="clickable material-icons delete" data-action="deleteFavourite">delete</div>
                </div>
                <div class="viewer">
                    <div class="clickable material-icons edit" data-action="editFavourite">edit</div>
                    <div class="clickable value" data-action="loadEquasion">
                        <div class="name">${item.name}</div>
                        <div class="equasion">${item.value}</div>
                    </div>
                    <div class="clickable material-icons roll" data-action="roll">replay</div>
                </div>
            </div>
        `;
    }
}