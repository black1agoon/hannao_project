<template>
  <div class="login-page">
    <div class="layer bg" id="login_bg"></div>
    <div class="layer flex-center">
      <div class="logo-group">
        <img src="../assets/img/hn.png" alt="logo">
      </div>
      <div class="form-group">
        <el-card>
          <el-form ref="loginForm" label-position="top" :rules="formRules" :model="formModel">
            <el-form-item prop="username">
              <el-input type="text" v-model="formModel.username" :placeholder="$t('app.username')"
                        @keyup.native.enter="focusNext">
                <i slot="prepend" class="el-icon-user"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input ref="password" type="password" v-model="formModel.password"
                        :placeholder="$t('app.password')" @keyup.native.enter="login">
                <i slot="prepend" class="el-icon-more"></i>
              </el-input>
            </el-form-item>
            <el-button @click="login" type="primary" class="button-login" :loading="loading">{{ $t('app.login') }}
            </el-button>
          </el-form>
        </el-card>
      </div>
    </div>
    <div class="version">v{{ version }}</div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { ElForm } from 'element-ui/types/form';
  import ParticlesJS from '@x23/particles.js';
  import particlesConfig from '@/config/particles.config';
  import { LoginModel } from '@/types';
  import { ElInput } from 'element-ui/types/input';

  export default Vue.extend({
    name: 'LoginView',

    data() {
      return {
        version: process.env.VUE_APP_VERSION,
        loading: false,
        particlesJs: new ParticlesJS(),
        formModel: {
          username: '',
          password: '',
        },
        formRules: {
          username: [
            { required: true, message: this.$t('app.loginView.rules.username'), trigger: 'blur' },
          ],
          password: [
            { required: true, message: this.$t('app.loginView.rules.password'), trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      login() {
        (this.$refs.loginForm as ElForm).validate((valid) => {
          if (valid) {
            const loginModel: LoginModel = {
              ...this.formModel,
              from: '0',
            };
            this.loading = true;
            this.$store.dispatch('user/login', loginModel).finally(() => {
              this.loading = false;
            });
          }
        });
      },
      focusNext () {
        (this.$refs.password as ElInput).focus()
      },
    },
    mounted() {
      this.particlesJs.init('login_bg', particlesConfig);
    },
    beforeDestroy() {
      this.particlesJs.destroy();
    },
  });
</script>

<style lang="sass">
  #app
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    height: 100%
    margin: 0
    padding: 0

    .login-page
      background-color: #EDF4FA
      height: 100%
      position: relative

    .version
      position: absolute
      top: 20px
      right: 20px
      color: darkgray

    .layer
      position: absolute
      height: 100%
      width: 100%

      &.flex-center
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center

      .logo-group
        margin-top: -145px
        position: relative
        top: 60px

        img
          height: 140px

      .form-group
        width: 300px

        .el-card
          box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5)

          &.is-always-shadow
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5)

          .el-card__body
            padding-top: 70px

        .button-login
          width: 100%
</style>

