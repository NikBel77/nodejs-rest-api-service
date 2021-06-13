import Board, { IBoard, IColumn } from './board.model';
import MemoryDB from '../db/memory.db';
import taskService from '../tasks/task.service';

/**
 * UserService class.
 * Board DB management.
 * @class
 */
class BoardService {
    private boardDB: MemoryDB<IBoard>

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
    createBoard(title: string, columns: IColumn[]) {
        const board = new Board(title, columns);
        this.boardDB.addItem(board);
        return board;
    }

    /**
     * Find Board By Id.
     * @param {string} id - Board id.
     * @returns {(Board | null)} Board from db or null if not finded.
     */
    findBoardById(id: string) {
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
    deleteBoard(id: string) {
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
    updateBoard(id: string, title: string, columns: IColumn[]) {
        const board = this.boardDB.getById(id)
        if(!board) return null
        if(title) board.title = title;
        if(columns) board.columns = columns;
        return board
    }
}

export default new BoardService();