const router = require('express').Router({ mergeParams: true });

router.route('/').get(async (req, res) => {
    console.log('task');
    res.sendStatus(200);
})

router.route('/:taskId').get(async (req, res) => {
    console.log(req.params);
    res.json(req.params);
})

module.exports = router