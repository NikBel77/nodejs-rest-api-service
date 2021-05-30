"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
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
    constructor(title, columns, id = crypto_1.default.randomBytes(16).toString("hex")) {
        this.title = title;
        this.columns = columns;
        this.id = id;
    }
    /**
     * Validate arguments to create Board
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
exports.default = Board;
