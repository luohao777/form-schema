<script>

  export default {
    name: 'schema-modal',

    props: {
      type: String
    },

    render(h) {
      // TODO 根据传入的type, 显示表单或表格
      return (
        <elDialog
          class="elDialog"
          visable={ true }
        >
        </elDialog>
      )
    }
  }

</script>
