<template>
  <div class="timeline-wrapper">
    <span class="arrow fa fa-chevron-left" @click="swiperPrev"></span>
    <swiper ref="swiper" class="timeline" :options="options">
      <div v-for="(day,index) in intervalDayList"
           :key="index"
           :class="['swiper-slide', 'day', {active: currentIndex === index}]"
           @click="swiperClick(index)"
      >
        <div class="time" v-if="!showdate">{{getCnMonthDay(day)}}</div>
        <el-date-picker
          class="date-picker"
          v-else
          ref="mydate"
          v-model="currentValue"
          :picker-options="pickerOptions"
          @change="datePickerChange"
          type="date"
          align="center"
          value-format="yyyy-MM-dd"
          :clearable="false"
          size="mini">
        </el-date-picker>
      </div>
    </swiper>
    <span class="arrow fa fa-chevron-right" @click="swiperNext"></span>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper} from 'vue-awesome-swiper'
  import {formatDate} from '@/assets/js/tools'
  import EuiInput from '@/components/common/form/EuiInput'
  const oneDay = 24 * 3600 * 1000
  export default {
    name: 'time-line',
    components: {
      EuiInput,
      swiper
    },
    props: {
      startTime: {
        type: String,
        default: formatDate(new Date(), 'yyyy-MM-dd')
      },
      endTime: {
        type: String,
        default: formatDate(new Date(), 'yyyy-MM-dd')
      }
    },
    computed: {
      swiper() {
        return this.$refs.swiper.swiper
      },
      intervalDayList() {
        let start = new Date(this.startTime)
        let end = new Date(this.endTime)
        let day = (end.getTime() - start.getTime()) / oneDay + 1 // 间隔天数
        // let list = [new Date(start.getTime())]
        let list = []
        for (let i = 0; i < day; i++) {
          list.push(new Date(start.getTime() + (i) * oneDay))
        }
        return list
      }
    },
    data() {
      return {
        showdate: false,
        currentValue: null,
        currentIndex: 0,
        pickerOptions: {
          disabledDate: time => {
            return time.getTime() > new Date(this.endTime).getTime() || time.getTime() < new Date(this.startTime).getTime()
          }
        },
        options: {
          initialSlide: 0,
          slidesPerView: 1,
          simulateTouch: false,
          spaceBetween: 20,
          centeredSlides: true
        }
      }
    },
    methods: {
      swiperClick() {
        this.showdate = true
        this.currentValue = formatDate(this.intervalDayList[this.currentIndex], 'yyyy-MM-dd')
      },
      getCnMonthDay(day) {
        return `${day.getMonth() + 1}月${day.getDate()}日`
      },
      swiperPrev() {
        this.showdate = false
        this.swiper.slidePrev()
        this.currentIndex = this.swiper.activeIndex
        this.$emit('dispatch', formatDate(this.intervalDayList[this.currentIndex], 'yyyy-MM-dd'))
      },
      swiperNext() {
        this.showdate = false
        this.swiper.slideNext()
        this.currentIndex = this.swiper.activeIndex
        this.$emit('dispatch', formatDate(this.intervalDayList[this.currentIndex], 'yyyy-MM-dd'))
      },
      datePickerChange(val) {
        this.currentValue = val
        let dayIndex = this.intervalDayList.findIndex(day => day.getTime() === new Date(this.currentValue + ' 08:00:00').getTime())
        this.swiper.slideTo(dayIndex, 0, false)
        this.currentIndex = dayIndex !== -1 ? dayIndex : 0
        this.showdate = false
        this.$emit('dispatch', formatDate(this.intervalDayList[this.currentIndex], 'yyyy-MM-dd'))
      },
      searchCurrentDay() {
        // let date = new Date()
        // let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        // console.log(today)
        // let dayIndex = this.intervalDayList.findIndex(day => `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}` === today)
        // console.log(dayIndex)
        // if (dayIndex === -1) {
        //   this.swiper.slideTo(0, 0, false)
        //   this.currentIndex = 0
        // } else {
        //   this.swiper.slideTo(dayIndex, 0, false)
        //   this.currentIndex = dayIndex
        // }
        let dayIndex = this.intervalDayList.findIndex(day => day.getTime() === new Date(this.endTime).getTime())
        this.swiper.slideTo(dayIndex, 0, false)
        this.currentIndex = dayIndex
      }
    },
    mounted() {
      // this.searchCurrentDay()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.timeline-wrapper
  width: 600px
  height: 30px
  margin: 0 auto
  .timeline
    width: 150px
    height: 30px
    line-height: 30px
    display: inline-block
    margin: 0 25px
    .swiper-slide
      margin: 0
      font-size: 14px
      cursor: pointer
      &.active
        color: #1989FA
  .date-picker
    width: 150px
  .arrow
    font-size: 16px
    line-height: 30px !important
    vertical-align: top
    cursor: pointer
    opacity: 0.45
    transition: all .5s
    &:hover
      opacity: 1
</style>
