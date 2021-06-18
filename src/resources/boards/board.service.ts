import { Board } from '../../entities/Board';
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
     * Create new Board and add to DB.
     * @async
     * @param {Partial<Board>} dto - Board dto.
     * @returns {Board} new created Board instance.
     */
    async createBoard(dto: Partial<Board>) {
        try {
            dto.columns = JSON.stringify(dto.columns)
            const board = this.repo.create(dto)
            await board.save()
            return board;
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
        return { ...board, columns: board.columns };
    }

    /**
     * Get all Boards from DB.
     * @async
     * @returns {Board[]} Users Array.
     */
    async getAll() {
        const boards = await this.repo.find()
        return boards
    }

    /**
     * Delete Board by Id from DB.
     * @async
     * @param {string} id Board id.
     * @returns {Board} Returns deleted Board.
     */
    async deleteBoard(id: string) {
        const board = await this.repo.findOne(id)
        if(!board) throw new NotFoundError(`Board with id - ${id} not found`)
        await board.remove()
        return board
    }

    /**
     * Updates Board with the specified id.
     * @async
     * @param {string} id Board id 
     * @param {Partial<Board>} dto Object with filds to update.
     * @returns {boolean} is Board been updated
     */
    async updateBoard(id: string, dto: Partial<Board>) {
        const affected = (await this.repo.update(id, dto)).affected
        if(!affected) throw new BadRequestError('To many parameters or id not found')
        return true
    }
}

export default new BoardService();