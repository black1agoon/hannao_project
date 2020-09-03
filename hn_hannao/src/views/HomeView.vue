<template>
  <div class="main-wrapper">
    <svg width="2560" height="1080" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="Gradient1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="rgba(255,222,0,0)"/>
          <stop offset="0%" stop-color="rgba(255,222,0,0)" stop-opacity="0"/>
          <stop offset="100%" stop-color="rgba(255,222,0,1)"/>
        </linearGradient>
        <linearGradient id="Gradient2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(255,222,0,0)"/>
          <stop offset="0%" stop-color="rgba(255,222,0,1)" stop-opacity="0"/>
          <stop offset="100%" stop-color="rgba(255,222,0,1)"/>
        </linearGradient>
      </defs>
      <!--<path d="M20,230 Q40,205 50,230 T90,230" fill="none"  stroke="url(#Gradient2)" stroke-width="5"/>-->
      <polyline v-for="(line, index) in LINES"
                :key="index"
                class="polyline"
                :stroke="`url(#Gradient${line.type})`"
                :points="line.path"
                stroke-linecap="round"
                fill="transparent"
                stroke-width="4"/>
    </svg>
    <div class="data-wrap">
      <ul class="analysis">
        <li>
          <img src="../assets/img/analysis1.png"/>
          <div class="data">
            <label>累计解析量(次)</label>
            <p class="detail">
              <span class="num">{{resolveTotalAndCount.resolveOverviewCount | setThree}}</span>
              <!--<span class="unit">次</span>-->
            </p>
          </div>
        </li>
        <li>
          <img src="../assets/img/analysis2.png"/>
          <div class="data">
            <label>今日解析量(次)</label>
            <p class="detail">
              <span class="num">{{resolveTotalAndCount.resolveTodayCount  | setThree}}</span>
              <!--<span class="unit">次</span>-->
            </p>
          </div>
        </li>
        <li>
          <img src="../assets/img/analysis3.png"/>
          <div class="data">
            <label>标识总量(个)</label>
            <p class="detail">
              <span class="num">{{resolveTotalAndCount.identifierTotalCount | setThree}}</span>
              <!--<span class="unit">次</span>-->
            </p>
          </div>
        </li>
      </ul>
      <div class="resolving">
        <div class="title">
          <p class="cn">产品解析请求地理分布</p>
          <p class="en">Product Resolution Request Geographical Distribution</p>
        </div>
        <ul class="requests">
          <li v-for="(province, index) in identifierDistrict" :key="index">
            <img v-if="PROVINCE[province.province]" :src="require(`../assets/img/province/${PROVINCE[province.province]}.png`)"/>
            <img v-else src="../assets/img/province/default.png">
            <p class="name">{{province.province}}</p>
            <p class="times">
              <span class="num">{{province.total}}</span>
              <span class="unit">次</span>
            </p>
          </li>
        </ul>
      </div>
      <div class="industry">
        <div class="title">
          <p class="cn">行业工业标识解析数</p>
          <p class="en">Industry Industry Logo Analysis Numbern</p>
        </div>
        <div class="chart">
          <charts-view :options="INDUSTRY">
          </charts-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {setNumberByThree} from '../assets/common/util'
  import {INDUSTRY} from './board.config'
  import ChartsView from '../components/common/ChartsView'
  import api from '@/api'
  const LINES = [
    {
      path: '166 1062 350 880 350 850 394 807',
      type: 1
    }, {
      path: '520 847 371 996',
      type: 2
    }, {
      path: '372 1049 494 928 494 918 517 896 528 896 573 848',
      type: 1
    }, {
      path: '434 1080 482 1029 482 1009 557 926',
      type: 1
    }, {
      path: '305 444 387 478',
      type: 2
    }, {
      path: '282 283 356 318 374 306 470 345',
      type: 2
    }, {
      path: '428 253 542 300',
      type: 2
    }, {
      path: '621 242 566 220 551 227 494 201',
      type: 1
    }, {
      path: '808 261 823 248 834 247 880 208',
      type: 1
    }, {
      path: '963 224 885 290',
      type: 2
    }, {
      path: '1046 196 1004 239 1003 254 950 310',
      type: 2
    }, {
      path: '1196 250 1120 330 1118 358 1053 425',
      type: 2
    }, {
      path: '1144 876 1066 835 1048 835 961 799',
      type: 1
    }, {
      path: '989 753 1190 850',
      type: 2
    }
  ]
  const PROVINCE = {
    '浙江省': 'zhejiang',
    '广东省': 'guangdong',
    '江苏省': 'jiangsu',
    '山东省': 'shandong',
    '河南省': 'henan',
    '上海': 'shanghai',
    '安徽省': 'anhui',
    '福建省': 'fujian'
  }
  export default {
    name: 'home-view',
    filters: {
      setThree(num) {
        return setNumberByThree(num)
      }
    },
    components: {
      ChartsView
    },
    data() {
      return {
        INDUSTRY,
        PROVINCE,
        LINES,
        timer: null,
        identifierDistrict: [],
        resolveTotalAndCount: {}
      }
    },
    methods: {
      animationDelay() {
        return {
          animationDelay: 5 * Math.random() + 's'
        }
      },
      getApiData() {
        api.idsResolveController.getIdentifierDistrict().then(data => {
          if (data && data.length > 0) {
            this.identifierDistrict = data
          }
        })
        api.idsResolveController.industrialResolveMonth().then(data => {
          if (data && data.length > 0) {
            this.INDUSTRY.xAxis[0].data = data.map(month => month.month)
            this.INDUSTRY.series[0].data = data.map(month => month.total)
          } else {
            this.INDUSTRY.xAxis[0].data = []
            this.INDUSTRY.series[0].data = []
          }
        })
        api.idsResolveController.resolveTotalAndCount().then(data => {
          this.resolveTotalAndCount = data ? data : {}
        })
      }
    },
    mounted() {
      this.getApiData()
      this.timer = setInterval(() => {
        this.getApiData()
      }, 5 * 60 * 1000)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../assets/stylus/animation.styl'
  .main-wrapper
    position: relative
    width: 2560px
    height: 1080px
    background-image: url("../assets/img/background.png")
    background-size: 2560px 1080px
    background-repeat: no-repeat
    transform: scale(.75, 1)
    transform-origin: top left
    .polyline
      stroke-dasharray: 1000
      stroke-dashoffset: 1000
      animation: dash 2s linear none infinite
    .data-wrap
      position: absolute
      width: 1110px
      top: 110px
      right: 84px
      .analysis
        display: flex
        justify-content: space-between
        .data
          display: inline-block
          margin-left: 18px
          label
            font-size: 23px
            color: #ffffff
            font-family: 'Alibaba-PuHuiTi'
          .detail
            margin-top: 28px
            .num
              color: #FFDE00
              font-size: 68px
              line-height: 50px
              font-weight: bold
              vertical-align: bottom
            .unit
              margin-left: 10px
              vertical-align: bottom
              font-size: 32px
              color: rgba(255, 222, 0, .5)
      .resolving, .industry
        .title
          .cn
            font-family: 'Alibaba-PuHuiTi'
            font-size: 32px
            color: #ffffff
          .en
            margin-top: 8px
            font-size: 18px
            color: rgba(255, 255, 255, .65)
      .resolving
        margin-top: 66px
        .requests
          margin-top: 25px
          display: flex
          justify-content: space-around
          li
            position: relative
            .name
              position: absolute
              width: 100%
              top: 174px
              text-align: center
              font-family: 'Alibaba-PuHuiTi'
              font-size: 24px
              color: #ffffff
            .times
              position: absolute
              top: 216px
              width: 100%
              text-align: center
              .num
                font-weight: bold
                color: #00FFFF
                font-size: 48px
                vertical-align: bottom
              .unit
                margin-left: 10px
                display: inline-block
                vertical-align: bottom
                font-size: 24px
                height: 30px
                color: rgba(25, 146, 146, .65)
      .industry
        margin-top: 160px
        .chart
          width: 100%
          height: 300px
</style>