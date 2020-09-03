<template>
  <div class="wrapper">
    <div class="banner">
      <swiper ref="bannerSwiper" :options="bannerOption">
        <div class="swiper-slide">
          <img :src="require('../assets/img/banner.jpg')">
        </div>
        <div class="swiper-slide">
          <router-link to="/solution/field/31/83">
            <img :src="require('../assets/img/banner2.jpg')">
          </router-link>
        </div>
      </swiper>
      <div class="bottom">
        <div class="blocks">
          <div class="block">
            <div class="b-left">
              <img src="../assets/img/bb1.png">
            </div>
            <div class="b-right">
              <div class="title">缔造价值</div>
              <div class="explain">连接数千亿资产<br/>缔造超百亿价值
              </div>
            </div>
          </div>
          <div class="block">
            <div class="b-left">
              <img src="../assets/img/bb2.png">
            </div>
            <div class="b-right">
              <div class="title">开放平台</div>
              <div class="explain">共享工业云生态<br/>共铸中国制造2025
              </div>
            </div>
          </div>
          <div class="block">
            <div class="b-left">
              <img src="../assets/img/bb3.png">
            </div>
            <div class="b-right">
              <div class="title">安全可靠</div>
              <div class="explain">开源架构自主研发<br/>数据安全可靠
              </div>
            </div>
          </div>
          <div class="block">
            <div class="b-left">
              <img src="../assets/img/bb4.png">
            </div>
            <div class="b-right">
              <div class="title">优秀企业</div>
              <div class="explain">工业互联网<br/>优秀企业
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="title">产品</div>
      <div class="box">
        <div class="pro">
          <div class="icon img1" @mouseover="pdtMouseover('img1')" @mouseleave="pdtMouseleave('img1')"></div>
          <div class="name" @mouseover="pdtMouseover('img1')" @mouseleave="pdtMouseleave('img1')">边缘和基础产品</div>
          <div class="explain">边缘计算是微型数据中心的网状网络，在本地处理或存储关键数据，并将所有接收到的数据推送到中央数据中心或云存储库，其覆盖范围不到100平方英尺
          </div>
        </div>
        <div class="pro">
          <div class="icon img2" @mouseover="pdtMouseover('img2')" @mouseleave="pdtMouseleave('img2')"></div>
          <div class="name" @mouseover="pdtMouseover('img2')" @mouseleave="pdtMouseleave('img2')">工业PaaS</div>
          <div class="explain">能够提供企业进行定制化研发的中间件平台，同时涵盖数据库和应用服务器等，最终提高在Web平台上利用的资源数量
          </div>
        </div>
        <div class="pro">
          <div class="icon img3" @mouseover="pdtMouseover('img3')" @mouseleave="pdtMouseleave('img3')"></div>
          <div class="name" @mouseover="pdtMouseover('img3')" @mouseleave="pdtMouseleave('img3')">工业智能应用</div>
          <div class="explain">在工业自动化逐渐成熟后，工业机器人、自动化生产这样的实体技术不再是唯一实现智能制造的途径，而大数据、物联网、云计算、人工智能成为了值得探索的领域
          </div>
        </div>
      </div>
    </div>
    <div class="solution">
      <div class="title">解决方案</div>
      <div class="swiper-wrapper">
        <swiper ref="solutionSwiper" :options="swiperOption">
          <div class="swiper-slide" v-for="solution in solutionList" :key="solution.id">
            <router-link :to="`/solution/field/${solution.catid}/${solution.id}`">
              <div class="pic">
                <img :src="utils.getImageSrc(solution.thumb)">
              </div>
            </router-link>
            <div class="name">{{solution.title}}</div>
            <div class="explain">{{solution.description}}</div>
          </div>
        </swiper>
        <div class="prex" @click="swiperPrev"></div>
        <div class="next" @click="swiperNext"></div>
      </div>
    </div>
    <div class="serviced">
      <div class="title">被服务企业:</div>
      <div class="rise hook">
        <div class="percent">
          <div class="rise-num">{{risenum}}</div>
          <div class="right">
            <div class="arrow up"></div>
            <div class="pct">%</div>
          </div>
        </div>
        <div class="percent">
          <div class="rise-num">{{risenum}}</div>
          <div class="right">
            <div class="arrow up"></div>
            <div class="pct">%</div>
          </div>
        </div>
        <div class="percent">
          <div class="rise-num">{{risenum}}</div>
          <div class="right">
            <div class="arrow down"></div>
            <div class="pct">%</div>
          </div>
        </div>
        <div class="percent">
          <div class="rise-num">{{risenum}}</div>
          <div class="right">
            <div class="arrow down"></div>
            <div class="pct">%</div>
          </div>
        </div>
      </div>
      <div class="c-fonts">
        <div class="font">提升质量</div>
        <div class="font">提升产能</div>
        <div class="font">交期缩短</div>
        <div class="font">库存下降</div>
      </div>
      <div class="example">
        <p>例如服装生产，浙江汉脑创新性地研发了服装生产设备数据智能感知系统，解决了现有市场上缝纫机数据实时采集的难题，大大提高了数据管理的实时性和有效性，并将生产过程数据进行滚动分析、呈现，让管理者及时作出利于产线平衡的调整，并实现“系统换人”，大大提高企业生产效率及产品合格率。
        </p>
      </div>
    </div>
    <div class="cooperation">
      <div class="title">合作伙伴</div>
      <div class="swiper-wrapper">
        <swiper ref="cooperSwiper" :options="cooperOption">
          <div class="swiper-slide" v-for="(cooper,index) in cooperList" :key="index">
            <div class="coop" v-for="coop in cooper" :key="coop.id" v-show="coop.id">
              <div class="pic">
                <img v-if="coop.thumb" :src="utils.getImageSrc(coop.thumb)">
              </div>
              <div class="name">{{coop.title}}</div>
            </div>
          </div>
        </swiper>
        <div class="prex" @click="cooperPrev"></div>
        <div class="next" @click="cooperNext"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper} from 'vue-awesome-swiper'
  import api from '@/api'
  import utils from '@/assets/js/utils'
  export default {
    name: 'home-page',
    components: {
      swiper
    },
    data() {
      return {
        i: 0,
        timer: null,
        bannerOption: {
          loop: true,
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false, // 切换到最后一张的时候 是否停止autoplay
            disableOnInteraction: false  // 用户手操后，是否停止autoplay
          }
        },
        swiperOption: {
          slidesPerView: 4,
          // slidesPerGroup: 1,
          spaceBetween: 47,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        cooperOption: {
          slidesPerView: 4,
          // slidesPerGroup: 1,
          spaceBetween: 23,
          loop: true,
          loopFillGroupWithBlank: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        risenum: 0,
        utils,
        solutionList: [],
        cooperList: []
      }
    },
    methods: {
      pdtMouseover(className) {
        this.i = 0
        let forward = () => {
          this.i++
          this.i < 60 ? (this.animation(className), this.timer = requestAnimationFrame(forward)) : cancelAnimationFrame(this.timer)
        }
        cancelAnimationFrame(this.timer)
        this.timer = requestAnimationFrame(forward)
      },
      pdtMouseleave(className) {
        let reverse = () => {
          this.i--
          this.i > 0 ? (this.animation(className), this.timer = requestAnimationFrame(reverse)) : cancelAnimationFrame(this.timer)
        }
        cancelAnimationFrame(this.timer)
        this.timer = requestAnimationFrame(reverse)
      },
      animation(className) {
        document.getElementsByClassName(className)[0].style.backgroundPosition = `0 -${this.i * 75}px`
      },
      swiperPrev() {
        this.$refs.solutionSwiper.swiper.slidePrev()
      },
      swiperNext() {
        this.$refs.solutionSwiper.swiper.slideNext()
      },
      cooperPrev() {
        this.$refs.cooperSwiper.swiper.slidePrev()
      },
      cooperNext() {
        this.$refs.cooperSwiper.swiper.slideNext()
      },
      servicedRise() {
        let rise = () => {
          if (this.risenum < 30) {
            requestAnimationFrame(rise)
            this.risenum++
          }
        }
        rise()
      },
      getContentByPosid() {
        return Promise.all([api.getContentByPosid(11), api.getContentByPosid(12)]).then(result => {
          if (result[0] && result[0].length > 0) {
            this.solutionList = result[0].map(s => s.data)
          }
          if (result[1] && result[1].length > 0) {
            let list = result[1].map(c => c.data)
            if (list.length > 0 && list.length < 9) {
              this.cooperList = list.map(l => [l, {}])
            } else {
              this.cooperList = list.reduce((rst, current) => {
                if (rst[rst.length - 1] && rst[rst.length - 1].length === 1) {
                  rst[rst.length - 1].push(current)
                } else {
                  rst.push([current])
                }
                return rst
              }, [])
            }
            // this.cooperList[1] = JSON.parse(JSON.stringify(this.cooperList[0]))
            while(this.cooperList.length < 4) {
              this.cooperList.push([{}])
            }
          }
        })
      }
    },
    mounted() {
      window.addEventListener('scroll', () => {
        let hook = document.getElementsByClassName('hook')[0]
        if (hook) {
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          let cHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
          if (scrollTop > (hook.offsetTop - cHeight)) {
            if (this.risenum !== 30) {
              this.servicedRise()
            }
          }
        }
      })
      this.getContentByPosid()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1400px
      height: 640px
      background-image: url("../assets/img/banner.jpg")
      background-repeat: no-repeat
      background-size: percentage
      .bottom
        position: absolute
        bottom: 0
        width: 100%
        height: 135px
        background: rgba(255, 255, 255, 0.1)
        z-index: 100
        .blocks
          width: 1200px
          margin: 0 auto
          display: flex
          /*box-sizing: content-box*/
          .block
            position: relative
            width: 300px
            height: 135px
            border-left: 1px solid rgba(255, 255, 255, 0.5)
            &:last-child
              border-right: 1px solid rgba(255, 255, 255, 0.5)
            &:hover
              background: rgba(255, 255, 255, 0.12)
            .b-left
              position: absolute
              top: 50%
              left: 50px
              transform: translateY(-50%)
            .b-right
              position: absolute
              left: 135px
              top: 31px
              .title
                font-size: 18px
                color: #ffffff
              .explain
                line-height: 25px
                margin-top: 14px
                font-size: 14px
                color: #919191
    .product
      .title
        font-size: 26px
        color: #010101
        text-align: center
        margin: 47px 0 35px 0
      .box
        width: 1260px
        margin: 0 auto
        display: flex
        justify-content: space-between
        margin-bottom: 50px
        .pro
          width: 310px
          text-align: center
          .icon
            width: 75px
            height: 80px
            background-size: 75px
            background-position: 0 0
            margin: 0 auto
            cursor: pointer
          .img1
            background-image: url("../assets/img/p1.jpg")
          .img2
            background-image: url("../assets/img/p2.jpg")
          .img3
            background-image: url("../assets/img/p3.jpg")
          .name
            padding-top: 15px
            font-size: 18px
            color: #595959
          .explain
            font-size: 14px
            color: #999999
            line-height: 25px
            margin-top: 36px
          .name:hover, .icon:hover + .name
            cursor: pointer
            color: #00c1de
    .solution
      min-width: 1400px
      padding: 50px 0 115px 0
      box-sizing: border-box
      background: #484848
      .title
        font-size: 26px
        color: #ffffff
        text-align: center
        margin-bottom: 50px
      .swiper-wrapper
        width: 1260px
        height: 300px
        margin: 0 auto
        position: relative
        .swiper-slide
          text-align: center
          a
            display: block
            width: 164px
            height: 164px
            margin: 0 auto
            .pic
              width: 164px
              height: 164px
              background-image: url("../assets/img/solutionwrapper.png")
              background-repeat: no-repeat
              background-size: 164px 164px
              position: relative
              img
                position: absolute
                top: 0
                right: 0
                left: 0
                bottom: 0
                margin: auto
                width: 90%
                height: 90%
                border-radius: 50%
          .name
            color: #ffffff
            font-size: 18px
            margin-top: 21px
          .explain
            color: #c9c9c9
            font-size: 14px
            margin-top: 15px
            line-height: 25px
            height: 75px
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 3
        .prex
          position: absolute
          top: 50%
          left: -70px
          transform: translateY(-50%)
          width: 33px
          height: 63px
          background-image: url("../assets/img/prev.png")
          background-size: 33px 63px
          background-repeat: no-repeat
          cursor: pointer
        .next
          position: absolute
          top: 50%
          right: -70px
          transform: translateY(-50%)
          width: 33px
          height: 63px
          background-image: url("../assets/img/next.png")
          background-size: 33px 63px
          background-repeat: no-repeat
          cursor: pointer
    .serviced
      width: 1200px
      margin: 0 auto
      padding: 50px 0 75px 0
      box-sizing: border-box
      .title
        font-size: 26px
        color: #010101
        text-align: center
        margin-bottom: 50px
      .rise
        display: flex
        .percent
          flex: 1
          border-right: 1px solid #919191
          text-align: center
          &:last-child
            border-right: none
          .rise-num
            font-size: 100px
            line-height: 88px
            display: inline-block
          .right
            display: inline-block
          .arrow
            width: 34px
            height: 40px
            background-repeat: no-repeat
            background-size: 34px 40px
            &.up
              background-image: url("../assets/img/up.png")
            &.down
              background-image: url("../assets/img/down.png")
          .pct
            font-size: 40px
      .c-fonts
        display: flex
        text-align: center
        margin-top: 30px
        .font
          flex: 1
          color: #595959
          font-size: 18px
      .example
        text-align: center
        margin-top: 30px
        p
          width: 800px
          margin: 0 auto
          font-size: 16px
          color: #595959
          line-height: 30px
    .cooperation
      min-width: 1400px
      padding: 50px 0 115px 0
      box-sizing: border-box
      background-image: url("../assets/img/cooperation.jpg")
      background-repeat: no-repeat
      background-size: 100% 100%
      .title
        font-size: 26px
        color: #ffffff
        text-align: center
        margin-bottom: 50px
      .swiper-wrapper
        width: 1200px
        margin: 0 auto
        position: relative
        .swiper-slide
          text-align: center
          .coop
            width: 265px
            height: 218px
            background: rgba(67, 67, 67, .39)
            margin-top: 46px
            .pic
              width: 100px
              height: 100px
              margin: 0 auto
              padding-top: 35px
              img
                width: 100%
                height: 100%
            .name
              color: #ffffff
              font-size: 18px
              margin-top: 21px
        .prex
          position: absolute
          top: 50%
          left: -70px
          transform: translateY(-50%)
          width: 33px
          height: 63px
          background-image: url("../assets/img/prev.png")
          background-size: 33px 63px
          background-repeat: no-repeat
          cursor: pointer
        .next
          position: absolute
          top: 50%
          right: -70px
          transform: translateY(-50%)
          width: 33px
          height: 63px
          background-image: url("../assets/img/next.png")
          background-size: 33px 63px
          background-repeat: no-repeat
          cursor: pointer
</style>