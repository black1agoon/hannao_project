<template>
  <div class="window" v-show="show">
    <div class="content">
      <i class="close" @click="close"></i>
      <div class="ball-box ball1">
        <div class="ball">
          <p class="num">{{companyCount | setThree}}<span class="unit">个</span></p>
        </div>
        <p class="text">
          <img src="../../assets/img/window/fuwu.png" /><span>服务企业</span>
        </p>
      </div>
      <div class="ball-box ball2">
        <div class="ball">
          <p class="num">{{idsCount | setThree}}<span class="unit">个</span></p>
        </div>
        <p class="text">
          <img src="../../assets/img/window/biaoshishu.png" /><span>标识使用数</span>
        </p>
      </div>
      <div class="ranklist">
        <div class="title">企业标识使用数排行</div>
        <ul class="table-title">
          <li class="name">名称</li>
          <!--<li class="num">数量</li>-->
        </ul>
        <div class="scroll-box">
          <ul class="scroll" :style="scroll">
            <li class="item" v-for="(company, index) in ranklist"
                :key="index">
              <div class="index">
                <div v-if="company.index < 3" class="top3" :class="'rank' + company.index"></div>
                <div v-else class="rank">{{company.index + 1}}</div>
              </div>
              <div class="name">{{company.name}}</div>
              <!--<div class="num">{{company.idsCount | setThree}}</div>-->
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
  import {PROMANGE} from '../board.config'
  export default {
    name: 'identifying-window',
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
        idsCount: 0,
        companyCount: 0,
        chartOptions: PROMANGE
      }
    },
    methods: {
      open() {
        this.getIdsProductManage()
        this.show = true
      },
      close() {
        this.show = false
      },
      getIdsProductManage() {
        api.idsProductManageController.getIdsProductManage().then(data => {
          this.idsCount = data.idsCount
          this.companyCount = data.companyCount
          if (data && data.serviceCompanyDtoList.length > 10) {
            this.ranklist = data.serviceCompanyDtoList.map((company, idx) => ({
              index: idx,
              ...company
            }))
            this.ranklist = this.ranklist.concat(this.ranklist)
          } else if (data && data.serviceCompanyDtoList.length <= 10) {
            this.ranklist = data.serviceCompanyDtoList
            this.ranklist = this.ranklist.map((company, idx) => ({
              index: idx,
              ...company
            }))
          } else {
            this.ranklist = []
          }
          this.chartOptions.xAxis[0].data = data.identifierResolveMonthDtoList.map(m => m.month)
          this.chartOptions.series[0].data = data.identifierResolveMonthDtoList.map(data => data.total)
          this.chartOptions.series[1].data = data.usedIncrMonthDtoList.map(data => data.total)
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
      .ball-box
        position: absolute
        top: 44px
        width: 230px
        height: 229px
        background-image: url("../../assets/img/window/ball-box.png")
        background-size: 230px 229px
        background-repeat: no-repeat
        &.ball1
          left: 108px
        &.ball2
          left: 548px
        .ball
          width: 154px
          height: 155px
          background-image: url("../../assets/img/window/ball.png")
          background-size: 154px 155px
          background-repeat: no-repeat
          margin: 19px auto 0
          overflow: hidden
          .num
            text-align: center
            font-size: 56px
            color: #FFDE00
            font-family: Teko-Regular
            margin-top: 48px
            .unit
              margin-left: 5px
              font-size: 16px
              color: #ffffff
        .text
          margin-top: 10px
          color: #ffffff
          height: 36px
          line-height: 36px
          font-size: 19px
          text-align: center
          span
            vertical-align: top
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
            margin: 0 134px 0 214px
          .num
            width: 81px
            height: 24px
            background: rgba(13, 0, 127, 1)
            border: 2px solid rgba(0, 76, 230, 1)
            color: #FFDE00
            font-size: 17px
            text-align: center
            line-height: 24px
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
                width: 350px
                text-align: center
                color: #FFDE00
                font-size: 21px
                overflow: hidden
                text-overflow: ellipsis
                white-space: no-wrap
              .num
                flex: 1
                text-align: center
                color: #ffffff
                font-size: 21px
      .charts
        position: absolute
        top: 260px
        left: 0px
        width: 1270px
        height: 580px
</style>