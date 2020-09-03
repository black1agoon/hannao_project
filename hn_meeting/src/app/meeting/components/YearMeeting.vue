<template>
  <div class="year-wrapper">
    <div class="month" v-for="(num, index) in 12" :key="index">
      <div class="name">{{MONTH[index]}}</div>
      <month-in-year
          @go2Day="go2Day"
          :date="getDate(index)"
          :meeting-dates="meetingDates[index]">
      </month-in-year>
    </div>
  </div>
</template>

<script>
  import MonthInYear from './common/MonthInYear'

  const MONTH = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  export default {
    name: 'year-meeting',
    components: {
      MonthInYear
    },
    props: {
      roomId: {
        type: String,
        default: null
      },
      api: Function
    },
    data() {
      let date = new Date()
      return {
        MONTH,
        currentYear: date.getFullYear(),
        meetingDates: []
        // meetingDates: [[], ['2019-02-11', '2019-02-20', '2019-02-28'], [], [], ['2019-05-11', '2019-05-20'], [], [], [], [], [], [], []]
      }
    },
    methods: {
      getDate(index) {
        return new Date(this.currentYear, index)
      },
      getYearData() {
        this.$nextTick(() => {
          this.api({
            agencyId: this.$store.state.agencyId,
            page: 1,
            roomId: this.roomId,
            pageSize: 999,
            year: this.currentYear
          }).then(data => {
            if (data && data.length > 0) {
              this.meetingDates = data
            }
          })
        })
      },
      go2Day(day) {
        this.$emit('go2DayMeeting', day)
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .year-wrapper
    display: flex
    /*min-width: 1200px*/
    flex-wrap: wrap
    justify-content: space-around
    padding-top: 30px
    background: #ffffff
    .month
      margin-bottom: 30px
      background: #ffffff
      .name
        font-weight: bold
        margin: 5px 25px
</style>