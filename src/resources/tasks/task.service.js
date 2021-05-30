const Task = require('./task.model');
const MemoryDB = require('../db/memory.db');
/**
 * UserService class.
 * used for TaskDB management
 * @class
 */
class TasksService {
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
    createTask(params) {
        const task = new Task(params);
        this.taskDB.addItem(task);
        return task;
    }

    /**
     * Find Task By Id.
     * @param {string} id - Task id.
     * @returns {(Task | null)} Task from db or null if not finded.
     */
    findTaskById(id) {
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
    deleteTask(id) {
        const deletedTask = this.taskDB.deleteItemById(id)
        if(!deletedTask) return null;
        return deletedTask;
    }

    /**
     * Delete all tasks whose id equals boadrId.
     * @param {string} boardId 
     */
    deleteByBoardId(boardId) {
        this.taskDB.deleteByProp('boardId', boardId);
    }

    /**
     * Remove All Users From assignee.
     * @param {string} userId 
     */
    removeUser(userId) {
        const tasks = this.taskDB.getAll()
        tasks.forEach((task, i) => {
            if(task.userId === userId) {
                tasks[i].userId = null;
            }
        })
    }

    /**
     * Updates Task with the specified id.
     * @param {Task} task Object represents Task model 
     * @returns {Task} updated Task
     */
    updateTask({ id, ...filds }) {
        const task = this.taskDB.getById(id);
        if(!task) return null;
        Object.keys(filds).forEach((prop) => {
            if(!filds[prop]) return;
            task[prop] = filds[prop];
        });
        return task;
    }
}

module.exports = new TasksService()