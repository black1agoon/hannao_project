<template>
  <div class="board-wrapper">
    <selection class="selection"
               v-model="WhId"
               :width="280"
               @change="WhIdChange"
               :options="warehouseOptions">
    </selection>
    <div class="box warehouse">
      <div class="title">{{boardData.whName}}</div>
      <div class="content">
        <div class="numbox sum">
          <div class="label">总库存</div>
          <div class="num">{{boardData.sumInStoQty}}</div>
        </div>
        <div class="numbox today">
          <div class="label">今日入库<span class="num">{{boardData.todayInStoQty}}</span></div>
          <div class="label">今日出库<span class="num">{{boardData.todayOutStoQty}}</span></div>
        </div>
      </div>
    </div>
    <div class="box inventory">
      <div class="cn-title">库存分类</div>
      <div class="en-title">INVENTORY CLASSIFICATION</div>
      <div class="content">
        <div class="inventory-num">
          <i class="circle"></i>库存数量
        </div>
        <charts-view :options="CLASSIFICATION">
        </charts-view>
      </div>
    </div>
    <div class="box receipt">
      <div class="cn-title">入库出库记录</div>
      <div class="en-title">RECEIPT / ISSUE RECORD</div>
      <div class="content">
        <charts-view :options="RECORD">
        </charts-view>
      </div>
    </div>
    <div class="box backlog">
      <div class="cn-title">库存积压</div>
      <div class="en-title">INVENTORY BACKLOG</div>
      <div class="content">
        <template
            v-for="(backlog, index) in whStoGpFactoryDescList">
          <div v-if="index === 0" :key="backlog.name" class="backlog1">
            <span class="value">{{backlog.qty}}</span>
            <span class="name">{{backlog.factoryDesc}}</span>
          </div>
          <div v-if="index === 1" :key="backlog.name" class="backlog2">
            <span class="value">{{backlog.qty}}</span>
            <span class="name">{{backlog.factoryDesc}}</span>
          </div>
          <div v-if="index === 2" :key="backlog.name" class="backlog3">
            <span class="value">{{backlog.qty}}</span>
            <span class="name">{{backlog.factoryDesc}}</span>
          </div>
          <div v-if="index === 3" :key="backlog.name" class="backlog4">
            <span class="value">{{backlog.qty}}</span>
            <span class="name">{{backlog.factoryDesc}}</span>
          </div>
          <div v-if="index === 4" :key="backlog.name" class="backlog5">
            <span class="value">{{backlog.qty}}</span>
            <span class="name">{{backlog.factoryDesc}}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="box inandout">
      <div class="cn-title">当日出入库记录</div>
      <div class="en-title">STORING RECORDSAT SUNRISE</div>
      <div class="content">
        <ul class="table-title">
          <li>时间</li>
          <li>类型</li>
          <li>包数</li>
          <li>异常包数</li>
          <li>数量</li>
        </ul>
        <div class="scroll-box">
          <div class="scroll" :style="inandoutScroll">
            <ul class="item" v-for="(wh, index) in whFlowMasterShowList" :key="index">
              <li class="time">{{wh.createTime.substr(11, 5)}}</li>
              <li class="type">{{wh.whType === 1 ? '入库' : '出库'}}</li>
              <li>{{wh.sumPboxNun}}</li>
              <li>{{wh.errorPboxNun}}</li>
              <li>{{wh.sumPboxNun}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="setting" tabindex="2" @click="showMask"></div>
    <wh-frame class="mask" ref="whframe">
    </wh-frame>
    <div class="copyright">浙江汉脑数码科技有限公司版权所有</div>
  </div>
</template>

<script>
  import {CLASSIFICATION, RECORD} from './board.config'
  import ChartsView from '../components/common/ChartsView'
  import api from '@/api'
  import {formatDate} from '../assets/common/util'
  import Selection from '../components/common/Selection'
  import WhFrame from './common/WhFrame'

  export default {
    name: 'storage-console',
    components: {
      ChartsView,
      Selection,
      WhFrame
    },
    computed: {
      inandoutScroll() {
        return this.whFlowMasterShowList.length > 14 ? {
          animationDuration: `${this.whFlowMasterShowList.length * 1.5}s`
        } : {}
      }
    },
    data() {
      return {
        warehouseOptions: [],
        WhId: this.$store.state.whId,
        CLASSIFICATION,
        RECORD,
        boardData: {},
        whStoGpTypeList: [],
        whStoGpFactoryDescList: [],
        whFlowMasterShowList: []
      }
    },
    methods: {
      getApiData(WhId) {
        api.Spectaculars.getWhAllInfo(WhId).then(data => {
          this.boardData = data
          if (data.whStoGpTypeList && data.whStoGpTypeList.length > 0) {
            this.CLASSIFICATION.xAxis[0].data = data.whStoGpTypeList.map(type => type.typeName)
            this.CLASSIFICATION.series[0].data = data.whStoGpTypeList.map(type => type.qty)
          } else {
            this.CLASSIFICATION.xAxis[0].data = []
            this.CLASSIFICATION.series[0].data = []
          }
          if (data.flowChartList && data.flowChartList.length > 0) {
            // console.log(data.flowChartList)
            this.RECORD.xAxis[0].data = data.flowChartList.map(flow => formatDate(new Date(flow.daytime), 'MM.dd'))
            this.RECORD.series[0].data = data.flowChartList.map(flow => flow.outStoSum)
            this.RECORD.series[1].data = data.flowChartList.map(flow => flow.inStoSum)
          } else {
            this.RECORD.xAxis[0].data = []
            this.RECORD.series[0].data = []
          }
          if (data.whStoGpFactoryDescList && data.whStoGpFactoryDescList.length > 0) {
            this.whStoGpFactoryDescList = data.whStoGpFactoryDescList
          } else {
            this.whStoGpFactoryDescList = []
          }
          if (data.whFlowMasterShowList && data.whFlowMasterShowList.length > 14) {
            this.whFlowMasterShowList = data.whFlowMasterShowList.concat(data.whFlowMasterShowList)
          } else if (data.whFlowMasterShowList.length <= 14) {
            this.whFlowMasterShowList = data.whFlowMasterShowList
          }
        })
      },
      getAllWarehouse() {
        return api.Warehouse.getAllWarehouse().then(data => {
          if (data && data.length > 0) {
            this.warehouseOptions = data.map(d => ({
              label: d.name,
              value: d.id
            }))
            if (!this.WhId) {
              this.WhId = this.warehouseOptions[0].value
            }
          }
        })
      },
      WhIdChange(val) {
        this.$store.commit('SET_WHID', val)
        window.localStorage.setItem('whId', val)   // 保存选择的仓库到本地
        this.getApiData(val)
      },
      showMask() {
        this.$refs.whframe.show()
      }
    },
    created() {
    },
    mounted() {
      this.getAllWarehouse().then(() => {
        this.getApiData(this.WhId)
      })
      this.timer = setInterval(() => {
        this.getApiData(this.WhId)
      }, 5 * 60 * 1000)
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../assets/stylus/scroll.styl'
  .board-wrapper
    position: absolute
    width: 1920px
    height: 1080px
    background-image: url("../assets/img/bg-storage.png")
    background-size: 1920px 1080px
    background-repeat: no-repeat
    .setting
      position: absolute
      width: 43px
      height: 43px
      background-image: url("../assets/img/shezhi.png")
      background-size: 43px 43px
      background-repeat: no-repeat
      right: 54px
      top: 12px
      cursor: pointer
    .selection
      position: absolute
      z-index: 10
      left: 80px
      top: 7px
    .box
      width: 453px
      height: 422px
      background-image: url("../assets/img/storagebox.png")
      background-size: 453px 422px
      background-repeat: no-repeat
      .title
        text-align: center
        font-size: 24px
        line-height: 50px
        color: #94F0FD
      .cn-title
        text-align: center
        font-size: 24px
        line-height: 34px
        color: #94F0FD
      .en-title
        text-align: center
        font-size: 12px
        line-height: 15px
        color: #94F0FD
      .content
        color: #ffffff
        width: 100%
        margin-top: 8px
        height: 368px
      &.warehouse
        position: absolute
        left: 38px
        top: 143px
      &.inventory
        position: absolute
        right: 38px
        top: 143px
        .content
          position: relative
          .inventory-num
            position: absolute
            right: 50px
            top: 30px
            .circle
              display: inline-block
              vertical-align: middle
              width: 12px
              height: 12px
              border-radius: 50%
              margin-right: 15px
              background: rgb(170, 24, 255)
      &.receipt
        position: absolute
        left: 38px
        top: 592px
      &.backlog
        position: absolute
        right: 38px
        top: 592px
        .content
          .backlog1, .backlog2, .backlog3, .backlog4, .backlog5
            position: absolute
            background-repeat: no-repeat
            .value, .name
              display: block
              text-align: center
          .backlog1
            top: 143px
            left: 154px
            width: 134px
            height: 134px
            background-image: url("../assets/img/storagebox1.png")
            background-size: 134px 134px
            .value
              font-size: 25px
              margin-top: 55px
            .name
              font-size: 20px
              margin-top: 65px
          .backlog2
            top: 83px
            left: 309px
            width: 97px
            height: 98px
            background-image: url("../assets/img/storagebox2.png")
            background-size: 97px 98px
            .value
              font-size: 18px
              margin-top: 40px
            .name
              font-size: 15px
              margin-top: 47px
          .backlog3
            top: 269px
            left: 290px
            width: 115px
            height: 116px
            background-image: url("../assets/img/storagebox3.png")
            background-size: 115px 116px
            .value
              font-size: 21px
              margin-top: 47px
            .name
              font-size: 17px
              margin-top: 55px
          .backlog4
            top: 271px
            left: 46px
            width: 105px
            height: 106px
            background-image: url("../assets/img/storagebox4.png")
            background-size: 105px 106px
            .value
              font-size: 19px
              margin-top: 44px
            .name
              font-size: 16px
              margin-top: 53px
          .backlog5
            top: 88px
            left: 45px
            width: 78px
            height: 79px
            background-image: url("../assets/img/storagebox5.png")
            background-size: 78px 79px
            .value
              font-size: 14px
              margin-top: 32px
            .name
              font-size: 12px
              margin-top: 40px
      &.inandout
        position: absolute
        right: 517px
        top: 143px
        width: 885px
        height: 871px
        background-image: url("../assets/img/storagebox6.png")
        background-size: 885px 871px
        .content
          .table-title
            display: flex
            height: 36px
            line-height: 36px
            margin: 10px 0
            li
              flex: 1
              list-style: none
              font-size: 25px
              color: #94F0FD
              text-align: center
              &.no
                flex: 2
          .scroll-box
            height: 770px
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
                height: 55px
                line-height: 55px
                font-size: 20px
                text-align: center
                &:nth-of-type(2n + 1)
                  background: rgba(14, 95, 183, .3)
                li
                  flex: 1
                  &.no
                    flex: 2
                  &.out
                    color: #FFAD00
                    &.in
                      color: #00FFFF
    .numbox
      width: 331px
      height: 122px
      background-image: url("../assets/img/warehousenumbox.png")
      background-size: 331px 122px
      background-repeat: no-repeat
      overflow: hidden
      margin: 40px 0 0 60px
      .label
        font-size: 24px
        color: #ffffff
      &.sum
        .num
          font-size: 60px
          padding-left: 150px
          line-height: 60px
          color: #67FAFA
          font-family: 'Teko-Regular'
          font-weight: bold
        .label
          margin: 15px 0 0 75px
      &.today
        .num
          display: inline-block
          margin-left: 25px
          font-size: 51px
          line-height: 42px
          color: #67FAFA
          font-family: 'Teko-Regular'
          font-weight: bold
          vertical-align: middle
        .label
          margin: 12px 0 0 80px

    .copyright
      position: absolute
      bottom: 23px
      right: 69px
      font-family: 'HYWenHei'
      font-size: 20px
      color: #00DEFF
</style>