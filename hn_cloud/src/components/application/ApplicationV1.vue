<template>
  <div class="wrapper">
    <div class="banner">
      <div class="banner-content">
        <div class="title">市场应用</div>
        <p class="content">企业级的、落地的工业垂直领域、细分场景应</p>
      </div>
    </div>
    <div class="gyapp" id="gyapp">
      <div class="title">工业APP</div>
      <div class="small-title">智慧工厂整体解决方案提供商</div>
      <div class="item" v-for="item in appList" :key="item.id">
        <div class="picture">
          <img :src="utils.getImageSrc(item.thumb)">
        </div>
        <div class="right">
          <div class="name">
            <router-link :to="`/application/detail/${item.catid}/${item.id}`">{{item.title}}</router-link>
          </div>
          <div class="description">{{item.description}}</div>
          <div class="button">
            <router-link to="/apply">方案咨询</router-link>
          </div>
          <div class="button" v-show="item.url">
            <a target="_blank" :href="item.url">平台体验</a>
          </div>
        </div>
      </div>
    </div>
    <div class="hardware" id="hardware">
      <div class="title">智能硬件</div>
      <div class="small-title">实时感知、实时监控、实时指挥的智慧工厂</div>
      <div class="item clearfix" v-for="(item,index) in hardwareList" :key="item.id" :style="{flexDirection: index % 2 === 0 ? 'row':'row-reverse'}">
        <div class="pic-wrapper">
          <div class="name">
            <router-link :to="`/solution/field/${item.catid}/${item.id}`">{{item.title}}</router-link></div>
          <div class="picture">
            <router-link :to="`/solution/field/${item.catid}/${item.id}`">
              <img :src="utils.getImageSrc(item.thumb)">
            </router-link>
          </div>
        </div>
        <div class="desc-wrapper">
          <div class="description">{{item.description}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '@/assets/js/utils'
  import api from '@/api'
  export default {
    name: 'application',
    components: {
    },
    data() {
      return {
        utils,
        appList: [],
        hardwareList: []
      }
    },
    methods: {
      getContentByPosid() {
        return Promise.all([api.getContentByPosid(5), api.getContentByPosid(6)]).then(result => {
          if (result[0] && result[0].length > 0) {
            this.appList = result[0].map(a => a.data)
          }
          if (result[1] && result[1].length > 0) {
            this.hardwareList = result[1].map(h => h.data)
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
      this.getContentByPosid().then(() => {
        if (this.$route.hash) {
          let el = document.getElementById(this.$route.hash.replace('#', ''))
          this.scroll2Pos(el)
        }
      })
    },
    watch: {
      '$route'(to, from) {
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
      background-image: url("../../assets/img/application.jpg")
      background-repeat: no-repeat
      background-size: percentage
      .banner-content
        width: 1200px
        left: 50%
        transform: translateX(-50%)
        position: absolute
        top: 158px
        .title
          font-size: 36px
          color: #ffffff
          margin-bottom: 20px
        .content
          font-size: 16px
          color: #ffffff
          line-height: 28px
    .gyapp
      width: 1200px
      margin: 0 auto 50px
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
        margin-bottom: 50px
      .item
        font-size: 0
        margin-bottom: 55px
        .picture
          display: inline-block
          width: 320px
          height: 188px
          img
            width: 100%
            height: 100%
        .name
          a
            font-size: 20px
            color: #000000
            &:hover
              color: #00c1de
        .right
          display: inline-block
          vertical-align: top
          margin-left: 35px
          width: 845px
          .description
            height: 100px
            box-sizing: border-box
            margin-top: 17px
            background: #fbfbfb
            font-size: 14px
            color: #a8a8a8
            line-height: 24px
            padding: 14px 33px
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 3
          .button
            display: inline-block
            cursor: pointer
            margin: 13px 30px 0 0
            width: 114px
            height: 34px
            line-height: 34px
            font-size: 14px
            background: #00AAFF
            text-align: center
            border-radius: 5px
            a
              color: #ffffff
            &:active
              background: #6ecdf7
    .hardware
      width: 1200px
      margin: 0 auto
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
        margin-bottom: 50px
      .item
        font-size: 0
        margin-bottom: 55px
        background: #fbfbfb
        width: 1200px
        box-sizing: border-box
        padding: 35px 50px 45px 170px
        transition: all .5s
        display: flex
        flex-direction: row
        &:hover
          box-shadow: 1px 1px 10px 2px #CCC
        .pic-wrapper
          width: 400px
          .name
            display: inline-block
            width: 100%
            font-size: 20px
            color: #000000
            text-align: center
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            a
              color: #000000
              &:hover
                color: #00c1de
          .picture
            margin-top: 30px
            width: 200px
            height: 200px
            img
              width: 100%
              height: 100%

        .desc-wrapper
          display: inline-block
          vertical-align: top
          width: 460px
          margin-right: 100px
          .description
            height: 192px
            margin-top: 56px
            font-size: 14px
            color: #a8a8a8
            line-height: 24px
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 8

</style>