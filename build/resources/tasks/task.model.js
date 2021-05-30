"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
/**
 * presents Task model
 * @class
 */
class Task {
    constructor({ id = crypto_1.default.randomBytes(16).toString("hex"), title = 'No Title', description = 'No description', userId = '', order = '', boardId = '', columnId = '', }) {
        this.id = id;
        this.title = title;
        this.order = order || null;
        this.description = description;
        this.userId = userId || null;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}
exports.default = Task;
