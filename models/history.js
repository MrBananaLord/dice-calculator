class History extends Menu {
    get classNamespace() {
        return "history";
    }

    push(equasion) {
        if (this.items.length == 0 || this.items[0].value != equasion.toString()) {
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