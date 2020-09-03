<template>
  <div class="temp">
    <div class="scroll" ref="scroll">
        <div class="swiper-wrapper">
          <swiper ref="mySwiper" :options="swiperOption" v-if="productData.banners">
            <div class="swiper-slide" v-for="(banner,index) in getSortBanners" :key="index">
              <img style="width: 100%;height: 100%" :src="getImgSrc(banner.url)">
            </div>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="text">
          此商品经鉴真宝认证为<strong>正品</strong>
        </div>
    </div>
    <temp-footer :product-data="productData" :id-no="idNo">
    </temp-footer>
  </div>
</template>

<script>
  import config from '@/config'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import TempFooter from '../components/TempFooter'
  export default {
    name: 'product-temp2',
    components: {
      swiper,
      swiperSlide,
      TempFooter
    },
    props: {
      productData: {
        type: Object,
        default: () => ({})
      },
      idNo: String
    },
    computed: {
      getSortBanners() {
        let banners = this.productData.banners
        let mainArr = banners.filter(a => {
          return a.main === 1
        })
        let seqArr = banners.sort((a, b) => {
          if (a.seq > b.seq) {
            return 1
          } else {
            return -1
          }
        }).filter(a => {
          return a.main !== 1
        })
        return mainArr.concat(seqArr)
      }
    },
    data() {
      return {
        serverURI: config.serverURI,
        swiperOption: {
          initialSlide: 0,
          slidesPerView: 1,
          spaceBetween: 30,
          // loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            observer: true
          },
          on: {
          }
        }
      }
    },
    methods: {
      getImgSrc(url) {
        return this.serverURI + url
      }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../static/stylus/mixin.styl'
  .temp
    width: 100%
    height: 100%
    .scroll
      background: #ffffff
      height: calc(100% - 60px)
      .swiper-wrapper
        position: relative
        width: 100%
        height: 100vw
        background: #ffffff
      .text
        margin-top: 30px
        font-size: 26px
        text-align: center
</style>
