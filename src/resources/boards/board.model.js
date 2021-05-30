const crypto = require("crypto");
/**
 * presents Board model
 * @class
 */
class Board {
    /**
     * Create User
     * @constructor
     * @param {Object} board User model.
     * @param {string} board.id generated unique id.
     * @param {string} board.title board name.
     * @param {{ id: string, title: string, order: string }[]} board.columns board columns.
     */
    constructor({
        id = crypto.randomBytes(16).toString("hex"),
        title,
        columns,
    } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns
    }

    /**
     * Validate arguments to create Board
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

module.exports = Board;