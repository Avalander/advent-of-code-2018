const {
	map,
	pipe,
	reduce,
	sort,
	take,
} = require('ramda')

const {
	loadInput,
	unwrapList,
} = require('../util')
const {
	parseLog,
	sortLogs,
} = require('./shared')


const addGuardId = ([data, guard_id], x) =>
	(x.guard_id
		? [[...data, x], x.guard_id]
		: [[...data, { ...x, guard_id }], guard_id]
	)

const first = ([x]) => x

const parseLogs = pipe(
	sortLogs,
	map(parseLog),
	reduce(addGuardId, [[], 0]),
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

const findNap = guard =>
	({
		...guard,
		most_common_nap: guard.naps.reduce(
			(prev, x, i) => x > prev[0]
				? [ x, i ]
				: prev,
			[ 0, 0 ]
		),
	})

const compareNaps = (a, b) =>
	b.most_common_nap[0] - a.most_common_nap[0]


const findSleepiestGuard = pipe(
	parseLogs,
	reduce(logTimeAsleep, {}),
	Object.values,
	map(findNap),
	sort(compareNaps),
	take(1),
	unwrapList,
)


const main = input => () => {
	const { guard_id, most_common_nap } = findSleepiestGuard(input)
	return parseInt(guard_id) * most_common_nap[1]
}


module.exports = main(loadInput(__dirname, 'input'))

module.exports.factory = main
