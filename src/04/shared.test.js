const test = require('tape')
const {
	map,
	pipe,
	range,
	take,
} = require('ramda')

const {
	parseLog,
	sortLogs,
} = require('./shared')


// Fixtures

const sorted_logs = [
	'[1518-11-01 00:00] Guard #10 begins shift',
	'[1518-11-01 00:05] falls asleep',
	'[1518-11-01 00:25] wakes up',
	'[1518-11-01 00:30] falls asleep',
	'[1518-11-01 00:55] wakes up',
	'[1518-11-01 23:58] Guard #99 begins shift',
	'[1518-11-02 00:40] falls asleep',
	'[1518-11-02 00:50] wakes up',
	'[1518-11-03 00:05] Guard #10 begins shift',
	'[1518-11-03 00:24] falls asleep',
	'[1518-11-03 00:29] wakes up',
	'[1518-11-04 00:02] Guard #99 begins shift',
	'[1518-11-04 00:36] falls asleep',
	'[1518-11-04 00:46] wakes up',
	'[1518-11-05 00:03] Guard #99 begins shift',
	'[1518-11-05 00:45] falls asleep',
	'[1518-11-05 00:55] wakes up',
]


// Util functions

const shuffle = x => {
	const copy = [ ...x ]
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const temp = copy[i]
		copy[i] = copy[j]
		copy[j] = temp
	}
	return copy
}


// sortLogs

test('sortLogs() works', t => {
	t.plan(10)
	range(0, 10).forEach(() => {
		const data = shuffle(sorted_logs)
		const result = sortLogs(data)
		t.deepEqual(result, sorted_logs)
	})
})


// parseLog

test('parseLog() works', t => {
	t.plan(1)
	const result = pipe(
		take(3),
		map(parseLog),
	) (sorted_logs)
	const expected = [{
		type: 'StartShift',
		guard_id: '10',
		time: '1518-11-01 00:00',
	}, {
		type: 'FallAsleep',
		time: '1518-11-01 00:05',
	}, {
		type: 'WakeUp',
		time: '1518-11-01 00:25'
	}]

	t.deepEqual(result, expected)
})
