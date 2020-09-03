<template>
  <el-dialog ref="column-dialog" width="400px"
             title="表格设置" :visible.sync="dialogVisible"
             :before-close="handleClose">
    <div class="cols-table">
      <el-table ref="table" :data="tableColumns" height="auto"
                @row-click="handleRowClick">
        <el-table-column type="selection" width="44" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="label" label="列名称"></el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="save">确 定</el-button>
      <el-button size="small" @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { loadTableColumns, saveTableColumns } from '@/helpers/TableHelper'
import { mapState } from 'vuex'

export default {
  name: 'tableColumnsSet',
  props: {
    shared: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      dialogVisible: false,
      tableColumns: [],
      storageName: '',
    }
  },

  computed: mapState('common', ['columnsConfig']),

  methods: {
    open (config) {
      this.dialogVisible = true
      if (this.shared) {
        this.tableColumns = this.columnsConfig.columns
        this.storageName = this.columnsConfig.name
      } else {
        this.tableColumns = config?.columns
        this.storageName = config?.name
      }
      const selectedColumns = loadTableColumns(this.storageName, this.tableColumns)
      this.$nextTick(() => {
        selectedColumns.forEach((col) => this.$refs.table.toggleRowSelection(col, true))
      })
    },
    save () {
      const selectedColumns = saveTableColumns(this.storageName, this.tableColumns, this.$refs.table.selection)
      if (this.shared && typeof this.columnsConfig.callback === 'function') {
        this.columnsConfig.callback(selectedColumns)
      } else {
        this.$emit('selectedColumns', selectedColumns)
      }
      this.close()
    },
    close () {
      this.dialogVisible = false
    },
    handleRowClick (row) {
      this.$refs.table.toggleRowSelection(row)
    },
    handleClose (done) {
      this.$confirm('确认关闭？').then(() => {
        done()
      }).catch(() => ({}))
    },
  },

  watch: {
    columnsConfig () {
      if (this.shared) {
        if (this.columnsConfig.name) {
          this.open()
        } else {
          this.close()
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.cols-table {
  display: flex;
  height: 400px;
  overflow-y: auto;
}
</style>
