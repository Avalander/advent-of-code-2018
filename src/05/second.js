const {
	join,
	pipe,
	prop,
	sort,
	split,
} = require('ramda')

const { loadInput } = require('../util')

const { reducePolymerFast } = require('./shared')


const units = 'abcdefghijklmnopqrstuvwxyz'.split('')

const testUnit = unit => pipe(
	split(unit),
	join(''),
	split(unit.toUpperCase()),
	join(''),
	reducePolymerFast,
	prop('length'),
)


const main = input => () => {
	const lengths = units.map(u =>
		testUnit(u) (input)
	)
	const [ result ] = sort((a, b) => a - b, lengths)
	return result
}


module.exports = main(loadInput(__dirname, 'input')[0])

module.exports.factory = main
