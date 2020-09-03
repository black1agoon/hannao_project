<template>
  <div class="wrapper">
    <div class="banner">
      <div class="content">
        <div class="title">帮助支持</div>
        <div class="search-box">
          <input class="box" v-model="query.title" placeholder="关键词搜索">
          <div class="btn" @click="search">搜索</div>
        </div>
        <div class="keyword">常用关键词: <span @click="setKeyword($event)">商标</span><span  @click="setKeyword($event)">代理</span><span  @click="setKeyword($event)">物联网</span></div>
      </div>
    </div>
    <div class="tabs-wrapper">
      <ul class="tabs">
        <li :class="{active: activeIndex === 0}">
          <router-link to="/help/0">常见问题</router-link>
        </li>
        <li :class="{active: activeIndex === 1}">
          <router-link to="/help/1">产品套餐</router-link>
        </li>
        <li :class="{active: activeIndex === 2}">
          <router-link to="/help/2">联系客服</router-link>
        </li>
      </ul>
    </div>
    <div class="tab-content" v-show="activeIndex === 0">
      <div class="questions-box"
           v-for="(problem, index) in problemList"
           :key="index">
        <div class="question">
          <div class="title" @click="toggleFold">{{index + 1}}、{{problem.title}}</div>
          <transition name="folder">
            <div class="answer fold" v-html="problem.contents"></div>
          </transition>
        </div>
      </div>
    </div>
    <div class="tab-content" v-show="activeIndex === 1">
      <div class="product-wrapper">
        <ul class="left-tabs">
          <li v-for="(meal, index) in HELP.MEAL"
              :key="index"
              @click="mealClick(index)"
              :class="{active: productIndex === index}">{{meal.name}}
          </li>
        </ul>
        <div class="right-table">
          <ul class="head">
            <li>功能名称</li>
            <li>功能说明</li>
            <li>应用系统</li>
            <li>所需硬件和设备</li>
            <!--<li>价格</li>-->
          </ul>
          <div class="table">
            <div class="tr-wrap">
              <ul class="tr"
                  :key="index"
                  v-for="(tr, index) in HELP.MEAL[productIndex].data">
                <li class="td" v-for="(td, idx) in tr" :key="idx">
                  <span v-html="td"></span>
                </li>
              </ul>
            </div>
            <!--<div class="price-wrap">-->
              <!--<div class="price"-->
                   <!--:key="idx"-->
                   <!--v-for="(price, idx) in HELP.MEAL[productIndex].price">-->
                <!--<div class="wrap">-->
                  <!--<span>{{price}}</span>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="tab-content" v-show="activeIndex === 2">
      <div class="service-wrapper">
         <div class="service">
           <div class="type">在线客服</div>
           <div class="introduce">
             <p>为您提供各种在线专业咨询</p>
             <p class="advice" @click="showOnlineWindw">立即咨询&gt;</p>
           </div>
         </div>
        <div class="service">
          <div class="type">客服热线</div>
          <div class="introduce">
            <p>专业的人工电话服务热线</p>
            <p>联系电话: 400-657-3085</p>
          </div>
        </div>
        <div class="service">
          <div class="type">地址</div>
          <div class="introduce">
            <p>鉴正宝信息技术有限公司</p>
            <p>地址：浙江省平湖市和合路9号</p>
          </div>
        </div>
      </div>
    </div>
    <online-service ref="online">
    </online-service>
  </div>
</template>

<script>
  import OnlineService from '../common/OnlineService'
  import {HELP} from '../homepage.config'
  import axios from 'axios'
  import config from '@/config'
  export default {
    name: 'help-page',
    components: {
      OnlineService
    },
    data() {
      return {
        HELP,
        activeIndex: 0,
        productIndex: 0,
        serverURI: config.serverURI,
        problemList: [],
        query: {
          title: null,
          newsCategoryId: 'dacc086fa17b4747aa55fb3db3a94a38',
          page: 1,
          pageSize: 999
        }
      }
    },
    methods: {
      toggleFold(e) {
        // nextSibling
        let nextElem = e.target.nextSibling
        if (nextElem.classList.contains('fold')) {
          nextElem.classList.remove('fold')
        } else {
          nextElem.classList.add('fold')
        }
      },
      mealClick(index) {
        this.productIndex = index
      },
      getProblems() {
        axios({
          method: 'post',
          url: this.serverURI + 'pac/news/frontPage',
          data: this.query
        }).then(res => {
          if (res.status === 200 && res.data.code === '00') {
            this.problemList = res.data.data.records
          } else {
            this.problemList = []
          }
        })
      },
      search() {
        this.activeIndex = 0
        this.getProblems()
      },
      setKeyword(e) {
        console.log(e)
        this.query.title = e.target.innerHTML
      },
      showOnlineWindw() {
        this.$refs.online.show()
      }
    },
    mounted() {
    },
    watch: {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.activeIndex = Number(vm.$route.params.tab)
        vm.getProblems()
      })
    },
    beforeRouteUpdate(to, from, next) {
      this.activeIndex = Number(to.params.tab)
      next()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1200px
      height: 500px
      background-image: url("../../assets/img/help/banner.png")
      background-repeat: no-repeat
      background-size: cover
      .content
        width: 1200px
        color: #ffffff
        margin: 0 auto
        padding-top: 185px
        .title
          text-align: center
          /*font-weight: bold*/
          font-size: 50px
        .search-box
          width: 636px
          height: 50px
          margin: 70px auto 23px
          display: flex
          line-height: 50px
          box-shadow: 0px 0px 5px #089AFF
          .box
            width: 540px
            height: 50px
            background: #ffffff
            outline: none
            padding-left: 20px
            box-sizing: border-box
          .btn
            width: 96px
            height: 50px
            text-align: center
            background: #089AFF
            cursor: pointer
            font-size: 18px
        .keyword
          text-align: center
          font-size: 18px
          span
            margin: 0 15px
            cursor: pointer
    .tabs-wrapper
      height: 73px
      line-height: 73px
      background: #E8E9F3
      .tabs
        display: flex
        width: 1200px
        margin: 0 auto
        li
          width: 120px
          height: 69px
          font-size: 20px
          text-align: center
          cursor: pointer
          &.active
            color: #505DFF
            border-bottom: 4px solid #505DFF
          a
            display: inline-block
            width: 100%
            height: 69px
    .tab-content
      background: #ffffff
      padding-top: 20px
      .questions-box
        &:nth-of-type(2n)
          background: #F7F7F7
        .question
          width: 1200px
          margin: 0 auto
          padding: 35px 0
          .title
            font-size: 30px
            color: #4B4B4B
            padding-left: 90px
            cursor: pointer
          .answer
            margin: 40px auto 10px
            width: 920px
            line-height: 36px
            font-size: 18px
            color: #4D4D4D
            text-indent: 40px
            overflow: hidden
            transition: all .2s
            transform: translate3d(0, 0, 0)
            display: block
            &.fold
              display: none
              margin: 0
            &.folder-enter, &.folder-leave-to
              transform: translate3d(0, -100%, 0)
      .product-wrapper
        display: flex
        justify-content: space-between
        width: 1200px
        margin: 60px auto 110px
        .left-tabs
          width: 150px
          height: 480px
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.05)
          li
            height: 60px
            line-height: 60px
            color: #4D4D4D
            font-size: 18px
            text-align: center
            cursor: pointer
            transition: all .2s
            &.active
              color: #ffffff
              background-color: #505DFF
        .right-table
          width: 1020px
          border-left: 1px solid rgba(236, 236, 236, 1)
          border-right: 1px solid rgba(236, 236, 236, 1)
          display: flex
          flex-direction: column
          .head
            width: 100%
            height: 56px
            line-height: 56px
            display: flex
            border-bottom: 1px solid rgba(236, 236, 236, 1)
            li
              width: 220px
              background-color: #F5F5F5
              color: #727272
              border-right: 1px solid rgba(236, 236, 236, 1)
              text-align: center
              &:nth-of-type(2)
                width: 360px
              &:last-child
                border-right: none
          .table
            flex: 1
            display: flex
            color: #727272
            font-size: 16px
            .tr-wrap
              width: 1020px
              display: flex
              flex-direction: column
              .tr
                width: 100%
                flex: 1
                display: flex
                border-bottom: 1px solid rgba(236, 236, 236, 1)
                .td
                  vertical-align: middle
                  width: 220px
                  text-align: center
                  line-height: 22px
                  display: table
                  height: 100%
                  padding: 10px
                  box-sizing: border-box
                  word-break: break-all
                  border-right: 1px solid rgba(236, 236, 236, 1)
                  &:nth-of-type(2)
                    width: 360px
                  &:last-child
                    border-right: none
                  span
                    display: table-cell
                    vertical-align: middle
            .price-wrap
              width: 180px
              display: flex
              flex-direction: column
              .price
                flex: 1
                text-align: center
                border-bottom: 1px solid rgba(236, 236, 236, 1)
                .wrap
                  display: table
                  width: 100%
                  height: 100%
                  span
                    display: table-cell
                    vertical-align: middle
      .service-wrapper
        width: 1200px
        margin: 30px auto 400px
        display: flex
        justify-content: space-between
        .service
          width: 350px
          height: 173px
          border:1px solid rgba(232,232,232,1)
          .type
            font-size: 24px
            color: #656565
            margin: 20px 0 0 20px
          .introduce
            font-size: 18px
            color: #A0A0A0
            margin: 34px 0 0 24px
            line-height: 40px
            .advice
              cursor: pointer
              color: #508DFF
</style>