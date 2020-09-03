<template>
  <div class="board-wrapper">
    <div class="time">{{time}}</div>
    <div class="block l1">
      <div class="title">订单信息
        <span class="detail" @click="openWindow('order')">
          查看订单信息&nbsp;&nbsp;&gt;&gt;
        </span>
      </div>
      <div class="orderinfo">
        <div class="info">
          <p class="label">总订单</p>
          <p class="val">
            <number-scroll :number="orderInfo.totalOrd" :font-width="30" :font-size="47" :height="47" color="#81D5E5">
            </number-scroll>
          </p>
        </div>
        <div class="info">
          <p class="label">进行中订单</p>
          <p class="val">
            <number-scroll :number="orderInfo.inworkOrd" :font-width="30" :font-size="47" :height="47" color="#81D5E5">
            </number-scroll>
          </p>
        </div>
        <div class="info">
          <p class="label">逾期订单</p>
          <p class="val overtime">
            <number-scroll :number="orderInfo.overdueOrd" :font-width="30" :font-size="47" :height="47" color="#FF5D75">
            </number-scroll>
          </p>
        </div>
      </div>
      <div class="notify">
        <p class="head">消息通知</p>
        <message-scroll :list="orderList"
                        :overdue-hour="orderInfo.overdueWarning"
                        :list-length="6"
                        :list-height="144">
        </message-scroll>
      </div>
    </div>
    <div class="block l2">
      <div class="title">员工及设备信息
        <span class="detail" @click="openWindow('equipment')">
          查看设备信息&nbsp;&nbsp;&gt;&gt;
        </span>
      </div>
      <div class="small-title">在职员工总人数</div>
      <div class="sum">
        <div class="val">
          <number-scroll :number="inServiceStaffCount" :font-width="24" :font-size="40" :height="85" color="#81D5E5">
          </number-scroll>
          <span class="unit">人</span>
        </div>
      </div>
      <div class="pie-box">
        <charts-views class="pie" :options="pieOptions">
        </charts-views>
        <div class="bar-text">
          <label class="label">设备运行率</label>
          <p class="pct">{{stationStatus.count ? (stationStatus.run / stationStatus.count * 100).toFixed(2) : 0}}%</p>
        </div>
        <div class="sum-equipment">
          <img class="equipment" src="../assets/img/main/equipment.png"/>
          <div class="text-box">
            <label>设备总数</label>
            <p class="text">
              <span class="val">
                <number-scroll :number="stationStatus.count" :font-width="24" :font-size="40" :height="56" color="#81D5E5">
          </number-scroll>
              </span>
              <span class="unit">台</span>
            </p>
          </div>
        </div>
        <div class="pie-legend">
          <div class="item status1">
            <p class="label">
              <i></i>运行中设备
            </p>
            <p class="val">{{stationStatus.run}}</p>
          </div>
          <div class="item status2">
            <p class="label">
              <i></i>故障设备
            </p>
            <p class="val">{{stationStatus.error}}</p>
          </div>
          <div class="item status3">
            <p class="label">
              <i></i>未开机设备
            </p>
            <p class="val">{{stationStatus.offline}}</p>
          </div>
        </div>
      </div>
      <div class="notify">
        <p class="head">消息通知</p>
        <equipment-msg-scroll :list="equipmentMsg"
                              :lastest-num-length="10"
                              :list-length="5"
                              :list-height="120">
        </equipment-msg-scroll>
      </div>
    </div>
    <div class="center">
      <p class="title">临近交期订单(10天)</p>
      <order-scroll class="order-jq" :list="ljOrderList" @openOrderDetail="id => openWindow('orderdetail', {PDetailId: id})">
      </order-scroll>
    </div>
    <div class="block r1">
      <div class="title">今日合格率</div>
      <div class="content">
        <div class="box">
          <cyclic-progress class="cyclic-progress">
          </cyclic-progress>
          <div class="mask">
            <p class="name">{{todayQcTaskOutputs[0].stepName}}</p>
            <p class="pct">
              {{ todayQcTaskOutputs[0].qcSum ? ((todayQcTaskOutputs[0].qcSum - todayQcTaskOutputs[0].ungradedQtySum) / todayQcTaskOutputs[0].qcSum * 100).toFixed(2) : 0}}%</p>
          </div>
          <div class="numbers">
            <div class="num">
              <label>今日质检总数</label>
              <p class="val">
                <number-scroll :number="todayQcTaskOutputs[0].qcSum"
                               :font-width="18"
                               :font-size="30"
                               :height="30"
                               :split-dotted="true"
                               color="#81D5E5">
                </number-scroll>
              </p>
            </div>
            <div class="num">
              <label>今日不合格数</label>
              <p class="val">
                <number-scroll :number="todayQcTaskOutputs[0].ungradedQtySum"
                               :font-width="18"
                               :font-size="30"
                               :height="30"
                               :split-dotted="true"
                               color="#81D5E5">
                </number-scroll>
              </p>
            </div>
          </div>
        </div>
        <div class="box">
          <cyclic-progress
              class="cyclic-progress"
              color="#8AEDFF">
          </cyclic-progress>
          <div class="mask">
            <p class="name" style="color: #8AEDFF">{{todayQcTaskOutputs[1].stepName}}</p>
            <p class="pct error">
              {{ todayQcTaskOutputs[1].qcSum ? ((todayQcTaskOutputs[1].qcSum - todayQcTaskOutputs[1].ungradedQtySum) / todayQcTaskOutputs[1].qcSum * 100).toFixed(2) : 0}}%</p>
          </div>
          <div class="numbers">
            <div class="num">
              <label>今日质检总数</label>
              <p class="val">
                <number-scroll :number="todayQcTaskOutputs[1].qcSum"
                               :font-width="18"
                               :font-size="30"
                               :height="30"
                               :split-dotted="true"
                               color="#81D5E5">
                </number-scroll>
              </p>
            </div>
            <div class="num">
              <label>今日不合格数</label>
              <p class="val error">
                <number-scroll :number="todayQcTaskOutputs[1].ungradedQtySum"
                               :font-width="18"
                               :font-size="30"
                               :height="30"
                               :split-dotted="true"
                               color="#FF5D75">
                </number-scroll>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block r2">
      <div class="title">近十天产量及合格率趋势图</div>
      <div class="content">
        <charts-views class="linebar" :options="linebarOptions">
        </charts-views>
      </div>
    </div>
    <div class="block r3">
      <div class="title">近十天半成品仓库库存趋势图
        <span class="detail"  @click="openWindow('warehouse')">
          查看库存明细&nbsp;&nbsp;&gt;&gt;
        </span>
      </div>
      <div class="content">
        <charts-views ref="linecharts" class="lines" :options="lineOptions">
        </charts-views>
      </div>
    </div>
    <order-window ref="orderWindow" @openOrderDetail="id => openWindow('orderdetail', {PTaskId: id})">
    </order-window>
    <order-detail-window ref="orderdetailWindow">
    </order-detail-window>
    <warehouse-window ref="warehouseWindow">
    </warehouse-window>
    <equipment-window ref="equipmentWindow">
    </equipment-window>
  </div>
</template>

<script>
  import Stomp from 'stompjs'
  import {MQTT_SERVICE, MQTT_USERNAME, MQTT_PASSWORD} from '@/assets/js/sysconstant.js'
  import {formatDate} from '../assets/js/utils'
  import CyclicProgress from './main/CyclicProgress'
  import ChartsViews from '@/components/common/ChartsView'
  import MessageScroll from './main/MessageScroll'
  import EquipmentMsgScroll from './main/EquipmentMsgScroll'
  import OrderScroll from './main/OrderScroll'
  import NumberScroll from '@/components/common/NumberScroll'
  import {MAIN} from './board.config'
  import api from '@/api'
  import OrderWindow from './main/window/OrderWindow'
  import OrderDetailWindow from './main/window/OrderDetailWindow'
  import WarehouseWindow from './main/window/WarehouseWindow'
  import EquipmentWindow from './main/window/EquipmentWindow'
  export default {
    name: 'main-view',
    components: {
      CyclicProgress,
      ChartsViews,
      MessageScroll,
      OrderScroll,
      NumberScroll,
      EquipmentMsgScroll,
      OrderWindow,
      OrderDetailWindow,
      WarehouseWindow,
      EquipmentWindow
    },
    data() {
      return {
        client: null,
        time: formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        timer: null,
        inServiceStaffCount: 0,  // 在职员工总数
        todayQcTaskOutputs: Array.from({length: 2}, () => ({
          stepName: null,
          qcSum: 0,
          ungradedQtySum: 0
        })),
        linebarOptions: MAIN.LINE_BAR,
        lineOptions: MAIN.LINE_OPTIONS,
        orderInfo: {
          totalOrd: 0,
          overdueOrd: 0,
          inworkOrd: 0,
          overdueWarning: 0
        },
        orderList: [],
        pieOptions: MAIN.PIE_OPTIONS,
        ljOrderList: [],
        stationStatus: {
          count: 0,
          offline: 0,
          run: 0,
          error: 0
        },
        equipmentMsg: []
      }
    },
    methods: {
      getTime() {
        setInterval(() => {
          this.time = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        }, 1000)
      },
      getApiData() {
        api.Spectaculars.getBigDataCommandCenter().then(data => {
          this.inServiceStaffCount = data.inServiceStaffCount
          this.orderInfo = {  // 订单信息
            totalOrd: data.orderInfoOutput.totalOrd,
            overdueOrd: data.orderInfoOutput.overdueOrd,
            inworkOrd: data.orderInfoOutput.inworkOrd,
            overdueWarning: data.orderInfoOutput.overdueWarning
          }
          this.orderList = data.orderInfoOutput.orderInfoMsgList
          // this.orderList = [
          //   {
          //     produceStatus: 'UnProduce',
          //     produceAmount: 0,
          //     ordCode: 'W200030',
          //     factoryHodMax: '2020-01-26 00:00:00',
          //     isOverdue: true,
          //     fromOverdueHour: 0,
          //     duration: 0
          //   },
          //   {
          //     produceStatus: 'UnProduce',
          //     produceAmount: 0,
          //     ordCode: 'W200030',
          //     factoryHodMax: '2020-01-26 00:00:00',
          //     isOverdue: false,
          //     fromOverdueHour: 0,
          //     duration: 50
          //   },
          //   {
          //     produceStatus: 'Produced',
          //     produceAmount: 0,
          //     ordCode: 'W200030',
          //     factoryHodMax: '2020-01-26 00:00:00',
          //     isOverdue: false,
          //     fromOverdueHour: 88,
          //     duration: 0
          //   },
          //   {
          //     produceStatus: 'Produced',
          //     produceAmount: 0,
          //     ordCode: 'W200030',
          //     factoryHodMax: '2020-01-26 00:00:00',
          //     isOverdue: false,
          //     fromOverdueHour: 8,
          //     duration: 0
          //   }
          // ]

          this.ljOrderList = data.nearFactoryHodBusOrderOutPuts

          this.todayQcTaskOutputs = data.todayQcTaskOutputs.length > 0 ? data.todayQcTaskOutputs : Array.from({length: 2}, () => ({
            stepName: null,
            qcSum: 0,
            ungradedQtySum: 0
          }))

          this.linebarOptions.xAxis[0].data = data.tenDayQcAndBookJobsOutputs.map(day => day.dayTime.substr(5, 5).replace(/-/, '.'))
          this.linebarOptions.series[0].data = data.tenDayQcAndBookJobsOutputs.map(day => (day.percentOfPass * 100).toFixed(1))
          this.linebarOptions.series[1].data = data.tenDayQcAndBookJobsOutputs.map(day => day.bookJobQtySum)

          if (data.tenDayWhQtyOutputs && data.tenDayWhQtyOutputs.length > 0) {
            this.lineOptions.xAxis[0].data = data.tenDayWhQtyOutputs[0].tenDayWhQtyDetailList.map(day => day.dayTime.substr(5, 5).replace(/-/, '.'))
            this.lineOptions.legend.data = data.tenDayWhQtyOutputs.map(wh => wh.whName)
            data.tenDayWhQtyOutputs.forEach((line, idx) => {
              this.lineOptions.series[idx] = {
                name: line.whName,
                type: 'line',
                symbol: 'circle',
                smooth: false,
                data: line.tenDayWhQtyDetailList.map(d => d.qty)
              }
            })
          }
        })
        api.jlw.getStationStatus().then(data => {
          this.stationStatus = data
          this.pieOptions.series[0].data[0].value = data.run
          this.pieOptions.series[0].data[1].value = data.error
          this.pieOptions.series[0].data[2].value = data.offline
        })
      },
      connect() {
        //初始化mqtt客户端，并连接mqtt服务
        const headers = {
          login: MQTT_USERNAME,
          passcode: MQTT_PASSWORD
        }
        this.client = Stomp.client(MQTT_SERVICE)
        this.client.connect(headers, this.onConnected, this.onFailed)
      },
      onConnected(frame) {
        //订阅频道
        this.client.subscribe('equipment-status', this.responseCallback, this.onFailed)
      },
      onFailed(frame) {
        // console.log('MQ Failed' + frame)
      },
      responseCallback(frame) {
        // console.log('MQ msg========================', frame.body)
        let jsondata = JSON.parse(frame.body)
        // let jsondata = eval('(' + frame.body + ')')
        // 接收消息处理
        // console.log(jsondata)
        this.equipmentMsg = this.equipmentMsg.concat(jsondata)
      },
      openWindow(window, params) {
        switch(window) {
          case 'order':
            this.$refs.orderWindow.open()
            break
          case 'equipment':
            this.$refs.equipmentWindow.open()
            break
          case 'warehouse':
            this.$refs.warehouseWindow.open()
            break
          case 'orderdetail':
            this.$refs.orderdetailWindow.open(params)
            break
        }
      }
    },
    mounted() {
      this.connect()

      this.getTime()
      this.getApiData()
      this.timer = setInterval(() => {
        this.getApiData()
      }, 5 * 60 * 1000)
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
    background-image: url("../assets/img/main/background.jpg")
    background-size: 1920px 1080px
    background-repeat: no-repeat
    font-family: 'PingFang'
    -webkit-backface-visibility: hidden
    /* transform: scale(3)
    transform-origin: top left */
    .time
      position: absolute
      color: #8AEDFF
      font-size: 20px
      top: 78px
      left: 50%
      transform: translateX(-50%)
    .center
      position: absolute
      top: 155px
      left: 520px
      .title
        font-size: 18px
        color: #8AEDFF
        line-height: 45px
        text-align: center
        width: 859px
        height: 45px
        background-image: url("../assets/img/main/linjinjiaoqi.png")
        background-size: 859px 45px
        background-repeat: no-repeat
      .order-jq
        margin: 30px auto 0
        width: 832px
    .block
      position: absolute
      .title
        position: relative
        color: #8AEDFF
        font-size: 18px
        height: 46px
        line-height: 46px
        .detail
          font-size: 12px
          color: #8AEDFF
          float: right
          cursor: pointer
          margin-right: 20px
        &:after
          position: absolute
          left: 0
          bottom: 0
          content: ''
          width: 470px
          height: 2px
          background: linear-gradient(270deg, rgba(20, 203, 236, 0) 0%, rgba(20, 203, 236, 1) 100%)
      &.l1, &.l2
        .notify
          width: 467px
          margin-top: 15px
          border: 2px solid #003B68
          background: rgba(2, 11, 35, 0.45)
          .head
            color: #81D5E5
            font-size: 16px
            line-height: 42px
            padding-left: 16px
      &.l1
        left: 23px
        top: 95px
        .orderinfo
          margin-top: 10px
          width: 471px
          height: 120px
          background-image: url("../assets/img/main/orderinfo.png")
          background-size: 471px 120px
          background-repeat: no-repeat
          display: flex
          justify-content: center
          align-items: center
          .info
            margin: 0 24px
            .label
              text-align: center
              color: #81D5E5
              font-size: 16px
            .val
              margin-top: 13px
              text-align: center
              color: #81D5E5
              font-size: 47px
              font-weight: bold
              &.overtime
                color: #FF5D75
        .notify
          height: 186px
      &.l2
        left: 23px
        top: 485px
        .small-title
          margin-top: 15px
          color: #81D5E5
          font-size: 13px
          text-align: center
        .sum
          margin-top: 0
          width: 487px
          height: 80px
          background-image: url("../assets/img/main/zzemployee.png")
          background-size: 487px 80px
          background-repeat: no-repeat
          .val
            text-align: center
            margin-right: 10px
            color: #81D5E5
            font-size: 40px
            font-weight: bold
            display: flex
            justify-content: center
            .unit
              font-weight: bold
              font-size: 18px
              margin-top: 38px
        .pie-box
          position: relative
          width: 476px
          height: 220px
          .bar-text
            position: absolute
            top: 48px
            left: 33px
            width: 122px
            height: 122px
            border: 1px solid #02A9FA
            border-radius: 50%
            text-align: center
            .label
              display: block
              color: #02A9FA
              font-size: 15px
              font-weight: bold
              margin-top: 22px
            .pct
              margin-top: 14px
              font-size: 30px
              color: #81D5E5
          .sum-equipment
            position: absolute
            right: 0
            top: 20px
            width: 276px
            height: 99px
            background-image: url("../assets/img/main/equipmentsum.png")
            background-size: 276px 99px
            background-repeat: no-repeat
            .equipment
              width: 84px
              height: 84px
              margin: 8px 0 0 25px
            .text-box
              position: absolute
              left: 130px
              top: 11px
              color: #81D5E5
              label
                font-size: 13px
              .text
                margin-top: 10px
                display: flex
                .val
                  font-weight: bold
                  font-size: 40px
                .unit
                  margin: 25px 0 0 10px
                  font-weight: bold
                  font-size: 18px
          .pie-legend
            position: absolute
            right: 0
            top: 120px
            width: 276px
            height: 80px
            display: flex
            align-items: center
            justify-content: space-between
            .item
              &.status1
                i
                  background: #02A9FA
              &.status2
                i
                  background: #FF5D75
                .val
                  color: #FF5D75
              &.status3
                i
                  background: #042439
              .label
                color: #81D5E5
                font-size: 10px
                i
                  width: 12px
                  height: 12px
                  display: inline-block
                  vertical-align: bottom
                  margin-right: 6px
              .val
                margin-top: 10px
                text-align: center
                font-size: 26px
                color: #81D5E5
      &.r1
        width: 484px
        right: 23px
        top: 105px
        .content
          display: flex
          justify-content: space-between
          margin-top: 20px
          .box
            position: relative
            width: 230px
            height: 269px
            border: 2px solid #003B68
            background: rgba(2,11,35,0.45)
            .cyclic-progress
              margin: 18px 0 0 34px
            .mask
              position: absolute
              width: 120px
              height: 120px
              top: 38px
              left: 54px
              border-radius: 50%
              box-shadow: 0 0 3px 2px #8AEDFF
              .name
                margin: 25px 0 15px 0
                text-align: center
                color: #02A9FA
                font-size: 25px
                font-weight: bold
              .pct
                font-size: 26px
                color: #8AEDFF
                font-weight: bold
                text-align: center
            .numbers
              position: absolute
              width: 100%
              bottom: 0
              height: 70px
              display: flex
              align-items: center
              color: #81D5E5
              .num
                flex: 1
                margin-left: 10px
                label
                  font-size: 10px
                .val
                  margin-top: 5px
                  font-size: 30px
                  font-weight: bold
                  &.error
                    color: #FF5D75
      &.r2
        width: 484px
        right: 23px
        top: 470px
        .content
          height: 270px
          .linebar
            width: 484px
            height: 230px
      &.r3
        width: 484px
        right: 23px
        top: 770px
        .content
          height: 250px
          .lines
            width: 100%
            height: 230px

</style>