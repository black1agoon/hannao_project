<template>
  <div class="board-wrapper">
    <div class="banner">
      <div class="title">龙潇出入库管理中心</div>
      <div class="name">原材料仓</div>
      <div class="copyright">浙江汉脑数码科技有限公司版权所有</div>
    </div>
    <div class="table-detail">
      <ul class="table-title">
        <li class="no">序号</li>
        <li class="name">名称</li>
        <li class="rest">剩余库存</li>
        <li class="unit">单位</li>
      </ul>
      <div class="tablet-box">
        <transition name="slide-left">
          <div class="table-list" v-if="showlist" :key="key">
            <ul class="detail"
                v-for="(material, index) in materialList"
                :key="index">
              <li class="no">{{4 * (query.page - 1) + index + 1}}</li>
              <li class="name">{{material.productTitle}}</li>
              <li class="rest">{{material.stockNumber}}</li>
              <li class="unit">{{material.unitName}}</li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
    <div class="data-wrap">
      <div class="data data1">
        <p class="label">待出库单据</p>
        <div class="val">{{outApplyCount}}</div>
        <div class="unit">张</div>
      </div>
      <div class="data data2">
        <p class="label">待入库单据</p>
        <div class="val">{{inApplyCount}}</div>
        <div class="unit">张</div>
      </div>
    </div>
    <div class="order-box">
      <div class="scroll" :style="listScroll">
        <div class="order"
             :class="{
             in: order.type === 0,
             out: order.type === 1,
             box1: order.applyItemDtos.length <= 3,
             box2: order.applyItemDtos.length > 3 && order.applyItemDtos.length <= 6,
             box3: order.applyItemDtos.length > 6
           }"
             v-for="(order, index) in viewOrderList"
             :key="index">
          <div class="no">{{order.idNo}}</div>
          <div class="time">
            <div class="label">制单时间</div>
            <div class="tm">
              {{getTime(order.applyTime).date1}}<br>{{getTime(order.applyTime).date2}}
            </div>
          </div>
          <ul class="material-box">
            <li class="material"
                v-for="(material, idx) in order.applyItemDtos"
                :key="idx">
              <div class="row row1">
                <div class="label">物品名称</div>
                <div class="value">{{material.productName}}</div>
              </div>
              <div class="row row2">
                <div class="label">任务数</div>
                <div class="value">{{material.quantity}}{{material.unitName}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import { formatDate } from '@/utils/utils'

  export default {
    name: 'material-bin-controller',
    components: {},
    computed: {
      viewOrderList () {
        if (this.totalHeight > 1020) {
          return this.orderList.concat(this.orderList)
        } else {
          return this.orderList
        }
      },
      listScroll () {
        return this.viewOrderList.length > 3 ? {
          animationDuration: `${this.viewOrderList.length * 3}s`,
        } : {}
        // return {}
      },
    },
    data () {
      return {
        query: {
          page: 1,
          rows: 4,
          storeHouseGuid: null,
        },
        totalPage: 0,
        showlist: true,
        key: Math.random(),
        materialList: [],
        timer: null,
        apiTimer: null,
        orderList: [],
        totalHeight: 0,
        storeHouseId: null,
        inApplyCount: 0,
        outApplyCount: 0,
      }
    },
    methods: {
      slideLoop () {
        if (this.totalPage > 1) {
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            this.showlist = false
            this.key = Math.random()
            if (++this.query.page > this.totalPage) {
              this.query.page = 1
            }
            this.getInventoryDetailPage().then(() => {
              this.showlist = true
            })
          }, 5000)
        }
      },
      getStoreHouseByName () {
        return api.storage.getStoreHouseByName('原料仓').then(data => {
          if (data) {
            this.storeHouseId = data.id
            this.query.storeHouseGuid = data.id
          }
        })
      },
      getApplyListByStoreHouseId (id) {
        api.applyKanBan.getApplyListByStoreHouseId(id).then(data => {
          this.inApplyCount = data.inApplyCount
          this.outApplyCount = data.outApplyCount
          this.orderList = data.inApplyDtos.map(d => ({
            type: 0,
            ...d,
          })).concat(data.outApplyDtos.map(d => ({
            type: 1,
            ...d,
          })))
          this.$nextTick(() => {
            let els = document.getElementsByClassName('order')
            for (let i = 0; i < els.length; i++) {
              this.totalHeight += els[i].offsetHeight
            }
          })
        })
      },
      getInventoryDetailPage () {
        return api.storage.getInventoryDetailPage(this.query).then(data => {
          if (data && data.rows.length > 0) {
            this.materialList = data.rows
            this.totalPage = Math.ceil(data.total / 4)
          } else {
            this.materialList = []
            this.totalPage = 0
          }
        })
      },
      getTime (time) {
        if (time) {
          let date = new Date(time)
          return {
            date1: formatDate(date, 'yyyy-MM-dd'),
            date2: formatDate(date, 'hh:mm:ss'),
          }
        } else {
          return {
            data1: null,
            data2: null,
          }
        }
      },
    },
    mounted () {
      this.getStoreHouseByName().then(() => {
        this.getApplyListByStoreHouseId(this.storeHouseId)
        this.getInventoryDetailPage().then(() => {
          this.slideLoop()
        })
      })
      this.apiTimer = setInterval(() => {
        this.getApplyListByStoreHouseId(this.storeHouseId)
        this.getInventoryDetailPage().then(() => {
          this.slideLoop()
        })
      }, 10 * 60 * 1000)
    },
    destroyed () {
      clearInterval(this.timer)
      clearInterval(this.apiTimer)
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../styles/reset.css'
  @import "../styles/scroll.scss"
  *
    box-sizing: unset
  .board-wrapper
    width: 1920px
    height: 1080px
    background: radial-gradient(circle, rgba(18, 45, 95, 1) 0%, rgba(9, 21, 43, 1) 100%)
    overflow: hidden

    .banner
      position: relative
      width: 100%
      height: 120px
      background-image: url("../assets/img/store-main/mbanner.png")
      background-repeat: no-repeat
      background-size: 100% 120px
      overflow: hidden

      .title
        position: absolute
        font-size: 50px
        color: #CCF2FF
        top: 26px
        left: 26px
        font-weight: bold

      .name
        position: absolute
        top: 20px
        left: 515px
        color: #CCF2FF
        font-size: 43px
        width: 226px
        height: 72px
        border: 2px solid rgba(51, 113, 194, 1)
        background: linear-gradient(135deg, rgba(6, 35, 92, 1) 0%, rgba(1, 27, 78, 1) 100%)
        text-align: center
        line-height: 72px

      .copyright
        position: absolute
        right: 59px
        top: 5px
        color: #CCF2FF
        font-size: 21px

    .table-detail
      position: absolute
      top: 150px
      left: 73px
      width: 647px
      height: 550px
      background: url("../assets/img/store-main/tabledetail.png") no-repeat
      background-size: cover
      color: #ffffff
      overflow: hidden

      .table-title
        margin-top: 105px
        padding: 0 58px

      .table-title, .detail
        display: flex
        font-size: 24px

        .no
          flex: 0 0 80px
          margin-right: 20px
          text-align: center

        .name
          flex: 0 0 120px
          margin-right: 81px

        .rest
          margin-right: 30px
          flex: 0 0 100px

        .unit
          flex: 0 0 90px

      .tablet-box
        position: absolute
        left: 58px
        right: 58px
        margin: 20px auto 0
        overflow: hidden
        height: 344px

      .table-list
        position: absolute
        width: 100%
        display: flex
        flex-direction: column
        box-sizing: border-box
        transition: all 2s ease-out

        &.slide-left-enter
          transform: translate(100%, 0)

        &.slide-left-leave-to
          transform: translate(-100%, 0)

        .detail
          flex: 1
          font-size: 30px
          line-height: 85px
          border-bottom: 1px solid #34CDFD

    .data-wrap
      position: absolute
      top: 720px
      left: 65px

      .data
        width: 668px
        height: 143px
        background-repeat: no-repeat
        background-size: contain
        margin-bottom: 20px
        display: flex
        align-items: center

        &.data1
          background-image: url("../assets/img/store-main/mdatabox.png")

        &.data2
          background-image: url("../assets/img/store-main/mdatabox2.png")

        .label
          flex: 0 0 362px
          font-size: 30px
          color: #CCF2FF
          text-align: center
          font-weight: bold
          margin-top: 3px

        .val
          font-family: digital-dismay
          flex: 0 0 177px
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

    .order-box
      position: absolute
      right: 0
      top: 60px
      width: 1090px
      height: 1020px
      overflow: hidden
      /*&:hover*/
      /*.scroll*/
      /*animation-play-state: paused*/

      .scroll
        animation-name: columnScroll
        animation-iteration-count: infinite
        animation-timing-function: linear

        .order
          position: relative
          width: 1090px
          padding-bottom: 40px

          .no
            position: absolute
            left: 100px
            top: 20px
            color: #ffffff
            text-shadow: 0 0 5px rgba(0, 255, 245, 1)
            font-size: 27px

          .time
            position: absolute
            height: 50px
            top: 13px
            left: 340px
            color: #1C3E6F
            font-size: 22px

            .label
              display: inline-block
              vertical-align: top
              line-height: 50px
              font-weight: bold
              margin-right: 11px

            .tm
              font-weight: bold
              line-height: 25px
              display: inline-block

          .material-box
            position: absolute
            top: 101px
            left: 55px
            display: flex
            width: 985px
            flex-wrap: wrap

            .material
              flex: 0 0 315px
              height: 90px
              background-size: 315px 90px
              background-repeat: no-repeat
              margin-bottom: 30px

              .row
                &.row1
                  margin: 15px 30px 0 45px

                &.row2
                  margin: 15px 30px 0 35px

                .label
                  display: inline-block
                  font-size: 20px

                  margin-right: 30px

                .value
                  display: inline-block
                  font-size: 22px
                  color: #CCF2FF

          &.in
            .material
              background-image: url("../assets/img/store-main/materialin.png")

              .label
                color: #4EC9FF

            &.box1
              height: 228px
              background: url("../assets/img/store-main/inbox1.png") no-repeat
              background-size: 1090px 228px

            &.box2
              height: 348px
              background: url("../assets/img/store-main/inbox2.png") no-repeat
              background-size: 1090px 348px

            &.box3
              height: 468px
              background: url("../assets/img/store-main/inbox3.png") no-repeat
              background-size: 1090px 468px

          &.out
            .material
              background-image: url("../assets/img/store-main/materialout.png")

              .label
                color: #4EFFF8

            &.box1
              height: 228px
              background: url("../assets/img/store-main/outbox1.png") no-repeat
              background-size: 1090px 228px

            &.box2
              height: 348px
              background: url("../assets/img/store-main/outbox2.png") no-repeat
              background-size: 1090px 348px

            &.box3
              height: 468px
              background: url("../assets/img/store-main/outbox3.png") no-repeat
              background-size: 1090px 468px
</style>
