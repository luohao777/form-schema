// 日期扩展
const TIME = {
	ms: 1,
	s: 1000,
	m: 60 * 1000,
	h: 60 * 60 * 1000,
	d: 24 * 60 * 60 * 1000
}

const padZero = (num) => {
	if (num * 1 < 10) {
		num = '0' + num
	}
	return num
}
/**
 * @Author    lichin
 * @DateTime  2018-07-13
 * @param     {[type]}    s [description]
 * @return    {[type]}      [description]
 */

/* eslint-disable no-extend-native */
Date.prototype.add = function(num = 0, type = 'd') {
	if (typeof num === 'number') {
		this.setTime(this.getTime() + num * TIME[type])
	}
	return this
}
Date.prototype.years = function(num) {
	if (typeof num === 'number') {
		this.setFullYear(num)
	}
	return this
}

Date.prototype.months = function(num) {
	if (typeof num === 'number') {
		this.setMonth(num)
	}
	return this
}

Date.prototype.dates = function(num) {
	if (typeof num === 'number') {
		this.setDate(num)
	}
	return this
}

Date.prototype.hours = function(num) {
	if (typeof num === 'number') {
		this.setHours(num)
	}
	return this
}

Date.prototype.minutes = function(num) {
	if (typeof num === 'number') {
		this.setMinutes(num)
	}
	return this
}

Date.prototype.seconds = function(num) {
	if (typeof num === 'number') {
		this.setSeconds(num)
	}
	return this
}

Date.prototype.milliseconds = function(num) {
	if (typeof num === 'number') {
		this.setMilliseconds(num)
	}
	return this
}

Date.prototype.format = function(format = 'yyyy/MM/dd hh:mm:ss') {
	if (/(y+)/.test(format) || /(Y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	const regMap = {
		'M+': this.getMonth() + 1,
		'D+': this.getDate(),
		'd+': this.getDate(),
		'H+': this.getHours(),
		'h+': this.getHours(),
		'm+': this.getMinutes(),
		'S+': this.getSeconds(),
		's+': this.getSeconds()
	}
	for (const k in regMap) {
		if (new RegExp(`(${k})`).test(format)) {
			const str = regMap[k] + ''
			format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padZero(str))
		}
	}
	return format
}
