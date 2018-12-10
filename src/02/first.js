const {
	applyTo,
	flip,
	pipe,
	reduce,
	split,
} = require('ramda')

const { loadInput } = require('../util')


const countChars = pipe(
	split(''),
	reduce(
		(prev, x) => ({ ...prev, [x]: (prev[x] || 0) + 1 }),
		{}
	),
	flip(applyTo) (Object.values),
)

const countRepeats = (prev, x) => {
	const chars = countChars(x)
	if (chars.includes(2)) prev[0] = prev[0] + 1
	if (chars.includes(3)) prev[1] = prev[1] + 1
	return prev
}


const main = () => {
	const input = loadInput(__dirname, 'input')
	const [ twos, threes ] = reduce(countRepeats, [0, 0], input)
	return twos * threes
}

module.exports = main
