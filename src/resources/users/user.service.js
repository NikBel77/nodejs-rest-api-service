const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const taskService = require('../tasks/task.service');

class UsersService {
    constructor() {
        this.usersStore = usersRepo;
    }

    createUser(name, login, password) {
        const user = new User({ name, login, password });
        this.usersStore.addUser(user);
        return user;
    }

    findUserById(id) {
        const found = this.usersStore.getById(id);
        if(!found) return null;
        return found;
    }

    getAll() {
        return this.usersStore.getAll();
    }

    deleteUser(id) {
        const deletedUser = this.usersStore.deleteUser(id)
        if(!deletedUser) return null;
        taskService.removeUser(id);
        return deletedUser;
    }

    updateUser(id, filds) {
        const user = this.usersStore.getById(id);
        if(!user) return null;
        Object.keys(filds).forEach((prop) => {
            if(!filds[prop]) return;
            user[prop] = filds[prop];
        });
        return user;
    }
}

module.exports = new UsersService();
