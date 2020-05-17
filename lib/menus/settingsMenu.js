class SettingsMenu extends Menu {
    get modelClass() {
        return Setting;
    }

    afterInitialize() {
        $(document).on("click", "[data-action='updateSetting']", e => this.updateSetting(e));
    }

    addItemToDisplay(item) {
        this.displayElement.prepend(this.itemHTML(item));
    }

    itemHTML(item) {
        return `
            <div class="element setting" data-id=${item.id}>
                <div class="name">${item.name}:</div>
                <div class="options">
                    ${item.options.map(option => `
                        <div data-action="updateSetting" data-value="${option}" class="clickable option ${option == item.value ? "current" : ""}">
                            <div class="selection">${option}</div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
    }

    updateSetting(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let button = $(e.target).parents("div[data-action='updateSetting']");
        let id = element.data("id");
        let setting = this.items.find(item => item.id == id);

        setting.value = button.data("value");

        this.saveItems();

        element.replaceWith(this.itemHTML(setting));
    }
}