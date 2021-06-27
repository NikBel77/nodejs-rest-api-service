import { Router } from 'express';
import usersService from './user.service';
import { StatusCodes } from 'http-status-codes';
import routerFn from '../../utils/routerFn';

const router = Router()

router.route('/').get(routerFn(async (_, res) => {
    const users =  await usersService.getAll();
    res.json(users);
}));

router.route('/').post(routerFn(async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(StatusCodes.CREATED).json(user);
}));

router.route('/:id').get(routerFn(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('id must be provided')
    const user = await usersService.findUserById(id);
    res.json(user)
}));

router.route('/:id').delete(routerFn(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('id must be provided')
    const deletetUser = await usersService.deleteUser(id)
    res.status(StatusCodes.NO_CONTENT).json(deletetUser)
}));

router.route('/:id').put(routerFn(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new Error('id must be provided')
    const isUpdated = await usersService.updateUser(id, req.body);
    res.json({ updated: isUpdated })
}));

export default router;
