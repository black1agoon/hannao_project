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
          :title="mapOptions.title">
          <div class="ltitle-wrap" slot="ltitle">
            <div class="map_ltitle"><span></span>设备点位</div>
          </div>
          <div style="width: 100%;height: 277px;">
            <dash-board0-map ref="map"></dash-board0-map>
          </div>
        </dash-table-block>
      </div>
      <div class="center-right">
        <dash-table-block
          :title="tableOptions.title"
          :tab-list="tableOptions.tabList"
          @atvindex="getTableActiveIndex">
          <dash-table
            :options="tableOptions"
            @reloadTable="tableOptions.reload">
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
          :title="lineOptions.title"
          :tab-list="lineOptions.tabList"
          @atvindex="getLineActiveIndex">
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
  import {BOARD0} from './dashboard.config'
  import {getFormatDate} from './common/utils'
  import TabPane from '@/components/views/TabPane'
  import DashBlock from './components/DashBlock'
  import DashTableBlock from './components/DashTableBlock'
  import DashLineBlock from './components/DashLineBlock'
  import DashTable from './components/DashTable'
  import DashChart from './components/charts/DashChart'
  import DashBoard0Map from './components/charts/DashBoard0Map'
  export default {
    name: 'dash-board0',
    mixins: [TabPane],
    components: {
      DashBlock,
      DashTable,
      DashTableBlock,
      DashLineBlock,
      DashChart,
      DashBoard0Map
    },
    data() {
      return {
        timer: null, // 间隔时间获取数据接口
        BLOCKS: BOARD0.BLOCKS,
        activeOftable: 0,
        activeOfpie: 0,
        activeOfline: 0,
        query: {
          page: 1,
          pageSize: 5
        },
        mapOptions: {...BOARD0.MAP_OPTIONS},
        tableOptions: Object.assign({...BOARD0.TABLE_OPTIONS}, {
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getTableData(this.query)
          }
        }),
        pieOptions: {...BOARD0.PIE_OPTIONS},
        lineOptions: JSON.parse(JSON.stringify(BOARD0.LINE_OPTIONS))
      }
    },
    methods: {
      getTopBlocks() {
        api.board0.getdb1().then(data => {
          this.BLOCKS.forEach(block => {
            if (block.value === 'equiment') {
              block.count = data.equimentCout
              block.todayAdd = data.equimentCoutTodayAdd
            } else if (block.value === 'card') {
              block.count = data.cardCount
              block.todayAdd = data.cardCountTodayAdd
            } else if (block.value === 'mssUser') {
              block.count = data.mssUserCount
              block.todayAdd = data.mssUserCountTodayAdd
            } else if (block.value === 'company') {
              block.count = data.companyCount
              block.todayAdd = data.companyCountTodayAdd
            } else if (block.value === 'product') {
              block.count = data.productCount
              block.todayAdd = data.productCountTodayAdd
            }
          })
        })
      },
      getTableData(query) {
        if (this.activeOftable === 0) {
          api.board0.getdb21(query).then(data => {
            this.tableOptions.total = data.total
            this.tableOptions.data = data.records
            this.tableOptions.title = '企业设备标签排名'
            this.tableOptions.columns = [
              {prop: 'companyName', label: '企业名称', width: 200, align: 'center'},
              {prop: 'typeName', label: '所属行业', width: 130, align: 'center'},
              {prop: 'count', label: '标签数', align: 'center'}
            ]
          })
        } else if (this.activeOftable === 1) {
          api.board0.getdb22(query).then(data => {
            this.tableOptions.total = data.total
            this.tableOptions.data = data.records
            this.tableOptions.title = '企业设备产品排名'
            this.tableOptions.columns = [
              {prop: 'companyName', label: '企业名称', width: 200, align: 'center'},
              {prop: 'typeName', label: '所属行业', width: 130, align: 'center'},
              {prop: 'count', label: '产品数', align: 'center'}
            ]
          })
        }
      }, // 中右
      getPieData() { // 下左
        api.board0.getdb31().then(data => {
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
        api.board0.getdb32().then(data => {
          this.lineOptions.options.xAxis[0].data = data.mssUserDayRegStaticsList.sort((a, b) => {
            if (a.day > b.day) {
              return 1
            } else {
              return -1
            }
          }).map(list => getFormatDate(list.day))
          let seriesCopy = JSON.parse(JSON.stringify(BOARD0.LINE_OPTIONS.options.series))
          if (this.activeOfline === 0) {
            this.lineOptions.options.legend.data = ['APP用户注册', '芯片生产数']
            this.lineOptions.options.color = ['#975FE4', '#11C1C1']
            seriesCopy[0].data = data.mssUserDayRegStaticsList.map(list => list.regCount)
            seriesCopy[1].data = data.cardDayUsedStaticsList.map(list => list.usedCount)
            this.lineOptions.options.series = seriesCopy
          } else if (this.activeOfline === 1) {
            this.lineOptions.options.color = ['#975FE4']
            this.lineOptions.options.legend.data = ['APP用户注册']
            seriesCopy[0].data = data.mssUserDayRegStaticsList.map(list => list.regCount)
            this.lineOptions.options.series = [seriesCopy[0]]
          } else if (this.activeOfline === 2) {
            this.lineOptions.options.color = ['#11C1C1']
            this.lineOptions.options.legend.data = ['芯片生产数']
            seriesCopy[1].data = data.cardDayUsedStaticsList.map(list => list.usedCount)
            this.lineOptions.options.series = [seriesCopy[1]]
          }
        })
      },
      getTableActiveIndex(index) {
        this.activeOftable = index
        this.tableOptions.currentPage = 1
        this.getTableData({
          page: 1,
          pageSize: 5
        })
      },
      getPieActiveIndex(index) {
        this.activeOfpie = index
        this.getPieData()
      },
      getLineActiveIndex(index) {
        this.activeOfline = index
        this.getLineData()
      }
    },
    mounted() {
      this.getTopBlocks()
      this.getTableData(this.query)
      this.getPieData()
      this.getLineData()
      this.timer = setInterval(() => {
        this.getTopBlocks()
        this.getTableData(this.query)
        this.getPieData()
        this.getLineData()
        this.$refs.map.getMakers()
      }, 60 * 5 * 1000)
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .content-wrapper
    /*margin: 0 auto*/
    background: #F0F2F5
    max-width: 1720px
    min-width: 1000px
    padding: 8px
    /*box-sizing: border-box*/
    height: calc(100% - 16px)
    .top
      .blocks
        display: inline-block
        width: calc(100% / 5)
        padding: 8px
        box-sizing: border-box
    .center
      .center-left
        display: inline-block
        width: calc(100% / 5 * 3)
        padding: 8px
        box-sizing: border-box
        float: left
        .ltitle-wrap
          position: absolute
          right: 30px
          top: 13px
          height: 15px
          line-height: 15px
          .map_ltitle
            font-size: 14px
            color: #4A4A4A
            span
              display: inline-block
              width: 15px
              height: 15px
              border-radius: 50%
              background: #1890FF
              vertical-align: top
              margin-right: 9px
      .center-right
        display: inline-block
        width: calc(100% / 5 * 2)
        padding: 8px
        box-sizing: border-box
        float: right
    .bottom
      .bottom-left
        display: inline-block
        width: calc(100% / 5 * 2)
        padding: 8px
        box-sizing: border-box
        float: left
      .bottom-right
        display: inline-block
        width: calc(100% / 5 * 3)
        padding: 8px
        box-sizing: border-box
        float: right
</style>

