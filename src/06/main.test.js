const test = require('tape')

const first = require('./first')
const second = require('./second')


// Fixtures

const test_data = [
	'1, 1',
	'1, 6',
	'8, 3',
	'3, 4',
	'5, 5',
	'8, 9',
]


// Test

test('Day 06 problem 1', t => {
	t.plan(1)
	const main = first.factory(test_data)
	const result = main()
	t.equal(result, 17)
})


test('Day 06 problem 2', t => {
	t.plan(1)
	const main = second.factory(test_data, 32)
	const result = main()
	t.equal(result, 16)
})