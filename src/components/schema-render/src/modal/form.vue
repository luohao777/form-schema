<template>
  <elForm
    :model="search"
		:class="contentType !== 'table' ? 'l_dialog_form' : 'searchBar'"
		label-position="right"
		:label-width="formLabelWidth"
		@submit.native.prevent
  >
    <SchemaFormItem
      v-for="(i, index) in schema"
      :key="index"
      :label="i.value"
      :props="i.key"
      v-model="search[i.key]"
    />

  </elForm>
</template>
<script>
	import SchemaFormItem from './formItem'
	import formLabelWidth from '@/mixins/formLabel'

  export default {
    name: 'schema-form',

		components: { SchemaFormItem },

		mixins: [ formLabelWidth ],

    props: {
			schema: Array,

      data: Object,

      contentType: String
    },

    data() {
      return {
        search: {},
        loading: false
      }
		},

		watch: {
			search: {
				deep: true,
				handler(val) {
					if (val) {
						this.$emit('change', val)
					}
				}
			}
		}
  }
</script>
