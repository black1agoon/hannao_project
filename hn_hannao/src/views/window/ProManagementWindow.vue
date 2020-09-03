<template>
  <div class="window" v-show="show">
    <div class="content">
      <div class="maintitle">防伪标识解析</div>
      <i class="close" @click="close"></i>
      <div class="outside">
        <div class="num-box box1">
          <i class="icon"></i>
          <p class="text">设备数</p>
          <p class="num">{{outsideData.equimentCout | setThree}}</p>
        </div>
        <div class="num-box box2">
          <i class="icon"></i>
          <p class="text">APP用户数</p>
          <p class="num">******</p>
        </div>
        <div class="num-box box3">
          <i class="icon"></i>
          <p class="text">产品数</p>
          <p class="num">{{outsideData.productCount | setThree}}</p>
        </div>
        <div class="left left1">
          <div class="title">
            <i></i>
            服务企业
          </div>
          <p class="num">{{outsideData.companyCount | setThree}}<span class="unit">个</span></p>
          <img src="../../assets/img/window/fuwuqiye.png"/>
        </div>
        <div class="left left2">
          <div class="title">
            <i></i>
            防伪标识数
          </div>
          <p class="num">{{outsideData.cardCount | setThree}}<span class="unit">个</span></p>
          <img src="../../assets/img/window/fangweibiaoshi.png"/>
        </div>
      </div>
      <div class="ranklist">
        <div class="title">企业标识使用排行</div>
        <ul class="table-title">
          <li class="name">名称</li>
          <li class="num">数量</li>
        </ul>
        <div class="scroll-box">
          <ul class="scroll" :style="scroll">
            <li class="item" v-for="(company, index) in ranklist"
              :key="index">
              <div class="index">
                <div v-if="company.index < 3" class="top3" :class="'rank' + company.index"></div>
                <div v-else class="rank">{{company.index + 1}}</div>
              </div>
              <div class="name">{{company.companyName}}</div>
              <div class="num">{{company.count | setThree}}</div>
            </li>
          </ul>
        </div>
      </div>
      <charts-view class="charts" :options="chartOptions">
      </charts-view>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {setNumberByThree} from '../../assets/common/util'
  import ChartsView from '../../components/common/ChartsView'
  import {ANTIFAKE} from '../board.config'
  export default {
    name: 'pro-management-window',
    filters: {
      setThree(num) {
        return setNumberByThree(num)
      }
    },
    components: {
      ChartsView
    },
    computed: {
      scroll() {
        return this.ranklist.length > 10 ? {
          animationDuration: `${this.ranklist.length * 1.5}s`
        } : {}
      }
    },
    data() {
      return {
        show: false,
        ranklist: [],
        outsideData: {},
        chartOptions: ANTIFAKE
      }
    },
    methods: {
      open() {
        this.getCompanyRank()
        this.getOutsideData()
        this.getProCharts()
        this.show = true
      },
      close() {
        this.show = false
      },
      getCompanyRank() {
        api.idsProductManagement.getCompanyRank().then(data => {
          if (data && data.records.length > 10) {
            this.ranklist = data.records.map((company, idx) => ({
              index: idx,
              ...company
            }))
            this.ranklist = this.ranklist.concat(this.ranklist)
          } else if (data && data.records.length <= 10) {
            this.ranklist = data.records
            this.ranklist = this.ranklist.map((company, idx) => ({
              index: idx,
              ...company
            }))
          } else {
            this.ranklist = []
          }
        })
      },
      getOutsideData() {
        api.idsProductManagement.getOutsideData().then(data => {
          this.outsideData = data ? data : {}
        })
      },
      getProCharts() {
        api.idsProductManagement.getProCharts().then(data => {
          this.chartOptions.xAxis[0].data = data.cardDayUsedStaticsList.map(m => m.day.substr(0, 10))
          this.chartOptions.series[0].data = data.cardDayUsedStaticsList.map(data => data.usedCount)
          this.chartOptions.series[1].data = data.mssUserDayRegStaticsList.map(data => data.regCount)
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../assets/stylus/animation.styl'
  .window
    position: relative
    z-index: 100
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, .8)
    .content
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      width: 1824px
      height: 869px
      background: rgba(2, 45, 154, .87)
      &:before
        display: block
        content: ''
        width: 1824px
        height: 1px
        background: rgba(14, 0, 130, 1)
        border-top: 2px solid
        border-image: linear-gradient(90deg, rgba(0, 255, 255, 1), rgba(6, 7, 76, 1), rgba(0, 0, 2, 1), rgba(6, 7, 76, 1), rgba(0, 255, 255, 1)) 2 2
      .maintitle
        font-family: HYWenHei
        margin-top: -15px
        font-size: 30px
        color: #ffffff
        text-align: center
      .close
        position: absolute
        right: -10px
        top: -53px
        cursor: pointer
        display: block
        width: 52px
        height: 51px
        background-image: url("../../assets/img/window/close.png")
        background-size: 52px 51px
        background-repeat: no-repeat
      .outside
        .num-box
          position: absolute
          top: 75px
          width: 230px
          height: 123px
          background-image: url("../../assets/img/window/box_num.png")
          background-size: 230px 123px
          background-repeat: no-repeat
          .icon
            display: inline-block
            background-repeat: no-repeat
            margin: 14px 0 0 14px
          .text
            position: absolute
            top: 20px
            left: 60px
            color: #ffffff
            font-size: 26px
          .num
            font-size: 63px
            color: #FFDE00
            text-align: right
            font-family: Teko-Regular
            margin-right: 20px
          &.box1
            left: 432px
            .icon
              width: 38px
              height: 38px
              background-image: url("../../assets/img/window/shebeie.png")
              background-size: 38px 38px
          &.box2
            left: 703px
            .icon
              width: 39px
              height: 39px
              background-image: url("../../assets/img/window/user.png")
              background-size: 39px 39px
          &.box3
            left: 973px
            .icon
              width: 41px
              height: 38px
              background-image: url("../../assets/img/window/chanpin.png")
              background-size: 41px 38px
        .left
          position: absolute
          left: 65px
          &.left1
            top: 160px
            i
              background: #05D74A
          &.left2
            top: 530px
            i
              background: #00FFFF
          .title
            color: #ffffff
            font-size: 30px
            i
              display: inline-block
              width: 13px
              height: 13px
              border-radius: 50%
              margin-right: 22px
          .num
            text-align: right
            color: #ffffff
            font-size: 78px
            font-family: Teko-Regular
            margin: 15px 0
            .unit
              font-size: 31px
              color: rgba(255, 255, 255, .6)
      .ranklist
        position: absolute
        top: 39px
        right: 41px
        width: 513px
        height: 791px
        background-image: url("../../assets/img/window/box_rank.png")
        background-size: 513px 791px
        background-repeat: no-repeat
        .title
          font-size: 29px
          color: #94f0fd
          text-align: center
          line-height: 50px
        .table-title
          display: flex
          margin-top: 16px
          .name
            width: 81px
            height: 24px
            background: rgba(13, 0, 127, 1)
            border: 2px solid rgba(0, 76, 230, 1)
            color: #FFDE00
            font-size: 17px
            text-align: center
            line-height: 24px
            margin: 0 134px 0 184px
          .num
            width: 81px
            height: 28px
            line-height: 28px
            text-align: center
            background: rgba(95, 57, 68, 1)
            color: #FF8A38
            font-size: 17px
        .scroll-box
          height: 690px
          overflow: hidden
          &:hover
            .scroll
              animation-play-state: paused
          .scroll
            animation-name: columnScroll
            animation-iteration-count: infinite
            animation-timing-function: linear
            .item
              display: flex
              height: 69px
              line-height: 69px
              .index
                width: 110px
                .top3
                  margin: 16px auto 0
                  width: 42px
                  height: 37px
                  background-size: 42px 37px
                  background-repeat: no-repeat
                  &.rank0
                    background-image: url("../../assets/img/window/rank1.png")
                  &.rank1
                    background-image: url("../../assets/img/window/rank2.png")
                  &.rank2
                    background-image: url("../../assets/img/window/rank3.png")
                .rank
                  margin: 20px auto 0
                  width: 28px
                  height: 28px
                  background: #FFDE00
                  border-radius: 50%
                  text-align: center
                  color: #000000
                  line-height: 28px
                  font-size: 17px
                  font-weight: bold
              .name
                width: 280px
                text-align: center
                color: #FFDE00
                font-size: 21px
              .num
                flex: 1
                text-align: center
                color: #ffffff
                font-size: 21px
      .charts
        position: absolute
        top: 260px
        left: 400px
        width: 850px
        height: 580px
</style>