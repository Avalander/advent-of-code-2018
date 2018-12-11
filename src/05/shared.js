const {
	join,
	pipe,
	max,
	reduceRight,
	split,
} = require('ramda')


module.exports.reducePolymer = pipe(
	split(''),
	reduceRight(
		(x, [head, ...tail]) =>
			(head && x !== head && x.toLowerCase() === head.toLowerCase()
				? tail
				: [x, head, ...tail]),
		[]
	),
	join('')
)

const canReact = (a, b) =>
	a !== b && a.toLowerCase() === b.toLowerCase()

module.exports.reducePolymerFast = input => {
	let index = 0
	let data = input
	while (index < data.length - 1) {
		if (canReact(data[index], data[index + 1])) {
			data = data.substring(0, index) + data.substring(index + 2, data.length)
			index = max(0, index - 1)
		}
		else {
			index++
		}
	}
	return data
}
