import { Task } from '../../entities/Task';
import { getRepository } from 'typeorm';
import { BadRequestError, NotFoundError } from '../../middleware/errorHandler';

/**
 * TaskService class.
 * Task DB management.
 * @class
 */
class TaskService {
    /**
     * get Repo
     * @returns {Repository<Task>}
     */
    get repo() {
        return getRepository(Task)
    }

    /**
     * Task to responce
     * @param task
     * @returns 
     */
    toResponce = (task: Task) => ({
        ...task, id: task.id.toString()
    })

     /**
     * Create new Task and add to DB.
     * @async
     * @param {Partial<Task>} dto - Task dto.
     * @returns {Task} new created Task instance.
     */
    async createTask(boardId: string, dto: Partial<Task>) {
        try {
            const taskDto = { ...dto, boardId };
            const task = this.repo.create(taskDto)
            await task.save()
            return this.toResponce(task);
        } catch {            
            throw new BadRequestError('One of parameters missing');
        }
    }
    
    /**
     * Find Task By Id.
     * @async
     * @param {string} id - Task id.
     * @returns {Task} Task from db.
     */
    async findTaskById(id: string) {
        const task = await this.repo.findOne(id)
        if(!task) throw new NotFoundError(`Task with id - ${id} not found`)
        return this.toResponce(task);
    }

    /**
     * Get all tasks from DB.
     * @async
     * @returns {Task[]} Tasks Array.
     */
    async getAll() {
        const tasks = await this.repo.find()
        return tasks.map(this.toResponce)
    }

    /**
     * Delete Task by Id from DB.
     * @async
     * @param {string} id Task id.
     * @returns {Task} Returns deleted Task.
     */
    async deleteTask(id: string) {
        const task = await this.repo.findOne(id)
        if(!task) throw new NotFoundError(`Task with id - ${id} not found`)
        await task.remove()
        return this.toResponce(task)
    }

    /**
     * Updates Task with the specified id.
     * @async
     * @param {string} id Task id 
     * @param {Partial<Task>} dto Object with filds to update.
     * @returns {boolean} is Task been updated
     */
    async updateTask(id: string, dto: Partial<Task>) {
        const affected = (await this.repo.update(id, dto)).affected
        if(!affected) throw new BadRequestError('To many parameters or id not found')
        return true
    }

    /**
     * Remove all task where board id
     * @async
     * @param boardId 
     */
    async removeWhereId(boardId: string) {
        const tasks = await this.repo.find({ where: { boardId: boardId }})
        tasks.forEach(async (task) => await task.remove());
    }

    async unassignUser(userId: string) {
        const tasks = await this.repo.find({ where: { userId: userId }})
        tasks.forEach(task => task.userId = null)
    }
}

export default new TaskService()