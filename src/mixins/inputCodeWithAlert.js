/* 带反馈信息的验证码输入框 */
const defaultAlert = {
	visible: false,
	type: 'error',
	message: '',
	timer: null
}
export default {
	data() {
		return {
			inputCode: {
				alert: { ...defaultAlert },
				loading: false
			}
		}
	},

	methods: {
		showInputCodeMessage(message, type, during = 4000) {
			this.inputCode.alert.message = message
			this.inputCode.alert.type = type
			this.inputCode.alert.visible = true
			clearTimeout(this.inputCode.alert.timer)
			this.inputCode.alert.timer = setTimeout(() => {
				this.inputCode.alert.visible = false
			}, during)
		},

		clearAlert() {
			clearTimeout(this.inputCode.alert.timer)
			this.inputCode.alert = { ...defaultAlert }
		}
	}
}
