"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_router_1 = __importDefault(require("../tasks/task.router"));
const board_service_1 = __importDefault(require("./board.service"));
const board_model_1 = __importDefault(require("./board.model"));
const router = express_1.Router();
router.route('/').get(async (_, res) => {
    const users = board_service_1.default.getAll();
    res.json(users);
});
router.route('/').post(async (req, res) => {
    const { title, columns } = req.body;
    if (!board_model_1.default.validate(title)) {
        res.sendStatus(400);
        return;
    }
    ;
    const board = board_service_1.default.createBoard(title, columns);
    res.status(201).json(board);
});
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const board = board_service_1.default.findBoardById(id);
    if (!board) {
        res.sendStatus(404);
        return;
    }
    res.json(board);
});
router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const deletedBoard = board_service_1.default.deleteBoard(id);
    if (!deletedBoard) {
        res.sendStatus(404);
        return;
    }
    res.status(204).json(deletedBoard);
});
router.route('/:id').put(async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body;
    const updated = board_service_1.default.updateBoard(id, title, columns);
    if (!updated) {
        res.sendStatus(404);
        return;
    }
    res.json(updated);
});
router.use('/:boardId/tasks/', task_router_1.default);
exports.default = router;
