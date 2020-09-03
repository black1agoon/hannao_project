<template>
  <div class="month-wrapper" ref="month">
    <div class="label">月份选择</div>
    <div class="prev fa fa-angle-left" @click="prevMonth"></div>
    <div class="value" @click="showChoose">{{year}}年{{month}}月</div>
    <div class="next fa fa-angle-right" @click="nextMonth"></div>
    <div class="month-choose" v-show="show">
      <div class="date">
        <div class="left">
          <div class="arrows">
            <span @click="prevYear" class="year-prev fa fa-angle-left"></span>
            <span @click="nextYear" class="year-next fa fa-angle-right"></span>
          </div>
          <div class="year-wrap">
            <div @click="setYear(year)" @dblclick="sure" :class="['year', {active: activeYear === year}]" v-for="year in yearList" :key="year">{{year}}</div>
          </div>
        </div>
        <div class="right">
          <div @click="setMonth(mon.value)" @dblclick="sure" :class="['month', {active: activeMonth === mon.value}]" v-for="mon in MONTH"
               :key="mon.value">{{mon.label}}
          </div>
        </div>
      </div>
      <div class="buttons">
        <el-button type="primary" size="mini" @click="sure">确定</el-button>
        <el-button size="mini" @click="cancel">关闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  const MONTH = [
    {
      label: '一',
      value: 1
    }, {
      label: '二',
      value: 2
    }, {
      label: '三',
      value: 3
    }, {
      label: '四',
      value: 4
    }, {
      label: '五',
      value: 5
    }, {
      label: '六',
      value: 6
    }, {
      label: '七',
      value: 7
    }, {
      label: '八',
      value: 8
    }, {
      label: '九',
      value: 9
    }, {
      label: '十',
      value: 10
    }, {
      label: '十一',
      value: 11
    }, {
      label: '十二',
      value: 12
    }
  ]
  export default {
    name: 'month-picker',
    computed: {
      yearList() {
        return  Array(10).fill(this.year + this.pageYear * 10 - 4).map((v, i) => v + i)
      }
    },
    data() {
      const date = new Date()
      return {
        MONTH,
        monthValue: null,
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        show: false,
        activeYear: date.getFullYear(),
        activeMonth: date.getMonth() + 1,
        pageYear: 0
      }
    },
    methods: {
      showChoose() {
        this.show = true
        this.pageYear = 0
      },
      prevMonth() {
        let prevDate = new Date(this.year, this.month - 2)
        this.year = this.activeYear = prevDate.getFullYear()
        this.month = this.activeMonth = prevDate.getMonth() + 1
        this.cancel()
        this.sure()
      },
      nextMonth() {
        let nextDate = new Date(this.year, this.month)
        this.year = this.activeYear = nextDate.getFullYear()
        this.month = this.activeMonth = nextDate.getMonth() + 1
        this.cancel()
        this.sure()
      },
      prevYear() {
        this.pageYear--
      },
      nextYear() {
        this.pageYear++
      },
      setMonth(month) {
        this.activeMonth = month
      },
      setYear(year) {
        this.activeYear = year
      },
      sure() {
        this.year = this.activeYear
        this.month = this.activeMonth
        // console.log(`${this.year}-${this.month}`)
        this.cancel()
        this.$emit('selectDate', `${this.year}-${this.month}`)
      },
      cancel() {
        this.show = false
      },
      judge(event) {
        let e = event || window.event
        let bubbling = (ele) => {
          if (ele.classList.contains('month-wrapper')) {
            return
          } else if (ele.parentElement) {
            bubbling(ele.parentElement)
          } else if (!ele.parentElement) {
            this.show = false
          }
        }
        bubbling(e.target)
      }
    },
    mounted() {
      document.addEventListener('click', this.judge)
    },
    destroyed() {
      document.removeEventListener('click', this.judge)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .month-wrapper
    display: flex
    width: 250px
    height: 40px
    justify-content: space-around
    align-items: center
    position: relative
    z-index: 10
    user-select: none
    margin-left: 20px
    .label
      display: inline-block
      font-size: 13px
    .value
      width: 80px
      text-align: center
      font-size: 14px
      color: #008df6
      cursor: pointer
    .prev, .next
      color: rgba(0, 141, 246, .8)
      cursor: pointer
      text-align: center
      font-size: 20px
      padding: 0 15px
      position: relative
      &:hover
        font-weight: bold
        color: rgba(0, 141, 246, 1)
    /*.prev:after*/
      /*content: ''*/
      /*display: inline-block*/
      /*position: absolute*/
      /*left: 0*/
      /*top: 4px*/
      /*width: 1px*/
      /*height: 13px*/
      /*background: #aaa*/
    /*.next:after*/
      /*content: ''*/
      /*display: inline-block*/
      /*position: absolute*/
      /*right: 0*/
      /*top: 4px*/
      /*width: 1px*/
      /*height: 13px*/
      /*background: #aaa*/
    .month-choose
      position: absolute
      z-index: 10
      border: 1px solid #eee
      width: 180px
      height: 220px
      top: 30px
      right: 0
      background: #fff
      .date
        width: 100%
        height: 180px
        display: flex
        .left
          flex: 1
          border-right: 1px solid #eee
          border-bottom: 1px solid #eee
          .arrows
            display: flex
            justify-content: space-around
            .year-prev, .year-next
              width: 29px
              height: 29px
              line-height: 29px
              cursor: pointer
              text-align: center
              &:hover
                color: #4fa7ff
          .year-wrap
            height: 150px
            display: flex
            flex-direction: column
            flex-wrap: wrap
            justify-content: space-between
            align-content: space-between
            .year
              font-size: 14px
              width: 49%
              box-sizing: border-box
              line-height: 21px
              text-align: center
              flex: 0 0 21px
              margin: 4px 0
              &.active
                color: #ffffff
                background: #4fa7ff
              &:hover
                color: #4fa7ff
                background: #ddecfe
        .right
          flex: 1
          border-bottom: 1px solid #eee
          display: flex
          flex-direction: column
          flex-wrap: wrap
          justify-content: space-between
          align-content: space-between
          .month
            font-size: 14px
            width: 49%
            box-sizing: border-box
            line-height: 21px
            text-align: center
            flex: 0 0 21px
            margin: 4px 0
            &.active
              color: #ffffff
              background: #4fa7ff
            &:hover
              color: #4fa7ff
              background: #ddecfe
      .buttons
        text-align: center
        padding: 5px
        box-sizing: border-box
</style>