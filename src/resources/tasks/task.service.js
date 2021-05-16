const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

class TasksService {
    constructor() {
        this.tasksStore = tasksRepo;
    }

    createTask(params) {
        const task = new Task(params);
        this.tasksStore.addTask(task);
        return task;
    }

    findTaskById(id) {
        const found = this.tasksStore.getById(id);
        if(!found) return null;
        return found;
    }

    getAll() {
        return this.tasksStore.getAll();
    }

    deleteTask(id) {
        const deletedTask = this.tasksStore.deleteTask(id)
        if(!deletedTask) return null;
        return deletedTask;
    }

    deleteByBoardId(boardId) {
        this.tasksStore.deleteByBoardId(boardId);
    }

    removeUser(userId) {
        const tasks = this.tasksStore.getAll()
        tasks.forEach((task, i) => {
            if(task.userId === userId) {
                tasks[i].userId = null;
            }
        })
    }

    updateTask({ id, ...filds }) {
        const task = this.tasksStore.getById(id);
        if(!task) return null;
        Object.keys(filds).forEach((prop) => {
            if(!filds[prop]) return;
            task[prop] = filds[prop];
        });
        return task;
    }
}

module.exports = new TasksService()