<template>
  <elForm
    :model="search"
  >
    <SchemaFormItem
      v-for="(i, index) in schema"
      :key="index"
      :label="i.value"
      :props="i.key"
      v-model="search[i.key]"
    />

    <!-- Footer -->
    <div
			class="dialog-footer"
			slot="footer"
		>
			<elRow type="flex" justify="center">
]					<elButton
						type="primary"
						:loading="loading"
						@click="save"
					>
          保存
						<!-- {{ $t('app.word.save') }} -->
					</elButton>
			</elRow>
		</div>

  </elForm>
</template>
<script>
  import SchemaFormItem from './formItem'

  export default {
    name: 'schema-form',

    components: { SchemaFormItem },

    props: {
      schema: Array
    },

    data() {
      return {
        search: {},
        loading: false
      }
    },

    methods: {
      save() {
        console.log(this.search)
      }
    }
  }
</script>
