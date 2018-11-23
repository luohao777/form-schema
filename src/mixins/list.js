import formatterDateMixin from './datetime'
import {parseData, handleErr, randomString} from '@/utils'
import {apiGet} from '@/services'
import moment from 'moment'
moment.locale('zh-cn')

export const queryMixin = {

	methods: {
		/**
		 * @Author    lichin
		 * @DateTime  2018-01-10
		 * @copyright 传入对象数组过滤未被靶中的字段
		 * @license   [license]
		 * @version   [version]
		 * @param     {[type]}    keys   [传入的数组对象集]
		 * @param     {[type]}    search [查询参数]
		 * @return    {[type]}           [处理后的参数]
		 */
		filterQuery(search) {
			const {searchKeyMap} = this
			for (const key in searchKeyMap) {
				searchKeyMap[key].map(item => {
					if (item !== search[key]) {
						delete search[item]
					}
				})
			}
			return search
		},

		getQuery() {
			let query = {...this.search}
			query = this.filterQuery(query)

			for (let key in query) {
				if (query[key] === '' || query[key] === undefined || query[key] === null) {
					delete query[key]
				}
			}
			return query
		}
	}
}

export const listMixin = {

	computed: {
		list() {
			let data = parseData(this.data)
			if (this.sortKeys) {
				data = data.sort(this.sortData)
			}
			const start = this.pageSize * (this.pageID - 1)
			return this.local ? (this.various ? data : data.slice(start, this.pageSize * this.pageID)) : data
		}
	},

	props: {
		app: Object
	},

	mixins: [queryMixin, formatterDateMixin],

	data() {
		return {
			data: [],
			selection: [],
			loading: false,
			totalRecord: 0,
			pageID: 1,
			pageSize: 10
		}
	},

	methods: {
		onSearch() {
			this.pageID = 1
			this.getList()
			this.selection = []
			this.extra && this.extra()
		},

		getList(cb) {
			const {
				pageID,
				pageSize,
				local,
				api
			} = this
			if (!api || this.loading) {
				return false
			}
			this.loading = true

			let query = {pageID, pageSize, ...this.getQuery(), _k: randomString()}
			apiGet(this.api, query).then(res => {
				if (res.statusCode === 200) {
					let data = local ? res.content : res.content.content
					if (this.filterDataFunc) {
						data = this.filterDataFunc(data)
					}

					this.data = data
					this.totalRecord = local ? res.content.length : res.content.totalRecord
				} else {
					handleErr(res.message)
				}
			}).then(() => {
				typeof cb === 'function' && cb()
				this.loading = false
			})
		},

		clearList() {
			this.loading = false
			this.pageID = 1
			this.totalRecord = 0
			this.selection = []
		},

		sortData(a, b) {
			if (this.sortKeys && this.sortKeys.length > 0) {
				// 如果需要对比
				for (let value of this.sortKeys) {
					const keyArr = value.split('-')
					const key = keyArr[keyArr.length - 1]
					if (a[key] < b[key]) {
						return keyArr.length > 1 ? -1 : 1
					}
					if (a[key] > b[key]) {
						return keyArr.length > 1 ? 1 : -1
					}
				}
				return 0
			} else {
				return -1
			}
		},

		onPageChange(pageID) {
			this.pageID = pageID
			this.getList(() => {
				if (this.isAllPageSelected) {
					this.$refs.table && this.$refs.table.toggleAllSelection()
				}
			})
		},

		onPageSizeChange(pageSize) {
			this.pageSize = pageSize
			this.pageID = 1
			this.getList()
		},

		onSelectionChange(selectedArr, key = 'id') {
			this.selection = this.tableKey ? selectedArr.map(item => item[this.tableKey || key]) : selectedArr
		},

		watchKey() {
			const { searchKeyMap } = this
			for (const item in searchKeyMap) {
				this.$watch(`search.${item}`, function (newKey, oldKey) {
					if (newKey) {
						const cacheVal = this.search[oldKey]
						for (const key of searchKeyMap[item]) {
							this.search[key] = cacheVal
						}
					}
				})
			}
		}
	},

	mounted() {
		this.init && this.init()
		if (!this.manual) {
			this.onSearch()
			this.watchKey()
		}
	},

	activated() {
		// 当不含_k 且 左侧切入的时候 （刚开启标签页）
		if (!this.$route.query._k) {
			this.init && this.init()
			if (!this.manual) {
				this.onSearch()
			}
		}
	}
}

// 分页记录不存储在url上
export const modalListMixin = {
	data() {
		return {
			list: [],
			selection: [],
			totalRecord: 0,
			pageSize: 10,
			pageID: 1
		}
	},

	methods: {

		getList() {
			const {pageID, pageSize, params, api} = this

			if (!api) {
				return false
			}
			let query = {pageID, pageSize, ...params}
			apiGet(api, query).then(res => {
				if (res.statusCode === 200) {
					this.list = res.content.content
					this.totalRecord = res.content.totalRecord
				}
			})
		},

		onPageChange(pageID) {
			this.pageID = pageID
			this.getList()
		},

		onPageSizeChange(size) {
			this.pageSize = size
			this.pageID = 1
			this.getList()
		},

		onSelectionChange(selectedArr, key = 'id') {
			this.selection = selectedArr.map(item => item[key])
		}
	}
}

export const enhanceQueryMixin = {
	methods: {
		/**
		 * @Author    lichin
		 * @DateTime  2018-06-11
		 * @copyright 传入对象数组过滤未被靶中的字段
		 * @license   [license]
		 * @version   [version]
		 * @param     {[type]}    keys   [传入的数组对象集]
		 * @param     {[type]}    search [查询参数]
		 * @return    {[type]}           [处理后的参数]
		 */
		filterQuery(search) {
			const {searchKeyMap} = this
			for (const key in searchKeyMap) {
				searchKeyMap[key].map(item => {
					if (item !== search[key]) {
						delete search[item]
					}
				})
			}
			return search
		},

		getQuery() {
			let query = {...this.search}
			query = this.filterQuery(query)
			for (const key in query) {
				if (query[key] === '' || query[key] === undefined) {
					delete query[key]
				}
			}

			return query
		}
	}
}

export const enhanceListMixin = {

	computed: {
		list() {
			return this.data
		}
	},

	props: {
		app: Object
	},

	mixins: [enhanceQueryMixin, formatterDateMixin],

	data() {
		return {
			data: [],
			tableProps: [],
			selection: [],
			loading: false,
			totalRecord: 0,
			pageID: 1,
			pageSize: 10
		}
	},

	methods: {
		onSearch() {
			this.pageID = 1
			this.getList()
			this.selection = []
			this.extra && this.extra()
		},

		getList() {
			const {
				pageID,
				pageSize,
				api
			} = this

			if (!api || this.loading) {
				return false
			}
			this.loading = true
			let query = {pageID, pageSize, ...this.getQuery(), _k: randomString()}
			apiGet(api, query).then(res => {
				if (res.statusCode === 200) {
					this.tableProps = res.content.tableProps
					this.data = res.content.content
					this.totalRecord = res.content.totalRecord
				} else {
					handleErr(res.message)
				}
			}).then(() => {
				this.loading = false
			})
		},

		onPageChange(pageID) {
			this.pageID = pageID
			this.getList()
		},

		onPageSizeChange(pageSize) {
			this.pageSize = pageSize
			this.pageID = 1
			this.getList()
		},

		onSelectionChange(selections) {
			this.selection = this.selections
		},

		watchKey() {
			const { searchKeyMap } = this
			for (const item in searchKeyMap) {
				this.$watch(`search.${item}`, function (newKey, oldKey) {
					if (newKey) {
						const cacheVal = this.search[oldKey]
						for (const key of searchKeyMap[item]) {
							this.search[key] = cacheVal
						}
					}
				})
			}
		}
	},

	mounted() {
		this.init && this.init()
		if (!this.manual) {
			this.onSearch()
			this.watchKey()
		}
	},

	activated() {
		// 当不含_k 且 左侧切入的时候 （刚开启标签页）
		if (!this.$route.query._k) {
			this.init && this.init()
			if (!this.manual) {
				this.onSearch()
			}
		}
	}
}
