<template>
  <div class="main-list">

    <div id="search_bg" class="full-bg hg-43">
      <div class="search-con bg-item bg-top">
        <div class="input-row">
          <input v-model="tel" type="text" placeholder="请留下您的手机号码">
          <button @click="submit">提交</button>
        </div>
        <div class="suggestion-row">
          <div class="suggest-word">业务咨询</div>
          <div class="suggest-word">商务合作</div>
          <div class="suggest-word">线下考察</div>
          <div class="suggest-word">产品疑问</div>
        </div>
      </div>
    </div>

    <div class="container" id="ld_con">
      <div class="pure-g bg-xs">
        <div class="pure-u-1-3 bg-title tab" @click="changeTab(1)"
             :class="{active: active_tab === 1}">鉴真宝与传统防伪对比</div>
        <div class="pure-u-1-3 bg-title tab" @click="changeTab(2)"
             :class="{active: active_tab === 2}">鉴真宝应用领域</div>
        <div class="pure-u-1-3 bg-title tab" @click="changeTab(3)"
             :class="{active: active_tab === 3}">鉴真宝其他功能</div>
      </div>
      <div class="bg-slide hg-34">
        <div id="ld_img1" class="ld-img full-bg" :class="{'hide-left': active_tab > 1}">
          <div class="bg-con bg-con-middle bg-left bg-item">
            <div class="bg-content">
              <h3>鉴真宝防伪 VS 传统防伪</h3>
              <span class="after-title">激光防伪、纹理防伪、查询式防伪、二维码防伪等</span>
              <div class="left-col">
                <p><span class="li-id">1</span>利用普及的智能手机NFC功能进行防伪，简单易操作</p>
                <p><span class="li-id">2</span>商标应用国密技术加密，难以破解</p>
                <p><span class="li-id">3</span>智能商标的RFID芯片具有全球唯一ID号，难以复制</p>
                <p><span class="li-id">4</span>鉴真宝云平台与公安部第三研究所共同建设，数据安全可靠</p>
              </div>
              <div class="right-col">
                <p><span class="li-id">1</span>消费者识别难度大，程序繁琐，操作复杂</p>
                <p><span class="li-id">2</span>传统防伪应用领域狭窄</p>
                <p><span class="li-id">3</span>二维码易被复制仿造，造成溯源数据的真伪难辨，很难实现防伪</p>
              </div>
            </div>
          </div>
        </div>
        <div id="ld_img2" class="ld-img full-bg"
                          :class="{'hide-left': active_tab > 2, 'hide-right': active_tab < 2}">
          <div class="bg-con bg-con-middle bg-left bg-item">
            <div class="bg-content">
              <p>鉴真宝不但适用于奢侈品领域的防伪（如：珠宝、字画、服装、箱包、食品、药品、证件），而且还可以广泛应用于日常消费领域的品质溯源。</p>
            </div>
          </div>
        </div>
        <div id="ld_img3" class="ld-img full-bg"
                          :class="{'hide-right': active_tab < 3}">
          <div class="bg-con bg-con-middle bg-left bg-item">
            <div class="bg-content">
              <p>鉴真宝对于可鉴定的产品可以线下体验线上购物，食品类产品还会随着保质期的临近自动进行打折处理，推荐自己的产品给好友时可附带祝福语！</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sub-section" id="service_con">
      <div class="section-title">
        <h1>我们为您提供的服务远远不止这些</h1>
      </div>
      <div class="bg-grid">
        <div class="bg-grid-1-3">
          <div class="img-con">
            <img src="/static/img/service/icon1.png" alt="">
          </div>
          <div class="desc-con">
            <h4>01.投诉方式</h4>
            <p>在8小时内响应客户投诉，24小时内向客户提交针对投诉的“投诉报告”。</p>
          </div>
        </div>
        <div class="bg-grid-1-3">
          <div class="img-con">
            <img src="/static/img/service/icon2.png" alt="">
          </div>
          <div class="desc-con">
            <h4>02.问题回答</h4>
            <p>回答客户提出的相关问题。</p>
          </div>
        </div>
        <div class="bg-grid-1-3">
          <div class="img-con">
            <img src="/static/img/service/icon3.png" alt="">
          </div>
          <div class="desc-con">
            <h4>03.客户委托</h4>
            <p>客户委托连接器测试及提供相关技术报告。</p>
          </div>
        </div>
      </div>
      <div class="bg-grid">
        <div class="bg-grid-1-3">
          <div class="img-con">
            <img src="/static/img/service/icon4.png" alt="">
          </div>
          <div class="desc-con">
            <h4>04.技术提供</h4>
            <p>提供技术资料，系统和仪器资料。</p>
          </div>
        </div>
        <div class="bg-grid-1-3">
          <div class="img-con">
            <img src="/static/img/service/icon5.png" alt="">
          </div>
          <div class="desc-con">
            <h4>05.售后支持</h4>
            <p>提供相关连接器性能和使用培训。</p>
          </div>
        </div>
        <div class="bg-grid-1-3">
          <div class="img-con">
            <img src="/static/img/service/icon6.png" alt="">
          </div>
          <div class="desc-con">
            <h4>06.客户满意</h4>
            <p>月度客户满意度调查。</p>
          </div>
        </div>
      </div>
      <div class="bg-grid">
        <div class="bg-grid-1-3">
          <div class="img-con">
            <img src="/static/img/service/icon7.png" alt="">
          </div>
          <div class="desc-con">
            <h4>07.客户评估</h4>
            <p>客户需求评估及确定客户需求。</p>
          </div>
        </div>
        <div class="bg-grid-2-3">
          <div class="img-con">
            <img src="/static/img/service/icon8.png" alt="">
          </div>
          <div class="desc-con">
            <h4>08.投诉处理</h4>
            <p>处理消费者来信来访以及电话投诉意见，解答消费者的咨询。同时用各种方式征集消费者对产品质量的意见，并根据情况及时改进。</p>
          </div>
        </div>
      </div>
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
    name: 'service-page',
    data () {
      return {
        show_modal: false,
        submit_status: 0,
        message: '',
        active_tab: 1,
        tel: ''
      }
    },
    methods: {
      changeTab: function (tabIdx) {
        this.active_tab = tabIdx
      },
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
  /* search */
  #search_bg {
    background-image: url('/static/img/service/bg.jpg');
  }
  #search_bg::before {
    background-color: rgba(0, 0, 0, 0.1);
  }
  #search_bg .bg-top {
    width: 100%;
    top: 25%;
  }
  #search_bg .input-row {
    width: 60%;
  }
  #search_bg .input-row input {
    width: 80%;
    height: 32px;
    padding-left: 12px;
    border-radius: 2px;
    border: none;
  }
  #search_bg .input-row input:focus {
    box-shadow: inset 0 0 2px 0px #129FEA;
    border-radius: 3px;
  }
  #search_bg .input-row button {
    height: 36px;
    width: 17%;
    background: #048ef3;
    border: none;
    color: white;
    border-radius: 2px;
  }

  #search_bg .suggestion-row {
    padding-left: 20%;
    padding-top: 8px;
    color: white;
    width: 60%;
  }

  .suggest-word {
    display: inline-block;
    padding-left: 12px;
  }

  .hg-34 {
    padding-bottom: 34.16%;
  }
  .hg-43 {
    padding-bottom: 43.5%;
  }

  .input-row {
    margin: 0 auto;
  }


  /* vs container */

  #ld_con .tab {
    text-align: center;
  }
  #ld_con .bg-title.tab {
    color: black;
    margin: 0;
    padding: 10px 0;
    cursor: pointer;
  }
  #ld_con .bg-title.tab.active {
    background-color: #013D73;
    color: white;
  }

  #ld_img1 .bg-con {
    width: 90%;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
  #ld_img1 .bg-content h3 {
    text-align: center;
    font-size: 36px;
    margin-bottom: 0;
    margin-top: 0;
    padding-right: 3em;
  }
  #ld_img1 .bg-content .after-title {
    font-size: 13px;
  }
  .bg-content p {
    line-height: 33px;
  }
  #ld_img1 .bg-content p {
    margin: 0;
  }
  .bg-content {
    color: white;
  }
  .bg-content .li-id {
    font-size: 32px;
    padding-right: 6px;
  }


  #ld_img1 {
    background-image: url("/static/img/service/img1.jpg");
  }
  #ld_img2 {
    background-image: url("/static/img/service/img2.jpg");
  }
  #ld_img3 {
    background-image: url("/static/img/service/img3.jpg");
  }

  .bg-content .left-col,
  .bg-content .right-col {
    float: left;
    width: 50%;
    padding-top: 40px;
  }

  /* service */
  #service_con {
    width: 90%;
    margin: 36px auto;
  }
  #service_con h1 {
    margin: 60px 0 40px;
  }
  #service_con .bg-grid-1-3,
  #service_con .bg-grid-2-3 {
    position: relative;
    margin-bottom: 32px;
    min-height: 102px;
  }
  #service_con .bg-grid .img-con {
    width: 16%;
    height: 16%;
    float: left;
  }
  #service_con .bg-grid .bg-grid-2-3 .img-con {
    width: 8%;
    height: 8%;
  }
  #service_con .bg-grid img {
    max-width: 48px;
    max-height: 48px;
    margin: 0 auto;
    display: block;
  }
  #service_con .bg-grid .bg-grid-2-3 .desc-con {
    width: 84%;
    padding: 0 1.5%;
  }
  #service_con .bg-grid .desc-con {
    width: 74%;
    display: inline-block;
    padding: 0 3%;
  }
  #service_con .bg-grid .desc-con h4 {
    margin: 0 0 8px;
  }
  #service_con .bg-grid .desc-con p {
    margin: 0;
    line-height: 24px;
  }

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
</style>
