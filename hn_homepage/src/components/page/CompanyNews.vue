<template>
  <div class="news-wrapper" >
    <div class="news"
         v-for="(news, index) in newsList"
         :key="index">
      <div class="news-left">
        <div class="title">
          <router-link :to="`/company/news/detail/${news.id}`">{{news.title}}</router-link>
        </div>
        <div class="date">{{news.createTime.substr(0, 10)}}</div>
        <div class="content" v-html="news.description">
        </div>
      </div>
      <div class="news-right">
        <img v-show="!!news.thumb" :src="serverURI + news.thumb"/>
      </div>
    </div>
    <pagination ref="pagination"
                class="pagination"
                :total="newsTotal"
                @pageChange="pageChange">
    </pagination>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '@/config'
  import Pagination from 'xq-pagination/Pagination'
  export default {
    name: 'company-news',
    components: {
      Pagination
    },
    computed: {
    },
    data() {
      return {
        serverURI: config.serverURI,
        query: {
          newsCategoryId: '6ccd4f8c3c814463880b918fda23ca95',
          page: 1,
          pageSize: 5
        },
        newsList: [],
        newsTotal: 0
      }
    },
    methods: {
      getNews() {
        axios({
          method: 'post',
          url: this.serverURI + 'pac/news/frontPage',
          data: this.query
        }).then(res => {
          if (res.status === 200 && res.data.code === '00') {
            this.newsList = res.data.data.records
            this.newsTotal = res.data.data.total
          } else {
            this.newsList = []
            this.newsTotal = 0
          }
        })
      },
      pageChange(pageNo) {
        this.query.page = pageNo
        this.getNews()
      }
    },
    mounted() {
      this.$parent.changeHeaderColor()
      this.getNews()
    },
    beforeRouteLeave(to, from, next) {
      this.$parent.initHeaderColor()
      next()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .news-wrapper
    width: 1200px
    margin: 100px auto
    .news
      display: flex
      justify-content: space-between
      border-bottom: 1px solid #DDDDDD
      padding: 50px 0
      .news-left
        width: 640px
        .title
          color: #444444
          font-size: 28px
          line-height: 40px
          cursor: pointer
        .date
          color: #bbbbbb
          font-size: 16px
          margin-top: 30px
        .content
          font-size: 18px
          margin-top: 25px
          line-height: 40px
          height: 120px
          overflow: hidden
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 3
      .news-right
        width: 472px
        height: 260px
        img
          width: 100%
          height: 100%
    .pagination
      text-align: center
      margin-top: 30px
</style>