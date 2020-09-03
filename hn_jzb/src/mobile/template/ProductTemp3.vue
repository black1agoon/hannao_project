<template>
  <div class="temp">
    <div class="scroll">
      <div class="img">
        <img v-if="getImgUrl" :src="getImgUrl">
        <img v-else src="/uc/static/img/icon.png"/>
      </div>
    </div>
    <temp-footer :product-data="productData" :id-no="idNo">
    </temp-footer>
  </div>
</template>

<script>
  import config from '@/config'
  import TempFooter from '../components/TempFooter'
  export default {
    name: 'product-temp3',
    components: {
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
      getImgUrl() {
        let banners = this.productData.banners
        if (banners && banners.length > 0) {
          return this.serverURI + this.productData.banners[0].url
        } else {
          return null
        }
      }
    },
    data() {
      return {
        serverURI: config.serverURI
      }
    },
    methods: {
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
      position: relative
      .img
        width: 100%
        height: 100vw
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
        img
          width: 100%
          height: 100%
</style>
