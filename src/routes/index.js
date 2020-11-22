const router = require('express').Router()
const apiRoutes = require('./api')
const slackRoutes = require('./slack')

router.use('/api', apiRoutes)
router.use('/slack', slackRoutes)

module.exports = router
