/* eslint-disable */
export const multiColumnMixin= {

	data() {
		return {
			isAllPageSelected: false
		}
	},

	methods: {
		renderHeader(h, { store }) {
			return (
				<span>
					<elCheckbox
						disabled={ store.states.data && store.states.data.length === 0 }
						indeterminate={ store.states.selection.length > 0 && !store.states.isAllSelected }
						nativeOn-click={ store.table.toggleAllSelection }
						value={ store.states.isAllSelected } />
					<elDropdown
						class="l-col-drop"
						trigger="hover"
						placement="bottom-start"
						onClick={ store.table.toggleAllSelection }
						size="mini"
					>
						<span class="el-dropdown-link">
							<i class="el-icon-caret-bottom"></i>
						</span>
						<elDropdownMenu slot="dropdown">
							<elDropdownItem nativeOn-click={ this.handlerSelectCurrentPageData.bind(this, store) }>
								{ this.$t('app.sentence.currentPage') }
							</elDropdownItem>
							<elDropdownItem nativeOn-click={ this.handlerSelectAllPageData.bind(this, store) }>
								{ `${this.$t('app.sentence.allData')}(${this.totalRecord})` }
							</elDropdownItem>
						</elDropdownMenu>
					</elDropdown>
				</span>
			)
		},

		// 选择当页数据
		handlerSelectCurrentPageData(store) {
			if (this.isAllPageSelected) {
				this.isAllPageSelected = false
			} else {
				store.table.toggleAllSelection()
			}
		},

		// 选择全部数据
		handlerSelectAllPageData(store) {
			if (!store.states.isAllSelected) {
				store.table.toggleAllSelection()
			}
			this.isAllPageSelected = true
		},

		// 处理每行中 checkbox
		handleCheckboxInput(scope) {
			if (this.isAllPageSelected) {
				scope.store.table.clearSelection()
				this.isAllPageSelected = false
			} else {
				scope.store.commit('rowSelectedChanged', scope.row)
			}
		}

	}
}
