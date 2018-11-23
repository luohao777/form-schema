import qs from 'qs'

export const qsStringify = (params) => {
	return qs.stringify({
		...params,
		offset: new Date().getTimezoneOffset() / 60
	}, {
		arrayFormat: 'repeat',
		skipNulls: true,
		addQueryPrefix: true
	})
}
