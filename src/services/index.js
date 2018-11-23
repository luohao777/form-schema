import {request} from '@/utils/request'
import qs from 'qs'

export async function apiUploadFile(url, params, cb) {
	return request(url, {
		method: 'POST',
		data: params,
		onUploadProgress: function(progress) {
			cb && cb(progress)
		}
	})
}

export async function apiGet(url, params) {
	const queryString = qs.stringify(params, {
		arrayFormat: 'repeat',
		skipNulls: true,
		addQueryPrefix: true
	})
	return request(`${url}${queryString}`)
}

export async function apiPost(url, params) {
	return request(url, {
		method: 'POST',
		data: params
	})
}
