<template>
  <div class="login-page">
    <header-page>
    </header-page>
    <div class="center">
      <video class="video"
             type="video/mp4"
             autoplay
             muted
             loop
             src="http://media.jianzb.cn/sp/0822/10339.mp4">
      </video>
      <div class="float-fonts">
        <p class="one">仅为诚信企业服务</p>
        <p class="two">只对优质品牌负责</p>
      </div>
      <div class="form-wrapper">
        <p class="title">登录</p>
        <div class="form">
          <div class="username">
            <input type="text" v-model="formLogin.username" placeholder="账号"/>
            <i class=""></i>
          </div>
          <div class="password">
            <input type="password" v-model="formLogin.password" placeholder="密码"/>
            <i class=""></i>
          </div>
        </div>
        <div class="remember">
          <input type="checkbox" id="rem" spellcheck="false">
          <label for="rem" @click="toggleChecked">记住账号</label>
        </div>
        <el-button @click="submit"  class="button-login" :loading="loading">登&nbsp;录
        </el-button>
      </div>
      <div class="qr-code">
        <div class="code"></div>
        <div class="font">扫描并关注<br>鉴真宝</div>
      </div>
    </div>
    <div class="footer">
      <div class="news-wrap">
        <div class="news"
             v-for="(news, index) in newsList"
             :key="index">
          <div class="title">
            <a target="_blank" :href="serverURI + '/company/news/detail/' + news.id">{{news.title}}</a>
          </div>
          <div class="date">{{news.createTime.substr(0, 10)}}</div>
        </div>
      </div>
      <div class="inscribe">
        <span class="reserved">浙ICP备11062748号-4©2019鉴正宝信息技术有限公司&nbsp;&nbsp;All rights reserved.</span>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import HeadMenu from '@/app/company/register/header/HeadMenu'
  import HeaderPage from './common/Header'
  import axios from 'axios'
  import config from '@/config'
  export default {
    name: 'company-login',
    components: {
      HeaderPage,
      HeadMenu
    },
    data() {
      return {
        loading: false,
        formLogin: {
          username: null,
          password: null
        },
        query: {
          newsCategoryId: '6ccd4f8c3c814463880b918fda23ca95',
          page: 1,
          pageSize: 3
        },
        newsList: [],
        serverURI: config.serverURI
      }
    },
    methods: {
      submit() {
        let usermsg = {
          from: '0',
          username: this.formLogin.username,
          password: this.formLogin.password
        }
        if (!usermsg.username) {
          this.$message.error('请填写用户名')
        } else if (!usermsg.password) {
          this.$message.error('请填写密码')
        } else {
          this.loading = true
          api.companyPublic.login(usermsg).then((data) => {
            this.loading = false
            let token = data.token
            let menus = data['permissionList']
            let dashboards = data['dashboardTemplate'] || []
            this.$store.commit('SET_USER', usermsg.username)
            this.$store.commit('SET_TOKEN', token)
            this.$store.commit('SET_MENUS', menus)
            this.$store.commit('SET_DASHBOARDS', dashboards)
            this.$store.commit('SET_SYSTYPE', 'company')

            let system = JSON.parse(window.localStorage.getItem('system')) || {}
            system['company'] = {
              token: token,
              menus: menus,
              dashboards: dashboards,
              username: usermsg.username
            }
            window.localStorage.setItem('system', JSON.stringify(system))
            window.sessionStorage.setItem('systype', 'company') // session中保存当前 系统
            this.$router.push('/')
          }).catch(() => {
            this.loading = false
          })
        }
      },
      toggleChecked() {
        let checked = window.localStorage.getItem('checked') || 'false'
        let checkbox = document.getElementById('rem')
        if (checked === 'true') {
          checkbox.checked = true
          window.localStorage.setItem('checked', 'false')
        } else {
          checkbox.checked = false
          window.localStorage.setItem('checked', 'true')
        }
      },
      checked() {
        if (window.localStorage) {
          let checked = window.localStorage.getItem('checked') || 'false'
          let checkbox = document.getElementById('rem')
          if (checked === 'true') {
            checkbox.checked = true
          } else {
            checkbox.checked = false
          }
        }
      },
      showSaveUser() {
        let checked = window.localStorage.getItem('checked') || 'false'
        if (checked === 'true') {
          let username = window.localStorage.getItem('user') || null
          if (username) {
            this.formLogin.username = JSON.parse(username).username
          }
        }
      },
      getNews() {
        axios({
          method: 'post',
          url: this.serverURI + '/pac/news/frontPage',
          data: this.query
        }).then(res => {
          if (res.status === 200 && res.data.code === '00') {
            this.newsList = res.data.data.records
          } else {
            this.newsList = []
          }
        })
      }
    },
    mounted() {
      this.checked()
      this.showSaveUser()
      this.getNews()
    },
    beforeDestroy() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login-page
    position: absolute
    width: 100%
    height: 100%
    min-width: 1440px
    min-height: 700px
    background-color: #ffffff
    margin: 0 auto
    .center
      width: 100%
      height: 100%
      position: relative
      overflow: hidden
      .video
        width: 100%
        object-fit: contain
      .float-fonts
        position: absolute
        top: 300px
        left: 10%
        color: #ffffff
        font-size: 36px
        line-height: 72px
        .two
          margin-left: 130px
      .form-wrapper
        position: absolute
        border-radius: 5px
        width: 520px
        height: 353px
        background: #ffffff
        top: 165px
        right: 300px
        padding: 40px
        box-sizing: border-box
        .title
          font-size: 28px
          font-weight: bold
          height: 40px
          color: #2F537F
        .form
          margin-top: 30px
          border: 1px solid #eeeeee
          border-radius: 5px
          /*height: 106px*/
          .username
            height: 64px
            border-bottom: 1px solid #eeeeee
            position: relative
            input
              width: 360px
              height: 37px
              outline: none
              margin: 13px 0 0 50px
              background-color: #ffffff
            i
              position: absolute
              width: 20px
              height: 23px
              color: #eeeeee
              background-image: url("../assets/img/user.png")
              background-size: 20px 23px
              background-repeat: no-repeat
              top: 21px
              left: 18px
          .password
            height: 53px
            position: relative
            input
              width: 360px
              height: 37px
              outline: none
              margin: 8px 0 0 50px
            i
              position: absolute
              width: 20px
              height: 23px
              color: #eeeeee
              background-image: url("../assets/img/lock.png")
              background-size: 20px 23px
              background-repeat: no-repeat
              top: 15px
              left: 15px
        .remember
          margin-top: 45px
          height: 20px
          input[type=checkbox]
            display: none
            visibility: hidden
          label
            font-size: 14px
            margin-left: 5px
            color: #2F537F
          input[type=checkbox]:checked + label:before
            background-image: url("../assets/img/loginlabel.png")
            background-color: rgb(3, 169, 245)
            border-color: rgb(3, 169, 245)
            background-repeat: no-repeat
            background-size: 13px 13px

          input[type="checkbox"] + label:before
            display: inline-block
            content: ""
            margin: 0 15px 3px 0px
            width: 13px
            height: 13px
            background-color: #fff
            border: 2px solid #3A95D3
            border-radius: 2px
            vertical-align: middle
        .button-login
          position: absolute
          right: 40px
          bottom: 40px
          width: 148px
          height: 45px
          background: #3A95D3
          color: #ffffff
          font-size: 21px
          padding: 0
      .qr-code
        position: absolute
        border-radius: 5px
        overflow: hidden
        top: 165px
        right: 158px
        width: 135px
        height: 178px
        background: #ffffff
        .code
          width: 135px
          height: 135px
          background-image: url("../assets/img/qrcode.png")
          background-size: 135px 135px
          background-repeat: no-repeat
        .font
          font-size: 14px
          line-height: 18px
          color: #353535
          text-align: center
    .footer
      width: 1200px
      left: 50%
      transform: translateX(-50%)
      position: absolute
      bottom: 10px
      .news-wrap
        display: flex
        padding-top: 20px
        border-top: 1px solid #ffffff
        .news
          width: 380px
          margin-right: 20px
          &:last-child
            margin-right: 0
          .title
            font-size: 16px
            white-space: nowrap
            overflow: hidden
            text-overflow: ellipsis
            a
              color: #ffffff
          .date
            margin-top: 11px
            font-size: 14px
            color: #9F9F9F
      .inscribe
        margin: 40px 0 10px
        text-align: center
        color: #9F9F9F
        font-size: 14px

  ::-webkit-scrollbar
    width: 10px
    height: 10px
  input:-webkit-autofill
    -webkit-box-shadow: 0 0 0 1000px #fff inset
</style>

