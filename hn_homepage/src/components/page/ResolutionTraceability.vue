<template>
  <div class="wrapper">
    <div class="banner">
      <div class="content">
        <div class="fonts-wrap">
          <div class="title">鉴真宝智能商标标识防伪云服务平台</div>
          <div class="intro">一站式防伪溯源、供应链管控、品牌营销服务<br>仅为诚信企业服务，只对优质品牌负责</div>
          <div class="free-use">免费使用</div>
        </div>
        <div class="video-wrap">
          <div class="mask" v-show="maskShow">
            <img class="play" @click="videoPlay" src="../../assets/img/resolution/play.png"/>
          </div>
          <video class="video"
                 ref="video"
                 poster="../../assets/img/resolution/traceability/video1.png"
                 @click="videoStop"
                 src="http://media.jianzb.cn/sp/0812/yrf0812.mp4"
                 type="video/mp4">
          </video>
        </div>
      </div>
    </div>
    <div class="icons-wrapper">
      <div class="icons">
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon1.png"/>
          <p class="category">服务品类</p>
        </div>
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon2.png"/>
          <p class="category">纺织</p>
        </div>
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon3.png"/>
          <p class="category">服饰</p>
        </div>
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon4.png"/>
          <p class="category">箱包</p>
        </div>
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon5.png"/>
          <p class="category">母婴</p>
        </div>
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon6.png"/>
          <p class="category">鞋靴</p>
        </div>
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon7.png"/>
          <p class="category">珠宝</p>
        </div>
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon8.png"/>
          <p class="category">保健品</p>
        </div>
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon9.png"/>
          <p class="category">茶类</p>
        </div>
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon10.png"/>
          <p class="category">烟酒</p>
        </div>
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon11.png"/>
          <p class="category">收藏品</p>
        </div>
        <div class="icon">
          <img src="../../assets/img/resolution/traceability/icon12.png"/>
          <p class="category">食品</p>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper">
      <div class="content">
        <div class="title">赋能品牌企业</div>
        <div class="small-title">通过“鉴真宝”，品牌企业实现了生产过程、供应链、销售的数字化、智能化管理</div>
        <div class="brands">
          <div class="brand">
            <div class="img"><img src="../../assets/img/resolution/traceability/brand1.png"/></div>
            <div class="name">需求驱动生产</div>
            <div class="detail">减少库存满足个性化需求</div>
          </div>
          <div class="brand">
            <div class="img"><img src="../../assets/img/resolution/traceability/brand2.png"/></div>
            <div class="name">新媒体一体化营销</div>
            <div class="detail">拓展获客渠道提升盈利能力</div>
          </div>
          <div class="brand">
            <div class="img"><img src="../../assets/img/resolution/traceability/brand3.png"/></div>
            <div class="name">保护区域品牌</div>
            <div class="detail">提高产品质量减少返工</div>
          </div>
          <div class="brand">
            <div class="img"><img src="../../assets/img/resolution/traceability/brand4.png"/></div>
            <div class="name">需求驱动生产</div>
            <div class="detail">打造区域知名品牌</div>
          </div>
          <div class="brand">
            <div class="img"><img src="../../assets/img/resolution/traceability/brand5.png"/></div>
            <div class="name">提升品牌纯洁度</div>
            <div class="detail">新型防伪技术保驾护航</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper" style="background: #F1F1F5">
      <div class="content">
        <div class="title">“鉴真宝”资质</div>
        <div class="content-box">
          <div class="left">
            <div class="block block1">
              <div class="name">权威支持</div>
              <div class="ctt">公安部第三研究所防伪事业部</div>
            </div>
            <div class="block block2">
              <div class="name">行业第一</div>
              <div class="ctt">全球首个iOS/Android跨平台<br>NFC防伪云服务平台
              </div>
            </div>
            <div class="block block3">
              <div class="name">省级平台</div>
              <div class="ctt">浙江省服务型制造示范企业（平台）</div>
            </div>
            <div class="block block4">
              <div class="name">国密技术</div>
              <div class="ctt">国家商用密码产品生产定点单位</div>
            </div>
          </div>
          <div class="right">
            鉴真宝智能商标标识防伪云服务平台（简称
            “鉴真宝”），是由中华人民共和国公安部
            第三研究所防伪事业部与鉴正宝信息技术有
            限公司共同建设，是全球首个iOS/Android
            跨平台使用NFC识别RFID智能商标的云服务
            平台。
          </div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper">
      <div class="content">
        <div class="title">“鉴真宝”优势</div>
        <div class="small-title">专业、权威的防伪平台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为品牌企业提供公安级防伪溯源服务</div>
        <div class="goodness">
          <div class="good">
            <div class="img"><img src="../../assets/img/resolution/traceability/good1.png"/></div>
            <div class="name">品牌定位分析</div>
            <div class="detail">
              认证团队现场审核，专业团队定制品牌<br>发展策略
            </div>
          </div>
          <div class="good">
            <div class="img"><img src="../../assets/img/resolution/traceability/good2.png"/></div>
            <div class="name">平台免费开放</div>
            <div class="detail">
              为广大需求溯源管理的品牌企业免费开<br>放条码、二维码溯源功能
            </div>
          </div>
          <div class="good">
            <div class="img"><img src="../../assets/img/resolution/traceability/good3.png"/></div>
            <div class="name">智能商标防伪</div>
            <div class="detail">
              全面打通iOS/Android，利用NFC技术<br>识别智能商标
            </div>
          </div>
          <div class="good">
            <div class="img"><img src="../../assets/img/resolution/traceability/good4.png"/></div>
            <div class="name">1+N品牌对接</div>
            <div class="detail">一个平台与所有品牌完成数据互通</div>
          </div>
          <div class="good">
            <div class="img"><img src="../../assets/img/resolution/traceability/good5.png"/></div>
            <div class="name">防伪溯源一体化</div>
            <div class="detail">一站式品牌防伪、品质溯源服务</div>
          </div>
          <div class="good">
            <div class="img"><img src="../../assets/img/resolution/traceability/good6.png"/></div>
            <div class="name">物联网电子商务</div>
            <div class="detail">独创“见物购物”的新型消费模式</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper2">
      <div class="content">
        <div class="title">“鉴真宝”解决方案</div>
        <ul class="tabs">
          <li>
            <span :class="{active: activeIndex === 0}" @mouseenter="tabClick(0)">保护知识产权</span>
          </li>
          <li>
            <span :class="{active: activeIndex === 1}" @mouseenter="tabClick(1)">提供防伪科学依据</span>
          </li>
          <li>
            <span :class="{active: activeIndex === 2}" @mouseenter="tabClick(2)">扼制掺假</span>
          </li>
          <li>
            <span :class="{active: activeIndex === 3}" @mouseenter="tabClick(3)">品质管控</span>
          </li>
          <li>
            <span :class="{active: activeIndex === 4}" @mouseenter="tabClick(4)">赋能传统电商平台</span>
          </li>
        </ul>
        <transition-group class="myslide" name="myslide">
          <div class="tab-content" v-show="activeIndex === 0" key="slide1">
            针对假货市场，利用高科技实现1对多个品牌的防伪保护，有效识别假冒伪劣现象，保护品牌自主知识产权，品牌商只需要一个“鉴真宝”就可 以实现品牌保护。
          </div>
          <div class="tab-content" v-show="activeIndex === 1" key="slide2">
            自营平台、商家、消费者都缺少有效的验证手段，对假货的鉴别缺少参考性，由假货引起的纠纷往往不了了之。“鉴真宝”兼容支持NFC功能的iOS/安卓操作系统手持终端，让消费者主动依靠手机识别商品真伪，同时起到市场监督的作用，自营平台的对外公关处理也有理可据。
          </div>
          <div class="tab-content" v-show="activeIndex === 2" key="slide3">
            多货源供应的方式，各地经销商良莠不齐，虽然货源来自正规当地经销商，但经销商可能掺假售卖。“鉴真宝”主动扼制掺假现象的发生，精准溯源到各地经销商销售信息。
          </div>
          <div class="tab-content" v-show="activeIndex === 3" key="slide4">
            货源环节缺少闭环是碍于品牌商发展的主导因素之一。“鉴真宝”通过品质追溯功能，助力完善供应链管控以及岗位职责追溯体系，实现对供应商源头信息的全面追溯及管控。
          </div>
          <div class="tab-content" v-show="activeIndex === 4" key="slide5">
            ODM自营电商平台，成本控制、项目审批、品控、供应链效率问题普遍存在产品质量本身交给合作工厂，缺少第三方监督管控，大量品质滞货，直接影响内部管理以及品牌市场口碑，被迫接受市场教育成本。“鉴真宝”的品质溯源以及物联网电子商务功能，为传统电商平台赋能，定位拓展工业互联网消费市场新生态。
          </div>
        </transition-group>
      </div>
    </div>
    <div class="ctt-wrapper">
      <div class="content">
        <div class="title">“鉴真宝”使用方法</div>
        <div class="small-title">“见物购物”式物联网电子商务新体验</div>
        <div class="explain"><i><i></i></i>“见物购物”式物联网电子商务新体验</div>
        <div class="steps">
          <div class="step">
            <img src="../../assets/img/resolution/traceability/step1.png"/>
            <span class="sp">Step&nbsp;1</span>
            <span class="intro">下载“鉴真宝”</span>
          </div>
          <i class="arrow"></i>
          <div class="step">
            <img src="../../assets/img/resolution/traceability/step2.png"/>
            <span class="sp">Step&nbsp;2</span>
            <span class="intro">打开NFC与鉴真宝APP<br>（ 安卓手机需手动开启NFC，<br>iPhone 7以上手机已默认开启 ）</span>
          </div>
          <i class="arrow"></i>
          <div class="step">
            <img src="../../assets/img/resolution/traceability/step3.png"/>
            <span class="sp">Step&nbsp;3</span>
            <span class="intro">将手机贴近产品上的“鉴真<br>宝”智能商标</span>
          </div>
          <i class="arrow"></i>
          <div class="step">
            <img src="../../assets/img/resolution/traceability/step4.png"/>
            <span class="sp">Step&nbsp;4</span>
            <span class="intro">验证商品真伪信息，<br>购买同款</span>
          </div>
        </div>
        <div class="step-bottom">
          <div class="support">
            <p class="title">支持的机型</p>
            <p class="text">Android系统：所有带有NFC功能的安卓手机<br>
              iOS系统：支持iPhone 7以上，iOS 11.3系统以上的苹果手机
            </p>
          </div>
          <div class="qrcodes">
            <div class="qr-box">
              <img class="download" src="../../assets/img/resolution/traceability/qrcode.png"/>
              <p class="p1">下载“鉴真宝”</p>
            </div>
            <div class="qr-box">
              <img class="wxcode" src="../../assets/img/resolution/traceability/wxcode.png"/>
              <p class="p2">微信扫码<br>查看使用方法</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ctt-wrapper" style="background: #F1F1F5">
      <div class="content">
        <div class="title">区域品牌保护</div>
        <div class="content-box">
          <div class="brands-protect">
            <div :class="['brand', {active: brandIndex === 0}]">
              <div class="area">海宁</div>
              <div class="trait">皮革代表性品牌</div>
              <div class="img-wrap" @mouseenter="brandClick(0)">
                <img src="../../assets/img/resolution/traceability/blogo1.png">
              </div>
            </div>
          </div>
          <div class="brands-protect">
            <div :class="['brand', {active: brandIndex === 1}]">
              <div class="area">桐乡</div>
              <div class="trait">蚕丝被代表性品牌</div>
              <div class="img-wrap" @mouseenter="brandClick(1)">
                <img src="../../assets/img/resolution/traceability/blogo2.png">
              </div>
            </div>
          </div>
          <div class="brands-protect">
            <div :class="['brand', {active: brandIndex === 2}]">
              <div class="area">平湖</div>
              <div class="trait">羽绒服代表性品牌</div>
              <div class="img-wrap" @mouseenter="brandClick(2)">
                <img src="../../assets/img/resolution/traceability/blogo3.png">
              </div>
            </div>
          </div>
          <div class="brands-protect">
            <div :class="['brand', {active: brandIndex === 3}]">
              <div class="area">国际</div>
              <div class="trait">箱包代表性品牌</div>
              <div class="img-wrap" @mouseenter="brandClick(3)">
                <img src="../../assets/img/resolution/traceability/blogo4.png">
              </div>
            </div>
          </div>
        </div>

        <div class="brand-info" v-show="brandIndex === 0">为中国名牌“雪豹”建设数字化工厂，引领皮革行业品牌防伪新风向。</div>
        <div class="brand-info" v-show="brandIndex === 1">对桐乡蚕丝被进行区域品牌保护，让每一条蚕丝被都有一张特殊“身份证”。</div>
        <div class="brand-info" v-show="brandIndex === 2">赋能自主品牌，对传统服装企业进行数字化改造，全线管控产品品质，融合新媒体和物联网技术进行品牌营销，实现销量倍增。</div>
        <div class="brand-info" v-show="brandIndex === 3">全年贯通箱包设计、生产、物流、仓储、销售数据链，以物联网电子商务新模式开拓箱包跨境销售新渠道。</div>

      </div>
    </div>
    <online-service>
    </online-service>
  </div>
</template>

<script>
  import OnlineService from '../common/OnlineService'

  export default {
    name: 'resolution-traceability',
    components: {
      OnlineService
    },
    data() {
      return {
        maskShow: true,
        activeIndex: 0,
        brandIndex: 0,
        timer: null
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
      brandClick(index) {
        this.brandIndex = index
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        ++this.brandIndex === 4 && (this.brandIndex = 0)
      }, 5000)
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1200px
      height: 500px
      background-image: url("../../assets/img/resolution/traceability/banner.png")
      background-repeat: no-repeat
      background-size: cover
      .content
        width: 1200px
        display: flex
        color: #ffffff
        margin: 0 auto
        padding-top: 135px
        .fonts-wrap
          flex: 1
          .title
            font-size: 40px
            /*font-weight: bold*/
            color: #ffffff
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
    .icons-wrapper
      width: 100%
      height: 70px
      background: #F7F8FA
      padding: 20px 0 10px
      .icons
        width: 1200px
        height: 70px
        margin: 0 auto
        display: flex
        .icon
          flex: 1
          text-align: center
          position: relative
          .category
            position: absolute
            width: 100%
            bottom: 0
            color: #595961
            font-size: 14px

    .ctt-wrapper
      width: 100%
      background: #ffffff
      padding: 81px 0
      .content
        width: 1200px
        margin: 0 auto
        .title
          text-align: center
          font-size: 35px
          /*font-weight: bold*/
          color: #595961
        .small-title
          margin-top: 33px
          text-align: center
          font-size: 18px
          color: #595961
        .brands
          display: flex
          margin-top: 30px
          .brand
            flex: 1
            text-align: center
        .goodness
          display: flex
          flex-wrap: wrap
          justify-content: space-between
          margin-top: 30px
          .good
            width: 210px
            text-align: center
            margin-right: 285px
            margin-top: 20px
            &:nth-of-type(3n)
              margin-right: 0
        .brands .brand, .goodness .good
          .img
            width: 100px
            height: 100px
            margin: 0 auto
            position: relative
            img
              position: absolute
              top: 0
              left: 0
              right: 0
              bottom: 0
              margin: auto
          .name
            color: #595961
            font-size: 14px
            margin-top: 15px
          .detail
            margin-top: 15px
            color: #BFBFC8
            font-size: 12px
            line-height: 20px
        .content-box
          display: flex
          margin-top: 80px
          justify-content: space-between
          .left
            width: 710px
            height: 270px
            display: flex
            flex-wrap: wrap
            justify-content: space-between
            align-content: space-between
            .block
              width: 340px
              height: 120px
              background-size: 340px 120px
              background-repeat: no-repeat
              &.block1
                background-image: url("../../assets/img/resolution/traceability/block1.png")
              &.block2
                background-image: url("../../assets/img/resolution/traceability/block2.png")
              &.block3
                background-image: url("../../assets/img/resolution/traceability/block3.png")
              &.block4
                background-image: url("../../assets/img/resolution/traceability/block4.png")
              .name
                font-size: 20px
                margin: 30px 0 0 29px
                color: #ffffff
              .ctt
                font-size: 16px
                margin: 8px 0 0 29px
                color: #C4E6FD
                line-height: 25px
          .right
            width: 385px
            color: #595961
            font-size: 18px
            line-height: 36px
            position: relative
            &:before
              position: absolute
              left: -15px
              top: 7px
              content: ''
              width: 8px
              height: 20px
              background-color: #0096FC
        .explain
          margin-top: 50px
          i
            border-radius: 50%
            border: 3px solid #009BFF
            display: inline-block
            i
              display: inline-block
              width: 10px
              height: 10px
              background: #009BFF
              border-radius: 50%
              border: 2px solid #ffffff
        .steps
          display: flex
          justify-content: space-between
          align-items: center
          margin-top: 31px

          .arrow
            display: inline-block
            width: 18px
            height: 30px
            background-image: url("../../assets/img/resolution/traceability/arrow.png")
            background-size: 18px 30px
            background-repeat: no-repeat
          .step
            position: relative
            .sp
              display: block
              font-size: 42px
              /*font-weight: bold*/
              color: #C0ECFF
            .intro
              position: absolute
              width: 260px
              top: 328px
              left: 15px
              line-height: 24px
              font-size: 18px
              color: #000000
        .step-bottom
          display: flex
          margin-top: 120px
          justify-content: space-between
          .support
            position: relative
            &:before
              content: ''
              position: absolute
              left: -15px
              top: 2px
              width: 4px
              height: 70px
              background: linear-gradient(to bottom, #00C8FF 0%, #0088FF 100%)
            .title
              font-size: 20px
              color: #0096FC
              text-align: left
            .text
              margin-top: 8px
              font-size: 16px
              color: #595961
              line-height: 24px
          .qrcodes
            display: flex
            .qr-box
              width: 107px
              height: 142px
              background-image: url("../../assets/img/resolution/traceability/qrcodebox.png")
              background-size: 107px 142px
              background-repeat: no-repeat
              text-align: center
              margin-left: 16px
              padding-top: 7px
              .p1
                font-size: 12px
                color: #595961
                line-height: 36px
              .p2
                font-size: 12px
                color: #595961
                line-height: 16px
        .brands-protect
          display: flex
          justify-content: space-between
          .brand
            text-align: center
            height: 200px
            position: relative
            &.active
              .img-wrap
                transform: scale(1.7)
            .area
              font-size: 18px
              color: #595961
            .trait
              font-size: 14px
              color: #A3A3A9
              margin-top: 16px
            .img-wrap
              position: absolute
              left: 0
              right: 0
              margin: 0 auto
              bottom: 30px
              width: 74px
              height: 74px
              border-radius: 50%
              background: #fff
              overflow: hidden
              box-shadow: 0 2px 16px rgba(186, 186, 186, 0.14)
              transition: all .2s
              cursor: pointer
              img
                position: absolute
                top: 0
                left: 0
                right: 0
                bottom: 0
                margin: auto
                width: 60px
        .brand-info
          text-align: center
          height: 100px
          font-size: 24px
          color: #595961
          margin: 50px 0 50px
          line-height: 40px
    .ctt-wrapper2
      position: relative
      min-width: 1200px
      height: 539px
      background-image: url("../../assets/img/resolution/traceability/resolution.png")
      background-repeat: no-repeat
      background-size: cover
      .content
        width: 1200px
        margin: 0 auto
        color: #ffffff
        position: relative
        overflow-x: hidden
        .title
          padding-top: 81px
          text-align: center
          font-size: 30px
          /*font-weight: bold*/
        .tabs
          margin-top: 42px
          display: flex
          border-bottom: 1px solid #ffffff
          li
            flex: 1
            text-align: center
            span
              display: inline-block
              height: 80px
              line-height: 80px
              font-size: 22px
              /*font-weight: bold*/
              cursor: pointer
              &.active
                border-bottom: 3px solid #ffffff
        .myslide
          display: block
          width: 1200px
          height: 300px
          margin-top: 25px
          position: relative
          .tab-content
            width: 100%
            height: 100%
            position: absolute
            top: 0
            font-size: 18px
            line-height: 36px
            transition: all .5s
            transform: translate3d(0, 0, 0) !important
            opacity: 1
            &.myslide-enter
              transform: translate3d(100%, 0, 0) !important
              opacity: 0
            &.myslide-leave-to
              opacity: 0
</style>