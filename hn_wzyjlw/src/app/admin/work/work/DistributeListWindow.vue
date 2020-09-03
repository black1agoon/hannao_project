<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-table
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <template slot="prev">
        <el-table-column label="机台名称" prop="stationName" width="100">
        </el-table-column>
        <el-table-column label="机台编号" prop="stationCode" width="100">
        </el-table-column>
        <el-table-column label="工单状态" prop="stateName" width="100">
        </el-table-column>
        <el-table-column label="当前任务" width="90">
          <template slot-scope="scope">
            <i :class="['icon', {active: scope.row.currentWork === 1}]"></i>
          </template>
        </el-table-column>
      </template>
    </eui-table>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  export default {
    name: 'distribute-list-window',
    components: {
      EuiWindow,
      EuiTable
    },
    data() {
      return {
        query: {
          page: 1,
          pageSize: 10,
          workshopOrderDetailId: null
        },
        windowOptions: {
          title: '分配列表'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'articleNumber', label: '款号', width: 90},
            {prop: 'articleNumber1', label: '货号', width: 90},
            {prop: 'number', label: '任务数(双)', width: 90},
            {prop: 'completeNumber', label: '完成数(双)', width: 90},
            {prop: 'dayNumber', label: '24小时生产量(双)', width: 120},
            {prop: 'hourNumber', label: '每小时生产量(双)', width: 120},
            {prop: 'estimatedStartDate', label: '预计开始时间', width: 150},
            {prop: 'estimatedEndDate', label: '预计结束时间', minWidth: 150}
          ],
          rowClick: (row, event, column) => {
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        }
      }
    },
    methods: {
      getData(query) {
        api.workticket.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      open(workshopOrderDetailId) {
        this.query.workshopOrderDetailId = workshopOrderDetailId
        this.getData(this.query)
        this.$refs.window.open()
      }
    },
    mounted() {
      // this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog
    height: 70%
  /deep/ .el-dialog__body
    padding: 0 20px
    height: calc(100% - 40px)
    overflow-y: auto

  .icon
    display: inline-block
    width: 17px
    height: 17px
    border-radius: 50%
    background: #999
    &.active
      background: #13ce66
</style>
