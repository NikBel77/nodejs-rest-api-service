class TasksStore {
    constructor() {
        this.TASKS_STORE = [];
    }

    getAll() {
        return this.TASKS_STORE;
    }

    getById(soughtId) {
        return this.TASKS_STORE.find(({ id }) => id === soughtId) || null
    }

    deleteByBoardId(boardId) {
        this.TASKS_STORE = this.TASKS_STORE
            .filter(task => task.boardId !== boardId)
    }

    addTask(task) {
        this.TASKS_STORE.push(task)
    }

    deleteTask(soughtId) {
        const task = this.getById(soughtId);
        if(!task) return null
        this.TASKS_STORE = this.TASKS_STORE.filter(({ id }) => task.id !== id);
        return task
    }
}

module.exports = new TasksStore();
