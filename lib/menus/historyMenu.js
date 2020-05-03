class HistoryMenu extends Menu {
    get modelClass() {
        return History;
    }

    beforeInitialize() {
        this.favourite = new Favourite();
    }

    afterInitialize() {
        $(document).on("favouriteUpdated", e => this.updateFavourites(e));
    }

    push(equasion) {
        if (this.items.length == 0 || this.lastItem.value != equasion.toString()) {
            let item = { id: ID(), value: equasion.toString() };

            this.items.push(item);

            if (this.items.length > 10) {
                this.items.shift();
            }

            this.saveItems();
            this.addItemToDisplay(item);
        }
    }

    addItemToDisplay(item) {
        if (this.displayElement.children().length > 10) {
            this.displayElement.children().last().remove();
        }

        if (this.hasItems()) {
            this.displayElement.prepend(this.itemHTML(item));
        }

        this.updateToggleElement();
    }

    updateFavourites(e) {
        this.reloadItems();

        this.displayElement.children(".element").remove();
        this.items.forEach((item) => this.addItemToDisplay(item));
    }

    itemHTML(item) {
        if (item.favouriteId) {
            let favourite = this.favourite.all.find(favourite => favourite.id == item.favouriteId);

            return `
                <div class="element history-item favourite" data-id=${item.id}>
                    <div class="material-icons favourite">star</div>
                    <div class="clickable details" data-action="loadEquasion">
                        <div class="name">${favourite.name}</div>
                        <div class="equasion">${item.value}</div>
                    </div>
                    <div class="clickable material-icons roll" data-action="roll">replay</div>
                </div>
            `;
        } else {
            return `
                <div class="element history-item" data-id=${item.id}>
                    <div class="clickable material-icons favourite" data-action="addFavouriteFromHistory">star_border</div>
                    <div class="clickable details" data-action="loadEquasion">
                        <div class="name">${item.value}</div>
                    </div>
                    <div class="clickable material-icons roll" data-action="roll">replay</div>
                </div>
            `;
        }
    }
}