var express = require('express')
var router = express.Router()

router.use('/attendance', require('./attendance'))

router.get('/', function (req, res) {

})

module.exports = router
