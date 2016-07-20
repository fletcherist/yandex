var express = require('express')
var request = require('request')
var fs = require('fs')
var request = require('request')
var randomstring = require('randomstring')

var router = express.Router()
var db = require('./db')

router.get('*', (req, res) => {
	var path = req.originalUrl
	path = path.substr(1)
	console.log(path)

	var extRegex = /\/.{1,32}\..{1,10}$/
	var extension = path.match(extRegex)
	if (!extension) {
		return res.send('wrong extension')
	}

	extension = extension.toString()
	extension = extension.split('/')
	extension = extension[extension.length - 1]
	extension = extension.split('.')
	extension = extension[extension.length - 1]

	var filename = randomstring.generate(7)
	filename += '.' + extension

	var writePath = 'routes/upload/' + filename
	var dbWritePath = __dirname + '/upload/' + filename

	if (db.check(path)) {
		const file = db.get(path)
		res.sendFile(file.path)

		console.log('file has been sent')
	} else {
		var writeStream = fs.createWriteStream(writePath)
		request
			.get(path)
			.on('error', () => {
				res.send('error')
			})
			.pipe(writeStream)

		writeStream.on('finish', () => {
			db.add('video', path, dbWritePath)
			const file = db.get(path)
			res.sendFile(file.path)
		});
	}	
})

module.exports = router