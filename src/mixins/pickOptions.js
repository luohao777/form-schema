export const disabledDateOptions = {
	data() {
		const vm = this
		this._queryDate = {
			minDate: null,
			maxDate: null
		}
		return {
			// 最大允许选择天数
			maxAllowDay: 90,
			// 选择第一个日期时，分别在此日期基础上，向前、向后禁用 maxAllowDay 天
			disabledDateOptions: {
				onPick(val) {
					vm._queryDate = val
				},
				disabledDate(date) {
					const { maxDate, minDate } = vm._queryDate
					// 仅在选择首个日期时禁用
					if (minDate && !maxDate) {
						const result = (date - minDate) / 86400000 > vm.maxAllowDay || (minDate - date) / 86400000 > vm.maxAllowDay
						return result
					} else {
						return false
					}
				}
			}
		}
	}
}
