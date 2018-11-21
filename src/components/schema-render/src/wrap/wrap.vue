<script>
  // TODO 抽出 header body
  function setChildVNode(h, { store, wrapType, type = '', icon = '', title = '', desc = '', params = [], children = [] } = {}) {
    const button = store.getNodeName('button')
    let header = (
      <div slot="header" className="schema-wrap-hearder">
        { title }
      </div>
    )

    let body = (<div className="schema-wrap-body">
      <i>{ icon }</i>
      <p>{ desc }</p>
    </div>)

    let footer
    // TODO 将openModal写入store中，在点击按钮时，带上各自的parmas && opcode 等信息
    if (wrapType === 'class') {
      const childrenNode = children.map(item => {
        return h(
          button,
          {
            domProps: {
              innerHTML: item.title
            }
          }
        )
      })
      footer = h(
        'div',
        {
          class: {
            'schema-wrap-footer': true
          }
        },
        [ ...childrenNode ]
      )
    } else {
      footer = h(
        button,
        {
          class: {
            'schema-wrap-footer': true
          },
          domProps: {
            innerHTML: title
          }
        }
      )
    }
    return [ header, body, footer ]
  }

  export default {
    name: 'schema-wrap',

    props: {
      store: Object,
      icon: String,
      title: {
        type: String,
        required: true
      },
      desc: String,
      type: String,
      params: Array,
      children: Array,
      wrapType: String
    },

    render(h) {
      const { wrapType, type, icon, title, desc, children, params } = this
      const { store } = this
      const warpName = store.getNodeName('wrap')
      return h(
        warpName,
        {
          'class': {
            'schema-wrap': true
          }
        },
        [
          ...setChildVNode.call(this, h, { store, wrapType, type, icon, title, desc, children, params })
        ]
      )
    }
  }

</script>

<style lang="less" scoped>

  .schema-wrap {
    max-width: 430px;
    margin: 20px;
    .schema-wrap-footer {
      width: 100%;
      text-align: center;
    }
  }
</style>
