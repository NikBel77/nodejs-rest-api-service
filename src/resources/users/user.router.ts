import { Router } from 'express';
import { BadRequestError, NotFoundError } from '../../errorHandler';
import User from './user.model';
import usersService from './user.service';
import { StatusCodes } from 'http-status-codes';

const router = Router()

router.route('/').get(async (_, res) => {
    const users =  usersService.getAll();
    res.json(users.map(User.toResponse));
});

router.route('/').post((req, res) => {
    const { name, login, password } = req.body;
    if(!User.validate(name, login, password)) throw new BadRequestError(
        `invalid one of parameters: name: ${name}, login: ${login}, password: ${password}`
    )
    const user = usersService.createUser(name, login, password);
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

router.route('/:id').get((req, res) => {
    const { id } = req.params;
    const user = usersService.findUserById(id);
    if(!user) throw new NotFoundError(`user with id: ${id} not found`)
    res.json(User.toResponse(user))
});

router.route('/:id').delete((req, res) => {
    const { id } = req.params;
    const deletetUser = usersService.deleteUser(id)
    if(!deletetUser) throw new NotFoundError(`user with id: ${id} not found`)
    res.status(StatusCodes.NO_CONTENT).json(User.toResponse(deletetUser))
});

router.route('/:id').put((req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body
    const updatedUser = usersService.updateUser(id, { name, login, password });
    if(!updatedUser) throw new NotFoundError(`user with id: ${id} not found`)
    res.json(User.toResponse(updatedUser))
});

export default router;
