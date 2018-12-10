const path = require('path')
const fs = require('fs')

const {
	concat,
	filter,
	map,
	pipe,
	reduceWhile,
	split,
	toString,
} = require('ramda')

const { exists } = require('../util')


const init = () =>
	({
		value: 0,
		previous: [],
		repeated: [],
	})

const noRepeats = ({ repeated }) =>
	repeated.length === 0

const calculateRepeated = (previous, repeated, value) =>
	(previous.includes(value)
		? repeated
		: [ ...repeated, value ]
	)

const calculateFreq = (prev, x) => {
	const value = prev.value + x
	const previous = [...prev.previous, value]
	const repeated = concat(prev.repeated, calculateRepeated(prev.previous, prev.repeated, value))
	return ({
		...prev,
		value,
		previous,
		repeated,
	})
}

const findRepeatedFreq = data => pipe(
	reduceWhile(noRepeats, calculateFreq, data)
)

const processInput = input => {
	let result = init()
	while (noRepeats(result)) {
		result = findRepeatedFreq(result) (input)
		console.log(result.previous.length)
		console.log(result.repeated)
	}
	return result
}

const parseInput = pipe(
	toString,
	split('\n'),
	filter(exists),
	map(parseInt),
)

const main = () => {
	const input = parseInput(
		fs.readFileSync(path.resolve(__dirname, 'input'))
	)
	const result = processInput(input)

	console.log(result)
}

main()