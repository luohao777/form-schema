<script>
  import SchemaWrap from './wrap/wrap'
  import SchemaStore from './schema-stroe'
  import SchemaModal from './modal'

  const moduleDefaultProperty = {
    type: '',
    disable: false,
    show: true,
    batch: false,
    icon: '',
    title: '',
    opcode: '',
    desc: '',
    params: null
  }

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

  export default {
    name: 'schema',

    components: { SchemaWrap, SchemaModal },

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
      }
    },

    data() {
      const store = new SchemaStore(this, {
        schema: this.schema,
        map: this.map
      })
      return {
        store
      }
    },

    render(h) {
      const { store } = this
      return h(
        'div',
        {
          'class': { 'l-schema': true }
        },
        parseSchema(h, this.schema).map(function (item) {
          return h(
            SchemaWrap,
            {
              key: item.key,
              props: {
                store,
                ...item.props
              }
            }
          )
        })
      )
    }
  }

</script>