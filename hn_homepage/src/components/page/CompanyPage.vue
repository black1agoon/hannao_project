<template>
  <div class="wrapper">
    <div class="banner">
      <video class="video"
             type="video/mp4"
             autoplay
             muted
             loop
             src="http://media.jianzb.cn/sp/0813/gsxx0813.mp4">
      </video>
      <div class="banner-mask">
        <div class="mask-content">
          <div class="title">仅为诚信企业服务，只对优质品牌负责</div>
          <div class="apply">
            <router-link to="/company/more">了解更多</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="company-wrapper">
      <div class="company">
        <div class="title">鉴正宝信息技术有限公司</div>
        <div class="text">鉴正宝信息技术有限公司，是一家以物联网技术为核心的新型互联网企业。致力于物联网电子商务、品牌保护与提升、产品溯源与管理、策略咨询和信息技术服务，推进新零售和消费升级，营造公平、公正、诚信的互联网活动氛围。
          <router-link to="/company/info">查看全部</router-link>
          <div class="map">
            <img src="../../assets/img/company/map.png"/>
          </div>
        </div>
      </div>
      <div class="wish">
        <div class="title">公司愿景：</div>
        <div class="text">鉴正宝信息技术有限公司将社会责任贯穿于企业发展战略，以"引领时代新技术、新产业、新业态、新模式"为企业目标，以推动实体经济与消费市场向更美好的方向前行为已任，促进社会经济、市场经济、安全环保协调稳健可持续发展，构建实体经济与消费市场命运共同体。
          <div class="box">
            <p class="btitle"><i></i>愿景:</p>
            <p class="btext">政府放心、百姓满意、企业受益</p>
            <p class="btitle"><i></i>价值观:</p>
            <p class="btext">仅为诚信企业服务，只对优质品牌负责</p>
          </div>
        </div>
      </div>
      <div class="news">
        <div class="title">公司新闻：</div>
        <div class="news-box">
          <div class="new"
               v-for="(news, index) in newsList"
               :key="index">
            <div class="ntitle">
              <router-link :to="`/company/news/detail/${news.id}`">{{news.title}}</router-link>
            </div>
            <div class="date">{{news.createTime.substr(0, 10)}}</div>
          </div>
          <router-link class="more" to="/company/news" v-if="newsTotal > 6">查看更多</router-link>
        </div>
      </div>
    </div>
    <div id="honour" class="honour-wrapper">
      <div class="title">公司荣誉</div>
      <div class="swiper-box">
        <swiper ref="swiper" :options="swiperOption">
          <div class="swiper-slide">
            <div class="pic">
              <img src="../../assets/img/company/honour1.png">
            </div>
          </div>
          <div class="swiper-slide">
            <div class="pic">
              <img src="../../assets/img/company/honour2.png">
            </div>
          </div>
          <div class="swiper-slide">
            <div class="pic">
              <img src="../../assets/img/company/honour3.png">
            </div>
          </div>
          <div class="swiper-slide">
            <div class="pic">
              <img src="../../assets/img/company/honour4.png">
            </div>
          </div>
          <div class="swiper-slide">
            <div class="pic">
              <img src="../../assets/img/company/honour5.png">
            </div>
          </div>
          <div class="swiper-slide">
            <div class="pic">
              <img src="../../assets/img/company/honour6.png">
            </div>
          </div>
        </swiper>
        <div class="prex" @click="swiperPrev"></div>
        <div class="next" @click="swiperNext"></div>
      </div>
    </div>
    <div id="activity" class="activity-wrapper">
      <div class="title">公司活动</div>
      <div class="scroll-box" ref="picWrapper">
        <div class="pic-list" ref="picList">
          <div class="pic">
            <img src="../../assets/img/company/company0.png">
            <div class="intro">
              <span>2019工业互联网平台推广会现场演示鉴真宝产品</span>
            </div>
          </div>
          <div class="pic">
            <img src="../../assets/img/company/company1.png">
            <div class="intro">
              <span>2018防伪展鉴真宝展厅门庭若市</span></div>
          </div>
          <div class="pic">
            <img src="../../assets/img/company/company2.png">
            <div class="intro">
              <span>2019鉴真宝物联网电子商务品牌营销现场会</span>
            </div>
          </div>
          <div class="pic">
            <img src="../../assets/img/company/company3.png">
            <div class="intro">
              <span>鉴真宝CEO与浙江省平湖市副市长钱勇彪、经信局局长刘皆安</span>
            </div>
          </div>
          <div class="pic">
            <img src="../../assets/img/company/company4.png">
            <div class="intro">
              <span>鉴真宝CEO与香港联络办公室副主任仇鸿、澳门联络办公室办公厅处长林子清</span>
            </div>
          </div>
          <div class="pic">
            <img src="../../assets/img/company/company5.png">
            <div class="intro">
              <span>鉴真宝CEO于第四届互联网大会做主题演讲</span>
            </div>
          </div>
          <div class="pic">
            <img src="../../assets/img/company/company6.png">
            <div class="intro">
              <span>第四届互联网大会嘉兴市副市长盛全生、嘉兴市经信局局长卓卫明莅临鉴真宝视察</span>
            </div>
          </div>
          <div class="pic">
            <img src="../../assets/img/company/company7.png">
            <div class="intro">
              <span>第五届世界互联网大会浙江省副省长、省公安厅厅长王双全莅临鉴真宝</span>
            </div>
          </div>
          <div class="pic">
            <img src="../../assets/img/company/company8.png">
            <div class="intro">
              <span>第四届互联网大会时任嘉兴市市长胡海峰莅临鉴真宝视察</span>
            </div>
          </div>
          <div class="pic">
            <img src="../../assets/img/company/company9.png">
            <div class="intro">
              <span>鉴真宝CEO与汤加王国副首相肖西·索瓦莱尼</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <online-service>
    </online-service>
  </div>
</template>

<script>
  import OnlineService from '../common/OnlineService'
  import BScroll from 'better-scroll'
  import 'swiper/dist/css/swiper.css'
  import {swiper} from 'vue-awesome-swiper'
  import utils from '@/assets/js/utils'
  import axios from 'axios'
  import config from '@/config'
  export default {
    name: 'company-page',
    components: {
      OnlineService,
      swiper
    },
    data() {
      return {
        serverURI: config.serverURI,
        swiperOption: {
          slidesPerView: 3,
          // slidesPerGroup: 1,
          spaceBetween: 0,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        query: {
          newsCategoryId: '6ccd4f8c3c814463880b918fda23ca95',
          page: 1,
          pageSize: 6
        },
        newsList: [],
        newsTotal: 0
      }
    },
    methods: {
      pageScroll(hash) {
        if (hash) {
          let el = document.getElementById(hash.replace('#', ''))
          utils.scroll2Pos(el, this)
        }
      },
      swiperPrev() {
        this.$refs.swiper.swiper.slidePrev()
      },
      swiperNext() {
        this.$refs.swiper.swiper.slideNext()
      },
      initScroll() {
        let picWidth = 360
        let margin = 35
        let width = (picWidth + margin) * 10 - margin
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.picWrapper, {
            scrollX: true,
            // eventPassthrough: 'vertical'
          })
        })
      },
      getNews() {
        axios({
          method: 'post',
          url: this.serverURI + 'pac/news/frontPage',
          data: this.query
        }).then(res => {
          if (res.status === 200 && res.data.code === '00') {
            this.newsList = res.data.data.records
            this.newsTotal = res.data.data.total
          } else {
            this.newsList = []
            this.newsTotal = 0
          }
        })
      }
    },
    mounted() {
      this.pageScroll(this.$route.hash)
      this.getNews()
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    beforeDestroy() {
      try {
        this.scroll.destroy()
      } catch (e) {
        delete this.scroll
        this.scroll = null
      }
    },
    watch: {
      '$route'(to, from) {
        this.pageScroll(to.hash)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1200px
      height: 100vh
      .video
        width: 100%
        height: 100vh
        object-fit: cover
      .banner-mask
        position: absolute
        top: 0
        width: 100%
        height: 100vh
        color: #ffffff
        background-color: rgba(0, 0, 0, .4)
        text-align: center
        .mask-content
          position: absolute
          width: 1200px
          height: 200px
          top: 0
          left: 0
          right: 0
          bottom: 0
          margin: auto
          .title
            font-size: 68px
            letter-spacing: 2px
            line-height: 56px
          .apply
            margin: 40px auto
            width: 140px
            height: 50px
            line-height: 50px
            text-align: center
            border: 2px solid #ffffff
            border-radius: 4px
            cursor: pointer
            transition: all .2s
            &:hover
              background: #ffffff
              a
                color: #000000
            a
              font-size: 27px
              color: #ffffff
    .company-wrapper
      width: 1200px
      margin: 57px auto 60px
      display: flex
      justify-content: space-between
      .company
        width: 435px
        .title
          background-position: 0 0
          background-size: 59px 69px
          background-image: url("../../assets/img/company/title1.png")
        .map
          position: absolute
          bottom: 0
          left: 0
          width: 380px
          height: 275px
      .wish
        width: 428px
        .title
          background-position: 0 1px
          background-size: 67px 67px
          background-image: url("../../assets/img/company/title2.png")
        .box
          position: absolute
          bottom: 0
          left: 0
          width: 400px
          height: 235px
          border: 1px solid #F0F0F0
          color: #5A5A5A
          .btitle
            font-size: 24px
            /*font-weight: bold*/
            margin-top: 26px
            i
              width: 12px
              height: 12px
              background: #63A7E8
              border-radius: 50%
              display: inline-block
              vertical-align: middle
              margin: 0 8px 0 18px

          .btext
            font-size: 20px
            margin: 10px 0 0 38px
      .news
        width: 290px
        .title
          background-position: 0 20px
          background-size: 53px 52px
          background-image: url("../../assets/img/company/title3.png")
        .news-box
          margin-left: 23px
          text-align: center
          .new
            margin: 25px 0
            text-align: left
            .ntitle
              height: 25px
              line-height: 25px
              font-size: 18px
              color: #4D4D4D
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
              cursor: pointer
            .date
              margin: 10px 0
              font-size: 14px
              color: #BBBBBB
          .more
            display: inline-block
            width: 92px
            height: 29px
            margin: 0 auto
            line-height: 29px
            text-align: center
            border: 1px solid #63A7E8
            color: #63A7E8
            font-size: 12px
            cursor: pointer
            transition: all .2s
            &:hover
              background: #63A7E8
              color: #ffffff
      .company, .wish, .news
        .title
          padding-left: 30px
          height: 69px
          line-height: 80px
          font-size: 24px
          /*font-weight: bold*/
          color: #444444
          background-repeat: no-repeat
        .text
          margin-top: 14px
          margin-left: 30px
          font-size: 18px
          line-height: 36px
          height: 480px
          position: relative
          a
            color: #629AFF
    .honour-wrapper
      background: #F8F8F8
      padding: 80px 0
      .title
        text-align: center
        font-size: 35px
        color: #444444
        /*font-weight: bold*/
        padding-bottom: 80px
      .swiper-box
        width: 1040px
        margin: 0 auto
        position: relative
        .swiper-slide
          text-align: center
          height: 300px
          .pic
            width: 100%
            height: 100%
            position: relative
            img
              position: absolute
              top: 0
              right: 0
              left: 0
              bottom: 0
              margin: auto
        .prex
          position: absolute
          top: 50%
          left: -40px
          transform: translateY(-50%)
          width: 20px
          height: 35px
          background-image: url("../../assets/img/company/arrow-left.png")
          background-size: 20px 35px
          background-repeat: no-repeat
          cursor: pointer
          z-index: 300
        .next
          position: absolute
          top: 50%
          right: -40px
          transform: translateY(-50%)
          width: 20px
          height: 35px
          background-image: url("../../assets/img/company/arrow-right.png")
          background-size: 20px 35px
          background-repeat: no-repeat
          cursor: pointer
          z-index: 300
    .activity-wrapper
      padding: 80px 0
      .title
        text-align: center
        font-size: 35px
        color: #444444
        /*font-weight: bold*/
        padding-bottom: 80px
      .scroll-box
        width: 100%
        height: 270px
        overflow: hidden
        .pic-list
          height: 270px
          user-select: none
          .pic
            width: 360px
            height: 270px
            display: inline-block
            margin-right: 35px
            font-size: 0
            vertical-align: top
            img
              display: block
              width: 360px
              height: 220px
              vertical-align: top
            .intro
              width: 100%
              height: 50px
              text-align: center
              line-height: 20px
              color: #484848
              font-size: 14px
              background: #F7F7F7
              position: relative
              box-sizing: border-box
              span
                display: block
                width: 310px
                left: 25px
                top: 50%
                transform: translateY(-50%)
                position: absolute

</style>