class UserStore {
    constructor() {
        this.USER_STORE = [];
    }

    getAll() {
        return this.USER_STORE;
    }

    getById(soughtId) {
        return this.USER_STORE.find(({ id }) => id === soughtId) || null
    }

    addUser(user) {
        this.USER_STORE.push(user)
    }

    deleteUser(soughtId) {
        const user = this.getById(soughtId);
        if(!user) return null
        this.USER_STORE = this.USER_STORE.filter(({ id }) => user.id !== id);
        return user
    }
}

module.exports = new UserStore();
