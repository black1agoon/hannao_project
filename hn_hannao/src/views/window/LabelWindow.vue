<template>
  <transition name="fade">
    <div class="window-wrapper" v-show="show">
      <div class="window-mask" @click="close"></div>
      <div class="container">
        <div class="block block1">
          <div class="title">标识总数</div>
          <number-box class="number-box" :number="labelSum">
          </number-box>
        </div>
        <div class="block block2">
          <div class="title">产品标识类别</div>
          <div class="content">
            <charts-view ref="chart2" :options="CARD_TYPE">
            </charts-view>
          </div>
        </div>
        <div class="block block3">
          <div class="title">产品标识终端解析分布</div>
          <ul class="content">
            <li class="province">
              <img src="../../assets/img/mainview/zhejiang.png">
              <p class="name">浙江</p>
            </li>
            <li class="province">
              <img src="../../assets/img/mainview/guangdong.png">
              <p class="name">广东</p>
            </li>
            <li class="province">
              <img src="../../assets/img/mainview/shanghai.png">
              <p class="name">上海</p>
            </li>
            <li class="province">
              <img src="../../assets/img/mainview/hainan.png">
              <p class="name">海南</p>
            </li>
            <li class="province">
              <img src="../../assets/img/mainview/shandong.png">
              <p class="name">山东</p>
            </li>
          </ul>
        </div>
        <div class="block block4">
          <div class="title">产品标识总数</div>
          <div class="content">
            <number-box class="number-box" :number="productSum" color="#51FFFF">
            </number-box>
          </div>
        </div>
        <div class="block block5">
          <div class="title">产品类别分类</div>
          <div class="content">
            <div class="category">产品类别分类</div>
            <img src="../../assets/img/mainview/lines.png">
            <ul class="typelist">
              <li class="type" v-for="(type, index) in typelist" :key="index">{{type}}</li>
            </ul>
          </div>
        </div>
        <div class="block block6">
          <div class="title">企业产品标识数量排名</div>
          <div class="content">
            <card-company-order :list="ranklist">
            </card-company-order>
          </div>
        </div>
        <div class="block block7">
          <div class="title">标识产品生产量(近30天)</div>
          <div class="content">
            <charts-view :options="LABEL_PRODUCT" ref="chart">
            </charts-view>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {LABEL_PRODUCT, CARD_TYPE} from '../board.config'
  import ChartsView from '../../components/common/ChartsView'
  import NumberBox from '../../components/mainview/NumberBox'
  import CardCompanyOrder from '../../components/mainview/CardCompanyOrder'
  import api from '@/api'

  export default {
    name: 'label-window',
    components: {
      ChartsView,
      NumberBox,
      CardCompanyOrder
    },
    props: {
      kanbanData: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {},
    data() {
      return {
        show: false,
        labelSum: 0,
        productSum: 0,
        cardCompanyList: [],
        LABEL_PRODUCT: LABEL_PRODUCT,
        CARD_TYPE: CARD_TYPE,
        ranklist: [],
        typelist: Array.from({length: 10})
      }
    },
    methods: {
      open() {
        this.show = true
        this.$nextTick(() => {
          this.$refs.chart.refresh()
          this.$refs.chart2.refresh()
        })
      },
      close() {
        this.show = false
      },
      getApiData() {
        api.mainview.cardTotal().then(data => {
          this.labelSum = data.labelCount || 0
          this.productSum = data.tagCount || 0
        })
        api.mainview.cardCompanyOrder().then(data => {
          if (data && data.length) {
            this.ranklist = data
          } else {
            this.ranklist = []
          }
        })
        api.mainview.cardDayUsedStatics().then(data => {
          if (data && data.length > 0) {
            this.LABEL_PRODUCT.xAxis[0].data = data.map(day => (day.day.substring(5, 10)))
            this.LABEL_PRODUCT.series[0].data = data.map(day => day.usedCount)
          } else {
            this.LABEL_PRODUCT.xAxis[0].data = []
            this.LABEL_PRODUCT.series[0].data = []
          }
        })
        api.mainview.productTypeList().then(data => {
          this.typelist = data && data.length ? data : Array.from({length: 10})
        })
        api.mainview.cardType().then(data => {
          this.CARD_TYPE.series[0].data = Object.keys(data).map(key => ({
            name: key,
            value: data[key]
          }))
          this.CARD_TYPE.legend.data = Object.keys(data)
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
  @import '../../assets/stylus/animation.styl'
  .window-wrapper
    position: absolute
    z-index: 100
    width: 1920px
    height: 1080px
    top: 0
    left: 0
    transition: all .2s
    backdrop-filter: blur(10px)
    &.fade-enter, &.fade-leave-to
      opacity: 0
    .window-mask
      width: 100%
      height: 100%
      background: rgba(0, 0, 0, .6)
    .container
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      width: 1680px
      height: 840px
      border-radius: 8px
      background: rgba(0, 0, 0, .6)
      box-shadow: 0 2px 10px rgba(81, 255, 255, 0.2)

      .block
        position: absolute

        .title
          width: 280px
          height: 38px
          color: #CBF6FF
          font-size: 20px
          line-height: 38px
          border-left: 3px solid #3D9DC5
          background: linear-gradient(90deg, rgba(15, 88, 132, 1) 0%, rgba(8, 44, 66, .5) 60%, rgba(8, 44, 66, 0) 100%)
          overflow: hidden
          padding-left: 20px

        &.block1
          top: 50px
          left: 50px

          .number-box
            margin-top: 26px

        &.block2
          left: 50px
          top: 236px

          .content
            display: flex
            width: 510px
            height: 230px
        &.block3
          top: 564px
          left: 50px

          .content
            width: 490px
            height: 150px
            display: flex
            justify-content: space-between

            .province
              width: 90px
              margin-top: 40px

              .name
                font-size: 24px
                color: #5FC1EE
                text-align: center
                margin-top: 15px

        &.block4
          top: 50px
          left: 641px

          .content
            width: 400px
            height: 150px

            .number-box
              margin-top: 26px

        &.block5
          top: 236px
          left: 640px

          .content
            width: 400px
            height: 510px
            display: flex
            margin-top: 45px
            .category
              margin-top: 160px
              width: 40px
              height: 130px
              font-size: 18px
              border: 1px solid #0096FF
              color: #5FC1EE
              padding: 10px 5px
              box-sizing: border-box
              word-break: break-all
              text-align: center
            img
              height: 450px
            .typelist
              .type
                width: 140px
                height: 38px
                line-height: 38px
                text-align: center
                border: 1px solid #0096FF
                color: #5FC1EE
                font-size: 18px
                margin: -20px 0 30px 0
        &.block6
          top: 50px
          left: 1130px

          .content
            margin-top: 34px

        &.block7
          top: 450px
          left: 1130px

          .content
            margin-top: 20px
            width: 510px
            height: 300px
</style>
