"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = __importDefault(require("./user.model"));
const user_service_1 = __importDefault(require("./user.service"));
const router = express_1.Router();
router.route('/').get(async (_, res) => {
    const users = user_service_1.default.getAll();
    res.json(users.map(user_model_1.default.toResponse));
});
router.route('/').post(async (req, res) => {
    const { name, login, password } = req.body;
    if (!user_model_1.default.validate(name, login, password)) {
        res.sendStatus(400);
        return;
    }
    ;
    const user = user_service_1.default.createUser(name, login, password);
    res.status(201).json(user_model_1.default.toResponse(user));
});
router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const user = user_service_1.default.findUserById(id);
    if (!user) {
        res.sendStatus(404);
        return;
    }
    res.json(user_model_1.default.toResponse(user));
});
router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const deletetUser = user_service_1.default.deleteUser(id);
    if (!deletetUser) {
        res.sendStatus(404);
        return;
    }
    res.status(204).json(user_model_1.default.toResponse(deletetUser));
});
router.route('/:id').put(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const deletetUser = user_service_1.default.updateUser(id, { name, login, password });
    if (!deletetUser) {
        res.sendStatus(404);
        return;
    }
    res.json(user_model_1.default.toResponse(deletetUser));
});
exports.default = router;
