
<script>
  import Button from '../button'
  // TODO 抽出 header body
  function setChildVNode(h, { store, wrapType, type = '', icon = '', title = '', desc = '', params = [], children = [] } = {}) {
    let header = (
      <div slot="header" className="schema-wrap-hearder">
        { title }
      </div>
    )

    let body = (<div className="schema-wrap-body">
      <i>{ icon }</i>
      <p>{ desc || '暂无描述' }</p>
    </div>)

    let footer
    let footerChildrenNode

    if (wrapType === 'class') {
      // 遍历出多个button
      footerChildrenNode = children.map(item => {
        const config = {
          wrapType,
          type: item.type,
          title: item.title,
          desc: item.desc,
          params: item.params
        }
        return h(
          Button,
          {
            props: {
              store,
              config
            }
          }
        )
      })
    } else {
      // 无需外部包裹
      footerChildrenNode = [h(
        Button,
        {
          props: {
            store,
            config: {
              wrapType,
              type,
              title,
              desc,
              params
            }
          }
        }
      )]
    }
    footer = h(
      'div',
      {
        class: {
          'schema-wrap-footer': true
        }
      },
      [ ...footerChildrenNode ]
    )
    return [ header, body, footer ]
  }

  export default {
    name: 'schema-wrap',

    props: {
      store: Object,
      icon: String,
      title: { // form 表单 table 表格
        type: String,
        required: true
      },
      desc: String,
      type: String,
      params: Array,
      children: Array,
      wrapType: String // class 类 module 单个模块
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
