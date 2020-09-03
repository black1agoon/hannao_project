<template>
  <transition name="fold">
    <div class="window-wrapper" v-show="isShow" @touchmove="preventMove($event)" @wheel="preventMove($event)">
      <div class="window">
        <div class="head">
          <i class="close" @click="close"></i>
          <div class="name" :style="{background: demand.domainIdColor}">{{demand.domainIdName}}</div>
          <div class="title">{{demand.title}}</div>
        </div>
        <div class="line">
          <div class="label">报价:</div>
          <div class="input">
            <input v-model="formdata.price" type="number" placeholder="请填写价格"/>
          </div>
        </div>
        <div class="line">
          <div class="label">联系人:</div>
          <div class="input">
            <input v-model="formdata.name" placeholder="请填写联系人"/>
          </div>
        </div>
        <div class="line">
          <div class="label">手机号:</div>
          <div class="input">
            <input v-model="formdata.mobile" placeholder="请填写手机"/>
          </div>
        </div>
        <div class="line">
          <div class="label">备注:</div>
          <div class="textarea">
            <textarea v-model="formdata.comment" placeholder="可选填备注"/>
          </div>
        </div>
        <div class="bottom">
          <div class="buttom cancel" @click="close">取消</div>
          <div class="buttom submit" @click="submit">确定</div>
        </div>
      </div>
      <prompt-window ref="window" :options="windowOptions">
      </prompt-window>
    </div>
  </transition>
</template>

<script>
  import api from '@/api'
  import '../../assets/js/utils'
  import {checkMobile} from '../../assets/js/validate'
  import PromptWindow from '../common/PromptWindow'
  export default {
    name: 'demandwindow',
    components: {
      PromptWindow
    },
    data() {
      return {
        isShow: false,
        formdata: {
          price: null,
          comment: null,
          name: null,
          mobile: null,
          demandId: null
        },
        demand: {},
        windowOptions: {
          font: '提交成功',
          icon: 'success'
        }
      }
    },
    methods: {
      open(demand) {
        this.demand = demand
        this.formdata.demandId = this.demand.id
        this.formdata.price = null
        this.formdata.comment = null
        this.formdata.name = null
        this.formdata.mobile = null
        this.isShow = true
      },
      close() {
        this.isShow = false
        this.$refs.window.hide()
      },
      submit() {
        if (!this.formdata.price) {
          this.windowOptions.font = '请输入价格'
          this.windowOptions.icon = 'error'
          this.$refs.window.show()
        } else if (!this.formdata.name) {
          this.windowOptions.font = '请输入联系人姓名!'
          this.windowOptions.icon = 'error'
          this.$refs.window.show()
        } else if (!this.formdata.mobile) {
          this.windowOptions.font = '请输入手机号码!'
          this.windowOptions.icon = 'error'
          this.$refs.window.show()
        } else if (!checkMobile(this.formdata.mobile)) {
          this.windowOptions.font = '请输入正确的手机号码!'
          this.windowOptions.icon = 'error'
          this.$refs.window.show()
        } else {
          api.demand.demandApply(this.formdata).then(() => {
            this.$refs.window.show()
            setTimeout(() => {
              this.close()
            }, 2000)
          }).catch(() => {
            this.windowOptions.font = '提交失败'
            this.windowOptions.icon = 'error'
            this.$refs.window.show()
          })
        }
      },
      preventMove(e) {
        e.preventDefault()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .window-wrapper
    position: fixed
    z-index: 100
    width: 100%
    height: 100%
    top: 0
    background: rgba(4, 4, 15, 0.4)
    user-select: none
    transition: all .2s
    opacity: 1
    backdrop-filter: blur(10px)
    &.fold-enter, &.fold-leave-to
      opacity: 0
    .window
      width: 750px
      height: 607px
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      background: #ffffff
      border-radius: 3px
      overflow: hidden
      .head
        border-bottom: 1px solid #E3E3E3
        margin-bottom: 50px
        .close
          position: absolute
          cursor: pointer
          top: 25px
          right: 28px
          width: 25px
          height: 25px
          background-image: url("../../assets/img/demand/close.png")
          background-size: 25px 25px
          background-repeat: no-repeat
        .name
          display: inline-block
          vertical-align: top
          width: 104px
          height: 35px
          margin: 20px 0 5px 15px
          color: #ffffff
          line-height: 35px
          font-size: 21px
          text-align: center
        .title
          margin: 20px 75px 20px 25px
          vertical-align: top
          width: calc(100% - 230px)
          display: inline-block
          color: #343434
          font-size: 18px
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden
          height: 35px
          line-height: 35px
      .line
        margin: 22px 50px 0
        display: flex
        .label
          flex: 0 0 128px
          font-size: 24px
          color: #000000
          line-height: 48px
          text-align: right
        .input
          flex: 1
          margin-left: 20px
          height: 48px
          border: 1px solid #DDDDDD
          border-radius: 4px
          overflow: hidden
          padding: 0 10px
          input
            width: 100%
            height: 100%
            outline: none
            border: none
            font-size: 21px
        .textarea
          flex: 1
          margin-left: 20px
          border-radius: 4px
          overflow: hidden
          textarea
            width: 100%
            height: 120px
            font-family: 'Microsoft YaHei'
            box-sizing: border-box
            padding: 10px 0 0 10px
            outline: none
            border: 1px solid #DDDDDD
            font-size: 21px
            resize: none
            &::-webkit-input-placeholder
              color: rgb(187,187,187)
            &::-moz-placeholder
              color: rgb(187,187,187)
            &:-moz-placeholder
              color: rgb(187,187,187)
            &:-ms-input-placeholder
              color: rgb(187,187,187)
      .bottom
        position: absolute
        bottom: 50px
        right: 61px
        display: flex
        .buttom
          font-size: 24px
          cursor: pointer
          transition: all .2s
          &.cancel
            width: 98px
            height: 46px
            text-align: center
            line-height: 46px
            background: #ffffff
            color: #70B9FF
            border: 2px solid #70B9FF
            margin-right: 20px
          &.submit
            width: 102px
            height: 50px
            line-height: 50px
            background: #54AFED
            color: #ffffff
            text-align: center
            border-left: 1px solid #dddddd
          &:hover
            background: #73C6FF
            color: #ffffff
          &:active
            background: #409DDC
            color: #ffffff
</style>