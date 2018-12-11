module.exports.sortLogs = x => {
	const copy = [ ...x ]
	copy.sort()
	return copy
}

const EventType = {
	StartShift: {
		regex: /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\] Guard #(\d+) begins shift/i,
		parse: ([ _, time, guard_id ]) => ({
			type: 'StartShift',
			guard_id,
			time,
		}),
	},
	FallAsleep: {
		regex: /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\] falls asleep/i,
		parse: ([ _, time ]) => ({
			type: 'FallAsleep',
			time,
		})
	},
	WakeUp: {
		regex: /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\] wakes up/,
		parse: ([ _, time ]) => ({
			type: 'WakeUp',
			time,
		})
	},
}

const EventTypeList = Object.values(EventType)

module.exports.parseLog = log => {
	const type = EventTypeList
		.find(type => type.regex.test(log))
	return type.parse(type.regex.exec(log))
}