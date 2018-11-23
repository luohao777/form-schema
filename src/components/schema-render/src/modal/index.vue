<template>
  <elDialog
    class="l_dialog"
    :visible.sync="visible"
    :title="propsData.title"
    @close="close()"
    append-to-body
    width="500px"
  >
    <SchemaForm
      v-if="contentType === 'form'"
      :schema="propsData.params"
    ></SchemaForm>

    <!-- Footer -->
    <div
			class="dialog-footer"
			slot="footer"
		>
			<elRow type="flex" justify="center">
]					<elButton
						type="primary"
						:loading="loading"
						@click="save"
					>
          保存
						<!-- {{ $t('app.word.save') }} -->
					</elButton>
			</elRow>
		</div>

  </elDialog>
</template>

<script>
  import { apiPost } from '@/services'
  import { handleErr } from '@/utils'
  import { modalMixin } from '@/mixins/modal'
  import SchemaForm from './form'

  export default {
    name: 'schema-modal',

    components: { SchemaForm },

    mixins: [modalMixin],

    data() {
      return {
        loading: false
      }
    },

    computed: {
      contentType() {
        const { type } = this.propsData
        const formKeyWords = ['new', 'edit', 'form']
        const tableKeyWords = ['table', 'query']
        if (formKeyWords.indexOf(type) > -1) {
          return 'form'
        } else if (tableKeyWords.indexOf(type) > -1) {
          return 'table'
        } else {
          if (this.visible) {
            const { title } = this.propsData
            throw new Error(`module [${title}] field 'type' is illegal`)
          }
        }
      }
    },

    methods: {
      save() {
        const url = '/'
        const { search } = this
        apiPost(url, search).then(res => {
          if (res.statusCode === 0) {
            this.$message(res.message)
          } else {
            handleErr(res.message)
          }
        })
      }
    },

    watch: {
			propsVisible(val) {
				if (val) {
					this.visible = val
				}
			}
		}
  }

</script>
