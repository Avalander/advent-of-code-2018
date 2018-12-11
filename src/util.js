const fs = require('fs')
const path = require('path')


module.exports.exists = value => value != null

module.exports.loadInput = (...parts) =>
	fs.readFileSync(path.resolve(...parts))
		.toString()
		.split('\n')

module.exports.trace = label => data => {
	console.log(label, JSON.stringify(data, null, 2))
	return data
}

module.exports.unwrapList = ([ x ]) => x
