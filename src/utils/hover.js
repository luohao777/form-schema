export default {
	bind (el, binding, vnode) {
		function documentHandler (e) {
			if (el.contains(e.target)) {
				return false
			}
			if (binding.expression) {
				binding.value(e)
			}
		}
		el.__vueClickOutside__ = documentHandler
		document.addEventListener('mouseenter', documentHandler)
	},
	update () {},
	unbind (el, binding) {
		document.removeEventListener('mouseenter', el.__vueClickOutside__)
		delete el.__vueClickOutside__
	}
}
