<template>
  <elButton
    @click="handlerClick"
    :placeholder="config.desc"
  >
    {{ config.wrapType === 'class' ? config.title : '操作' }}
  </elButton>
</template>

<script>
  export default {
    name: 'schema-class-button',

    props: {
      store: Object,
      config: Object
    },

    methods: {
      handlerClick() {
        const { config } = this
        this.store.openModal(config)
      }
    }
  }
</script>
