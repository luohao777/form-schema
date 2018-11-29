<script>

function setOptions(h, { options, value, self, input }) {
  if (!options && !(options instanceof Array)) {
    return []
  }
  const _options = []
  for (const item of options) {
    _options.push(forced.option.renderBody(h, { value, store, self, input }))
  }
  return _options
}

const forced = {
  input: {
    renderBody(h, { value, self, input }) {
        return h(
          'elInput',
          {
            props: {
              value
            },
            nativeOn: {
              input(event) {
                self.curValue = event.target.value
                self.$emit('input', event.target.value, input.key)
              }
            }
          }
        )
    }
  },
  select: {
    renderBody(h, { store, self, value, input }) {
      const { options } = input
      return h(
        store.getNodeName('select'),
        {
          props: {
            value
          },
          nativeOn: {
            input: function (event) {
              self.curValue = event.target.value
              self.$emit('input', event.target.value, input.key)
            },
            select: function (event) {
              self.curValue = event.target.value
              self.$emit('input', event.target.value, input.key)
            },
            change: function (event) {
              self.curValue = event.target.value
              self.$emit('input', event.target.value, input.key)
            }
          }
        },
        setOptions(h, { store, value, self, options, input })
      )
    }
  },
  option: {
    renderBody(h, { store, self, option, input }) {
      return h(
        store.getNodeName('option'),
        {
          props: {
            label: option.key,
            value: option.value
          },
          nativeOn: {
            click: function (event) {
              self.curValue = event.target.value
              self.$emit('input', event.target.value, input.key)
            }
          }
        }
      )
    }
  },
  textarea: {
    renderBody(h, { store, self, input }) {
      return h(
        store.getNodeName('textarea'),
        {
          nativeOn: {
            input: function (event) {
              self.$emit('input', event.target.value, input.key)
            }
          }
        }
      )
    }
  }
}

export default {
  name: 'schema-modal-form-item',

  props: {
    value: {
      default() {
        return ''
      }
    },
    label: String,
    body: Object,
    type: String,
    store: Object,
    prop: String
  },

  data() {
    return {
      curValue: ''
    }
  },

  methods: {
    clear() {
      this.curValue = ''
    }
  },

  watch: {
    value(val) {
      this.curValue = val
    }
  },

  render(h) {
    const self = this
    const { prop, label, type, store, curValue, body } = this
    const inputType = type || 'input'
    const childrenRender = forced[inputType].renderBody || forced.input.renderBody
    const childrenVNode = (1, childrenRender)(h, { self, store, value: curValue, input: body })
    return h(
      'elFormItem',
      {
        props: {
          prop,
          label
        }
      },
      [
         childrenVNode
      ]
    )
  }
}
</script>
