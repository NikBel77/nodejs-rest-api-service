const crypto = require("crypto");
/**
 * presents Task model
 * @class
 */
class Task {
    /**
     * Create Task
     * @constructor
     * @param {Object} task task model.
     * @param {string} task.title generated unique task id.
     * @param {string} task.order  task order.
     * @param {strign} task.description task description.
     * @param {string} task.password task password strign.
     * @param {string} task.userId task user.
     * @param {string} task.boardId task board.
     * @param {string} task.columnId task column.
     */
    constructor({
        id = crypto.randomBytes(16).toString("hex"),
        title = 'No Title',
        description = 'No description',
        userId = null,
        order,
        boardId,
        columnId,
    } = {}) {
        this.id = id;
        this.title = title;
        this.order = order
        this.description = description
        this.userId = userId
        this.boardId = boardId
        this.columnId = columnId
    }
}

module.exports = Task;