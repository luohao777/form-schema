// import {session} from './index'

// const checkStatus = (res) => {
// 	// console.log(res)
// 	if (res.headers['x-csrf-token']) {
// 		// console.log(global.BUS.$axios.defaults.headers)
// 		session('X-CSRF-TOKEN', res.headers['x-csrf-token'])
// 	}
// 	if (res.status >= 200 && res.status <= 300) {
// 		if (res.data.statusCode === 101 || res.data.statusCode === 613 || res.data.statusCode === 612) {
// 			global.sessionStorage.clear()
// 			window.location.href = '/login' + '?_t=' + Date.now()
// 		}
// 		return res.data
// 	}
// // }

export function request(url, options) {
	// global.BUS.$axios.defaults.headers['X-CSRF-TOKEN'] = session('X-CSRF-TOKEN')
	// global.BUS.$axios.defaults.headers['offset'] = new Date().getTimezoneOffset() / 60
	return global.BUS.$axios(url, options)
										// .then(checkStatus)
										.then((data) => data)
										.catch(err => ({
											statusCode: 500,
											err: err,
											message: err.toString()
										}))
}
