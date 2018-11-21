<script>
  import modal from '../modal'

  function setChildVNode(h, store, wrapType, { type = '', icon = '', title = '', desc = '', params = [], children = [] } = {}) {
    let footer
    console.log(wrapType, children, title)
    let header = (
      <div slot="header" className="schema-wrap-hearder">
        { title }
      </div>
    )

    let body = (<div className="schema-wrap-body">
      <i>{ icon }</i>
      <p>{ desc }</p>
    </div>)

    if (wrapType === 'class') {
      const button = store.getNodeName('button')
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
        {},
        [ ...childrenNode ]
      )
    } else {
      footer = (
        <div className="schema-wrap-footer">

        </div>
      )
    }
    return [ header, body, footer ]
  }

  export default {
    name: 'schema-wrap',

    compontens: { modal },

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
          className: {
            'class': {
              'schema-wrap': true
            }
          }
        },
        [
          ...setChildVNode.call(this, h, store, wrapType, { type, icon, title, desc, children, params })
        ]
      )
    }
  }

</script>

<style lang="less" scoped>
  .schema-wrap {
    max-width: 430px;
    margin: 10px;
  }
</style>

