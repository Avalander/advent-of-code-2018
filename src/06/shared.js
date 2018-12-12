const {
	map,
	max,
	pipe,
	range,
	reduce,
	split,
} = require('ramda')


module.exports.parseRow = pipe(
	split(', '),
	map(parseInt),
)

module.exports.findLimits = reduce(
	(prev, [x, y]) => ({
		...prev,
		bottom: max(y, prev.bottom || y),
		right: max(x, prev.right || x)
	}),
	{ top: 0, left: 0 }
)

module.exports.measureDistance = ([x0, y0], [x1, y1]) =>
	Math.abs(x0 - x1) + Math.abs(y0 - y1)

module.exports.generateMap = ({ top, bottom, left, right }) => {
	const row_size = right - left + 1
	const col_count = bottom - top + 1
	const total_cells = col_count * row_size

	return range(0, total_cells)
		.map(i => {
			const column = Math.floor(i / row_size)
			const row = i - (column * row_size)
			return [row + left, column + top]
		})
}
