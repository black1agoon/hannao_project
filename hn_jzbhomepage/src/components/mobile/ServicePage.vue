<template>
  <div id="mobile_app">

    <div class="afe-logo">
      <img src="/static/img/mobile/afe.logo.jpg" alt="AFE.国际品牌计划">
    </div>

    <div class="pure-form">
      <input v-model="tel" type="text" placeholder="请留下您的手机号码">
      <button class="pure-button pure-button-primary" @click="submit">提交</button>
    </div>

    <div id="submit_overlay" v-if="show_modal" @click="showModal(false)">
      <div class="modal">
        <div class="modal-header">
        </div>
        <div class="modal-content">
          <i class="icomoon icomoon-check-circle" v-if="submit_status > 0" aria-hidden="true"></i>
          <i class="icomoon icomoon-times-circle" v-if="submit_status < 0" aria-hidden="true"></i>
        </div>
        <div class="modal-footer">
          <span>{{message}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import AppConfig from '@/app.config'
  import AppService from '@/app.service'

  export default {
    name: 'service-page-m',
    data () {
      return {
        show_modal: false,
        submit_status: 0,
        message: '',
        tel: ''
      }
    },
    methods: {
      showModal: function (show, success, msg) {
        this.show_modal = show
        if (show) {
          this.submit_status = success || -1
        } else {
          this.submit_status = 0
        }
        if (msg) {
          this.message = msg
        }
      },
      submit: function () {
        if (!AppService.phoneNumber(this.tel)) {
          this.showModal(true, -1, '号码格式不正确')
          return
        }
        var _tel = '📞 ' + this.tel
        axios.post(AppConfig.api('forms', 'supports'), {
          __csrf: AppConfig.supportsCsrf,
          form: {
            tel: _tel
          }
        })
        .then(function (resp) {
          this.showModal(true, 1, '已完成')
        }.bind(this))
        .catch(function (err) {
          this.showModal(true, -1, '提交失败')
          console.log(err)
        }.bind(this))
      }
    }
  }
</script>

<style scoped>

  @keyframes fall-in {
    0% {
      -ms-transform: scale(3, 3);
      -webkit-transform: scale(3, 3);
      transform: scale(3, 3);
      opacity: 0;
    }
    50% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
    60% {
      -ms-transform: scale(1.1, 1.1);
      -webkit-transform: scale(1.1, 1.1);
      transform: scale(1.1, 1.1);
    }
    100% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
  #submit_overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  #submit_overlay .modal {
    width: 200px;
    background-color: white;
    box-shadow: 0 0 84px 0 gray;
    border-radius: 4px;
    margin: 0 auto;
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
    text-align: center;
  }
  #submit_overlay .icomoon {
    font-size: 84px;
    color: #4caf50;
    animation: fall-in 0.75s;
    text-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  }
  #submit_overlay .icomoon-times-circle {
    color: #d40f0f;
  }
  .modal .modal-header,
  .modal .modal-footer {
    padding: 20px;
  }

  .afe-logo {
    text-align: center;
  }
  .afe-logo img {
    max-width: 100%;
  }
  .pure-form input,
  .pure-form button {
    max-width: 540px;
    width: 80%;
    display: block;
    margin: 20px auto;
  }
</style>
