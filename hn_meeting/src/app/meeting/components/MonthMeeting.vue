<template>
  <div class="month-day">
    <month-picker class="month-picker" @selectDate="go2Date">
    </month-picker>
    <div class="calendar">
      <ul class="week">
        <li v-for="wk in week" :key="wk">{{wk}}</li>
      </ul>
      <div class="day-wrapper">
        <div :class="['day', getCellClasses(day)]" v-for="(day, index) in monthDays" :key="index">
          <div class="day-num" @click="go2DayMeeting(day)">{{getDate(day)}}</div>
          <div class="meetings-wrap">
            <el-tooltip :open-delay="700" :offset="60" :visible-arrow="false" placement="bottom-start" effect="light" v-for="meeting in getEveryDayMeetings(day)" :key="meeting.id">
              <div slot="content" style="line-height: 16px">时间:{{getMeetingTimeStr(day, meeting)}}<br/>主题:{{meeting.theme}}<br/>会议室:{{meeting.roomName}}</div>
              <div :class="['meeting', 'bg' + meeting.status]" @click="meetingClick(meeting)">
                <div :class="['status', 'type' + meeting.status]"></div>
                <div class="time">{{meeting.meetingTime}}</div>
                <div class="theme">{{meeting.theme}}</div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MonthPicker from './common/MonthPicker'
  import {formatDate} from '@/assets/js/tools'
  const oneDay = 24 * 3600 * 1000
  export default {
    name: 'month-meeting',
    components: {
      MonthPicker
    },
    props: {
      roomId: {
        type: String,
        default: null
      },
      api: Function,
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      startDate() {
        return this.date
      },
      selectedDate() {
        return this.date
      },
      year() { // 当前年
        return this.startDate.getFullYear()
      },
      month () { // 当前月
        return this.startDate.getMonth()
      },
      month1st () {  // 当前年月，第一天obj
        return new Date(this.year, this.month, 1)
      },
      monthLast () {  // 当前年月，最后一天obj
        return new Date(this.year, this.month + 1, 0)
      },
      firstDay () {
        const wd = this.month1st.getDay()  // 当前月第一天星期几
        return new Date(this.year, this.month, 2 - wd).getTime()
      },
      lastDay () {
        return new Date(this.firstDay + oneDay * 41).getTime()
      },
      monthDays () {
        return Array(42).fill(0).map((w, j) => {
          const d = new Date(this.firstDay + oneDay * j)
          return d
        })
      }
    },
    data() {
      return {
        agencyId: this.$store.state.agencyId,
        date: new Date(),
        monthData: null,
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        // startDate: this.date,
        // selectedDate: this.date
      }
    },
    methods: {
      go2Date(date) {
        this.date = new Date(date)
      },
      getCellClasses (day) {
        return {
          'calendar-other-month': day < this.month1st || day > this.monthLast,
          // 'calendar-selected': this.isSameDay(day, this.selectedDate),
          // 'calendar-sunday': !day.getDay(),
          // 'calendar-saturday': day.getDay() === 6,
          'calendar-today': this.isSameDay(day, new Date()),
        }
      },
      isSameDay (d1, d2) {
        return d1.toDateString() === d2.toDateString()
      },
      getDate(date) {
        return date.getDate()
      },
      getMonthData() {
        this.$nextTick(() => {
          this.api({
            agencyId: this.agencyId,
            roomId: this.roomId,
            startDate: formatDate(new Date(this.firstDay), 'yyyy-MM-dd'),
            endDate: formatDate(new Date(this.lastDay), 'yyyy-MM-dd')
          }).then(data => {
            this.monthData = Object.keys(data).length > 0 ? data : {}
          })
        })
      },
      getEveryDayMeetings(day) {
        return this.monthData ? this.monthData[formatDate(day, 'yyyy-MM-dd')] : []
      },
      getMeetingTimeStr(date, meeting) {
        let month = date.getMonth() + 1
        let day = date.getDate()
        let wk = date.getDay() || 7
        // let meet = Object.keys(meeting).length > 0 ? meeting : {}
        return `${month}月${day}日 (${this.week[wk - 1]}) ${meeting.orderStartTime.substr(11, 5)} - ${meeting.orderEndTime.substr(11, 5)}`
      },
      meetingClick(meeting) {
        if (meeting.isJoin === 0 && !this.isAdmin) {
          this.$message({
            message: '非参与者，不能查看会议详情!',
            type: 'warning'
          })
        } else {
          this.$emit('meetingClick', {...meeting})
        }
      },
      go2DayMeeting(day) {  // 去<日>页
        this.$emit('go2DayMeeting', day)
      }
    },
    mounted() {
      // console.log(this.firstDay, this.lastDay)
      // this.getMonthData()
    },
    watch: {
      'firstDay' () {
        this.getMonthData()
        // console.log(this.firstDay, this.lastDay)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.month-day
  min-width: 1000px
  height: 100%
  user-select: none
  display: flex
  flex-direction: column
  font-family: 'pingfang'
  .month-picker
    flex: 0 0 40px
  .calendar
    flex: 1
    overflow: hidden
    .week
      width: 100%
      height: 30px
      line-height: 30px
      border-top: 1px solid #efefef
      display: flex
      font-size: 14px
      li
        flex: 1
        text-align: center
        &:last-child
          border-right: 1px solid #efefef
    .day-wrapper
      width: 100%
      height: calc(100% - 32px)
      /*min-height: 600px*/
      display: flex
      flex-wrap: wrap
      border-top: 1px solid #F9F9F9
      .day
        width: calc(100% / 7 - 1px)
        height: calc(100% / 6 - 1px)
        border-bottom: 1px solid #efefef
        border-right: 1px solid #efefef
        .day-num
          cursor: pointer
          color: #bbbbbb
          height: 20px
          text-align: right
          font-size: 20px
          margin-right: 5px
        .meetings-wrap
          height: calc(100% - 20px)
          overflow-y: auto
          .meeting
            display: flex
            font-size: 13px
            /*border-bottom: 1px solid #efefef*/
            line-height: 18px
            margin-bottom: 2px
            position: relative
            overflow-x: hidden
            &.bg0
              background: #f2fbf5
            &.bg1
              background: #f0f7ff
            &.bg2
              background: #fffaee
            &.bg4
              background: #f8f8f8
            &:hover
              background: #efefef
              cursor: pointer
            .status
              flex: 0 0 4px
              margin-right: 5px
              &.type0
                background: #58cb7d
              &.type1
                background: #409eff
              &.type2
                background: #f9c22d
              &.type4
                background: #bbbbbb
            .time
              flex: 0 0 40px
            .theme
              flex: 1
              white-space: nowrap
      .calendar-other-month
        background: #F9F9F9
        .day-num
          color: #aaa
      .calendar-today
        background: #FFF1F1

</style>