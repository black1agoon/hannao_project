<template>
  <div class="header-wrapper" ref="header">
    <div class="wrapper" ref="navMenu">
      <div class="logo" ref="logo"></div>
      <ul class="title">
        <li class="item">
          <a :href="serverURI" target="_blank">首页</a>
        </li>
        <li class="item">
          <span>解决方案</span>
          <ul class="child">
            <li>
              <a :href="serverURI + '/resolution/ecommerce'" target="_blank">物联网电子商务</a>
            </li>
            <li>
              <a :href="serverURI + '/resolution/traceability'" target="_blank">防伪溯源</a>
            </li>
            <li>
              <a :href="serverURI + '/resolution/intelligent'" target="_blank">智能制造</a>
            </li>
          </ul>

        </li>
        <li class="item">
          <a :href="serverURI + '/cooperation'" target="_blank">渠道合作</a>
        </li>
        <li class="item">
          <a :href="serverURI + '/company'" target="_blank">公司信息</a>
        </li>
        <li class="item">
          <a :href="serverURI + '/help/0'" target="_blank">帮助支持</a>
        </li>
      </ul>
      <div class="search">
        <search-drop>
        </search-drop>
      </div>
      <div class="login">
        <a href="/uc/company/login">登录</a>
      </div>
      <div class="register">
        <a href="/uc/company/register" target="_blank">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchDrop from './SearchDrop'
  import config from '@/config'
  export default {
    name: 'header-page',
    components: {
      SearchDrop
    },
    data() {
      return {
        serverURI: config.serverURI
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
        background-image: url("../../assets/img/logo_header.png")
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
        margin-left: 260px
        font-size: 14px
        a
          color: #ffffff
      .register
        padding: 5px 20px
        color: #ffffff
        cursor: pointer
        margin-left: 30px
        font-size: 14px
        a
          color: #ffffff
</style>
