<template>
  <div class="wrapper">
    <div class="banner">
      <div class="banner-content">
        <p class="content">智慧当下、掌控未来</p>
      </div>
    </div>
    <div class="title-wrapper">
      <div class="title">{{detail.title}}</div>
      <div class="labels">
        <div class="time">
          {{detail.updatetime | formatDate }}
        </div>
      </div>
      <div class="abstract" v-show="detail.description">
        <span class="zy">摘要:</span>{{detail.description}}
      </div>
    </div>
    <div class="content-wrapper" v-html="detail.ArticleData.content">
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {formatDate} from '@/assets/js/tools'
  export default {
    name: 'recomment-detail',
    components: {
    },
    computed: {
    },
    filters: {
      formatDate(time) {
        let date = new Date(time * 1000)
        return formatDate(date, 'yyyy年MM月dd日')
      }
    },
    data() {
      return {
        detail: {
          ArticleData: {
            content: ''
          }
        }
      }
    },
    methods: {
      getDetail(params) {
        api.getContentDetailBy2Id(params.catid, params.id).then(data => {
          this.detail = data
        })
      }
    },
    mounted() {
      this.getDetail(this.$route.params)
    },
    // beforeRouteUpdate(to, from, next) {
    //   this.getDetail(to.params)
    //   next()
    // }
    watch: {
      '$route'(to, from) {
        this.getDetail(to.params)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1400px
      height: 340px
      background-image: url("../../assets/img/platformdetail.jpg")
      background-repeat: no-repeat
      background-size: percentage
      .banner-content
        width: 1200px
        left: 50%
        transform: translateX(-50%)
        position: absolute
        top: 100px
        .title
          font-size: 36px
          color: #ffffff
          margin-bottom: 20px
        .content
          font-size: 16px
          color: #ffffff
          line-height: 28px
        .button
          width: 114px
          height: 34px
          line-height: 34px
          font-size: 14px
          background: rgba(0, 143, 215, .52)
          text-align: center
          cursor: pointer
          border-radius: 5px
          float: left
          margin: 63px 30px 0 0
          a
            display: block
            color: #ffffff
    .title-wrapper
      width: 1200px
      margin: 0 auto
      .title
        text-align: center
        font-size: 24px
        color: #333333
        margin-top: 50px
      .labels
        text-align: center
        margin-top: 20px
        &:after
          content: ' '
          width: 100%
          height: 1px
          display: block
          background: linear-gradient(to left, #fff 0%, #D9D9D9 10%, #D9D9D9 90%, #fff 100%)
        .time
          margin-bottom: 20px
          display: inline-block
      .abstract
        background: #F3F3F3
        color: #333333
        font-size: 14px
        line-height: 30px
        padding: 5px 31px
        margin: 30px 0
        span
          color: #00AAFF
    .content-wrapper
      width: 1200px
      margin: 0 auto
      padding-bottom: 100px
      /deep/ p
        line-height: 25px
</style>