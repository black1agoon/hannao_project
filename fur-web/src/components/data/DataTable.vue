<template>
  <div class="data-table">
    <div class="toolbar" v-if="showToolbar">
      <slot name="barBefore" :vm="this"></slot>
      <template v-for="btn in featureButtons">
        <el-input v-if="btn.type === 'search'" :key="btn.id" size="small" :clearable="true"
                  class="search-input" :placeholder="btn.placeholder || searchPlaceholder"
                  v-model="searchInput" @keyup.native.enter="reloadTable">
          <template v-slot:append>
            <el-button size="small" icon="el-icon-search" @click="reloadTable"></el-button>
          </template>
        </el-input>
        <el-button v-else :key="btn.id" class="feature-button" :type="btn.type" size="small" :title="btn.title"
                   :icon="btn.icon" @click="handleButtonClick(btn)" :disabled="btn.disabled">
          <template v-if="btn.label"> {{ btn.label }}</template>
        </el-button>
      </template>
      <slot name="bar" :vm="this"></slot>
    </div>
    <div class="main-table">
      <el-table ref="table" :data="tableData" height="auto" v-loading="loading"
                :row-key="rowKey"
                highlight-current-row
                @current-change="handleCurrentChange"
                @row-click="handleRowClick"
                @row-dblclick="handleRowDblClick"
                @selection-change="handleSelectionChange">
        <el-table-column type="index" width="50" :index="startIndex"></el-table-column>
        <el-table-column v-if="multiSelect" type="selection" width="50"></el-table-column>
        <el-table-column v-if="$slots.expand" type="expand">
          <template v-slot="scope">
            <slot name="expand" :row="scope.row" :$index="scope.$index"></slot>
          </template>
        </el-table-column>
        <template v-for="prop in tableColumns">
          <el-table-column v-if="prop.type === 'image'" :key="prop.name" :label="prop.label">
            <template v-slot="scope">
              <el-image v-if="Array.isArray(scope.row[prop.name])"
                        :src="scope.row[prop.name][0]" :preview-src-list="scope.row[prop.name]">
                <div slot="error" class="image-slot"></div>
              </el-image>
              <el-image v-else :src="scope.row[prop.name]" :preview-src-list="[scope.row[prop.name]]">
                <div slot="error" class="image-slot"></div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column v-else-if="prop.type === 'buttons'" :key="prop.name" :fixed="prop.fixed"
                           :prop="prop.name" :label="prop.label" :width="prop.width">
            <template v-slot="scope">
              <el-button v-for="btn in prop.buttons" :key="btn.id" type="text" size="small"
                         @click="handleButtonClick({ ...btn, row: scope.row })">
                {{ btn.label || btn.name }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column v-else :key="prop.name" :prop="prop.textField || prop.name" :label="prop.label"
                           :fixed="prop.fixed" :width="prop.width">
          </el-table-column>
        </template>
      </el-table>
      <el-pagination v-if="pagination" layout="prev, pager, next, sizes, jumper"
                     background :page-sizes="[10, 20, 50, 100]"
                     :page-size="pageSize" :total="total"
                     :current-page="currentPage"
                     @size-change="handlePageSizeChange"
                     @current-change="handleCurrentPageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { translates } from '@/lang/i18n'
import { Messenger } from '@/helpers/Messenger'
import { toggleRowStatus } from 'element-ui/packages/table/src/util'
import { loadTableColumns } from '@/helpers/TableHelper'

export default {
  name: 'DataTable',

  props: {
    name: {
      type: String,
    },
    features: {
      type: [Array, Boolean],
      default: () => [],
    },
    buttons: {
      type: Array,
      default: () => [],
    },
    actions: {
      type: Object,
      default: () => ({}),
    },
    columns: {
      type: Array,
      required: true,
    },
    loader: {
      type: Function,
    },
    data: {
      type: Array,
    },
    reloadTrigger: {},
    searchKey: {
      default: 'query',
    },
    rowKey: {
      type: String,
    },
    multiSelect: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    dblClickAction: {
      type: [String, Function],
      default: 'btnEdit',
    },
    setting: {
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
      searchInput: null,
      searchModel: null,
      tableData: [],
      total: 0,
      currentPage: 1,
      currentRow: {},
      checkedRows: [],
      pageSize: 10,
      loading: false,
      customColumns: 1,
    }
  },

  computed: {
    featureKeys () {
      if (Array.isArray(this.features)) {
        return this.features.map((feat) => feat.dom)
      } else if (this.features) {
        return this.buttons.map((btn) => btn.id)
      } else {
        return []
      }
    },
    settingButtons () {
      return this.name && this.setting && [{ id: 'btnTableSetting', icon: 'el-icon-setting', title: '表格设置' }] || []
    },
    featureButtons () {
      return this.buttons.filter(btn => {
        return !btn.hidden && (btn.authorize === false || this.featureKeys.includes(btn.id))
      }).concat(this.settingButtons)
    },
    showToolbar () {
      return Boolean(this.featureButtons.length || this.$slots.bar || this.$slots.barBefore)
    },
    tableColumns () {
      return this.customColumns ? loadTableColumns(this.name, this.columns) : this.columns
    },
    searchPlaceholder () {
      return this.tableColumns.filter(p => p.searchable).map(({ label }) => label).join('/')
    },
    shouldBeFormatted () {
      return this.tableColumns.filter(col => typeof col.formatter === 'function')
    },
    startIndex () {
      return (this.currentPage - 1) * this.pageSize + 1
    },
    searchParams () {
      return {
        ...(this.searchInput && { [this.searchKey]: this.searchInput }),
        ...this.searchModel,
      }
    },
  },

  watch: {
    data () {
      this.reloadTable()
    },
    reloadTrigger () {
      this.reloadTable()
    },
  },

  methods: {
    handleButtonClick (btn) {
      const actionCallback = this.actions[btn.id]
      if (typeof actionCallback === 'function') {
        if (btn.select === 1) {
          if (!this.currentRow || !Object.keys(this.currentRow).length) {
            return Messenger.warning(translates('common.selectOneRow'))
          }
          actionCallback(btn.row || this.currentRow, this.searchParams)
        } else if (btn.select > 1) {
          if (!this.checkedRows.length) {
            return Messenger.warning(translates('common.checkRows'))
          }
          actionCallback(this.checkedRows, this.searchParams)
        } else {
          actionCallback(btn.row || this.currentRow, this.searchParams)
        }
      } else if (btn.id === 'btnTableSetting' && this.name) {
        this.$store.commit('common/setColumnsConfig', {
          name: this.name,
          columns: this.columns,
          callback: () => {
            this.customColumns += +1
          },
        })
      }
    },
    handleCurrentChange (row) {
      this.currentRow = row
      this.$emit('select', row, this.multiSelect && this.checkedRows.concat(row))
    },
    handlePageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.reloadTable()
    },
    handleCurrentPageChange (page) {
      this.currentPage = page
      this.reloadTable()
    },
    handleSelectionChange (rows) {
      const tableStore = this.$refs.table.store
      rows.forEach(row => {
        if (row.children) {
          row.children.forEach(subRow => {
            toggleRowStatus(tableStore.states.selection, subRow, true)
          })
        }
      })
      this.checkedRows.forEach(row => {
        if (row.children && !rows.find(row1 => row1[this.rowKey] === row[this.rowKey])) {
          row.children.forEach(subRow => {
            toggleRowStatus(tableStore.states.selection, subRow, false)
          })
        }
      })
      this.checkedRows = rows
      this.$emit('selection-change', rows)
    },
    handleRowDblClick () {
      if (typeof this.dblClickAction === 'function') {
        this.dblClickAction()
      } else if (this.featureKeys.includes(this.dblClickAction)) {
        this.handleButtonClick({ id: this.dblClickAction })
      }
    },
    handleRowClick (row) {
      if (this.multiSelect) {
        this.toggleChecked(row)
      }
    },
    toggleChecked (row) {
      this.$refs.table.toggleRowSelection(row)
    },
    search (params) {
      this.searchModel = params
      this.currentPage = 1
      this.reloadTable()
    },
    loadFirstPage () {
      this.currentPage = 1
      this.reloadTable()
    },
    reload () {
      this.reloadTable()
    },
    reloadTable () {
      if (typeof this.loader === 'function') {
        this.loading = true
        this.loader({
          ...this.searchParams,
          page: this.currentPage,
          rows: this.pageSize,
        }).then((data) => {
          if (data?.rows) {
            this.tableData = data.rows
            this.total = data.total || data.rows.length
          } else if (Array.isArray(data)) {
            this.tableData = data
            this.total = data.length
          } else {
            this.tableData = []
            this.total = 0
          }
          if (!this.tableData.length && this.currentRow > 1) {
            this.loadFirstPage()
          }
        }).finally(() => {
          this.loading = false
        })
      } else if (Array.isArray(this.data)) {
        this.tableData = this.data
        this.total = this.data.length
      } else {
        this.tableData = []
        this.total = 0
      }
    },
    formatRow (row) {
      return {
        ...row,
        ...this.shouldBeFormatted.reduce((result, prop) => ({
          ...result,
          [prop.name]: prop.formatter(row[prop.name]),
        }), {}),
      }
    },
  },

  mounted () {
    this.reloadTable()
  },
}
</script>

<style scoped lang="scss">
.data-table {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar {
  width: min-content;
  padding: 10px;
  white-space: nowrap;

  .search-input {
    width: 250px;
  }

  .el-button.feature-button {
    margin-left: 10px;

    &:last-child {
      margin-right: 10px;
    }

    ::v-deep [class*=fa-] + span {
      margin-left: 5px;
    }
  }
}

.main-table {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  .el-pagination {
    padding: 10px;
  }
}

.el-table {
  ::v-deep .el-table__row .el-button--small {
    padding: 0 15px;
  }
}

.el-image {
  max-height: 50px;

  ::v-deep img {
    max-height: 80px;
    object-fit: contain;
  }
}
</style>
