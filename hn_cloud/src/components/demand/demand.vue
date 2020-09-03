<template>
  <div class="wrapper">
    <div class="banner">
      <div class="title">需求中心</div>
    </div>
    <div class="demand-wrap">
      <div class="wrap">
        <div class="demand"
             @click="openDemand(demand)"
             v-for="(demand, index) in demandList"
             :key="index">
          <div class="head" :style="{background: demand.domainIdColor}">
            <span class="category">{{demand.domainIdName}}</span>
            <span class="time">截止时间 {{demand.deadline.substr(0, 10)}}</span>
          </div>
          <div class="content">
            <p class="title">{{demand.title}}</p>
            <p class="descript">{{demand.content}}</p>
          </div>
          <div class="bottom">
            <ul class="pos-box">
              <li>浙江</li>
              <li>上海</li>
            </ul>
            <div class="price">
              <span class="font">价格</span>
              <span class="val">{{demand.budget}}</span>
            </div>
          </div>
        </div>
        <pagination ref="pagination"
                    v-show="demandTotal > 10"
                    class="pagination"
                    :page-size="10"
                    :total="demandTotal"
                    @pageChange="pageChange">
        </pagination>
      </div>
    </div>
    <demand-window ref="window">
    </demand-window>
  </div>
</template>

<script>
  import api from '@/api'
  import utils from '@/assets/js/utils'
  import Pagination from 'xq-pagination/Pagination'
  import demandWindow from './demandWindow'
  export default {
    name: 'product',
    components: {
      Pagination,
      demandWindow
    },
    data() {
      return {
        utils,
        query: {
          page: 1,
          pageSize: 10
        },
        demandList: [],
        demandTotal: 0
      }
    },
    methods: {
      getData() {
        api.demand.paged(this.query).then(data => {
          if (data && data.records) {
            this.demandList = data.records
            this.demandTotal = data.total
          } else {
            this.demandList = []
            this.demandTotal = 0
          }
        })
      },
      pageChange(page) {
        this.query.page = page
        this.getData()
      },
      openDemand(demand) {
        this.$refs.window.open(demand)
      }
    },
    mounted() {
      this.getData()
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    background: #F7F7F7
    .banner
      position: relative
      min-width: 1400px
      height: 360px
      background-image: url("../../assets/img/demand/banner.png")
      background-repeat: no-repeat
      background-size: cover
      background-position: center center
      .title
        text-align: center
        color: #ffffff
        font-size: 36px
        padding-top: 150px
    .demand-wrap
      background: #F7F7F7
      min-width: 1400px
      .wrap
        width: 1200px
        margin: 0 auto
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        padding: 50px 0
        .demand
          width: 580px
          height: 250px
          background: #ffffff
          border: 1px solid rgba(227, 227, 227, 1)
          margin-bottom: 40px
          transition: all .2s
          &:hover
            box-shadow: 0 5px 10px rgba(0, 0, 0, .2)
          .head
            height: 40px
            display: flex
            justify-content: space-between
            align-items: center
            padding: 0 30px
            .category
              font-size: 18px
              color: #ffffff
            .time
              font-size: 14px
              color: rgba(255, 255, 255, .6)
          .content
            padding: 20px 30px
            height: 120px
            border-bottom: 1px solid #E3E3E3
            .title
              font-size: 20px
              color: #444444
              white-space: nowrap
              text-overflow: ellipsis
              overflow: hidden
            .descript
              margin-top: 21px
              font-size: 16px
              color: #BBBBBB
              line-height: 22px
              overflow: hidden
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 3
          .bottom
            display: flex
            height: 50px
            justify-content: space-between
            align-items: center
            padding: 0 30px
            .pos-box
              li
                display: inline-block
                margin-right: 20px
                width: 46px
                height: 24px
                line-height: 24px
                font-size: 14px
                color: #859C82
                border-radius: 6px
                text-align: center
                background: rgba(241, 248, 243, 1)
            .price
              .font
                font-size: 16px
                color: #bbbbbb
                margin-right: 20px
              .val
                font-size: 24px
                color: #E54343
        .pagination
          margin-top: 30px
          text-align: center
</style>