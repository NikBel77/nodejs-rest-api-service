const router = require('express').Router({ mergeParams: true });
const taskServise = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
    const tasks = taskServise.getAll();
    res.json(tasks.map(Task.toResponse));
});

router.route('/').post(async (req, res) => {
    const { boardId }= req.params
    const task = taskServise.createTask({ ...req.body, boardId });
    res.status(201).json(Task.toResponse(task));
});

router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const task = taskServise.findTaskById(id);
    if(!task) {
        res.sendStatus(404);
        return
    }
    res.json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const deletedTask = taskServise.deleteTask(id)
    if(!deletedTask) {
        res.sendStatus(404);
        return
    }
    res.status(204).json(Task.toResponse(deletedTask));
});

router.route('/:id').put(async (req, res) => {
    const { id, boardId } = req.params;
    const updatedTask = taskServise.updateTask({ ...req.body, id, boardId });

    if(!updatedTask) {
        res.sendStatus(404);
        return
    }
    res.json(Task.toResponse(updatedTask));
});

module.exports = router