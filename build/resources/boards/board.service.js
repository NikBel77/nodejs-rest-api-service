"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_model_1 = __importDefault(require("./board.model"));
const memory_db_1 = __importDefault(require("../db/memory.db"));
const task_service_1 = __importDefault(require("../tasks/task.service"));
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
        this.boardDB = new memory_db_1.default();
    }
    /**
     * Create new Board and push to DB.
     * @param {string} title - Board title.
     * @param {Array} columns Board columns.
     * @returns {Board} new created Board instance.
     */
    createBoard(title, columns) {
        const board = new board_model_1.default(title, columns);
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
        if (!found)
            return null;
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
        task_service_1.default.deleteByBoardId(id);
        if (!deletedBoard)
            return null;
        return deletedBoard;
    }
    /**
     * Updates Board with the specified id.
     * @param {string} id Board id
     * @param {object} filds Object represents Board Model
     * @returns {Board} updated Board
     */
    updateBoard(id, title, columns) {
        const board = this.boardDB.getById(id);
        if (!board)
            return null;
        if (title)
            board.title = title;
        if (columns)
            board.columns = columns;
        return board;
    }
}
exports.default = new BoardService();
