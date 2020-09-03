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
                   @click="search">
          搜索
        </el-button>
      </div>
    </div>
    <eui-table
      slot="center"
      ref="table"
      :show-index="false"
      :highlight-current-row="false"
      :options="tableOptions">
      <template slot="prev">
        <el-table-column label="机台号"
                         align="center"
                         min-width="150">
          <template slot-scope="scope">
            <div>{{scope.row.stationCode}}</div>
            <el-button type="primary"
                       size="mini"
                       @click="openCharts(scope.row.stationCode, scope.row.workshopOrderId)">图表
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="生产款式"
                         align="center"
                         min-width="200">
          <template slot-scope="scope">
            {{scope.row.articleNumber}} / {{scope.row.essentialColour}} / {{scope.row.size}}
          </template>
        </el-table-column>
      </template>
    </eui-table>
    <today-output-window :startTime="order.startTime"
                         :endTime="order.endTime"
                         ref="output">
    </today-output-window>
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
  import {STATION} from './datacenter.config'
  import WorkShopOrderChoseWindow from '../common/WorkShopOrderChoseWindow'
  import TodayOutputWindow from './window/TodayOutputWindow'
  // import {formatDate} from '@/assets/js/tools'
  export default {
    name: 'station-detail',
    _meta: {
      path: '/station/detail',
      title: '机台概览'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      TodayOutputWindow,
      WorkShopOrderChoseWindow
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        REGIONS: STATION.REGIONS,
        order: {
          startTime: null,
          endTime: null
        },
        query: {
          page: 1,
          pageSize: 10,
          orderId: null,
          orderName: null
        },
        OrderIndexArr: [],
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'taskAllocationTime', label: '任务分配时间', minWidth: 150},
            {prop: 'completeNumber', label: '完成数量', minWidth: 100},
            {prop: 'productionTimeStr', label: '生产用时', minWidth: 100},
            {prop: 'reportCount', label: '报工次数', minWidth: 100},
            {prop: 'reportTotalNumber', label: '报工总量', minWidth: 100},
            {prop: 'efficiencyOfSingleSockStr', label: '单只袜子的时间', minWidth: 100}
          ],
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.reload()
          },
          objectSpanMethod: ({ row, column, rowIndex, columnIndex }) => {
            // console.log(row, column, rowIndex, columnIndex)
            if (columnIndex < 1) {
              for (let i = 0; i < this.OrderIndexArr.length; i++) {
                let element = this.OrderIndexArr[i]
                for (let j = 0; j < element.length; j++) {
                  let item = element[j]  // 0,1    3,4,5
                  if (rowIndex === item) {
                    if (j === 0) {
                      return {
                        rowspan: element.length,
                        colspan: 1
                      }
                    } else if (j !== 0) {
                      return {
                        rowspan: 0,
                        colspan: 0
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    methods: {
      getData() {
        api.stationDetail.stationPaged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.getOrderNumber(this.tableOptions.data)
          this.tableOptions.total = data.total
        })
      },
      reload() {
        this.getData()
      },
      search() {
        if (this.query.orderId) {
          this.query.page = 1
          this.getData()
        } else {
          this.$message({
            type: 'warning',
            message: '请先选择任务单号!'
          })
        }
      },
      openCharts(stationCode, orderId) {
        if (!this.order.startTime && !this.order.endTime) {
          this.$message({
            type: 'warning',
            message: '该订单还未开始!'
          })
        } else {
          this.$refs.output.open(stationCode, orderId)
        }
      },
      workorderOpen() {
        this.$refs.order.open()
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getOrderNumber(tableData) {
        this.OrderIndexArr = []
        let OrderObj = {}
        tableData.forEach((element, index) => {
          element.rowIndex = index
          if (OrderObj[element.stationCode]) {
            OrderObj[element.stationCode].push(index)
          } else {
            OrderObj[element.stationCode] = []
            OrderObj[element.stationCode].push(index)
          }
        })
        // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
        for (let k in OrderObj) {
          if (OrderObj[k].length > 1) {
            // console.log(OrderObj[k])
            this.OrderIndexArr.push(OrderObj[k])
          }
        }
      }
    },
    created() {
      this.$on('workshoporder', node => {
        this.query.orderName = `订单编号:${node.orderNumber}, 任务单号:${node.taskNumber}, 车间:${node.workshopName}`
        this.query.orderId = node.id
        api.stationDetail.getOrderStartToEndTime(node.id).then(data => {
          this.order.startTime = data.startTime
          this.order.endTime = data.endTime
        })
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
</style>
