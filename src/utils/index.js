const padZero = (num) => {
	if (num * 1 < 10) {
		num = '0' + num
	}
	return num
}

export const session = (key, value) => {
	if (value === void 0) {
		let temp = sessionStorage.getItem(key)
		if (temp && temp.indexOf('helpers-') === 0) {
			return JSON.parse(temp.split('helpers-')[1])
		} else {
			return temp
		}
	} else {
		if (typeof value === 'object' || Array.isArray(value)) {
			value = 'helpers-' + JSON.stringify(value)
		}
		return sessionStorage.setItem(key, value)
	}
}

export function urlParse() {
	const url = window.location.href
	let searchStr = ''
	if (url.indexOf('#/') > -1 && url.indexOf('?') > -1) {
		searchStr = url.substr(url.indexOf('?'))
	} else {
		searchStr = window.location.search
	}
	let obj = {}
	const reg = /[?&][^?&]+=[^?&]+/g
	let arr = searchStr.match(reg)
	if (arr) {
		arr.forEach(item => {
			const tempArr = item.substring(1).split('=')
			const key = decodeURIComponent(tempArr[0])
			const val = decodeURIComponent(tempArr[1])
			if (obj.hasOwnProperty(key)) {
				obj[key] = [obj[key]]
				obj[key].push(val)
			} else {
				obj[key] = val
			}
		})
	}
	return obj
}

export function parseData(obj) {
	return JSON.parse(JSON.stringify(obj))
}

export function handleErr(msg) {
	global.BUS.$message.closeAll()
	global.BUS.$message({type: 'error', message: msg ? msg.toString() : 'netError', showClose: true})
}
export const electronicTime = (time) => {
	time = time * 1 / 1000
	return [
		padZero(parseInt(time / 3600)),
		padZero(parseInt((time / 60) % 60)),
		padZero(parseInt(time % 60))
	].join(':')
}

export const formatNum = (str, noCent) => {
	let newStr = ''
	let count = 0
	let minus = ''
	if (typeof str === 'number') {
		str = str.toString()
	}
	if (str) {
		if (str.indexOf('+') === 0) {
			const splitArr = str.split('+')
			str = splitArr[splitArr.length - 1].toString()
			minus = splitArr.length === 2 ? '+' : ''
		} else if (str.indexOf('-') > -1) {
			const splitArr = str.split('-')
			str = splitArr[splitArr.length - 1].toString()
			minus = splitArr.length === 2 ? '-' : ''
		}
	} else {
		str = '0'
	}
	if (str.indexOf('.') === -1) {
		for (let i = str.length - 1; i >= 0; i--) {
			if (count % 3 === 0 && count !== 0) {
				newStr = str.charAt(i) + ',' + newStr
			} else {
				newStr = str.charAt(i) + newStr
			}
			count++
		}
		str = minus + newStr + (noCent ? '' : '.00')
	} else {
		for (let i = str.indexOf('.') - 1; i >= 0; i--) {
			if (count % 3 === 0 && count !== 0) {
				newStr = str.charAt(i) + ',' + newStr
			} else {
				newStr = str.charAt(i) + newStr
			}
			count++
		}
		str = minus + newStr + (str + '00').substr((str + '00').indexOf('.'), 3)
	}
	return str
}

export const randomString = (len = 5) => {
	const char = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
	let randomStr = ''
	for (let i = 0; i < len; i++) {
		randomStr += char.charAt(Math.floor(Math.random() * 62))
	}
	return randomStr
}
/**
 * 获取菜单
 **/
export const getMenu = (access) => {
	console.log(access)
	const menuCollection = access.map(item => {
		const nodeArr = item.split('.')
		nodeArr.length = nodeArr.length - 1
		return nodeArr.reduce((i, j) => {
			if (typeof i === 'string') {
				const arr = [i]
				arr.push(`${i}-${j}`)
				return arr
			} else {
				const arr = i
				arr.push(`${i[i.length - 1]}-${j}`)
				return arr
			}
		})
	})
	const menu = Array.from(new Set(menuCollection.reduce((i, j) => i.concat(j))))
	return menu
}

export const fileSize = (size, index) => {
	const temp = size / 1024
	if (size < 1000) {
		return {size, index}
	} else {
		return fileSize(temp, index + 1)
	}
}

export const debounce = (fn, delay) => {
	var timer = null
	return function () {
		var context = this
		var args = arguments
		clearTimeout(timer)
		timer = setTimeout(function() {
			fn.apply(context, args)
		}, delay)
	}
}
