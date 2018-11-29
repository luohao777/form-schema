<script>
  import { modalParentMixin } from '@/mixins/modal'
	import { EMPTY_FUNCTION, moduleDefaultProperty } from './config'

  import SchemaWrap from './wrap/wrap'
  import SchemaStore from './schema-store'
  import SchemaModal from './modal'

  function parseSchema(s) {
    const tree = []
    let moduleId = 0
    let classId = 0
    for (const item of s) {
      const wrapType = validation(item)
      if (!wrapType) {
        return
      } else {
        if (wrapType === 'class') {
          tree.push({
            key: `class_${classId++}`,
            props: { wrapType, ...setModules(item), children: item.children }
          })
        } else {
          tree.push({
            key: `module_${moduleId++}`,
            props: { wrapType, ...setModules(item) }
          })
        }
      }
    }
    return tree
  }

  // 校验数据正确性, 确认 wrapType(类型)
  function validation(module) {
    if (!module.hasOwnProperty('title') || module.title === '') {
      throw new Error("The 'title' cannot be empty")
    }
    if (module.hasOwnProperty('class')) {
      if (module.class === '') {
        throw new Error("The 'class' cannot be empty")
      }
      if (!module.hasOwnProperty('children') || !(module.children instanceof Array)) {
        throw new Error("The 'children' cannot be empty and must be a Array")
      }
      return 'class'
    } else {
      return 'module'
    }
  }

  function setModules (conf) {
    const result = {}
    for (const item in conf) {
      if (moduleDefaultProperty.hasOwnProperty(item)) {
        result[item] = conf[item] !== '' ? conf[item] : moduleDefaultProperty[item]
      }
    }
    return result
  }

  function setModal(h) {
    const { store, modal, closeModal } = this
    return h(
      SchemaModal,
      {
        props: {
					store,
          propsKey: 'schema',
          propsName: 'schema',
          propsState: modal.schema.state,
          propsData: modal.schema.data,
					propsVisible: modal.schema.visible
        },
        on: {
          close: closeModal
        }
      }
    )
  }

  export default {
    name: 'schema',

    components: { SchemaWrap, SchemaModal },

    mixins: [ modalParentMixin ],

    props: {
      // component - component Name  Mapping
      map: {
        type: Object,
        required: true
      },
      // schema Content
      schema: {
        type: Array,
        required: true
			},
			api: String,
			// 来自外部交互数据，非Schema交互产生的Data，会在请求时传入参数最外层
			data: {
				type: Object,
				default() {
					return {}
				}
			},
			// 是否为批量操作模式
			batch: {
				type: Boolean,
				default() {
					return false
				}
			}
    },

    data() {
			const { schema, map, data, batch, api } = this
      const store = new SchemaStore(this, {
        schema,
				map,
				data,
				batch,
				api
      })
      return {
        store,
        modal: {
          schema: {
						name: 'schema',
						visible: false,
						data: {},
						state: {}
          }
        }
      }
		},

		watch: {
			batch(val) {
				this.store.states.batch = val
			},
			data: {
				deep: true,
				handler: function (val) {
					if (val) {
						this.store.states.data = val
					} else {
						this.store.states.data = {}
					}
				}
			}
		},

    render(h) {
			const { store, schema } = this
			const cards = parseSchema(schema)
			const cardsVNode = cards.map(item => {
				return h(
					SchemaWrap,
					{
						key: item.key,
						props: {
							store,
							propsData: { ...item.props }
						},
						nativeOn: {
							click: item.props.wrapType === 'module'
									?	function () {
											store.openModal(item.props)
										}
									: EMPTY_FUNCTION
						}
					}
				)
			})
			// 渲染组件
      return h(
        'div',
        {
					class: 'l-schema'
        },
        [
					// Card wraps
					...cardsVNode,
          // Modal
          setModal.call(this, h)
        ]
      )
    }
  }
</script>
