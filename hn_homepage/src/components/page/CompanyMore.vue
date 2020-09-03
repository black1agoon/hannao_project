<template>
  <div class="more-wrapper" >

      <ul class="tabs">
        <li :class="{active: currentIndex === 0}" @click="tabClick(0)">发展历程</li>
        <li :class="{active: currentIndex === 1}" @click="tabClick(1)">公司成立</li>
        <li :class="{active: currentIndex === 2}" @click="tabClick(2)">主要功能</li>
        <li :class="{active: currentIndex === 3}" @click="tabClick(3)">优势</li>
        <li :class="{active: currentIndex === 4}" @click="tabClick(4)">解决问题</li>
      </ul>

      <div class="content" id="content">
        <div class="paragraph hook">
          <div class="title">发展历程</div>
          <div class="text">2017年9月，鉴正宝信息技术有限公司正式成立，由浙江可信物联网技术研究院提供技术支持，浙江可信物联网技术研究院是由中华人民共和国公安部第三研究所与浙江汉脑数码科技有限公司共同建设的公益性研究机构。公司已获得商用密码产品生产定点单位资质，同时也是浙江省服务型制造示范企业(平台)（第二批）、浙江省双软企业、中国防伪行业协会理事单位，连续4届互联网大会·乌镇峰会重点展商。</div>
        </div>
        <div class="paragraph hook">
          <div class="title">公司成立</div>
          <div class="text">
            <p>公司充分发挥国家商密技术和物联网领域多项自主知识产权技术优势，依托浙江可信物联网技术研究院强大的研发资源，融合大数据、云计算、人工智能等技术，与中华人民共和国公安部第三研究所防伪事业部共同建设"鉴真宝第三方智能商标标识防伪认证云服务平台"。</p>
            <p>"鉴真宝"1+N的工业互联网平台，提供智慧工厂建设服务，利用物联网技术与RFID技术着力于生产过程的品质管控，通过数字技术改造传统生产模式，从工厂生产源头全面贯彻品质与品牌管理，通过物联网技术实现敏捷生产，完整追溯产品全生命周期，实现物联网电子商务、品质追溯与品牌保护等B2B/B2C功能。打造品牌社交新媒体，信息分享生态圈，构建消费市场诚信体系，赋能传统电商平台。</p>
          </div>
        </div>
        <div class="paragraph hook">
          <div class="title">主要功能</div>
          <div class="text">
            <p>"鉴真宝"1+N的工业互联网平台，提供智慧工厂建设服务，利用物联网技术与RFID技术着力于生产过程的品质管控，通过数字技术改造传统生产模式，从工厂生产源头全面贯彻品质与品牌管理，通过物联网技术实现敏捷生产，完整追溯产品全生命周期，实现物联网电子商务、品质追溯与品牌保护等B2B/B2C功能，打造品牌社交新媒体，信息分享生态圈，构建消费市场诚信体系，赋能传统电商平台。</p>
            <p>具体表现为：</p>
            <p>1、"鉴真宝"的可信数据来自品牌企业一线生产数据</p>
            <p>通过自主研发的感知设备和边缘计算机，使生产企业人机数字化（eID与HeID技术），采集一线生产源头数据，打通生产数据链，快速处理海量工业数据</p>
            <p>2、"鉴真宝"使品牌产品有根溯源</p>
            <p>"鉴真宝" 智能商标拥有全球唯一ID，不可仿冒，不可复制，记录智慧生产中的每一道工序，使工厂、产品、消费者信息互联互通，消费者可以通过"鉴真宝"对所有带有智能商标的商品（跨境商品）进行防伪溯源，查找源头信息</p>
            <p>3、打造工业互联网消费市场生态圈</p>
            <p>"鉴真宝" 利用NFC功能不仅可以实现品牌产品信息防伪溯源，还能广泛对接品牌商城和第三方平台，实现同款购买和个性化搭配，实现最新的物联网电子商务，广泛拓展工业互联网消费市场新生态</p>
          </div>
        </div>
        <div class="paragraph hook">
          <div class="title">优势</div>
          <div class="text">
            <p>1、提升品牌纯洁度，对品牌进行保护。</p>
            <p>2、用新技术刺激消费者体验与消费，对新奇事物进行分享转播。</p>
            <p>3、通过智能商标的应用，不仅节约成本，还可拓展更多销售渠道。</p>
            <p>4、由公安部第三研究所防伪事业部提供权威保护，每一个智能商标拥有全球唯一ID号，难以破解，不可复制。</p>
            <p>5、1+N的工业互联网平台，可以1对多个品牌，提升用户体验，降低企业应用成本。</p>
          </div>
        </div>
        <div class="paragraph hook">
          <div class="title">解决问题:</div>
          <div class="text">
            <p>1、针对假货市场，利用高科技手段实现1对多个品牌的防伪保护，有效打击假冒伪劣现象，保护品牌自主知识产权，品牌商只需要一个"鉴真宝"就可以实现品牌保护。
            </p>
            <p>2、货源环节缺少闭环是碍于品牌商发展的主导因素之一；"鉴真宝"通过平台信息溯源功能，助力完善供应链管控以及岗位职责追溯体系，实现对供应商源头信息的全面追溯及管控。</p>
            <p>3、多货源供应的方式，各地经销商良莠不齐，虽然货源来自正规当地经销商，但经销商可能真假掺着卖；"鉴真宝"智能商标防伪标识，主动扼制掺假现象的发生，精准溯源到各地经销商销售信息。</p>
            <p>4、自营平台、商家、消费者都缺少有效的验证手段，对假货的鉴别缺少参考性，由假货引起的纠纷往往不了了之；"鉴真宝"兼容支持NFC功能的iOS/安卓操作系统手持终端，让消费者主动依靠手机识别品牌真伪，同时起到市场监督对应商家产品品质的作用，自营平台的对外公关处理也有理可据。</p>
            <p>5、ODM自营电商平台，成本控制、项目审批、品控、供应链效率问题的存在，产品质量本身交给合作工厂，缺少第三方监督管控，大量品质滞货，直接影响内部管理以及品牌市场口碑，被迫接受市场教育成本；"鉴真宝"的品质溯源以及物联网电子商务功能，定位拓展工业互联网消费市场新生态。</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import '@/assets/js/plugins/jquery.scrollTo.js'
  export default {
    name: 'company-more',
    computed: {
      currentIndex() {
        if (this.scrollY < this.listHeight[0]) {
          return 0
        }
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
        return 0
      }
    },
    data() {
      return {
        scrollY: 0,
        listHeight: []
      }
    },
    methods: {
      tabClick(index) {
        let lists = document.getElementsByClassName('hook')
        $.scrollTo(lists[index], 200)
      },
      caculateHeight() {
        let lists = document.getElementsByClassName('hook')
        // this.listHeight.push(0)
        for (let i = 0; i < lists.length; i++) {
          let item = lists[i]
          this.listHeight.push(item.offsetTop)
        }
      },
      caculateScroll() {
        window.addEventListener('scroll', () => {
          this.scrollY = $(window).scrollTop()
        })
      }
    },
    mounted() {
      this.$parent.changeHeaderColor()
      this.caculateHeight()
      this.caculateScroll()
    },
    beforeRouteLeave(to, from, next) {
      this.$parent.initHeaderColor()
      next()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .more-wrapper
    width: 1200px
    margin: 0 auto
    .tabs
      position: fixed
      top: 156px
      width: 150px
      height: 300px
      display: flex
      flex-direction: column
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.05)
      li
        height: 60px
        line-height: 60px
        text-align: center
        color: #4D4D4D
        font-size: 18px
        transition: all .2s
        cursor: pointer
        &.active
          color: #ffffff
          background: #FFA300
    .content
      margin-left: 280px
      padding: 110px 0
      .paragraph
        padding-top: 50px
        .title
          font-size: 30px
          color: #4B4B4B
          /*font-weight: bold*/
          position: relative
          &:before
            position: absolute
            width: 15px
            height: 42px
            left: -35px
            top: -6px
            background: #FFA300
            content: ''
        .text
          margin: 36px 0 84px
          font-size: 18px
          color: #4D4D4D
          line-height: 36px
</style>