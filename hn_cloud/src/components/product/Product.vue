<template>
  <div class="wrapper">
    <div class="banner">
    </div>
    <div class="hardware" id="hardware">
      <div class="title">硬件</div>
      <div class="small-title">我们源于工业，服务工业</div>
      <div class="hard-wrapper">
        <div class="hdware" v-for="hard in hdList" :key="hard.data.id">
          <div class="pic">
            <img :src="getImageSrc(hard.data.thumb)">
          </div>
          <div class="introduce">
            <div class="name">{{hard.data.title}}</div>
            <div class="explain">{{hard.data.description}}</div>
            <div class="button">
              <router-link :to="`/product/detail#product${hard.data.id}`">点击详情</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="software" id="software">
      <div class="title">软件</div>
      <div class="small-title">每一次创新都需要打破常规,不一样的方式,获得意想不到的结果,实时精准定位</div>
      <div class="soft-wrapper">
        <div class="sfware" v-for="soft in sfList" :key="soft.data.id">
          <div class="pic">
            <div class="mask"></div>
            <span class="system">{{soft.data.title}}</span>
            <img :src="getImageSrc(soft.data.thumb)">
          </div>
          <div class="introduce">
            {{soft.data.description}}
          </div>
          <div class="button">
            <router-link :to="`/product/software/${soft.data.catid}/${soft.data.id}`">点击详情</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import config from '@/config'
  import utils from '@/assets/js/utils'
  export default {
    name: 'product',
    components: {},
    data() {
      return {
        utils,
        hdList: [],
        sfList: []
      }
    },
    methods: {
      getImageSrc(url) {
        return config.serverURI + url
      },
      getContentByPosid() {
        return Promise.all([api.getContentByPosid(1), api.getContentByPosid(2)]).then(result => {
          if (result[0] && result[0].length > 0) {
            this.hdList = result[0]
          }
          if (result[1] && result[1].length > 0) {
            this.sfList = result[1]
          }
        })
      }
    },
    mounted() {
      this.getContentByPosid().then(() => {
        if (this.$route.hash) {
          let el = document.getElementById(this.$route.hash.replace('#', ''))
          utils.scroll2Pos(el, this)
        }
      })
    },
    watch: {
      '$route'(to, from) {
        let el = document.getElementById(to.hash.replace('#', ''))
        utils.scroll2Pos(el, this)
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
      background-image: url("../../assets/img/product_b.jpg")
      background-repeat: no-repeat
      background-size: percentage
    .hardware
      .title
        padding-top: 50px
        text-align: center
        font-size: 26px
        color: #010101
      .small-title
        padding: 13px
        text-align: center
        font-size: 14px
        color: #a8a8a8
      .hard-wrapper
        width: 1200px
        margin: 0 auto
        display: flex
        flex-wrap: wrap
        justify-content: space-between
        .hdware
          width: 581px
          height: 226px
          margin-top: 35px
          position: relative
          background: #FBFBFB
          transition: all 0.5s
          &:hover
            box-shadow: 1px 1px 10px 2px #CCC
          /*box-shadow: 0 3px 21px rgba(0, 0, 0, 0.09) */
          .pic
            position: absolute
            width: 171px
            height: 143px
            top: 50%
            left: 40px
            transform: translateY(-50%)
            img
              width: 100%
              height: 100%
          .introduce
            position: absolute
            width: 259px
            top: 32px
            right: 40px
            text-align: center
            .title
              font-size: 18px
              color: #000000
            .explain
              height: 75px
              overflow: hidden
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 3
              font-size: 14px
              color: #a8a8a8
              text-align: left
              line-height: 25px
              margin-top: 14px
            .button
              margin: 30px auto 0
              width: 98px
              height: 38px
              line-height: 38px
              background: #000
              border: 1px solid #ffffff
              box-shadow: 0 0 0 1px #000
              color: #ffffff
              cursor: pointer
              transition: all .3s
              &:hover
                background: #666666
                box-shadow: 0 0 0 1px #666666
              a
                display: block
                color: #ffffff
    .software
      .title
        padding-top: 50px
        text-align: center
        font-size: 26px
        color: #010101
      .small-title
        padding: 13px
        text-align: center
        font-size: 14px
        color: #a8a8a8
      .soft-wrapper
        display: flex
        width: 1200px
        margin: 0 auto 50px
        /*justify-content: space-between*/
        flex-wrap: wrap
        .sfware
          width: 371px
          height: 424px
          background: #fbfbfb
          margin-top: 35px
          border-radius: 10px 10px 0 0
          position: relative
          transition: all .5s
          overflow: hidden
          margin-right: 43px
          &:nth-of-type(3n)
            margin-right: 0
          &:hover
            box-shadow: 1px 1px 10px 2px #CCC
            /*box-shadow: 0 3px 21px rgba(0, 0, 0, 0.09) */
            .pic
              img
                transform: scale(1.05)
              .mask
                background: rgba(0, 0, 0, .1)
          .pic
            width: 100%
            height: 211px
            overflow: hidden
            border-radius: 10px 10px 0 0
            position: relative
            img
              position: absolute
              display: block
              z-index: 90
              width: 100%
              height: 211px
              transition: all .3s
              overflow: hidden
            .system
              position: absolute
              z-index: 100
              left: 50%
              transform: translateX(-50%)
              line-height: 211px
              font-size: 18px
              color: #ffffff
            .mask
              position: absolute
              z-index: 95
              width: 100%
              height: 211px
              background: rgba(0, 0, 0, .3)
              border-radius: 10px 10px 0 0
              transition: all .5s
          .introduce
            font-size: 14px
            line-height: 22px
            color: #666666
            margin: 32px 25px
            height: 88px
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 4
          .button
            width: 96px
            height: 36px
            line-height: 36px
            text-align: center
            margin: 0 auto
            color: #ffffff
            background: #000000
            transition: all 0.3s
            cursor: pointer
            &:hover
              background: #666666
            a
              display: block
              color: #ffffff
</style>