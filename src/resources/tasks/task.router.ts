import express from 'express';
import { NotFoundError } from '../../errorHandler';
import taskServise from './task.service';

const router = express.Router({ mergeParams: true });

interface IParams { id: string, boardId: string }

router.route('/').get((_, res) => {
    const tasks = taskServise.getAll();
    res.json(tasks);
});

router.route('/').post<IParams>((req, res) => {
    const { boardId }= req.params
    const task = taskServise.createTask({ ...req.body, boardId });
    res.status(201).json(task);
});

router.route('/:id').get((req, res) => {
    const { id } = req.params;
    const task = taskServise.findTaskById(id);
    if(!task) throw new NotFoundError(`task with id: ${id} not found`)
    res.json(task);
});

router.route('/:id').delete((req, res) => {
    const { id } = req.params;
    const deletedTask = taskServise.deleteTask(id)
    if(!deletedTask) throw new NotFoundError(`task with id: ${id} not found`)
    res.status(204).json(deletedTask);
});

router.route('/:id').put<IParams>((req, res) => {
    const { id, boardId } = req.params;
    const { title, description, userId, order, columnId } = req.body
    const updatedTask = taskServise.updateTask(id, { boardId, title, description, userId, order, columnId });

    if(!updatedTask) throw new NotFoundError(`task with id: ${id} and board-id: ${boardId} not found`)
    res.json(updatedTask);
});

export default router