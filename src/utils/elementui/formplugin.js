export const formpluginMixin = {
	inject: {
		elForm: {
			default: ''
		},
		elFormItem: {
			default: ''
		}
	},

	props: {
		validateEvent: {
			type: Boolean,
			default: true
		}
	}
}
