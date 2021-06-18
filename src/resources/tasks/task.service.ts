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
     * Create new Task and add to DB.
     * @async
     * @param {Partial<Task>} dto - Task dto.
     * @returns {Task} new created Task instance.
     */
    async createTask(dto: Partial<Task>) {
        try {
            const task = this.repo.create(dto)
            await task.save()
            return task;
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
        return task;
    }

    /**
     * Get all tasks from DB.
     * @async
     * @returns {Task[]} Tasks Array.
     */
    async getAll() {
        const tasks = await this.repo.find()
        return tasks
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
        return task
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
}

export default new TaskService()