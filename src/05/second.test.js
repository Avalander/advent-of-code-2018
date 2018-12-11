const test = require('tape')

const { factory } = require('./second')


// Fixtures

const test_data = 'dabAcCaCBAcCcaDA'

const main = factory(test_data)


// Tests

test('Day 05 problem 2', t => {
	t.plan(1)
	const result = main()
	t.equal(result, 4)
})
