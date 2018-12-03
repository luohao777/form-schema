<template>
  <elButton
    @click="handlerClick"
		type="text"
    :placeholder="config.desc"
  >
    {{ config.title }}
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
