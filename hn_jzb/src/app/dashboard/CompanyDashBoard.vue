<template>
  <div class="content-wrapper">
    <div class="top">
      <div class="blocks" v-for="(block,index) in BLOCKS" :key="index">
        <dash-block
          :name="block.name"
          :unit="block.unit"
          :count="block.count"
          :todayAdd="block.todayAdd"
          :bg-image="block.bgImage"
          :introduce="block.introduce"
          :showToday="block.showToday">
          <div class="today" v-if="block.value === 'equipmentStop'" slot="today">当前数据刷新时间:&nbsp;&nbsp;{{block.updateTime}}</div>
        </dash-block>
      </div>
    </div>
    <div class="center clearfix">
      <div class="center-left">
        <dash-line-block
          :title="lineOptions.title"
          :tab-list="lineOptions.tabList">
          <dash-chart
            style="height: 380px"
            :options="lineOptions.options">
          </dash-chart>
        </dash-line-block>
      </div>
      <div class="center-right">
        <dash-table-block
          :title="tableOptions.title"
          :tab-list="tableOptions.tabList">
          <dash-table
            :options="tableOptions"
            @reloadTable="tableOptions.reload">
          </dash-table>
        </dash-table-block>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {COMPANYBOARD} from './dashboard.config'
  import {getFormatDate} from './common/utils'
  import TabPane from '@/components/views/TabPane'
  import DashBlock from './components/DashBlock'
  import DashTableBlock from './components/DashTableBlock'
  import DashLineBlock from './components/DashLineBlock'
  import DashTable from './components/DashTable'
  import DashChart from './components/charts/DashChart'

  export default {
    name: 'company-dash-board',
    mixins: [TabPane],
    components: {
      DashBlock,
      DashTable,
      DashTableBlock,
      DashLineBlock,
      DashChart
    },
    data() {
      return {
        timer: null, // 间隔时间获取数据接口
        BLOCKS: COMPANYBOARD.BLOCKS,
        activeOftable: 0,
        activeOfpie: 0,
        activeOfline: 0,
        query: {
          page: 1,
          pageSize: 5
        },
        tableOptions: Object.assign({...COMPANYBOARD.TABLE_OPTIONS}, {
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getTableData(this.query)
          }
        }),
        pieOptions: {...COMPANYBOARD.PIE_OPTIONS},
        lineOptions: JSON.parse(JSON.stringify(COMPANYBOARD.LINE_OPTIONS))
      }
    },
    methods: {
      getTopBlocks() {
        api.companyBoard.getdb1().then(data => {
          this.BLOCKS.forEach(block => {
            if (block.value === 'equipment') {
              block.count = data.equipmentCount
              block.todayAdd = data.equimentCoutTodayAdd
            } else if (block.value === 'equipmentStop') {
              block.count = data.equipmentStopCount
              block.updateTime = data.updateTime.substring(11, 16)
            } else if (block.value === 'card') {
              block.count = data.cardCount
              block.todayAdd = data.cardCountTodayAdd
            } else if (block.value === 'cardUsed') {
              block.count = data.cardUsedCount
              block.todayAdd = data.cardUsedCountTodayAdd
            } else if (block.value === 'product') {
              block.count = data.productCount
              block.todayAdd = data.productCountTodayAdd
            }
          })
        })
      },
      getLineData() {   // 中左
        api.companyBoard.getdb20().then(data => {
          this.lineOptions.options.xAxis[0].data = data.sort((a, b) => {
            if (a.day > b.day) {
              return 1
            } else {
              return -1
            }
          }).map(list => getFormatDate(list.day))
          this.lineOptions.options.series[0].data = data.sort((a, b) => {
            if (a.day > b.day) {
              return 1
            } else {
              return -1
            }
          }).map(list => list.usedCount)
        })
      },
      getTableData(query) {
        api.companyBoard.getdb21(query).then(data => {
          this.tableOptions.total = data.total
          this.tableOptions.data = data.records
        })
      } // 中右
    },
    mounted() {
      this.getTopBlocks()
      this.getLineData()
      this.getTableData(this.query)
      // this.timer = setInterval(() => {
      //   this.getTopBlocks()
      //   this.getTableData(this.query)
      //   this.getLineData()
      //   this.$refs.map.getMakers()
      // }, 60 * 5 * 1000)
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .content-wrapper
    margin: 0 auto
    background: #F0F2F5
    max-width: 1720px
    min-width: 1000px
    padding: 8px
    height: calc(100% - 16px)
    .top
      .blocks
        display: inline-block
        width: calc(100% / 5)
        padding: 8px
        box-sizing: border-box
        .today
          font-size: 14px
          padding: 10px 0
          color: #4A4A4A
    .center
      .center-left
        display: inline-block
        width: calc(100% / 5 * 3)
        padding: 8px
        box-sizing: border-box
        float: left
        /deep/ .table-wrapper
          height: 400px
          .top
            height: 50px
            line-height: 50px
      .center-right
        display: inline-block
        width: calc(100% / 5 * 2)
        padding: 8px
        box-sizing: border-box
        float: right
        /deep/ .table-wrapper
          .top
            height: 50px
            line-height: 50px
        /deep/ .table
          height: 290px
        /deep/ .el-pagination
          margin: 13.5px 0
</style>

