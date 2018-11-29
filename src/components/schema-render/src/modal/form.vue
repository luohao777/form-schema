<template>
</template>
<script>
	// import SchemaFormItem from './formItem'
	import formLabelWidth from '@/mixins/formLabel'

  export default {
    name: 'schema-form',

		// components: { SchemaFormItem },

		mixins: [ formLabelWidth ],

    props: {
			schema: Array,

      contentType: String,

      store: Object
    },

    data() {
      return {
        search: {},
        loading: false
      }
    },

    mounted() {
      this.setRules(this.schema)
    },

    methods: {
      setRules(s) {
        for (const i of s) {
          this.search[i.key] = ''
        }
      },
      clearForm() {
        this.search = {}
        this.$refs['form'].resetFields()
      },
      handerInput(val, key) {
        this.search[key] = val
        this.$emit('change', this.search)
      }
    },

		watch: {
      schema(val) {
        if (val) {
          this.setRules(val)
        }
      }
		}
  }
</script>
