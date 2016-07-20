var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()

var PORT = 80
app.listen(PORT, () => {
	console.log('Server is listening on ' + PORT)
})

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var uploader = require('./routes/uploader')

app.get('', (req, res) => {
	res.send(
		`shri-dropbox is working yet. <br>
		 <a href='http://github.com/fletcherist/shri-dropbox'>
		 	http://github.com/fletcherist/shri-dropbox
		 </a>`)
})

app.use('/', uploader)