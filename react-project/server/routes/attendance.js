var express = require('express')
var router = express.Router()

router.get('attendance/location/n1', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		latitude: 36.374057,
		longitude: 127.365722
	})) 
})

router.get('attendance/location/sparcs', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		latitude: 36.374261,
		longitude: 127.360387
	})) 
})

module.exports = router
