const crypto = require('crypto');
/**
 * presents User model
 * @class
 */
class User {
    /**
     * Create User
     * @constructor
     * @param {Object} user User model.
     * @param {string} user.id generated unique User id.
     * @param {string} user.name user name.
     * @param {strign} user.login user login.
     * @param {string} user.password user password strign.
     */
    constructor({
        id = crypto.randomBytes(16).toString("hex"),
        name,
        login,
        password,
    } = {}) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }

    /**
     * Creates an object to send.
     * @param {User} user User to send.
     * @returns {{ name: string, id: string, login: string }} 
     */
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }

    /**
     * Validate arguments to create User
     * @param  {...string} args strings to validate 
     * @returns {boolean}
     */
    static validate(...args) {
        return args.every((arg) => {
            if(!arg) return false;
            if(typeof arg !== 'string') return false;
            return true;
        })
    }
}

module.exports = User;
