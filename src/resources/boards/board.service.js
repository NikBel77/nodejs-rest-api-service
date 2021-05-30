const Board = require('./board.model');
const MemoryDB = require('../db/memory.db');
const taskService = require('../tasks/task.service');
/**
 * UserService class.
 * Board DB management.
 * @class
 */
class BoardService {
    /**
     * Create BoardService instance.
     * @constructor
     */
    constructor() {
        this.boardDB = new MemoryDB();
    }

    /**
     * Create new Board and push to DB.
     * @param {string} title - Board title.
     * @param {Array} columns Board columns.
     * @returns {Board} new created Board instance.
     */
    createBoard(title, columns) {
        const board = new Board({ title, columns });
        this.boardDB.addItem(board);
        return board;
    }

    /**
     * Find Board By Id.
     * @param {string} id - Board id.
     * @returns {(Board | null)} Board from db or null if not finded.
     */
    findBoardById(id) {
        const found = this.boardDB.getById(id);
        if(!found) return null;
        return found;
    }

    /**
     * Get all boards from DB.
     * @returns {Board[]} Board Array.
     */
    getAll() {
        return this.boardDB.getAll();
    }

    /**
     * Delete Board by Id from DB.
     * @param {string} id Board id.
     * @returns {(Board | null)} Returns deleted Board. if the Board was deleted and null if not.
     */
    deleteBoard(id) {
        const deletedBoard = this.boardDB.deleteItemById(id);
        taskService.deleteByBoardId(id);
        if(!deletedBoard) return null;
        return deletedBoard;
    }

    /**
     * Updates Board with the specified id.
     * @param {string} id Board id
     * @param {object} filds Object represents Board Model
     * @returns {Board} updated Board
     */
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