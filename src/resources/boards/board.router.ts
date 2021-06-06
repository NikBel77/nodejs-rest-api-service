import { Router } from 'express';
import taskRouter from '../tasks/task.router';
import boardService from './board.service';
import Board from './board.model';
import { BadRequestError, NotFoundError } from '../../errorHandler';

const router = Router();

router.route('/').get((_, res) => {
    const users = boardService.getAll();
    res.json(users);
});

router.route('/').post((req, res) => {
    const { title, columns } = req.body;
    if(!Board.validate(title)) throw new BadRequestError(`
        invalid one of parameters: title: ${title}, columns: ${columns}
    `)
    const board = boardService.createBoard(title, columns);
    res.status(201).json(board);
});

router.route('/:id').get((req, res) => {
    const { id } = req.params;
    const board = boardService.findBoardById(id);
    if(!board) throw new NotFoundError(`border with id: ${id} not found`)
    res.json(board)
});

router.route('/:id').delete((req, res) => {
    const { id } = req.params;
    const deletedBoard = boardService.deleteBoard(id)
    if(!deletedBoard) throw new NotFoundError(`border with id: ${id} not found`)
    res.status(204).json(deletedBoard)
});

router.route('/:id').put((req, res) => {
    const { id } = req.params;
    const { title, columns } = req.body
    const updated = boardService.updateBoard(id, title, columns);
    if(!updated) throw new NotFoundError(`border with id: ${id} not found`)
    res.json(updated)
});

router.use('/:boardId/tasks/', taskRouter)

export default router