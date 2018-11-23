import Vue from 'vue'
// import {pathnameMap} from '@/conf/pathMap'
import {formatNum, electronicTime, fileSize} from './index'

/* eslint-disable */
export default (function() {
	/**
	 * breadcrumb 路径
	 **/
	// Vue.filter('path', function(value) {
	// 	return value ? pathnameMap[value] : '首页'
	// })

	Vue.filter('cent', function(value) {
		return value / 100
	})

	Vue.filter('money', function(value) {
		return formatNum(value)
	})

	Vue.filter('count', function(value) {
		return formatNum(value, true)
	})

	Vue.filter('eTime', function(value) {
		return electronicTime(value)
	})

	Vue.filter('checkNull', function(value) {
		return value ? value.label : ''
	})

	Vue.filter('rate', function (value) {
		return (value * 100).toFixed(2) + '%'
	})

	Vue.filter('dateFullTime', function(value) {
		if (typeof value === 'string') {
			value = value.replace(/\-/g, '/')
		}
		const diffHours = (- (global.__helpers__.timeZoneOffset || 8) * 60 - new Date().getTimezoneOffset()) / 60
		return value ? new Date(value).add(diffHours, 'h').format('yyyy-MM-dd hh:mm:ss') : ''
	})

	Vue.filter('fileSize', function(value = 0) {
		let map = fileSize(value, 0)
		let unitMap = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
		const index = map.size.toString().indexOf('.')
		if (index < 0) {
			// 无小数点
			return map.size + unitMap[map.index]
		} else {
			// 有小数点
			return parseFloat(map.size.toString().substring(0, index + 3)) + unitMap[map.index]
		}
	})

})()
