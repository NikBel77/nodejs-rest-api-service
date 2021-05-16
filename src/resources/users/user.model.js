const crypto = require("crypto");

class User {
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

    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }

    static validate(...args) {
        return args.every((arg) => {
            if(!arg) return false;
            if(typeof arg !== 'string') return false;
            return true;
        })
    }
}

module.exports = User;
