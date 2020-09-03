<i18n>
zh_CN:
  about_1: "鉴真宝视频介绍"
  about_2: "鉴真宝是什么"
zh_TW:
  about_1: "鑑真寶視頻介紹"
  about_2: "鑑真寶是什麼"
en_US:
</i18n>
<template>
  <div class="main-list">
    <div class="full-bg hg-1-2 bg-lg" id="comp_bg1">
      <div v-if="!state" class="titles-con bg-bottom bg-item">
        <h1 class="bg-title">{{ $t('about_1') }}</h1>
      </div>
      <div class="play-icon bg-item" :class="{'docked': state > 5}" @click.stop="togglePlay(0)">
        <i @click.stop="stopPlay" class="video-close icomoon-times-circle"></i>
        <video id="video_el" v-show="state" :controls="showVideoControls"
               @click.stop="togglePlay" preload="none" @mouseenter="onEnter" @mouseleave="onLeave"
               src="/static/video/b.txt">
        </video>
        <div v-show="!state" id="video_alt"></div>
      </div>
    </div>
    <div class="full-bg hg-1-2" id="comp_bg2">
      <div class="titles-con bg-item">
        <h1 class="bg-title">{{ $t('about_2') }}</h1>
        <div class="sub-title bg-desc">
          鉴真宝是第三方智能商标标识防伪认证云服务平台，由中华人民共和国公安部第三研究所防伪事业部和鉴正宝信息技术有限公司共同建设，主要功能有品牌保护，品质追溯和物联网电子商务，致力于营造公平、公正、诚信的互联网活动氛围，构建实体经济和电子商务命运共同体。
        </div>
        <router-link class="pure-button" to="/about/jzb">了解更多</router-link>
      </div>
    </div>
    <div class="full-bg hg-1-2" id="comp_bg3">
      <div class="titles-con bg-item">
        <div class="article-con">
          <div class="title-img">
            <img src="/static/img/about/logo2.png" alt="鉴真宝标识">
          </div>
          <div class="bg-article">
            <h1 class="bg-title dark">鉴真宝标识解读</h1>
            <div class="bg-content" id="logo_para">
              <p>中文“鉴真宝”意思是鉴定真伪的宝典，即鉴别信息真伪。</p>
              <p>英文设计代表国际化，在信息时代下全球需要鉴真宝提供信息真伪鉴别服务。</p>
              <p>盾牌代表安全，一层说明鉴真宝拥有自主防伪加密软件著作权，提供技术保护，另一层代表鉴真宝是由中华人民共和国公安部第三研究所防伪事业部共同建设的，提供信息保障。两层盾牌即技术和公安双重保护。</p>
              <p>橄榄枝代表和谐，寓意鉴真宝致力于维护市场稳定，网购与实体经济双方和谐发展。</p>
              <p>皇冠代表至高至上，鉴真宝采用专利技术以及国密标准，权威性不容侵犯。</p>
              <p class="logo-last-2">信号代表通讯，鉴真宝以信息技术为核心，提供正确的价值信息。</p>
              <p class="logo-last-2 logo-last-1">“√”代表认证，“√”也是类似于象形字“Z”，也是正确的“正”的首字母。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sub-section">
      <div class="section-title">
        <h1>鉴真宝有哪些特点</h1>
      </div>
      <div class="full-bg hg-1-3" id="jzb_bg1">
        <div class="bg-con-left bg-item">
          <h2 class="bg-title-md">1对N：强大的兼容性</h2>
          <div class="bg-content-sm">
            <p>市场上一个品牌需配备单独手机APP的局限性，鉴真宝独有的普适性可实现一对N品牌的鉴定识别，避免消费者重复下载同类识别软件。消费者通过具有NFC功能的手机等通讯设备，可对各类商品不同形态的智能商标进行信息识别，操作便捷适合市场推广，推进市场诚信体系建设，维护市场公平竞争机制。</p>
          </div>
        </div>
      </div>
      <div class="full-bg hg-1-3" id="jzb_bg2">
        <div class="bg-con-right bg-item">
          <h2 class="bg-title-md">真实可靠：数据来源于智慧工厂</h2>
          <div class="bg-content-sm">
            <p>鉴真宝依托NFC技术和智能商标，从生产源头对数据进行加载，信源数据安全可靠，真正意义上实现产品的质量追溯。在平台可信信源的建设上，“鉴真宝”云平台解决了NFC电子标签信息批量写入的技术问题，使得智能标签在工厂的批量应用成为可能。每个标签具有唯一的ID,经过加密处理上传至鉴真宝云端，保证了平台数据的安全性。</p>
          </div>
        </div>
      </div>
      <div class="full-bg hg-1-3" id="jzb_bg3">
        <div class="bg-con-left bg-item">
          <h2 class="bg-title-md">品质溯源、品牌保护</h2>
          <div class="bg-content-sm">
            <p>鉴真宝在进行防伪溯源的同事，也可以加大对企业品牌的宣传，通过NFC智能标签健在个性化的信息，更高效地进行品牌文化传播，为企业提供个性化定制的品牌保护解决方案和技术服务支持。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about-page',
    data () {
      return {
        state: 0, // octal: (isDocked isPlaying isPaused)
        showVideoControls: false,
        videoEl: null
      }
    },
    mounted () {
      this.videoEl = document.getElementById('video_el')
    },
    methods: {
      stopPlay: function () {
        this.state = 0
        this.videoEl.load()
      },
      togglePlay: function (event) {
        var video = event ? event.target : this.videoEl
        if ((this.state & 3) === 2) {
          this.state += 1
          video.pause()
        } else {
          this.state = (this.state || 3) - 1
          video.play()
        }
      },
      toggleDock: function (dock) {
        if (!dock && this.state > 5) {
          this.state -= 4
        } else if (dock && this.state < 4) {
          this.state += 4
        }
      },
      onLeave: function () {
        this.toggleControls(false)
      },
      onEnter: function () {
        if (this.state) {
          this.toggleControls(true)
        }
      },
      toggleControls: function (show) {
        this.showVideoControls = show
      },
      checkOffset: function () {
        if (!this.state) {
          return
        }
        if (window.pageYOffset > (window.innerWidth / 3)) {
          this.toggleDock(true)
        } else {
          this.toggleDock(false)
        }
      }
    },
    created () {
      window.addEventListener('scroll', this.checkOffset)
    },
    destroyed () {
      window.removeEventListener('scroll', this.checkOffset)
    }
  }
</script>

<style scoped>
  @media (max-width: 1100px) {
    #logo_para .logo-last-2 {
      display: none;
    }
  }
  @media (max-width: 1200px) {
    #logo_para .logo-last-1 {
      display: none;
    }
  }
  .titles-con-left {
    bottom: 80px;
    left: 80px;
  }

  .titles-con {
    width: 100%;
    text-align: center;
  }

  .bg-title {
    font-size: 68px;
    margin-bottom: 28px;
    letter-spacing: 3px;
  }

  .sub-title {
    font-size: 24px;
  }

  .bg-title,
  .sub-title {
    color: white;
  }

  .bg-title.dark {
    color: black;
  }

  .bg-desc {
    margin: 0 auto;
    width: 68%;
    text-shadow: 0 1px 1px #555;
  }

  /* bg1 */
  #comp_bg1 .play-icon {
    width: 60%;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    transition: all 0.5s ease;
    background: url(/static/img/about/play.png) no-repeat center;
    background-size: contain;
  }
  #comp_bg1 .play-icon.docked {
    position: fixed;
    bottom: -5px;
    right: 0px;
    width: 40%;
    top: auto;
    left: auto;
    z-index: 10;
    transform: inherit;
  }
  #video_alt {
    width: 100%;
    padding-bottom: 50%;
  }
  #comp_bg1 .play-icon video {
    z-index: 0;
    width: 100%;
  }
  .video-close {
    display: none;
    z-index: 255;
    position: absolute;
    right: 3px;
    top: 2px;
    cursor: pointer;
    font-size: 2em;
  }
  .play-icon:hover .video-close {
    display: inherit;
  }
  .bg-bottom {
    bottom: 40px;
  }

  /* bg3 */
  .article-con {
    width: 90%;
    margin: 7% auto 43%;
    position: relative;
  }

  .title-img {
    position: absolute;
    width: 30%;
    left: 0;
    top: 25%;
  }

  .title-img img {
    width: 100%;
  }

  .bg-article {
    position: absolute;
    width: 60%;
    right: 0;
    top: -10px;
    text-align: left;
  }

  .bg-article h1 {
    margin-top: 0;
    margin-bottom: 8px;
  }

  .bg-article p,
  .bg-content-sm p {
    color: #565656;
    text-shadow: 0 1px 0 white;
  }

  .bg-article p br {
    margin-bottom: 10px;
  }

  .bg-con-left,
  .bg-con-right {
    width: 42%;
    top: 50%;
    transform: translateY(-50%);
  }

  .bg-con-left {
    margin-left: 6%;
  }

  .bg-con-right {
    right: 0;
    margin-right: 5%;
  }

  .bg-content-sm {
    /* text-indent: 2em; */
  }

  /* Background */
  #comp_bg1 {
    background-image: url('/static/img/about/bg1.jpg');
  }

  #comp_bg2 {
    background-image: url('/static/img/about/bg2.jpg');
  }

  #comp_bg2 .titles-con {
    top: 13%;
  }

  #comp_bg3 {
    background-image: url('/static/img/about/bg3.jpg');
  }

  #jzb_bg1 {
    background-image: url('/static/img/about/bg4.jpg');
  }

  #jzb_bg2 {
    background-image: url('/static/img/about/bg5.jpg');
  }

  #jzb_bg3 {
    background-image: url('/static/img/about/bg6.jpg');
  }

  #comp_bg1::before {
    background-color: rgba(0, 0, 0, 0.2);
  }

  #comp_bg2::before {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .pure-button {
    background-color: #0071ff;
    border-radius: 0;
    color: white;
    font-size: 18px;
    padding: 6px 32px;
    margin-top: 100px
  }
</style>
