<template>
  <div class="data-table">
    <div class="toolbar" v-if="buttons.length">
      <template v-for="btn in featureButtons">
        <el-input v-if="btn.type === 'search'" :key="btn.id" size="small"
                  class="search-input" :placeholder="btn.placeholder || searchPlaceholder"
                  v-model="searchInput" @keyup.native.enter="reloadTable">
          <el-button slot="append" icon="el-icon-search" size="small" @click="reloadTable"></el-button>
        </el-input>
        <el-button v-else :key="btn.id" class="feature-button" type="primary" size="small"
                   :icon="btn.icon" @click="handleButtonClick(btn)" :disabled="btn.disabled">
          {{ btn.name }}
        </el-button>
      </template>
    </div>
    <div class="main-table">
      <el-table :data="tableData" height="auto" v-loading="loading"
                highlight-current-row
                @current-change="handleCurrentChange"
                @row-click="handleRowClick"
                @row-dblclick="handleRowDblClick"
                @selection-change="handleSelectionChange">
        <el-table-column type="index" width="50" :index="startIndex"></el-table-column>
        <el-table-column v-if="multiSelect" type="selection" width="50"></el-table-column>
        <template v-for="prop in tableColumns">
          <el-table-column v-if="prop.type === 'buttons'" :key="prop.name" :fixed="prop.fixed"
                           :prop="prop.name" :label="prop.label" :width="prop.width">
            <template slot-scope="scope">
              <el-button v-for="btn in prop.buttons" :key="btn.id" type="text" size="small"
                         @click="handleButtonClick({ ...btn, row: scope.row })">
                {{ btn.label || btn.name }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column v-else :key="prop.name" :prop="prop.name" :label="prop.label"
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

  export default {
    name: 'DataTable',

    props: {
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
      multiSelect: {
        type: Boolean,
        default: false,
      },
      pagination: {
        type: Boolean,
        default: true,
      },
      dblClickAction: {
        type: String,
        default: 'btnEdit',
      },
    },

    data () {
      return {
        searchInput: null,
        tableData: [],
        total: 0,
        currentPage: 1,
        currentRow: {},
        pageSize: 10,
        loading: false,
      }
    },

    computed: {
      featureKeys () {
        if (Array.isArray(this.features)) {
          return this.features.map(feat => feat.dom)
        } else if (this.features) {
          return this.buttons.map(btn => btn.id)
        } else {
          return []
        }
      },
      featureButtons () {
        return this.buttons.filter(btn => {
          return !btn.hidden && (btn.authorize === false || this.featureKeys.includes(btn.id))
        })
      },
      tableColumns () {
        return this.columns
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
          actionCallback(btn.row || this.currentRow)
        }
      },
      handleCurrentChange (row) {
        this.currentRow = row
        this.$emit('select', row)
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
        this.checkedRows = rows
      },
      handleRowDblClick () {
        if (this.featureKeys.includes(this.dblClickAction)) {
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
      reload () {
        this.reloadTable()
      },
      reloadTable () {
        if (typeof this.loader === 'function') {
          this.loading = true
          this.loader({
            ...(this.searchInput && { filter: this.searchInput }),
            page: this.currentPage,
            rows: this.pageSize,
          }).then((data) => {
            this.loading = false
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
</style>
