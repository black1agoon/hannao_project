<template>
  <div class="bg">
    <div class="header">数字经济大数据动态分析运行平台</div>
    <div class="today">
      <div class="title">今日使用情况</div>
      <div class="wrap">
        <div class="water">
          <span class="point"></span>
          <div class="info">
            <span class="name">水</span>
            <span class="value" v-html="formatFontDotted(todayUsed.water)"></span>
            <span class="unit">t</span>
          </div>
        </div>
        <div class="electric">
          <span class="point"></span>
          <div class="info">
            <span class="name">电</span>
            <span class="value" v-html="formatFontDotted(todayUsed.electric)"></span>
            <span class="unit">kwh</span>
          </div>
        </div>
      </div>
    </div>
    <div class="weather">
      <span class="icon"></span>
      <div class="val">28℃ ~ 37℃</div>
    </div>
    <div class="timebox">
      <span
          class="date">{{currentTimeObj.year}}年{{currentTimeObj.month}}月{{currentTimeObj.day}}日&nbsp;&nbsp;</span><span
        class="time">{{currentTimeObj.hour}}:{{currentTimeObj.minute}}</span>
    </div>
    <div class="house"></div>
    <div class="right-wrapper">
      <charts-box title="用水变化趋势">
        <charts-temp :options="rightOptions1">
        </charts-temp>
      </charts-box>
      <charts-box title="用电变化趋势">
        <charts-temp :options="rightOptions2">
        </charts-temp>
      </charts-box>
      <charts-box title="水表能耗">
        <charts-temp :options="rightOptions3">
        </charts-temp>
      </charts-box>
      <charts-box title="电表能耗">
        <charts-temp :options="rightOptions4">
        </charts-temp>
      </charts-box>
    </div>
    <div class="floors">
      <div class="floor"
           v-for="(floor, index) in showFloors"
           :key="index"
           :style="getPosition(floor.pos[0], floor.pos[1])">
        <floor-box
            ref="floorbox"
            v-if="floor.show"
            :electric-used="electricFloorList[index].used"
            :water-used="waterFloorList[index].used"
            :title="floor.name"
            @openFloorWindow="openFloorWindow(index + 1)"
            @getChartsData="(val) => floorTabChange(val, index)">
          <charts-temp :options="FLOOR_OPTIONS[index]">
          </charts-temp>
        </floor-box>
      </div>
    </div>
    <div class="points">
      <div class="point"
           v-for="(point, index) in POINTS"
           :style="getPosition(point[0], point[1])"
           :key="index">
      </div>
    </div>
    <div class="lines">
      <div class="line" v-for="(line, index) in showLines" :key="index">
        <svg :width="line.width" :height="line.height" :viewBox="`0 0 ${line.width} ${line.height}`">
          <path stroke="#00FFFF"
                stroke-width="2"
                fill="none"
                :d="line.path"/>
        </svg>
        <div class="green"></div>
      </div>
    </div>
    <div class="copyright">浙江汉脑数码科技有限公司 版权所有</div>
    <floor-window ref="floor">
    </floor-window>
  </div>
</template>

<script>
  import api from '@/board/api'
  import ChartsBox from './common/ChartsBox'
  import ChartsTemp from './common/ChartsTemp'
  import FloorBox from './common/FloorBox'
  import {padLeftZero} from './static/js/tools'
  import {
    POINTS,
    FLOORS,
    LINES,
    RIGHT_OPTIONS1,
    RIGHT_OPTIONS2,
    RIGHT_OPTIONS3,
    RIGHT_OPTIONS4,
    FLOOR_OPTIONS
  } from './board.config'
  import anime from 'animejs'
  import FloorWindow from './window/FloorWindow'

  const FLOOR_NUM = 7
  export default {
    name: 'dash-board',
    components: {
      ChartsBox,
      ChartsTemp,
      FloorBox,
      FloorWindow
    },
    computed: {
      currentTimeObj() {
        let date = new Date(this.currentTime)
        return {
          year: date.getFullYear(),
          month: padLeftZero(date.getMonth() + 1),
          day: padLeftZero(date.getDate()),
          hour: padLeftZero(date.getHours()),
          minute: padLeftZero(date.getMinutes())
        }
      },
      showFloors() {
        let idxList1 = this.electricFloorList.map(li => li.index)
        let idxList2 = this.waterFloorList.map(li => li.index)
        let list = [...new Set([...idxList1, ...idxList2])]
        this.FLOORS.forEach((f, idx) => {
          f.show = list.includes(idx)
        })
        return this.FLOORS
      },
      showLines() {
        let idxList1 = this.electricFloorList.map(li => li.index)
        let idxList2 = this.waterFloorList.map(li => li.index)
        return this.LINES.filter((f, idx) => {
          return [...new Set([...idxList1, ...idxList2])].includes(idx)
        })
      }
    },
    data() {
      return {
        timer: null,
        currentTime: new Date(),
        POINTS,
        FLOORS,
        LINES,
        FLOOR_OPTIONS,
        rightOptions1: RIGHT_OPTIONS1,
        rightOptions2: RIGHT_OPTIONS2,
        rightOptions3: RIGHT_OPTIONS3,
        rightOptions4: RIGHT_OPTIONS4,
        electricFloorList: Array.from({length: FLOOR_NUM}, () => ({
          index: null,
          used: null
        })),
        waterFloorList: Array.from({length: FLOOR_NUM}, () => ({
          index: null,
          used: null
        })),
        todayUsed: {
          water: 0,
          electric: 0
        }
      }
    },
    methods: {
      initCurrentTime() {
        this.timer = setInterval(() => {
          this.currentTime = new Date()
        }, 1000 * 60)
      },
      /**
       * @value  click state value
       * @findex  floorIndex
       */
      floorTabChange(value, findex) {
        this.getFloorTableTypeData(findex + 1, value)
      },
      getPosition(x, y) {
        return {
          left: x + 'px',
          top: y + 'px',
          animationDelay: 5 * Math.random() + 's'
        }
      },
      setGreenAnime() {
        this.$nextTick(() => {
          let greens = document.querySelectorAll('.green')
          let paths = document.querySelectorAll('svg path')
          for (let i = 0; i < greens.length; i++) {
            let path = anime.path(paths[i])
            anime({
              targets: greens[i],
              translateX: path('x'),
              translateY: path('y'),
              rotate: path('angle'),
              easing: 'linear',
              duration: 4000,
              loop: true
            })
          }
        })
      },
      getBoardData() {
        // 水表两年
        api.board.water.nearlyTwoYears().then((data) => {
          if (data) {
            this.rightOptions1.series[0].name = data[1].year + '年'
            this.rightOptions1.series[1].name = data[0].year + '年'
            this.rightOptions1.series[0].data = Object.values(data[1].data)
            this.rightOptions1.series[1].data = Object.values(data[0].data)
          }
        })
        // 电表两年
        api.board.electric.allYear().then((data) => {
          if (data) {
            this.rightOptions2.series[0].name = data[1].year + '年'
            this.rightOptions2.series[1].name = data[0].year + '年'
            this.rightOptions2.series[0].data = Object.values(data[1].data)
            this.rightOptions2.series[1].data = Object.values(data[0].data)
          }
        })
        // 电表3天
        api.board.electric.getThreeWeek().then((data) => {
          if (data) {
            this.rightOptions4.xAxis[0].data = data.map(floor => floor.name)
            this.rightOptions4.series[0].data = data.map(floor => floor.value[2])
            this.rightOptions4.series[1].data = data.map(floor => floor.value[1])
            this.rightOptions4.series[2].data = data.map(floor => floor.value[0])
          }
        })
        // 水表3天
        api.board.water.nearlyThreeDays().then(data => {
          if (data) {
            this.rightOptions3.xAxis[0].data = data.map(floor => floor.name)
            this.rightOptions3.series[0].data = data.map(floor => floor.value[2])
            this.rightOptions3.series[1].data = data.map(floor => floor.value[1])
            this.rightOptions3.series[2].data = data.map(floor => floor.value[0])
          }
        })
        // 电表今日
        api.board.electric.getDay().then(data => {
          this.todayUsed.electric = data ? data : 0
        })
        // 水表今日
        api.board.water.todayUsed().then(data => {
          this.todayUsed.water = data ? data : 0
        })
        Promise.all([api.board.electric.getFloor({
          detail: 0,
          state: 0,
          type: 0
        }), api.board.water.getFloor({
          detail: 0,
          state: 0,
          type: 1
        })
        ]).then(result => {
          this.electricFloorList =  Array.from({length: FLOOR_NUM}, () => ({
            index: null,
            used: null
          }))
          this.waterFloorList = Array.from({length: FLOOR_NUM}, () => ({
            index: null,
            used: null
          }))
          result[0].forEach((floor) => {
            this.electricFloorList[floor[0].floorNumber - 1].index = floor[0].floorNumber - 1
            this.electricFloorList[floor[0].floorNumber - 1].used = floor[0].used
            // console.log(this.electricFloorList)
            this.FLOOR_OPTIONS[floor[0].floorNumber - 1].xAxis[0].data = floor[0].value.map(wk => wk.name)
            this.FLOOR_OPTIONS[floor[0].floorNumber - 1].series[1].data = floor[0].value.map(wk => wk.value)
          })

          result[1].forEach((floor) => {
            this.waterFloorList[floor[0].floorNumber - 1].index = floor[0].floorNumber - 1
            this.waterFloorList[floor[0].floorNumber - 1].used = floor[0].used
            this.FLOOR_OPTIONS[floor[0].floorNumber - 1].xAxis[0].data = floor[0].value.map(wk => wk.name)
            this.FLOOR_OPTIONS[floor[0].floorNumber - 1].series[0].data = floor[0].value.map(wk => wk.value)
          })
          this.setGreenAnime()
        })
      },
      getFloorTableTypeData(floorNumber, state) {
        Promise.all([api.board.electric.getFloor({
          floorNumber: floorNumber,
          detail: 0,
          state: state,
          type: 0
        }), api.board.water.getFloor({
          floorNumber: floorNumber,
          detail: 0,
          state: state,
          type: 1
        })]).then(result => {
          if (result[0] && result[0].length > 0) {
            this.electricFloorList[floorNumber - 1].used = result[0][0][0].used
            if (state === 0) {
              this.FLOOR_OPTIONS[floorNumber - 1].xAxis[0].data = result[0][0][0].value.map(wk => wk.name)
              this.FLOOR_OPTIONS[floorNumber - 1].series[1].data = result[0][0][0].value.map(wk => wk.value)
            } else if (state === 1) {
              this.FLOOR_OPTIONS[floorNumber - 1].xAxis[0].data = Object.keys(result[0][0][0].value).map(date => date.substr(5))
              this.FLOOR_OPTIONS[floorNumber - 1].series[1].data = Object.values(result[0][0][0].value)
            } else if (state === 2) {
              this.FLOOR_OPTIONS[floorNumber - 1].xAxis[0].data = Object.keys(result[0][0][0].value).map(m => m + '月')
              this.FLOOR_OPTIONS[floorNumber - 1].series[1].data = Object.values(result[0][0][0].value)
            }
          }
          if (result[1] && result[1].length > 0) {
            this.waterFloorList[floorNumber - 1].used = result[1][0][0].used
            if (state === 0) {
              this.FLOOR_OPTIONS[floorNumber - 1].xAxis[0].data = result[1][0][0].value.map(wk => wk.name)
              this.FLOOR_OPTIONS[floorNumber - 1].series[0].data = result[1][0][0].value.map(wk => wk.value)
            } else if (state === 1) {
              this.FLOOR_OPTIONS[floorNumber - 1].xAxis[0].data = Object.keys(result[1][0][0].value).map(date => date.substr(5))
              this.FLOOR_OPTIONS[floorNumber - 1].series[0].data = Object.values(result[1][0][0].value)
            } else if (state === 2) {
              this.FLOOR_OPTIONS[floorNumber - 1].xAxis[0].data = Object.keys(result[1][0][0].value).map(m => m + '月')
              this.FLOOR_OPTIONS[floorNumber - 1].series[0].data = Object.values(result[1][0][0].value)
            }
          }
          if ((result[0] && result[0].length === 0) && (result[1] && result[1].length === 0)) {
            this.FLOOR_OPTIONS[floorNumber - 1].xAxis[0].data = []
            this.FLOOR_OPTIONS[floorNumber - 1].series[0].data = []
            this.FLOOR_OPTIONS[floorNumber - 1].series[1].data = []
          }
          if (result[0] && result[0].length === 0) {
            this.electricFloorList[floorNumber - 1].used = null
          }
          if (result[1] && result[1].length === 0) {
            this.waterFloorList[floorNumber - 1].used = null
          }
        })
      },
      openFloorWindow(floorNumber) {
        this.$refs.floor.open(floorNumber)
      },
      formatFontDotted(str) {
        if (str) {
          let numbs = str.toString().split('.')
          if (numbs.length > 1) {
            return numbs.join('<span class="dotted-in-font">.</span>')
          } else {
            return numbs.toString()
          }
        } else {
          return str.toString()
        }
      },
      initFloorBoxTabs() {
        this.$refs.floorbox.forEach(floor => {
          floor.initTabs()
        })
      }
    },
    mounted() {
      this.initCurrentTime()
      this.getBoardData()
      setInterval(() => {
        this.getBoardData()
        this.initFloorBoxTabs()
      }, 5 * 1000 * 60)
    },
    destroyed() {
      console.log('destroyed')
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .bg
    width: 1920px
    height: 1080px
    background-image: url("./static/img/bg.png")
    background-size: cover
    background-repeat: no-repeat
    font-family: 'HYWenHei'
    .header
      width: 600px
      margin: 0 auto
      padding-top: 28px
      font-size: 37px
      color: #ffffff
    .today
      width: 540px
      height: 148px
      background-image: url("./static/img/today.png")
      background-size: 540px 148px
      background-repeat: no-repeat
      margin: 44px auto 0
      .title
        padding-top: 18px
        text-align: center
        font-size: 20px
        color: #ffffff
      .wrap
        display: flex
        .water, .electric
          display: flex
          flex: 1
          white-space: nowrap
          align-items: flex-end
          margin-top: 25px
          .point
            display: block
            width: 34px
            height: 34px
            background-size: 34px 34px
            background-repeat: no-repeat
            margin: 0 10px 0 20px
            vertical-align: bottom
          .info
            .name, .unit
              color: #ffffff
              font-size: 20px
            .value
              display: inline-block
              min-width: 100px
              text-align: center
              color: #00FFFF
              font-size: 55px
              font-family: 'digital-dismay'
        .water
          .point
            background-image: url("./static/img/point1.png")
        .electric
          .point
            background-image: url("./static/img/point2.png")
    .weather
      position: absolute
      height: 40px
      line-height: 40px
      top: 31px
      right: 80px
      .icon
        display: inline-block
        width: 40px
        height: 40px
        background-image: url("./static/img/weather/w1.png")
        background-size: 40px 40px
        background-repeat: no-repeat
        margin-right: 15px
      /*vertical-align: middle*/
      .val
        display: inline-block
        font-size: 22px
        color: #ffffff
        vertical-align: top
    .timebox
      position: absolute
      left: 74px
      top: 38px
      height: 40px
      line-height: 40px
      color: #ffffff
      .date
        font-size: 22px
        vertical-align: top
      .time
        display: inline-block
        height: 40px
        font-size: 40px
        font-family: 'digital-dismay'
    .house
      width: 817px
      height: 480px
      background-image: url("./static/img/house.png")
      background-size: 817px 480px
      background-repeat: no-repeat
      margin: 38px 0 0 406px
    .right-wrapper
      position: absolute
      height: 920px
      top: 99px
      right: 56px
      display: flex
      flex-direction: column
      justify-content: space-between
      z-index: 10
    .floors
      position: absolute
      top: 0
      left: 0
      z-index: 10
      width: 1260px
      height: 100%
      .floor
        position: absolute
    .points
      .point
        position: absolute
        width: 11px
        height: 11px
        background: #ffde00
        border-radius: 50%
        animation-duration: 2s
        animation-name: pointShadow
        animation-iteration-count: infinite
        animation-timing-function: linear
    .lines
      position: absolute
      width: 100%
      height: 100%
      top: 0
      .line
        position: absolute
        .green
          position: absolute
          width: 22px
          height: 4px
          top: -3px
          left: -11px
          background-image: url("./static/img/green.png")
          background-size: 22px 4px
          background-repeat: no-repeat
    .copyright
      position: absolute
      font-size: 14px
      color: #ffffff
      right: 34px
      bottom: 16px
    /deep/ .dotted-in-font
      font-family 'PingFang', Helvetica, Arial, sans-serif
      vertical-align: bottom
</style>