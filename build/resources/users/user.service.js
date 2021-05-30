"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("./user.model"));
const task_service_1 = __importDefault(require("../tasks/task.service"));
const memory_db_1 = __importDefault(require("../db/memory.db"));
/**
 * UserService class.
 * User DB management.
 * @class
 */
class UsersService {
    /**
     * Create UserSevrice instance.
     * @constructor
     */
    constructor() {
        this.userDB = new memory_db_1.default();
    }
    /**
    * Create new User and add to DB.
    * @param {string} name - User name.
    * @param {string} login - User login string.
    * @param {string} password - Password.
    * @returns {User} new created User instance.
    */
    createUser(name, login, password) {
        const user = new user_model_1.default({ name, login, password });
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
        if (!found)
            return null;
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
        const deletedUser = this.userDB.deleteItemById(id);
        if (!deletedUser)
            return null;
        task_service_1.default.removeUser(id);
        return deletedUser;
    }
    /**
     * Updates User with the specified id.
     * @param {string} id User id
     * @param {object} filds Object with filds to update.
     * @returns {User} updated User
     */
    updateUser(id, { name, login, password }) {
        const user = this.userDB.getById(id);
        if (!user)
            return null;
        if (name)
            user.name = name;
        if (login)
            user.login = login;
        if (password)
            user.password = password;
        return user;
    }
}
exports.default = new UsersService();
