<template>
  <div class="header-wrap" :class="{smaller: smallerHeader}">
  <div class="header scroll-anchor">
    <div class="pure-menu pure-menu-horizontal">
      <a id="nav_logo" class="pure-menu-heading" href="/">
        <img src="/static/img/nav/logo.png" alt="Logo">
      </a>
      <ul class="pure-menu-list nav-left">
        <li class="pure-menu-item">
          <router-link class="pure-menu-link active" to="/">首页</router-link>
        </li>
        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
          <span class="pure-menu-link">企业文化</span>
          <ul class="pure-menu-children">
            <li class="pure-menu-item"><router-link to="/company/" class="pure-menu-link">公司介绍</router-link></li>
            <li class="pure-menu-item"><router-link to="/business/" class="pure-menu-link">行业洞察</router-link></li>
            <li class="pure-menu-item"><router-link to="/brand/" class="pure-menu-link">品牌计划</router-link></li>
          </ul>
        </li>
        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
          <span class="pure-menu-link">技术支持</span>
          <ul class="pure-menu-children">
            <li class="pure-menu-item"><router-link to="/about/" class="pure-menu-link">产品介绍</router-link></li>
            <li class="pure-menu-item"><router-link to="/downloads/" class="pure-menu-link">产品下载</router-link></li>
            <li class="pure-menu-item"><router-link to="/service/" class="pure-menu-link">技术咨询</router-link></li>
            <li class="pure-menu-item"><router-link to="/etag/" class="pure-menu-link">电子标签</router-link></li>
            <li class="pure-menu-item"><router-link to="/devices/" class="pure-menu-link">智能设备</router-link></li>
          </ul>
        </li>
        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
          <span class="pure-menu-link">解决方案</span>
          <ul class="pure-menu-children">
            <li class="pure-menu-item"><router-link to="/solution/bags" class="pure-menu-link">箱包</router-link></li>
            <li class="pure-menu-item"><router-link to="/solution/cloth" class="pure-menu-link">服饰</router-link></li>
            <li class="pure-menu-item"><router-link to="/solution/jewelry" class="pure-menu-link">珠宝</router-link></li>
            <li class="pure-menu-item"><router-link to="/solution/wine" class="pure-menu-link">名酒</router-link></li>
            <li class="pure-menu-item"><router-link to="/solution/paint" class="pure-menu-link">字画</router-link></li>
            <li class="pure-menu-item"><router-link to="/solution/card" class="pure-menu-link">证卡</router-link></li>
          </ul>
        </li>
        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
          <span class="pure-menu-link">合作伙伴</span>
          <ul class="pure-menu-children">
            <li class="pure-menu-item"><router-link to="/policy/" class="pure-menu-link">合作政策</router-link></li>
            <li class="pure-menu-item"><router-link to="/cooperation/" class="pure-menu-link">战略合作</router-link></li>
          </ul>
        </li>
        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
          <span class="pure-menu-link">会员服务</span>
          <ul class="pure-menu-children">
            <li class="pure-menu-item"><a :href="memberCenter + '/uc/company/login'" class="pure-menu-link">会员中心</a></li>
            <li class="pure-menu-item"><router-link to="/contact/" class="pure-menu-link">联系我们</router-link></li>
          </ul>
        </li>
      </ul>
      <ul class="pure-menu-list nav-right" :class="{'logged-in': loggedIn}">
        <li class="pure-menu-item" id="search_box">
          <search-drop></search-drop>
        </li>
        <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover login-status-in">
          <span class="pure-menu-link no-highlight non-clickale" id="login_name">
            <img src="/static/img/nav/user.png" alt="">
            <span id="user_name"> {{loggedUser}} </span>
          </span>
          <ul class="pure-menu-children">
            <li class="pure-menu-item"><a :href="memberCenter + '/uc/company/login'" class="pure-menu-link">会员中心</a></li>
            <li class="pure-menu-item"><span @click="logout" class="pure-menu-link">注销</span></li>
          </ul>
        </li>
        <li class="pure-menu-item login-status-out">
          <a class="pure-menu-link no-highlight" :href="memberCenter + '/uc/company/login'">登录</a>
        </li>
        <li class="pure-menu-item login-status-out">
          <a class="pure-menu-link no-highlight" :href="memberCenter + '/uc/company/register'">注册</a>
        </li>
        <li v-if="false" class="pure-menu-item pure-menu-has-children pure-menu-allow-hover" id="i18n_con">
          <span class="pure-menu-link link-i18n">{{ lang.title }}</span>
          <ul class="pure-menu-children">
            <li class="pure-menu-item" v-for="_lang in allLangs">
              <span @click="changeLang(_lang)" class="pure-menu-link" :class="{hidden: true || lang.name == _lang.name}">{{ _lang.title }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import SearchDrop from '@/components/partials/SearchDrop'
  import AppConfig from '@/app.config'

  export default {
    name: 'app-header',
    data () {
      return {
        allLangs: [
          { name: 'zh_CN', title: '简体中文' },
          { name: 'zh_TW', title: '繁體中文' },
          { name: 'en_US', title: 'English' }
        ],
        lang: { name: 'zh_CN', title: '简体中文' },
        smallerHeader: false,
        memberCenter: AppConfig.memberSite,
        loggedIn: false,
        loggedUser: '我的鉴真宝'
      }
    },
    components: {
      SearchDrop
    },
    methods: {
      changeLang: function (_lang) {
        this.lang = _lang
        this.$i18n.locale = _lang.name
      },
      loginCheck: function () {
        axios.get(this.memberCenter + 'LoginVerify', {withCredentials: true})
        .then(function (resp) {
          this.loggedIn = resp.data && resp.data.isLogin && resp.data.UserName
          this.loggedUser = this.loggedIn ? resp.data.UserName : ''
        }.bind(this))
        .catch(function (err) {
          console.error(err)
        })
      },
      handleScroll: function () {
        if (window.pageYOffset > 40) {
          this.smallerHeader = true
        } else {
          this.smallerHeader = false
        }
      },
      logout: function () {
        axios.post(this.memberCenter + 'LogOff_Origin',
          '',
          { withCredentials: true }
        )
        .then(function (resp) {
          this.loggedIn = false
          this.loggedUser = '我的鉴真宝'
        }.bind(this))
        .catch(function (err) {
          console.error(err)
        })
      }
    },
    // For router's hash mode
    // watch: {
    //   $route: function () {
    //     console.log('scrolling')
    //     window.scrollTo(0, 0)
    //   }
    // },
    created () {
      // this.loginCheck()
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style scoped>
  .header {
    background-color: white;
    min-width: 1024px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 70px;
    transition: all .3s;
    border-bottom: 1px solid #e5e5e5;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
  }
  .pure-menu-horizontal {
    padding-left: 60px;
    position: relative;
  }
  #nav_logo {
    transition: all .3s;
  }
  #nav_logo img {
    height: 48px;
    transition: all .3s;
    vertical-align: middle;
  }
  .nav-left {
    margin-left: 20px;
    transition: all .3s;
  }
  .nav-left span.pure-menu-link {
    cursor: default;
  }
  .nav-right {
    position: absolute;
    right: 0;
    margin: 20px 60px 20px 0;
  }
  .nav-right span,
  .nav-right a {
    text-align: center;
    color: black;
    font-size: 0.8em;
    transition: all .3s;
  }
  .nav-right a.no-highlight {
    padding: .5em 1em .5em 0;
  }
  .nav-right span.pure-menu-link {
    cursor: pointer;
  }
  .nav-right span.pure-menu-link.non-clickale {
    cursor: default;
  }
  .link-i18n {
    background: #0071ff;
    padding: 0.25em 1em;
  }
  .pure-menu-list.nav-left {
    height: 70px;
    transition: all .3s;
  }
  .nav-left .pure-menu-children {
    top: 70px;
  }
  .pure-menu-list.nav-left>li>.pure-menu-link {
    color: black;
    padding: 22px 16px;
    transition: all .3s;
  }
  .pure-menu-link.active {
    color: white;
  }
  .pure-menu-link.link-i18n:hover, .pure-menu-link.link-i18n:focus{
    background: #0071ff;
  }
  .pure-menu-link:hover, .pure-menu-link:focus {
    background: inherit;
  }
  .pure-menu-children {
    min-width: 102px;
    text-align: center;
    box-shadow: 1px 2px 1px 1px rgba(171, 171, 171, 0.26);
  }
  .pure-menu-children .pure-menu-link {
    background-color: white;
    color: black;
  }
  .pure-menu-children .pure-menu-link:hover {
    background-color: #0071ff;
    color: white;
  }
  .pure-menu-horizontal .pure-menu-has-children > .pure-menu-link::after {
    content: "";
  }
  .pure-menu-has-children > .pure-menu-link::after {
    padding-left: 0;
  }
  #i18n_con {
    width: 80px;
  }
  #i18n_con .link-i18n {
    color: white;
  }
  #i18n_con .pure-menu-children {
    min-width: inherit;
    background-color: #4f8cd1;
    color: white;
    box-shadow: 0 0;
    border-radius: 2px;
  }
  #i18n_con .pure-menu-children .pure-menu-link:hover {
    background-color: #0071ff;
    color: white;
  }
  .pure-menu-horizontal .pure-menu-item.hidden {
    display: none;
  }
  #logout_btn {
    cursor: pointer;
    font-size: 0.8em;
  }

  .nav-right .login-status-in {
    display: none;
  }
  .nav-right .login-status-in .pure-menu-children {
    left: .8em;
  }
  .nav-right.logged-in .login-status-in {
    display: inline-block;
  }
  .nav-right .login-status-out {
    display: inline-block;
  }
  .nav-right.logged-in .login-status-out {
    display: none;
  }
  .nav-right #user_name {
    vertical-align: top;
    font-size: 1em;
    line-height: 25px;
  }

  /* Smaller header on scroll */
  .header-wrap.smaller {
    height: 40px;
  }
  .header-wrap.smaller .header {
    height: 40px;
  }
  .header-wrap.smaller #nav_logo {
    height: 24px;
    padding: 8px 23px;
  }
  .header-wrap.smaller #nav_logo img {
    height: 28px;
    width: auto;
  }
  .header-wrap.smaller .pure-menu-list.nav-left {
    height: 40px;
  }
  .header-wrap.smaller .pure-menu-list.nav-left > li > .pure-menu-link {
    padding: 8px 16px;
  }
  .header-wrap.smaller .nav-left .pure-menu-children {
    top: 40px;
  }
  .header-wrap.smaller .nav-right li span,
  .header-wrap.smaller .nav-right li .box-wrapper,
  .header-wrap.smaller .nav-right li a {
    height: 0;
    padding: 0;
    display: none;
  }
  .header-wrap {
    height: 70px;
    transition: all .3s;
  }

  #search_box {
    margin-right: 1em;
  }
</style>
