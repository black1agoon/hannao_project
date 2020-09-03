<template>
  <div class="board-wrapper">
    <datetime>
    </datetime>
    <div class="left-container">
      <div class="title tit1">主动码</div>
      <div class="text t1" @click="openEdgeWindow">
        <i class="bysb"></i>
        <span class="tx">边缘设备</span>
        <span class="val">{{alldata.edgeEquipments || 0}}</span>
      </div>
      <div class="text t2">
        <i class="gcjs"></i>
        <span class="tx">过程计算</span>
        <span class="val">{{alldata.processCalculationEquipments}}</span>
      </div>
      <div class="text t3">
        <i class="sb"></i>
        <span class="tx">设备</span>
      </div>
      <div class="sb-info">
        <div class="item">
          <p class="name">AGV</p>
          <p class="val">{{alldata.agvEquipments}}</p>
        </div>
        <div class="item">
          <p class="name">出入库装置</p>
          <p class="val">{{alldata.whControl}}</p>
        </div>
      </div>
      <div class="title tit2">RFID码</div>
      <div class="rf-info">
        <div class="item" @click="openIdentWindow">
          <i class="scgk"></i>
          <p class="name">生产管控</p>
          <p class="val">{{alldata.productionManagement | setThree}}</p>
        </div>
        <div class="item" @click="openProWindow">
          <i class="fwsy"></i>
          <p class="name">防伪溯源</p>
          <p class="val">{{alldata.jzbData | setThree}}</p>
        </div>
      </div>
      <div class="title tit3">
        二维码
        <span class="value">
          {{alldata.qrCode | setThree}}
          <span class="unit">个</span>
        </span>
      </div>
      <div class="title tit4">
        eID<span class="small">达铃</span>
        <span class="value">
          {{alldata.eid | setThree}}
          <span class="unit">个</span>
        </span>
      </div>
    </div>
    <dahs-map ref="map" :points="mapPointsList">
    </dahs-map>
    <div class="right-container">
      <div class="title">服务企业</div>
      <div class="content">
        <div class="scroll-box">
          <ul class="scroll" :style="scroll">
            <li v-for="(company, index) in companyList"
                @click="companyOpenWindow(company)"
                :key="index">
              {{company.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--<div class="copyright">浙江汉脑数码科技有限公司版权所有</div>-->
    <pro-management-window ref="proWindow">
    </pro-management-window>
    <identifying-window ref="identWindow">
    </identifying-window>
    <edge-equipment-window ref="edgeWindow">
    </edge-equipment-window>
    <workshop-window ref="workshopWindow">
    </workshop-window>
    <company-node-window @workshop="openWorkshopWindow" ref="companynodeWindow">
    </company-node-window>
  </div>
</template>

<script>
  import Datetime from '../components/Datetime'
  import api from '@/api'
  import {setNumberByThree} from '../assets/common/util'
  import ProManagementWindow from './window/ProManagementWindow'
  import IdentifyingWindow from './window/IdentifyingWindow'
  import EdgeEquipmentWindow from './window/EdgeEquipmentWindow'
  import WorkshopWindow from './window/WorkshopWindow'
  import CompanyNodeWindow from './window/CompanyNodeWindow'
  import DahsMap from '../components/DahsMap'
  export default {
    name: 'dash-view',
    components: {
      Datetime,
      ProManagementWindow,
      IdentifyingWindow,
      EdgeEquipmentWindow,
      WorkshopWindow,
      CompanyNodeWindow,
      DahsMap
    },
    filters: {
      setThree(num) {
        return setNumberByThree(num)
      }
    },
    computed: {
      scroll() {
        return this.companyList.length > 10 ? {
          animationDuration: `${this.companyList.length * 1.5}s`
        } : {}
      }
    },
    data() {
      return {
        timer: null,
        companyList: [],
        mapPointsList: [],
        alldata: {}
      }
    },
    methods: {
      getCompanyList() {
        api.idsResolveOverview.getCompanyList().then(data => {
          if (data && data.length > 10) {
            this.companyList = data.concat(data)
          } else if (data && data.length <= 10) {
            this.companyList = data
          } else {
            this.companyList = []
          }
          this.mapPointsList = data && data.length > 0 ? data.map(company => ({
            name: company.name,
            value: company.longlat ? company.longlat.split(',') : []
          })) : []
        })
      },
      getAllData() {
        api.idsResolveOverview.getAllData().then(data => {
          if (data && data.length > 0) {
            this.alldata = data[0]
          } else {
            this.alldata = {}
          }
        })
      },
      openProWindow() {
        this.$refs.proWindow.open()
      },
      openIdentWindow() {
        this.$refs.identWindow.open()
      },
      openEdgeWindow() {
        this.$refs.edgeWindow.open()
      },
      companyOpenWindow(company) {
        this.$refs.companynodeWindow.open(company)
      },
      openWorkshopWindow(company) {
        this.$refs.workshopWindow.open(company)
      }
    },
    mounted() {
      this.getCompanyList()
      this.getAllData()
      this.timer = setInterval(() => {
        this.getCompanyList()
        this.getAllData()
      }, 5 * 60 * 1000)
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../assets/stylus/animation.styl'
  .board-wrapper
    position: relative
    width: 1920px
    height: 1080px
    background-image: url("../assets/img/dashview.png")
    background-size: contain
    background-repeat: no-repeat
    .left-container
      position: absolute
      z-index: 10
      top: 209px
      left: 27px
      width: 493px
      height: 766px
      background-image: url("../assets/img/left-container.png")
      background-size: 493px 766px
      background-repeat: no-repeat
      .title
        position: absolute
        font-size: 32px
        color: #94F0FD
        .small
          display: inline-block
          vertical-align: top
          line-height: 36px
          font-size: 20px
        &.tit1
          top: 40px
          left: 180px
        &.tit2
          top: 385px
          left: 78px
        &.tit3
          top: 605px
          left: 105px
        &.tit4
          top: 692px
          left: 160px
        .value
          color: #ffffff
          font-family: Teko-Regular
          font-size: 40px
          margin-left: 20px
          .unit
            font-size: 20px
      .text
        position: absolute
        display: flex
        &.t1
          top: 100px
          left: 130px
          cursor: pointer
        &.t2
          top: 165px
          left: 100px
        &.t3
          top: 235px
          left: 70px
        .bysb
          width: 25px
          height: 25px
          background-image: url("../assets/img/dashicon1.png")
          background-size: 25px 25px
          background-repeat: no-repeat
        .gcjs
          width: 22px
          height: 24px
          background-image: url("../assets/img/dashicon2.png")
          background-size: 22px 24px
          background-repeat: no-repeat
        .sb
          width: 25px
          height: 23px
          background-image: url("../assets/img/dashicon3.png")
          background-size: 25px 23px
          background-repeat: no-repeat
        .tx
          margin: 0 20px 0 5px
          color: #1382FF
          font-size: 24px
          vertical-align: bottom
        .val
          color: #ffffff
          font-family: Teko-Regular
          font-size: 40px
          line-height: 30px
      .sb-info
        position: absolute
        display: flex
        width: 290px
        top: 280px
        left: 20px
        .item
          flex: 1
          text-align: center
          color: #ffffff
          .name
            font-size: 20px
          .val
            margin-top: 10px
            font-size: 40px
            font-family: Teko-Regular
      .rf-info
        position: absolute
        top: 435px
        left: 30px
        width: 290px
        display: flex
        .item
          flex: 1
          text-align: center
          cursor: pointer
          margin-right: 10px
          .scgk
            margin: 0 auto
            display: block
            width: 40px
            height: 40px
            background-image: url("../assets/img/dashicon4.png")
            background-size: 40px 40px
            background-repeat: no-repeat
          .fwsy
            margin: 0 auto
            display: block
            width: 40px
            height: 40px
            background-image: url("../assets/img/dashicon5.png")
            background-size: 40px 40px
            background-repeat: no-repeat
          .name
            color: #13FA20
            font-size: 20px
            margin: 13px 0
          .val
            color: #ffffff
            font-size: 40px
            font-family: Teko-Regular
    .right-container
      position: absolute
      top: 220px
      right: 49px
      width: 455px
      height: 745px
      background-image: url("../assets/img/right-container.png")
      background-size: 455px 745px
      background-repeat: no-repeat
      .title
        font-size: 29px
        color: #94F0FD
        text-align: center
        line-height: 50px
      .content
        margin-top: 13px
        .scroll-box
          height: 680px
          overflow: hidden
          &:hover
            .scroll
              animation-play-state: paused
          .scroll
            animation-name: columnScroll
            animation-iteration-count: infinite
            animation-timing-function: linear
            li
              cursor: pointer
              text-align: center
              height: 68px
              line-height: 68px
              color: #ffffff
              font-size: 20px
              &:nth-of-type(2n)
                background: rgba(14, 95, 183, .3)
    .map
      width: 1164px
      height: 900px
      position: absolute
      top: 130px
      left: 300px
      z-index: 10
    .copyright
      position: absolute
      right: 47px
      bottom: 24px
      font-size: 21px
      color: rgba(255, 255, 255, .3)
      font-family: HYWenHei
      font-style: italic
</style>