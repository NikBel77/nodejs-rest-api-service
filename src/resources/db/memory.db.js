class MemoryDB {
    constructor() {
        this.STORE = []
    }

    getAll() {
        return this.STORE;
    }

    getById(id) {
        return this.STORE.find((item) => item.id === id) || null;
    }

    addItem(item) {
        this.STORE.push(item);
    }

    deleteItemById(id) {
        const item = this.getById(id);
        if(!item) return false;
        this.STORE = this.STORE.filter((el) => el.id !== id);
        return item;
    }

    deleteByProp(prop, value) {
        this.STORE = this.STORE
            .filter(item => item[prop] !== value)
    }
}

module.exports = MemoryDB