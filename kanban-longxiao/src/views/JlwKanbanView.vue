<template>
  <div class="board-wrapper">
    <div class="header">
      <span class="title">龙潇·智慧医疗工厂运行指挥中心</span>
    </div>
    <div class="hannao">
      <img src="../assets/img/store-main/hannao.png">
    </div>
    <div class="shulibang">
      <img src="../assets/img/store-main/shulibang.png">
    </div>
    <div class="content">
      <div class="info info1">
        <div class="title">
          <i class="arrow"></i>今日实时产量</div>
        <div class="num">{{dayProduction | setNumbByThree}}</div>
      </div>
      <div class="info info2">
        <div class="title">
          <i class="arrow"></i>无故障运行时长</div>
        <div class="num">{{troubleFreeWorkHours | setNumbByThree}}<span>h</span></div>
      </div>
      <div class="info info3">
        <div class="title">
          <i class="arrow"></i>分时产量</div>
        <bar-charts class="time-charts"
                    :width="300"
                    :list="timeProduction"
                    :show-time="false">
        </bar-charts>
      </div>
      <div class="info info4">
        <div class="title">
          <i class="arrow"></i>数字孪生监控</div>
          <div class="flowline-name">
            {{flowline.name}}
          </div>
          <image-animation class="image-box">
          </image-animation>
<!--        <video class="video"-->
<!--               type="video/mp4"-->
<!--               autoplay-->
<!--               muted-->
<!--               loop-->
<!--               src="http://media.jianzb.cn/sp/0821/qqfd.mp4">-->
<!--        </video>-->
      </div>
      <img class="jiqi" src="../assets/img/store-main/pic2.png" />
      <template v-for="(machine, index) in maskInfo">
        <div class="machine"
             :class="'machine' + (index + 1)"
             :key="index">
          <div class="machine_info">
            <div class="name">{{machine.maskName}}</div>
            <div class="num">{{machine.dayProduction | setNumbByThree}}</div>
          </div>
          <bar-charts class="charts" :list="machine.list">
          </bar-charts>
        </div>
        <div class="point"
             :key="'point' + index"
             :class="['point' + (index + 1), {error: machine.isError === '1'}]"></div>
        <div class="box"
             :key="'box' + index"
             :class="['box' + (index + 1), {error: machine.isError === '1'}]">
          <div class="content_box">
            <div class="jps">
              <label>节拍数</label>
              <span class="val">{{getFormatNpm(machine.npm)}}</span>
              <span class="unit">npm</span>
            </div>
            <div class="worktime">
              <label>无故障运行时长</label>
              <span class="val">{{machine.troubleFreeWorkHours || 0}}</span>
              <span class="unit">h</span>
            </div>
            <div class="pass_rate">
              <label>合格率</label>
              <span class="val">{{machine.passPercent || 0}}</span>
              <span class="unit">%</span>
            </div>
          </div>
        </div>
      </template>

      <div class="box box6">
        <div class="warehouse_box">

          <div class="warehouse"
               :class="{less: info.isWarning === '1'}"
               :key="index"
               v-for="(info, index) in warningInfo">
            <div class="name">{{info.name}}</div>
            <div class="less_rest">
              <div class="text">余料不足</div>
            </div>
          </div>
        </div>
      </div>
      <div class="point point6 big"></div>
    </div>
    <div class="setting" tabindex="1" @click="showMask"></div>
    <flow-lines ref="flowlines" @loaddata="loaddata">
    </flow-lines>
    <div class="copyright">浙江汉脑数码科技有限公司提供技术支持</div>
  </div>
</template>

<script>
  import { setNumberByThree } from '@/utils/utils'
  import BarCharts from '@/components/store-temp/BarCharts'
  import FlowLines from '@/components/store-temp/FlowLines'
  import api from '@/api'
  import {mapState} from 'vuex'
  import ImageAnimation from '../components/store-temp/ImageAnimation'
  export default {
    name: 'jlw-kanban-view',
    components: {
      BarCharts,
      FlowLines,
      ImageAnimation
    },
    filters: {
      setNumbByThree(num) {
        return setNumberByThree(num)
      }
    },
    computed: {
      ...mapState('jlw', ['flowline'])
    },
    data() {
      return {
        dayProduction: 0,
        troubleFreeWorkHours: 0,
        warningInfo: [],
        timeProduction: [],
        maskInfo: [],
        timer: null
      }
    },
    methods: {
      getFormatNpm(val) {
        return val ? val > 10000 ? parseInt(val) : val : 0
      },
      getDayProduction() {
        api.jlwKanBan.getDayProduction(this.flowline.id).then(data => {
          this.dayProduction = data ? data : 0
        })
      },
      getTroubleFreeWorkHours() {
        api.jlwKanBan.getTroubleFreeWorkHours(this.flowline.id).then(data => {
          this.troubleFreeWorkHours = data ? data : 0
        })
      },
      getTimeProduction() {
        api.jlwKanBan.getTimeProduction(this.flowline.id).then(data => {
          this.timeProduction = data && data.length > 0 ? data : []
        })
      },
      getMaskInfo() {
        api.jlwKanBan.getMaskInfo(this.flowline.id).then(data => {
          this.maskInfo = data && data.length > 0 ? data : []
        })
      },
      getWarningInfo() {
        api.jlwKanBan.getWarningInfo(this.flowline.id).then(data => {
          this.warningInfo = data && data.length > 0 ? data : []
        })
      },
      showMask() {
        this.$refs.flowlines.show()
      },
      loaddata() {
        clearInterval(this.timer)
        this.getDayProduction()
        this.getTroubleFreeWorkHours()
        this.getTimeProduction()
        this.getMaskInfo()
        this.getWarningInfo()
        this.timer = setInterval(() => {
          this.getDayProduction()
          this.getTroubleFreeWorkHours()
          this.getTimeProduction()
          this.getMaskInfo()
          this.getWarningInfo()
        }, 5 * 60 * 1000)
      }
    },
    mounted() {
      if (this.flowline.id) {
        this.loaddata()
      }
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .board-wrapper
    position: relative
    width: 1920px
    height: 1080px
    background-image: url("../assets/img/store-main/bg.png")
    background-size: cover
    background-repeat: no-repeat
    .header
      width: 1920px
      height: 83px
      line-height: 82px
      background-image: url("../assets/img/store-main/header.png")
      background-size: cover
      background-repeat: no-repeat
      background-position: center
      text-align: center
      .title
        font-family: 'Alibaba-puhuiti-heavy'
        color: #ffffff
        background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(67, 253, 255, 0.58) 100%)
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent
        font-size: 29px
    .content
      .info
        position: absolute
        top: 108px
        .title
          color: #ffffff
          font-size: 17px
          .arrow
            display: inline-block
            width: 25px
            height: 19px
            background-image: url("../assets/img/store-main/icon.png")
            background-size: 25px 19px
            background-repeat: no-repeat
            vertical-align: top
            margin-right: 10px
        .num
          margin: 20px 0 0 32px
          font-family: 'Teko-Regular'
          font-size: 70px
          font-weight: bold
          letter-spacing: 4px
          color: #ffffff
          background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(100, 253, 255, 0.38) 100%)
          -webkit-background-clip: text
          -webkit-text-fill-color: transparent
        &.info1
          left: 80px
        &.info2
          left: 370px
        &.info3
          left: 670px
          .time-charts
            margin-top: 10px
        &.info4
          left: 1110px
          .flowline-name
            margin-top: 30px
            font-size: 30px
            font-weight: bold
            background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(100, 253, 255, 0.38) 100%)
            -webkit-background-clip: text
            -webkit-text-fill-color: transparent
          .image-box
            position: absolute
            top: 0
            left: 175px
            width: 589px
            height: 111px
          .video
            position: absolute
            top: 0
            left: 180px
            width: 590px
            height: 112px
      .machine
        position: absolute
        top: 270px
        .machine_info
          display: inline-block
          width: 120px
          .name
            font-size: 18px
            color: #1FEBDA
            word-break: break-all
            line-height: 20px
          .num
            margin-top: 12px
            color: #ffffff
            font-size: 49px
            font-family: 'Teko-Regular'
            letter-spacing: 1px
        .charts
          display: inline-block
          vertical-align: top
        &.machine1
          left: 80px
        &.machine2
          left: 450px
        &.machine3
          left: 820px
        &.machine4
          left: 1190px
        &.machine5
          left: 1560px
      .jiqi
        position: absolute
        top: 300px
      .point
        position: absolute
        width: 32px
        height: 32px
        background-image: url("../assets/img/store-main/point.png")
        background-size: 32px 32px
        background-repeat: no-repeat
        top: 610px
        &.error
          background-image: url("../assets/img/store-main/point_error.png")
        &.big
          width: 43px
          height: 43px
          background-image: url("../assets/img/store-main/point.png")
          background-size: 43px 43px
        &.point1
          left: 852px
        &.point2
          left: 1093px
        &.point3
          left: 1332px
        &.point4
          left: 1566px
        &.point5
          left: 1780px
        &.point6
          left: 316px
      .box
        position: absolute
        top: 632px
        width: 176px
        height: 402px
        background-image: url("../assets/img/store-main/normal_box.png")
        background-size: 176px 402px
        background-repeat: no-repeat
        &.error
          background-image: url("../assets/img/store-main/error_box.png")
          label
            color: #FF2828 !important
        &.box1
          left: 738px
        &.box2
          left: 980px
        &.box3
          left: 1221px
        &.box4
          left: 1453px
        &.box5
          left: 1666px
        &.box6
          left 52px
          width: 562px
          height: 393px
          background-image: url("../assets/img/store-main/big_box.png")
          background-size: 562px 393px
          background-repeat: no-repeat
          .warehouse_box
            position: absolute
            top: 120px
            width: 563px
            height: 270px
            display: flex
            flex-wrap: wrap
            /*justify-content: space-around*/
            align-content: space-between
            padding: 30px 30px 0
            box-sizing: border-box
            .warehouse
              position: relative
              width: 104px
              height: 104px
              margin: 0 30px
              background-image: url("../assets/img/store-main/normal_circle.png")
              background-size: 104px 104px
              background-repeat: no-repeat
              &.less
                background-image: url("../assets/img/store-main/less_circle.png")
                .less_rest
                  display: block
              .name
                color: #ffffff
                font-size: 14px
                text-align: center
                margin-top: 43px
              .less_rest
                display: none
                position: absolute
                top: -30px
                left: 28px
                width: 131px
                height: 57px
                background-image: url("../assets/img/store-main/less.png")
                background-size: 131px 57px
                background-repeat: no-repeat
                .text
                  margin: 25px 0 0 55px
                  color: #FFC000
                  font-size: 13px
        .content_box
          position: absolute
          top: 133px
          left: 24px
          width: 150px
          height: 266px
          .jps, .worktime, .pass_rate
            label
              display: block
              color: #1FEBDA
              font-size: 14px
              vertical-align: top
            .val
              text-align: right
              width: 58px
              font-weight: bold
              font-size: 40px
              letter-spacing: 3px
              height: 30px
              color: #ffffff
              font-family: 'Teko-Regular'
            .unit
              display: inline-block
              font-size: 14px
              color: rgba(255, 255, 255, 0.5)
              vertical-align: bottom
          .jps
            /*display: flex*/
            margin: 20px 0 0 15px
            .val
              display: inline-block
              width: 100px
          .worktime
            margin: 20px 0 0 15px
            .val
              width: 100px
              font-size: 40px
              display: inline-block
              margin-top: 10px
          .pass_rate
            margin: 20px 0 0 15px
            .val
              width: 100px
              font-size: 40px
              display: inline-block
    .setting
      position: absolute
      width: 36px
      height: 36px
      background-image: url("../assets/img/store-main/shezhi.png")
      background-size: 36px 36px
      background-repeat: no-repeat
      right: 30px
      top: 6px
      cursor: pointer
    .hannao
      position: absolute
      top: 29px
      left: 55px
      border-right: 1px solid #ffffff
      padding-right: 20px
    .shulibang
      position: absolute
      top: 23px
      left: 295px
    .copyright
      position: absolute
      bottom: 20px
      right: 50px
      color: #ffffff
      font-style: italic
</style>