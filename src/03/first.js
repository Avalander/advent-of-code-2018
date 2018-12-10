const {
	applyTo,
	filter,
	flip,
	map,
	pipe,
	reduce,
} = require('ramda')

const { loadInput } = require('../util')
const { parseRow } = require('./shared')


const markAreas = (map, { left, top, width, height }) => {
	for (let x = left; x < left + width; x++) {
		for (let y = top; y < top + height; y++) {
			const key = `${x},${y}`
			map[key] = (map[key] || 0) + 1
		}
	}
	return map
}

const countHigherThan = value =>
	pipe(
		map(parseRow),
		reduce(markAreas, {}),
		flip(applyTo) (Object.values),
		filter(x => x > value),
	)


const main = (width, height) => input => () => {
	const result = countHigherThan(1) (input)
	return result.length
}


module.exports = main(1000, 1000) (loadInput(__dirname, 'input'))

module.exports.factory = main
