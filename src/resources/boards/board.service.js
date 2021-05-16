const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');
const taskService = require('../tasks/task.service');

class BoardService {
    constructor() {
        this.boardsStore = boardsRepo;
    }

    createBoard(title, columns) {
        const board = new Board({ title, columns });
        this.boardsStore.addBoard(board);
        return board;
    }

    findBoardById(id) {
        const found = this.boardsStore.getById(id);
        if(!found) return null;
        return found;
    }

    getAll() {
        return this.boardsStore.getAll();
    }

    deleteBoard(id) {
        const deletedBoard = this.boardsStore.deleteBoard(id);
        taskService.deleteByBoardId(id);
        if(!deletedBoard) return null;
        return deletedBoard;
    }

    updateBoard(id, filds) {
        const board = this.boardsStore.getById(id)
        if(!board) return null
        Object.keys(filds).forEach((prop) => {
            if(!filds[prop]) return
            board[prop] = filds[prop]
        });
        return board
    }
}

module.exports = new BoardService();