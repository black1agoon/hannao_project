<template>
  <div class="temp">
    <div class="bottom" v-show="!(!productData.certificated && !inApp && !showBuyButton)">
        <!--  未被认证, 不在APP，(下架,buyUrl不存在)--- 则隐藏底部-->
        <div class="uncertificated1"
             v-if="productData.allowCertification && !productData.certificated && !showBuyButton && inApp">
          <!-- 未认证，允许被认证，不可购买,在app-->
          <div class="share" @click="share">
            <span class="icon"></span>
            <span class="font">分享</span>
          </div>
          <div class="bind">
            <div class="btn" @click="bind">认证绑定</div>
          </div>
        </div>
        <div class="uncertificated2"
             v-else-if="!productData.allowCertification && !productData.certificated && !showBuyButton">
          <!-- 未被认证， 不可认证，不可购买，在app-->
          <div class="share" v-show="inApp">
            <div class="btn" @click="share"><span class="icon"></span>分享</div>
          </div>
        </div>
        <div class="uncertificated3"
             v-else-if="!productData.allowCertification && !productData.certificated && showBuyButton">
          <!-- 未被认证， 不可认证，可购买-->
          <div class="share" @click="share" v-show="inApp">
            <span class="icon"></span>
            <span class="font">分享</span>
          </div>
          <div class="buy">
            <div class="btn" @click="buy">立即购买</div>
          </div>
        </div>
        <div class="uncertificated4"
             v-else-if="productData.allowCertification && !productData.certificated && showBuyButton">
          <!-- 未被认证， 可认证，可购买-->
          <div class="share" @click="share" v-show="inApp">
            <span class="icon"></span>
            <span class="font">分享</span>
          </div>
          <div class="buy">
            <div class="btn" @click="buy">立即购买</div>
          </div>
          <div class="bind" v-show="inApp">
            <div class="btn" @click="bind">认证绑定</div>
          </div>
        </div>
        <div class="has-certificated1"
             v-else-if="!productData.allowCertification && productData.certificated && !showBuyButton">
          <!-- 已被认证，不可购买-->
          <div class="hasdone">
            <span class="icon"></span>
            <span class="font">已认证</span>
          </div>
          <div class="share" v-show="inApp">
            <div class="btn" @click="share"><span class="icon"></span>分享</div>
          </div>
        </div>
        <div class="has-certificated2"
             v-else-if="!productData.allowCertification && productData.certificated && showBuyButton">
          <!-- 已被认证，可购买-->
          <div class="hasdone">
            <span class="icon"></span>
            <span class="font">已认证</span>
          </div>
          <div class="share" v-show="inApp">
            <div class="btn" @click="share"><span class="icon"></span>分享</div>
          </div>
          <div class="buy">
            <div class="btn" @click="buy">立即购买</div>
          </div>
        </div>
      </div>
    <div class="bottom" v-show="productData.status === 0 || productData.status === 99">
        <span class="unshelve">已下架</span>
      </div>
    <transition name="bind">
      <div class="bind-wrapper" v-show="bindShow">
        <div class="bind-mask" @click="hideBind"></div>
        <div class="form">
          <p class="title border-1px">填写绑定信息</p>
          <div class="item border-1px">
            <label>姓名</label>
            <input v-model="binddata.name" type="text" placeholder="归属人真实姓名信息">
          </div>
          <div class="item border-1px">
            <label>手机</label>
            <input v-model="binddata.mobile" class="tel" type="number" placeholder="请填写大陆手机号码">
            <span v-show="!countdownShow" class="send" @click="sendCode">发送验证码</span>
            <span class="send" v-show="countdownShow">
              <span class="count-down">
              </span>秒后再获取
            </span>
          </div>
          <div class="item border-1px">
            <label>验证码</label>
            <input v-model="binddata.vcode" type="text" placeholder="六位短信验证码">
          </div>
          <div class="btn" @click="sureBind">{{getBtnName}}</div>
        </div>
      </div>
    </transition>
    <div class="success-bind" v-show="successShow">
      <div class="form">
        <span class="success"></span>
        <span class="font">绑定成功</span>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/mobile/api'
  import {checkMobile} from '@/utils/util'
  import config from '@/config'
  import postObj from '../static/js/postMessage'
  const BINDDATA = {
    name: null,
    idNo: null,
    mobile: null,
    vcode: null
  }
  export default {
    name: 'product-temp3',
    components: {
    },
    props: {
      productData: {
        type: Object,
        default: () => ({})
      },
      idNo: String
    },
    computed: {
      getBtnName() {
        return this.loading ? '绑定中...' : '认证绑定'
      },
      showBuyButton() {
        return this.productData.status !== 0 && this.productData.status !== 99 && this.productData.buyUrl
      }
    },
    data() {
      return {
        binddata: {...BINDDATA},
        loading: false,
        inApp: this.$route.query.app,
        // inApp: true,
        bindShow: false,
        successShow: false,
        countdownShow: false,
        serverURI: config.serverURI
      }
    },
    methods: {
      bind() {
        this.bindShow = true
      },
      share() {
        postObj.postMsg({
          command: 'share',
          payload: {
            // title: `我向你推荐了一${this.productData.unit}${this.productData.typeName}，下单有优惠`,
            title: this.productData.name,
            text: '该产品已由鉴真宝防伪认证，智慧工厂源头生产，百分百正品保证。',
            imageUrl: this.productData.thumb
          }
        })
      },
      buy() {
        if (this.inApp) {
          postObj.postMsg({
            command: 'buy',
            payload: {
              url: this.productData.buyUrl,
              id: this.productData.id
            }
          })
        } else {
          window.open(this.productData.buyUrl)
        }
      },
      backFromBind() {
        this.bindShow = false
      },
      sureBind() {
        if (!this.binddata.name) {
          alert('归属人姓名不能为空!')
        } else if (!this.binddata.mobile) {
          alert('手机号码不能为空!')
        } else if (!this.binddata.vcode) {
          alert('验证码不能为空!')
        } else {
          this.loading = true
          this.binddata.idNo = this.idNo
          api.mobileProduct.checkMobileCertificationVCode(this.binddata).then(() => {
            this.loading = false
            this.bindShow = false
            this.successShow = true
            setTimeout(() => {
              this.successShow = false
            }, 1500)
            window.location.reload()
          }).catch(() => {
            this.loading = false
          })
        }
      },
      hideBind() {
        this.bindShow = false
      },
      sendCode() {
        if (checkMobile(this.binddata.mobile)) {
          this.countdownShow = true
          let countdown = document.getElementsByClassName('count-down')[0]
          let time = 60
          countdown.innerHTML = time
          let timer = setInterval(() => {
            time--
            if (time === 0) {
              clearInterval(timer)
              this.countdownShow = false
            } else {
              countdown.innerHTML = time
            }
          }, 1000)
          api.mobileProduct.sendMobileCertificationVCode(this.binddata.mobile).then(() => {
          })
        } else {
          alert('请输入正确的手机号码!')
        }
      }
    },
    mounted() {
    },
    beforeDestroy() {
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../static/stylus/mixin.styl'
  .temp
    width: 100%
    height: 100%
    .scroll
      background: #ffffff
      height: calc(100% - 60px)
      position: relative
      .img
        width: 100%
        height: 100vw
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
        img
          width: 100%
          height: 100%
    .bottom
      position: fixed
      z-index: 50
      width: 100%
      height: 50px
      line-height: 50px
      background: #ffffff
      bottom: 0
      .unshelve
        display: block
        margin: 5px auto
        width: 90%
        height: 40px
        line-height: 40px
        text-align: center
        background: #9B9B9B
        border-radius: 8px
        color: #ffffff
      .uncertificated1, .uncertificated2, .uncertificated3, .uncertificated4, .has-certificated1, .has-certificated2
        height: 50px
        display: flex
        justify-content: center
        align-items: center
      .uncertificated1, .uncertificated3, .uncertificated4
        .share
          flex: 0 0 30px
          height: 40px
          font-size: 0
          margin-left: 17px
          .icon
            display: block
            background-image: url("../static/img/share.svg")
            /*bg-image('../static/img/share') */
            margin: auto
            width: 24px
            height: 24px
            background-size: 24px 24px
            background-repeat: no-repeat
          .font
            display: block
            width: 24px
            height: 16px
            line-height: 16px
            font-size: 12px
            margin: auto
            color: rgba(0, 0, 0, .75)
      .uncertificated1
        .bind
          flex: 1
          .btn
            width: 90%
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #C6A46D
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
      .uncertificated2
        .share
          flex: 1
          .btn
            width: 90%
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #C6A46D
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
            .icon
              display: inline-block
              vertical-align: middle
              bg-image('../static/img/share1')
              width: 24px
              height: 24px
              background-size: 24px 24px
              background-repeat: no-repeat
              margin-right: 10px
      .uncertificated3
        .buy
          flex: 1
          .btn
            width: 90%
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #A44D34
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
      .uncertificated4
        .buy
          flex: 1
          margin: 0 5px
          .btn
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #A44D34
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
        .bind
          flex: 2
          .btn
            width: 92%
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #C6A46D
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
      .has-certificated1, .has-certificated2
        .hasdone
          flex: 0 0 60px
          height: 40px
          font-size: 0
          .icon
            display: block
            bg-image('../static/img/certificated')
            margin: auto
            width: 24px
            height: 24px
            background-size: 24px 24px
            background-repeat: no-repeat
          .font
            display: block
            width: 36px
            height: 16px
            line-height: 16px
            font-size: 12px
            margin: auto
            color: rgba(0, 0, 0, .75)
      .has-certificated1
        .share
          flex: 1
          .btn
            width: 95%
            height: 40px
            line-height: 40px
            text-align: center
            /*margin: auto*/
            background: #C6A46D
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
            .icon
              display: inline-block
              vertical-align: middle
              bg-image('../static/img/share1')
              width: 24px
              height: 24px
              background-size: 24px 24px
              background-repeat: no-repeat
              margin-right: 10px
      .has-certificated2
        .share
          flex: 0 0 85px
          .btn
            height: 40px
            line-height: 40px
            text-align: center
            /*margin: auto*/
            background: #C6A46D
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
            .icon
              display: inline-block
              vertical-align: middle
              bg-image('../static/img/share1')
              width: 24px
              height: 24px
              background-size: 24px 24px
              background-repeat: no-repeat
              margin-right: 10px
        .buy
          flex: 1
          .btn
            width: 90%
            height: 40px
            line-height: 40px
            text-align: center
            margin: auto
            background: #A44D34
            color: #fff
            font-size: 17px
            border-radius: 8px
            &:active
              opacity: 0.8
    .bind-wrapper
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 90
      transition: all 0.2s linear
      opacity: 1
      &.bind-enter, &.bind-leave-to
        opacity: 0
      .bind-mask
        width: 100%
        height: 100%
        background: rgba(4, 4, 15, 0.4)
      .form
        width: 90%
        height: 270px
        background: #ffffff
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
        border-radius: 6px
        padding: 0 15px
        box-sizing: border-box
        .title
          color: rgba(0, 0, 0, 0.75)
          font-size: 17px
          height: 54px
          line-height: 54px
          border-1px(rgba(7, 17, 27, 0.1))
        .item
          display: flex
          width: 100%
          border-1px(rgba(7, 17, 27, 0.1))
          height: 45px
          line-height: 45px
          label
            display: inline-block
            flex: 0 0 60px
            font-size: 14px
            color: rgba(0, 0, 0, .75)
          input
            display: inline-block
            flex: 1
            height: 30px
            font-size: 14px
            color: rgba(0, 0, 0, .4)
            margin-top: 8px
            outline: none
          .tel
            width: 120px
          .send
            display: inline-block
            height: 30px
            color: #FFFFFF
            background: #C6A46D
            border-radius: 4px
            margin-top: 8px
            line-height: 30px
            padding: 0 9px
            box-sizing: border-box
            font-size: 14px

        .btn
          height: 40px
          line-height: 40px
          color: #ffffff
          background: #C6A46D
          border-radius: 8px
          text-align: center
          margin-top: 20px
    .success-bind
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 90
      background: rgba(4, 4, 15, 0.4)
      .form
        width: 90%
        height: 270px
        background: #ffffff
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
        border-radius: 6px
        text-align: center
        .success
          display: block
          width: 143px
          height: 143px
          bg-image('../static/img/bindsuccess')
          background-size: 143px 143px
          background-repeat: no-repeat
          margin: 40px auto 13px
        .font
          color: rgba(0, 0, 0, .75)
          font-size: 17px
</style>
