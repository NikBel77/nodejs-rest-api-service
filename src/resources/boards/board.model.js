const crypto = require("crypto");

class Board {
    constructor({
        id = crypto.randomBytes(16).toString("hex"),
        title,
        columns,
    } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns
    }

    static toResponse(board) {
        return board
    }

    static validate(...args) {
        return args.every((arg) => {
            if(!arg) return false;
            if(typeof arg !== 'string') return false;
            return true;
        })
    }
}

module.exports = Board;