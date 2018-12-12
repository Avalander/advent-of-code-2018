const {
	map,
	pipe,
	prop,
	reduce,
} = require('ramda')

const { loadInput } = require('../util')

const {
	findLimits,
	generateMap,
	measureDistance,
	parseRow,
} = require('./shared')


const reduceDistances = (input, distance) => (prev, point) => {
	const total_distance = input.reduce(
		(prev, x) => prev + measureDistance(point, x),
		0
	)

	return (total_distance < distance
		? [ ...prev, point ]
		: prev
	)
}


const main = (input, distance) => () => {
	const data = map(parseRow, input)
	const limits = findLimits(data)

	return pipe(
		generateMap,
		reduce(reduceDistances(data, distance), []),
		prop('length'),
	) (limits)
}


module.exports = main(loadInput(__dirname, 'input'), 10000)

module.exports.factory = main
