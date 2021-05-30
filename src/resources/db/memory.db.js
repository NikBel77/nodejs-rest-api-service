/**
 * Memory databse.
 * @class
 */
class MemoryDB {
    /**
     * Create DB instance and create store.
     * @constructor
     */
    constructor() {
        this.STORE = []
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
     * @param {string} id item Id.
     * @returns {any}
     */
    getById(id) {
        return this.STORE.find((item) => item.id === id) || null;
    }

    /**
     * Push item to store.
     * @param {any} item 
     */
    addItem(item) {
        this.STORE.push(item);
    }

    /**
     * Remove item by id param.
     * @param {string} id 
     * @returns 
     */
    deleteItemById(id) {
        const item = this.getById(id);
        if(!item) return false;
        this.STORE = this.STORE.filter((el) => el.id !== id);
        return item;
    }

    /**
     * Remove item by custom prop.
     * @param {string} prop
     * @param {string} id
     */
    deleteByProp(prop, value) {
        this.STORE = this.STORE
            .filter(item => item[prop] !== value)
    }
}

module.exports = MemoryDB