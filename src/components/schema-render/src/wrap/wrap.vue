<script>
	import Button from '../button'

	const iconMap = {
		wechat: 'icon-weixin',
		qq: 'icon-QQ',
		alipay: 'icon-zhifubao',
		jd: 'icon-weibiaoti-'
	}

  // TODO 抽出 header body
  function setChildVNode(h, { store, wrapType, type = '', icon = '', title = '', desc = '', data = {}, params = [], children = [] } = {}) {
		const { batch: isBatch } = store.states	// 是否为多选模式
    const header = (
			<div slot="header" class="schema-wrap-hearder">
				<i class={ ['iconfont', iconMap[icon]] }></i>
				<span>
					{ title }
				</span>
      </div>
    )

    const body = (<div class="schema-wrap-body">
			<p v-show={desc}>{ desc }</p>
			<p v-show={!desc} class="noDesc">{ '暂无描述' }</p>
    </div>)

    let footer
    let footerChildrenNode = []

    if (wrapType === 'class') {
      // 遍历出多个button
      footerChildrenNode = children.map(item => {
        const config = {
          wrapType,
          type: item.type,
          title: item.title,
          desc: item.desc,
					params: item.params,
					data: item.data
        }
        return h(
          Button,
          {
            props: {
              store,
							config
						},
						style: {
							'display': isBatch && !item.batch ? 'none' : 'inline-block'
						},
						class: 'schema-wrap-footer-button'
          }
        )
      })
		}
    footer = h(
      'div',
      {
        class: {
					'schema-wrap-footer': true,
					'schema-wrap-footer-class': footerChildrenNode.length > 0
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
			propsData: Object
    },

		// 单个Wrap, 其中存在 Header, body, Footer 三个子节点
    render(h) {
			const { store, propsData } = this
			const { wrapType, batch, children } = propsData
			const warpName = store.getNodeName('wrap')

			const { batch: isBatch } = store.states	// 是否为多选模式
			let show = true
			if (isBatch) {
				if (wrapType === 'module') {
					show = !!batch
				} else if (wrapType === 'class') {
					const arr = children.map(i => i.batch)
					show = !arr.every(i => !i) // 全部不支持多选时, 不做渲染
				}
			}

      return h(
        warpName,
        {
          'class': {
						'schema-wrap': true,
						[`schema-${wrapType}`]: true
					},
					style: {
						display: show ? '' : 'none'
					},
					props: {
						shadow: 'hover'
					}
        },
        [
          ...setChildVNode.call(this, h, { store, ...propsData })
        ]
      )
    }
  }
</script>

<style lang="less">

  .schema-wrap {
		width: 460px;
		margin: 15px;
		display: inline-block;
		vertical-align: top;
		/* 初始化样式 */
		.el-card__header {
			padding: 10px 15px;
		}
		.el-card__body {
			padding: 10px 15px 5px;
		}

		.schema-wrap-hearder {
			font-size: 16px;
			font-weight: 400;
			i {
				font-size: 22px;
				padding-right: 5px;
        font-weight: normal;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
			.icon-QQ {
				color: #2D8DFB;
			}
			.icon-weixin {
				color: #02CD11;
			}
			.icon-zhifubao {
				color: #03A6FF
			}
			.icon-weibiaoti- {
				color: #C81523;
			}
		}
		.schema-wrap-body {
			.noDesc {
				text-align: center;
				color: #777777;
			}
		}
    .schema-wrap-footer {
			width: 100%;
			display: flex;
			text-align: center;
			justify-content: space-around;
			align-items: center;
		}
		.schema-wrap-footer-class {
			border-top: 1px solid #E9EEEE;
		}

		.schema-wrap-footer-button {
			flex: 1;
			border-right: 1px solid #E9EEEE;
			margin: 5px 0 0;
		}

		.schema-wrap-footer-button:last-child {
			border-right: none;
		}
  }
</style>
