<template>
  <div class="month-day">
    <div class="calendar">
      <ul class="week">
        <li v-for="wk in week" :key="wk">{{wk}}</li>
      </ul>
      <div class="day-wrapper">
        <div :class="['day', getCellClasses(day)]"
             v-for="(day, index) in monthDays"
             @click="go2DayMeeting(day)"
             :key="index">
          {{getDate(day)}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '@/assets/js/tools'
  const oneDay = 24 * 3600 * 1000
  const STATUS_COLOR = ['#a5a5a5', '#4fa7ff', '#66cc66']
  export default {
    name: 'month-in-year',
    components: {
    },
    props: {
      date: {
        type: Date,
        default: new Date()
      },
      meetingDates: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      startDate() {
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
        STATUS_COLOR,
        monthData: null,
        week: ['一', '二', '三', '四', '五', '六', '日']
      }
    },
    methods: {
      getCellClasses (day) {
        return {
          'calendar-other-month': day < this.month1st || day > this.monthLast,
          'calendar-today': this.isSameDay(day, new Date()),
          'calendar-has-meeting': this.meetingDates.some(date => {
            return new Date(date + ' 00:00:00').getTime() === day.getTime()
          })
        }
      },
      isSameDay (d1, d2) {
        return d1.toDateString() === d2.toDateString()
      },
      getDate(date) {
        return date.getDate()
      },
      go2DayMeeting(day) {
        if (this.meetingDates.some(date => new Date(date + ' 00:00:00').getTime() === day.getTime())) {
          this.$emit('go2Day', day)
        } else {
          return false
        }
      }
    },
    mounted() {
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .month-day
    width: 300px
    user-select: none
    .calendar
      width: 250px
      margin: 0 auto
      .week
        width: 100%
        height: 30px
        line-height: 30px
        display: flex
        font-size: 13px
        li
          flex: 1
          text-align: center
      .day-wrapper
        width: 100%
        display: flex
        flex-wrap: wrap
        .day
          width: calc(100% / 7)
          height: 25px
          line-height: 25px
          text-align: center
          font-size: 12px
        .calendar-other-month
          color: #aaa
        .calendar-today
          color: #ffffff
          font-weight: bold
          background: #5fa2dd
        .calendar-has-meeting
          background: #ffccaa
          cursor: pointer
</style>