<template>
  <div>
  <eui-layout :regions="REGIONS">
    <div class="" slot="north">
      <div class="input-wrapper">
        <span class="label">任务单号:</span>
        <eui-input
          class="select"
          :readonly="true"
          suffixIcon="fa fa-search"
          v-model="query.orderName"
          :clearable="true"
          @suffixClick="workorderOpen">
        </eui-input>
        <el-button type="primary"
                   size="mini"
                   @click="reload">
          搜索
        </el-button>
      </div>
    </div>
    <div class="content" slot="center">
      <div class="top">
        <div class="block">
          <dash-chart :options="lineOptions">
          </dash-chart>
        </div>
        <div class="block">
          <dash-chart :options="lineOptions2">
          </dash-chart>
        </div>
      </div>
      <div class="center">
        <div class="tabs">
          <month-tabs
            ref="tabs"
            @monthChange="monthChange"
            :options="monthOptions">
          </month-tabs>
        </div>
        <eui-table
          class="table"
          ref="table"
          :show-index="false"
          :highlight-current-row="false"
          :options="tableOptions"
          :show-summary="true"
          @reloadTable="tableOptions.reload">
          <template slot="prev">
            <el-table-column label="款号"
                             align="center"
                             min-width="250">
              <template slot-scope="scope">
                {{scope.row.articleNumber}} / {{scope.row.essentialColour}} / {{scope.row.size}}
              </template>
            </el-table-column>
          </template>
        </eui-table>
      </div>
      <div class="bottom">
        <div class="block">
          <div class="title">设备警告</div>
          <eui-table
            class="table"
            ref="table"
            :highlight-current-row="false"
            :show-index="false"
            :options="tableOptions2"
            layout="total, sizes, prev, pager, next, jumper, slot"
            @reloadTable="tableOptions2.reload">
          </eui-table>
        </div>
        <div class="block">
          <div class="title">呼叫维修日志</div>
          <eui-table
            class="table"
            ref="table"
            :highlight-current-row="false"
            :show-index="false"
            :options="tableOptions3"
            @reloadTable="tableOptions3.reload">
          </eui-table>
        </div>
      </div>
    </div>
  </eui-layout>
    <work-shop-order-chose-window ref="order">
    </work-shop-order-chose-window>
  </div>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import {ORDER} from './datacenter.config'
  import WorkShopOrderChoseWindow from '../common/WorkShopOrderChoseWindow'
  import DashChart from '../tools/DashChart'
  import MonthTabs from './common/MonthTabs'
  export default {
    name: 'workorder-detail',
    _meta: {
      path: '/workorder/detail',
      title: '任务单概览'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      WorkShopOrderChoseWindow,
      DashChart,
      MonthTabs
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        REGIONS: ORDER.REGIONS,
        query: {
          orderId: null,
          orderName: null
        },
        tableQuery: {
          page: 1,
          pageSize: 10,
          orderId: null,
          month: null
        },
        table2Query: {
          page: 1,
          pageSize: 10,
          orderId: null,
          month: null
        },
        table3Query: {
          page: 1,
          pageSize: 10,
          orderId: null,
          month: null
        },
        lineQuery: {
          orderId: null,
          month: null
        },
        lineOptions: ORDER.LINE_OPTIONS,
        lineOptions2: ORDER.LINE_OPTIONS2,
        tableOptions: {
          data: [],
          total: 0,
          columns: [],
          reload: (name, val) => {
            this.tableQuery.page = name === 'page' ? val : this.tableQuery.page
            this.tableQuery.pageSize = name === 'pageSize' ? val : this.tableQuery.pageSize
            this.getTableData()
          }
        },
        tableOptions2: {
          data: [],
          total: 0,
          columns: [
            {prop: 'stationCode', label: '机台号'},
            {prop: 'message', label: '类型'},
            {prop: 'mean', label: '解释'},
            {prop: 'createTime', label: '时间'}
          ],
          reload: (name, val) => {
            this.table2Query.page = name === 'page' ? val : this.table2Query.page
            this.table2Query.pageSize = name === 'pageSize' ? val : this.table2Query.pageSize
            this.getTableData2()
          }
        },
        tableOptions3: {
          data: [],
          total: 0,
          columns: [
            {prop: 'stationCode', label: '机台号'},
            {prop: 'applyTime', label: '呼叫时间'},
            {prop: 'createTime', label: '维修时间'}
          ],
          reload: (name, val) => {
            this.table3Query.page = name === 'page' ? val : this.table3Query.page
            this.table3Query.pageSize = name === 'pageSize' ? val : this.table3Query.pageSize
            this.getTableData3()
          }
        },
        monthOptions: []
      }
    },
    methods: {
      getTableData() {
        this.tableQuery.orderId = this.query.orderId
        this.tableOptions.columns = []
        api.stationDetail.pagedDailyProductionQuantityStatisticsOfArticleNumber(this.tableQuery).then(data => {
          this.tableOptions.data = data.records.map(d => {
            return Object.assign({
              articleNumber: d.articleNumber,
              sum: d.numberTotal,
              essentialColour: d.essentialColour,
              pattern: d.pattern,
              size: d.size
            }, d.dayAndNumberDtoList.reduce((result, current) => {
              result[current.date] = current.number
              return result
            }, {}))
          })
          this.tableOptions.total = data.total
          // this.tableOptions.columns = [{
          //   prop: 'articleNumber', label: '款号', minWidth: 100
          // }]
          this.tableOptions.columns = this.tableOptions.columns.concat(data.records[0].dayAndNumberDtoList.map(day => {
            let date = new Date(day.date)
            return {
              label: `${date.getMonth() + 1}月${date.getDate()}日`,
              prop: day.date,
              minWidth: 100
            }
          }),
          {prop: 'sum', label: '合计', minWidth: 100, fixed: 'right'})
        })
      },
      getTableData2() {
        this.table2Query.orderId = this.query.orderId
        api.stationDetail.pagedByOrderIdAndMonth(this.table2Query).then(data => {
          this.tableOptions2.data = data.records
          this.tableOptions2.total = data.total
        })
      },
      getTableData3() {
        this.table3Query.orderId = this.query.orderId
        api.stationDetail.pagedStationRepairByOrderIdAndMonth(this.table3Query).then(data => {
          this.tableOptions3.data = data.records
          this.tableOptions3.total = data.total
        })
      },
      reload() {
        // this.getData()
        if (this.query.orderId) {
          this.getMonthData()
          this.getTodayLineData() // 不需要月份 可以直接获取
        } else {
          this.$message({
            type: 'warning',
            message: '请先选择任务单号!'
          })
        }
      },
      workorderOpen() {
        this.$refs.order.open()
      },
      getMonthData() {  // 获取月份
        api.stationDetail.getMonth(this.query.orderId).then(data => {
          if (data && data.length > 0) {
            this.$refs.tabs.init()
            this.monthOptions = data.map(d => ({
              label: d.monthName,
              value: d.month
            }))
            if (this.monthOptions.length > 0) {
              this.lineQuery.month = this.monthOptions[0].value
              this.tableQuery.month = this.monthOptions[0].value
              this.table2Query.month = this.monthOptions[0].value
              this.table3Query.month = this.monthOptions[0].value
              this.getLineData()
              this.getTableData()
              this.getTableData2()
              this.getTableData3()
            }
          }
        })
      },
      getLineData() {  // 获取每日数据
        this.lineQuery.orderId = this.query.orderId
        api.stationDetail.dailyProductionQuantityTrendStatistics(this.lineQuery).then(data => {
          if (data && data.length > 0) {
            this.lineOptions.xAxis[0].data = data.map(d => parseInt(Object.keys(d)[0].substr(8)))
            this.lineOptions.series[0].data = data.map(d => d[Object.keys(d)[0]])
          }
        })
      },
      getTodayLineData() {
        api.stationDetail.todayProductionQuantityTrendStatistics(this.query.orderId).then(data => {
          if (data && data.length > 0) {
            this.lineOptions2.xAxis[0].data = data.map(d => d.hour)
            this.lineOptions2.series[0].data = data.map(d => d.number)
          }
        })
      },
      monthChange(val) {
        this.lineQuery.month = val
        this.tableQuery.month = val
        this.table2Query.month = val
        this.table3Query.month = val
        this.getLineData()
        this.getTableData()
        this.getTableData2()
        this.getTableData3()
      }
    },
    created() {
      this.$on('workshoporder', node => {
        this.query.orderName = `订单编号:${node.orderNumber}, 任务单号:${node.taskNumber}, 车间:${node.workshopName}`
        this.query.orderId = node.id
      })
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .input-wrapper
    .label
      font-size: 14px
      margin: 0 5px
    .select
      width: 400px
  .content
    width: 100%
    height: 100%
    overflow-y: auto
    background: #eff1f4
    .table-wrapper
      padding: 0
    .top
      height: 258px
      background: #ffffff
      display: flex
      padding: 10px 20px 0
      .block
        flex: 1
        border: 1px solid #E4E7ED
        &:first-child
          margin-right: 28px
    .center
      height: 500px
      margin-bottom: 20px
      display: flex
      flex-direction: column
      background: #ffffff
      padding: 0 20px 10px
      .tabs
        flex: 0 0 34px
        padding-top: 10px
      .table
        flex: 1
        border: 1px solid #E4E7ED
    .bottom
      height: 400px
      display: flex
      background: #ffffff
      padding: 10px 20px
      overflow-y: hidden
      .block
        flex: 1
        display: flex
        flex-direction: column
        border: 1px solid #EBEEF5
        &:first-child
          margin-right: 28px
        .title
          flex: 0 0 40px
          line-height: 40px
          background: #EBEEF5
          color: #707070
          padding-left: 10px
          font-size: 16px
        .table
          flex: 1
</style>
