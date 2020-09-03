<template>
  <div class="wrapper">
    <div class="banner">
    </div>
    <div class="hardware" v-for="product in detailList" :key="product.id">
      <div class="hdware" :id="'product' + product.id">
        <div class="name">{{product.title}}</div>
        <div class="pic">
          <img :src="utils.getImageSrc(product.thumb)">
        </div>
        <div class="introduce" v-html="product.content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import utils from '@/assets/js/utils'
  export default {
    name: 'product-detail',
    components: {
    },
    data() {
      return {
        utils,
        detailList: []
      }
    },
    methods: {
      getAllProductDetail() {
        return api.getAllProductDetail().then(data => {
          // console.log(data)
          if (data && data.length > 0) {
            this.detailList = data.map(d => d.data)
          }
        })
      },
      scroll2Pos(el) {
        this.$nextTick(() => {
          window.scrollTo(0, el.offsetTop)
        })
      }
    },
    mounted() {
      this.getAllProductDetail().then(() => {
        let el = document.getElementById(this.$route.hash.replace('#', ''))
        this.scroll2Pos(el)
      })
    },
    watch: {
      '$route'(to, from) {
        console.log(to)
        let el = document.getElementById(to.hash.replace('#', ''))
        this.scroll2Pos(el)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1400px
      height: 505px
      background-image: url("../../assets/img/productdetail.jpg")
      background-repeat: no-repeat
      background-size: percentage
    .hardware
      width: 100%
      height: 425px
      &:nth-of-type(2n+1)
        background: #F2F2F2
      .hdware
        position: relative
        width: 1200px
        height: 425px
        margin: 0 auto
        p
          width: 100%
          height: 100%
          img
            width: 100%
            height: 100%
        .name
          text-align: center
          font-size: 26px
          padding-top: 59px
        .pic
          position: absolute
          width: 217px
          height: 180px
          /*background-image: url("../../assets/img/hardware.png")*/
          /*background-repeat: no-repeat*/
          /*background-size: 217px 180px*/
          top: 50%
          left: 50px
          transform: translateY(-50%)
          img
            width: 100%
            height: 100%
        .introduce
          position: absolute
          width: 800px
          height: 200px
          top: 120px
          right: 0
          text-align: left
          /deep/ img
            width: 100%
            height: 100%
          .title
            font-size: 18px
            color: #484747
            margin-bottom: 5px
          .content
            font-size: 16px
            color: #666666
            line-height: 24px
            margin-bottom: 20px
</style>