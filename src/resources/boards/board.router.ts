import { Router } from 'express';
import taskRouter from '../tasks/task.router';
import boardService from './board.service';
import Board from './board.model';

const router = Router();

router.route('/').get(async (_, res) => {
    const users = boardService.getAll();
    res.json(users);
});

router.route('/').post(async (req, res) => {
    const { title, columns } = req.body;
    if(!Board.validate(title)) {
        res.sendStatus(400);
        return;
    }
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
    const updated = boardService.updateBoard(id, title, columns);
    if(!updated) {
        res.sendStatus(404);
        return
    }
    res.json(updated)
});

router.use('/:boardId/tasks/', taskRouter)

export default router