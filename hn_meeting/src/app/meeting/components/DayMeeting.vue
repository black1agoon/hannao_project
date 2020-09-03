<template>
  <div class="day-wrapper">
    <div class="tools">
      <div class="goto el-icon-arrow-left" @click="go2PrevDay" title="上一天"></div>
      <div class="goto el-icon-arrow-right" @click="go2NextDay" title="下一天"></div>
    </div>
    <div class="date">{{today}}</div>
    <div class="meeting-wrapper">
      <div class="title" v-show="meetingList.length > 0">
        <div class="meeting-title">会议主题</div>
        <div class="meeting-room">会议室</div>
        <div class="time-wrapper">
          <time-line>
          </time-line>
        </div>
      </div>
      <div class="meetings-wrap">
        <div :class="['meeting', {current: currentIndex === index}]"
             v-for="(meeting, index) in meetingList"
             :key="index"
             @click="currentIndex = index">
          <div class="theme" :title="meeting.theme">{{meeting.theme}}</div>
          <div class="theme" :title="meeting.roomName">{{meeting.roomName}}</div>
          <div class="timeline">
            <div class="line" :title="getMeetingTitle(meeting.orderStartTime, meeting.orderEndTime)"
                 :style="getTimeStyle(meeting.orderStartTime, meeting.orderEndTime)"></div>
          </div>
        </div>
        <div v-if="meetingList.length === 0" class="nothing">当天无会议...</div>
      </div>
    </div>
  </div>
</template>

<script>
  import TimeLine from '@/components/common/tools/TimeLine'
  import {formatDate} from '@/assets/js/tools'

  const oneDay = 24 * 3600 * 1000
  export default {
    name: 'day-meeting',
    components: {
      TimeLine
    },
    props: {
      api: Function,
      date: {
        type: Date,
        default: new Date()
      },
      roomId: {
        type: String,
        default: null
      }
    },
    computed: {
      today() {
        let date = new Date(this.showDate)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let wk = date.getDay()
        return `${year}年${month}月${day}日  ${this.week[wk]}`
      },
      query() {
        return {
          page: 1,
          pageSize: 999,
          roomId: this.roomId,
          agencyId: this.$store.state.agencyId,
          date: formatDate(new Date(this.showDate), 'yyyy-MM-dd')
        }
      }
    },
    data() {
      return {
        // query: {}
        week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        meetingList: [],
        showDate: this.date,
        currentIndex: null
      }
    },
    methods: {
      getMeetingTitle(startTime, endTime) {
        return `会议时间:${startTime.substr(11, 5)}~${endTime.substr(11, 5)}`
      },
      getTimeStyle(startTime, endTime) {
        let start = new Date(startTime).getTime() / 1000
        let end = new Date(endTime).getTime() / 1000
        let nowday = new Date(formatDate(this.showDate, 'yyyy-MM-dd') + ' 00:00:00').getTime() / 1000
        let width = (end - start) / 86400 * 1000 > 1 ? (end - start) / 86400 * 1200 : 1
        return {
          left: (start - nowday) / 86400 * 100 + '%',
          width: width + 'px'
        }
      },
      getDayData() {
        this.$nextTick(() => {
          this.api(this.query).then(data => {
            this.meetingList = data && data.length > 0 ? data.sort((a, b) => {
              if (a.roomId > b.roomId) {
                return 1
              } else if (a.roomId < b.roomId) {
                return -1
              } else {
                return 0
              }
            }) : []
          })
        })
      },
      go2PrevDay() {
        this.showDate = new Date(this.showDate.getTime() - oneDay)
        this.getDayData()
      },
      go2NextDay() {
        this.showDate = new Date(this.showDate.getTime() + oneDay)
        this.getDayData()
      }
    },
    mounted() {
    },
    watch: {
      'date'() {
        this.showDate = this.date
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .day-wrapper
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    font-family: 'pingfang'
    .date
      flex: 0 0 20px
      padding-top: 20px
      font-size: 13px
      text-align: center
      font-weight: bold
    .tools
      position: absolute
      width: 100px
      top: 5px
      right: 5px
      background: #409eff
      height: 26px
      color: #ffffff
      border-radius: 3px
      cursor: pointer
      .goto
        width: 49px
        height: 26px
        line-height: 26px
        text-align: center
        transition: all .2s
        &:first-child
          border-right: 1px solid #eee
        &:hover
          background: #66b1ff
    .meeting-wrapper
      overflow: auto
      width: 100%
      height: calc(100% - 30px)
      .title
        flex: 0 0 30px
        width: 100%
        padding: 0 20px
        margin-top: 20px
        box-sizing: border-box
        height: 40px
        display: flex
        .meeting-title
          flex: 0 0 150px
          font-size: 14px
          color: #606266
          font-weight: bold
        .meeting-room
          flex: 0 0 150px
          font-size: 14px
          color: #606266
          font-weight: bold
        .time-wrapper
          flex: 0 0 1050px
      .meetings-wrap
        flex: 1
        .meeting
          padding: 0 20px
          display: flex
          height: 40px
          line-height: 40px
          &:hover
            .theme,.room,.timeline
              background: #eff7ff
          &.current
            .theme,.room,.timeline
              background: #eff7ff
          .theme
            flex: 0 0 150px
            font-size: 14px
            color: #606266
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            border-bottom: 1px solid #eee
          .room
            flex: 0 0 150px
            font-size: 14px
            color: #606266
            /*text-align: center*/
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            border-bottom: 1px solid #eee
          .timeline
            flex: 0 0 1050px
            height: 40px
            position: relative
            border-bottom: 1px solid #eee
            .line
              position: absolute
              top: 10px
              height: 20px
              background: rgba(143, 189, 143, .8)
              &:hover
                background: rgba(143, 189, 143, 1)
        .nothing
          margin-top: 30px
          font-size: 16px
          text-align: center
</style>
