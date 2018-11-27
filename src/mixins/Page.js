export default {

	props: {
		parentName: String,
		propsData: {
			type: Object,
			default() {
				return {}
			}
		},
		propsState: {
			type: Object,
			default() {
				return {}
			}
		}
	},

	methods: {
		emitter(key, data = {}, state = {}) {
			this.$emit('view', key, data, state)
		}
	}
}
