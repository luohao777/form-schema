<template>
  <elTable
    :data="list"
    stripe
    border
    ref="table"
    @selection-change="onSelectionChange"
  >
    <elTableColumn
      v-for="(item, index) in tableProps"
      :key="`tableProps_${index}`"
      :prop="item.key"
      :label="item.label"
      header-align="center"
      :align="item.align || 'left'"
      :fixed="item.fixed || false"
    ></elTableColumn>
  </elTable>
</template>

<script>
	import {enhanceListMixin} from '@/mixins/list'

  export default {
    name: 'schema-form',

    mixins: [enhanceListMixin]
  }
</script>
