<template>
  <div class="main-wrapper">
    <div class="header">
      <div class="cn">工业互联网纺织服装标识解析二级节点运营监测中心</div>
      <div class="en">Hannao · Textile and Apparel Industry Logo Secondary Analysis System Operation Monitoring Center
      </div>
    </div>
    <div class="block block1">
      <div class="title" @click="openLabelWindow">标识统计</div>
      <div class="content">
        <div class="tag-sum">
          <i class="tag"></i>
          <label>标识总数</label>
          <span class="val">{{kanbanData.tagCount || 0 | setNumByThree}}</span>
        </div>
        <div class="type-container">
          <div class="type">
            <i class="icon icon2"></i>RFID防伪溯源
            <div class="val">{{kanbanData.rfidAntiCounterfeiting || 0}}</div>
          </div>
          <div class="type">
            <i class="icon icon3"></i>RFID生产管理
            <div class="val">{{kanbanData.rfidProduction || 0}}</div>
          </div>
          <div class="type">
            <i class="icon icon4"></i>二维码标识管理
            <div class="val">{{kanbanData.qrCodeIdentification || 0}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="block block2">
      <div class="title" @click="openCodeWindow">主动码</div>
      <div class="content">
        <line-progress name="边缘设备数量" :value="kanbanData.edgeDevice" :max="getMaxNum" color="#51FFFF">
        </line-progress>
        <line-progress name="过程计算数量" :value="kanbanData.processCalculation" :max="getMaxNum" color="#44C885">
        </line-progress>
        <line-progress name="设备数量" :value="kanbanData.device" :max="getMaxNum" color="#E66A02">
        </line-progress>
      </div>
    </div>
    <div class="block block3">
      <div class="title">主动码开机率(近30天)</div>
      <div class="content">
        <charts-view :options="OPEN_RATE">
        </charts-view>
      </div>
    </div>
    <div class="block block4">
      <div class="content">
        <div class="scroll" :style="scroll">
          <div class="message" v-for="(company, index) in companyDetailList" :key="index">
            <div class="time">{{company.createTime}}</div>
            <div class="name">{{company.activeCodeName}}</div>
            <div class="msg">{{company.actionName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="block block5">
      <div class="title">注册企业人员数</div>
      <div class="content">
        <img class="image" src="../assets/img/mainview/factory.png">
        <div class="company-data">
          <div class="label">
            <i class="icon icon5"></i>企业数据
          </div>
          <div class="val">{{kanbanData.enterprise || 0}}</div>
          <div class="label">
            <i class="icon icon6"></i>人员ID
          </div>
          <div class="val">{{kanbanData.employee || 0 | setNumByThree}}</div>
        </div>
      </div>
    </div>
    <div class="block block6">
      <div class="title">人员地域来源主要占比</div>
      <div class="content">
        <div class="cyclic-container">
          <div class="cyclic" v-for="(emp, index) in empCount" :key="index">
            <CyclicProgress :percent="emp.ratio * 100" :color="emp.color">
            </CyclicProgress>
            <div class="name" :style="{color: emp.color}">{{emp.name}}</div>
            <div class="percent" :style="{color: emp.color}">{{parseInt(emp.ratio * 100)}}%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="block block7">
      <div class="title">企业标识排行统计</div>
      <div class="content">
        <charts-view :options="COMPANY_RAKE">
        </charts-view>
      </div>
    </div>
    <lines-flash>
    </lines-flash>
    <active-code-window ref="codeWindow" :code-add="CODE_ADD" :kanban-data="kanbanData" :log-list="companyDetailList">
    </active-code-window>
    <label-window ref="labelWindow">
    </label-window>
  </div>
</template>

<script>
  import api from '@/api'
  import CyclicProgress from '../components/common/CyclicProgress'
  import ChartsView from '../components/common/ChartsView'
  import { COMPANY_RAKE , CODE_ADD, OPEN_RATE } from './board.config'
  import { setNumberByThree} from '../assets/common/util'
  import LineProgress from '../components/LineProgress'
  import LinesFlash from '../components/mainview/LinesFlash'
  import ActiveCodeWindow from './window/ActiveCodeWindow'
  import LabelWindow from './window/LabelWindow'
  export default {
    name: 'main-view',
    components: {
      CyclicProgress,
      ChartsView,
      LineProgress,
      LinesFlash,
      ActiveCodeWindow,
      LabelWindow
    },
    filters: {
      setNumByThree(num) {
        return setNumberByThree(num)
      }
    },
    computed: {
      scroll() {
        return this.companyDetailList.length > 6 ? {
          animationDuration: `${this.companyDetailList.length * 1.5}s`
        } : {}
      },
      getMaxNum() {
        let max = this.kanbanData.edgeDevice
        max = max > this.kanbanData.processCalculation ? max : this.kanbanData.processCalculation
        max = max > this.kanbanData.device ? max : this.kanbanData.device
        return max
      }
    },
    data() {
      return {
        COMPANY_RAKE: COMPANY_RAKE,
        CODE_ADD: CODE_ADD,
        OPEN_RATE: OPEN_RATE,
        companyDetailList: [],
        empCount: [
          { color: '#FFD500' },
          { color: '#44C885' },
          { color: '#E66A02' }
        ],
        kanbanData: {}
      }
    },
    methods: {
      openCodeWindow() {
        this.$refs.codeWindow.open()
      },
      openLabelWindow() {
        this.$refs.labelWindow.open()
      },
      getEmpPercent(num) {
        let sum = 0
        this.empCount.forEach(e => {
          sum += e.number
        })
        return sum ? Math.round(num / sum * 100) : 0
      },
      getApiData() {
        api.mainview.useDevice().then(data => {
          if (data && data.length) {
            let set = new Set(data.map(d => d.date.substring(0, 10)))
            this.OPEN_RATE.xAxis[0].data = [...set]
            this.OPEN_RATE.series[0].data = data.filter(d => d.codeType === '10000000').map(d => d.startUpRate)
            this.OPEN_RATE.series[1].data = data.filter(d => d.codeType === '20000000').map(d => d.startUpRate)
            this.OPEN_RATE.series[2].data = data.filter(d => d.codeType === '30000000').map(d => d.startUpRate)
          } else {
            this.OPEN_RATE.xAxis[0].data = []
            this.OPEN_RATE.series[0].data = []
            this.OPEN_RATE.series[1].data = []
            this.OPEN_RATE.series[2].data = []
          }
        })
        api.mainview.activeCodeMonth().then(data => {
          if (data && data.length > 0) {
            this.CODE_ADD.xAxis[0].data = data.map(day => day.date)
            this.CODE_ADD.series[0].data = data.map(day => day.number)
          } else {
            this.CODE_ADD.xAxis[0].data = []
            this.CODE_ADD.series[0].data = []
          }
        })
        api.mainview.deviceStatus().then(data => {
          this.companyDetailList = data ? (data.length > 6 ? data.concat(data) : data) : []
        })
        api.mainview.employeeCount().then(data => {
          this.empCount = data ? data.map((p, idx) => ({
            ...this.empCount[idx],
            ...p
          })) : []
        })
        api.mainview.enterpriseDetail().then(data => {
          if (data && data.length > 0) {
            // this.COMPANY_RAKE.xAxis[0].data = data.map(cmp => cmp.name.substring(0, cmp.name.length - 4))
            this.COMPANY_RAKE.xAxis[0].data = data.map(cmp => {
              let length = Math.ceil(cmp.name.length / 2)
              return cmp.name.substring(0, length) + '\n' + cmp.name.substring(length, cmp.name.length)
            })
            this.COMPANY_RAKE.series[0].data = data.map(cmp => cmp.equipment)
            this.COMPANY_RAKE.series[1].data = data.map(cmp => cmp.worker)
          } else {
            this.COMPANY_RAKE.xAxis[0].data = []
            this.COMPANY_RAKE.series[0].data = []
            this.COMPANY_RAKE.series[1].data = []
          }
        })
        api.mainview.total().then(data => {
          this.kanbanData = data ? data : {}
        })
      }
    },
    mounted() {
      this.getApiData()
      this.timer = setInterval(() => {
        this.getApiData()
      }, 5 * 60 * 1000)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../assets/stylus/animation.styl'
  .main-wrapper
    position: relative
    width: 1920px
    height: 1080px
    background-image: url("../assets/img/mainview/bg.jpg")
    background-size: 1920px 1080px
    background-repeat: no-repeat
    overflow: hidden
    font-family: Alibaba-PuHuiTi
    .header
      .cn
        color: #ffffff
        font-size: 32px
        text-align: center
        margin-top: 26px
      .en
        text-align: center
        font-size: 14px
        color: rgba(255, 255, 255, .75)
        margin-top: 15px
    .block
      position: absolute
      width: 520px
      background: rgba(1, 9, 43, .3)
      .title
        position: relative
        width: 280px
        height: 38px
        margin: 30px 0 0 30px
        color: #CBF6FF
        font-size: 20px
        line-height: 38px
        border-left: 3px solid #3D9DC5
        background: linear-gradient(90deg, rgba(15, 88, 132, 1) 0%, rgba(8, 44, 66, .5) 60%, rgba(8, 44, 66, 0) 100%)
        overflow: hidden
        padding-left: 20px
        z-index: 10
      .content
        .cyclic-container
          display: flex
          margin-top: 40px
          .cyclic
            position: relative
            flex: 1
            text-align: center
            .name
              position: absolute
              width: 100%
              top: 38px
              font-size: 20px
            .percent
              margin-top: 15px
              padding-left: 10px
              font-size: 28px
              font-weight: bold
      &.block1
        top: 60px
        left: 60px
        height: 280px
        .content
          .tag-sum
            border-bottom: 1px solid rgba(112, 112, 112, 0.3)
            margin: 0 30px
            height: 84px
            display: flex
            align-items: center
            .tag
              display: inline-block
              width: 20px
              height: 26px
              background-image: url("../assets/img/mainview/icon1.png")
              background-size: 20px 26px
              background-repeat: no-repeat
            label
              font-size: 22px
              color: #CBF6FF
              margin: 0 20px 0 10px
            .val
              color: #FFD500
              font-size: 58px
              font-weight: bold
          .type-container
            display: flex
            .type
              flex: 1
              color: #CBF6FF
              font-size: 16px
              text-align: center
              margin-top: 20px
              .icon
                background-repeat: no-repeat
                vertical-align: bottom
                margin-right: 10px
                &.icon2
                  display: inline-block
                  width: 12px
                  height: 18px
                  background-image: url("../assets/img/mainview/icon3.png")
                  background-size: 12px 18px
                &.icon3
                  display: inline-block
                  width: 18px
                  height: 18px
                  background-image: url("../assets/img/mainview/icon6.png")
                  background-size: 18px 18px
                &.icon4
                  display: inline-block
                  width: 18px
                  height: 18px
                  background-image: url("../assets/img/mainview/icon2.png")
                  background-size: 18px 18px
              .val
                margin-top: 20px
                color: #51FFFF
                font-weight: bold
                font-size: 40px
                text-align: center
      &.block2
        top: 360px
        left: 60px
        height: 320px
        .content
          height: 250px
          padding: 0 30px
          display: flex
          flex-direction: column
          justify-content: space-around
      &.block3
        top: 700px
        left: 60px
        height: 320px
        .content
          height: 250px
      &.block4
        top: 780px
        left: 600px
        width: 720px
        height: 240px
        .content
          height: 240px
          overflow: hidden
          &:hover
            .scroll
              animation-play-state: paused
          .scroll
            animation-name: columnScroll
            animation-iteration-count: infinite
            animation-timing-function: linear
            .message
              height: 40px
              display: flex
              justify-content: space-between
              align-items: center
              font-size: 20px
              color: rgba(216, 216, 216, .7)
              font-weight: 300
              text-align: center
              .time
                flex: 3
              .name
                flex: 2
              .msg
                flex: 3
                overflow: hidden
                text-overflow: ellipsis
                white-space: nowrap
      &.block5
        top: 60px
        right: 60px
        height: 320px
        .content
          .image
            margin: 25px
          .company-data
            display: inline-block
            vertical-align: top
            margin-top: 20px
            .label
              color: #CBF6FF
              font-size: 17px
              .icon
                display: inline-block
                background-repeat: no-repeat
                vertical-align: bottom
                margin-right: 5px
                &.icon5
                  width: 20px
                  height: 20px
                  background-image: url("../assets/img/mainview/icon4.png")
                  background-size: 20px 20px
                &.icon6
                  width: 20px
                  height: 16px
                  background-image: url("../assets/img/mainview/icon5.png")
                  background-size: 20px 16px
            .val
              margin: 25px 0
              color: #51FFFF
              font-size: 48px
              font-weight: bold
      &.block6
        top: 400px
        right: 60px
        height: 280px
      &.block7
        top: 700px
        right: 60px
        height: 320px
        .content
          height: 250px
    .aaa
      color: red
</style>