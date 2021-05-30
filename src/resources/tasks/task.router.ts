import express from 'express';
import taskServise from './task.service';
const router = express.Router({ mergeParams: true });

interface IParams { id: string, boardId: string }

router.route('/').get(async (_, res) => {
    const tasks = taskServise.getAll();
    res.json(tasks);
});

router.route('/').post<IParams>(async (req, res) => {
    const { boardId }= req.params
    const task = taskServise.createTask({ ...req.body, boardId });
    res.status(201).json(task);
});

router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const task = taskServise.findTaskById(id);
    if(!task) {
        res.sendStatus(404);
        return
    }
    res.json(task);
});

router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const deletedTask = taskServise.deleteTask(id)
    if(!deletedTask) {
        res.sendStatus(404);
        return
    }
    res.status(204).json(deletedTask);
});

router.route('/:id').put<IParams>(async (req, res) => {
    const { id, boardId } = req.params;
    const { title, description, userId, order, columnId } = req.body
    const updatedTask = taskServise.updateTask(id, { boardId, title, description, userId, order, columnId });

    if(!updatedTask) {
        res.sendStatus(404);
        return
    }
    res.json(updatedTask);
});

export default router