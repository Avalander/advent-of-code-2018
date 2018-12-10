const path = require('path')
const fs = require('fs')

const { pipe, split, filter, reduce, add, toString } = require('ramda')


const exists = value =>
	value != null

const processInput = pipe(
	toString,
	split('\n'),
	filter(exists),
	reduce(add, 0)
)

const main = () => {
	const input = fs.readFileSync(path.resolve(__dirname, 'input'))
	const result = processInput(input)

	console.log(result)
}

main()
