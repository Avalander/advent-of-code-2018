const {
	applyTo,
	filter,
	flip,
	join,
	map,
	pipe,
	reduce,
	split,
	zip,
	zipWith,
} = require('ramda')

const { loadInput } = require('../util')


const compare = (a, b) => a === b

const closeEnough = a =>
	pipe(
		zipWith(compare, a),
		reduce(
			(prev, x) => x
				? prev
				: prev + 1,
			0
		),
		flip(applyTo) (x => x === 1)
	)

const findBoxes = input => {
	for (let x of input) {
		const fn = closeEnough(x.split(''))
		const y = input.find(
			pipe(
				split(''),
				fn,
			)
		)
		if (y) return [x, y]
	}
}

const findEqualPart = ([ a, b ]) =>
	pipe(
		zip(a),
		filter(([ x, y ]) => x === y),
		map(([ x ]) => x),
		join('')
	) (b)


const main = () => {
	const input = loadInput(__dirname, 'input')
	const result = pipe(
		findBoxes,
		map(split('')),
		findEqualPart,
	) (input)
	return result
}

console.log(main())

module.exports = {
	closeEnough,
}