<template>
  <div class="temp">
    <div class="navigation" :style="{opacity: getNavOpacity}">
      <ul class="nav">
        <li :class="{'active': currentIndex === index}"
            v-for="(nav,index) in NAVIGATION"
            :key="index"
            @click="go2Hook(index)">{{nav}}
        </li>
      </ul>
    </div>
    <div class="scroll" ref="scroll">
      <div class="scroll-wrap"
           :style="{paddingBottom: !(!productData.buyUrl && !productData.certificated && !inApp) ? '56px' : '6px'}">
        <div class="hook">
          <div class="swiper-wrapper swiper-hook">
            <swiper ref="mySwiper" :options="swiperOption" v-if="productData.videoUrl || productData.banners">
              <div v-if="productData.videoUrl" class="swiper-slide">
                <div class="video-wrap">
                  <video ref="video" class="video" :src="getImgSrc(productData.videoUrl)" controls="controls">
                    您的浏览器不支持播放。
                  </video>
                  <div class="video-mask" v-show="videoMaskShow">
                    <div class="video-play" @click="videoMaskHide"></div>
                    <img :src="getImgSrc(productData.videoPic)">
                  </div>
                </div>
              </div>
              <div class="swiper-slide" v-for="(banner,index) in getSortBanners" :key="index">
                <img style="width: 100%;height: 100%" :src="getImgSrc(banner.url)">
              </div>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <span class="logo"></span>
          </div>
          <div class="info-wrapper">
            <div class="price" v-if="!productData.showInfo">
              <span class="now">现价￥</span>
              <span class="num">{{getPrice(productData.price)}}</span>
              <span class="now">.00</span>
            </div>
            <div class="showinfo" v-else>
              <span class="num">{{productData.showInfo}}</span>
            </div>
            <div class="name">{{productData.name}}</div>
          </div>
          <div class="split-line"></div>
        </div>
        <div class="params-wrapper hook">
          <div :class="['bgimg', 'type' + template1type]"></div>
          <div class="title border-1px">
            <span class="name">产品参数</span>
            <span class="arrowleft"></span>
            <span class="look" @click="showParams">查看全部</span>
          </div>
          <div class="detail">
            <span class="brand">品牌:<span>{{productData.brandName}}</span></span>
            <span class="origin">产地:<span>{{productData.origin}}</span></span>
            <span class="cnName">公司名称:<span>{{productData.companyInfo.cnName}}</span></span>
            <span class="cnAddress">公司地址:<span>{{productData.companyInfo.operateAddress}}</span></span>
          </div>
          <div class="split-line"></div>
        </div>
        <div class="reports-wrapper hook">
          <div class="title border-1px">
            <span class="name">质检报告</span>
              <span v-show="productData.qcTime" class="arrowleft"></span>
              <span v-show="productData.qcTime" class="look" @click="showListReports">查看详情</span>
          </div>
          <swiper ref="reports" :options="reportsOption">
            <div class="swiper-slide" v-for="(img,index) in productData.reports" :key="index"
                 @click="showReports(index)">
              <img style="width: 100%" :src="getImgSrc(img)">
            </div>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <div class="split-line"></div>
        </div>
        <div class="memo-wrapper hook">
          <div class="title border-1px">
            <span class="name">图文详情</span>
          </div>
          <div class="ql-container ql-snow">
            <div class="ql-editor">
              <span ref="memo" class="memo" v-html="productData.memo"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="show">
      <div class="reports" v-show="reportsShow">
        <span class="close" @click="hideReports"></span>
        <div class="wrap">
          <swiper ref="report" :options="reportOption">
            <div class="swiper-slide" v-for="(img,index) in productData.reports" :key="index">
              <img style="width: 100%" :src="getImgSrc(img)">
            </div>
          </swiper>
        </div>
      </div>
    </transition>
    <transition name="fold">
      <div ref="list" class="list-params" v-show="listShow">
        <div style="padding: 18px">
          <div class="title">产品参数</div>
          <div class="param border-1px">
            <span class="name">品牌</span>
            <span class="value">{{productData.brandName}}</span>
          </div>
          <div class="param border-1px">
            <span class="name">产地</span>
            <span class="value">{{productData.origin}}</span>
          </div>
          <!--<div class="param border-1px">-->
          <!--<span class="name">归属人</span>-->
          <!--<span class="value">顾敏敏</span>-->
          <!--</div>-->
          <!--<div class="param border-1px">-->
          <!--<span class="name">上市年份季节</span>-->
          <!--<span class="value">2018年冬季</span>-->
          <!--</div>-->
          <div v-for="attr in productData.productCategoryAttrValueDtoList" :key="attr.id" class="param border-1px">
            <span class="name">{{attr.attrName}}</span>
            <span class="value">{{attr.attrValue}}</span>
          </div>
          <div class="param border-1px">
            <span class="name">尺寸规格</span>
            <span class="value">{{productData.modelNo}}</span>
          </div>
          <div class="param border-1px">
            <span class="name">单位</span>
            <span class="value">{{productData.unit}}</span>
          </div>
          <div class="param border-1px">
            <span class="name">公司名称</span>
            <span class="value">{{productData.companyInfo.cnName}}</span>
          </div>
          <div class="param border-1px">
            <span class="name">公司地址</span>
            <span class="value">{{productData.companyInfo.regAddress}}</span>
          </div>
          <div class="param border-1px">
            <span class="name">服务电话</span>
            <span class="value">{{productData.companyInfo.telephone}}</span>
          </div>
          <div class="btn" @click="hideParams">完成</div>
        </div>
      </div>
    </transition>
    <transition name="fold">
      <div class="list-params" v-show="listReportsShow">
        <div style="padding: 18px">
          <div class="title">质检详情</div>
          <div class="param border-1px">
            <span class="name">质检员</span>
            <span class="value">{{productData.qcUser}}</span>
          </div>
          <div class="param border-1px">
            <span class="name">质检时间</span>
            <span class="value">{{productData.qcTime}}</span>
          </div>
          <div class="param border-1px">
            <span class="name">产品款号</span>
            <span class="value">{{productData.qcProductStyle}}</span>
          </div>
          <div class="btn" @click="hideListReports">完成</div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" @click="hideMsk" v-show="listShow || listReportsShow"></div>
    </transition>
    <temp-footer :product-data="productData" :id-no="idNo">
    </temp-footer>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import config from '@/config'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {preloadImages} from '../static/js/tools'
  import TempFooter from '../components/TempFooter'
  const NAVIGATION = ['产品信息', '产品参数', '质检报告', '图文详情']
  export default {
    name: 'product-temp1',
    components: {
      swiper,
      swiperSlide,
      TempFooter
    },
    props: {
      productData: {
        type: Object,
        default: () => ({})
      },
      idNo: String,
      template1type: {
        type: Number,
        default: 0
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
        return 0
      },
      getNavOpacity() {
        return this.swiperHeight ? (this.scrollY / this.swiperHeight >= 1 ? 1 : this.scrollY / this.swiperHeight) : 0
      },
      getSortBanners() {
        let banners = this.productData.banners
        let mainArr = banners.filter(a => {
          return a.main === 1
        })
        let seqArr = banners.sort((a, b) => {
          if (a.seq > b.seq) {
            return 1
          } else {
            return -1
          }
        }).filter(a => {
          return a.main !== 1
        })
        return mainArr.concat(seqArr)
      }
    },
    data() {
      return {
        NAVIGATION,
        loading: false,
        videoMaskShow: true,
        inApp: this.$route.query.app,
        // inApp: true,
        scrollY: 0,
        swiperHeight: 0,
        listHeight: [],
        listShow: false,
        listReportsShow: false,
        reportsShow: false,
        bindShow: false,
        successShow: false,
        countdownShow: false,
        serverURI: config.serverURI,
        swiperOption: {
          initialSlide: 0,
          slidesPerView: 1,
          spaceBetween: 30,
          // loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            observer: true
          },
          on: {
            slideChange: (sss) => {
              this.$nextTick(() => {
                if (this.$refs.video !== undefined) {
                  this.videoMaskShow_()
                }
              })
            }
          }
        },
        reportsOption: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          // loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        reportOption: {
          initialSlide: 0,
          slidesPerView: 1,
          pagination: {
            observer: true
          }
        },
        BS: null,
        BSList: null
      }
    },
    methods: {
      scrollInit() {
        this.BS = new BScroll(this.$refs.scroll, {
          mouseWheel: true,
          click: true,
          probeType: 3
        })
        this.BS.on('scroll', (pos) => {
          this.scrollY = pos.y > 0 ? 0 : Math.abs(Math.round(pos.y))
          // console.log(this.scrollY)
          if (this.$refs.video !== undefined) {
            if (this.scrollY > this.swiperHeight) { // 当滑动距离大于mySwiper高度时，暂停动画
              this.$nextTick(() => {
                this.videoMaskShow_()
              })
            }
          }
        })
      },
      scrollInitList() {
        this.$nextTick(() => {
          this.BSList = new BScroll(this.$refs.list, {
            mouseWheel: true,
            click: true
          })
        })
      },
      scrollDestroy() {
        try {
          this.BS.destroy()
          this.BSList.destroy()
        } catch (e) {
          delete this.BS
          delete this.BSList
          this.BS = null
          this.BSList = null
        }
      },
      getImgSrc(url) {
        return this.serverURI + url
      },
      getPrice(price) {
        return Math.round(price)
      },
      showParams() {
        this.listShow = true
        this.$nextTick(() => {
          this.scrollInitList()
        })
      },
      hideParams() {
        this.listShow = false
      },
      showListReports() {
        this.listReportsShow = true
      },
      hideListReports() {
        this.listReportsShow = false
      },
      showReports(index) {
        this.reportsShow = true
        this.reportOption.initialSlide = index
        this.$refs.report.swiper.slideTo(index)
      },
      hideReports() {
        this.reportsShow = false
      },
      hideMsk() {  // 点击阴影mask 隐藏弹出层
        this.hideParams()
        this.hideListReports()
      },
      go2Hook(index) {
        let hooks = this.$refs.scroll.getElementsByClassName('hook')
        let el = hooks[index]
        this.BS.scrollToElement(el, 300)
      },
      _caculateHeight() {
        let lists = this.$refs.scroll.getElementsByClassName('hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < lists.length; i++) {
          let item = lists[i]
          // console.log(item.clientHeight)
          height += item.clientHeight
          this.listHeight.push(height)
        }
        // alert(this.listHeight)
      },
      _caculateSwiperHeight() {
        this.swiperHeight = this.$refs.scroll.getElementsByClassName('swiper-hook')[0].clientHeight
      },
      videoMaskHide() {
        this.videoMaskShow = false
        this.$refs.video.play()
      },
      videoMaskShow_() {
        this.videoMaskShow = true
        this.$refs.video.pause()
      }
    },
    mounted() {
      this.$refs.memo.onclick = ev => {
        ev = ev || window.event
        let target = ev.target || ev.srcElement
        if (target.nodeName.toLowerCase() === 'video') {
          if (target.paused) {
            target.play()
          } else {
            target.pause()
          }
        }
      }
    },
    beforeDestroy() {
      this.scrollDestroy()
    },
    watch: {
      'productData'() {
        this.$nextTick(() => {
          setTimeout(() => {
            this.scrollInit()
            let imagesList = [].slice.call(document.querySelectorAll('img'))
            preloadImages(imagesList).then(() => {
              this._caculateHeight()
              this._caculateSwiperHeight()
            })
            // setTimeout(() => {
            //   this._caculateHeight()
            //   this._caculateSwiperHeight()
            // }, 10)
          }, 10)
        })
      },
      'productData.companyInfo'() {
        if (this.productData.companyInfo === null) {
          this.productData.companyInfo = {}
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../static/stylus/mixin.styl'
  .temp
    width: 100%
    height: 100%
    .navigation
      width: calc(100% - 100px)
      margin-left: 50px
      height: 50px
      position: fixed
      z-index: 90
      top: 0
      background: #ffffff
      opacity: 0
      .nav
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        height: 50px
        li
          flex: 1
          text-align: center
          font-size: 13px
          height: 28px
          line-height: 28px
          color: rgba(0, 0, 0, .75)
          &.active
            background: #C6A46D
            color: rgba(255, 255, 255, .75)
            border-radius: 19px
    .scroll
      width: 100%
      height: 100%
      .swiper-wrapper
        position: relative
        width: 100%
        height: 100vw
        background: #ffffff
        .video-wrap
          width: 100%
          height: 100vw
          background: #000000
          position: relative
          .video
            width: 100%
            position: absolute
            top: 50%
            transform: translateY(-50%)
          .video-mask
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
            img
              width: 100%
              height: 100%
          .video-play
            position: absolute
            z-index: 100
            width: 50px
            height: 50px
            background-image: url('../../assets/img/play.png')
            background-size: 50px 50px
            background-repeat: no-repeat
            top: 0
            right: 0
            bottom: 0
            left: 0
            margin: auto
        .logo
          position: absolute
          width: 109px
          height: 109px
          display: inline-block
          bg-image('../static/img/logo')
          background-size: 109px 109px
          background-repeat: no-repeat
          right: 14px
          bottom: -35px
          z-index: 100
      .info-wrapper
        background: #ffffff
        .price
          padding: 10px 0 0 18px
          font-size: 0
          height: 30px
          color: #BF934B
          .now
            font-size: 17px
          .num
            font-size: 28px
        .showinfo
          padding: 10px 0 0 18px
          font-size: 0
          height: 30px
          color: #BF934B
          .num
            font-size: 17px
        .name
          padding: 8px 18px
          font-size: 17px
      .params-wrapper
        height: 170px
        position: relative
        background: #ffffff
        .bgimg
          position: absolute
          top: 0
          height: 155px
          width: 100%
          background-size: cover
          background-position: center center
          &.type0
            display: none
          &.type1
            bg-image('../static/img/type/fuzhuang')
          &.type2
            bg-image('../static/img/type/cansibei')
          &.type3
            bg-image('../static/img/type/xiangbao')
        .title
          padding: 0 18px
          height: 50px
          line-height: 50px
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            display: inline-block
            float: left
            font-size: 17px
          .look
            display: inline-block
            float: right
            font-size: 15px
            color: rgba(0, 0, 0, 0.45)
          .arrowleft
            display: inline-block
            float: right
            width: 6px
            height: 14px
            bg-image('../static/img/arrowleft')
            background-size: 6px 14px
            background-repeat: no-repeat
            margin-left: 10px
            margin-top: 17px
        .detail
          position: relative
          display: flex
          flex-wrap: wrap
          padding: 7px 18px
          font-size: 15px
          color: rgba(0, 0, 0, .45)
          .brand, .origin
            flex: 0 0 50%
            margin: 7px 0
            span
              display: inline-block
              color: rgba(0, 0, 0, .75)
              margin-left: 5px
          .cnName, .cnAddress
            flex: 0 0 100%
            margin: 7px 0
            span
              display: inline-block
              color: rgba(0, 0, 0, .75)
              margin-left: 5px
      .reports-wrapper
        background: #ffffff
        .title
          padding: 0 18px
          height: 50px
          line-height: 50px
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            display: inline-block
            float: left
            font-size: 17px
          .look
            display: inline-block
            float: right
            font-size: 15px
            color: rgba(0, 0, 0, 0.45)
          .arrowleft
            display: inline-block
            float: right
            width: 6px
            height: 14px
            bg-image('../static/img/arrowleft')
            background-size: 6px 14px
            background-repeat: no-repeat
            margin-left: 10px
            margin-top: 17px
      .memo-wrapper
        background: #ffffff
        /*margin-bottom: 64px*/
        .title
          padding: 0 18px
          height: 50px
          line-height: 50px
          border-1px(rgba(7, 17, 27, 0.1))
        .memo
          display: block
          margin: 8px
          overflow: hidden
          /*font-size: 0*/
          /deep/ p
            font-size: 15px
            border: none
            color: rgba(0, 0, 0, .75)
          /deep/ img
            display: block
            width: 100%
            height: 100%
          /deep/ .ql-video
            width: 100%
            height: 200px
      .hook
        .split-line
          position: relative
          width: 100%
          height: 14px
          background: #f4f4f4
    .bottom
      position: fixed
      z-index: 50
      width: 100%
      height: 50px
      line-height: 50px
      background: #ffffff
      bottom: 0
      .unshelve
        display: block
        margin: 5px auto
        width: 90%
        height: 40px
        line-height: 40px
        text-align: center
        background: #9B9B9B
        border-radius: 8px
        color: #ffffff
      .uncertificated1, .uncertificated2, .uncertificated3, .uncertificated4, .has-certificated1, .has-certificated2
        height: 50px
        display: flex
        justify-content: center
        align-items: center
      .uncertificated1, .uncertificated3, .uncertificated4
        .share
          flex: 0 0 30px
          height: 40px
          font-size: 0
          margin-left: 17px
          .icon
            display: block
            background-image: url("../static/img/share.svg")
            /*bg-image('../static/img/share') */
            margin: auto
            width: 24px
            height: 24px
            background-size: 24px 24px
            background-repeat: no-repeat
          .font
            display: block
            width: 24px
            height: 16px
            line-height: 16px
            font-size: 12px
            margin: auto
            color: rgba(0, 0, 0, .75)
      .uncertificated1
        .bind
          flex: 1
          .btn
            width: 90%
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #C6A46D
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
      .uncertificated2
        .share
          flex: 1
          .btn
            width: 90%
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #C6A46D
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
            .icon
              display: inline-block
              vertical-align: middle
              bg-image('../static/img/share1')
              width: 24px
              height: 24px
              background-size: 24px 24px
              background-repeat: no-repeat
              margin-right: 10px
      .uncertificated3
        .buy
          flex: 1
          .btn
            width: 90%
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #A44D34
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
      .uncertificated4
        .buy
          flex: 1
          margin: 0 5px
          .btn
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #A44D34
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
        .bind
          flex: 2
          .btn
            width: 92%
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #C6A46D
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
      .has-certificated1, .has-certificated2
        .hasdone
          flex: 0 0 60px
          height: 40px
          font-size: 0
          .icon
            display: block
            bg-image('../static/img/certificated')
            margin: auto
            width: 24px
            height: 24px
            background-size: 24px 24px
            background-repeat: no-repeat
          .font
            display: block
            width: 36px
            height: 16px
            line-height: 16px
            font-size: 12px
            margin: auto
            color: rgba(0, 0, 0, .75)
      .has-certificated1
        .share
          flex: 1
          .btn
            width: 95%
            height: 40px
            line-height: 40px
            text-align: center
            /*margin: auto*/
            background: #C6A46D
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
            .icon
              display: inline-block
              vertical-align: middle
              bg-image('../static/img/share1')
              width: 24px
              height: 24px
              background-size: 24px 24px
              background-repeat: no-repeat
              margin-right: 10px
      .has-certificated2
        .share
          flex: 0 0 85px
          .btn
            height: 40px
            line-height: 40px
            text-align: center
            /*margin: auto*/
            background: #C6A46D
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
            .icon
              display: inline-block
              vertical-align: middle
              bg-image('../static/img/share1')
              width: 24px
              height: 24px
              background-size: 24px 24px
              background-repeat: no-repeat
              margin-right: 10px
        .buy
          flex: 1
          .btn
            width: 90%
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #A44D34
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
    .list-params
      position: fixed
      background: #ffffff
      /*border-radius: 11px 11px 0 0*/
      left: 0
      bottom: 0
      z-index: 100
      width: 100%
      max-height: calc(100% - 100px)
      /*overflow-y: auto*/
      overflow: hidden
      /*padding: 18px*/
      /*box-sizing: border-box*/
      transition: all 0.3s
      transform: translate3d(0, 0, 0)
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 100%, 0)
      .title
        width: 100%
        height: 16px
        font-size: 16px
        text-align: center
      .param
        height: 46px
        border-1px(rgba(7, 17, 27, 0.1))
        display: flex
        align-items: center
        .name
          flex: 0 0 70px
          color: rgba(0, 0, 0, .4)
          font-size: 15px
          line-height: 20px
        .value
          flex: 1
          font-size: 15px
          line-height: 20px
          color: rgba(0, 0, 0, .75)
      .btn
        /*width: 90%*/
        height: 40px
        line-height: 40px
        text-align: center
        margin: auto
        background: #C6A46D
        color: #fff
        font-size: 17px
        border-radius: 8px
        &:active
          opacity: 0.8
    .list-mask
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 90
      opacity: 1
      transition: all 0.5s
      background: rgba(7, 17, 27, 0.6)
      backdrop-filter: blur(10px)
      &.fade-enter, &.fade-leave-to
        opacity: 0
        background: rgba(7, 17, 27, 0)
    .reports
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 90
      transform: scale(1)
      opacity: 1
      transition: all 0.3s
      background: rgba(0, 0, 0, 1)
      backdrop-filter: blur(10px)
      &.show-enter
        transform: scale(0)
        background: rgba(7, 17, 27, 0)
      &.show-leave-to
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .wrap
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
      .close
        position: absolute
        z-index: 100
        top: 20px
        right: 20px
        display: inline-block
        width: 20px
        height: 20px
        bg-image('../static/img/close')
        background-size: 20px 20px
        background-repeat: no-repeat
    .bind-wrapper
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 90
      transition: all 0.2s linear
      opacity: 1
      &.bind-enter, &.bind-leave-to
        opacity: 0
      .bind-mask
        width: 100%
        height: 100%
        background: rgba(4, 4, 15, 0.4)
      .form
        width: 90%
        height: 270px
        background: #ffffff
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
        border-radius: 6px
        padding: 0 15px
        box-sizing: border-box
        .title
          color: rgba(0, 0, 0, 0.75)
          font-size: 17px
          height: 54px
          line-height: 54px
          border-1px(rgba(7, 17, 27, 0.1))
        .item
          display: flex
          width: 100%
          border-1px(rgba(7, 17, 27, 0.1))
          height: 45px
          line-height: 45px
          label
            display: inline-block
            flex: 0 0 60px
            font-size: 14px
            color: rgba(0, 0, 0, .75)
          input
            display: inline-block
            flex: 1
            height: 30px
            font-size: 14px
            color: rgba(0, 0, 0, .4)
            margin-top: 8px
            outline: none
          .tel
            width: 120px
          .send
            display: inline-block
            height: 30px
            color: #FFFFFF
            background: #C6A46D
            border-radius: 4px
            margin-top: 8px
            line-height: 30px
            padding: 0 9px
            box-sizing: border-box
            font-size: 14px

        .btn
          height: 40px
          line-height: 40px
          color: #ffffff
          background: #C6A46D
          border-radius: 8px
          text-align: center
          margin-top: 20px
    .success-bind
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 90
      background: rgba(4, 4, 15, 0.4)
      .form
        width: 90%
        height: 270px
        background: #ffffff
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
        border-radius: 6px
        text-align: center
        .success
          display: block
          width: 143px
          height: 143px
          bg-image('../static/img/bindsuccess')
          background-size: 143px 143px
          background-repeat: no-repeat
          margin: 40px auto 13px
        .font
          color: rgba(0, 0, 0, .75)
          font-size: 17px
</style>
<style type="text/css">
  /*@import 'quill/dist/quill.core.css';*/
  @import 'quill/dist/quill.snow.css';
  @import 'quill/dist/quill.bubble.css';

  .ql-editor {
    padding: 0
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
    background: #C6A46D;
  }
</style>
