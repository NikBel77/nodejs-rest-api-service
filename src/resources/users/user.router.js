const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
    const { name, login, password } = req.body;
    if(!User.validate(name, login, password)) {
        res.sendStatus(400);
        return;
    };
    const user = usersService.createUser(name, login, password);
    res.status(201).json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
    const { id } = req.params;
    const user = usersService.findUserById(id);
    if(!user) {
        res.sendStatus(404);
        return
    }
    res.json(User.toResponse(user))
});

router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;
    const deletetUser = usersService.deleteUser(id)
    if(!deletetUser) {
        res.sendStatus(404);
        return
    }
    res.status(204).json(User.toResponse(deletetUser))
});

router.route('/:id').put(async (req, res) => {
    const { id } = req.params;
    const { name, login, password } = req.body
    const deletetUser = usersService.updateUser(id, { name, login, password });
    if(!deletetUser) {
        res.sendStatus(404);
        return
    }
    res.json(User.toResponse(deletetUser))
})

module.exports = router;
