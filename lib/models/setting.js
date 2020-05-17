class Setting extends Model {
    get classNamespace() {
        return "settings";
    }

    get defaultSettings() {
        return [
            { id: ID(), name: "Mode", value: "simple", options: ["simple", "advanced"] },
            { id: ID(), name: "Style", value: "3D", options: ["3D", "2D"] }
        ];
    }

    get all() {
        let items = super.all;

        return this.defaultSettings.map(setting => {
            return items.find(item => item.name == setting.name) || setting;
        });
    }
}