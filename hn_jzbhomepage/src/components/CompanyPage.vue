<template>
  <div class="main-list">
    <div id="cp2_bg1" class="full-bg hg-43">
      <div class="titles-con bg-middle bg-item">
        <h1 class="bg-title">鉴正宝信息技术有限公司</h1>
        <div class="bg-content hover-in">
          <p>鉴正宝信息技术有限公司，是一家以物联网技术为核心的新型互联网企业。致力于物联网电子商务、品牌保护与提升、产品溯源与管理、策略咨询和信息技术服务，推进新零售和消费升级，营造公平、公正、诚信的互联网活动氛围。</p>
          <p>公司充分发挥国家商密和物联网领域多项自主知识产权的技术优势，融合大数据、云计算、人工智能，依托浙江可信物联网技术研究院，与中华人民共和国公安部第三研究所防伪事业部达成战略合作，形成以鉴真宝第三方智能商标标识防伪认证云服务平台、AFE国际品牌计划、“一带一路”AFE国家产品质量标准认证体系为业务核心。</p>
          <p>鉴正宝信息技术有限公司将社会责任贯穿于企业发展战略中，以“引领时代新技术、新产业、新业态、新模式”为企业目标，推动实体经济与消费市场向更美好的方向前行，促进社会经济、市场秩序、安全环保协调稳健可持续发展，构建实体经济与消费市场命运共同体。</p>
        </div>
        <router-link class="pure-button hover-in" to="/company/introduction">了解更多</router-link>
      </div>
    </div>

    <div class="sub-section" id="srv_con">
      <div class="section-title">
        <h1>鉴正宝三大服务</h1>
      </div>
      <div class="cells-wrapper">
        <div class="icon-cells clearfix">
          <div class="icon-cell">
            <div class="cell-img" id="srv_icon1"></div>
            <div class="cell-text">第三方智能商标标识防伪认证云服务平台</div>
          </div>
          <div class="icon-cell">
            <div class="cell-img" id="srv_icon2"></div>
            <div class="cell-text">AFE国际品牌计划</div>
          </div>
          <div class="icon-cell">
            <div class="cell-img" id="srv_icon3"></div>
            <div class="cell-text">“一带一路”AFE国家产品质量标准认证体系</div>
          </div>
        </div>
      </div>
    </div>

    <div class="sub-section" id="der_con">
      <div class="section-title">
        <h1>衍生行业</h1>
        <div class="sub-title">防伪商标生产与智能设备</div>
      </div>
      <div id="der_img">
        <img src="/static/img/company/derivation.png" alt="">
      </div>
    </div>

    <div class="sub-section clearfix" id="g60_con">
      <div class="section-title">
        <h1>G60科技走廊</h1>
      </div>
      <div id="g60_text">{{ g60text }}</div>
      <div id="g60_img">
        <img src="/static/img/company/g60.png" alt="">
      </div>
    </div>

    <div class="container" id="cul_con">
      <div class="pure-g bg-xs">
        <div v-for="(item, idx) in cul_items" :key="item.title"
             class="pure-u-1-3 bg-title tab" @click="changeTab(idx + 1)"
             :class="{active: active_tab === idx + 1}">
             {{ item.title }}
        </div>
      </div>
      <div class="bg-slide hg-34">
        <div id="cul_img1" class="full-bg"
             :class="{'hide-left': active_tab > 1}">
          <div class="bg-con bg-con-middle bg-left bg-item">
            <div class="bg-content">
              <p>愿景：政府放心、百姓满意、企业受益</p>
              <p>价值观：仅为诚信企业服务，只对优质品牌负责</p>
            </div>
          </div>
        </div>
        <div id="cul_img2" class="full-bg"
             :class="{'hide-left': active_tab > 2, 'hide-right': active_tab < 2}">
          <div class="bg-con bg-con-middle bg-left bg-item">
            <div class="bg-content">
              <p>公司是中国互联网协会会员、浙江省物联网产业协会常务理事单位、嘉兴市信息化企业行业协会副会长单位、嘉兴市“互联网+工业”示范企业。</p>
              <p>公司拥有省级高新技术研究开发中心，是国家商用密码产品生产定点单位，军民融合企业，嘉兴市信用管理示范企业，企业信用等级AAA级。</p>
            </div>
          </div>
        </div>
        <div id="cul_img3" class="full-bg"
             :class="{'hide-right': active_tab < 3}">
          <div class="bg-con bg-con-middle bg-left bg-item">
            <div class="bg-content">
              <div class="sub-con">
                <img src="/static/img/company/cer3.png" alt="">
              </div>
              <div class="sub-con sub-con-right">
                <p>公司拥有专利100多项<br>软件著作权7项</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <gallery-section></gallery-section>
  </div>
</template>

<script>
import GallerySection from './partials/GallerySection'
export default {
  name: 'CompanyPage',

  components: {
    GallerySection
  },

  data () {
    return {
      active_tab: 1,
      cul_items: [
        { title: '企业文化' },
        { title: '企业资历' },
        { title: '知识产权' }
      ],
      g60text: '鉴正宝信息技术有限公司位于中国共产党诞生地浙江嘉兴，同时也地处' +
               '沪嘉杭“G60科技走廊”重要地理位置。公司依托浙江可信物联网技术' +
               '研究院，充分融合人才、技术、资金、装置、项目等多方要素，协同周' +
               '边嘉兴科技城、张江长三角科技城、乌镇互联网创新发展综合试验区、' +
               '清华长三角研究院和中科院应用技术研究院等园区和科研院所共同发挥' +
               '长三角经济、政治、科研优势，提升全球城市群竞争力，高效配置创新' +
               '资源，打造开放型、面向长三角的国家科创要素对接服务平台。'
    }
  },

  methods: {
    changeTab: function (tabIdx) {
      this.active_tab = tabIdx
    }
  }
}
</script>

<style scoped>
#cp2_bg1 {
  background-image: url("/static/img/company/top_bg.jpg");
}
#cp2_bg1.full-bg {
  background-position-y: 20%;
  transition: background-position 0.5s ease-in;
}
#cp2_bg1.full-bg:hover {
  background-position-y: top;
  /* padding-bottom: 100px; */
}
#cp2_bg1.full-bg:hover .hover-in {
  margin-bottom: 100px;
}
#cp2_bg1.full-bg:before {
  content: "";
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  background: rgba(0,0,0,0);
  transition: all 0.5s ease;
}
#cp2_bg1.full-bg:hover:before {
  background: rgba(0,0,0,0.2);
}

.titles-con {
  width: 90%;
  left: 5%;
  right: 5%;
}
.bg-content {
  color: white;
  text-align: justify;
  letter-spacing: 1px;
}

.bg-con-middle {
  width: 60%;
}

.section-title {
  margin: 80px auto 40px;
}
#srv_con .cells-wrapper {
  background-color: #5b8dfe;
}
#srv_con .icon-cells {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 5%;
  color: white;
  text-align: center;
}
#srv_con .icon-cell {
  float: left;
  width: 33.33%;
}
#srv_con .icon-cell .cell-img {
  height: 180px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: 20px;
}

#srv_icon1 {
  background-image: url("/static/img/company/logo.png");
}
#srv_icon2 {
  background-image: url('/static/img/company/afe.png');
}
#srv_icon3 {
  background-image: url("/static/img/company/logo.png");
}

#der_con .sub-title {
  color: black;
  font-size: 20px;
  padding-bottom: 20px;
}

#der_img img {
  width: 90%;
  height: auto;
  display: block;
  margin: 0 auto;
}

#g60_con {
  padding: 0 5%;
  max-width: 1280px;
  margin: 0 auto;
}
#g60_text {
  width: 50%;
  display: block;
  float: left;
  font-size: 20px;
  padding-top: 3%;
  text-align: justify;
}
#g60_img {
  width: 50%;
  float: left;
}
#g60_img img {
  width: 88%;
  padding: 6% 0 6% 12%;
}

#cul_con {
  margin: 80px auto;
}
#cul_con .tab {
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  margin-bottom: 0;
  color: black;
}
#cul_con .tab.active {
  background-color: #003c72;
  color: white;
}
#cul_con .bg-slide {
  font-size: 18px;
}
.hg-34 {
  padding-bottom: 34.16%;
}
#cul_img1 {
  background-image: url("/static/img/company/cul_img1.jpg");
}
#cul_img2 {
  background-image: url("/static/img/company/cul_img2.jpg");
}
#cul_img3 {
  background-image: url("/static/img/company/cul_img3.jpg");
}
.bg-slide {
  position: relative;
  overflow: hidden;
}
.bg-slide .full-bg {
  height: 100%;
  width: 100%;
  position: absolute;
}

#cul_img3 .bg-con-middle {
  width: 80%;
}
#cul_img3 .sub-con {
  float: left;
}
#cul_img3 .sub-con img {
  vertical-align: middle;
  width: 100%;
}
#cul_img3 .sub-con {
  width: 60%;
}
#cul_img3 .sub-con.sub-con-right {
  width: 40%;
}
#cul_img3 .sub-con p {
  padding-left: 60px;
}
.pure-button {
  background-color: #0071ff;
  border-radius: 0;
  color: white;
  font-size: 18px;
  padding: 6px 32px;
}

</style>

