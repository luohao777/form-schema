<script>
// <elFormItem
// 	v-for="(item, index) in accountSchema"
// 	v-if="!item.type || item.type=='input'"
// 	:key="`accountSchema_${index}`"
// 	:label="item.value"
// 	:prop="`${item.key}`"
// >
// 	<elInput
// 		:type="item.type"
// 		v-model.trim="data.accountInfo[item.key]"
// 		:disabled="detail"
// 	/>
// </elFormItem>
// const forced = {
//   input: function (h) {
//     return h(
//       'elInput',
//       {
//         on: {
//           input: function (event) {
//             this.$emit('input', event.target.value)
//           }
//         }
//       }
//     )
//   }
// }

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

  render(h) {
    const { prop, label } = this
    const _this = this
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
        h(
          'elInput',
          {
            nativeOn: {
              input: function (event) {
                _this.$emit('input', event.target.value)
              }
            }
          }
        )
      ]
    )
  }
}
</script>
