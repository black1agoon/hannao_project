<template>
  <div>
    <div class="introduce">
      <span>异常<i :style="{background: ERROR1_COLOR}"></i></span>
      <span>关机<i :style="{background: ERROR2_COLOR}"></i></span>
      <span>开机未启动<i :style="{background: ERROR3_COLOR}"></i></span>
    </div>
    <div class="title">
      <div class="station-title">机台编号</div>
      <div class="time-wrapper">
        <time-line>
        </time-line>
      </div>
    </div>
    <div class="stations" v-for="(station, index) in data" :key="index">
      <div class="station-code">{{station.stationCode}}</div>
      <div class="timeline">
        <div class="error" v-for="(time, i) in station.times" :key="i" :style="getTimeStyle(time)"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import TimeLine from '@/components/common/tools/TimeLine'
  const ERROR1_COLOR = '#FF4400'
  const ERROR2_COLOR = '#9933ff'
  const ERROR3_COLOR = '#13ce66'
  export default {
    name: 'station-time-line',
    components: {
      TimeLine
    },
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        ERROR1_COLOR,
        ERROR2_COLOR,
        ERROR3_COLOR
      }
    },
    methods: {
      getTimeStyle(time) {
        let getSec = t => {
          let tt = t.split(' ')[1].split(':')
          return Number(tt[0]) * 60 * 60 + Number(tt[1]) * 60 + Number(tt[2])
        }
        let start = getSec(time.startTime)
        let end = getSec(time.endTime)
        let width = (end - start) / 86400 * 1000 > 1 ? (end - start) / 86400 * 1000 : 1
        let background = ''
        if (time.state === 1) {
          background = ERROR1_COLOR
        } else if (time.state === 2) {
          background = ERROR2_COLOR
        } else if (time.state === 3) {
          background = ERROR3_COLOR
        }
        return {
          left: (start / 86400) * 100 + '%',
          width: width + 'px',
          background: background
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .introduce
    display: flex
    padding: 15px 10px
    justify-content: center
    span
      height: 20px
      line-height: 20px
      font-size: 14px
      color: #606266
      i
        display: inline-block
        margin: 0 20px 0 5px
        width: 40px
        height: 20px
        border-radius: 5px
        vertical-align: bottom
  .title
    width: 100%
    height: 40px
    margin-top: 20px
    .time-wrapper
      width: 1000px
      float: left
    .station-title
      float: left
      width: 100px
      text-align: center
      font-size: 14px
      color: #606266
  .stations
    display: flex
    height: 20px
    line-height: 20px
    margin-bottom: 15px
    .station-code
      flex: 0 0 100px
      text-align: center
      font-size: 14px
      color: #606266
    .timeline
      flex: 0 0 1000px
      height: 20px
      background: #8fBD8F
      position: relative
      .error
        position: absolute
        height: 20px
</style>
