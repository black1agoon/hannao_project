<template>
  <div class="header" ref="header">
    <div class="content" ref="navMenu">
      <div class="logo" @click="go2index"></div>
      <div class="name" @click="go2index">
        服装工业互联网平台
        <!--<div class="board">-->
          <!--<a target="_blank" href="http://cloud.hnao.cn/dashboard/">优羽服装工业云平台</a>-->
        <!--</div>-->
      </div>
      <ul class="title">
        <li v-for="(item, index) in menu" :key="index">
          <router-link v-if="item.link === '/development'" target="_blank" :to="item.link"><span>{{item.name}}</span></router-link>
          <router-link v-else-if="item.page" :to="item.link"><span>{{item.name}}</span></router-link>
          <router-link v-else :to="item.link"><span>{{item.name}}</span></router-link>
          <ul>
            <li v-for="(child, idx) in item.children" :key="idx">
              <router-link :to="child.link" v-show="child.title"><span>{{child.title}}</span></router-link>
              <ul v-for="(cld, i) in child.children" :key="i">
                <li>
                  <router-link v-if="index === 1 && idx === 0" :to="`/product/detail#product${cld.id}`">{{cld.title}}</router-link>
                  <router-link v-else-if="index === 1 && idx === 1" :to="`/product/software/${cld.catid}/${cld.id}`">{{cld.title}}</router-link>
                  <router-link v-else-if="index === 2 && idx === 0" :to="`/solution/field/${cld.catid}/${cld.id}`">{{cld.title}}</router-link>
                  <router-link v-else-if="index === 2 && idx === 1" :to="`/solution/field/${cld.catid}/${cld.id}`">{{cld.title}}</router-link>
                  <router-link v-else-if="index === 3 && idx === 0" :to="`/application/detail/${cld.catid}/${cld.id}`">{{cld.title}}</router-link>
                  <router-link v-else-if="index === 3 && idx === 1" :to="`/solution/field/${cld.catid}/${cld.id}`">{{cld.title}}</router-link>
                  <router-link v-else-if="index === 5 && idx === 0" :to="`/platform/${cld.catid}`">{{cld.catname}}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <div class="user" v-if="username">
        <div class="icon"></div>
        <div class="username" @click="go2servicecenter">
        {{username}}
        </div>
        <div class="logout" @click="logout"></div>
      </div>
      <div class="register-login" v-else>
        <div class="register" @click="go2register">注册</div>
        <div class="login" @click="go2login">登录</div>
      </div>
    </div>
    <div class="up-icon-wrapper" ref="icon" @click="up2top">
      <span class="upheader"></span>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapState} from 'vuex'
  import {delCookie} from '../../assets/js/tools'

  export default {
    name: 'header-view',
    data() {
      return {
        menu: [
          {
            name: '主页',
            link: '/',
            children: []
          }, {
            name: '产品',
            link: '/product',
            children: [{
              title: '硬件',
              link: '/product#hardware',
              children: []
            }, {
              title: '软件',
              link: '/product#software',
              children: []
            }]
          }, {
            name: '解决方案',
            link: '/solution',
            children: [{
              title: '领域',
              link: '/solution#field',
              children: []
            }, {
              title: '行业',
              link: '/solution#industry',
              children: []
            }]
          }, {
            name: '应用市场',
            link: '/application',
            page: true,
            children: []
          }, {
            name: '需求广场',
            link: '/demand',
            page: true,
            children: []
          }, {
            name: '平台资讯',
            link: '/platform/',
            children: [{
              title: '',
              link: '',
              children: []
            }]
          }, {
            name: '开发者',
            link: '/development',
            children: []
          }, {
            name: '关于我们',
            link: '/about',
            children: []
          }
        ]
      }
    },
    computed: {
      ...mapState([
        'username'
      ])
    },
    methods: {
      logout() {
        this.$store.commit('REMOVE_USERNAME')
        delCookie('id')
        this.$router.push('/login')
      },
      up2top() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      },
      go2register() {
        this.$store.commit('HIDE_LOGIN')
        this.$router.push('/login')
      },
      go2login() {
        this.$store.commit('SHOW_LOGIN')
        this.$router.push('/login')
      },
      go2index() {
        this.$router.push('/')
      },
      go2servicecenter() {
        this.$router.push('/servicecenter')
      },
      getNavMenu() {
        api.getNavMenu().then(data => {
          // console.log(data)
          this.$store.commit('SET_MENU', data)
          window.localStorage.setItem('menu', JSON.stringify(data))
          this.menu[1].children[0].children = data[0][1]
          this.menu[1].children[1].children = data[1][2]
          this.menu[2].children[0].children = data[2][3]
          this.menu[2].children[1].children = data[3][4]
          // this.menu[3].children[0].children = data[4][5]
          // this.menu[3].children[1].children = data[5][6]
          this.menu[5].children[0].children = this.sortMenu(data[6][7])
          this.menu[5].link = this.menu[5].link + this.sortMenu(data[6][7])[0].catid
        })
      },
      sortMenu(array) {
        return array.sort((a, b) => a.catid - b.catid)
      }
    },
    mounted() {
      this.getNavMenu()
      let header = this.$refs.header
      let nav = this.$refs.navMenu
      let icon = this.$refs.icon
      window.addEventListener('scroll', () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop === 0) {
          nav.style.height = '60px'
          nav.style.lineHeight = '60px'
          header.style.background = 'rgba(0, 0, 0, .3)'
          icon.classList.remove('show')
        } else {
          nav.style.height = '40px'
          nav.style.lineHeight = '40px'
          header.style.background = 'rgba(0, 0, 0, 1)'
          icon.classList.add('show')
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header
    position: fixed
    top: 0
    z-index: 200
    width: 100%
    background: rgba(0, 0, 0, 0.3)
    line-height: 60px
    border-bottom: 1px solid rgba(255, 255, 255, 0.1)
    color: #ffffff
    &:hover
      background: rgba(0, 0, 0, 1) !important
    .content
      position: relative
      width: 1400px
      margin: 0 auto
      height: 60px
      transition: all .3s
      .logo
        position: absolute
        width: 130px
        height: 35px
        top: 50%
        transform: translateY(-50%)
        background-image: url("../../assets/img/logo.png")
        background-size: 130px 35px
        background-repeat: no-repeat
      .name
        position: absolute
        left: 150px
        top: 50%
        transform: translateY(-50%)
        font-size: 16px
        /*&:hover
          .board
            display: block
        &:hover::after
          content: ' '
          display: block
          margin-top: -3px
          width: 100%
          height: 3px
          background-image: linear-gradient(to left, #00A1FF, #0B62FF)
          background-repeat: no-repeat */
        .board
          width: 100%
          background: #000000
          text-align: center
          font-size: 14px
          position: absolute
          display: none
          a
            color: #ffffff
      .title
        position: absolute
        left: 300px
        width: 800px
        height: 100%
        display: flex
        & > li
          flex: 1
          cursor: pointer
          text-align: center
          margin: 0 12px
          box-sizing: border-box
          /*border-bottom: 3px solid #108CEE*/
          &:hover::after
            content: ' '
            display: block
            margin-top: -3px
            width: 100%
            height: 3px
            background-image: linear-gradient(to left, #00A1FF, #0B62FF)
            background-repeat: no-repeat
          &:hover > ul
            display: block
            white-space: nowrap
          & > a
            display: table
            width: 100%
            height: 100%
            color: #ffffff
            margin: 0 auto
            &:hover
              color: #108CEE
              /*+ ul
                display: block
                white-space: nowrap*/
          & > ul
            display: none
            position: absolute
            text-align: left
            line-height: 30px
            cursor: default
            background: #000000
            height: auto
            padding: 20px 0 30px
            box-shadow: 0 0 8px rgba(0, 0, 0, 1)
            &:hover
              display: block
              white-space: nowrap
            & > li
              display: inline-block
              min-width: 150px
              cursor: pointer
              vertical-align: top
              margin-left: 35px
              &:last-child > ul
                border-right: none
              a
                display: inline-block
                line-height: 30px
                font-size: 14px
                color: #00AAFF
              & > ul
                /*width: 170px*/
                padding-right: 35px
                border-right: 1px solid #535353
                li
                  a
                    font-size: 14px
                    color: #ffffff
                    line-height: 25px
                    &:hover
                      color: #00AAFF

      .user, .register-login
        width: 240px
        height: 40px
        position: absolute
        right: 0
        .icon
          display: inline-block
          width: 27px
          height: 27px
          background-image: url("../../assets/img/usericon.png")
          background-size: 27px 27px
          background-repeat: no-repeat
          vertical-align: middle
        .username
          margin: 0 10px
          width: 160px
          display: inline-block
          overflow: hidden
          vertical-align: bottom
          cursor: pointer
        .logout
          display: inline-block
          width: 18px
          height: 20px
          cursor: pointer
          background-image: url("../../assets/img/logout.png")
          background-size: 18px 20px
          background-repeat: no-repeat
          vertical-align: middle
      .register-login
        display: flex
        justify-content: center
        .register, .login
          width: 50px
          text-align: center
          cursor: pointer
          a
            color: #ffffff
    .up-icon-wrapper
      display: block
      position: fixed
      bottom: 100px
      right: 100px
      transform: scale(0)
      transition: all .3s
      &.show
        display: block
        transform: scale(1)
      .upheader
        display: block
        cursor: pointer
        width: 45px
        height: 45px
        background-image: url("../../assets/img/top.png")
        background-repeat: no-repeat
        background-size: 45px 45px
        &:active
          background-image: url("../../assets/img/top_active.png")
</style>