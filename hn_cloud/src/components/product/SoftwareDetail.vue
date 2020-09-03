<template>
  <div class="wrapper">
    <div class="banner">
      <div class="banner-content">
        <div class="title">{{detail.title}}</div>
        <p class="content">{{detail.description}}</p>
        <div class="button">
          <router-link to="/apply">申请试用</router-link>
        </div>
        <div class="button" v-show="detail.url">
          <a target="_blank" :href="detail.url">打开应用</a>
        </div>
      </div>
    </div>
    <div class="content-wrapper" v-html="detail.ArticleData.content">
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  export default {
    name: 'software-detail',
    components: {
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
      height: 505px
      background-image: url("../../assets/img/softwaredetail.jpg")
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
    .content-wrapper
      width: 1200px
      margin: 50px auto 0
      padding-bottom: 100px
      /deep/ img
        width: 100%
      /deep/ p
        line-height: 25px
</style>