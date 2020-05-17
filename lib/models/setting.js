class Setting extends Model {
    get classNamespace() {
        return "settings";
    }

    get defaultSettings() {
        return [
            { id: ID(), name: "calculatorMode", displayName: "Mode", value: "simple", options: ["simple", "advanced"] },
            { id: ID(), name: "displayStyle", displayName: "Style", value: "isometric", options: ["isometric", "flat"] }
        ];
    }

    get all() {
        let items = super.all;

        return this.defaultSettings.map(setting => {
            return items.find(item => item.name == setting.name) || setting;
        });
    }
}