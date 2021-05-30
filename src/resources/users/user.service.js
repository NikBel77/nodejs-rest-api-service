const User = require('./user.model');
const taskService = require('../tasks/task.service');
const MemoryDB = require('../db/memory.db');

class UsersService {
    constructor() {
        this.userDB = new MemoryDB();
    }

    createUser(name, login, password) {
        const user = new User({ name, login, password });
        this.userDB.addItem(user);
        return user;
    }

    findUserById(id) {
        const found = this.userDB.getById(id);
        if(!found) return null;
        return found;
    }

    getAll() {
        return this.userDB.getAll();
    }

    deleteUser(id) {
        const deletedUser = this.userDB.deleteItemById(id)
        if(!deletedUser) return null;
        taskService.removeUser(id);
        return deletedUser;
    }

    updateUser(id, filds) {
        const user = this.userDB.getById(id);
        if(!user) return null;
        Object.keys(filds).forEach((prop) => {
            if(!filds[prop]) return;
            user[prop] = filds[prop];
        });
        return user;
    }
}

module.exports = new UsersService();
