<template>
  <div class="clock">
    <div class="topBac">
      <div class="year">{{timeDisplayArea}}</div>
      <div class="minutes">
        <img src="../../assets/img/kaoqin/clock.png" alt="" style="position: absolute;left: 0;top:42px">
        <span style="position: absolute;top:43px;left: 57px">{{this.time}}</span>
        <span style="position: absolute;top:43px;left: 366px">{{week}}</span>
      </div>
    </div>
    <div class="swiper-container">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="item in banner" :key="item.src">
          <img :src="item.src" alt="" style="width: 100%;height: 100%;object-fit: cover">
        </swiper-slide>
      </swiper>
    </div>
    <div class="saying">
      <div style="text-align: center">用责任心做事</div>
      <div style="text-align: center;margin-top: 40px">用感恩心做人</div>
    </div>
    <div class="zjhn">浙江汉脑数码科技有限公司提供技术支持</div>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import axios from 'axios'
  import { tenantId } from '../../api/url.config'

  export default {
    name: 'newClock',
    components: {
      Swiper,
      SwiperSlide,
    },
    directives: {
      swiper: directive,
    },
    data () {
      return {
        timer: '',
        time: '',
        week: '',
        swiperOptions: {
          notNextTick: true,
          autoplay: {
            delay: 5000,//1秒切换一次
            disableOnInteraction: false,
          },
          speed: 1000,
          loop: true,
          banner: [],
        },
      }
    },
    methods: {
      getBanner () {
        axios.post('/api/KanBan/FileKanBan/GetBannersForKanBan', {
          product: 'kaoqin',
          terminal: 'h5',
        }, {
          headers: { 'tenantId': tenantId },
        }).then(res => {
          this.banner = res.data.data
        })
      },
    },
    computed: {
      timeDisplayArea () { // 时间展示区
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let strDate = new Date().getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        return year + '年' + month + '月' + strDate + '日'
      },
      swiper () {
        return this.$refs.mySwiper.$swiper
      },
    },
    created () {
      this.getBanner()
      this.timer = setInterval(() => {
        let hours = new Date().getHours() > 9 ? new Date().getHours() : ('0' + new Date().getHours())
        let minutes = new Date().getMinutes() > 9 ? new Date().getMinutes() : ('0' + new Date().getMinutes())
        let min = new Date().getSeconds() > 9 ? new Date().getSeconds() : ('0' + new Date().getSeconds())
        let week = new Date().getDay()
        let weeks = ['日', '一', '二', '三', '四', '五', '六']
        let getWeek = '星期' + weeks[week]
        this.time = hours + ':' + minutes + ':' + min
        this.week = getWeek
      }, 1000)
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
      }
    },
    mounted () {
      this.swiper.slideTo(3, 1000, false)
    },
  }
</script>

<style scoped>
  .clock {
    background: #162D64;
    width: 100%;
    height: 100%;
    border-radius: 36px 36px 0 0;
  }

  .topBac {
    height: 190px;
    background: url("../../assets/img/kaoqin/top_time.png") no-repeat;
  }

  .year {
    margin-left: 60px;
    padding-top: 20px;
    font-size: 30px;
    line-height: 36px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
  }

  .minutes {
    margin-left: 60px;
    padding-top: 20px;
    font-size: 50px;
    line-height: 36px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
    position: relative;
    font-weight: bold;
  }

  .swiper-container {
    width: 658px;
    height: 370px;
  }

  .saying {
    margin-top: 70px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
    font-size: 50px;
    font-weight: bold;
  }

  .zjhn {
    font-size: 16px;
    color: #fff;
    font-family: '阿里巴巴普惠体 R', sans-serif;
    margin-top: 90px;
    text-align: center;
  }
</style>