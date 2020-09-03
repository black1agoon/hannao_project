<template>
  <div class="wrapper">
    <div class="banner">
      <div class="banner-content">
        <div class="title">浙江汉脑</div>
        <p class="content">我们坚持：开拓、创新，立足市场求发展；优质、高效，用心服务为用户</p>
      </div>
    </div>
    <div class="about">
      <div class="title">关于汉脑</div>
      <div class="small-title">智慧工厂整体解决方案提供商</div>
      <div class="content">
        <div class="left">
          <div class="name">浙江汉脑数码科技有限公司</div>
          <div class="description">
            <p>浙江汉脑数码科技有限公司, 创建于1999年，是一家以物联网技术为核心的国家级高新技术企业、 国家商用密码产品定点单位，依托浙江可信物联网技术研究院强大研发资源， 融合大数据、
              云计算、人工智能等技术进行创新研发。</p>
            <p>
              公司从2015年开始, 连续四年作为浙江省物联网创新企业代表应邀出席世界互联网大会等各类科技盛会，每年都有新技术，新产品在互联网国际平台展出，得到各级领导和业内专家好评，受到各类媒体的关注、 报道。
            </p>
          </div>
        </div>
        <div class="right">
          <img src="../../assets/img/about-r.png"/>
        </div>
      </div>
    </div>
    <div class="history">
      <div class="title">发展历程</div>
      <div class="small-title">以人为本，运用科技，倡导科学。</div>
      <div class="history-wrapper">
        <swiper ref="swiper" :options="swiperOption">
          <div class="swiper-slide"
               v-for="(time,index) in timeline"
               :key="time.id"
               @click="swiperClick(index)">
            <div class="picture">
              <img :src="utils.getImageSrc(time.thumb)">
            </div>
            <div class="description">{{time.description}}</div>
          </div>
        </swiper>
        <swiper ref="splitSwiper" class="timeline" :options="splitOptions">
          <div v-for="(dotted,index) in timeline"
               :key="index"
               :class="['swiper-slide', 'dotted', {active: currentIndex === index}]"
               @click="splitSwiperClick(index)"
          >
            <div class="time">{{dotted.title}}</div>
            <div class="icon"></div>
          </div>
        </swiper>
        <div class="prex" @click="swiperPrev"></div>
        <div class="next" @click="swiperNext"></div>
      </div>
    </div>
    <div class="cultural">
      <div class="title">文化理念</div>
      <div class="small-title">企业文化我们的核心竞争力</div>
      <div class="cultural-wrapper">
        <div class="finger">
          <img src="../../assets/img/finger.png">
        </div>
        <div class="wrap">
          <div class="item">
            <div class="top">
              <i class="icon1"></i><span>经营管理原则</span>
            </div>
            <div class="bottom">
              以人为本，运用科技，倡导科学。
            </div>
          </div>
          <div class="item">
            <div class="top">
              <i class="icon2"></i><span>管理方针</span>
            </div>
            <div class="bottom">
              科学管理，优化竞争，提高效率，创造价值。
            </div>
          </div>
          <div class="item">
            <div class="top">
              <i class="icon3"></i><span>汉脑信条</span>
            </div>
            <div class="bottom">
              规规矩矩做人，兢兢业业做事；机会始终给有准备的人，成功永远属于努力者。
            </div>
          </div>
          <div class="item">
            <div class="top">
              <i class="icon4"></i><span>汉脑精神</span>
            </div>
            <div class="bottom">光明正大，产业报国，团结一致，奋发向上，开拓进取，服务奉献。
            </div>
          </div>
          <div class="item">
            <div class="top">
              <i class="icon5"></i><span>核心理念</span>
            </div>
            <div class="bottom">恪守产业人本分，推动社会文明，不断推出让客户喜爱的产品，始终为客户着想。
            </div>
          </div>
          <div class="item">
            <div class="top">
              <i class="icon6"></i><span>汉脑宗旨</span>
            </div>
            <div class="bottom">汉脑目标：办一流的企业，聚一流的人才，干一流的事业，创一流的业绩。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '@/assets/js/utils'
  import api from '@/api'
  import 'swiper/dist/css/swiper.css'
  import {swiper} from 'vue-awesome-swiper'

  export default {
    name: 'about',
    components: {
      swiper
    },
    data() {
      return {
        utils,
        swiperOption: {
          effect: 'coverflow',  // 3d流转动
          grabCursor: true,   // 开启鼠标抓动
          centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左。
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 0,
            stretch: 10,
            depth: 200,
            modifier: 1,
            slideShadows: true
          },
          on: {
            slideChange: () => {
              this.currentIndex = this.swiper.activeIndex
            }
          }
        },
        splitOptions: {
          slidesPerView: 8,
          spaceBetween: 30
        },
        timeline: [],
        currentIndex: 0
      }
    },
    computed: {
      swiper() {
        return this.$refs.swiper.swiper
      },
      splitSwiper() {
        return  this.$refs.splitSwiper.swiper
      }
    },
    methods: {
      getTimeLineData() {
        api.getContentByPosid(224).then(data => {
          if (data && data.length > 0) {
            this.timeline = data.map(t => t.data)
          }
        })
      },
      swiperPrev() {
        this.swiper.slidePrev()
        this.splitSwiper.slidePrev()
        this.currentIndex = this.swiper.activeIndex
      },
      swiperNext() {
        this.swiper.slideNext()
        this.splitSwiper.slideNext()
        this.currentIndex = this.swiper.activeIndex
      },
      swiperClick(index) {
        this.swiper.slideTo(index, 1000, false)
        this.splitSwiper.slideTo(index, 1000, false)
        this.currentIndex = index
      },
      splitSwiperClick(index) {
        this.swiper.slideTo(index, 1000, false)
        this.splitSwiper.slideTo(index, 1000, false)
        this.currentIndex = index
      }
    },
    mounted() {
      this.getTimeLineData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1400px
      height: 505px
      background-image: url("../../assets/img/about.jpg")
      background-repeat: no-repeat
      background-size: percentage
      .banner-content
        width: 1200px
        left: 50%
        transform: translateX(-50%)
        position: absolute
        top: 158px
        .title
          font-size: 36px
          color: #ffffff
          margin-bottom: 20px
        .content
          font-size: 16px
          color: #ffffff
          line-height: 28px
    .about
      width: 1200px
      margin: 0 auto 50px
      .title
        padding-top: 50px
        text-align: center
        font-size: 26px
        color: #010101
      .small-title
        padding: 13px
        text-align: center
        font-size: 14px
        color: #a8a8a8
        margin-bottom: 50px
      .content
        display: flex
        justify-content: space-between
        .left
          width: 662px
          .name
            position: relative
            height: 40px
            font-size: 18px
            color: #000000
            margin-bottom: 44px
            &:after
              content: ''
              position: absolute
              width: 74px
              height: 4px
              background: #00AAFF
              left: 0
              bottom: 0
          .description
            p
              text-indent: 40px
              font-size: 16px
              color: #000000
              line-height: 32px
              font-family: 'Microsoft YaHei'
        .right
          width: 474px
    .history
      min-width: 1400px
      background: #222324
      margin: 0 auto 50px
      padding-bottom: 20px
      .title
        padding-top: 50px
        text-align: center
        font-size: 26px
        color: #ffffff
      .small-title
        padding: 13px
        text-align: center
        font-size: 14px
        color: #a8a8a8
        margin-bottom: 50px
      .history-wrapper
        width: 1400px
        margin: 0 auto 50px
        position: relative
        .swiper-slide
          background: #ffffff
          width: 751px
          height: 400px
          border-radius: 10px
          overflow: hidden
          box-shadow: 0 1px 10px rgba(174, 174, 174, 0.23)
          .picture
            width: 100%
            height: 100%
            img
              width: 100%
              height: 100%
          .description
            position: absolute
            width: 100%
            box-sizing: border-box
            background: rgba(0, 0, 0, .3)
            bottom: 0
            height: 88px
            font-size: 14px
            color: #ffffff
            padding: 0 25px
            line-height: 29px
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 3
        .timeline
          width: 1200px
          height: 55px
          margin: 50px auto
          border-bottom: 1px dashed #ffffff
          .swiper-slide
            background: none
            box-shadow: none
          .dotted
            display: inline-block
            width: 60px
            height: 55px
            /*margin-right: 80px*/
            vertical-align: bottom
            position: relative
            cursor: pointer
            .time
              text-align: center
              color: #ffffff
              font-size: 12px
              height: 20px
            .icon
              width: 13px
              height: 19px
              margin: 16px auto 0
              background-image: url("../../assets/img/dingwei 02.png")
              background-size: 13px 19px
              background-repeat: no-repeat
          .active
            .time
              font-size: 14px
              color: #00AAFF
            .icon
              width: 17px
              height: 24px
              margin: 11px auto 0
              background-image: url("../../assets/img/dingwei 01.png")
              background-size: 17px 24px
              background-repeat: no-repeat
        .prex
          position: absolute
          left: 0
          bottom: 0
          transform: translateY(-50%)
          width: 16px
          height: 28px
          background-image: url("../../assets/img/prev.png")
          background-size: 16px 28px
          background-repeat: no-repeat
          cursor: pointer
        .next
          position: absolute
          right: 0
          bottom: 0
          transform: translateY(-50%)
          width: 16px
          height: 28px
          background-image: url("../../assets/img/next.png")
          background-size: 16px 28px
          background-repeat: no-repeat
          cursor: pointer
    .cultural
      margin: 0 auto 100px
      .title
        padding-top: 50px
        text-align: center
        font-size: 26px
      .small-title
        padding: 13px
        text-align: center
        font-size: 14px
        color: #a8a8a8
        margin-bottom: 50px
      .cultural-wrapper
        width: 1200px
        height: 509px
        margin: 0 auto
        position: relative
        .finger
          position: absolute
          width: 561px
          height: 509px
          left: -353px
          img
            width: 100%
            height: 100%
        .wrap
          float: right
          width: 980px
          height: 500px
          display: flex
          flex-direction: row
          flex-wrap: wrap
          justify-content: space-between
          align-content: space-between
          .item
            width: 300px
            height: 230px
            .top
              position: relative
              text-align: center
              background: #222324
              color: #ffffff
              height: 77px
              font-size: 18px
              line-height: 77px
              i
                display: inline-block
                position: absolute
                top: 50%
                left: 77px
                transform: translateY(-50%)
                width: 31px
                height: 31px
                background-size: 31px 31px
                background-repeat: no-repeat
              .icon1
                background-image: url("../../assets/img/cultural1.png")
              .icon2
                background-image: url("../../assets/img/cultural2.png")
              .icon3
                background-image: url("../../assets/img/cultural3.png")
              .icon4
                background-image: url("../../assets/img/cultural4.png")
              .icon5
                background-image: url("../../assets/img/cultural5.png")
              .icon6
                background-image: url("../../assets/img/cultural6.png")
              span
                position: absolute
                top: 50%
                left: 121px
                transform: translateY(-50%)
                color: #ffffff
            &:first-child
              .top
                background: #00AAFF
            .bottom
              text-align: center
              color: #A8A8A8
              font-size: 14px
              line-height: 25px
              padding: 30px 46px 0
</style>