<template>
  <elDialog
    class="l_dialog"
    :visible.sync="visible"
    :title="propsData.title"
    @close="close()"
    append-to-body
    width="800px"
  >

    <elForm
      :model="search"
      :class="contentType !== 'query' ? 'l_dialog_form' : 'searchBar'"
      label-position="right"
      :label-width="formLabelWidth"
      @submit.native.prevent
      ref="form"
    >

      <elFormItem
        v-for="(i, index) in propsData.params"
        :key="index"
        :label="i.value"
        :prop="i.key"
      >
        <elSelect
          v-if="i.type === 'select'"
          v-model="search[i.key]">
          <elOption
            v-for="option in i.options"
            :key="option.key"
            :label="option.key"
            :value="option.value"
          />
        </elSelect>

        <elInput
          v-else-if="i.type === 'textarea'"
          type="textarea"
          v-model="search[i.key]">
        </elInput>

				<querySelect
					v-else-if="i.type === 'querySelect'"
          v-model="search[i.key]"
					custom-name="payType"
					:url="i.api"
					allOption
					auto
				/>

        <elInput
          v-else
          v-model="search[i.key]"
        >
        </elInput>

				<div
					class="l_item_desc"
					v-if="i.desc"
				>
					{{i.desc}}
				</div>

      </elFormItem>
    </elForm>

    <!-- Content -->
    <div
      class="resWrap"
      v-if="contentType === 'query'"
    >
      <elInput
        v-model="res"
        type="textarea"
        :autosize="{ minRows: 2 }"
        :disabled="disabled"
				:placeholder="$t('app.sentence.querySelect')"
      >
      </elInput>
    </div>

    <!-- Footer -->
    <div
			class="dialog-footer"
			slot="footer"
		>
			<elRow type="flex" justify="center">
        <!-- Save -->
				<elButton
					v-if="contentType === 'form'"
					type="primary"
					:loading="loading"
					@click="save"
				>
					{{ $t('app.word.save') }}
				</elButton>

        <!-- Query -->
        <elButton
          v-else
          type="primary"
          :loading="loading"
          @click="onSearch"
        >
          {{ $t('app.word.view') }}
        </elButton>

				<elButton
					@click="close()"
				>
					{{ $t('app.word.cancel') }}
				</elButton>
			</elRow>
		</div>

  </elDialog>
</template>

<script>
  import { apiPost } from '@/services'
  import { handleErr } from '@/utils'
  import { modalMixin } from '@/mixins/modal'
	import querySelect from '@/components/querySelect'

  export default {
    name: 'schema-modal',

    components: { querySelect },

		mixins: [modalMixin],

		props: {
			store: Object
    },

    data() {
      return {
				loading: false,
        search: {},
        res: '',
        disabled: true
      }
    },

    computed: {
      contentType() {
        const { type } = this.propsData
        const formKeyWords = ['new', 'edit', 'form']
        const queryKeyWords = ['query']
        if (formKeyWords.indexOf(type) > -1) {
          return 'form'
        } else if (queryKeyWords.indexOf(type) > -1) {
          return 'query'
        } else {
          if (this.visible) {
            const { title } = this.propsData
            throw new Error(`module [${title}] field 'type' is illegal`)
          }
        }
      }
    },

    methods: {
			clearExtra() {
				this.disabled = true
				this.res = ''
			},

      save() {
				this.loading = true
				// Schema 表单产生的数据
				const { search } = this
				// 全局data: From 来自组件传输, 非Schema 交互产生的数据;
				const { data, api } = this.store.states
				// Module Data: 每个模块里独有的数据
				const { data: moduleData } = this.propsData
				const postData = {
					...data,
					...moduleData,
					params: { ...search }
				}
        apiPost(api, postData).then(res => {
          if (res.statusCode === 200) {
						this.$message(res.message)
						this.search = {}
						this.close()
          } else {
            handleErr(res.message)
          }
        }).then(this.loading = false)
			},

			onSearch() {
				const { search } = this
        // 全局data: 来自组件传输, 非Schema 交互产生的数据;
				const { data, api } = this.store.states
				// Module Data: 每个模块里独有的数据
				const { data: moduleData } = this.propsData
				const postData = {
					...data,
					...moduleData,
					params: { ...search }
				}
        apiPost(api, postData).then(res => {
          if (res.statusCode === 200) {
            this.$message(res.message)
						this.disabled = false
						this.res = res.content
          } else {
            handleErr(res.message)
          }
        }).then(this.loading = false)
      }
    },

    watch: {
			propsVisible(val) {
				if (val) {
					this.visible = val
				}
      }
		}
  }
</script>

<style lang="less" scoped>
.resWrap {
  margin: 10px 30px;
}
.l_item_desc {
  height: 30px;
  line-height: 30px;
	font-size: 14px;
  color: #909399;
}

</style>
