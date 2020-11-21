const express = require('express')

const router = express.Router();

router.post('/code', (req, res) => {
    console.log(req.body)
    res.json({success: true})
})

module.exports = router
