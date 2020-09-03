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
    <div class="center">
      <div class="center-block">
        <dash-main-block title="电表状态">
          <dash-chart :options="pieOptions">
          </dash-chart>
          <div class="legend1">
            <div class="item">
              <span class="icon offline"></span>离线&nbsp;&nbsp;{{pieOptions.series[0].data[0].value}}(台)
            </div>
            <div class="item">
              <span class="icon online"></span>在线&nbsp;&nbsp;{{pieOptions.series[0].data[1].value}}(台)
            </div>
          </div>
        </dash-main-block>
      </div>
      <div class="center-block">
        <dash-main-block title="充电桩状态">
          <dash-chart :options="pieOptions2">
          </dash-chart>
          <div class="legend2">
            <div class="item">
              <span class="icon offline"></span>离线&nbsp;&nbsp;{{pieOptions2.series[0].data[0].value}}(台)
            </div>
            <div class="item">
              <span class="icon online"></span>在线&nbsp;&nbsp;{{pieOptions2.series[0].data[1].value}}(台)
            </div>
          </div>
        </dash-main-block>
      </div>
      <div class="center-block">
        <dash-main-block title="音频状态">
          <dash-chart :options="pieOptions3">
          </dash-chart>
          <div class="legend3">
            <div class="item">
              <span class="icon offline"></span>离线&nbsp;&nbsp;{{pieOptions3.series[0].data[0].value}}(台)
            </div>
            <div class="item">
              <span class="icon online"></span>在线&nbsp;&nbsp;{{pieOptions3.series[0].data[1].value}}(台)
            </div>
          </div>
        </dash-main-block>
      </div>
    </div>
    <div class="center">
      <div class="center-block">
        <dash-main-block title="当月电量趋势">
          <dash-chart :options="lineOptions">
          </dash-chart>
        </dash-main-block>
      </div>
      <div class="center-block">
        <dash-main-block title="当月充电桩用电">
          <dash-chart :options="lineOptions2">
          </dash-chart>
        </dash-main-block>
      </div>
      <div class="center-block">
        <dash-main-block title="曲目数量">
          <div class="song-bg">
            <div class="song-title">曲目数量</div>
            <div class="song-num">{{songCount}}</div>
          </div>
        </dash-main-block>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {BOARD} from './dashboard.config'
  import TabPane from '@/components/views/TabPane'
  import DashBlock from './components/DashBlock'
  import DashMainBlock from './components/DashMainBlock'
  import DashChart from './components/charts/DashChart'
  export default {
    name: 'dash-board',
    mixins: [TabPane],
    components: {
      DashBlock,
      DashMainBlock,
      DashChart
    },
    data() {
      return {
        timer: null, // 间隔时间获取数据接口
        BLOCKS: BOARD.BLOCKS,
        songCount: 0,
        pieOptions: {...BOARD.PIE_OPTIONS},
        pieOptions2: {...BOARD.PIE_OPTIONS2},
        pieOptions3: {...BOARD.PIE_OPTIONS3},
        lineOptions: {...BOARD.LINE_OPTIONS},
        lineOptions2: {...BOARD.LINE_OPTIONS2}
      }
    },
    methods: {
      getTopBlocks() {
        api.home.load().then(data => {
          this.songCount = data.songCount
          this.BLOCKS.forEach(block => {
            if (block.value === 'lightCount') {
              block.count = data.lightCount
            } else if (block.value === 'electricCount') {
              block.count = data.electricCount
            } else if (block.value === 'pileCount') {
              block.count = data.pileCount
            } else if (block.value === 'musicCount') {
              block.count = data.musicCount
            }
          })
          this.pieOptions.series[0].data = [{
            name: '离线',
            value: data.electricOfflineCount || 0
          }, {
            name: '在线',
            value: data.electricOnlineCount || 0
          }]
          this.pieOptions2.series[0].data = [{
            name: '离线',
            value: data.pileOfflineCount || 0
          }, {
            name: '在线',
            value: data.pileOnlineCount || 0
          }]
          this.pieOptions3.series[0].data = [{
            name: '离线',
            value: data.musicOfflineCount || 0
          }, {
            name: '在线',
            value: data.musicOnlineCount || 0
          }]
        })
      },
      getLineData() {   //
        api.home.electric().then(data => {
          this.lineOptions.xAxis[0].data = data.map(d => this.getMonthDay(d.date))
          this.lineOptions.series[0].data = data.map(d => d.value)
        })
      },
      getLineData2() {   //
        api.home.pileInfo().then(data => {
          this.lineOptions2.xAxis[0].data = data.map(d => this.getMonthDay(d.date))
          this.lineOptions2.series[0].data = data.map(d => d.value)
        })
      },
      getMonthDay(time) {
        let date = new Date(time)
        let month = date.getMonth() + 1
        let day = date.getDate()
        return month + '月' + day + '日'
      }
    },
    mounted() {
      this.getTopBlocks()
      this.getLineData()
      this.getLineData2()
      this.timer = setInterval(() => {
        this.getTopBlocks()
        this.getLineData()
        this.getLineData2()
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
        width: calc(100% / 4)
        padding: 8px
        box-sizing: border-box
    .center
      width: 100%
      display: flex
      .center-block
        width: calc(100% / 3)
        padding: 8px
        box-sizing: border-box
        .legend1, .legend2, .legend3
          position: absolute
          top: 150px
          right: 20px
          width: 130px
          .item
            font-size: 16px
            color: #212121
            margin-top: 15px
            .icon
              display: inline-block
              width: 18px
              height: 18px
              border-radius: 50%
              vertical-align: text-bottom
              margin-right: 10px
              &.offline
                background: #D5D5D5
        .legend1
          .online
            background: #975FE4
        .legend2
          .online
            background: #11C1C1
        .legend3
          .online
            background: #5AB1EF
        .song-bg
          margin: 30px auto
          width: 374px
          height: 254px
          background-image: url("static/img/songcount.png")
          background-size: 374px 254px
          background-repeat: no-repeat
          .song-title
            padding-top: 120px
            text-align: center
            font-size: 16px
            color: #333
          .song-num
            margin-top: 20px
            text-align: center
            font-size: 60px
            color: rgba(90, 177, 239, 1)
</style>

