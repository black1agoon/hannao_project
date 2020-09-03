<template>
  <div class="wrapper">
    <div class="bg">
      <div class="copyright">2019 版权所有：浙江汉脑数码科技有限公司</div>
    </div>
    <div v-show="showlogin" class="form">
      <div class="title">登录</div>
      <div class="register" @click="showRegister">免费注册</div>
      <div class="username">
        <i class=""></i>
        <input type="email"  v-model="formLogin.username" placeholder="账号"/>
      </div>
      <div class="password">
        <i class=""></i>
        <input @focus="clearErrMsg" type="password"  v-model="formLogin.password" placeholder="密码"/>
      </div>
      <div class="error">{{errorMsg}}</div>
      <div class="remember">
        <input type="checkbox" id="rem" spellcheck="false">
        <label for="rem" @click="toggleChecked">记住账号</label>
      </div>
      <div class="submit" @click="submit">登录</div>
    </div>
    <div v-show="!showlogin" class="register-form" ref="register">
      <div class="title">注册账号</div>
      <div class="show-login">已经有账号?<span @click="showLogin">登录</span></div>
      <div class="company">
        <i class=""></i>
        <input type="text" @blur="validate" v-model="formRegister.company" data-prop="company" placeholder="输入公司名"/>
      </div>
      <div class="error">{{error2Msg.company}}</div>
      <div class="username">
        <i class=""></i>
        <input type="text" @blur="validate" v-model="formRegister.username" data-prop="username" placeholder="输入注册邮箱"/>
      </div>
      <div class="error">{{error2Msg.username}}</div>
      <div class="mobile">
        <i class=""></i>
        <input type="text" @blur="validate" v-model="formRegister.mobile" data-prop="mobile" placeholder="输入联系电话"/>
      </div>
      <div class="error">{{error2Msg.mobile}}</div>
      <div class="password">
        <i class=""></i>
        <input type="password" @blur="validate" data-prop="password"  v-model="formRegister.password" placeholder="输入密码"/>
      </div>
      <div class="error"></div>
      <div class="repassword">
        <i class=""></i>
        <input  type="password" @blur="validate"  v-model="formRegister.repassword" data-prop="repassword" placeholder="确认密码"/>
      </div>
      <div class="error">{{error2Msg.repassword}}</div>
      <div class="submit" @click="register">注册</div>
    </div>
    <prompt-window ref="window" :options="windowOptions"></prompt-window>
  </div>
</template>

<script>
  import api from '@/api'
  import {setCookie, getCookie} from '@/assets/js/tools'
  import {mapState} from 'vuex'
  import PromptWindow from './common/PromptWindow'
  export default {
    name: 'login',
    components: {
      PromptWindow
    },
    data() {
      return {
        formLogin: {
          username: null,
          password: null
        },
        formRegister: {
          company: null,
          username: null,
          mobile: null,
          password: null,
          repassword: null
        },
        errorMsg: null,
        isLogin: false,
        showSuccess: false,
        error2Msg: {
          company: null,
          username: null,
          mobile: null,
          password: null,
          repassword: null
        },
        windowOptions: {
          font: '注册成功',
          icon: 'success'
        }
      }
    },
    computed: {
      ...mapState([
        'showlogin'
      ])
    },
    methods: {
      clearErrMsg() {
        this.errorMsg = null
      },
      submit() {
        api.login(this.formLogin).then(data => {
          console.log(data)
          if (data.code === '00') {
            this.$store.commit('SET_USERNAME', this.formLogin.username)
            window.localStorage.setItem('username', this.formLogin.username)
            setCookie('id', data.data.id)
            this.$router.push('/servicecenter')
          } else if (data.code === '99') {
            this.errorMsg = '请输入正确的账号密码！'
          }
        })
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
          let username = window.localStorage.getItem('username') || null
          if (username) {
            this.formLogin.username = username
          }
        }
      },
      showRegister() {
        this.$store.commit('HIDE_LOGIN')
      },
      showLogin() {
        this.$store.commit('SHOW_LOGIN')
      },
      validate(e) {
        this.rules(e.target.getAttribute('data-prop'))
      },
      rules(prop) {
        let rules = {
          company: () => {
            !this.formRegister[prop] ? this.error2Msg[prop] = '公司名称不能为空!' : this.error2Msg[prop] = ''
          },
          username: () => {
            if (!this.formRegister[prop]) {
              this.error2Msg[prop] = '企业邮箱不能为空!'
            } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.formRegister[prop])) {
              this.error2Msg[prop] = '请输入正确格式的邮箱!'
            } else {
              this.error2Msg[prop] = ''
            }
          },
          mobile: () => {
            if (!this.formRegister[prop]) {
              this.error2Msg[prop] = '联系电话不能为空!'
            } else {
              this.error2Msg[prop] = ''
            }
          },
          password: () => {
            if (!this.formRegister[prop]) {
              this.error2Msg[prop] = '密码不能为空!'
            } else {
              this.error2Msg[prop] = ''
              this.formRegister.repassword && this.rules('repassword')
            }
          },
          repassword: () => {
            if (!this.formRegister.repassword) {
              this.error2Msg[prop] = '请确认密码!'
            } else if (this.formRegister.password !== this.formRegister.repassword) {
              this.error2Msg[prop] = '两次密码不一致!'
            } else {
              this.error2Msg[prop] = ''
            }
          }
        }
        rules[prop].call(this)
      },
      register() {
        let inputs = this.$refs.register.getElementsByTagName('input')
        for (let i = 0; i < inputs.length; i++) {
          this.validate({target: inputs[i]})
        }
        if (!Object.keys(this.error2Msg).find(key => this.error2Msg[key])) {
          api.register(this.formRegister).then(data => {
            if (data.code === '00') {
              this.windowOptions.font = '注册成功'
              this.windowOptions.icon = 'success'
              this.$refs.window.show()
            } else {
              this.windowOptions.font = data.data
              this.windowOptions.icon = 'error'
              this.$refs.window.show()
            }
          }).catch(() => {})
        }
      }
    },
    mounted() {
      if (getCookie('id')) {
        this.$router.push('/servicecenter')  // 有登录id 就直接跳转到 服务中心
      }
      this.checked()
      this.showSaveUser()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapper
  min-width: 1400px
  height: 100vh
  background: #111822
  position: relative
  .bg
    position: relative
    min-width: 1400px
    height: 100%
    min-height: 720px
    background-image: url("../assets/img/loginpic.jpg")
    background-repeat: no-repeat
    background-size: cover
    .copyright
      position: absolute
      width: 100%
      font-size: 16px
      color: #ffffff
      text-align: center
      bottom: 86px
  .form
    position: absolute
    background: #0c182b
    width: 489px
    height: 306px
    top: 30%
    right: 220px
    box-shadow: 0 0 30px rgba(0, 160, 233, 1)
    color: #ffffff
    border-radius: 5px
    .title
      font-size: 20px
      margin: 24px 0 0 29px
    .register
      position: absolute
      font-size: 14px
      right: 32px
      top: 20px
      cursor: pointer
    .username
      width: 428px
      height: 54px
      margin: 22px auto 0
      border: 1px solid rgba(0, 160, 233, 1)
      border-radius: 5px 5px 0 0
      i
        background-image: url("../assets/img/user.png")
    .password
      width: 428px
      height: 54px
      margin: 0 auto
      border: 1px solid rgba(0, 160, 233, 1)
      border-top: 0
      border-radius: 0 0 5px 5px
      i
        background-image: url("../assets/img/lock.png")
    .username, .password
      i
        display: inline-block
        width: 54px
        height: 54px
        background-size: 54px 54px
        background-repeat: no-repeat
      input
        width: 370px
        vertical-align: top
        height: 54px
        background: #0c182b
        border: none
        outline: none
        color: #ffffff
        font-size: 16px
        text-decoration: none
    .error
      width: 428px
      height: 12px
      font-size: 12px
      color: #ff3366
      margin: 5px auto 0
    .remember
      width: 428px
      margin: 10px auto 0
      height: 20px
      user-select: none
      input[type=checkbox]
        display: none
        visibility: hidden
      label
        font-size: 14px
        color: #ffffff
      input[type=checkbox]:checked + label:before
        background-image: url("../assets/img/loginlabel.png")
        background-color: rgb(3, 169, 245)
        border-color: rgb(3, 169, 245)
        background-repeat: no-repeat
        background-size: 13px 13px

      input[type="checkbox"] + label:before
        display: inline-block
        content: ""
        margin: 0 15px 3px 0
        width: 13px
        height: 13px
        border: 1px solid #ffffff
        border-radius: 2px
        vertical-align: middle
    .submit
      width: 100px
      height: 36px
      line-height: 36px
      cursor: pointer
      border-radius: 5px
      text-align: center
      margin: 20px 0 0 30px
      box-shadow: 0 0 10px 3px rgba(0, 160, 233, 1)
      background-size: 100px 36px
      background-repeat: no-repeat
      &:hover
        background-image: url("../assets/img/loginhover.png")
  .register-form
    position: absolute
    background: #0c182b
    width: 489px
    height: 515px
    top: 20%
    right: 220px
    box-shadow: 0 0 30px rgba(0, 160, 233, 1)
    color: #ffffff
    border-radius: 5px
    .title
      font-size: 20px
      margin: 24px 0 10px 29px
    .show-login
      position: absolute
      font-size: 14px
      right: 32px
      top: 20px
      span
        color: rgba(0, 160, 233, 1)
        font-size: 14px
        cursor: pointer
        vertical-align: bottom
        margin-left: 5px
    .company, .username, .mobile, .password, .repassword
      width: 428px
      height: 54px
      margin: 0 auto
      border: 1px solid rgba(0, 160, 233, 1)
      border-radius: 5px
      i
        display: inline-block
        width: 54px
        height: 54px
        background-size: 54px 54px
        background-repeat: no-repeat
      input
        width: 370px
        vertical-align: top
        height: 54px
        background: #0c182b
        border: none
        outline: none
        color: #ffffff
        font-size: 16px
        text-decoration: none
    .company
      i
        background-image: url("../assets/img/user.png")
    .username
      i
        background-image: url("../assets/img/email.png")
    .mobile
      i
        background-image: url("../assets/img/mobile.png")
    .password
      i
        background-image: url("../assets/img/lock.png")
    .repassword
      i
        background-image: url("../assets/img/repassword.png")
    .error
      width: 428px
      height: 12px
      font-size: 12px
      color: #ff3366
      margin: 5px auto
    .submit
      width: 100px
      height: 36px
      line-height: 36px
      cursor: pointer
      border-radius: 5px
      text-align: center
      margin: 20px 0 0 30px
      box-shadow: 0 0 10px 3px rgba(0, 160, 233, 1)
      background-size: 100px 36px
      background-repeat: no-repeat
      &:hover
        background-image: url("../assets/img/loginhover.png")
</style>

<style scoped>
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(203, 203, 203, 1);
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(203, 203, 203, 1);
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(203, 203, 203, 1);
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(203, 203, 203, 1);
  }
</style>