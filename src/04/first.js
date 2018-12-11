const {
	add,
	map,
	pipe,
	reduce,
	sort,
	take,
} = require('ramda')

const {
	loadInput,
	unwrapList,
	trace
} = require('../util')
const {
	parseLog,
	sortLogs,
} = require('./shared')


const addGuardId = ([ data, guard_id ], x) =>
	(x.guard_id
		? [[ ...data, x ], x.guard_id ]
		: [[ ...data, { ...x, guard_id }], guard_id ]
	)

const first = ([ x ]) => x

const parseLogs = pipe(
	sortLogs,
	map(parseLog),
	reduce(addGuardId, [[], 0 ]),
	first,
)


const getTime = date =>
	date.split(' ')[1]

const getMinutes = time =>
	parseInt(time.split(':')[1])

const getMintuesFromDate = pipe(
	getTime,
	getMinutes,
)

const makeNapLog = () => {
	const naps = new Array(60)
	naps.fill(0)
	return naps
}

const logReducers = {
	FallAsleep: (prev, time, guard_id) =>
		({
			...prev,
			[guard_id]: {
				...prev[guard_id],
				guard_id,
				fall_asleep: time,
			},
		}),
	WakeUp: (prev, time, guard_id) => {
		const prev_guard = prev[guard_id]
		const fall_asleep_time = getTime(prev_guard.fall_asleep)
		const fall_asleep = fall_asleep_time.startsWith('00')
			? getMinutes(fall_asleep_time)
			: 0
		const wake_up = getMintuesFromDate(time)
		const naps = (prev_guard.naps || makeNapLog())
			.map((x, i) => i >= fall_asleep && i < wake_up
				? x + 1
				: x
			)

		return ({
			...prev,
			[guard_id]: {
				...prev_guard,
				guard_id,
				naps,
			}
		})
	},
	StartShift: (prev) => prev,
}

const logTimeAsleep = (prev, { type, time, guard_id }) =>
	logReducers[type](prev, time, guard_id)

const countTimeAsleep = guard =>
	({
		...guard,
		total_min_asleep: guard.naps.reduce(add, 0),
	})

const compareTimeAsleep = (a, b) =>
	b.total_min_asleep - a.total_min_asleep


const findSleepiestGuard = pipe(
	parseLogs,
	reduce(logTimeAsleep, {}),
	Object.values,
	map(countTimeAsleep),
	sort(compareTimeAsleep),
	take(1),
	unwrapList,
)

const findSleepiestMinute = pipe(
	sort((a, b) => b[0] - a[0]),
	take(1),
	unwrapList,
	([ x, i ]) => i
)

const main = input => () => {
	const { guard_id, naps } = findSleepiestGuard(input)
	const sleepiest_minute = findSleepiestMinute(
		naps.map((x, i) => [x, i])
	)
	return parseInt(guard_id) * sleepiest_minute
}


module.exports = main(loadInput(__dirname, 'input'))

module.exports.factory = main
