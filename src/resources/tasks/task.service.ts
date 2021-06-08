import Task, { ITask } from './task.model';
import MemoryDB from '../db/memory.db';

/**
 * UserService class.
 * Task DB management.
 * @class
 */
class TasksService {
    private taskDB: MemoryDB<ITask>

    /**
     * Create TaskService instance.
     * @constructor
     */
    constructor() {
        this.taskDB = new MemoryDB();
    }

    /**
     * Create new Task and push to DB.
     * @param {object} params - Represents new Task.
     * @returns {Task} new created User instance.
     */
    createTask(params: { [key: string]: string }) {
        const task = new Task(params);
        this.taskDB.addItem(task);
        return task;
    }

    /**
     * Find Task By Id.
     * @param {string} id - Task id.
     * @returns {(Task | null)} Task from db or null if not finded.
     */
    findTaskById(id: string) {
        const found = this.taskDB.getById(id);
        if(!found) return null;
        return found;
    }

    /**
     * Get all tasks from DB.
     * @returns {TAsk[]} Task Array.
     */
    getAll() {
        return this.taskDB.getAll();
    }

    /**
     * Delete Task by Id from DB.
     * @param {string} id Task id.
     * @returns {(Task | null)} Returns deleted Task. if the Task was deleted and null if not.
     */
    deleteTask(id: string) {
        const deletedTask = this.taskDB.deleteItemById(id)
        if(!deletedTask) return null;
        return deletedTask;
    }

    /**
     * Delete all tasks whose id equals boadrId.
     * @param {string} boardId 
     */
    deleteByBoardId(boardId: string) {
        let tasks = this.taskDB.getAll()
        tasks = tasks.filter((task) => task.boardId === boardId)
        this.taskDB.deleteItems(tasks);
    }

    /**
     * Remove All Users From assignee.
     * @param {string} userId 
     */
    removeUser(userId: string) {
        const tasks = this.taskDB.getAll()
        tasks.forEach((task) => {
            if(task.userId && task.userId === userId) {
                task.userId = null;
            }
        })
    }

    /**
     * Updates Task with the specified id.
     * @param {Task} task Object represents Task model 
     * @returns {Task} updated Task
     */
    updateTask(id: string, {
        title,
        description,
        userId,
        order,
        boardId,
        columnId
    }: {
        title: string,
        description: string,
        userId: string,
        order: string,
        boardId: string,
        columnId: string})
    {
        const task = this.taskDB.getById(id);
        if(!task) return null;

        if(title) task.title = title;
        if(description) task.description = description;
        if(userId) task.userId = userId;
        if(order) task.order = order;
        if(boardId) task.boardId = boardId;
        if(columnId) task.columnId = columnId;
        return task;
    }
}

export default new TasksService()