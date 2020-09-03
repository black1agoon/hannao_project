<template>
  <div class="wrapper">
    <div class="banner">
      <div class="title-wrap">
        <div class="title">需求中心</div>
        <div class="small-title">工业软件</div>
      </div>
    </div>
    <!--<div class="query-wrap">-->
      <!--<div class="classify brand">-->
        <!--<div class="label">品牌</div>-->
        <!--<ul class="kinds">-->
          <!--<li class="active">全部</li>-->
          <!--<li>浙江汉脑</li>-->
          <!--<li>鉴真宝</li>-->
          <!--<li>优羽</li>-->
        <!--</ul>-->
      <!--</div>-->
      <!--<div class="classify price">-->
        <!--<div class="label price">价格</div>-->
        <!--<ul class="kinds">-->
          <!--<li class="active">全部</li>-->
          <!--<li>免费</li>-->
          <!--<li>￥1000以下</li>-->
          <!--<li>￥1000-￥10000</li>-->
          <!--<li>￥10000-￥100000</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <div class="content-wrap">
      <div class="left">
        <div class="search-box">
          <input class="input" placeholder="输入应用名称" type="text" v-model="query.name"/>
          <span class="search-btn" @click="getData">搜索</span>
        </div>
        <div class="category-box">
          <p class="title">应用类别</p>
          <ul class="category" ref="category">
            <li v-for="(cate, index) in categoryList" :key="index">
              <input type="checkbox" :id="cate.id" :checked="checkedIndex === index">
              <label :for="cate.id" @click.prevent="categoryClick(cate.id, index)">{{cate.name}}</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <router-link class="app"
             :to="`/application/detail/${app.id}`"
             v-for="(app, index) in applicationList"
             :key="index">
          <img class="pic" :src="getImageUrl(app.icon)">
          <div class="info-box">
            <p class="title">{{app.name}}</p>
            <p class="text">平台认证<i class="rz"></i></p>
            <p class="cnName">服务商: {{app.companyIdName}}</p>
          </div>
          <p class="category">{{app.catIdName}}</p>
          <p class="price">
            参考价格
            <span class="unit1">￥</span>
            <span class="num">{{app.price}}</span>
            <span class="unit2">起</span>
          </p>
        </router-link>
        <pagination ref="pagination"
                    v-show="applicationTotal > 5"
                    class="pagination"
                    :page-size="5"
                    :total="applicationTotal"
                    @pageChange="pageChange">
        </pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from 'xq-pagination/Pagination'
  import api from '@/api'
  import {getImageUrl} from '@/assets/js/tools'
  export default {
    name: 'application',
    components: {
      Pagination
    },
    data() {
      return {
        getImageUrl,
        query: {
          name: null,
          catId: null,
          page: 1,
          pageSize: 5
        },
        checkedIndex: null,
        applicationList: [],
        applicationTotal: 0,
        categoryList: []
      }
    },
    methods: {
      getData() {
        api.application.paged(this.query).then(data => {
          if (data && data.records) {
            this.applicationList = data.records
            this.applicationTotal = data.total
          } else {
            this.applicationList = []
            this.applicationTotal = 0
          }
        })
      },
      getCategory() {
        api.application.categoryPaged({
          page: 1,
          pageSize: 999
        }).then(data => {
          if (data && data.records) {
            this.categoryList = data.records
          }
        })
      },
      pageChange(page) {
        this.query.page = page
        this.getData()
      },
      categoryClick(catId, index) {
        if (this.checkedIndex === index) {
          this.query.page = 1
          this.checkedIndex = null
          this.query.catId = null
          this.getData()
        } else {
          this.query.page = 1
          this.checkedIndex = index
          this.query.catId = catId
          this.getData()
        }
      }
    },
    mounted() {
      this.getData()
      this.getCategory()
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
      background-image: url("../../assets/img/application/banner.png")
      background-repeat: no-repeat
      background-size: cover
      background-position: center center
      .title-wrap
        width: 1200px
        margin: 140px auto 0
        .title
          /*text-align: center*/
          color: #ffffff
          font-size: 36px
        .small-title
          font-size: 20px
          margin-top: 10px
          color: #ffffff
    .query-wrap
      width: 1140px
      height: 122px
      background: #ffffff
      margin: 88px auto 0
      padding: 15px 30px
      .classify
        padding: 15px 30px
        background-repeat: no-repeat
        &.brand
          background-image: url("../../assets/img/application/brand.png")
          background-size: 40px 42px
          background-position: 5px 5px
        &.price
          background-image: url("../../assets/img/application/price.png")
          background-size: 35px 35px
          background-position: 5px 15px
        .label
          margin-right: 36px
          display: inline-block
          font-size: 20px
          color: #444444
        .kinds
          display: inline-block
          li
            display: inline-block
            font-size: 16px
            color: #888888
            padding: 5px 14px
            border-radius: 4px
            margin: 0 10px
            cursor: pointer
            &.active
              color: #ffffff
              background: #55A8F8
    .content-wrap
      width: 1200px
      margin: 30px auto
      .left
        width: 300px
        background: #ffffff
        display: inline-block
        margin-right: 30px
        .search-box
          position: relative
          height: 50px
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
          .input
            outline: none
            width: 172px
            height: 50px
            border: none
            font-size: 16px
            padding: 0 78px 0 50px
            background-image: url("../../assets/img/application/Search.png")
            background-repeat: no-repeat
            background-size: 22px 22px
            background-position: 14px 14px
          .search-btn
            position: absolute
            right: 0
            top: 0
            width: 78px
            height: 50px
            line-height: 50px
            text-align: center
            color: #ffffff
            font-size: 16px
            background: #55A8F8
            transition: all .2s
            &:hover
              cursor: pointer
              opacity: .8
        .category-box
          padding: 40px 30px 100px
          .title
            font-size: 20px
            color: #444444
          .category
            li
              margin-top: 30px
              input[type=checkbox]
                display: none
              label
                font-size: 18px
                color: #888888
                cursor: pointer
                user-select: none
              input[type=checkbox]:checked + label
                color: #55A8F8
              input[type=checkbox]:checked + label:before
                background-image: url("../../assets/img/application/checked.png")
                background-color: rgb(3, 169, 245)
                border-color: rgb(3, 169, 245)
                background-repeat: no-repeat
                background-size: 21px 21px
                background-position: center center

              input[type="checkbox"] + label:before
                display: inline-block
                content: ""
                margin: 0 15px 3px 0
                width: 17px
                height: 17px
                background-color: #fff
                border: 2px solid #B6B6B6
                vertical-align: middle
      .right
        vertical-align: top
        display: inline-block
        width: 870px
        .app
          height: 100px
          padding: 26px
          margin-bottom: 20px
          background: #ffffff
          position: relative
          transition: all .2s
          display: block
          &:hover
            transform: translateY(-2px)
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
          .pic
            display: inline-block
            width: 100px
            height: 100px
          .info-box
            vertical-align: top
            display: inline-block
            margin-left: 42px
            .title
              color: #444444
              font-size: 20px
            .text
              color: #5FC980
              font-size: 14px
              margin-top: 20px
              .rz
                margin-left: 11px
                vertical-align: middle
                display: inline-block
                width: 18px
                height: 20px
                background-image: url("../../assets/img/application/rz.png")
                background-size: 18px 20px
                background-repeat: no-repeat
            .cnName
              font-size: 14px
              color: #888888
              margin-top: 20px
          .category
            position: absolute
            right: 30px
            top: 30px
            color: #444444
            font-size: 16px
          .price
            position: absolute
            right: 30px
            bottom: 25px
            font-size: 14px
            color: #DDDDDD
            .unit1
              margin-left: 10px
              color: #E54343
              font-size: 13px
            .num
              color: #E54343
              font-size: 28px
            .unit2
              color: #E54343
              font-size: 15px
        .pagination
          margin: 50px 0
          text-align: center
</style>
<style>
  input::-webkit-input-placeholder {
    color: #BBBBBB;
  }
  input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: #BBBBBB;
  }
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #BBBBBB;
  }
  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #BBBBBB;
  }
  input:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #BBBBBB;
  }
</style>