import express from 'express';
import taskServise from './task.service';
import { StatusCodes } from 'http-status-codes';
import routerFn from '../../utils/routerFn';

const router = express.Router({ mergeParams: true });

router.route('/').get(routerFn(async (_, res) => {
    const task = await taskServise.getAll();
    res.json(task);
}));

router.route('/').post(routerFn(async (req, res) => {
    const task = await taskServise.createTask(req.body);
    res.status(StatusCodes.CREATED).json(task);
}));

router.route('/:id').get(routerFn(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('id must be provided')
    const task = await taskServise.findTaskById(id);
    res.json(task)
}));

router.route('/:id').delete(routerFn(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('id must be provided')
    const deleted = await taskServise.deleteTask(id)
    res.status(StatusCodes.NO_CONTENT).json(deleted)
}));

router.route('/:id').put(routerFn(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('id must be provided')
    const isUpdated = await taskServise.updateTask(id, req.body);
    res.json({ updated: isUpdated })
}));

export default router