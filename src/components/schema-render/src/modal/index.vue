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
  </elDialog>
</template>

<script>
  import { modalMixin } from '@/mixins/modal'
  import SchemaForm from './form'

  export default {
    name: 'schema-modal',

    components: { SchemaForm },

    mixins: [modalMixin],

    data() {
      return {
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

    watch: {
			propsVisible(val) {
				if (val) {
					this.visible = val
				}
			}
		}
  }

</script>
