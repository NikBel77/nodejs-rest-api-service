"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_model_1 = __importDefault(require("./task.model"));
const memory_db_1 = __importDefault(require("../db/memory.db"));
/**
 * UserService class.
 * Task DB management.
 * @class
 */
class TasksService {
    /**
     * Create TaskService instance.
     * @constructor
     */
    constructor() {
        this.taskDB = new memory_db_1.default();
    }
    /**
     * Create new Task and push to DB.
     * @param {object} params - Represents new Task.
     * @returns {Task} new created User instance.
     */
    createTask(params) {
        const task = new task_model_1.default(params);
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
        if (!found)
            return null;
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
        const deletedTask = this.taskDB.deleteItemById(id);
        if (!deletedTask)
            return null;
        return deletedTask;
    }
    /**
     * Delete all tasks whose id equals boadrId.
     * @param {string} boardId
     */
    deleteByBoardId(boardId) {
        let tasks = this.taskDB.getAll();
        tasks = tasks.filter((task) => task.boardId === boardId);
        this.taskDB.deleteItems(tasks);
    }
    /**
     * Remove All Users From assignee.
     * @param {string} userId
     */
    removeUser(userId) {
        const tasks = this.taskDB.getAll();
        tasks.forEach((task) => {
            if (task.userId && task.userId === userId) {
                task.userId = null;
            }
        });
    }
    /**
     * Updates Task with the specified id.
     * @param {Task} task Object represents Task model
     * @returns {Task} updated Task
     */
    updateTask(id, { title, description, userId, order, boardId, columnId }) {
        const task = this.taskDB.getById(id);
        if (!task)
            return null;
        if (title)
            task.title = title;
        if (description)
            task.description = description;
        if (userId)
            task.userId = userId;
        if (order)
            task.title = order;
        if (boardId)
            task.title = boardId;
        if (columnId)
            task.title = columnId;
        return task;
    }
}
exports.default = new TasksService();
