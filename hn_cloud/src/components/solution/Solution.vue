<template>
  <div class="wrapper">
    <div class="banner">
      <div class="banner-content">
        <div class="title">解决方案</div>
        <p class="content">
          汉脑智慧工厂整体解决方案建立在 HANA 智能一体化管理系统开发框架上，通过专业的技术咨询、系统调研，提出适合客户的</p>
        <p class="content">解决方案，解决了生产一线信息传递、产线平衡、质量管控、品质追溯等数据链的贯通难题....</p>
      </div>
    </div>
    <div class="hardware" id="field">
      <div class="title">领域</div>
      <div class="small-title">智慧工厂整体解决方案提供商</div>
      <div class="hard-wrapper">
        <div class="hdware" v-for="field in fieldList" :key="field.data.id">
          <div class="pic">
            <img :src="utils.getImageSrc(field.data.thumb)"/>
          </div>
          <div class="name">
            <router-link :to="`/solution/field/${field.data.catid}/${field.data.id}`">{{field.data.title}}</router-link>
          </div>
          <div class="explain">{{field.data.description}}
          </div>
        </div>
      </div>
    </div>
    <div class="software" id="industry">
      <div class="title">行业</div>
      <div class="small-title">实时感知、实时监控、实时指挥的智慧工厂</div>
      <div class="soft-wrapper">
        <div class="sfware" v-for="industry in industryList" :key="industry.data.id">
          <div class="pic">
            <div class="mask"></div>
            <span class="industry">{{industry.data.title}}</span>
            <img :src="utils.getImageSrc(industry.data.thumb)"/>
          </div>
          <div class="introduce">{{industry.data.description}}</div>
          <div class="button">
            <router-link to="/industry/detail">点击详情</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '@/assets/js/utils'
  import api from '@/api'
  export default {
    name: 'solution',
    components: {
    },
    data() {
      return {
        utils,
        fieldList: [],
        industryList: []
      }
    },
    methods: {
      getContentByPosid() {
        return Promise.all([api.getContentByPosid(3), api.getContentByPosid(4)]).then(result => {
          if (result[0] && result[0].length > 0) {
            this.fieldList = result[0]
          }
          if (result[1] && result[1].length > 0) {
            this.industryList = result[1]
          }
          // console.log(result)
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
      background-image: url("../../assets/img/solution.jpg")
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
        margin: 0 auto 50px
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
            width: 51px
            height: 51px
            margin: 36px auto 20px
            img
              width: 100%
              height: 100%
          .name
            text-align: center
            a
              font-size: 18px
              color: #000000
              text-align: center
              &:hover
                color: #00c1de
          .explain
            width: 439px
            height: 60px
            margin: 0 auto
            text-align: center
            font-size: 14px
            color: #a8a8a8
            line-height: 20px
            margin-top: 14px
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 3
    .software
      .title
        padding: 50px 0
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
        margin: 0 auto 100px
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
              transition: all 0.3s
              overflow: hidden
            .industry
              position: absolute
              width: 100%
              padding-left: 10px
              height: 40px
              line-height: 40px
              z-index: 100
              bottom: 0
              font-size: 18px
              color: #ffffff
              background: rgba(0, 0, 0, .49)
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