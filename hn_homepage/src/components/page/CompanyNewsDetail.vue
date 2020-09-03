<template>
  <div class="detail-wrapper">
    <div class="title">{{newsinfo.title}}</div>
    <div class="date">{{newsinfo.createTime.substr(0, 10)}}</div>
    <div class="content" v-html="newsinfo.contents"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config'
  export default {
    name: 'company-news-detail',
    data() {
      return {
        serverURI: config.serverURI,
        newsinfo: {}
      }
    },
    methods: {
      getNewsDeatil() {
        axios({
          method: 'get',
          url: this.serverURI + 'pac/news/detail?id=' + this.$route.params.id,
          data: this.query
        }).then(res => {
          if (res.status === 200 && res.data.code === '00') {
            this.newsinfo = res.data.data
          } else {
            this.newsinfo = {}
          }
        })
      }
    },
    mounted() {
      this.$parent.changeHeaderColor()
      this.getNewsDeatil()
    },
    beforeRouteLeave(to, from, next) {
      this.$parent.initHeaderColor()
      next()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.detail-wrapper
  width: 1000px
  margin: 130px auto 100px
  .title
    font-size: 36px
    line-height: 50px
    /*font-weight: bold*/
    color: #444444
  .date
    color: #bbbbbb
    font-size: 16px
    margin-top: 30px
  .content
    margin-top: 30px
    font-size: 18px
    color: #444444
    line-height: 36px
    /deep/ img
      width: 100%
</style>