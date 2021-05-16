class BoardsRepo {
    constructor() {
        this.BOARDS_STORE = [];
    }

    getAll() {
        return this.BOARDS_STORE;
    }

    getById(soughtId) {
        return this.BOARDS_STORE.find(({ id }) => id === soughtId) || null;
    }

    addBoard(board) {
        this.BOARDS_STORE.push(board);
    }

    deleteBoard(soughtId) {
        const board = this.getById(soughtId);
        if(!board) return null;
        this.BOARDS_STORE = this.BOARDS_STORE.filter(({ id }) => board.id !== id);
        return board;
    }
}

module.exports = new BoardsRepo()