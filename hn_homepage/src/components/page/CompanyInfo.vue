<template>
  <div class="wrapper">
    <div class="banner">
      <video class="video"
             type="video/mp4"
             autoplay
             muted
             src="http://media.jianzb.cn/sp/0813/gsxx0813.mp4">
      </video>
      <div class="banner-mask">
        <div class="title">仅为诚信企业服务，只对优质品牌负责</div>
        <div class="apply">
          <router-link to="/company/more">了解更多</router-link>
        </div>
      </div>
    </div>
    <div class="company-wrapper">
      <div class="left">
        <div class="title">鉴正宝信息技术有限公司</div>
        <div class="text">
          <p>鉴正宝信息技术有限公司，是一家以物联网技术为核心的新型互联网企业。致力于物联网电子商务、品牌保护与提升、产品溯源与管理、策略咨询和信息技术服务，推进新零售和消费升级，营造公平、公正、诚信的互联网活动氛围。</p>
          <p>公司充分发挥国家商密和物联网领域多项自主知识产权的技术优势，融合大数据、云计算、人工智能，依托浙江可信物联网技术研究院，与中华人民共和国公安部第三研究所防伪事业部达成战略合作，形成以鉴真宝第三方智能商标标识防伪认证云服务平台、AFE国际品牌计划、"一带一路"AFE国家产品质量标准认证体系为业务核心。</p>
          <p>鉴正宝信息技术有限公司将社会责任贯穿于企业发展战略中，以"引领时代新技术、新产业、新业态、新模式"为企业目标，推动实体经济与消费市场向更美好的方向前行，促进社会经济、市场秩序、安全环保协调稳健可持续发展，构建实体经济与消费市场命运共同体。</p>
          <p>鉴正宝信息技术有限公司位于中国共产党诞生地浙江嘉兴，同时也地处沪嘉杭"G60科技走廊"重要地理位置。公司依托浙江可信物联网技术研究院，充分融合人才、技术、资金、装置、项目等多方要素，协同周边嘉兴科技城、张江长三角科技城、乌镇互联网创新发展综合试验区、清华长三角研究院和中科院应用技术研究院等园区和科研院所共同发挥长三角经济、政治、科研优势，提升全球城市群竞争力，高效配置创新资源，打造开放型、面向长三角的国家科创要素对接服务平台。</p>

        </div>
      </div>
      <div class="right">
        <div class="map">
          <img src="../../assets/img/company/map2.png"/>
        </div>
        <div class="box">
          <p class="btitle"><i></i>愿景:</p>
          <p class="btext">政府放心、百姓满意、企业受益</p>
          <p class="btitle"><i></i>价值观:</p>
          <p class="btext">仅为诚信企业服务，只对优质品牌负责</p>
        </div>
      </div>
    </div>
    <online-service>
    </online-service>
  </div>
</template>

<script>
  import OnlineService from '../common/OnlineService'

  export default {
    name: 'company-page',
    components: {
      OnlineService,
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1200px
      height: 500px
      .video
        width: 100%
        height: 500px
        object-fit: cover
      .banner-mask
        position: absolute
        top: 0
        width: 100%
        height: 500px
        color: #ffffff
        background-color: rgba(0, 0, 0, .4)
        text-align: center
        .title
          margin-top: 222px
          font-size: 40px
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
      margin: 57px auto 150px
      display: flex
      justify-content: space-between
      .left
        width: 648px
        .title
          font-size: 24px
          /*font-weight: bold*/
          color: #444444
          margin-bottom: 30px
        .text
          font-size: 18px
          line-height: 36px
          color: #4D4D4D
          p
            margin-bottom: 30px
      .right
        width: 500px
        .map
          width: 500px
          height: 362px
          margin-top: 64px
        .box
          margin-top: 88px
          width: 500px
          height: 294px
          border: 1px solid rgba(234, 234, 234, 1)
          color: #5A5A5A
          background: #FBFBFB
          padding: 37px 22px
          box-sizing: border-box
          .btitle
            font-size: 30px
            /*font-weight: bold*/
            i
              width: 15px
              height: 15px
              background: #63A7E8
              border-radius: 50%
              display: inline-block
              vertical-align: middle
              margin-right: 16px
          .btext
            font-size: 23px
            /*font-weight: bold*/
            margin: 20px 0 50px 55px
</style>