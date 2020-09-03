<template>
  <eui-window ref="window" :options="windowOptions">
    <el-tabs type="card" value="first">
      <el-tab-pane label="状态变化" name="first">
        <eui-table
            ref="table"
            :show-index="false"
            :highlight-current-row="false"
            :options="table1Options">
        </eui-table>
      </el-tab-pane>
      <el-tab-pane label="指令详情" name="second">
        <eui-table
            ref="table"
            :show-index="false"
            :highlight-current-row="false"
            :options="table2Options">
          <template slot="prev">
            <el-table-column label="目标站点" prop="destination" align="center" minWidth="100">
            </el-table-column>
            <el-table-column label="指令集" prop="destination" align="center" minWidth="150">
              <template slot-scope="scope">
                <el-tooltip popper-class="tooltip" :content="scope.row.command"
                            placement="bottom-start" effect="light">
                  <span>{{scope.row.command}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
          </template>
        </eui-table>
      </el-tab-pane>
      <el-tab-pane label="路径步骤" name="third">
        <eui-table
            ref="table"
            :show-index="false"
            :highlight-current-row="false"
            :options="table3Options">
        </eui-table>
      </el-tab-pane>
    </el-tabs>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  export default {
    name: 'transport-detail-window',
    components: {
      EuiWindow,
      EuiTable
    },
    data() {
      return {
        windowOptions: {
          title: '运输单明细详情',
          width: '1000px'
        },
        tab1Query: {
          id: null,
          page: 1,
          pageSize: 10
        },
        tab2Query: {
          orderId: null,
          page: 1,
          pageSize: 10
        },
        tab3Query: {
          orderId: null,
          page: 1,
          pageSize: 10
        },
        table1Options: {
          data: [],
          total: 0,
          columns: [
            {prop: 'stateName', label: '状态名称', minWidth: 100},
            {prop: 'createTime', label: '创建时间', minWidth: 150}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
          },
          reload: (name, val) => {
            this.tab1Query.page = name === 'page' ? val : this.tab1Query.page
            this.tab1Query.pageSize = name === 'pageSize' ? val : this.tab1Query.pageSize
            this.getTab1Data()
          }
        },
        table2Options: {
          data: [],
          total: 0,
          columns: [
            {prop: 'stateName', label: '状态名称', minWidth: 100},
            {prop: 'createTime', label: '创建时间', minWidth: 150}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
          },
          reload: (name, val) => {
            this.tab2Query.page = name === 'page' ? val : this.tab2Query.page
            this.tab2Query.pageSize = name === 'pageSize' ? val : this.tab2Query.pageSize
            this.getTab2Data()
          }
        },
        table3Options: {
          data: [],
          total: 0,
          columns: [
            {prop: 'pathName', label: '路径名称', minWidth: 100},
            {prop: 'routeIndex', label: '索引', minWidth: 100},
            {prop: 'length', label: '路径长度', minWidth: 100},
            {prop: 'pathProperties', label: '路径相关属性', minWidth: 100},
            {prop: 'orientation', label: '方向', minWidth: 100},
            {prop: 'startTime', label: '开始时间', minWidth: 100},
            {prop: 'finishTime', label: '完成时间', minWidth: 100},
            // {prop: 'createTime', label: '创建时间', minWidth: 150},
            // {prop: 'sourcePointName', label: '起始站点', minWidth: 100},
            // {prop: 'routingCost', label: '路径花费', minWidth: 100},
            // {prop: 'maxVelocity', label: '正向行驶最大速度', minWidth: 150},
            // {prop: 'maxReverseVelocity', label: '反向行驶最大速度', minWidth: 150},
            // {prop: 'destinationPointName', label: '目标站点', minWidth: 100},
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
          },
          reload: (name, val) => {
            this.tab3Query.page = name === 'page' ? val : this.tab3Query.page
            this.tab3Query.pageSize = name === 'pageSize' ? val : this.tab3Query.pageSize
            this.getTab3Data()
          }
        }
      }
    },
    methods: {
      open(id) {
        this.tab1Query.id = id
        this.tab2Query.orderId = id
        this.tab3Query.orderId = id
        this.getTab1Data()
        this.getTab2Data()
        this.getTab3Data()
        this.$refs.window.open()
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getTab1Data() {
        api.transport.logPaged(this.tab1Query).then(data => {
          this.table1Options.data = data.records
          this.table1Options.total = data.total
        })
      },
      getTab2Data() {
        api.transport.driverOrderPaged(this.tab2Query).then(data => {
          this.table2Options.data = data.records
          this.table2Options.total = data.total
        })
      },
      getTab3Data() {
        api.transport.routeSteprPaged(this.tab3Query).then(data => {
          this.table3Options.data = data.records
          this.table3Options.total = data.total
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-tabs__header
    margin: 0 !important
  /deep/ .el-tab-pane
    height: 500px
  /deep/ .el-dialog__footer
    padding: 0 !important
</style>