const router = require('express').Router();
const taskRouter = require('../tasks/task.router');
const boardService = require('./board.service');
const Board = require('./board.model');

router.route('/').get(async (req, res) => {
    const users = boardService.getAll();
    res.json(users);
});

router.route('/').post(async (req, res) => {
    const { title, columns } = req.body;
    if(!Board.validate(title)) {
        res.sendStatus(400);
        return;
    };
    const board = boardService.createBoard(title, columns);
    res.status(201).json(board);
});

router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const board = boardService.findBoardById(id);
    if(!board) {
        res.sendStatus(404);
        return
    }
    res.json(board)
});

router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const deletedBoard = boardService.deleteBoard(id)
    if(!deletedBoard) {
        res.sendStatus(404);
        return
    }
    res.status(204).json(deletedBoard)
});

router.route('/:id').put(async (req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body
    const deletedBoard = boardService.updateBoard(id, { title, columns });
    if(!deletedBoard) {
        res.sendStatus(404);
        return
    }
    res.json(deletedBoard)
});

router.use('/:boardId/tasks/', taskRouter)

module.exports = router