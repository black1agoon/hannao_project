<template>
  <div class="wrapper">
    <div class="banner">
      <div class="content">
        <div class="fonts-wrap">
          <div class="title">物联网电子商务引领消费升级</div>
          <div class="intro">促进企业高质量发展</div>
          <div class="free-use">了解详情</div>
        </div>
        <div class="video-wrap">
          <div class="mask" v-show="maskShow">
            <img class="play" @click="videoPlay" src="../../assets/img/resolution/play.png"/>
          </div>
          <video class="video"
             ref="video"
             poster="../../assets/img/resolution/ecommerce/videofirst.png"
             @click="videoStop"
             src="http://media.jianzb.cn/sp/0816/zjbxcp.mp4"
             type="video/mp4">
          </video>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper">
      <div class="content">
        <div class="title">物联网电子商务</div>
        <div class="small-title">物联网电子商务，正品购物方式</div>
        <div class="ball-wrap">
          <div class="left">
            <div class="ball-content ball1" v-show="ballIndex === 0">
              <div class="name">RFID智能商标</div>
              <div class="text">每一款商品自带智能商标，智能商标记录了整个生产数据链</div>
              <div class="btn">了解详情</div>
            </div>
            <div class="ball-content ball2" v-show="ballIndex === 1">
              <div class="name">品牌防伪</div>
              <div class="text">智能商标拥有全球唯一ID，通过国密技术加密，保证每一件商品都是源头生产</div>
              <div class="btn">了解详情</div>
            </div>
            <div class="ball-content ball3" v-show="ballIndex === 2">
              <div class="name">品质追溯</div>
              <div class="text">消费者利用APP识别智能商标即可查询商品流转信息，验证真伪</div>
              <div class="btn">了解详情</div>
            </div>
            <div class="ball-content ball4" v-show="ballIndex === 3">
              <div class="name">NFC智能</div>
              <div class="text">利用先进的NFC技术实现防伪与购物支付</div>
              <div class="btn">了解详情</div>
            </div>
            <div class="ball-content ball5" v-show="ballIndex === 4">
              <div class="name">线下体验线上购物</div>
              <div class="text">线下验证商品真伪，线上正品购物</div>
              <div class="btn">了解详情</div>
            </div>
            <div class="ball-content ball6" v-show="ballIndex === 5">
              <div class="name">物联网电子商务</div>
              <div class="text">集防伪、溯源、消费为一体的全新购物方式</div>
              <div class="btn">了解详情</div>
            </div>
          </div>

          <div class="right-ball">
            <tree-ball @ballindex="showBallIndex">
            </tree-ball>
          </div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper" style="background: #F1F2F5">
      <div class="content">
        <div class="title">物联网电子商务的优势</div>
        <div class="goodness">
          <div class="good">
            <div class="icon-box">
              <img src="../../assets/img/resolution/ecommerce/icon1.png"/>
            </div>
            <p class="text">100%品牌商源头生产</p>
          </div>
          <div class="good">
            <div class="icon-box">
              <img src="../../assets/img/resolution/ecommerce/icon2.png"/>
            </div>
            <p class="text">云端验证正品信息</p>
          </div>
          <div class="good">
            <div class="icon-box">
              <img src="../../assets/img/resolution/ecommerce/icon3.png"/>
            </div>
            <p class="text">智慧工厂质量无忧</p>
          </div>
          <div class="good">
            <div class="icon-box">
              <img src="../../assets/img/resolution/ecommerce/icon4.png"/>
            </div>
            <p class="text">见物购物真实体验</p>
          </div>
          <div class="good">
            <div class="icon-box">
              <img src="../../assets/img/resolution/ecommerce/icon5.png"/>
            </div>
            <p class="text">诚信品牌值得信赖</p>
          </div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper" style="background: #262730">
      <div class="content">
        <div class="title" style="color: #ffffff">物联网电子商务实现方法</div>
        <ul class="tabs">
          <li :class="['tname', {active: activeIndex === 0}]" @mouseenter="tabClick(0)">step1：数字化工厂建设</li>
          <li :class="['tname', {active: activeIndex === 1}]" @mouseenter="tabClick(1)">step2：透明化消费</li>
        </ul>
        <transition-group class="slide" name="slide" tag="div">
          <div class="tabs-content" key="slide1" v-show="activeIndex === 0">
            <div class="wrap">
              <div class="intro">针对智能制造企业，从机台、产线、车间、工厂及线外设备采集生产数据，获取智慧工厂源头信息，通过数字化进行品质监控，由智能商标记录整个生产数据链。
              </div>
              <div class="img-box">
                <img width="580" height="364" src="../../assets/img/resolution/ecommerce/tabpic1.png"/>
                <img width="580" height="364" src="../../assets/img/resolution/ecommerce/tabpic2.png"/>
                <img width="580" height="364" src="../../assets/img/resolution/ecommerce/tabpic3.png"/>
                <img width="580" height="364" src="../../assets/img/resolution/ecommerce/tabpic4.png"/>
              </div>
            </div>
          </div>
          <div class="tabs-content" key="slide2" v-show="activeIndex === 1">
            <div class="wrap">
              <div class="ttitle">物联网电子商务总流程</div>
              <div class="phone-box">
                <img src="../../assets/img/resolution/ecommerce/tabphone1.png"/>
                <img src="../../assets/img/resolution/ecommerce/tabphone2.png"/>
                <img src="../../assets/img/resolution/ecommerce/tabphone3.png"/>
              </div>
            </div>
            <div class="tab-bottom">
              <div class="tab-bottom-item">
                <p class="bname">鉴真宝线下识别服装智能商标</p>
                <div class="btext">
                  <i class="icon icon1"></i>
                  <span class="num">0.5S</span>
                  <span class="txt">读取速度</span>
                </div>
              </div>
              <div class="tab-bottom-item">
                <p class="bname">验证源头真伪信息</p>
                <div class="btext">
                  <i class="icon icon2"></i>
                  <span class="num">15+</span>
                  <span class="txt">源头信息</span>
                </div>
              </div>
              <div class="tab-bottom-item">
                <p class="bname">跳转第三方平台线上购买</p>
                <div class="btext">
                  <i class="icon icon3"></i>
                  <span class="num">N+</span>
                  <span class="txt">第三方平台</span>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="ctt-wrapper">
      <div class="content">
        <div class="title">商场案例</div>
        <div class="example-wrap">
          <div class="example-left">
            <img src="../../assets/img/resolution/example.png"/>
          </div>
          <div class="example-right" @mouseenter="hovering" @mouseleave="unhovering">
            <div class="unhover" v-show="!ishover">
              <div class="logo">
                <img src="../../assets/img/resolution/youyulogo.png"/>
              </div>
              <p class="title">优羽优选</p>
              <p class="text">各区域品牌</p>
              <p class="text">数字化工厂直销商场</p>
              <div class="button">服饰鞋帽</div>
            </div>
            <transition name="slide">
              <div class="hover" v-show="ishover">
                <p class="title">领取会员卡</p>
                <img class="vip" src="../../assets/img/resolution/vipcard.png"/>
                <img class="qr" src="../../assets/img/resolution/youyuqr.png">
                <p class="text">扫码查看案例</p>
              </div>
            </transition>
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
  import TreeBall from '../common/TreeBall'

  export default {
    name: 'resolution-ecommerce',
    components: {
      OnlineService,
      TreeBall
    },
    data() {
      return {
        maskShow: true,
        activeIndex: 0,
        ballIndex: 0,
        ishover: false
      }
    },
    methods: {
      videoPlay() {
        let video = this.$refs.video
        video.play()
        this.maskShow = false
      },
      videoStop() {
        let video = this.$refs.video
        video.pause()
        this.maskShow = true
      },
      tabClick(index) {
        this.activeIndex = index
      },
      showBallIndex(index) {
        this.ballIndex = index
      },
      hovering() {
        this.ishover = true
      },
      unhovering() {
        this.ishover = false
      }
    },
    mounted() {
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1200px
      height: 500px
      background-image: url("../../assets/img/resolution/ecommerce/banner.png")
      background-repeat: no-repeat
      background-size: cover
      .content
        width: 1200px
        display: flex
        color: #ffffff
        margin: 0 auto
        padding-top: 165px
        .fonts-wrap
          flex: 1
          .title
            font-size: 40px
            color: #ffffff
            /*font-weight: bold*/
            margin-bottom: 40px
          .intro
            font-size: 24px
            margin-bottom: 65px
            line-height: 30px
          .free-use
            width: 140px
            height: 50px
            line-height: 50px
            text-align: center
            font-size: 24px
            border: 2px solid rgba(255, 255, 255, 1)
            border-radius: 6px
            transition: all .2s
            &:hover
              cursor: pointer
              background: #ffffff
              color: #3CB8DF
        .video-wrap
          width: 500px
          height: 280px
          position: relative
          .video
            width: 500px
            height: 280px
          .mask
            position: absolute
            top: 0
            left: 0
            width: 500px
            height: 280px
            background: rgba(0, 0, 0, 0.3)
            z-index: 100
            .play
              position: absolute
              width: 114px
              height: 114px
              background-image: url("../../assets/img/resolution/play.png")
              background-size: 114px 114px
              background-repeat: no-repeat
              left: 0
              top: 0
              right: 0
              bottom: 0
              margin: auto
              cursor: pointer
    .ctt-wrapper
      width: 100%
      background: #ffffff
      padding: 81px 0 100px
      .content
        .title
          text-align: center
          font-size: 38px
          /*font-weight: bold*/
          color: #595961
        .small-title
          margin-top: 33px
          text-align: center
          font-size: 18px
          color: #BFBFC8
        .ball-wrap
          margin: 20px auto 0
          width: 1200px
          height: 500px
          position: relative
          display: flex
          justify-content: space-between
          .left
            width: 500px
            .ball-content
              height: 550px
              background-repeat: no-repeat
              &.ball1
                background-image: url("../../assets/img/resolution/ecommerce/fnicon1.png")
                background-size: 291px 291px
                background-position: 62px 150px
                .btn
                  background: #FFA300
                .text
                  border-left-color: #FFA300
              &.ball2
                background-image: url("../../assets/img/resolution/ecommerce/fnicon2.png")
                background-size: 218px 281px
                background-position: 126px 150px
                .btn
                  background: #EC6821
                .text
                  border-left-color: #EC6821
              &.ball3
                background-image: url("../../assets/img/resolution/ecommerce/fnicon3.png")
                background-size: 259px 257px
                background-position: 57px 150px
                .btn
                  background: #E14030
                .text
                  border-left-color: #E14030
              &.ball4
                background-image: url("../../assets/img/resolution/ecommerce/fnicon4.png")
                background-size: 169px 266px
                background-position: 97px 150px
                .btn
                  background: #8A4F9B
                .text
                  border-left-color: #8A4F9B
              &.ball5
                background-image: url("../../assets/img/resolution/ecommerce/fnicon5.png")
                background-size: 330px 299px
                background-position: 139px 150px
                .btn
                  background: #82B12C
                .text
                  border-left-color: #82B12C
              &.ball6
                background-image: url("../../assets/img/resolution/ecommerce/fnicon6.png")
                background-size: 430px 270px
                background-position: 50px 150px
                .btn
                  background: #359BD6
                .text
                  border-left-color: #359BD6
              .name
                /*font-weight: bold*/
                padding-top: 200px
                font-size: 30px
                color: #595961
              .text
                margin-top: 38px
                line-height: 25px
                font-size: 18px
                color: #595961
                padding-left: 11px
                border-left-width: 6px
                border-left-style: solid
              .btn
                position: absolute
                bottom: 50px
                left: 0
                width: 160px
                height: 60px
                line-height: 60px
                text-align: center

                border-radius: 6px
                font-size: 24px
                color: #ffffff
                cursor: pointer
                &:active
                  opacity: 0.8
          .right-ball
            width: 600px
        .goodness
          display: flex
          justify-content: space-between
          width: 1200px
          margin: 92px auto 0
          .good
            width: 190px
            height: 230px
            box-shadow: 0 5px 9px 1px rgba(94, 94, 94, 0.3)
            border-radius: 6px
            position: relative
            .icon-box
              height: 130px
              position: relative
              img
                position: absolute
                bottom: 0
                left: 0
                right: 0
                margin: auto
            .text
              margin-top: 35px
              text-align: center
              font-size: 14px
              color: #595961
        .tabs
          width: 1200px
          margin: 30px auto 0
          display: flex
          justify-content: center
          height: 80px
          line-height: 80px
          border-bottom: 1px solid rgba(255, 255, 255, 0.5)
          .tname
            margin: 0 100px
            font-size: 22px
            color: #ffffff
            font-weight: bold
            cursor: pointer
            &.active
              border-bottom: 6px solid #822CF6
        .slide
          width: 1200px
          margin: 0 auto
          .tabs-content
            transition: all .2s
            opacity: 1
            transform: translate(0) !important
            &.slide-leave-active
              transition: all 0s
            &.slide-enter, &.slide-leave-to
              opacity: 0
              transform: translate(0) !important
            &.slide-leave-to
              opacity: 0
            .wrap
              width: 1200px
              margin: 0 auto
              .intro
                margin-top: 45px
                line-height: 36px
                font-size: 18px
                color: #ffffff
              .img-box
                margin-top: 70px
                display: flex
                flex-wrap: wrap
                height: 765px
                justify-content: space-between
                align-content: space-between
              .ttitle
                text-align: center
                font-size: 30px
                margin-top: 52px
                color: #ffffff
              .phone-box
                margin-top: 90px
                display: flex
                justify-content: space-between
                height: 545px
                img
                  vertical-align: bottom
            .tab-bottom
              margin-top: 69px
              margin-bottom: -100px
              width: 100%
              background: #822CF6
              height: 120px
              padding: 83px 0 73px
              display: flex
              justify-content: center
              .tab-bottom-item
                width: 400px
                border-right: 1px solid #ffffff
                color: #ffffff
                text-align: center
                &:last-child
                  border-right: none
                .bname
                  font-size: 28px
                .btext
                  margin-top: 20px
                  .icon
                    display: inline-block
                    background-repeat: no-repeat
                    vertical-align: bottom
                    &.icon1
                      width: 80px
                      height: 68px
                      background-size: 80px 68px
                      background-image: url("../../assets/img/resolution/ecommerce/tabicon1.png")
                    &.icon2
                      width: 80px
                      height: 80px
                      background-size: 80px 80px
                      background-image: url("../../assets/img/resolution/ecommerce/tabicon2.png")
                    &.icon3
                      width: 80px
                      height: 73px
                      background-size: 80px 73px
                      background-image: url("../../assets/img/resolution/ecommerce/tabicon3.png")
                  .num
                    margin: 0 10px 0 18px
                    font-size: 50px
                    /*font-weight: bold*/
                  .txt
                    font-size: 28px
        .example-wrap
          width: 1200px
          margin: 90px auto 0
          display: flex
          justify-content: space-between
          .example-left
            width: 802px
            height: 527px
          .example-right
            position: relative
            width: 375px
            height: 525px
            border: 1px solid rgba(191, 191, 191, 1)
            overflow: hidden
            &:hover
              border: none
              box-shadow: 0 3px 28px 1px rgba(27, 32, 39, 0.1)
            .unhover
              position: absolute
              width: 100%
              height: 100%
              .logo
                width: 185px
                height: 185px
                line-height: 185px
                margin: 34px auto 0
                border-radius: 50%
                border: 1px solid rgba(191, 191, 191, 1)
                text-align: center
                img
                  vertical-align: middle
              .title
                position: relative
                padding: 34px 0
                margin-bottom: 20px
                font-size: 36px
                color: #595961
                &:after
                  content: ''
                  position: absolute
                  width: 40px
                  height: 6px
                  background: #676767
                  margin: 0 auto
                  bottom: 0
                  left: 0
                  right: 0
              .text
                line-height: 40px
                text-align: center
                font-size: 24px
                color: #949494
              .button
                margin: 20px auto
                width:131px
                height:38px
                line-height: 38px
                text-align: center
                color: #979797
                font-size: 18px
                border:1px solid rgba(191,191,191,1)
            .hover
              position: absolute
              width: 100%
              height: 100%
              transition: all .2s
              transform: translate3d(0, 0, 0)
              &.slide-enter, &.slide-leave-to
                transform: translate3d(100%, 0, 0)
              .title
                padding: 44px 0 34px
                color: #595961
                font-size: 24px
              .vip
                display: block
                width: 300px
                height: 160px
                margin: 0 auto
              .qr
                display: block
                width: 156px
                height: 156px
                margin: 32px auto 35px
              .text
                text-align: center
                color: #979797
                font-size: 18px
</style>