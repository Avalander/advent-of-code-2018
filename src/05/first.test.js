const test = require('tape')

const { factory } = require('./first')


// Fixtures

const test_data = 'dabAcCaCBAcCcaDA'

const main = factory(test_data)


// Tests

test('Final state of polymer is dabCBAcaDA', t => {
	t.plan(1)
	const result = main()
	t.equal(result, 10)
})
