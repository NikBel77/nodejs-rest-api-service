const User = require('./user.model');
const taskService = require('../tasks/task.service');
const MemoryDB = require('../db/memory.db');
/**
 * UserService class.
 * used for User DB management
 * @class
 */
class UsersService {
    /**
     * Create UserSevrice instance.
     * @constructor
     */
    constructor() {
        this.userDB = new MemoryDB();
    }

     /**
     * Create new User and add to DB.
     * @param {string} name - User name.
     * @param {string} login - User login string.
     * @param {string} password - Password.
     * @returns {User} new created User instance.
     */
    createUser(name, login, password) {
        const user = new User({ name, login, password });
        this.userDB.addItem(user);
        return user;
    }
    
    /**
     * Find User By Id.
     * @param {string} id - User id.
     * @returns {(User | null)} User from db or null if not finded.
     */
    findUserById(id) {
        const found = this.userDB.getById(id);
        if(!found) return null;
        return found;
    }

    /**
     * Get all users from DB.
     * @returns {User[]} Users Array.
     */
    getAll() {
        return this.userDB.getAll();
    }

    /**
     * Delete User by Id from DB.
     * @param {string} id User id.
     * @returns {(User | null)} Returns deleted User. if the user was deleted and null if not.
     */
    deleteUser(id) {
        const deletedUser = this.userDB.deleteItemById(id)
        if(!deletedUser) return null;
        taskService.removeUser(id);
        return deletedUser;
    }

    /**
     * Updates User with the specified id.
     * @param {string} id User id 
     * @param {object} filds Object with filds to update.
     * @returns {User} updated User
     */
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
