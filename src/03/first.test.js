const test = require('tape')

const { factory } = require('./first')


// FIXTURES

const test_data = [
	'#1 @ 1,3: 4x4',
	'#2 @ 3,1: 4x4',
	'#3 @ 5,5: 2x2',
]

const main = factory(8, 8) (test_data)


// TESTS

test('It calculates the area', t => {
	t.plan(1)
	const result = main()
	t.equal(result, 4)
})
