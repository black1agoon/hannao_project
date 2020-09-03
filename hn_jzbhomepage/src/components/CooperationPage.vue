<template>
  <div class="main-list">
    <div class="container">
      <div v-if="false" class="row-con" :class="{collapsed: collapsed_0}">
        <div id="hn_desc" class="row-wrapper">
          <div class="bg-row">
            <div class="img-con">
              <img src="/static/img/coop/build_hn.jpg" alt="Hannao">
            </div>
            <h2>浙江汉脑数码科技有限公司</h2>
            <p>浙江汉脑数码科技有限公司成立于1999年，注册资金2700万，是一家专业从事互联网和物联网技术产品研发、生产、服务的高新技术企业，主要为互联网、智能工业、智慧城市等领域提供信息化技术解决方案和产品。</p>
            <p>公司是中国互联网协会会员、浙江省物联网产业协会常务理事单位、嘉兴市信息化企业行业协会副会长单位、嘉兴市“互联网+工业”研发示范企业。公司拥有省级高新技术研究开发中心，是国家商用密码产品生产定点单位，军民融合企业，企业信用等级AAA级。</p>
            <p>公司拥有专利一百多项，软件著作权多项，承担多项国家级省级“火炬计划”项目，先后获得了国家重点新产品奖、浙江省、市科技奖等多个奖项。近年来公司立足嘉兴，发挥长三角的地理优势，以上海、杭州为两翼，企业逐步向外发展。2015年和2016年公司分别受邀作为嘉宾出席了第二届世界互联网大会和第三届世界互联网大会以及2016年9月首届中国产业互联网大会并获得现场信息发布资格，受到与会嘉宾的关注。</p>
            <p>公司是国内最早从事物联网技术开发的公司之一，在新一代国家交通管控网（车联网）以及其他物联网感知产品的自主研发、产业化和市场中脱颖而出，产品在国家重大工程如智慧城市、智能交通、智慧工业和智慧社区等项目中得到批量应用，其中包括中国首个智慧城市示范点——无锡。</p>
            <p>公司的主营业务板块分为传统IT产业和创新产业，其中创新产业板块已形成了以物联网核心的几款产品：“鉴真宝”云平台、智能分布式工业云平台、HANA工业智能一体化管理系统、智能硬件、RFID系统产品和物联网电子商务平台。</p>
          </div>
        </div>
        <div class="overlay-more to-right"></div>
        <div class="toggle-btns to-right" @click="toggleCollapsed(0)">
          <span class="toggle-btn more-btn">+ 展开更多</span>
          <span class="toggle-btn less-btn">- 收起</span>
        </div>
      </div>
      <div class="row-con" :class="{collapsed: collapsed_1}">
        <div class="row-wrapper">
          <div class="bg-row">
            <div class="img-con img-con-right" id="tri_img">
              <div class="img-wrapper fade-bottom" id="cert_img"></div>
              <div class="img-wrapper fade-top" id="build3s_img"></div>
            </div>
            <h2>公安部第三研究所防伪事业部</h2>
            <p>公安部第三研究所创建于 1978 年，是公安部直属正厅级事业单位。所本部位于上海市徐汇区岳阳路 76 号，在浦东新区张江高科技园区及北京市东城区和海淀区分别设有研究基地、业务机构。干部职工2000余人，其中科研人员 1600 余人，博士、硕士研究生以上学历人员 700 余人。</p>
            <p>本所主要研究领域包括信息网络安全、物联网、特种通讯、禁毒、反恐防爆、图像处理和传输以及社会公共安全防范技术等。拥有博士后科研工作站、信息安全等级保护关键技术国家工程实验室、网络事件预警与防控技术国家工程实验室、国家反计算机入侵和防病毒研究中心、国家网络与信息系统安全产品质量监督检验中心、国家安全防范报警系统产品质量监督检验中心（上海）、国家级专业技术人员继续教育基地、全国公安教育训练网络学院网络安全分院、公安部网络警察培训基地、公安部安全防范报警系统产品质量监督检验测试中心、公安部计算机信息系统产品质量监督检验中心、公安部信息安全产品检测中心、公安部信息安全等级保护评估中心、信息网络安全公安部重点实验室、上海市信息安全高技能人才培养基地、上海辰星电子数据司法鉴定中心等一批国家级、省部级专业技术实验室。先后承担了国家科技支撑计划、“863”、高新技术产业化项目和国家发改委、科技部、公安部、上海市等国家级、省部级重要课题的研究任务，在eID（网络身份认证）、RFID（射频识别）、VSD（视频结构 化描述）、PDD（警用数字化单兵）等领域取得显著成绩，多次获得国家级、省部级科学技术奖励。自 1995 年至今，连续被上海市科委认定为高新技术单位。2005 年通过了 ISO9001 质量管理体系认证。</p>
            <p>本所将以建设公安科技领域具有全国领先水平的科研机构为战略目标，以“敢为人先，引领发展，科技强警，励志报国”的核心价值观为引领，按照“科研和实战一体化、科研和产业一体化、科研和检测一体化、科研和教育培训一体化”的指导思想，坚持与时俱进、开拓创新，热情服务，不断破解公安实战中的关键技术难题，为科技强警做出新的贡献。</p>
            <p>防伪事业部是公安部第三研究所下属的主要从事RFID（无线射频）技术和防伪技术研发、产品开发与生产、工程实施部门，拥有一批射频与微波技术以及材料、机械、光学、电子、计算机等学科的专业技术和生产管理、市场开发人员，具有较强的研发、生产、市场营销综合实力。</p>
          </div>
        </div>
        <div class="overlay-more"></div>
        <div class="toggle-btns hidden" @click="toggleCollapsed(1)">
          <span class="toggle-btn more-btn on-left">+ 展开更多</span>
          <span class="toggle-btn less-btn on-left">- 收起</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cooperation-page',
    data () {
      return {
        collapsed_0: true,
        collapsed_1: false
      }
    },
    methods: {
      toggleCollapsed: function (idx) {
        if (idx === 0) {
          this.collapsed_0 = !this.collapsed_0
        }
        if (idx === 1) {
          this.collapsed_1 = !this.collapsed_1
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 60px 4%;
  }
  .row-con {
    position: relative;
    line-height: 1.5em;
  }
  .row-wrapper {
    position: relative;
  }
  .collapsed .row-wrapper {
    padding-bottom: 32%;
  }
  .bg-row {
    height: 100%;
    position: relative;
  }
  .bg-row:after {
    content: "";
    clear: both;
    display: table;
  }
  .collapsed .row-wrapper .bg-row {
    position: absolute;
    overflow: hidden;
  }
  .bg-row h2 {
    margin-top: 0;
  }

  .img-con {
    padding: 0px 4% 2% 0;
    width: 48%;
    float: left;
  }
  .img-con.img-con-right {
    padding: 48px 0 2% 4%;
    float: right;
  }
  .img-con img {
    width: 100%;
  }
  .img-con.img-con-right img {
    right: 0;
  }

  .overlay-more {
    display: none;
    width: 50%;
    position: absolute;
    left: 0;
    height: 120px;
    margin-top: -120px;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgb(248, 248, 248) 100%);
  }
  .overlay-more.to-right {
    left: inherit;
    right: 0;
  }
  .collapsed .overlay-more {
    display: block;
  }

  .toggle-btns {
    margin: 12px auto 48px;
  }
  .toggle-btns.to-right {
    text-align: right;
  }
  .toggle-btn {
    left: 52%;
    color: gray;
    font-size: 14px;
    cursor: pointer;
  }
  .more-btn {
    display: none;
  }
  .collapsed .more-btn {
    display: inherit;
  }
  .less-btn {
    display: inherit;
  }
  .collapsed .less-btn {
    display: none;
  }
  .less-btn.on-left,
  .more-btn.on-left {
    left: 2%;
  }

  #tri_img {
    padding-bottom: 29%;
    position: relative;
  }
  #tri_img .img-wrapper {
    position: absolute;
    width: 100%;
    padding-bottom: 51.6%;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
  #cert_img {
    background-image: url("/static/img/coop/cert.jpg");
  }
  #build3s_img {
    background-image: url("/static/img/coop/build_3s.jpg");
  }
  .fade-top {
    transition: all 1s ease;
  }
  .fade-top:hover {
    opacity: 0;
  }
</style>
