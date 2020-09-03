<template>
  <div class="window" v-show="show">
    <div class="content">
      <div class="maintitle">边缘设备</div>
      <i class="close" @click="close"></i>
      <div class="outside">
        <div class="left left1">
          <div class="title">
            <i></i>
            服务企业
          </div>
          <p class="num">{{companyCount | setThree}}<span class="unit">个</span></p>
          <img src="../../assets/img/window/fuwuqiye.png"/>
        </div>
        <div class="left left2">
          <div class="title">
            <i></i>
            边缘设备总量
          </div>
          <p class="num">{{equipmentCount | setThree}}<span class="unit">个</span></p>
          <img src="../../assets/img/window/fangweibiaoshi.png"/>
        </div>
      </div>
      <ul class="equipments">
        <li>
          <div class="img-wrap">
            <img src="../../assets/img/window/equip1.png"/>
          </div>
          <p class="name">{{idsEdgeEquipmentDtoList[0].name}}</p>
          <p class="num">{{idsEdgeEquipmentDtoList[0].amount | setThree}}</p>
        </li>
        <li>
          <div class="img-wrap">
            <img src="../../assets/img/window/equip2.png"/>
          </div>
          <p class="name">{{idsEdgeEquipmentDtoList[1].name}}</p>
          <p class="num">{{idsEdgeEquipmentDtoList[1].amount | setThree}}</p>
        </li>
        <li>
          <div class="img-wrap">
            <img src="../../assets/img/window/equip3.png"/>
          </div>
          <p class="name">{{idsEdgeEquipmentDtoList[2].name}}</p>
          <p class="num">{{idsEdgeEquipmentDtoList[2].amount | setThree}}</p>
        </li>
      </ul>
      <charts-view class="charts" :options="chartOptions">
      </charts-view>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {setNumberByThree} from '../../assets/common/util'
  import ChartsView from '../../components/common/ChartsView'
  import {EDGE} from '../board.config'

  export default {
    name: 'edge-equipment-window',
    filters: {
      setThree(num) {
        return setNumberByThree(num)
      }
    },
    components: {
      ChartsView
    },
    computed: {},
    data() {
      return {
        show: false,
        ranklist: [],
        companyCount: 0,
        equipmentCount: 0,
        chartOptions: EDGE,
        idsEdgeEquipmentDtoList: Array.from({length: 3}, () => ({}))
      }
    },
    methods: {
      open() {
        this.show = true
        this.getEdgeEquipmentOverview()
      },
      close() {
        this.show = false
      },
      getEdgeEquipmentOverview() {
        api.idsResolveEdgeEquipment.getEdgeEquipmentOverview().then(data => {
          this.companyCount = data.companyCount
          this.equipmentCount = data.equipmentCount
          this.chartOptions.xAxis[0].data = data.edgeEquipmentIncrList.map(m => m.month)
          this.chartOptions.series[0].data = data.edgeEquipmentIncrList.map(data => data.equipmentIncr)
          if (data.idsEdgeEquipmentDtoList && data.idsEdgeEquipmentDtoList.length === 3) {
            this.idsEdgeEquipmentDtoList = data.idsEdgeEquipmentDtoList
          } else {
            this.idsEdgeEquipmentDtoList = Array.from({length: 3}, () => ({}))
          }
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
      width: 1599px
      height: 750px
      background: rgba(2, 45, 154, .87)
      &:before
        display: block
        content: ''
        width: 1599px
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
        width: 510px
        height: 605px
        margin-top: 50px
        border-right: 2px solid rgba(0, 255, 255, .2)
        .left
          position: absolute
          left: 65px
          &.left1
            top: 130px
            i
              background: #05D74A
          &.left2
            top: 420px
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
      .equipments
        position: absolute
        width: 1082px
        height: 370px
        display: flex
        right: 0
        top: 40px
        li
          flex: 1
          .img-wrap
            position: relative
            width: 220px
            height: 220px
            margin: 0 auto
            img
              position: absolute
              left: 0
              right: 0
              bottom: 0
              top: 0
              margin: auto
          .name
            margin-top: 20px
            text-align: center
            color: rgba(255, 255, 255, .75)
            font-size: 23px
          .num
            text-align: center
            font-family: Teko-Regular
            font-size: 56px
            color: #FFDE00
            margin-top: 20px
      .charts
        position: absolute
        bottom: 50px
        right: 50px
        width: 960px
        height: 320px
</style>