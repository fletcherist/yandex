var fs = require('fs')

var dbName = 'db.json'
var data = fs.readFileSync(dbName, 'utf-8')

var db
const init = () => {
	try {
		db = JSON.parse(data)
	} catch (e) {
		console.log('db is not working' + e)
	}
	console.log(db)
}

init()

/*
	*@args type - type of the document (video, audio, subs)
	*@args link - link to the document
	*@return path - path to the document from the root directory
*/

const add = (type, link, path) => {
	if (check(link)) {
		console.log('this item is already in collection')
		return false
	}

	
	var obj = {
		type: type,
		link: link,
		path: path
	}
	db.push(obj)

	saveDb()
}

const check = (link) => {
	for (var i = 0; i < db.length; i++) {
		if (db[i].link === link) {
			return true
		}
	}

	return false
}

const get = (link) => {
	for (var i = 0; i < db.length; i++) {
		if (db[i].link === link) {
			return db[i]
		}
	}

	return false
}

const remove = (link) => {
	for (var i = 0; i < db.length; i++) {
		if (db[i].link === link) {
			delete db[i]
			console.log('this item was remove from the collection')
			return true
		}
	}

	return false
}

const saveDb = () => {
	var stringDb = JSON.stringify(db)
	fs.writeFileSync(dbName, stringDb)
}

module.exports.add = add
module.exports.check = check
module.exports.remove = remove
module.exports.get = get