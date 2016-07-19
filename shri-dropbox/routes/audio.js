var express = require('express')
var request = require('request')
var router = express.Router()

router.get('/:link', (req, res) => {
	var link = req.params.link
	res.send(link)
})

module.exports = router