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
          :introduce="block.introduce">
        </dash-block>
      </div>
    </div>
    <div class="center clearfix">
      <div class="center-left">
        <dash-table-block
          :title="tableOptions1.title"
          :tab-list="tableOptions1.tabList"
          @atvindex="getTable1ActiveIndex">
          <dash-table
            :options="tableOptions1"
            @reloadTable="tableOptions1.reload">
          </dash-table>
        </dash-table-block>
      </div>
      <div class="center-right">
        <dash-table-block
          :title="tableOptions2.title">
          <dash-table
            :options="tableOptions2"
            @reloadTable="tableOptions2.reload">
          </dash-table>
        </dash-table-block>
      </div>
    </div>
    <div class="bottom clearfix">
      <div class="bottom-left">
        <dash-table-block
          :title="pieOptions.title"
          :tab-list="pieOptions.tabList"
          @atvindex="getPieActiveIndex">
          <dash-chart
            :options="pieOptions.options">
          </dash-chart>
        </dash-table-block>
      </div>
      <div class="bottom-right">
        <dash-line-block
          :title="lineOptions.title">
          <dash-chart
            style="height: 340px"
            :options="lineOptions.options">
          </dash-chart>
        </dash-line-block>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {BOARD1} from './dashboard.config'
  import {getFormatDate} from './common/utils'
  import TabPane from '@/components/views/TabPane'
  import DashBlock from './components/DashBlock'
  import DashTableBlock from './components/DashTableBlock'
  import DashLineBlock from './components/DashLineBlock'
  import DashTable from './components/DashTable'
  import DashChart from './components/charts/DashChart'

  export default {
    name: 'dash-board1',
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
        BLOCKS: BOARD1.BLOCKS,
        activeOftable1: 0, // 设置默认显示 第一个
        activeOfpie: 0,
        query1: {
          page: 1,
          pageSize: 5
        },
        query2: {
          page: 1,
          pageSize: 5
        },
        tableOptions1: Object.assign({...BOARD1.TABLE1_OPTIONS}, {
          reload: (name, val) => {
            this.query1.page = name === 'page' ? val : this.query1.page
            this.query1.pageSize = name === 'pageSize' ? val : this.query1.pageSize
            this.getTable1Data(this.query1)
          }
        }),
        tableOptions2: Object.assign({...BOARD1.TABLE2_OPTIONS}, {
          reload: (name, val) => {
            this.query2.page = name === 'page' ? val : this.query2.page
            this.query2.pageSize = name === 'pageSize' ? val : this.query2.pageSize
            this.getTable2Data(this.query2)
          }
        }),
        pieOptions: {...BOARD1.PIE_OPTIONS},
        lineOptions: {...BOARD1.LINE_OPTIONS}
      }
    },
    methods: {
      getTopBlocks() {
        api.board1.getdb1().then(data => {
          this.BLOCKS.forEach(block => {
            if (block.value === 'equiment') {
              block.count = data.equimentCout
              block.todayAdd = data.equimentCoutTodayAdd
            } else if (block.value === 'card') {
              block.count = data.cardCount
              block.todayAdd = data.cardCountTodayAdd
            } else if (block.value === 'product') {
              block.count = data.productCount
              block.todayAdd = data.productCountTodayAdd
            }
          })
        })
      },
      getTable1Data(query) {
        if (this.activeOftable1 === 0) {
          api.board1.getdb21(query).then(data => {
            this.tableOptions1.total = data.total
            this.tableOptions1.data = data.records
            this.tableOptions1.title = '企业设备标签排名'
            this.tableOptions1.columns = [
              {prop: 'companyName', label: '企业名称', width: 300, align: 'center'},
              {prop: 'typeName', label: '所属行业', width: 300, align: 'center'},
              {prop: 'count', label: '标签数', align: 'center'}
            ]
          })
        } else if (this.activeOftable1 === 1) {
          api.board1.getdb22(query).then(data => {
            this.tableOptions1.total = data.total
            this.tableOptions1.data = data.records
            this.tableOptions1.title = '企业设备产品排名'
            this.tableOptions1.columns = [
              {prop: 'companyName', label: '企业名称', width: 300, align: 'center'},
              {prop: 'typeName', label: '所属行业', width: 300, align: 'center'},
              {prop: 'count', label: '产品数', align: 'center'}
            ]
          })
        }
      }, // 中左
      getTable2Data(query) {
        api.board1.getdb23(query).then(data => {
          this.tableOptions2.total = data.total
          this.tableOptions2.data = data.records
        })
      }, // 中右
      getPieData() { // 下左
        api.board1.getdb31().then(data => {
          if (this.activeOfpie === 0) {
            this.pieOptions.title = '商品类型分布'
            this.pieOptions.options.legend.data = Object.keys(data.productTypeStatics)
            this.pieOptions.options.series[0].name = '商品类型'
            this.pieOptions.options.series[0].data = Object.keys(data.productTypeStatics).map(key => ({
              name: key,
              value: data.productTypeStatics[key]
            }))
          } else if (this.activeOfpie === 1) {
            this.pieOptions.title = '标签类型分布'
            this.pieOptions.options.legend.data = Object.keys(data.cardTypeStatics)
            this.pieOptions.options.series[0].name = '标签类型'
            this.pieOptions.options.series[0].data = Object.keys(data.cardTypeStatics).map(key => ({
              name: key,
              value: data.cardTypeStatics[key]
            }))
          }
        })
      }, // 下左
      getLineData() {   // 下右
        api.board1.getdb32().then(data => {
          if (data.cardDayUsedStaticsList && data.cardDayUsedStaticsList.length > 0) {
            this.lineOptions.options.xAxis[0].data = data.cardDayUsedStaticsList.sort((a, b) => {
              if (a.day > b.day) {
                return 1
              } else {
                return -1
              }
            }).map(list => getFormatDate(list.day))
            this.lineOptions.options.series[0].data = data.cardDayUsedStaticsList.sort((a, b) => {
              if (a.day > b.day) {
                return 1
              } else {
                return -1
              }
            }).map(list => list.usedCount)
          }
        })
      },
      getTable1ActiveIndex(index) {
        this.activeOftable1 = index
        this.tableOptions1.currentPage = 1
        this.getTable1Data({
          page: 1,
          pageSize: 5
        })
      },
      getPieActiveIndex(index) {
        this.activeOfpie = index
        this.getPieData()
      }
    },
    mounted() {
      this.getTopBlocks()
      this.getTable1Data(this.query1)
      this.getTable2Data(this.query2)
      this.getPieData()
      this.getLineData()
      this.timer = setInterval(() => {
        this.getTopBlocks()
        this.getTable1Data(this.query1)
        this.getTable2Data(this.query2)
        this.getPieData()
        this.getLineData()
      }, 60 * 5 * 1000)
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
        width: calc(100% / 3)
        padding: 8px
        box-sizing: border-box
    .center
      .center-left
        display: inline-block
        width: calc(100% / 3 * 2)
        padding: 8px
        box-sizing: border-box
        float: left
      .center-right
        display: inline-block
        width: calc(100% / 3)
        padding: 8px
        box-sizing: border-box
        float: right
    .bottom
      .bottom-left
        display: inline-block
        width: calc(100% / 3)
        padding: 8px
        box-sizing: border-box
        float: left
      .bottom-right
        display: inline-block
        width: calc(100% / 3 * 2)
        padding: 8px
        box-sizing: border-box
        float: right
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
