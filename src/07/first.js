const {
	join,
	map,
	pipe,
} = require('ramda')

const { loadInput, trace } = require('../util')

const regex = /Step ([A-Z]) must be finished before step ([A-Z]) can begin./


const parseRows = row => {
	const [ _, first, second ] = regex.exec(row)
	return [ first, second ]
}

const makeStep = step =>
	({
		step,
		dependencies: [],
		toString: () => step,
	})

const listSteps = steps =>
	[ ...new Set(
		steps.reduce(
			(prev, [ a, b ]) => [ ...prev, a, b ],
			[]
		)
	)]
	.sort()
	.map(makeStep)
	
const buildDepTree = step_rows => {
	const steps = listSteps(step_rows)
	step_rows.forEach(([ first, second ]) => {
		const step = steps.find(({ step }) => step === second)
		step.dependencies.push(first)
	})
	return steps
}

const placeSteps = steps => {
	const result = []
	while (result.length < steps.length) {
		const { step } = steps
			.find(({ step, dependencies }) =>
				!result.includes(step) && dependencies.every(x => result.includes(x))
			)
		result.push(step)
	}
	return result
}


const main = input => () => {
	return pipe(
		map(parseRows),
		buildDepTree,
		placeSteps,
		join('')
	) (input)
}

module.exports = main(loadInput(__dirname, 'input'))

module.exports.factory = main
