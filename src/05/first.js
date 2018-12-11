const { loadInput } = require('../util')

const { reducePolymer } = require('./shared')


const main = input => () => {
	const result = reducePolymer(input)
	return result.length
}


module.exports = main(loadInput(__dirname, 'input')[0])

module.exports.factory = main
