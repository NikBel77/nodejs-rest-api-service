import crypto from 'crypto';
import { IdbItem } from '../db/memory.db';

export interface ITask extends IdbItem {
    id: string;
    title: string;
    description: string;
    userId: string | null;
    order: string | null;
    boardId: string;
    columnId: string;
}

/**
 * presents Task model
 * @class
 */
class Task implements ITask {
    /**
     * Create Task
     * @constructor
     * @param {Object} task task model.
     * @param {string} task.id task id
     * @param {string} task.title generated unique task title.
     * @param {string} task.order  task order.
     * @param {strign} task.description task description.
     * @param {string} task.password task password strign.
     * @param {string} task.userId task user.
     * @param {string} task.boardId task board.
     * @param {string} task.columnId task column.
     */

    public id: string;

    public title: string;

    public description: string;

    public userId: string | null;

    public order: string | null;

    public boardId: string;

    public columnId: string;

    constructor({
        id = crypto.randomBytes(16).toString("hex"),
        title = 'No Title',
        description = 'No description',
        userId,
        order,
        boardId = '',
        columnId = '',
    }: { [key: string]: string }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.boardId = boardId;
        this.columnId = columnId;
        this.userId = userId !== undefined ? userId : null;
        this.order = order !== undefined ? order : null;
    }
}

export default Task;