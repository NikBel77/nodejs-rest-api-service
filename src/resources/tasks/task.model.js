const crypto = require("crypto");

class Task {
    constructor({
        id = crypto.randomBytes(16).toString("hex"),
        title,
        order,
        description,
        userId = null,
        boardId,
        columnId,
    }) {
        this.id = id;
        this.title = title;
        this.order = order
        this.description = description
        this.userId = userId
        this.boardId = boardId
        this.columnId = columnId
    }

    static toResponse(task) {
        return task
    }
}

module.exports = Task;