// import formLabelMixin from './formLabel'

export const editableMixin = {
	computed: {
		// 只允许新增，不可修改
		immutable() {
			return this.propsState.operateType !== 'new'
		},
		// 详情 不可新增和修改
		detail() {
			const { propsState } = this
			return propsState.operateType !== 'edit' && propsState.operateType !== 'new' && propsState.operateType !== 'set'
		}
	}
}
/**
 * [模态框] mixin
 */
export const modalMixin = {

	props: {
		// 模态框key 用于关闭事件接口传递
		propsKey: {
			type: String,
			required: true
		},
		// 名称key，用于显示模态框标题，区分数据类型
		// [merchant : agent]
		// [normalChannel : channelGroup]
		propsName: {
			type: String,
			required: true
		},
		// 显隐
		propsVisible: {
			type: Boolean,
			required: true
		},

		// 数据
		propsData: {
			type: Object,
			default() {
				return {}
			}
		},

		// 状态集合
		propsState: {
			type: Object,
			default() {
				return {}
			}
		}
	},

	mixins: [editableMixin],

	data() {
		return {
			visible: false,
			loading: false
		}
	},

	methods: {
		// 关闭自己 组件调用需要()
		close(beforeClose, afterClose) {
			this.clear()
			beforeClose && typeof beforeClose === 'function' && beforeClose()
			this.$emit('close', this.propsKey)
			this.visible = false
			afterClose && typeof afterClose === 'function' && afterClose()
		},

		// 清空数据层
		clear(name = 'form') {
			const {clearExtra, defaultData} = this
			this.$refs[name] && this.$refs[name].resetFields()
			if (defaultData) {
				this.data = {...defaultData}
			}
			clearExtra && typeof clearExtra === 'function' && clearExtra()
			setTimeout(() => {
				this.$refs[name] && this.$refs[name].clearValidate()
			}, 150)
		}
	}
}

/**
 * [模态框父级] Mixin
 */
export const modalParentMixin = {

	// mixins: [formLabelMixin],

	methods: {
		/**
		 * @Author    lichin
		 * @DateTime  2018-05-29
		 * @param     String    	key 		[模态框key：区分不同模态框数据模型]
		 * @param     String    	name 		[模态框名称：区分同模态框下不同数据模型]
		 * @param     {Object}    data 		[模态框继承数据模型]
		 * @param     {Object}    state 	[模态框状态属性]
		 */
		openModal(key, name, data = {}, state = {}) {
			this.modal[key] = {
				name,
				state,
				data,
				visible: true
			}
		},

		closeModal(key) {
			this.modal[key].visible = false
		}
	}

}
