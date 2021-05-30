/**
 * Memory databse.
 * @class
 */
export interface IdbItem {
    id: string;
    // [key: string]: string | null;
}

class MemoryDB<I extends IdbItem> {
    private STORE: I[]

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
    getAll(): I[] {
        return this.STORE;
    }

    /**
     * Get item by id param.
     * @param {string} id item id.
     * @returns {any}
     */
    getById(id: string): I | null {
        return this.STORE.find((item) => item.id === id) || null;
    }

    /**
     * Push item to store.
     * @param {any} item Item to push.
     */
    addItem(item: I): void {
        this.STORE.push(item);
    }

    /**
     * Remove item by id param.
     * @param {string} id Item id.
     * @returns 
     */
    deleteItemById(id: string): I | false {
        const item = this.getById(id);
        if(!item) return false;
        this.STORE = this.STORE.filter((el) => el.id !== id);
        return item;
    }

    /**
     * Remove item by custom prop.
     * @param {string} prop Property to compare.
     * @param {string} value Property value.
     */
    deleteItems(items: I[]): void {
        items.forEach((item) => {
            this.STORE = this.STORE.filter((storeItem) => item !== storeItem)
        })
    }
}

export default MemoryDB