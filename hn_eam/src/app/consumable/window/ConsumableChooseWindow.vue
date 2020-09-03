<template>
  <div>
    <eui-window ref="window" :options="windowOptions">
      <eui-table
          class="table"
          ref="table"
          :showIndex="false"
          :showSelection="true"
          :highlight-current-row="false"
          :options="tableOptions"
          @reloadTable="tableOptions.reload"
          @handleSelectionChange="tableOptions.handleSelectionChange">
      </eui-table>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
  </div>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import api from '@/api'
  export default {
    name: 'consumable-choose-window',
    components: {
      EuiWindow,
      EuiTable
    },
    props: {
    },
    data() {
      return {
        query: {
          agencyId: this.$store.state.agencyId,
          page: 1,
          pageSize: 10,
          warehouseId: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'consumableCode', label: '物料编码'},
            {prop: 'consumableName', label: '物料名称'},
            {prop: 'consumableTypeName', label: '物料分类'},
            {prop: 'brand', label: '品牌'},
            {prop: 'model', label: '规格型号'},
            {prop: 'unit', label: '单位'},
            {prop: 'barCode', label: '物料条码'}
          ],
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          },
          handleSelectionChange: val => {
            // this.tableRowsSelect = val.map(v => v.id)
            this.tableRowsSelect = val
          }
        },
        windowOptions: {
          title: '选择物料',
          width: '1000px'
        },
        tableRowsSelect: []
      }
    },
    methods: {
      getList(query) {
        api.consumable.getList(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getData(query) {
        api.consumable.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      open(warehouseId) {
        if (warehouseId) {
          this.query.warehouseId = warehouseId
          this.getList(this.query)
        } else {
          this.getData(this.query)
        }
        this.$refs.window.open()
      },
      cancel() {
        this.$refs.window.cancel()
      },
      sure() {
        this.$emit('selectRows', this.tableRowsSelect)
        this.cancel()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .table
    height: 600px
    /deep/ .el-table
      .cell
        line-height: 30px !important
</style>