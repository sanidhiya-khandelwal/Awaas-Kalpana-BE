const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.end('Awaas Kalpana Backend is healthy')
})
module.exports = router;