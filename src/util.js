const fs = require('fs')
const path = require('path')


module.exports.exists = value => value != null

module.exports.loadInput = (...parts) =>
	fs.readFileSync(path.resolve(...parts))
		.toString()
		.split('\n')
