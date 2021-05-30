"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_service_1 = __importDefault(require("./task.service"));
const router = express_1.default.Router({ mergeParams: true });
router.route('/').get(async (_, res) => {
    const tasks = task_service_1.default.getAll();
    res.json(tasks);
});
router.route('/').post(async (req, res) => {
    const { boardId } = req.params;
    const task = task_service_1.default.createTask({ ...req.body, boardId });
    res.status(201).json(task);
});
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const task = task_service_1.default.findTaskById(id);
    if (!task) {
        res.sendStatus(404);
        return;
    }
    res.json(task);
});
router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const deletedTask = task_service_1.default.deleteTask(id);
    if (!deletedTask) {
        res.sendStatus(404);
        return;
    }
    res.status(204).json(deletedTask);
});
router.route('/:id').put(async (req, res) => {
    const { id, boardId } = req.params;
    const { title, description, userId, order, columnId } = req.body;
    const updatedTask = task_service_1.default.updateTask(id, { boardId, title, description, userId, order, columnId });
    if (!updatedTask) {
        res.sendStatus(404);
        return;
    }
    res.json(updatedTask);
});
exports.default = router;
