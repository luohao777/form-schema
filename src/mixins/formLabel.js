/* 表单宽度自适应 */
import Cookie from 'js-cookie'

export default {
	computed: {
		formLabelWidth() {
			const lang = Cookie.get('helpers__lang')
			return this.formLabelWidthMap ? (this.formLabelWidthMap[lang] || this.formLabelWidthDefaultMap[lang]) : this.formLabelWidthDefaultMap[lang]
		}
	},
	data() {
		return {
			formLabelWidthDefaultMap: {
				'en': '180px',
				'zh-cn': '130px'
			}
		}
	}
}
