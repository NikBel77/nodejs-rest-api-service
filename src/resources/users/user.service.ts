import { User } from '../../entities/User';
import { getRepository } from 'typeorm';
import taskService from '../tasks/task.service';
import { BadRequestError, NotFoundError } from '../../middleware/errorHandler';

/**
 * UserService class.
 * User DB management.
 * @class
 */
class UsersService {
    /**
     * get Repo
     * @returns {Repository<User>}
     */
    get repo() {
        return getRepository(User)
    }

    private toResponce = ({ name, id, login }: User) => ({ name, id, login })

     /**
     * Create new User and add to DB.
     * @async
     * @param {Partial<User>} dto - User dto.
     * @returns {User} new created User instance.
     */
    async createUser(dto: Partial<User>) {
        try {
            const user = this.repo.create(dto)
            await user.save()
            return this.toResponce(user);
        } catch {            
            throw new BadRequestError('One of parameters missing');
        }
    }
    
    /**
     * Find User By Id.
     * @async
     * @param {string} id - User id.
     * @returns {User} User from db.
     */
    async findUserById(id: string) {
        const user = await this.repo.findOne(id)
        if(!user) throw new NotFoundError(`User with id - ${id} not found`)
        return this.toResponce(user);
    }

    /**
     * Get all users from DB.
     * @async
     * @returns {User[]} Users Array.
     */
    async getAll() {
        const users = await this.repo.find()
        return users.map(this.toResponce)
    }

    /**
     * Delete User by Id from DB.
     * @async
     * @param {string} id User id.
     * @returns {User} Returns deleted User.
     */
    async deleteUser(id: string) {
        const user = await this.repo.findOne(id)
        if(!user) throw new NotFoundError(`User with id - ${id} not found`)
        await user.remove()        
        await taskService.unassignUser(id)        
        return this.toResponce(user)
    }

    /**
     * Updates User with the specified id.
     * @async
     * @param {string} id User id 
     * @param {Partial<User>} dto Object with filds to update.
     * @returns {boolean} is user been updated
     */
    async updateUser(id: string, dto: Partial<User>) {
        const affected = (await this.repo.update(id, dto)).affected
        if(!affected) throw new BadRequestError('To many parameters or id not found')
        return true
    }
}

export default new UsersService();
