<template>
  <div class="container">
    <div class="container-top flex align-center">
      <h3 class="font-AP-B title">龙潇出入库管理中心</h3>
      <div class="sub-title">{{storageName}}</div>
      <div class="copyright">浙江汉脑数码科技有限公司版权所有</div>
    </div>
    <div class="container-details flex justify-between align-center">
      <div class="real-time">
        <div class="numb flex justify-between align-center">
          <i class="font-PMZD" :style="countStyles">{{counts.real}}</i>
          <span>实时库存（箱）</span>
        </div>
        <div class="out-numb flex align-center">
          今日出库<i class="font-PMZD">{{counts.out}}</i>箱
        </div>
        <div class="in-numb flex align-center">
          今日入库<i class="font-PMZD">{{counts.in}}</i>箱
        </div>
      </div>
      <div class="charts">
        <div class="charts-title flex justify-between">
          <div class="title">
            15天出入库数量统计
            <i>单位：箱</i>
          </div>
          <div class="legend flex">
            <span class=" flex align-center">出库</span>
            <span class=" flex align-center">入库</span>
          </div>
        </div>
        <ray-line-chart class="charts-box" :chart-x="chartX" :chart-data="chartData"></ray-line-chart>
      </div>
    </div>
    <div class="container-records">
      <h4 class="font-AP-B">成品出库记录</h4>
      <kira-marquee class="records-wrap" :duration="duration">
        <div class="item" v-for="(t, i) in getRecordsList" :key="i">
          <time class="timeline-time flex">
            <span class="font-PMZD">{{t.date}}</span>
            <span class="font-PMZD">{{t.time}}</span>
          </time>
          <div class="timeline-dot"></div>
          <div class="timeline-box flex">
            <div class="box-code font-PMZD">{{t.code}}</div>
            <div class="box-text flex justify-between">
              <span>{{t.name}}</span>
              <span><i class="font-PMZD">{{t.counts}}</i>箱</span>
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
  import RayLineChart from '@/components/store-temp/RayLineChart'

  export default {
    name: 'Material',
    components: { RayLineChart, KiraMarquee },
    data () {
      return {
        storageName: '成品暂存仓',
        counts: {
          real: 0,
          out: 0,
          in: 0,
        },
        chartX: [],
        chartData: [],
        recordsList: [],
        duration: 0,
        storageId: '',
        timer: null,
      }
    },
    computed: {
      getRecordsList () {
        let that = this
        return that.recordsList.length < 8 ? that.recordsList : that.recordsList.concat(that.recordsList)
      },
      countStyles () {
        const len = (('' + this.counts.real) || '0').length
        return {
          fontSize: `min(148px, ${30 / len}vw)`,
        }
      },
    },
    methods: {
      getStorageInfo () {
        return api.storage.GetStoreHouseByName(this.storageName).then(data => {
          this.storageId = data.id
          return data.id
        })
      },
      getData (id) {
        api.storage.GetInventoryNow(id).then(data => {
          if (data) {
            this.counts = {
              real: data.totalNumber,
              in: data.inStockNumber,
              out: data.outStockNumber,
            }
          }
        })
        api.storage.GetInventoryHistoryDay(id).then(data => {
          if (data) {
            const rows = data
            this.chartX = rows.map(v => v.date.slice(8, 10))
            this.chartData = [
              rows.map(v => v.outStoreNumber),
              rows.map(v => v.inStoreNumber),
            ]
            console.log(this.chartData, 'data')
          }
        })
        api.storage.GetStoreHouseInOutDetails(id).then(data => {
          if (data) {
            this.recordsList = data.map(v => {
              return {
                date: v.createTime.slice(6, 10),
                time: v.createTime.slice(11, 16),
                code: v.applyItemLogDetails[0].applyIdNo,
                name: v.applyItemLogDetails[0].productName,
                counts: v.applyItemLogDetails[0].quantity,
              }
            })

            if (this.recordsList.length < 8) {
              this.duration = 0
            } else {
              this.duration = this.recordsList.length * 4
            }
          }
        })
      },
    },
    mounted () {
      this.getStorageInfo().then(id => {
        this.getData(id)
      })
      this.timer = setInterval(() => {
        this.getData(this.storageId)
      }, 1000 * 60 * 3)
    },
    destroyed () {
      clearInterval(this.timer)
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

    &-details
      position: absolute
      top: 153px
      left: 31px
      flex-direction: column
      width: 985px
      height: 870px

      .real-time
        position: relative
        width: 100%
        height: 425px
        background-image: url("../assets/img/store-temp/goods_left_bg.png")
        background-repeat: no-repeat
        background-size: cover

        .numb
          flex-direction: column
          position: absolute
          top: 125px
          left: 127px
          width: 250px
          text-align: center

          > i
            line-height: 148px
            padding-bottom: 29px
            text-shadow: 0 0 3px rgba(0, 245, 255, 1)

        .out-numb
          position: absolute
          top: 106px
          right: 60px

        .in-numb
          position: absolute
          top: 261px
          right: 60px

        .out-numb, .in-numb
          > i
            width: 154px
            margin: 0 32px 0 33px
            padding: 0 8px
            font-size: 56px
            line-height: 56px
            text-align: right

      .charts
        width: 935px
        height: 403px
        background-image: url("../assets/img/store-temp/goods_charts_bg.png")
        background-repeat: no-repeat
        background-size: cover

        .charts-title
          align-items: flex-end
          padding: 28px 30px 21px 46px

          .title
            font-size: 32px
            line-height: 44px

            > i
              font-size: 16px
              line-height: 22px

          .legend
            font-size: 18px

            > span
              line-height: 25px

              &:before
                content: ''
                width: 15px
                height: 15px
                margin-right: 10px
                background-image: url("../assets/img/store-temp/icon_charts1.png")
                background-repeat: no-repeat
                background-size: cover

              &:last-child:before
                margin-left: 14px
                background-image: url("../assets/img/store-temp/icon_charts2.png")

        .charts-box
          width: 915px
          height: 270px
          margin: 0 auto

    &-records
      position: absolute
      top: 64px
      right: 94px
      width: 657px
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
        font-weight: 800
        text-shadow: 0 0 10px rgba(0, 255, 245, 0.90)

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
              width: 110px
              text-align: right

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
            flex-direction: column
            min-height: 100px
            margin-left: 216px

            .box-code
              width: 273px
              height: 50px
              margin-bottom: 6px
              background-image: url("../assets/img/store-temp/records_timeline_box2.png")
              background-repeat: no-repeat
              background-size: cover
              font-size: 26px
              text-align: center
              line-height: 50px

            .box-text
              color: #FFF
              font-size: 26px
              line-height: 35px

              > span:last-child
                > i
                  font-size: 40px
                  color: #CCF2FF
                  padding-right: 25px

    ::v-deep
      .records-wrap::-webkit-scrollbar
        width: 0

      .records-wrap
        -ms-overflow-style: none
        overflow: -moz-scrollbars-none
  /*  */
</style>
