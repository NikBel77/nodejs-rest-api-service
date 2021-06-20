import { Board } from '../../entities/Board';
import taskService from '../tasks/task.service';
import { getRepository } from 'typeorm';
import { BadRequestError, NotFoundError } from '../../middleware/errorHandler';

/**
 * BoardService class.
 * Board DB management.
 * @class
 */
class BoardService {
    /**
     * get Repo
     * @returns {Repository<Board>}
     */
    get repo() {
        return getRepository(Board)
    }

    /**
     * Task to responce
     * @param task
     * @returns 
     */
    toResponce = (board: Board) => ({
        ...board, id: board.id.toString()
    })

     /**
     * Create new Board and add to DB.
     * @async
     * @param {Partial<Board>} dto - Board dto.
     * @returns {Board} new created Board instance.
     */
    async createBoard(dto: Partial<Board>) {
        try {
            const board = this.repo.create(dto)
            await board.save()
            return this.toResponce(board);
        } catch {            
            throw new BadRequestError('One of parameters missing');
        }
    }
    
    /**
     * Find Board By Id.
     * @async
     * @param {string} id - Task id.
     * @returns {Board} Task from db.
     */
    async findBoardById(id: string) {
        const board = await this.repo.findOne(id)
        if(!board) throw new NotFoundError(`Board with id - ${id} not found`)
        return this.toResponce(board);
    }

    /**
     * Get all Boards from DB.
     * @async
     * @returns {Board[]} Users Array.
     */
    async getAll() {
        const boards = await this.repo.find()
        return boards.map(this.toResponce)
    }

    /**
     * Delete Board by Id from DB.
     * @async
     * @param {string} id Board id.
     * @returns {boolean} Returns deleted Board.
     */
    async deleteBoard(id: string) {
        const board = await this.repo.findOne(id);
        if(!board) throw new NotFoundError(`Board with id - ${id} not found`);
        await board.remove();
        await taskService.removeWhereId(id)
        return true;
    }

    /**
     * Updates Board with the specified id.
     * @async
     * @param {string} id Board id 
     * @param {Partial<Board>} dto Object with filds to update.
     * @returns {boolean}
     */
    async updateBoard(id: string, dto: Partial<Board>) {
        const res = await this.repo.update(id, dto)
        if(!res.affected) throw new BadRequestError('Wrong parameters')
        return true
    }
}

export default new BoardService();