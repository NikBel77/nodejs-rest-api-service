"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryDB {
    /**
     * Create DB instance and create store.
     * @constructor
     */
    constructor() {
        this.STORE = [];
    }
    /**
     * Return all items from store.
     * @returns {any[]}
     */
    getAll() {
        return this.STORE;
    }
    /**
     * Get item by id param.
     * @param {string} id item id.
     * @returns {any}
     */
    getById(id) {
        return this.STORE.find((item) => item.id === id) || null;
    }
    /**
     * Push item to store.
     * @param {any} item Item to push.
     */
    addItem(item) {
        this.STORE.push(item);
    }
    /**
     * Remove item by id param.
     * @param {string} id Item id.
     * @returns
     */
    deleteItemById(id) {
        const item = this.getById(id);
        if (!item)
            return false;
        this.STORE = this.STORE.filter((el) => el.id !== id);
        return item;
    }
    /**
     * Remove item by custom prop.
     * @param {string} prop Property to compare.
     * @param {string} value Property value.
     */
    deleteItems(items) {
        items.forEach((item) => {
            this.STORE = this.STORE.filter((storeItem) => item !== storeItem);
        });
    }
}
exports.default = MemoryDB;
