<template>
  <div class="main-list">
    <div class="full-bg hg-1-2" id="dl_bg">
      <div class="titles-con bg-left bg-top bg-item">
        <h1 class="bg-title">第三方智能商标标识防伪认证云服务平台</h1>
        <div class="sub-title">鉴真宝 更有价值的APP</div>
      </div>
      <div class="bar-codes bg-item bg-right bg-bottom">
        <div class="bar-code">
          <img src="/static/img/downloads/code.jpg" alt="">
          <span>APP下载</span>
        </div>
        <div class="bar-code">
          <img src="/static/img/downloads/wechat.png" alt="">
          <span>微信扫一扫<br>关注小程序</span>
        </div>
      </div>
    </div>

    <div class="container" id="md_con">
      <div class="bg-grid">
        <div class="bg-grid-1-3">
          <div class="full-bg hover-zoom" id="md_bg1">
            <div class="titles-con bg-left bg-bottom bg-sm bg-item">
              <h2 class="bg-title">品质追溯</h2>
              <div class="sub-title">鉴真宝的可信数据来源于智慧工厂，数据的采集来自产品生产源头。</div>
            </div>
          </div>
        </div>
        <div class="bg-grid-1-3">
          <div class="full-bg hover-zoom" id="md_bg2">
            <div class="titles-con bg-left bg-bottom bg-sm bg-item">
              <h2 class="bg-title">品牌保护</h2>
              <div class="sub-title">每个智能商标标识都经过加密处理，难以复制仿冒。</div>
            </div>
          </div>
        </div>
        <div class="bg-grid-1-3">
          <div class="full-bg hover-zoom" id="md_bg3">
            <div class="titles-con bg-left bg-bottom bg-sm bg-item">
              <h2 class="bg-title">物联网电子商务</h2>
              <div class="sub-title">线下体验线上消费互联网环境下的物联网电子商务模式，加强消费者对品牌的粘度。</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Removed @170920 -->
    <div v-if="false" class="container" id="ld_con">
      <div class="pure-g bg-xs">
        <div class="pure-u-1-3 bg-title tab" :class="{active: active_tab === 1}"
             @click="changeTab(1)">技术优势</div>
        <div class="pure-u-1-3 bg-title tab" :class="{active: active_tab === 2}"
             @click="changeTab(2)">可信数据来源</div>
        <div class="pure-u-1-3 bg-title tab" :class="{active: active_tab === 3}"
             @click="changeTab(3)">真伪识别模式</div>
      </div>
      <div class="bg-slide hg-43">
        <div id="ld_img1" class="ld-img full-bg" :class="{'hide-left': active_tab > 1}">
          <div class="bg-con bg-con-middle bg-left bg-item">
            <div class="bg-content">
              <p>“鉴真宝”采用eID的原理技术（Electronic Identity，即网络电子身份证技术）和国密技术，通过工业物联网智慧生产云端装备系统，对企业产品的原材料供应链、生产数据链、仓储物流数据链、消费数据链、资金流数据链的全面贯通，实现全息管理，为“鉴真宝”云服务平台提供可信的数据保障。</p>
              <p><span class="li-id">1</span>由中华人民共和国公安部第三研究所防伪事业部保障数据安全；</p>
              <p><span class="li-id">2</span>拥有自主防伪加密软件著作权，难以破解，且每个商标具有唯一ID号，不可复制；</p>
              <p><span class="li-id">3</span>利用智能手机NFC识别功能，非接触式射频技术，操作简单，一键识别不同品牌、不同种类商品信息。</p>
            </div>
          </div>
        </div>
        <div id="ld_img2" class="ld-img full-bg"
                          :class="{'hide-left': active_tab > 2, 'hide-right': active_tab < 2}">
          <div class="bg-con bg-con-middle bg-left bg-item">
            <div class="bg-content">
              <p>鉴真宝的可信数据来源：鉴真宝的可信数据来源于智慧工厂，以设计、生产、工艺、品管、仓储、物流、消费、溯源、防伪等信息，实现整个数据链的产业完整性，实现了人与物的信息的全面贯通，使企业经营模式转变，提高了企业运营效率，同时运用高安全加密算法对信息进行加密防伪保护，为“鉴真宝”云服务平台提供可靠的数据资源。</p>
              <p><span class="li-id">1</span>鉴真宝平台通过NFC工业现场信源采集数据中央处理中心，实现了商品信息与企业ERP信息的实时互联互通。</p>
              <p><span class="li-id">2</span>应用UHF RFID无源自动出入库管控系统实现了对出入库物品的精准化智能管控，实现对库存数据的实时更新。</p>

              <p>鉴真宝APP利用智能工业生产中人与物全息的信源载体RFID智能商标和智能手机NFC的识别功能，应用标准通信协议，实现对不同品牌、不同种类的商品进行真品防伪识别。</p>
              <p>智能商标标识作为信源载体，每个智能商标标识都拥有一个全球唯一的ID号，通过智能手机NFC功能和“鉴真宝”APP解密秘钥软件，阅读智能商标标识的商品属性信息并验证商品真伪。</p>
            </div>
          </div>
        </div>
        <div id="ld_img3" class="ld-img full-bg"
                          :class="{'hide-right': active_tab < 3}">
        </div>
      </div>
    </div>

    <div class="sub-section" id="flow_con">
      <div class="section-title">
        <h1>鉴真宝使用流程图</h1>
      </div>
      <div class="container" id="slide_con">
        <div class="bg-grid">
          <div class="bg-grid-1-7">
            <div class="img-con">
              <img src="/static/img/downloads/flow0.jpg" alt="Step1">
            </div>
          </div>
          <div class="bg-grid-1-7">
            <div class="img-con">
              <img src="/static/img/downloads/flow2.jpg" alt="Step2">
            </div>
          </div>
          <div class="bg-grid-1-7">
            <div class="img-con">
              <img src="/static/img/downloads/flow3.jpg" alt="Step3">
            </div>
          </div>
          <div class="bg-grid-1-7">
            <div class="img-con">
              <img src="/static/img/downloads/flow4.jpg" alt="Step4">
            </div>
          </div>
          <div class="bg-grid-1-7">
            <div class="img-con">
              <img src="/static/img/downloads/flow5.jpg" alt="Step5">
            </div>
          </div>
          <div class="bg-grid-1-7">
            <div class="img-con">
              <img src="/static/img/downloads/flow8.jpg" alt="Step6">
            </div>
          </div>
          <div class="bg-grid-1-7">
            <div class="img-con">
              <img src="/static/img/downloads/flow7.jpg" alt="Step7">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'downloads-page',
    data () {
      return {
        active_tab: 1
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
  @media (max-width: 1440px) {
    #dl_bg .bg-title {
      font-size: 48px;
    }
  }

  #ld_con .tab {
    text-align: center;
  }
  #ld_con .bg-title.tab {
    color: black;
    margin: 0;
    padding: 10px 0;
    cursor: pointer;
  }
  #ld_con .bg-title.tab.active {
    background-color: #013D73;
    color: white;
  }
  #ld_img1 {
    background-image: url("/static/img/downloads/ld1.jpg");
  }
  #ld_img2 {
    background-image: url("/static/img/downloads/ld2.jpg");
  }
  #ld_img3 {
    background-image: url("/static/img/downloads/ld3.jpg");
  }

  #dl_bg {
    background-image: url("/static/img/downloads/bg.jpg");
    padding-bottom: 45%;
  }

  #md_con {
    margin: 0 8px;
  }
  #md_con .bg-grid-1-3 .full-bg {
    padding-bottom: 126%;
    margin: 16px 8px;
  }

  #md_con .titles-con {
    bottom: 30px;
    left: 20px;
    height: 128px;
    width: 90%;
  }
  #md_con .bg-title {
    margin: 0 auto 10px;
  }

  #md_bg1 {
    background-image: url("/static/img/downloads/md1.jpg");
  }

  #md_bg2 {
    background-image: url("/static/img/downloads/md2.jpg");
  }

  #md_bg3 {
    background-image: url("/static/img/downloads/md3.jpg");
  }

  .bar-codes.bg-bottom {
    bottom: 60px;
  }

  .bar-code {
    display: inline-block;
    position: relative;
    float: left;
    margin-left: 40px;
    color: white;
    text-align: center;
    width: 200px;
  }
  @media (max-width: 1280px) {
    .bar-code {
      width: 160px;
    }
  }
  @media (max-width: 1120px) {
    .bar-code {
      width: 120px;
    }
  }

  .bar-code img, .bar-code span {
    display: block;
    width: 100%;
    padding-top: 0.5em;
  }

  .bg-con-middle {
    width: 60%;
    top: 50%;
    transform: translateY(-50%);
  }
  .bg-content {
    color: white;
  }

  .bg-content .li-id {
    font-size: 32px;
    padding-right: 16px;
  }

  /* Slide */
  #slide_con {
    margin: -20px auto 0;
    padding: 0 8px 4%;
  }
  #slide_con img {
    width: 100%;
  }
  #slide_con .bg-grid .img-con {
    padding: 3px;
    position: relative;
    transition: all 0.4s ease-in;
    width: 125%;
    transform: scale(0.8);
    margin-left: -16%;
  }
  #slide_con .bg-grid-1-7:hover .img-con {
    transform: scale(1);
  }
  #slide_con .bg-grid-1-7:nth-last-of-type(1):hover .img-con {
    margin-left: -30%;
  }
  #slide_con .bg-grid-1-7:nth-of-type(1):hover .img-con {
    margin-left: 0;
  }
  #slide_con .bg-grid {
    overflow-x: hidden;
    white-space: nowrap;
    text-align: center;
  }
  #slide_con .bg-grid-1-7 {
    width: 13.8%;
    position: relative;
    transition: all 0.4s ease-in;
    float: inherit;
  }
  #slide_con .bg-grid-1-7:nth-of-type(1):hover + .bg-grid-1-7 {
    /*margin-left: 10%;*/
  }
  #slide_con .bg-grid-1-7:hover {
    z-index: 10;
  }
  #flow_con .section-title h1 {
    font-size: 56px;
  }
  .bg-grid-1-7:hover .img-con:before {
    display: none;
  }
  .img-con:before {
    content: '';
    position: absolute;
    top: 3px;
    right: 3px;
    bottom: 7px;
    left: 3px;
    background-color: black;
    opacity: .5;
  }

</style>
