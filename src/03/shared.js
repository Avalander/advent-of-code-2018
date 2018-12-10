const row_regex = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/

module.exports.parseRow = row => {
	const [_, id, left, top, width, height] = row_regex.exec(row)
	return {
		id,
		left: parseInt(left),
		top: parseInt(top),
		width: parseInt(width),
		height: parseInt(height),
	}
}