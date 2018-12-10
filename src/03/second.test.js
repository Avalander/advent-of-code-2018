const test = require('tape')

const { factory } = require('./second')


// FIXTURES

const test_data = [
	'#1 @ 1,3: 4x4',
	'#2 @ 3,1: 4x4',
	'#3 @ 5,5: 2x2',
]

const main = factory(test_data)


// TESTS

test('It returns the id that does not overlap', t => {
	t.plan(1)
	const result = main()
	t.equal(result, '3')
})
