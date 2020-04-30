class Groups {
    constructor() {
        this.visible = false;

        this.displayElement = $(".groups");
        this.toggleElement = $("[data-action='toggleMenu'][data-value='groups']");
        this.storage = window.localStorage;
        this.equasion = new Equasion();

        this.items = [];
        if (this.storage["groups"]) {
            this.items = JSON.parse(this.storage["groups"]).slice(0, 10);
        }
        this.items.forEach((e) => this.displayElement.prepend(this.itemHTML(e)));

        $(document).on("click", "[data-action='createGroup']", e => this.createGroup(e));
        $(document).on("click", "[data-action='editGroup']", e => this.editGroup(e));
        $(document).on("click", "[data-action='updateGroup']", e => this.updateGroup(e));
        $(document).on("click", "[data-action='deleteGroup']", e => this.deleteGroup(e));
        $(document).on("click", "[data-action='addFavouriteToGroup']", e => this.addFavouriteToGroup(e));
        $(document).on("click", "[data-action='removeRollFromGroup']", e => this.removeRollFromGroup(e));
        $(document).on("click", "[data-action='toggleGroupRolls']", e => this.toggleGroupRolls(e));
        $(document).on("click", "[data-action='executeGroup']", e => this.executeGroup(e));
    }

    get favourites() {
        if (this.storage["favourites"]) {
            return JSON.parse(this.storage["favourites"]).slice(0, 10);
        } else {
            return [];
        }
    }

    createGroup(e) {
        this.items.unshift({ id: ID(), name: "New Group", rolls: [] });

        if (this.items.length > 10) {
            this.items = this.items.slice(0, 10);
        }

        this.storage["groups"] = JSON.stringify(this.items);

        this.addItemToDisplay();
    }

    editGroup(e) {
        let element = $(e.target).parents("div.element[data-id]");

        let input = element.find("input.name");
        let originalValue = input.val();

        // Focus input with the cursor on the right side
        input.val('');
        element.addClass("editing");
        input.blur().focus().val(originalValue);

        element.find(".group-rolls").removeClass("hidden");
    }

    updateGroup(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");
        let item = this.items.find(item => item.id == id);

        item.name = element.find("input.name").val();

        this.storage['groups'] = JSON.stringify(this.items);

        element.replaceWith(this.itemHTML(item));
    }

    deleteGroup(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");

        this.items = this.items.filter(item => item.id != id);
        this.storage['groups'] = JSON.stringify(this.items);

        element.remove();
    }

    addFavouriteToGroup(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");
        let group = this.items.find(item => item.id == id);

        let favouriteId = $(e.target).parents("div.favourite[data-id]").data("id");
        let favouriteItem = this.favourites.find(item => item.id == favouriteId);

        favouriteItem.id = ID();
        group.rolls.unshift(favouriteItem);

        this.storage['groups'] = JSON.stringify(this.items);

        element.find(".group-rolls").append(this.groupRollHTML(favouriteItem));
    }

    removeRollFromGroup(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");
        let group = this.items.find(item => item.id == id);

        let rollElement = $(e.target).parents("div.group-roll[data-id]");
        let rollId = rollElement.data("id");

        group.rolls = group.rolls.filter(roll => roll.id != rollId);
        this.storage['groups'] = JSON.stringify(this.items);

        rollElement.remove();
    }

    executeGroup(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");
        let group = this.items.find(item => item.id == id);

        element.find(".group-rolls").removeClass("hidden");

        group.rolls.forEach(roll => {
            let result = this.equasion.fromString(roll.value).result;

            element.find(`.group-roll[data-id="${roll.id}"] .result`).html(result);
        })
    }

    toggleGroupRolls(e) {
        let element = $(e.target).parents("div.element[data-id]");

        element.find(".group-rolls").toggleClass("hidden");
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

        $(this.itemHTML(this.items[0])).insertBefore(this.displayElement.find("[data-action='createGroup']"));
    }

    groupRollHTML(roll) {
        return `
        <div class="group-roll" data-id="${roll.id}">
            <div class="reorder clickable material-icons">reorder</div>
            <div class="arrow material-icons">subdirectory_arrow_right</div>
            <div class="roll-name">
                <span>${roll.name}</spane>
                <span class="roll-value">(${roll.value})</span>
            </div>
            <div class="result"></div>
            <div class="hidden clickable material-icons delete" data-action="removeRollFromGroup">delete</div>
        </div>
        `;
    }

    itemHTML(item) {
            return `
            <div class="group element" data-id="${item.id}">
                <div class="editor">
                    <div class="clickable material-icons submit" data-action="updateGroup">check</div>
                    <div class="value">
                        <input class="name" type="value" value="${item.name}">
                    </div>
                    <div class="clickable material-icons delete" data-target="${item.id}" data-action="deleteGroup">delete</div>
                </div>
                <div class="viewer">
                    <div class="clickable material-icons edit" data-action="editGroup">edit</div>
                    <div class="clickable value" data-action="toggleGroupRolls">
                        <div class="name">${item.name}</div>
                    </div>
                    <div class="clickable material-icons roll" data-action="executeGroup">replay</div>
                </div>
                <div class="group-rolls hidden">
                    ${item.rolls.map(roll => this.groupRollHTML(roll)).join("")}
                </div>
                <div class="favourites">
                    <div class="small-header">Favourites:</div>
                    ${this.favourites.map(favourite => `
                        <div class="favourite" data-id="${favourite.id}" data-action="addFavouriteToGroup">
                            <div class="name">${favourite.name}</div>
                            <div class="icon material-icons">add</div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }
}