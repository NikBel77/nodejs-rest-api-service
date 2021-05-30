const Board = require('./board.model');
const MemoryDB = require('../db/memory.db');
const taskService = require('../tasks/task.service');
/**
 * UserService class.
 * used for Board DB management
 * @class
 */
class BoardService {
    constructor() {
        this.boardDB = new MemoryDB();
    }

    createBoard(title, columns) {
        const board = new Board({ title, columns });
        this.boardDB.addItem(board);
        return board;
    }

    findBoardById(id) {
        const found = this.boardDB.getById(id);
        if(!found) return null;
        return found;
    }

    getAll() {
        return this.boardDB.getAll();
    }

    deleteBoard(id) {
        const deletedBoard = this.boardDB.deleteItemById(id);
        taskService.deleteByBoardId(id);
        if(!deletedBoard) return null;
        return deletedBoard;
    }

    updateBoard(id, filds) {
        const board = this.boardDB.getById(id)
        if(!board) return null
        Object.keys(filds).forEach((prop) => {
            if(!filds[prop]) return
            board[prop] = filds[prop]
        });
        return board
    }
}

module.exports = new BoardService();