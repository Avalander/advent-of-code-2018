const {
	applyTo,
	filter,
	flip,
	map,
	pipe,
	reduce,
} = require('ramda')

const { loadInput } = require('../util')


const row_regex = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/

const parseRow = row => {
	const [ _, id, left, top, width, height ] = row_regex.exec(row)
	return {
		id,
		left: parseInt(left),
		top: parseInt(top),
		width: parseInt(width),
		height: parseInt(height),
	}
}

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
