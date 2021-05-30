const router = require('express').Router({ mergeParams: true });
const taskServise = require('./task.service');

router.route('/').get(async (req, res) => {
    const tasks = taskServise.getAll();
    res.json(tasks);
});

router.route('/').post(async (req, res) => {
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

router.route('/:id').put(async (req, res) => {
    const { id, boardId } = req.params;
    const updatedTask = taskServise.updateTask({ ...req.body, id, boardId });

    if(!updatedTask) {
        res.sendStatus(404);
        return
    }
    res.json(updatedTask);
});

module.exports = router