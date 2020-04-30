class Model {
    get storage() {
        return window.localStorage[this.classNamespace];
    }

    set storage(value) {
        window.localStorage[this.classNamespace] = value;
    }

    afterInitialize() {}

    load() {
        if (this.storage) {
            return JSON.parse(this.storage);
        } else {
            return [];
        }
    }

    save(items) {
        this.storage = JSON.stringify(items);
    }
}