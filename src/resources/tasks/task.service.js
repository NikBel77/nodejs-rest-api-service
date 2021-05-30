const Task = require('./task.model');
const MemoryDB = require('../db/memory.db');
/**
 * UserService class.
 * used for TaskDB management
 * @class
 */
class TasksService {
    constructor() {
        this.taskDB = new MemoryDB();
    }

    createTask(params) {
        const task = new Task(params);
        this.taskDB.addItem(task);
        return task;
    }

    findTaskById(id) {
        const found = this.taskDB.getById(id);
        if(!found) return null;
        return found;
    }

    getAll() {
        return this.taskDB.getAll();
    }

    deleteTask(id) {
        const deletedTask = this.taskDB.deleteItemById(id)
        if(!deletedTask) return null;
        return deletedTask;
    }

    deleteByBoardId(boardId) {
        this.taskDB.deleteByProp('boardId', boardId);
    }

    removeUser(userId) {
        const tasks = this.taskDB.getAll()
        tasks.forEach((task, i) => {
            if(task.userId === userId) {
                tasks[i].userId = null;
            }
        })
    }

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