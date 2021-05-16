const router = require('express').Router();
const taskRouter = require('../tasks/task.router');

router.route('/').get(async (req, res) => {
    console.log('board');
    res.sendStatus(200);
});

router.route('/:boardId').get(async (req, res) => {
    console.log(req.query);
    res.json(req.query);
});

router.use('/:boardId/tasks/', taskRouter)

module.exports = router