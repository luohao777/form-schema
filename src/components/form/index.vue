<template>
  <div>
    <schema
      :schema="config"
      :map="map"
    >
    </schema>
  </div>
</template>

<script>
  import schema from '@/components/schema-render'
  import config from '@/conf/data.json'
  import map from '@/conf/map'

  export default {
    name: 'schema-form',

    components: { schema },

    data() {
      return {
        config,
        map
      }
    }
  }
</script>
