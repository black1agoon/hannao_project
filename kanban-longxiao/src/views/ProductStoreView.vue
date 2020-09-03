<template>
  <div class="board-wrapper">
    <div class="banner">
      <div class="title">龙潇出入库管理中心</div>
      <div class="name">成品仓</div>
      <div class="copyright">浙江汉脑数码科技有限公司版权所有</div>
    </div>
    <div class="dashboard">
      <div class="value">{{viewdata.sum}}</div>
      <p class="text">实时库存(箱)</p>
    </div>
    <div class="data-wrap">
      <div class="data">
        <p class="label">今日累计入库</p>
        <div class="val">{{viewdata.in}}</div>
        <div class="unit">箱</div>
      </div>
      <div class="data">
        <p class="label">今日累计出库</p>
        <div class="val">{{viewdata.out}}</div>
        <div class="unit">箱</div>
      </div>
    </div>
    <div class="order-wrap in">
      <p class="name">待入库单据总数</p>
      <div class="val">{{inApplyCount}}</div>
      <div class="order-box">
        <swiper class="swiper" :options="swiperOption">
          <div class="swiper-slide order" v-for="(inApply, index) in inApplyDtos" :key="index">
            <p class="no">{{inApply.idNo}}</p>
            <div class="line line1">
              <label>物品名称</label>
              <p class="value">{{inApply.itemObj.productName}}</p>
            </div>
            <div class="line line2">
              <label>任务数</label>
              <p class="value">{{inApply.itemObj.quantity}}{{inApply.itemObj.unitName}}</p>
            </div>
            <div class="line line3">
              <label>制单日期</label>
              <p class="value">{{getTime(inApply.applyTime).date1}}<span class="time">{{getTime(inApply.applyTime).date2}}</span>
              </p>
            </div>
          </div>
        </swiper>
      </div>
    </div>
    <div class="order-wrap out">
      <p class="name">待出库单据总数</p>
      <div class="val">{{outApplyCount}}</div>
      <div class="order-box">
        <swiper class="swiper" :options="swiperOption">
          <div class="swiper-slide order" v-for="(outApply, index) in outApplyDtos" :key="index">
            <p class="no">{{outApply.idNo}}</p>
            <div class="line line1">
              <label>物品名称</label>
              <p class="value">{{outApply.itemObj.productName}}</p>
            </div>
            <div class="line line2">
              <label>任务数</label>
              <p class="value">{{outApply.itemObj.quantity}}{{outApply.itemObj.unitName}}</p>
            </div>
            <div class="line line3">
              <label>制单日期</label>
              <p class="value">{{getTime(outApply.applyTime).date1}}<span class="time">{{getTime(outApply.applyTime).date2}}</span>
              </p>
            </div>
          </div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import { Swiper } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import api from '@/api'
  import { formatDate } from '@/utils/utils'

  export default {
    name: 'finished-bin-controller',
    components: {
      Swiper,
    },
    data () {
      return {
        swiperOption: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          slidesPerColumn: 2,
          spaceBetween: 0,
          autoplay: {
            delay: 10000,
          },
        },
        orderIn: Array.from({ length: 10 }, () => ({})),
        storeHouseId: null,
        viewdata: {
          sum: 0,
          in: 0,
          out: 0,
        },
        inApplyCount: 0,
        outApplyCount: 0,
        inApplyDtos: [],
        outApplyDtos: [],
      }
    },
    methods: {
      getStoreHouseByName () {
        return api.storage.getStoreHouseByName('成品仓').then(data => {
          // console.log(data)
          data && (this.storeHouseId = data.id)
        })
      },
      getApplyListByStoreHouseId (id) {
        api.applyKanBan.getApplyListByStoreHouseId(id).then(data => {
          this.inApplyCount = data.inApplyCount
          this.outApplyCount = data.outApplyCount
          this.inApplyDtos = data.inApplyDtos.flatMap(x => {
            if (x.applyItemDtos.length > 1) {
              return x.applyItemDtos.map((item, idx) => ({
                ...x,
                itemObj: x.applyItemDtos[idx],
              }))
            } else {
              return {
                ...x,
                itemObj: x.applyItemDtos[0],
              }
            }
          })
          this.outApplyDtos = data.outApplyDtos.flatMap(x => {
            if (x.applyItemDtos.length > 1) {
              return x.applyItemDtos.map((item, idx) => ({
                ...x,
                itemObj: x.applyItemDtos[idx],
              }))
            } else {
              return {
                ...x,
                itemObj: x.applyItemDtos[0],
              }
            }
          })
        })
      },
      getInventoryNow (id) {
        api.storage.getInventoryNow(id).then(data => {
          data && (this.viewdata = {
            sum: data.totalNumber,
            in: data.inStockNumber,
            out: data.outStockNumber,
          })
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
        this.getInventoryNow(this.storeHouseId)
      })
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../styles/reset.css'
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
      height: 305px
      background-image: url("../assets/img/store-main/banner.png")
      background-repeat: no-repeat
      background-size: 100% 305px
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
        left: 480px
        color: #CCF2FF
        font-size: 43px
        width: 190px
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

    .dashboard
      position: absolute
      top: 172px
      left: 131px
      width: 539px
      height: 455px
      background: url("../assets/img/store-main/dashboard.png") no-repeat
      background-size: cover

      .value
        color: #CCF2FF
        font-size: 158px
        font-family: pangmenzhengdao
        text-align: center
        margin-top: 134px

      .text
        position: absolute
        width: 100%
        bottom: 88px
        text-align: center
        color: #CCF2FF
        font-size: 32px

    .data-wrap
      position: absolute
      top: 671px
      left: 65px

      .data
        width: 668px
        height: 143px
        background: url("../assets/img/store-main/databox.png") no-repeat
        background-size: contain
        margin-bottom: 44px
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
        text-shadow: 0 0 5px rgba(0, 255, 245, 1)

      .order-box
        position: absolute
        top: 85px
        left: 85px
        width: 1050px
        height: 400px

        .swiper
          width: 1050px
          height: 400px

          .order
            margin-bottom: 15px
            width: 346px
            height: 184px
            background-size: 346px 184px
            background-repeat: no-repeat

            .no
              margin: 10px 0 20px 75px
              color: #ffffff
              font-size: 30px
              text-shadow: 0 0 5px rgba(0, 255, 245, 1)

            .line
              margin-top: 12px

              &.line1
                margin-left: 50px

              &.line2
                margin-left: 40px

              &.line3
                margin-left: 30px

              label
                display: inline-block
                width: 100px
                color: #4EC9FF
                font-size: 20px
                vertical-align: top

              .value
                display: inline-block
                font-size: 22px
                color: #CCF2FF

                .time
                  display: block
                  line-height: 30px

      &.in
        top: 49px
        background: url("../assets/img/store-main/orderwrap1.png") no-repeat

        .order
          background-image: url("../assets/img/store-main/orderin.png")

      &.out
        top: 558px
        background: url("../assets/img/store-main/orderwrap2.png") no-repeat

        .order
          background-image: url("../assets/img/store-main/orderout.png")
</style>
