const test = require('tape')

const first = require('./first')


// Fixtures

const test_data = [
	'Step C must be finished before step A can begin.',
	'Step C must be finished before step F can begin.',
	'Step A must be finished before step B can begin.',
	'Step A must be finished before step D can begin.',
	'Step B must be finished before step E can begin.',
	'Step D must be finished before step E can begin.',
	'Step F must be finished before step E can begin.',
]


// Tests

test('Day 07 problem 1', t => {
	t.plan(1)
	const main = first.factory(test_data)
	const result = main()
	t.equal(result, 'CABDFE')
})
