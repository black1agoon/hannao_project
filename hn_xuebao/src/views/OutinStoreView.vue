<template>
  <div class="wrapper">
    <div class="dashboard">
      <div class="value">{{viewdata.sum}}</div>
      <p class="text">实时库存(件)</p>
    </div>
    <div class="data-wrap">
      <div class="data">
        <p class="label">今日累计入库</p>
        <div class="val">{{viewdata.in}}</div>
        <div class="unit">件</div>
      </div>
      <div class="data">
        <p class="label">今日累计出库</p>
        <div class="val">{{viewdata.out}}</div>
        <div class="unit">件</div>
      </div>
    </div>
    <div class="order-wrap in">
      <p class="name">待入库单据总数</p>
      <div class="val">{{waitStoInNumber}}</div>
      <div class="order-box">
        <swiper class="swiper" :options="swiperOption" v-if="waitStoinDetailList.length > 0">
          <div class="swiper-slide"
               v-for="(orders, index) in waitStoinDetailList"
               :key="index">
            <div class="order"
                 :class="{status1: order.type === '生产入库',
                 status2: order.type === '门店退库',
                 status3: order.type === '采购入库',
                 status4: order.type === '归还入库'}"
                 v-show="order.type"
                 v-for="(order, idx) in orders"
                 :key="idx">
              <div class="type">{{order.type}}</div>
              <p class="no">{{order.billNo}}</p>
              <div class="line date">
                <label>制单日期</label>
                <p class="value">{{order.createTime ? order.createTime.substring(0, 10) : null}}</p>
              </div>
              <div class="line number">
                <label>任务数</label>
                <p class="value">{{order.number}}件</p>
              </div>
            </div>
          </div>
        </swiper>
      </div>
    </div>
    <div class="order-wrap out">
      <p class="name">待出库单据总数</p>
      <div class="val">{{waitStoOutNumber}}</div>
      <div class="order-box">
        <swiper class="swiper" :options="swiperOption" v-if="waitStoOutDetailList.length > 0">
          <div class="swiper-slide"
               v-for="(orders, index) in waitStoOutDetailList"
               :key="index">
            <div class="order"
                 :class="{status5: order.type === '发货通知单出库',
                 status6: order.type === '电商订单发货'}"
                 v-show="order.type"
                 v-for="(order, idx) in orders"
                 :key="idx">
              <div class="type">{{order.type}}</div>
              <p class="no">{{order.billNo}}</p>
              <div class="line date">
                <label>制单日期</label>
                <p class="value">{{order.createTime ? order.createTime.substring(0, 10) : null}}</p>
              </div>
              <div class="line number">
                <label>任务数</label>
                <p class="value">{{order.number}}件</p>
              </div>
            </div>
          </div>
        </swiper>
      </div>
    </div>
    <error-box class="error-wrap">
    </error-box>
  </div>
</template>

<script>
  import { Swiper } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import {mapState} from 'vuex'
  import api from '@/api'
  import ErrorBox from '../components/ErrorBox'

  export default {
    name: 'outin-store-view',
    components: {
      Swiper,
      ErrorBox
    },
    computed: {
      ...mapState([
        'whframe'
      ]),
    },
    data () {
      return {
        swiperOption: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 0,
          loop: true,
          autoplay: {
            delay: 15000,
            disableOnInteraction: false
          }
        },
        viewdata: {
          sum: 0,
          in: 0,
          out: 0,
        },
        waitStoInNumber: 0,
        waitStoOutNumber: 0,
        waitStoOutDetailList: [],
        waitStoinDetailList: [],
      }
    },
    methods: {
      XBStoManageCenter() {
        api.LMFrameHandheld.XBStoManageCenter({
          xbStoreNo: this.whframe.xbStoreNo,
          whFrameID: this.whframe.whFrameID
        }).then(data => {
          this.viewdata = {
            sum: data.stockNumber,
            in: data.todayStoinNumber,
            out: data.todayStoOutNumber
          }
          this.waitStoInNumber = data.waitStoinList.waitStoInNumber
          this.waitStoOutNumber = data.waitStoOutList.waitStoOutNumber

          let array = []
          if (data.waitStoinList.waitStoinDetailList.length % 2 !== 0) {
            data.waitStoinList.waitStoinDetailList.push({})
          }
          if (data.waitStoOutList.waitStoOutDetailList.length % 2 !== 0) {
            data.waitStoOutList.waitStoOutDetailList.push({})
          }
          this.waitStoinDetailList = data.waitStoinList.waitStoinDetailList.reduce((rst, cur, idx) => {
            array.push(cur)
            if (idx % 2 === 1) {
              rst.push(array)
              array = []
            }
            return rst
          }, [])
          this.waitStoOutDetailList = data.waitStoOutList.waitStoOutDetailList.reduce((rst, cur, idx) => {
            array.push(cur)
            if (idx % 2 === 1) {
              rst.push(array)
              array = []
            }
            return rst
          }, [])
        })
      },
    },
    mounted () {
      if (JSON.stringify(this.whframe) !== '{}') {
        this.XBStoManageCenter()
      }
    },
    watch: {
      'whframe.id'() {
        this.XBStoManageCenter()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    position: absolute
    width: 1920px
    height: 1080px
    top: 0
    left: 0
    .dashboard
      position: absolute
      top: 155px
      left: 47px
      width: 690px
      height: 547px
      background: url("../assets/img/dashboard.png") no-repeat
      background-size: cover

      .value
        color: #CCF2FF
        font-size: 158px
        font-family: pangmenzhengdao
        text-align: center
        margin-top: 220px

      .text
        position: absolute
        width: 100%
        top: 155px
        text-align: center
        color: #CCF2FF
        font-size: 32px

    .data-wrap
      position: absolute
      top: 720px
      left: 65px

      .data
        width: 668px
        height: 143px
        background: url("../assets/img/databox.png") no-repeat
        background-size: contain
        margin-bottom: 30px
        display: flex
        align-items: center

        .label
          flex: 0 0 327px
          font-size: 30px
          color: #CCF2FF
          text-align: center
          font-weight: bold
          margin-top: 3px

        .val
          font-family: digital-dismay
          flex: 0 0 192px
          font-size: 85px
          color: #CCF2FF
          margin-top: 13px
          text-align: right
          margin-right: 15px

        .unit
          margin: 5px 0 0 22px
          flex: 1
          color: #CCF2FF
          font-size: 29px

    .order-wrap
      position: absolute
      width: 1150px
      height: 494px
      background-size: cover
      right: 0

      .name
        position: absolute
        left: 220px
        top: 23px
        font-size: 24px
        color: #CCF2FF

      .val
        position: absolute
        width: 88px
        text-align: center
        left: 380px
        top: 15px
        color: #ffffff
        font-size: 40px
        font-weight: bold

      .order-box
        position: absolute
        top: 80px
        left: 85px
        width: 1050px
        height: 420px
        transform: skew(-21deg)
        .swiper
          width: 1050px
          height: 420px

          .order
            position: relative
            margin-bottom: 10px
            width: 346px
            height: 190px
            background-size: 346px 190px
            background-repeat: no-repeat
            color: #ffffff
            overflow: hidden
            transform: skew(21deg)
            &.status1
              background-image: url("../assets/img/orderinbox1.png")
            &.status2
              background-image: url("../assets/img/orderinbox2.png")
            &.status3
              background-image: url("../assets/img/orderinbox3.png")
            &.status4
              background-image: url("../assets/img/orderinbox4.png")
            &.status5
              background-image: url("../assets/img/orderoutbox1.png")
            &.status6
              background-image: url("../assets/img/orderoutbox2.png")
            .type
              font-size: 24px
              margin: 17px 0 0 75px
            .no
              position: absolute
              top: 60px
              left: 65px
              font-size: 27px
            .line
              position: absolute
              &.date
                top: 110px
                left: 50px
              &.number
                top: 150px
                left: 35px
              label
                display: inline-block
                width: 100px
                font-size: 20px
                vertical-align: top
              .value
                display: inline-block
                font-size: 22px
      &.in
        top: 49px
        background: url("../assets/img/orderwrap1.png") no-repeat
      &.out
        top: 558px
        background: url("../assets/img/orderwrap2.png") no-repeat
    .error-wrap
      position: absolute
      top: 120px
      left: -8px
      width: 824px
      height: 960px
</style>
