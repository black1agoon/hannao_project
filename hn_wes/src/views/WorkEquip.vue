<template>
  <div class="board-wrapper">
    <selection class="selection"
               v-model="workshopId"
               @change="selectionChange"
               :options="workshopOptions">
    </selection>
    <div class="box-wrap">
      <ul class="status">
        <li>
          <i class="normal"></i>正常
        </li>
        <li>
          <i class="offline"></i>断网
        </li>
        <li>
          <i class="error"></i>故障
        </li>
      </ul>
      <ul class="left-container">
        <li class="device"
            :tabindex="index"
            @click="setCurrent((rowsCount >= 11 ? (rowsCount - 11 + 1) * 3 + index : index))"
            :style="{visibility: device.stationId ? 'visible' : 'hidden'}"
            :class="[deviceClass(device.state), {active: currentIndex === (rowsCount >= 11 ? (rowsCount - 11 + 1) * 3 + index : index)}]"
            v-for="(device, index) in viewList"
            :key="index">
          <div class="pNum">
            <p class="num">{{device.productNumber}}</p>
            <p class="text">当前产量</p>
          </div>
          <div class="no">{{device.productNo}}</div>
          <div class="code">{{device.stationName}}</div>
        </li>
      </ul>
      <div class="right-top-container">
        <div class="box no">
          <p class="value">{{stationDetail.productNo}}</p>
          <p class="text">当前生产款号</p>
        </div>
        <div class="box time">
          <p class="value">{{stationDetail.onlineDayTime ? stationDetail.onlineDayTime : 0}}<span class="unit">h</span></p>
          <p class="text">连续运行时间</p>
        </div>
        <div class="box efficiency">
          <p class="value">{{stationDetail.persont  ? stationDetail.persont : 0}}<span class="unit">%</span></p>
          <p class="text">综合设备效率</p>
        </div>
      </div>
      <div class="right-bottom-container">
        <div class="detail">
          <p class="station-name">{{stationDetail.stationName}}</p>
          <p class="no">{{stationDetail.stationCode}}</p>
          <div class="user">
            <img v-if="stationDetail.spinnerPicture" class="avatar" :src="getImgSrc(stationDetail.spinnerPicture)"/>
            <img v-else class="avatar" src="../assets/img/defaultavatar.png"/>
            <div class="info">
              <p class="name">{{stationDetail.spinnerName}}</p>
              <p class="text">设备负责人</p>
            </div>
          </div>
          <p class="title">日/月产量</p>
          <p class="value">
            <span class="val">{{stationDetail.dayNumber}}</span>/{{stationDetail.monthNumber}}
          </p>
        </div>
        <div class="day-wrap">
          <ul class="daybox">
            <li :class="{today: index === 0}" v-for="(day, index) in dayview" :key="index">
              <p class="intro" :class="{first: index === 0, other: index !==0 && index < 3}">{{DAY_LIST[index]}}</p>
              <p class="date">{{getDate(index)}}</p>
            </li>
          </ul>
          <div class="order-mask" :style="{width: dayPercent}">
            <p class="no">{{stationDetail.productNo}}</p>
            <p class="num" v-if="stationDetail.prospectusNumber">
              <span class="done">{{stationDetail.productNumber}}</span><span class="sum">/{{stationDetail.prospectusNumber}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">浙江汉脑数码科技有限公司版权所有</div>
  </div>
</template>

<script>
  import api from '@/api'
  import Selection from '../components/common/Selection'
  import {formatDate, getImgSrc} from '../assets/common/util'

  const DAY = 24 * 60 * 60 * 1000
  const DAY_LIST = ['今天', '明天', '后天']
  export default {
    name: 'work-quip',
    components: {
      Selection
    },
    computed: {
      dayview() {
        if (this.endDate) {
          let today = new Date(formatDate(new Date(), 'yyyy-MM-dd') + ' 00:00:00')
          let endday = new Date(this.endDate)
          let day_num = Math.ceil((endday.getTime() - today.getTime()) / DAY)
          return day_num > 7 ? 7 : day_num
        } else {
          return 0
        }
      },
      dayLast() {
        if (this.endDate) {
          let today = new Date(formatDate(new Date(), 'yyyy-MM-dd') + ' 00:00:00')
          let endday = new Date(this.endDate)
          let day_num = Math.ceil((endday.getTime() - today.getTime()) / DAY)
          return day_num
        } else {
          return 0
        }
      },
      dayPercent() {
        if (this.dayLast > 7) {
          return '100%'
        } else if (this.endDate) {
          let endday = new Date(this.endDate)
          let hour = endday.getHours()
          let min = endday.getMinutes()
          let sec = endday.getSeconds()
          let dayRatio = (hour * 60 * 60 * 1000 + min * 60 * 1000 + sec * 1000) / DAY
          if (this.dayview > 1) {
            return (100 / (this.dayview + 1) * (dayRatio + 2 + this.dayview - 2)).toFixed(2) + '%'
          } else {
            return (dayRatio * 100).toFixed(2) + '%'
          }
        } else {
          return '0%'
        }
      },
      viewList() {
        if (this.rowsCount >= 11) {
          let list = this.deviceList.slice((this.rowsCount - 11 + 1) * 3, 33 + (this.rowsCount - 11 + 1) * 3)
          return list.concat(Array.from({length: 33 - list.length}, () => ({})))
        } else {
          return this.deviceList.slice(0, 33)
        }
      },
      rowsCount() {
        return parseInt(this.currentIndex / 3)
      }
    },
    data() {
      return {
        getImgSrc,
        DAY_LIST,
        timer: null,
        swipertimer: null,
        workshopOptions: [],
        workshopId: this.$store.state.workshopId,
        stationId: null,
        deviceList: [],
        currentIndex: 0,
        currentLength: 0,
        stationDetail: {},
        endDate: null
      }
    },
    methods: {
      getDate(day) {
        let date = new Date((new Date().getTime() + DAY * day))
        return `${date.getMonth() + 1}.${date.getDate()}`
      },
      deviceClass(state) {
        let list = ['normal', 'error', 'offline']
        return list[state]
      },
      setCurrent(index) {
        this.currentIndex = index
        this.stationId = this.deviceList[this.currentIndex].stationId ? this.deviceList[this.currentIndex].stationId : null
        this.stationId && this.getStationInfo()
      },
      getWorkshop() {
        return api.jlw.getWorkshopListDetail().then(data => {
          if (data && data.length > 0) {
            this.workshopOptions = data.map(ws => ({
              label: ws.name + '车间',
              value: ws.id
            }))
            if (!this.workshopId) {
              this.workshopId = this.workshopOptions[0].value
            }
          } else {
            this.workshopOptions = []
            this.workshopId = null
          }
        })
      },
      getWorkshopDeviceShow() {
        return api.jlw.getWorkshopDeviceShow(this.workshopId).then(data => {
          if (data && data.length > 0) {
            this.deviceList = data.concat(Array.from({length: 33 - data.length}, () => ({})))
            this.stationId = this.deviceList[0].stationId
            this.currentLength = data.length
          } else {
            this.deviceList = []
            this.stationId = null
            this.currentLength = 0
          }
        })
      },
      getStationInfo() {
        api.jlw.getStationInfo(this.stationId).then(data => {
          this.stationDetail = data || {}
          this.endDate = data ? data.endDate : null
          // this.endDate = '2020-03-18 12:00:00'
        })
      },
      selectionChange(val) {
        this.$store.commit('SET_WORKSHOPID', val)
        window.localStorage.setItem('workshopId', val)   // 保存选择的车间到本地

        this.getWorkshopDeviceShow().then(() => {
          this.stationId && this.getStationInfo()
        })
      },
      swiperCurrentIndex() {
        clearInterval(this.swipertimer)
        if (this.currentLength > 1) {
          this.swipertimer = setInterval(() => {
            ++this.currentIndex
            // console.log(this.currentIndex)
            if (this.currentIndex === this.currentLength) {
              this.currentIndex = 0
            }
            this.stationId = this.deviceList[this.currentIndex].stationId ? this.deviceList[this.currentIndex].stationId : null
            this.stationId && this.getStationInfo()
          }, 20 * 1000)
        }
      }
    },
    mounted() {
      this.getWorkshop().then(() => {
        this.getWorkshopDeviceShow().then(() => {
          this.stationId && this.getStationInfo()
          this.swiperCurrentIndex()
        })
      })
      // setTimeout(() => {
      //   this.$router.push('/ranklist')
      // }, 10 * 60 * 1000)
    },
    destroyed() {
      clearInterval(this.timer)
      clearInterval(this.swipertimer)
    },
    watch: {
      'currentLength'() {
        this.currentIndex = 0
        this.swiperCurrentIndex()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../assets/stylus/scroll.styl'
  .board-wrapper
    position: absolute
    width: 1920px
    height: 1080px
    background-image: url("../assets/img/bg-workequip.png")
    background-size: 1920px 1080px
    background-repeat: no-repeat
    overflow: hidden
    .copyright
      position: absolute
      bottom: 23px
      right: 69px
      font-family: 'HYWenHei'
      font-size: 20px
      color: #00DEFF
    .selection
      position: absolute
      top: 10px
      right: 100px
    .box-wrap
      width: 1920px
      height: 1080px
      .status
        position: absolute
        top: 85px
        left: 100px
        display: flex
        li
          color: #ffffff
          font-size: 24px
          margin: 0 10px
          i
            display: inline-block
            width: 14px
            height: 14px
            margin-right: 10px
            &.normal
              background: #00FFFF
            &.offline
              background: #E47A3A
            &.error
              background: #E43A41
      .left-container
        position: absolute
        top: 127px
        left: 38px
        width: 1078px
        height: 885px
        background-image: url("../assets/img/workequipbox1.png")
        background-size: 1078px 885px
        background-repeat: no-repeat
        display: flex
        flex-wrap: wrap
        justify-content: space-around
        /*overflow: hidden*/
        .device
          width: 320px
          height: 88px
          background-size: 320px 88px
          background-repeat: no-repeat
          display: flex
          justify-content: space-between
          align-items: center
          margin: 0 0 -10px 0
          .pNum
            margin-left: 55px
            .num
              font-family: Teko-Regular
              font-size: 36px
            .text
              color: #00FFFF
              font-size: 12px
          .no
            color: rgba(255, 255, 255, .75)
            font-size: 22px
          .code
            margin-right: 25px
            font-family: Teko-Regular
            transform: rotate(-45deg)
            font-size: 30px
          &.normal
            background-image: url("../assets/img/normal.png")
            .pNum
              .num
                color: #ffffff
              .text
                color: #00FFFF
            .code
              color: #00FFFF
          &.offline
            background-image: url("../assets/img/offline.png")
            .pNum
              .num
                color: #E47A3A
              .text
                color: rgba(255, 255, 255, .75)
            .code
              color: #E47A3A
          &.error
            background-image: url("../assets/img/error.png")
            .pNum
              .num
                color: #E43A41
              .text
                color: rgba(255, 255, 255, .75)
            .code
              color: #E43A41
          &.active.offline
            background-image: url("../assets/img/offline2.png")
          &.active.normal
            background-image: url("../assets/img/normal2.png")
          &.active.error
            background-image: url("../assets/img/error2.png")
      .right-top-container
        position: absolute
        top: 127px
        right: 37px
        width: 739px
        height: 466px
        background-image: url("../assets/img/workequipbox2.png")
        background-size: 739px 466px
        background-repeat: no-repeat
        .box
          position: absolute
          width: 125px
          height: 74px
          text-align: center
          .value
            color: #ffffff
            font-size: 34px
            font-family: Teko-Regular
            .unit
              font-size: 21px
          .text
            color: #00FFFF
            font-size: 14px
          &.no
            top: 211px
            left: 92px
            padding-top: 12px
          &.time
            top: 87px
            left: 526px
            padding-top: 10px
          &.efficiency
            width: 120px
            top: 278px
            left: 507px
            padding-top: 6px
      .right-bottom-container
        position: absolute
        top: 621px
        right: 37px
        width: 739px
        height: 391px
        background-image: url("../assets/img/workequipbox3.png")
        background-size: 739px 391px
        background-repeat: no-repeat
        .detail
          width: 176px
          text-align: center
          .station-name
            margin-top: 43px
            font-size: 64px
            color: #00FFFF
            font-family: Teko-Regular
          .no
            margin: 20px 0 10px 0
            font-size: 40px
            color: #00FFFF
            font-family: Teko-Regular
          .user
            margin-bottom: 30px
            .avatar
              width: 52px
              height: 52px
              border-radius: 50%
              overflow: hidden
              border: 2px solid #2DB8B8
            .info
              display: inline-block
              vertical-align: top
              margin-left: 5px
              .name
                margin: 7px 0 3px 0
                color: rgba(255, 255, 255, .8)
                font-size: 24px
              .text
                font-size: 14px
                color: rgba(255, 255, 255, .5)
          .title
            font-size: 17px
            color: rgba(255, 255, 255, .5)
            margin-bottom: 10px
          .value
            margin: 8px 0 25px 0
            font-family: Teko-Regular
            font-size: 24px
            color: rgba(255, 255, 255, .8)
            .val
              color: #FFDE00
              font-size: 36px
              vertical-align: text-bottom
        .day-wrap
          position: absolute
          top: 31px
          right: 32px
          width: 530px
          height: 330px
          border: 2px solid rgba(11, 51, 99, 1)
          .order-mask
            position: absolute
            top: 0
            left: 0
            height: 189px
            background: rgba(255, 222, 0, .3)
            .no
              margin: 17px 0 0 15px
              color: #ffffff
              font-size: 24px
            .num
              margin: 10px 0 0 15px
              .done
                font-size: 26px
                color: #FFDE00
              .sum
                font-size: 20px
                color: #D2D2D2
          .daybox
            display: flex
            width: 530px
            height: 330px
            .today
              flex: 2
            li
              flex: 1
              position: relative
              &:nth-of-type(2n + 1)
                background: rgba(1, 218, 222, .15)
              .date
                position: absolute
                width: 100%
                text-align: center
                bottom: 10px
                color: rgba(255, 255, 255, .6)
                font-size: 14px
              .intro
                position: absolute
                left: 5%
                bottom: 111px
                font-size: 16px
                &.first
                  color: #FFDE00
                &.other
                  color: rgba(255, 222, 0, .4)
</style>