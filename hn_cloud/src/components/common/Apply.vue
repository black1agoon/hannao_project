<template>
  <div class="wrapper">
    <div class="banner">
      <div class="banner-content">
        <div class="title">您可填写如下表格,获取更多汉脑大数据产品服务信息</div>
        <div class="en-title">You can fill in the following form to get more information about Hannao Big Data Products
          and Services
        </div>
      </div>
    </div>
    <div class="form-wrapper">
      <div class="item">
        <label class="required">公司名称</label>
        <input type="text" placeholder="请填写营业执照上的全称" data-prop="info[company_name]" @blur="validate"
               v-model="formdata['info[company_name]']">
        <span class="error">{{errorMsg['info[company_name]']}}</span>
      </div>
      <div class="item">
        <label class="required">联系姓名</label>
        <input type="text" placeholder="请填写本人姓名" data-prop="info[contact]" @blur="validate" v-model="formdata['info[contact]']">
        <span class="error">{{errorMsg['info[contact]']}}</span>
      </div>
      <div class="item">
        <label class="required">职务信息</label>
        <input type="text" placeholder="请填写本人职务名称" data-prop="info[job]" @blur="validate" v-model="formdata['info[job]']">
        <span class="error">{{errorMsg['info[job]']}}</span>
      </div>
      <div class="item">
        <label class="required">联系电话</label>
        <input type="number" placeholder="请填写联系电话"  data-prop="info[telephone]" @blur="validate" v-model="formdata['info[telephone]']">
        <span class="error">{{errorMsg['info[telephone]']}}</span>
      </div>
      <div class="item">
        <label class="required">企业邮箱</label>
        <input type="text" placeholder="请填写本人公司企业邮箱" data-prop="info[email]" @blur="validate" v-model="formdata['info[email]']">
        <span class="error">{{errorMsg['info[email]']}}</span>
      </div>
      <div class="item">
        <label>需求描述</label>
        <textarea placeholder="请简述服务需求" v-model="formdata['info[requirement]']"></textarea>
      </div>
      <div class="submit" @click="submit">提交申请</div>
    </div>
    <div class="success-window" v-show="successflag">
      <div class="icon"></div>
      <div class="close" @click="() => {successflag = false}"></div>
      <div class="prompt">提交成功</div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  export default {
    name: 'apply',
    components: {
    },
    data() {
      return {
        formdata: {
          'info[company_name]': null,
          'info[contact]': null,
          'info[job]': null,
          'info[telephone]': null,
          'info[email]': null,
          'info[requirement]': null,
          formid: 4
        },
        errorMsg: {
          'info[company_name]': null,
          'info[contact]': null,
          'info[job]': null,
          'info[telephone]': null,
          'info[email]': null,
          'info[requirement]': null
        },
        successflag: false
      }
    },
    methods: {
      validate(e) {
        this.rules(e.target.getAttribute('data-prop'))
        // if (Object.keys(this.errorMsg).find(key => this.errorMsg[key] === '' || this.errorMsg[key] === null)) {
        //   return false
        // } else {
        //   return true
        // }
      },
      rules(prop) {
        let rules = {
          'info[company_name]': () => {
            this.formdata[prop] === '' || this.formdata[prop] === null ? this.errorMsg[prop] = '公司名称不能为空!' : this.errorMsg[prop] = ''
          },
          'info[contact]': () => {
            this.formdata[prop] === '' || this.formdata[prop] === null ? this.errorMsg[prop] = '姓名不能为空!' : this.errorMsg[prop] = ''
          },
          'info[job]': () => {
            this.formdata[prop] === '' || this.formdata[prop] === null ? this.errorMsg[prop] = '职务不能为空!' : this.errorMsg[prop] = ''
          },
          'info[telephone]': () => {
            if (this.formdata[prop] === '' || this.formdata[prop] === null) {
              this.errorMsg[prop] = '联系电话不能为空!'
            }
            // else if (!(/^1[3|4|5|8]\d{9}$/.test(this.formdata[prop]))) {
            //   this.errorMsg[prop] = '请输入正确格式的号码!'
            // }
            else {
              this.errorMsg[prop] = ''
            }
          },
          'info[email]': () => {
            if (this.formdata[prop] === '' || this.formdata[prop] === null) {
              this.errorMsg[prop] = '企业邮箱不能为空!'
            } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.formdata[prop])) {
              this.errorMsg[prop] = '请输入正确格式的邮箱!'
            } else {
              this.errorMsg[prop] = ''
            }
          }
        }
        rules[prop].call(this)
      },
      submit() {
        let inputs = document.getElementsByTagName('input')
        for (let i = 0; i < inputs.length; i++) {
          this.validate({target: inputs[i]})
        }
        if (!Object.keys(this.errorMsg).find(key => this.errorMsg[key])) {
          let data = new FormData()
          data.append('info[company_name]', this.formdata['info[company_name]'])
          data.append('info[contact]', this.formdata['info[contact]'])
          data.append('info[job]', this.formdata['info[job]'])
          data.append('info[telephone]', this.formdata['info[telephone]'])
          data.append('info[email]', this.formdata['info[email]'])
          data.append('info[requirement]', this.formdata['info[requirement]'])
          data.append('formid', 4)
          api.submitApply(data).then(data => {
            // console.log(data)
            if (data.code === '00') {
              this.successflag = true
              setTimeout(() => {
                this.successflag = false
              }, 2000)
            }
          })
        }
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper
    .banner
      position: relative
      min-width: 1400px
      height: 505px
      background-image: url("../../assets/img/apply.png")
      background-repeat: no-repeat
      background-size: percentage
      .banner-content
        width: 1200px
        margin: 0 auto
        text-align: center
        .title
          padding-top: 215px
          font-size: 30px
          color: #ffffff
        .en-title
          margin-top: 40px
          font-size: 24px
          color: #ffffff
    .form-wrapper
      width: 480px
      margin: 0 auto
      padding-bottom: 100px
      .item
        position: relative
        line-height: 40px
        margin-top: 37px
        label
          position: relative
          vertical-align: top
          &.required:before
            content: ' '
            width: 10px
            height: 10px
            display: block
            background: #00AAFF
            border-radius: 50%
            left: -15px
            top: 5px
            position: absolute
        input, textarea
          width: 376px
          height: 40px
          margin-left: 19px
          border: 1px solid #DCDCDC
          padding: 12px
          box-sizing: border-box
          font-size: 16px
          outline: none
          &::-webkit-input-placeholder
            color: #98999B
          &::-moz-placeholder
            color: #98999B
          &:-moz-placeholder
            color: #98999B
          &:-ms-input-placeholder
            color: #98999B
        textarea
          height: 172px
        /*font-family: 'Microsoft YaHei'*/
        .error
          position: absolute
          display: block
          color: red
          left: 92px
          top: 45px
          font-size: 15px
          line-height: 15px
      .submit
        width: 98px
        height: 38px
        line-height: 38px
        border: 1px solid #ffffff
        background: #00AAFF
        font-size: 14px
        color: #ffffff
        margin: 30px auto 0
        cursor: pointer
        text-align: center
        box-shadow: 0 0 0 1px #00AAFF
        &:hover
          opacity: .8
    .success-window
      position: fixed
      background: #ffffff
      top: 0
      right: 0
      left: 0
      bottom: 0
      margin: auto
      width: 400px
      height: 200px
      box-shadow: 1px 1px 10px 2px #CCC
      border-radius: 4px
      transition: all 1s
      .icon
        width: 62px
        height: 62px
        background-image: url("../../assets/img/dui.png")
        background-repeat: no-repeat
        background-size: 62px 62px
        margin: 52px auto 21px
      .close
        position: absolute
        right: 12px
        top: 12px
        cursor: pointer
        width: 11px
        height: 11px
        background-image: url("../../assets/img/cha.png")
        background-repeat: no-repeat
        background-size: 11px 11px
      .prompt
        text-align: center
        font-size: 16px
        color: #434141
</style>