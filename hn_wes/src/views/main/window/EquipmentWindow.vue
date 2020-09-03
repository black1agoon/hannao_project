<template>
  <window-box ref="window"
              :swiper="true"
              :page="eqQuery.page"
              :page-number="eqQuery.pageNumber"
              :current-page="eqQuery.page"
              @prev="prev"
              @next="next">
    <window-selection
        class="header"
        v-model="workshopId"
        slot="header"
        @change="selectionChange"
        :options="workshopOptions">
    </window-selection>
    <div class="container">
      <div class="equipment-box">
        <p class="label">设备总数</p>
        <p class="val">{{stationCount}}</p>
        <p class="unit">台</p>
      </div>
      <div class="employee-box">
        <div class="title">车间员工信息</div>
        <div class="table">
          <ul class="table-title">
            <li class="idx">序号</li>
            <li>姓名</li>
            <li>本日产量</li>
            <li>本月产量</li>
          </ul>
          <div class="table-content">
            <ul class="row" v-for="(spinner,index) in spinnerList" :key="index">
              <li class="idx">{{index + 1}}</li>
              <li>{{spinner.name}}</li>
              <li>{{spinner.dayNumber | setNumByThree}}</li>
              <li>{{spinner.monthNumber | setNumByThree}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="statusinfo-box">
        <div class="title">设备状态信息</div>
        <div :class="rowClasses" @animationend="slidingEnd">
          <ul class="table-title">
            <li>设备编号</li>
            <li>状态</li>
            <li>当前款号</li>
            <li>连续运行时间</li>
            <li>产量</li>
          </ul>
          <ul class="row"
              :class="{offline: eq.state === 3, error: eq.state === 2}"
              v-for="(eq, idx) in equipmentList"
              :key="idx">
            <li>{{eq.name}}</li>
            <li>{{status[eq.state - 1]}}</li>
            <li>{{eq.taskNumber}}</li>
            <li>{{eq.continuousTime}}</li>
            <li>{{eq.productNumber | setNumByThree}}</li>
          </ul>
        </div>
      </div>
    </div>
  </window-box>
</template>

<script>
  import WindowBox from './WindowBox'
  import {setNumberByThree} from '../../../assets/js/utils'
  import WindowSelection from './WindowSelection'
  import api from '@/api'
  export default {
    name: 'equipment-window',
    components: {
      WindowBox,
      WindowSelection
    },
    filters: {
      setNumByThree(num) {
        return setNumberByThree(num)
      }
    },
    computed: {
      rowClasses() {
        return {
          'window-slide-left': this.isSlidingLeft,
          'window-slide-right': this.isSlidingRight,
        }
      }
    },
    data() {
      return {
        workshopId: this.$store.state.workshopId,
        workshopOptions: [],
        spinnerList: [],
        stationCount: 0,
        eqQuery: {
          page: 1,
          pageSize: 11,
          workshopId: this.$store.state.workshopId,
          pageNumber: 1
        },
        equipmentList: [],
        status: ['生产中', '故障中', '未开机'],
        isSlidingLeft: false,
        isSlidingRight: false
      }
    },
    methods: {
      open() {
        this.getWorkshop().then(() => {
          this.getSpinnerCount()
          this.getStationCount()
          this.getStationDetail()
          this.$refs.window.open()
        })
      },
      close() {
        this.$refs.window.close()
      },
      prev() {
        this.eqQuery.page--
        this.isSlidingRight = true
        this.getStationDetail()
      },
      next() {
        this.eqQuery.page++
        this.isSlidingLeft = true
        this.getStationDetail()
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
              this.eqQuery.workshopId = this.workshopId
            }
          } else {
            this.workshopOptions = []
            this.workshopId = null
          }
        })
      },
      getStationCount() {
        api.jlw.getStationCount(this.workshopId).then(data => {
          this.stationCount = data ? data : 0
        })
      },
      getSpinnerCount() {
        api.jlw.getSpinnerCount(this.workshopId).then(data => {
          this.spinnerList = data.records
        })
      },
      getStationDetail() {
        api.jlw.getStationDetail(this.eqQuery).then(data => {
          this.equipmentList = data.records
          this.eqQuery.pageNumber = data.pages
        })
      },
      selectionChange(val) {
        this.workshopId = val
        this.eqQuery = {
          page: 1,
          pageSize: 11,
          workshopId: val
        }
        this.getSpinnerCount()
        this.getStationCount()
        this.getStationDetail()
      },
      slidingEnd() {
        this.isSlidingLeft = false
        this.isSlidingRight = false
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../../assets/stylus/scroll.styl'
  .header
    position: absolute
    left: 26px
    top: -57px
  .container
    height: 866px
    display: flex
    flex-wrap: wrap
    padding: 30px 80px 40px
    box-sizing: border-box
    .equipment-box
      position: absolute
      top: 57px
      left: 179px
      width: 475px
      height: 180px
      background: url("../../../assets/img/main/equipbox.png") no-repeat
      background-size: contain
      .label
        color: #81D5E5
        font-size: 24px
        margin: 23px 0 0 243px
      .unit
        position: absolute
        right: 51px
        bottom: 33px
        font-weight: bold
        color: #81D5E5
        font-size: 33px
      .val
        position: absolute
        width: 200px
        text-align: center
        top: 80px
        left: 190px
        font-size: 74px
        color: #81D5E5
        font-weight: bold
    .employee-box
      position: absolute
      top: 277px
      left: 179px
      width: 475px
      height: 543px
      background: url("../../../assets/img/main/empbox.png") no-repeat
      background-size: contain
      color: #8AEDFF
      padding: 0 45px
      box-sizing: border-box
      .title
        font-size: 26px
        line-height: 75px
        border-bottom: 2px solid #14CAEB
      .table
        .table-title
          font-size: 24px
        .table-content
          height: 360px
          overflow-y: auto
          &::-webkit-scrollbar
            display: none
          .row
            font-size: 20px
        .table-title, .row
          display: flex
          margin-top: 35px
          .idx
            flex: 0 0 55px
          li
            flex: 1
            text-align: center
    .statusinfo-box
      position: absolute
      left: 730px
      top: 35px
      width: 880px
      font-size: 20px
      overflow: hidden
      .title
        line-height: 73px
        font-size: 26px
        color: #8AEDFF
        border-bottom: 2px solid #14CAEB
      .table-title
        font-size: 26px
        margin: 35px 0 20px
      .table-title, .row
        display: flex
        color: #8AEDFF
        li
          flex: 1
          text-align: center
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
      .row
        height: 46px
        line-height: 46px
        margin-top: 10px
        &.error
          color: #ffffff
          background: linear-gradient(90deg, rgba(255, 93, 117, .5) 0%, rgba(128, 47, 59, .1) 100%)
        &.offline
          color: #FF5D75
</style>