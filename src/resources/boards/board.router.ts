import { Router } from 'express';
import taskRouter from '../tasks/task.router';
import boardService from './board.service';
import { StatusCodes } from 'http-status-codes';
import routerFn from '../../utils/routerFn';

const router = Router();

router.route('/').get(routerFn(async (_, res) => {
    const boards = await boardService.getAll();
    res.json(boards);
}));

router.route('/').post(routerFn(async (req, res) => {
    const board = await boardService.createBoard(req.body);
    res.status(StatusCodes.CREATED).json(board);
}));

router.route('/:id').get(routerFn(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('id must be provided')
    const board = await boardService.findBoardById(id);
    res.json(board)
}));

router.route('/:id').delete(routerFn(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('id must be provided')
    const deleted = await boardService.deleteBoard(id)
    res.status(StatusCodes.NO_CONTENT).json(deleted)
}));

router.route('/:id').put(routerFn(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('id must be provided')
    const isUpdated = await boardService.updateBoard(id, req.body);
    res.json({ updated: isUpdated })
}));

router.use('/:boardId/tasks/', taskRouter)

export default router