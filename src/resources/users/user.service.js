const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

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
        return deletedUser;
    }

    updateUser(id, filds) {
        const deletedUser = this.usersStore.deleteUser(id);
        if(!deletedUser) return null
        const name = filds.name || deletedUser.name;
        const login = filds.login || deletedUser.login;
        const password = filds.password || deletedUser.password;
        const newUser = new User({ id, name, login, password });
        this.usersStore.addUser(newUser);
        return newUser;
    }
}

module.exports = new UsersService();
