const problemDict = {
	'1': 'first',
	'first': 'first',
	'2': 'second',
	'second': 'second',
}

const day = process.argv[2]
const problem = problemDict[process.argv[3]]


const main = require(`./${day}/${problem}`)

console.log(main())
