
export default {
	methods: {
		showPopover(e, key) {
			this.$refs[key].referenceElm = e.target.parentNode
			setTimeout(() => {
				this.popoverVisible[key] = true
			}, 150)
		},

		hidePopover() {
			for (const key in this.popoverVisible) {
				this.popoverVisible[key] = false
			}
		}
	}
}
