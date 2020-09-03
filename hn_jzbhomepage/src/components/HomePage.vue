<template>
  <div class="main-list">

    <div class="full-bg hg-1-2 hover-zoom scroll-anchor" id="home_bg1">
      <div class="titles-con">
        <div class="titles-con-inner">
          <div id="main_logo"></div>
          <!--
          <h1 class="main-title">{{ $t('jzb') }}</h1>
          -->
          <div class="sub-title hover-in" id="sub_logo"></div>
          <router-link class="pure-button" to="/downloads/">了解更多</router-link>
        </div>
      </div>
    </div>

    <div class="full-bg hg-1-2 hover-zoom scroll-anchor" id="home_bg8">
      <div class="titles-con bg-middle">
        <h1 class="bg-title">鉴正宝信息技术有限公司</h1>
          <router-link class="pure-button" to="/company/">了解更多</router-link>
      </div>
    </div>

    <div class="full-bg hg-1-2 hover-zoom scroll-anchor" id="home_bg7">
      <div class="titles-con-left">
        <h1 class="bg-title">AFE国际品牌计划</h1>
        <div class="sub-title hover-in">助力实体经济转型升级</div>
          <router-link class="pure-button" to="/brand/">了解更多</router-link>
      </div>
    </div>

    <div class="full-bg hg-1-2 hover-zoom scroll-anchor" id="home_bg5">
      <div class="titles-con-right">
        <h1 class="bg-title">战略伙伴<br>公安部第三研究所防伪事业部</h1>
        <div class="sub-title hover-in">防伪事业部是公安部第三研究所下属的主要从事RFID（无线射频）技术和防伪技术研发<br>产品开发与生产、工程实施部门</div>
        <router-link class="pure-button" to="/cooperation/">了解更多</router-link>
      </div>
    </div>

    <div class="full-bg hg-1-2 scroll-anchor" id="home_bg4">
      <div class="titles-con-left">
        <h1 class="bg-title">仅对诚信企业服务 只对优质品牌负责</h1>
        <div class="sub-title hover-in">后电商时代下的物联网电子商务，为企业提供数字化技术，提升消费者的购物体验</div>
        <router-link class="pure-button" to="/downloads/">了解更多</router-link>
      </div>
    </div>

    <div class="full-bg hg-1-2 scroll-anchor" id="home_bg2">
      <div class="titles-con">
        <div class="titles-con-right">
          <h1 class="bg-title">第三方智能商标标识防伪认证<br>云服务平台</h1>
          <div class="sub-title hover-in">三大功能：品牌保护，品质追溯，物联网电子商务</div>
          <router-link class="pure-button" to="/about/">了解更多</router-link>
        </div>
      </div>
    </div>

    <div class="full-bg hg-1-2 hover-zoom scroll-anchor" id="home_bg3">
      <div class="titles-con-left">
        <h1 class="bg-title">把握趋势掌控未来</h1>
        <div class="sub-title hover-in">鉴真宝拥有100多项专利技术，自主研发先进的智能设备和电子标签，用技术引领未来发展</div>
          <router-link class="pure-button" to="/etag/">了解更多</router-link>
      </div>
    </div>

    <div class="full-bg hg-1-2 hover-zoom scroll-anchor" id="home_bg6" @click="gotoBusiness">
      <div class="titles-con-left full-title">
        <div class="single-title">引领</div>
        <div class="single-title">后电商时代</div>
        <div class="single-title">物联网电子商务</div>
      </div>
    </div>


    <div id="news-container" class="container scroll-anchor">
      <div class="pure-g">
        <div class="pure-u-1-3">
          <div class="list-con">
            <div class="title-bar">
              <h2>企业动态</h2>
              <router-link to="/news/movement"> <span>更多</span> </router-link>
            </div>
            <ul>
              <li v-for="movement in movements">
                <router-link :to="'/news/movement/' + movement['_id'] ">
                  <p>{{ movement['title'] }}</p>
                </router-link>
                <span>{{ date("Y年m月d日", movement['custom_date'] || movement['_created']) }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="pure-u-1-3">
          <div class="list-con">
            <div class="title-bar">
              <h2>政府报道</h2>
              <router-link to="/news/report"> <span>更多</span> </router-link>
            </div>
            <ul>
              <li v-for="report in reports">
                <router-link :to="'/news/report/' + report['_id'] ">
                  <p>{{ report['title'] }}</p>
                </router-link>
                <span>{{ date("Y年m月d日", report['custom_date'] || report['_created']) }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="pure-u-1-3">
          <div class="list-con">
            <div class="title-bar">
              <h2>行业趋势</h2>
              <router-link to="/news/event"> <span>更多</span> </router-link>
            </div>
            <ul>
              <li v-for="event in events">
                <router-link :to="'/news/event/' + event['_id'] ">
                  <p>{{ event['title'] }}</p>
                </router-link>
                <span>{{ date("Y年m月d日", event['custom_date'] || event['_created']) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div id="map-container" class="container scroll-anchor">
      <h1>诚邀下列品牌入驻</h1>
      <div id="brand_map">
        <div v-for="point in map_points"
             class="icon-label"
             :style="'top: ' + point.x + '%; left: ' + point.y + '%;'">
          <a class="point-img" :href="point['url']" target="_blank" v-if="point['url']">
            <img src="/static/img/home/point.png" alt="">
            <span class="point-name">{{ point.brand }}</span>
          </a>
          <span class="point-img" v-if="!point['url']">
            <img src="/static/img/home/point.png" alt="">
            <span class="point-name">{{ point.brand }}</span>
          </span>
          <div class="tooltip" v-if="point['logo']">
            <p><img :src="uploads(point['logo']['path'])" :alt="point['brand']"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AppService from '@/app.service'
  import AppConfig from '@/app.config'
  export default {
    name: 'home-page',
    data () {
      var points = [
        { brand: 'DONNA KARAN', url: '', logo: '', x: '14', y: '9' },
        { brand: 'COACH', url: '', logo: '', x: '24', y: '19' },
        { brand: 'MARC JACOBS', url: '', logo: '', x: '30', y: '5' },
        { brand: 'JACKPOT', url: '', logo: '', x: '79', y: '22' },
        { brand: 'FENDI', url: '', logo: '', x: '16', y: '41' },
        { brand: 'VERSACE', url: '', logo: '', x: '21', y: '43' },
        { brand: 'BALLY', url: '', logo: '', x: '7', y: '50' },
        { brand: 'LOUIS VUITTON', url: '', logo: '', x: '13', y: '52' },
        { brand: 'BURBERRY', url: '', logo: '', x: '26', y: '51' },
        { brand: 'KENZO', url: '', logo: '', x: '23', y: '84' },
        { brand: 'L\'OCCITANE', url: 'http://www.com', logo: '', x: '71', y: '83' },
        { brand: '', url: '', logo: '', x: '32', y: '78' },
        { brand: '', url: '', logo: '', x: '37', y: '51' },
        { brand: '', url: '', logo: '', x: '75', y: '48' },
        { brand: '', url: '', logo: '', x: '38', y: '65' },
        { brand: '', url: '', logo: '', x: '53', y: '23' }
        // { brand: '', url: '', logo: '', x: '', y: '', geo: { lat: 0, lon: 0 } },
      ]
      return {
        movements: [],
        reports: [],
        events: [],
        map_points: points
      }
    },
    methods: {
      gotoBusiness: function () {
        this.$router.push('/business/')
      },
      uploads: function (path) {
        return AppConfig.uploads(path)
      },
      date: function (fmt, seconds) {
        return AppService.date(fmt, seconds)
      }
    },
    mounted () {
      // News
      AppService.news('event', { limit: 4 })
        .then(function (data) {
          this.events = data.entries
        }.bind(this))
      AppService.news('report', { limit: 4 })
        .then(function (data) {
          this.reports = data.entries
        }.bind(this))
      AppService.news('movement', { limit: 4 })
        .then(function (data) {
          this.movements = data.entries
        }.bind(this))

      // Brand Map
      AppService.collection('brands', { filter: { published: true } })
        .then(function (data) {
          if (data.entries && data.entries.length > 0) {
            this.map_points = data.entries
          }
        }.bind(this))
    }
  }
  //  (function() {
  //
  //    var delay = false;
  //
  //    var scrollAnchors = document.getElementsByClassName('scroll-anchor');
  //    $(document).on('mousewheel DOMMouseScroll', function(event) {
  //      event.preventDefault();
  //      if (delay) return;
  //
  //      delay = true;
  //      setTimeout(function() {
  //        delay = false
  //      }, 200)
  //
  //      var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;
  //
  //      if (wd < 0) {
  //        for (var i = 0; i < scrollAnchors.length; i++) {
  //          var t = scrollAnchors[i].getClientRects()[0].top;
  //          if (t >= 20) break;
  //        }
  //      } else {
  //        for (var i = scrollAnchors.length - 1; i >= 0; i--) {
  //          var t = scrollAnchors[i].getClientRects()[0].top;
  //          if (t < -10) break;
  //        }
  //      }
  //      if (i >= 0 && i < scrollAnchors.length) {
  //        $('html,body').animate({
  //          scrollTop: scrollAnchors[i].offsetTop
  //        });
  //      }
  //    });
  //  })();
</script>

<style scoped>

  .container {
    width: 80%;
    margin: 0 auto;
    padding-top: 20px;
  }

  /* News */
  #news-container.container {
    width: 100%;
    padding: 60px 0;
    background-color: #F5F5F5;
  }
  #news-container.container .pure-g {
    width: 90%;
    margin: 0 auto;
  }
  #news-container .pure-u-1-3 .list-con {
    margin-right: 40px;
  }

  #news-container .title-bar {
    border-left: 4px solid gray;
    position: relative;
    height: 40px;
  }
  #news-container .title-bar h2 {
    padding-left: 10px;
    position: absolute;
    top: -16px;
  }
  #news-container .title-bar span {
    position: absolute;
    right: 0;
    top: 4px;
    color: gray;
    font-size: 14px;
  }
  #news-container .list-con ul {
    list-style-type: none;
    padding: 0;
    padding-left: 14px;
  }
  #news-container .list-con li span {
    font-size: 12px;
    color: gray;
  }
  #news-container .list-con li p {
    margin-bottom: 0;
    font-size: 15px;
  }
  #news-container .list-con li a {
    text-decoration: none;
    color: black;
  }

  /* Map */
  #map-container {
    text-align: center;
  }

  #map-container h1 {
    color: #4c4c4c;
    font-size: 2.4em;
    font-weight: normal;
  }

  #map-container .icon-label {
    position: absolute;
  }

  #map-container .icon-label .tooltip {
    display: none;
    position: absolute;
    top: 32px;
    background: white;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 0px #78a8aa;
    z-index: 10;
  }

  #map-container .icon-label:hover .tooltip {
    display: block;
  }

  #map-container .icon-label .tooltip img {
    max-width: 160px;
  }

  #map-container .icon-label .tooltip p {
    margin: 8px 16px;
  }

  #map-container .icon-label a {
    color: black;
  }
  #map-container .icon-label .point-img img {
    position: relative;
    animation-duration: 1s;
    animation-name: scalepoint;
    animation-iteration-count: infinite;
  }

  @keyframes scalepoint {
    from {
      width: 23px;
      left: 0px;
      top: 0px;
    }
    50% {
      width: 29px;
      left: -3px;
      top: -3px;
    }
    to {
      width: 23px;
      left: 0px;
      top: 0px;
    }
  }

  #map-container .icon-label .point-name {
    top: 2px;
    left: 29px;
    position: absolute;
    font-size: 15px;
    min-width: 200px;
    text-align: left;
  }

  #brand_map {
    margin: 40px auto;
    position: relative;
    background-image: url('/static/img/home/map.png');
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 100%;
    padding-bottom: 50%;
  }


  /* Main list */

  .main-list {
    min-width: 1024px;
  }

  .titles-con {
    position: absolute;
    bottom: 12%;
    width: 100%;
  }

  .titles-con-inner {
    position: relative;
  }

  .titles-con-left {
    position: absolute;
    bottom: 80px;
    left: 80px;
    text-align: left;
  }

  .titles-con-left.full-title {
    top: 120px;
  }

  .titles-con-right {
    position: absolute;
    bottom: 140px;
    right: 80px;
    text-align: right;
  }

  .main-title {
    margin-top: 0;
    font-size: 5em;
    margin-bottom: 12px;
    letter-spacing: 4px;
  }

  .bg-title {
    margin-bottom: 16px;
    font-size: 60px;
    letter-spacing: 3px;
  }

  .sub-title {
    font-size: 18px;
    letter-spacing: 2px;
  }

  .single-title {
    margin-bottom: 0px;
    font-size: 60px;
    font-weight: bold;
    letter-spacing: 3px;
  }

  .full-bg {
    color: white;
    text-align: center;
  }

  .full-bg::before {
    background-color: rgba(0, 0, 0, 0.2);
  }

  #home_bg2.full-bg::before {
    background-color: rgba(0, 0, 0, 0.4);
  }

  #home_bg5.full-bg::before {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .full-bg .pure-button {
    background-color: #0071ff;
    border-radius: 0;
    color: white;
    font-size: 18px;
    padding: 6px 32px;
  }

  #home_bg1 {
    background-image: url('/static/img/home/bg1.jpg');
  }

  #home_bg2 {
    background-image: url('/static/img/home/bg2.jpg');
  }

  #home_bg3 {
    background-image: url('/static/img/home/bg3.jpg');
  }

  #home_bg4 {
    background-image: url('/static/img/home/bg4.jpg');
  }

  #home_bg5 {
    background-image: url('/static/img/home/bg5.jpg');
  }

  #home_bg6 {
    background-image: url('/static/img/home/bg6.jpg');
    cursor: pointer;
  }

  #home_bg7 {
    background-image: url('/static/img/brand/brand_bg.jpg');
  }

  #home_bg8 {
    background-image: url('/static/img/company/top_bg.jpg');
    background-position-y: 30%;
  }

  #home_bg7::before,
  #home_bg8::before {
    background-color: rgba(0,0,0,0);
  }

  #home_bg8 .titles-con {
    top: 40%;
  }
  #home_bg8 .bg-title {
    font-size: 64px;
    margin-bottom: 32px;
  }

  #main_logo {
    padding-bottom: 27%;
    background-image: url(/static/img/home/logo2w.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  #sub_logo {
    padding-bottom: 7%;
    background-image: url(/static/img/home/prc3rd.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin-top: -10px;
  }
</style>
