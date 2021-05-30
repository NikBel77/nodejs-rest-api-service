import crypto from 'crypto';
import { IdbItem } from '../db/memory.db';

export interface IColumn {
    id: string;
    title: string;
    order: string;
}

export interface IBoard extends IdbItem {
    id: string;
    title: string;
    columns: IColumn[];
}

/**
 * presents Board model
 * @class
 */
class Board implements IBoard {
    /**
     * Create User
     * @constructor
     * @param {Object} board User model.
     * @param {string} board.id generated unique id.
     * @param {string} board.title board name.
     * @param {{ id: string, title: string, order: string }[]} board.columns board columns.
     */


    constructor(
        public title: string,
        public columns: IColumn[],
        public id: string = crypto.randomBytes(16).toString("hex"),
    ) {}

    /**
     * Validate arguments to create Board
     * @param  {...string} args strings to validate 
     * @returns {boolean}
     */
    static validate(...args: string[]) {
        return args.every((arg) => {
            if(!arg) return false;
            if(typeof arg !== 'string') return false;
            return true;
        })
    }
}

export default Board;