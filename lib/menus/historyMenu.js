class HistoryMenu extends Menu {
    get modelClass() {
        return History;
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
        return `
            <div class="element" data-id=${item.id}>
                <div class="clickable material-icons favourite" data-action="addFavouriteFromHistory">
                    ${item.favouriteId ? "star" : "star_border"}
                </div>
                <div class="clickable value" data-action="loadEquasion">${item.value}</div>
                <div class="clickable material-icons roll" data-action="roll">replay</div>
            </div>
        `;
    }
}