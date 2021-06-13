import crypto from 'crypto';
import { IdbItem } from '../db/memory.db';

export interface IUser extends IdbItem {
    id: string;
    name: string;
    login: string;
    password: string;
}

/**
 * presents User model
 * @class
 */
class User implements IUser {
    /**
     * Create User
     * @constructor
     * @param {Object} user User model.
     * @param {string} user.id generated unique User id.
     * @param {string} user.name user name.
     * @param {strign} user.login user login.
     * @param {string} user.password user password strign.
     */

    public id: string;

    public name: string;

    public login: string;

    public password: string;

    constructor({
        id = crypto.randomBytes(16).toString("hex"),
        name = 'No Name',
        login = 'No Login',
        password = 'password',
    }: { [key: string]: string }) {
        this.id = id
        this.name = name
        this.login = login
        this.password = password;
    }

    /**
     * Creates an object to send.
     * @param {User} user User to send.
     * @returns {{ name: string, id: string, login: string }} 
     */
    static toResponse(user: User): { id: string, name: string, login: string } {
        const { id, name, login } = user;
        return { id, name, login };
    }

    /**
     * Validate arguments to create User
     * @param  {...string} args strings to validate 
     * @returns {boolean}
     */
    static validate(...args: string[]): boolean {
        return args.every((arg) => {
            if(!arg) return false;
            if(typeof arg !== 'string') return false;
            return true;
        })
    }
}

export default User;
