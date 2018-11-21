<script>
export default {
  name: 'schema-modal-form-item',

  props: {
    prop: {
    },
    value: {
      require: true
    },
    label: String
  },

  render() {
    const { prop, label } = this
    return h(
      'elFormItem',
      {
        props: {
          prop,
          label
        }
      },
      [
        // TODO 各种类型的 input
      ]
    )

  }
}
</script>

