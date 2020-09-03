<template>
  <div class="wrapper">
    <div class="top-box">
      <div class="left-side">
        <img class="pic" :src="getImageUrl(appDetail.icon)"/>
        <p class="category">应用类别: {{appDetail.catIdName}}</p>
        <p class="certification">平台认证<i class="rz"></i></p>
      </div>
      <div class="right-side">
        <p class="title">{{appDetail.name}}</p>
        <p class="cnName">服务商：{{appDetail.companyIdName}}</p>
        <div class="price-score">
          <span class="text">参考价格:</span>
          <span class="unit1">￥</span>
          <span class="num">{{appDetail.price}}</span>
          <span class="unit2">元/{{appDetail.unit1}}/{{appDetail.unit2}}</span>
          <span class="text2">用户评分:</span>
          <star-rate class="star"
                     :disabled="true"
                     v-model="appDetail.score">
          </star-rate>
          <span class="score">{{appDetail.score}}分</span>
        </div>
        <div class="btns">
          <div class="online">
            <p class="text">在线试用</p>
            <p class="time">试用时间: {{appDetail.trialDay}}天</p>
          </div>
          <div class="advice">在线咨询</div>
        </div>
      </div>
    </div>
    <div class="content-box">
      <ul class="navbar">
        <li @click="scrollTo(0)">视频截图</li>
        <li @click="scrollTo(1)">应用详情</li>
        <li @click="scrollTo(2)">使用文档</li>
        <li @click="scrollTo(3)">套餐分类</li>
        <li @click="scrollTo(4)">售后服务</li>
      </ul>
      <div class="content hook">
        <p class="title">视频截图</p>
        <div class="wrap swiper-box">
          <swiper ref="swiper" class="image-swiper" :options="swiperOptions">
            <div class="swiper-slide"
                 v-for="(img, index) in getScreenshots"
                 @click="swiperClick(index)"
                 :key="index">
              <div class="video-wrap" v-if="appDetail.videoUrl && index === 0">
                <video ref="video" class="video"
                       @click="videoStop"
                       :poster="getImageUrl(appDetail.videoPic)"
                       :src="getImageUrl(appDetail.videoUrl)">
                  您的浏览器不支持播放。
                </video>
                <transition name="fold">
                  <div class="mask" v-show="maskShow">
                    <div class="play" @click="videoPlay"></div>
                  </div>
                </transition>
              </div>
              <img v-else class="img" :src="getImageUrl(img)"/>
            </div>
          </swiper>
          <div class="prev" @click="swiperPrev"></div>
          <div class="next" @click="swiperNext"></div>
          <swiper ref="listSwiper" class="list-swiper" :options="listSwiperOptions">
            <div class="swiper-slide single-pic"
                 v-for="(img, index) in getScreenshots"
                 @click="listSwiperClick(index)"
                 :key="index">
              <img class="img" :src="getImageUrl(img)"/>
              <div class="icon-play" v-if="index === 0 && appDetail.videoPic"></div>
            </div>
          </swiper>
        </div>
      </div>
      <div class="content hook">
        <p class="title">应用详情</p>
        <div class="wrap" v-html="appDetail.detail"></div>
      </div>
      <div class="content hook">
        <p class="title">使用文档</p>
        <div class="wrap">
          <ul>
            <li class="file-box" v-for="(file, index) in appDetail.operatingManual"
                :key="index">
              <i class="icon-file"></i>
              <span class="name">{{file.name}}</span>
              <div class="btn-box">
                <a class="look" target="_blank" :href="getImageUrl(file.path)">查看</a>
                <a class="download" :href="getImageUrl(file.path)">下载</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="content hook">
        <p class="title">套餐分类</p>
        <div class="wrap" v-html="appDetail.packages"></div>
      </div>
      <div class="content hook">
        <p class="title">售后服务</p>
        <div class="wrap" v-html="appDetail.afterService"></div>
      </div>
      <!--<div class="content">-->
        <!--<p class="title">评价打分</p>-->
        <!--<div class="wrap">-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="content">-->
        <!--<p class="title">用户评价</p>-->
        <!--<div class="wrap">-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import StarRate from '../common/StarRate'
  import api from '@/api'
  import {getImageUrl} from '../../assets/js/tools'
  import 'swiper/dist/css/swiper.css'
  import {swiper} from 'vue-awesome-swiper'
  import {animate, scrollY} from '../../assets/js/animation'
  export default {
    name: 'field-detail',
    components: {
      StarRate,
      swiper
    },
    computed: {
      getScreenshots() {
        let list = []
        if (this.appDetail.videoPic) {
          list.push(this.appDetail.videoPic)
        }
        if (this.appDetail.screenshot) {
          list = list.concat(this.appDetail.screenshot.split(','))
        }
        return list
      },
      swiper() {
        return this.$refs.swiper.swiper
      },
      listSwiper() {
        return  this.$refs.listSwiper.swiper
      }
    },
    data() {
      return {
        getImageUrl,
        appDetail: {},
        swiperOptions: {
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
              this.listSwiper.slideTo(this.currentIndex, 1000, false)
              if (this.$refs.video !== undefined) {
                this.videoStop()
              }
            }
          }
        },
        listSwiperOptions: {
          grabCursor: true,   // 开启鼠标抓动
          slidesPerView: 4,
          spaceBetween: 27
        },
        currentIndex: 0,
        maskShow: true
      }
    },
    methods: {
      getData() {
        api.application.getDetail(this.$route.params.id).then(data => {
          this.appDetail = data ? data : {}
        })
      },
      swiperPrev() {
        this.swiper.slidePrev()
        this.listSwiper.slidePrev()
        this.currentIndex = this.swiper.activeIndex
      },
      swiperNext() {
        this.swiper.slideNext()
        this.listSwiper.slideNext()
        this.currentIndex = this.swiper.activeIndex
      },
      swiperClick(index) {
        this.swiper.slideTo(index, 1000, false)
        this.listSwiper.slideTo(index, 1000, false)
        this.currentIndex = index
      },
      listSwiperClick(index) {
        this.swiper.slideTo(index, 1000, false)
        this.listSwiper.slideTo(index, 1000, false)
        this.currentIndex = index
      },
      videoPlay() {
        this.$refs.video[0].play()
        this.maskShow = false
      },
      videoStop() {
        let video = this.$refs.video[0]
        video.pause()
        this.maskShow = true
      },
      scrollTo(index) {
        let hooklist = document.getElementsByClassName('hook')
        try {
          window.scrollTo({
            top: hooklist[index].offsetTop - 20,
            behavior: 'smooth'
          })
        } catch (e) {
          animate({
            startPos: scrollY(),
            endPos: hooklist[index].offsetTop - 20,
            duration: 800,
            setValue: scrollY,
            easing: 'easeIn'
          })
        }
      }
    },
    mounted() {
      this.getData()
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    background: #F7F7F7
    .top-box
      margin: 98px auto 0
      width: 950px
      height: 337px
      background: #ffffff
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05)
      .left-side
        display: inline-block
        .pic
          width: 198px
          height: 198px
          margin: 29px 0 0 29px
        .category
          font-size: 14px
          color: #bbbbbb
          margin: 17px 0 0 29px
        .certification
          margin: 13px 0 0 29px
          color: #5FC980
          font-size: 14px
          .rz
            margin-left: 11px
            vertical-align: middle
            display: inline-block
            width: 18px
            height: 20px
            background-image: url("../../assets/img/application/rz.png")
            background-size: 18px 20px
            background-repeat: no-repeat
      .right-side
        vertical-align: top
        display: inline-block
        margin: 29px 0 0 63px
        .title
          color: #444444
          font-size: 24px
        .cnName
          color: #888888
          font-size: 16px
          margin-top: 17px
        .price-score
          margin-top: 30px
          width: 627px
          height: 96px
          line-height: 96px
          background: rgba(255, 248, 245, 1)
          .text
            font-size: 18px
            color: #000000
            margin-left: 28px
          .unit1
            margin-left: 20px
            font-size: 14px
            color: #E54343
          .num
            font-size: 28px
            color: #E54343
          .unit2
            margin-left: 10px
            font-size: 14px
            color: #8A8A8A
          .text2
            margin-left: 40px
            color: #8A8A8A
            font-size: 14px
          .star
            display: inline-block
            vertical-align: middle
            margin: 0 8px
          .score
            color: #E54343
            font-size: 14px
        .btns
          display: flex
          margin-top: 20px
          width: 320px
          height: 48px
          border: 1px solid #EC6942
          cursor: pointer
          .online
            flex: 1
            background: #EC6942
            color: #FFFFFF
            text-align: center
            line-height: 20px
            padding: 5px 0
            .text
              font-size: 16px
            .time
              font-size: 12px
          .advice
            flex: 1
            font-size: 16px
            color: #EC6942
            text-align: center
            line-height: 48px
    .content-box
      width: 950px
      margin: 50px auto 100px
      padding-bottom: 100px
      background: #ffffff
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05)
      .navbar
        height: 75px
        line-height: 75px
        font-size: 18px
        color: #888888
        border-bottom: 1px solid #F2F2F2
        li
          display: inline-block
          margin-right: 10px
          width: 130px
          text-align: center
          cursor: pointer
      .content
        overflow: hidden
        .title
          position: relative
          font-size: 20px
          color: #444444
          margin: 29px 0 29px 50px
          &:before
            content: ''
            position: absolute
            left: -20px
            top: 0
            width: 10px
            height: 28px
            background: #55A8F8
        .wrap
          width: 650px
          margin: 0 auto 30px
          font-size: 16px
          line-height: 28px
          /deep/ p
            font-size: 16px
            line-height: 28px
          &.swiper-box
            position: relative
            .prev
              position: absolute
              left: -50px
              top: 125px
              width: 30px
              height: 30px
              background-image: url("../../assets/img/application/arrow_swiper.png")
              background-size: 30px 30px
              background-repeat: no-repeat
              cursor: pointer
              &:hover
                transform: rotate(180deg)
                background-image: url("../../assets/img/application/arrow_active.png")
            .next
              position: absolute
              right: -50px
              top: 125px
              width: 30px
              height: 30px
              transform: rotate(180deg)
              background-image: url("../../assets/img/application/arrow_swiper.png")
              background-size: 30px 30px
              background-repeat: no-repeat
              cursor: pointer
              &:hover
                transform: rotate(0)
                background-image: url("../../assets/img/application/arrow_active.png")
            .image-swiper
              width: 560px
              height: 280px
              margin: 0 auto
              .video-wrap
                width: 560px
                height: 280px
                .video
                  width: 100%
                  height: 100%
                  object-fit: cover
                .mask
                  position: absolute
                  top: 0
                  left: 0
                  width: 100%
                  height: 100%
                  background: rgba(0, 0, 0, 0.3)
                  z-index: 100
                  opacity: 1
                  transition: all .2s
                  &.fold-enter, &.fold-leave-to
                    opacity: 0
                  .play
                    position: absolute
                    width: 93px
                    height: 93px
                    background-image: url("../../assets/img/application/play.png")
                    background-size: 93px 93px
                    background-repeat: no-repeat
                    left: 0
                    top: 0
                    right: 0
                    bottom: 0
                    margin: auto
                    cursor: pointer
              .img
                width: 560px
                height: 280px
            .list-swiper
              width: 560px
              margin: 25px auto 50px
              .single-pic
                width: 120px
                height: 60px
                position: relative
                .img
                  width: 120px
                  height: 60px
                .icon-play
                  position: absolute
                  top: 0
                  left: 0
                  right: 0
                  bottom: 0
                  margin: auto
                  width: 29px
                  height: 29px
                  background-image: url("../../assets/img/application/play.png")
                  background-size: 29px 29px
                  background-repeat: no-repeat
          .file-box
            position: relative
            background: rgba(246, 246, 246, 1)
            border: 1px solid rgba(227, 227, 227, 1)
            font-size: 16px
            color: #444444
            height: 50px
            line-height: 50px
            margin-top: 5px
            .icon-file
              display: inline-block
              vertical-align: middle
              margin: 0 28px 0 18px
              width: 19px
              height: 24px
              background-image: url("../../assets/img/application/file.png")
              background-size: 19px 24px
              background-repeat: no-repeat
            .btn-box
              position: absolute
              right: 0
              top: 0
              width: 176px
              height: 50px
              line-height: 50px
              font-size: 18px
              text-align: center
              border: 1px solid #55A8F8
              display: flex
              cursor: pointer
              .look
                flex: 1
                color: #ffffff
                background: #55A8F8
                transition: all .2s
                &:hover
                  opacity: .8
              .download
                flex: 1
                background: #ffffff
                color: #55A8F8
                transition: all .2s
                &:hover
                  opacity: .8
</style>