<template>
  <div class="content-wrapper">
    <div class="title">鉴正宝信息技术有限公司</div>
    <div class="article">
      鉴正宝信息技术有限公司，是一家以物联网技术为核心的新型互联网企业， “鉴真宝”平台是由中华人民共和国公安部第三研究所防伪事业部与鉴正宝信息技术有限公司共同建设，公司以“鉴真宝”平台为业务核心，提供品牌保护、品质溯源、物联网电子商务等B2B/B2C技术服务。打造品牌社交新媒体，信息分享生态圈，构建消费市场诚信体系，赋能传统电商平台。
    </div>
    <div class="article">
      “鉴真宝”1+N的工业互联网平台，提供智慧工厂建设服务，利用物联网技术与RFID技术着力于生产过程的品质管控，通过数字技术改造传统生产模式，从工厂生产源头全面贯彻品质与品牌管理，通过物联网技术实现敏捷生产，完整追溯产品全生命周期，实现物联网电子商务、品质追溯与品牌保护。
    </div>
    <div class="article">
      公司致力于RFID技术产品的研究、智能商标的设计与生产和工业技术软件化设计与开发服务。公司由浙江可信物联网技术研究院提供技术支持。浙江可信物联网技术研究院是由公安部第三研究所与浙江汉脑数码科技有限公司共同建设的公益性研究机构。公司致力于打造政府放心、企业受益、消费者满意的数字经济服务平台，以共同的价值观与目标，构建实体经济与消费经济命运共同体。
    </div>
    <div class="lv2-title">发展历程</div>
    <div class="article">
        2017年9月，鉴正宝信息技术有限公司正式成立，由浙江可信物联网技术研究院提供技术支持，浙江可信物联网技术研究院是由中华人民共和国公安部第三研究所与浙江汉脑数码科技有限公司共同建设的公益性研究机构。公司已获得商用密码产品生产定点单位资质，同时也是浙江省服务型制造示范企业(平台)（第二批）、浙江省双软企业、中国防伪行业协会理事单位，连续4届互联网大会·乌镇峰会重点展商。
    </div>
    <div class="image-wrap">
      <img class="image" :src="require('../assets/img/company2.jpg')">
      <img class="image" :src="require('../assets/img/company1.jpg')">
      <img class="image" :src="require('../assets/img/company3.jpg')">
    </div>
    <div class="lv2-title">公司成立</div>
    <div class="article">
      公司充分发挥国家商密技术和物联网领域多项自主知识产权技术优势，依托浙江可信物联网技术研究院强大的研发资源，融合大数据、云计算、人工智能等技术，与中华人民共和国公安部第三研究所防伪事业部共同建设“鉴真宝第三方智能商标标识防伪认证云服务平台”。
    </div>
    <div class="article">
      “鉴真宝”1+N的工业互联网平台，提供智慧工厂建设服务，利用物联网技术与RFID技术着力于生产过程的品质管控，通过数字技术改造传统生产模式，从工厂生产源头全面贯彻品质与品牌管理，通过物联网技术实现敏捷生产，完整追溯产品全生命周期，实现物联网电子商务、品质追溯与品牌保护等B2B/B2C功能。打造品牌社交新媒体，信息分享生态圈，构建消费市场诚信体系，赋能传统电商平台。
    </div>
    <div class="lv2-title">公司已登记签发的软件产品</div>
    <div class="article">
      《智慧生产管控一体化软件V1.0》
    </div>
    <div class="lv2-title">公司愿景</div>
    <div class="article">
      鉴正宝信息技术有限公司将社会责任贯穿于企业发展战略，以“引领时代新技术、新产业、新业态、新模式”为企业目标，以推动实体经济与消费市场向更美好的方向前行为已任，促进社会经济、市场经济、安全环保协调稳健可持续发展，构建实体经济与消费市场命运共同体。
    </div>
  </div>
</template>

<script>
  export default {
    name: 'company-introduce-page'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.content-wrapper
  width: 1200px
  margin: 50px auto
  /*background: #999*/
  padding-bottom: 400px
  .title
    font-size: 25px
    margin-bottom: 20px
  .article
    font-size: 16px
    line-height: 25px
    text-indent: 30px
    margin-bottom: 12px
    display: flex
    .left
      flex: 1
      text-indent: 30px
    .right
      flex: 0 0 200px
      line-height: 0
      text-align: left
      .image
        display: block
        width: 100%
  .image-wrap
    display: flex
    justify-content: space-around
    .image
      width: 350px
      height: 280px
      /*height: 500px*/
  .lv2-title
    padding-left: 20px
    margin-top: 30px
    font-size: 25px
    margin-bottom: 20px
    position: relative
    &:before
      content: ''
      width: 5px
      height: 33px
      background: #4f9cee
      position: absolute
      left: 0
</style>
