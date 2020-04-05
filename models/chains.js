class Chains {
    constructor() {
        this.visible = false;

        this.displayElement = $(".chains");
        this.toggleElement = $("[data-action='toggleMenu'][data-value='chains']");
        this.storage = window.localStorage;
        this.favourites = new Favourites();

        this.items = [];
        if (this.storage["chains"]) {
            this.items = JSON.parse(this.storage["chains"]).slice(0, 10);
        }
        this.items.reverse().forEach((e) => this.displayElement.prepend(this.itemHTML(e)));

        $(document).on("click", "[data-action='createChain']", e => this.createChain(e));
        $(document).on("click", "[data-action='editChain']", e => this.editChain(e));
        $(document).on("click", "[data-action='updateChain']", e => this.updateChain(e));
        $(document).on("click", "[data-action='deleteChain']", e => this.deleteChain(e));
        $(document).on("click", "[data-action='addFavouriteToChain']", e => this.addFavouriteToChain(e));
        $(document).on("click", "[data-action='toggleChainRolls']", e => this.toggleChainRolls(e));
    }

    createChain(e) {
        this.items.unshift({ id: ID(), name: "New Chain", rolls: [] });

        if (this.items.length > 10) {
            this.items = this.items.slice(0, 10);
        }

        this.storage["chains"] = JSON.stringify(this.items);

        this.addItemToDisplay();
    }

    editChain(e) {
        let element = $(e.target).parents("div.element[data-id]");

        let input = element.find("input.name");
        let originalValue = input.val();

        // Focus input with the cursor on the right side
        input.val('');
        element.addClass("editing");
        input.blur().focus().val(originalValue);

        element.find(".chain-rolls").toggleClass("hidden");
    }

    updateChain(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");
        let item = this.items.find(item => item.id == id);

        item.name = element.find("input.name").val();

        this.storage['chains'] = JSON.stringify(this.items);

        element.replaceWith(this.itemHTML(item));
    }


    deleteChain(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");

        this.items = this.items.filter(item => item.id != id);
        this.storage['chains'] = JSON.stringify(this.items);

        element.remove();
    }

    addFavouriteToChain(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");
        let item = this.items.find(item => item.id == id);

        let favouriteId = $(e.target).parents("div.favourite[data-id]").data("id");
        let favouriteItem = this.favourites.items.find(item => item.id == favouriteId);

        favouriteItem.id = ID();
        item.rolls.unshift(favouriteItem);
        item.rolls = item.rolls.slice(0, 10);

        this.storage['chains'] = JSON.stringify(this.items);

        element.find(".chain-rolls").append(this.chainRollHTML(favouriteItem));
    }

    toggleChainRolls(e) {
        let element = $(e.target).parents("div.element[data-id]");

        element.find(".chain-rolls").toggleClass("hidden");
    }

    hasItems() {
        return this.items.length > 0;
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

    addItemToDisplay() {
        if (this.displayElement.children().length > 11) {
            this.displayElement.children(":nth-last-child(2)").remove();
        }

        $(this.itemHTML(this.items[0])).insertBefore(this.displayElement.find("[data-action='createChain']"));
    }

    chainRollHTML(roll) {
        return `
        <div class="chain-roll" data-id="${roll.id}">
            <div class="clickable material-icons">reorder</div>
            <div class="arrow material-icons">subdirectory_arrow_right</div>
            <div class="roll-name">${roll.name}</div>
            <div class="clickable material-icons">delete</div>
        </div>
        `;
    }

    itemHTML(item) {
            return `
            <div class="chain element" data-id="${item.id}">
                <div class="editor">
                    <div class="clickable material-icons submit" data-action="updateChain">check</div>
                    <div class="value">
                        <input class="name" type="value" value="${item.name}">
                    </div>
                    <div class="clickable material-icons delete" data-target="${item.id}" data-action="deleteChain">delete</div>
                </div>
                <div class="viewer">
                    <div class="clickable material-icons edit" data-action="editChain">edit</div>
                    <div class="clickable value" data-action="toggleChainRolls">
                        <div class="name">${item.name}</div>
                    </div>
                    <div class="clickable material-icons roll" value="${item.value}" data-action="roll">replay</div>
                </div>
                <div class="chain-rolls hidden">
                    ${item.rolls.map(roll => this.chainRollHTML(roll)).join("")}
                </div>
                <div class="favourites">
                    <div class="small-header">Favourites:</div>
                    ${this.favourites.items.map(favourite => `
                        <div class="favourite" data-id="${favourite.id}" data-action="addFavouriteToChain">
                            <div class="name">${favourite.name}</div>
                            <div class="icon material-icons">add</div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }
}