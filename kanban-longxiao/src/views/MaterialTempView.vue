<template>
  <div class="container">
    <div class="container-top flex align-center">
      <h3 class="font-AP-B title">龙潇出入库管理中心</h3>
      <div class="sub-title">{{storageName}}</div>
      <div class="copyright">浙江汉脑数码科技有限公司版权所有</div>
    </div>
    <div class="container-details">
      <h4 class="title font-AP-B">原材料库存明细</h4>
      <div class="details-wrap">
        <div class="wrap-title flex">
          <span>序号</span>
          <span>名称</span>
          <span>今日入库</span>
          <span>今日出库</span>
          <span>剩余库存</span>
          <span>单位</span>
        </div>
        <div class="wrap-list">
          <transition enter-active-class="animated slideInRight slower"
                      leave-active-class="animated slideOutLeft slower">
            <div v-if="showList" :key="showKey">
              <div class="item flex" v-for="(t, i) in detailsList" :key="i">
                <span>{{t.no}}</span>
                <span>{{t.name}}</span>
                <span>{{t.todayIn}}</span>
                <span>{{t.todayOut}}</span>
                <span>{{t.stock}}</span>
                <span>{{t.unit}}</span>
              </div>
            </div>
          </transition>
        </div>
        <div class="wrap-dot flex">
          <i :class="query.page === t ? 'active' : ''"
             @click="getDetailsList(t)" v-for="t in detailsPages" :key="t"></i>
        </div>
      </div>
    </div>
    <div class="container-records">
      <h4 class="font-AP-B">原材料出库记录</h4>
      <kira-marquee ref="records" class="records-wrap" :duration="recordsSpeed">
        <div class="item" v-for="(t, i) in getRecordsList" :key="i">
          <time class="timeline-time flex">
            <span class="font-PMZD">{{t.time}}</span>
            <span class="font-PMZD">{{t.date}}</span>
          </time>
          <div class="timeline-dot"></div>
          <div class="timeline-state" :class="t.state === '入库' ? 'state-green': ''">
            {{t.state}}
          </div>
          <div class="timeline-box">
            <div class="list-item flex justify-between" v-for="(j, k) in t.list" :key="i + '' + k">
              <span>{{j.name}}</span>
              <span><i class="font-PMZD">{{j.count}}</i>kg</span>
            </div>
          </div>
        </div>
      </kira-marquee>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import { KiraMarquee } from '@x22/kiraui'
  import '@x22/kiraui/dist/kiraui.css'

  export default {
    name: 'Material',
    components: { KiraMarquee },
    computed: {
      getRecordsList () {
        let that = this
        return that.scrollHeight > 915 ? that.recordsList : that.recordsList.concat(that.recordsList)
      },
    },
    data () {
      return {
        detailsList: [],
        detailsPages: 0,
        detailsSpeed: 10,
        recordsList: [],
        scrollHeight: 0,
        recordsSpeed: 10,
        showList: true,
        showKey: 0,
        storageName: '原料暂存仓',
        query: {
          storeHouseGuid: '',
          page: 1,
          rows: 7,
        },
        timer1: null,
        timer2: null,
        storageId: '',
        selectPage: 1,
      }
    },
    methods: {
      getStorageInfo () {
        return api.storage.GetStoreHouseByName(this.storageName).then(data => {
          this.storageId = data.id
          return data.id
        })
      },
      getData (id) {
        api.storage.GetStoreHouseInOutDetails(id).then(data => {
          if (data) {
            this.recordsList = data.map(v => {
              return {
                date: v.createTime.slice(6, 10),
                time: v.createTime.slice(11, 16),
                state: v.applyItemLogTypeName,
                list: v.applyItemLogDetails.map(k => {
                  return {
                    name: k.productName,
                    count: k.quantity,
                  }
                }),
              }
            })
            this.scrollHeight = this.$refs['records'].$el.scrollHeight
          }
        })
      },
      getDetailPage (id) {
        this.query.storeHouseGuid = id
        return api.storage.GetInventoryDetailPage(this.query).then(data => {
          let pages = 1
          if (data && data.rows.length > 0) {
            const records = data
            if (records.total > 7) {
              pages = records.total % 7 > 0 ? Math.ceil(records.total / 7) : records.total / 7
            }
            this.detailsList = records.rows.map(v => {
              return {
                no: v.serialNumber,
                name: v.productTitle,
                todayIn: v.inStockNumber,
                todayOut: v.outStockNumber,
                stock: v.stockNumber,
                unit: v.unitName,
              }
            })
          }
          this.detailsPages = pages
        })
      },
      getDetailsList (page) {
        if (this.detailsPages < 2 && this.detailsList.length <= 7) return false
        this.showList = false
        this.showKey = Math.random() * 10
        this.query.page = page
        if (page === this.detailsPages) {
          this.selectPage = 1
        } else {
          this.selectPage++
        }
        this.getDetailPage(this.query.storeHouseGuid).then(() => {
          setTimeout(() => {
            this.showList = true
          })
        })
      },
    },
    mounted () {
      this.getStorageInfo().then(id => {
        this.getData(id)
        this.getDetailPage(id)
      })
      this.timer1 = setInterval(() => {
        this.getData(this.storageId)
        this.getDetailPage(this.storageId)
      }, 1000 * 60 * 3)
      this.timer2 = setInterval(() => {
        this.getDetailsList(this.selectPage)
      }, 8000)
    },
    destroyed () {
      clearInterval(this.timer1)
      clearInterval(this.timer2)
    },
  }
</script>

<style lang="sass" scoped>
  .container
    width: 1920px
    height: 1080px
    font-size: 30px
    background-image: url("../assets/img/store-temp/content_bg.png")
    background-repeat: no-repeat
    background-size: cover

    &-top
      width: 100%
      height: 119px
      background-image: url("../assets/img/store-temp/title_bg.png")
      background-repeat: no-repeat
      background-size: 100%

      .title
        padding: 0 22px 0 16px
        font-size: 50px

      .sub-title
        width: 270px
        height: 76px
        font-size: 43px
        line-height: 76px
        text-align: center
        background: linear-gradient(135deg, rgba(6, 35, 92, 1) 0%, rgba(1, 27, 78, 1) 100%)
        border: 2px solid rgba(51, 113, 194, 1)

      .copyright
        position: absolute
        top: 2px
        right: 59px
        font-size: 21px
        line-height: 29px

    h4
      font-weight: 800
      text-shadow: 0 0 10px rgba(0, 255, 245, 0.90)

    &-details
      position: absolute
      top: 161px
      left: 94px
      width: 868px
      height: 870px
      background-image: url("../assets/img/store-temp/detail_bg.png")
      background-repeat: no-repeat
      background-size: cover

      > h4
        text-align: center
        padding-top: 63px
        padding-bottom: 20px

      .details-wrap
        position: relative
        width: 868px
        height: 685px
        padding: 0 72px 0 46px
        overflow: hidden

        .wrap-title, .wrap-list .item
          > span
            flex: 1
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis

            &:first-child
              text-align: center
              max-width: 116px

            &:last-child
              max-width: 70px

            &:nth-child(3), &:nth-child(4), &:nth-child(5)
              max-width: 124px

        .wrap-title
          line-height: 53px

          > span
            font-size: 24px

        .wrap-list
          position: absolute
          top: 53px
          left: 46px
          width: 750px
          height: 602px
          overflow: hidden

          > div
            position: absolute
            top: 0
            left: 0
            width: 100%

          .item
            height: 85px
            line-height: 86px
            border-bottom: 1px solid rgba(52, 205, 253, 1)

        .wrap-dot
          position: absolute
          bottom: 0
          left: 50%
          transform: translateX(-50%)

          > i
            width: 16px
            height: 2px
            margin: 0 2px
            background-color: rgba(72, 243, 250, .2)
            cursor: pointer

            &:hover, &.active
              background-color: rgba(72, 243, 250, 1)

    &-records
      position: absolute
      top: 64px
      right: 77px
      width: 817px
      overflow: hidden
      padding-left: 80px

      &:before
        position: absolute
        left: 0
        top: 16px
        content: ''
        width: 50px
        height: 980px
        background-image: url("../assets/img/store-temp/records_bg.png")
        background-repeat: no-repeat
        background-size: cover

      > h4
        line-height: 42px
        padding-bottom: 59px

      .records-wrap
        height: 915px
        overflow: hidden
        position: relative

        .item
          position: relative
          padding-bottom: 28px

          &:before
            content: ''
            position: absolute
            top: 0
            bottom: 0
            width: 1px
            background-color: #CCF2FF
            left: 164px

          .timeline-time
            position: absolute
            top: 0
            left: 0
            align-items: flex-end
            flex-direction: column
            font-size: 16px
            line-height: 1.5

            > span
              &:first-child
                font-size: 26px
                line-height: 26px
                padding-bottom: 5px

              &:last-child
                font-size: 36px
                line-height: 36px

          .timeline-dot
            position: absolute
            top: 6px
            left: 159px
            width: 11px
            height: 11px
            background-color: #CCF2FF
            border-radius: 50%
            transform: translateY(-50%)

          .timeline-state
            position: absolute
            top: 0
            left: 217px
            width: 70px
            height: 35px
            background-color: #08A1F7
            line-height: 35px
            font-size: 24px
            text-align: center
            border-radius: 5px

            &.state-green
              background-color: #00BF8C

          .timeline-box
            margin-left: 334px
            border: 12px solid
            border-image-source: url("../assets/img/store-temp/records_timline_box.png")
            border-image-slice: 12 fill
            box-sizing: border-box

            .list-item
              width: 319px
              margin: 0 auto


    ::v-deep
      .records-wrap::-webkit-scrollbar
        width: 0

      .records-wrap
        -ms-overflow-style: none
        overflow: -moz-scrollbars-none
  /*  */
</style>
