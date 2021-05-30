"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
/**
 * presents User model
 * @class
 */
class User {
    constructor({ id = crypto_1.default.randomBytes(16).toString("hex"), name = 'No Name', login = 'No Login', password = 'password', }) {
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
            if (!arg)
                return false;
            if (typeof arg !== 'string')
                return false;
            return true;
        });
    }
}
exports.default = User;
