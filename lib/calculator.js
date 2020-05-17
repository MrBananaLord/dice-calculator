class Calculator {
    constructor() {
        this.element = $("#rollingStonesCalculator");
        this.displayElement = this.element.find(".display input");
        this.resultElement = this.element.find(".display .result");
        this.calculateElement = this.element.find(".key.calculate");

        this.equasion = new Equasion();
        this.settingsMenu = new SettingsMenu();
        this.historyMenu = new HistoryMenu();
        this.favouritesMenu = new FavouritesMenu();
        this.groupsMenu = new GroupsMenu();

        this.mode = "input";

        $(document).on("click", "[data-action='loadEquasion']", e => this.loadEquasion(e));
        $(document).on("click", "[data-action='roll']", e => this.roll(e));
        $(document).on("click", "[data-action='revert']", e => this.revert(e));
        $(document).on("click", "[data-action='clear']", e => this.clear(e));
        $(document).on("click", "[data-action='appendSymbol']", e => this.appendSymbol(e));
        $(document).on("click", "[data-action='calculate']", e => this.calculate(e));
        $(document).on("click", "[data-action='toggleMenu']", e => this.toggleMenu(e));
        $(document).on("keyup", e => this.handleInput(e));
        $(document).on("applySetting", e => this.applySetting(e.id));

        this.settingsMenu.items.forEach(setting => this.applySetting(setting.id));
    }

    toggleMenu(e) {
        let targetMenu = this[$(e.target).data("value")];
        let activeMenu = [this.settingsMenu, this.historyMenu, this.favouritesMenu, this.groupsMenu].find(e => e.visible);

        if (targetMenu === activeMenu) {
            targetMenu.hide();
        } else if (activeMenu) {
            activeMenu.hide();
            targetMenu.activate();
        } else {
            targetMenu.activate();
        }
    }

    get allItems() {
        return this.historyMenu.items.concat(this.favouritesMenu.items);
    }

    loadEquasion(e) {
        let element = $(e.target).parents("div.element[data-id]");
        let id = element.data("id");
        let item = this.allItems.find(item => item.id == id);

        this.inputMode();
        this.sourceItem = item;
        this.equasion.fromString(item.value.toString());
        this.update();
    }

    roll(e) {
        this.loadEquasion(e);
        this.calculate();
    }

    appendSymbol(e) {
        let target = $(e.target).closest("[data-value]");

        if (this.mode == "result") {
            this.inputMode();
        }

        this.push(target.data("value"));
        this.update();
    }

    inputMode() {
        this.mode = "input";
        this.sourceItem = null;
        this.equasion.reset();
        this.resultElement.text("");
        this.update();
    }

    push(value) {
        this.equasion.addCharacter(value);
    }

    update() {
        this.element.removeClass('invalid');
        this.calculateElement.removeClass('disabled');

        if (!this.equasion.tokens.length) {
            this.calculateElement.addClass("disabled");
        } else if (!this.equasion.valid) {
            this.element.addClass('invalid');
        }

        this.displayElement.val(this.equasion.toString());
    }

    calculate() {
        if (this.equasion.valid) {
            let result = this.equasion.result;

            this.updateResults(result);

            if (this.sourceItem && this.sourceItem.value == this.equasion.toString()) {
                this.historyMenu.pushItem(this.sourceItem);
            } else {
                this.sourceItem = null;
                this.historyMenu.push(this.equasion);
            }
            this.mode = "result";
        }
    }

    clear() {
        this.inputMode();
    }

    revert() {
        if (this.mode == "input") {
            this.equasion.tokens.pop();
            this.update();
        }
    }

    updateResults(roll) {
        this.resultElement.text(`\xa0= ${roll}`);
    }

    handleInput(e) {
        if (e.which == 13) {
            // Enter
            this.calculate();
        } else if (e.which == 191) {
            // Slash "/"
            calculator.inputMode();
        } else {
            this.resultElement.text("");

            this.equasion.fromString(this.displayElement.val());

            this.update();
        }
    }

    applySetting(settingId) {
        let setting = this.settingsMenu.items.find(item => item.id == settingId);

        if (setting.name == "displayStyle") {
            this.element.removeClass(setting.options).addClass(setting.value);
        } else if (setting.name == "calculatorMode") {
            this.element.removeClass(setting.options).addClass(setting.value);
        }
    }
}