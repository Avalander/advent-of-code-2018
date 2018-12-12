const {
	filter,
	map,
	pipe,
	reduce,
	sort,
} = require('ramda')

const { loadInput } = require('../util')

const {
	findLimits,
	generateMap,
	measureDistance,
	parseRow,
} = require('./shared')


const reduceDistances = input => (prev, point) => {
	const [ closest, second ] = input
		.map((x, i) => [ measureDistance(point, x), i ])
		.sort(([ a ], [ b ]) => a - b)
	
	return (closest[0] === second[0]
		? prev
		: ({
			...prev,
			[closest[1]]: [ ...(prev[closest[1]] || []), point ],
		})
	)
}

const isFinite = ({ top, bottom, left, right }) => ([ _, points]) =>
	!points.some(([ x, y ]) =>
		x === left || x === right || y === top || y === bottom
	)

const removeInfiniteAreas = limits => pipe(
	Object.entries,
	filter(isFinite(limits)),
)

const compareAreas = ([ _1, a ], [ _2, b ]) => b.length - a.length

const printMap = limits => input => {
	data = Object.entries(input)
	const ids = 'abcdefg'
	const findData = (x0, y0) => ([ id, points ]) =>
		points.some(([ x1, y1 ]) => x0 === x1 && y0 === y1)
	const result = []
	for (let y = limits.top; y <= limits.bottom; y++) {
		const row = []
		for (let x = limits.left; x <= limits.right; x++) {
			const id = data.find(findData(x, y))
			const key = id ? ids[id[0]] : '.'
			row.push(key)
		}
		result.push(row.join(''))
	}
	console.log(result.join('\n'))
	return input
}


const main = input => () => {
	const data = map(parseRow, input)
	const limits = findLimits(data)

	return pipe(
		generateMap,
		reduce(reduceDistances(data), {}),
		// printMap(limits),
		removeInfiniteAreas(limits),
		sort(compareAreas),
		([[_, points]]) => points.length,
	) (limits)	
}


module.exports = main(loadInput(__dirname, 'input'))

module.exports.factory = main
