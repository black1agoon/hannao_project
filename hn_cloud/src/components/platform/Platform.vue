<template>
  <div class="wrapper">
    <div class="banner">
      <div class="banner-content">
        <div class="title">平台咨讯</div>
        <p class="content">公司相关资讯以及工业互联网行业动态</p>
      </div>
    </div>
    <div class="tabs-wrapper">
      <ul class="tabs">
        <li :class="{active: activeIndex === index}"
            v-for="(cat, index) in tabs"
            :key="cat.catid"
            @click="go2tab(index)">{{cat.catname}}</li>
      </ul>
    </div>
    <div :class="['content-wrapper', {empty: detailList.data.length === 0}]">
      <div class="news" v-for="news in detailList.data" :key="news.id">
        <div class="picture">
          <img :src="utils.getImageSrc(news.thumb)">
        </div>
        <div class="right">
          <div class="title">
            <router-link :to="`/platform/detail/${news.catid}/${news.id}`">{{news.title}}</router-link>
          </div>
          <div class="content">
            {{news.description}}
          </div>
          <div class="label">{{tabs[activeIndex].catname}}</div>
          <div class="time">
            {{news.updatetime | formatDate }}
          </div>
        </div>
      </div>
      <pagination ref="pagination"
                  class="pagination"
                  :total="detailList.sum"
                  @pageChange="pageChange">
      </pagination>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {formatDate} from '@/assets/js/tools'
  import utils from '../../assets/js/utils'
  // import Pagination from '../tools/Pagination'
  import Pagination from 'xq-pagination/Pagination'
  export default {
    name: 'platform',
    components: {
      Pagination
    },
    data() {
      return {
        utils,
        detailList: {
          data: [],
          sum: 0
        },
        tabs: JSON.parse(window.localStorage.getItem('menu'))[6][7].sort((a, b) => a.catid - b.catid),
        activeIndex: 0,
        catId:  this.$route.params.catid
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time * 1000)
        return formatDate(date, 'yyyy年MM月dd日')
      }
    },
    methods: {
      getDetail(catid, pageNo) {
        api.getPlatformCat(catid, pageNo).then(data => {
          this.detailList = data
          window.scrollTo(0, 0)
        })
      },
      go2tab(index) {
        this.activeIndex = index
        // this.getDetail(this.tabs[index].catid, 1)
        this.$router.push(`/platform/${this.tabs[index].catid}`)
        this.$refs.pagination.initActivePage()
      },
      pageChange(pageNo) {
        this.getDetail(this.catId, pageNo)
      }
    },
    mounted() {
      this.activeIndex = this.tabs.findIndex(t => t.catid === this.catId)
      this.getDetail(this.catId, 1)
    },
    watch: {
      '$route'(to, from) {
        this.activeIndex = this.tabs.findIndex(t => t.catid === to.params.catid)
        this.catId = to.params.catid
        this.getDetail(this.catId, 1)
        // console.log(to)
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
      background-image: url("../../assets/img/platform.jpg")
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
    .tabs-wrapper
      width: 100%
      border-bottom: 1px solid #D9D9D9
      .tabs
        width: 1200px
        height: 44px
        line-height: 44px
        margin: 0 auto
        display: flex
        li
          width: 120px
          font-size: 18px
          color: #333333
          text-align: center
          position: relative
          cursor: pointer
          &.active
            color: #00AAFF
          &:after
            content: ' '
            display: inline-block
            position: absolute
            top: 10px
            right: 0
            width: 1px
            height: 24px
            background: #D9D9D9
            transform: rotate(30deg)
    .content-wrapper
      width: 1200px
      margin: 0 auto
      padding-bottom: 100px
      &.empty
        margin: 200px auto 0
      .news
        height: 230px
        border-bottom: 1px solid #D9D9D9
        position: relative
        .picture
          width: 213px
          height: 134px
          position: absolute
          top: 50%
          transform: translateY(-50%)
          img
            width: 100%
            height: 100%
        .right
          position: absolute
          left: 248px
          top: 50px
          width: 900px
          height: 150px
          .title
            font-size: 18px
            a
              color: #333333
              &:hover
                color: #00c1de
          .content
            margin-top: 10px
            font-size: 14px
            color: #a8a8a8
            line-height: 30px
            height: 80px
            overflow: hidden
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 3
          .label
            position: absolute
            width: 70px
            height: 14px
            line-height: 14px
            border: 1px solid #00AAFF
            padding: 3px 7px
            font-size: 14px
            text-align: center
            color: #00AAFF
            bottom: 5px
          .time
            position: absolute
            bottom: 5px
            left: 103px
            font-size: 14px
            color: #a8a8a8
            line-height: 20px
      .pagination
        text-align: center
        margin-top: 30px
 </style>