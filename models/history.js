class History extends Menu {
    get classNamespace() {
        return "history";
    }

    push(equasion) {
        if (this.items.length == 0 || this.items[0].value != equasion.toString()) {
            this.items.unshift({ id: ID(), value: equasion.toString() });

            if (this.items.length > 10) {
                this.items = this.items.slice(0, 10);
            }

            this.saveItems();
            this.addItemToDisplay();
        }
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