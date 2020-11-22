const router = require('express').Router()
const ActionLoader = require('../loaders/ActionLoader')

router.get('/forms', ((req, res) => {
    res.json(ActionLoader.load(req.query.action).schema)
}))

router.post('/forms', (async (req, res) => {
    try {
        const action = ActionLoader.load(req.query.action)
        const resp = await action.parse(req.body)
        res.json(resp)
    } catch (e) {
        console.log(e.message)
        res.status(500).send(e.message)
    }
}))

module.exports = router
