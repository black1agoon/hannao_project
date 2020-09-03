<template>
  <div class="header-wrapper" ref="header">
    <div class="wrapper" ref="navMenu">
      <div class="logo" ref="logo"></div>
      <ul class="title">
        <li class="item">
          <router-link to="/">首页</router-link>
        </li>
        <li class="item">
          <span>解决方案</span>
          <ul class="child">
            <li>
              <router-link to="/resolution/ecommerce">物联网电子商务</router-link>
            </li>
            <li>
              <router-link to="/resolution/traceability">防伪溯源</router-link>
            </li>
            <li>
              <router-link to="/resolution/intelligent">智能制造</router-link>
            </li>
          </ul>

        </li>
        <li class="item">
          <router-link to="/cooperation">渠道合作</router-link>
        </li>
        <li class="item">
          <router-link to="/company">公司信息</router-link>
        </li>
        <li class="item">
          <router-link to="/help/0">帮助支持</router-link>
        </li>
      </ul>
      <div class="search">
        <search-drop>
        </search-drop>
      </div>
      <div class="login">
        <a href="https://www.jianzb.cn/uc/company/login">登录</a>
      </div>
      <div class="ontrial">
        <a href="https://www.jianzb.cn/uc/company/register">试用</a>
      </div>
      <div class="admin-center" @click="go2center">管理中心</div>
    </div>
  </div>
</template>

<script>
  import SearchDrop from './SearchDrop'
  export default {
    name: 'header-page',
    components: {
      SearchDrop
    },
    methods: {
      go2center() {
        if (window.localStorage) {
          window.localStorage.setItem('system', JSON.stringify({
            company: {}
          }))
        }
        window.open('https://www.jianzb.cn/uc')
        // window.open('http://192.168.2.111:8090/uc')
      }
    },
    mounted() {
      let nav = this.$refs.navMenu
      let logo = this.$refs.logo
      window.addEventListener('scroll', () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop === 0) {
          nav.style.height = '75px'
          logo.style.transform = 'scale(1)'
        } else {
          nav.style.height = '40px'
          logo.style.transform = 'scale(.6)'
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header-wrapper
    width: 100%
    background: rgba(20, 22, 33, .14)
    position: fixed
    top: 0
    transition: all .2s
    z-index: 200
    .wrapper
      width: 1200px
      height: 75px
      margin: 0 auto
      display: flex
      align-items: center
      transition: all .2s
      /*justify-content: space-between*/
      .logo
        width: 46px
        height: 59px
        background-image: url("../../assets/img/logo.png")
        background-size: 46px 59px
        background-repeat: no-repeat
        transition: all .2s
      .title
        display: flex
        width: 520px
        margin-left: 20px
        .item
          flex: 1
          height: 40px
          line-height: 40px
          text-align: center
          font-size: 14px
          position: relative
          &:hover
            span
              background: #ffffff
              color: #3CB8DF
            .child
              display: block
          a, span
            color: #ffffff
            width: 100%
            height: 40px
            display: inline-block
          .child
            display: none
            width: 100%
            position: absolute
            background: #ffffff
            &
              li:hover
                a
                  color: #9DA2A5
            a
              color: #595961
      .search
        width: 150px
        height: 25px
        margin-left: 20px
      .login
        padding: 5px 20px
        color: #ffffff
        cursor: pointer
        margin-left: 180px
        font-size: 14px
        a
          color: #ffffff
      .ontrial
        width: 71px
        height: 26px
        background: #ffffff
        color: #2B2555
        text-align: center
        line-height: 26px
        border: 1px solid #ffffff
        border-radius: 2px
        margin: 0 32px 0 10px
        font-size: 14px
        &:hover
          cursor: pointer
          color: #ffffff
          background: none
          a
            color: #ffffff
        a
          color: #2B2555
      .admin-center
        width: 71px
        height: 26px
        text-align: center
        line-height: 26px
        border: 1px solid #ffffff
        color: #ffffff
        border-radius: 2px
        font-size: 14px
        &:hover
          cursor: pointer
          color: #2B2555
          background: #ffffff
          a
            color: #2B2555
        a
          color: #ffffff
</style>