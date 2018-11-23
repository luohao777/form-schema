/**
 * @Author    lichin
 * @DateTime  2018-05-31
 * @description
 * 将后续新增的 schema 的默认值填入已配的通道 list 中的配置中
 * 保持纯函数
 */
export const backWardsCompatibility = (schema = [], list = []) => {
	let defaultValue = {}
	for (const sch of schema) {
		defaultValue[sch.key] = sch.defaultValue
	}

	return list.map(i => {
		let item = { ...i }
		item.routingRule = {
			...defaultValue,
			...i.routingRule
		}
		return item
	})
}
