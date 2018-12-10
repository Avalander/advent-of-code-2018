const {
	map,
	pipe,
	prop,
	reduce,
} = require('ramda')

const { loadInput } = require('../util')
const { parseRow } = require('./shared')


const markAreas = (map, { id, left, top, width, height }) => {
	for (let x = left; x < left + width; x++) {
		for (let y = top; y < top + height; y++) {
			const key = `${x},${y}`
			map[key] = (map[key] || [])
			map[key].push(id)
			if (map[key].length > 1) {
				map[key].forEach(x => map.repeated.add(x))
			}
		}
	}
	return map
}

const getOverlappingIds = pipe(
	reduce(markAreas, { repeated: new Set()}),
	prop('repeated'),
)

const main = input => () => {
	const data = map(parseRow) (input)
	const overlapping_ids = getOverlappingIds(data)
	const { id } = data.find(({ id }) => !overlapping_ids.has(id))
	return id
}


module.exports = main(loadInput(__dirname, 'input'))

module.exports.factory = main
