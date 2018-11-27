// datetimeFormatter
const replaceStr = (val) => {
	if (typeof val === 'string') {
		return val.replace(/\-/g, '/')
	} else {
		return val
	}
}

export default {
	methods: {
		formatterDate(row, column, cellValue, index) {
			return cellValue ? new Date(replaceStr(cellValue)).add(global.__helpers__.diffHours, 'h').format('yyyy-MM-dd') : ''
		},

		formatterDateFullTime(row, column, cellValue, index) {
			return cellValue ? new Date(replaceStr(cellValue)).add(global.__helpers__.diffHours, 'h').format('yyyy-MM-dd hh:mm:ss') : ''
		},

		formatterDateWithoutSecond(row, column, cellValue, index) {
			return cellValue ? new Date(replaceStr(cellValue)).add(global.__helpers__.diffHours, 'h').format('yyyy-MM-dd hh:mm') : ''
		}
	}
}
