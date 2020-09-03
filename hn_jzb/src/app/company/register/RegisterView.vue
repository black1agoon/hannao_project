<template>
  <div class="login-page">
    <header-page>
    </header-page>
    <div class="center">
      <div class="form-wrapper">
        <div class="step-wrapper">
          <eui-steps :steps="STEPS" :activeIndex="active"></eui-steps>
        </div>
        <div class="form-box" v-show="active === 0">
          <div class="tips" v-show="tips1Show">
            <span class="icon"></span>
            <span class="tip">商家注册后登录的用户名和密码，用户名请使用邮箱验证</span>
            <span class="close el-icon-close" @click="hideTips1"></span>
          </div>
          <el-form class="form clearfix" ref="form1" :model="formdata1" label-width="100px" label-position="left"
                   :rules="RULES1">
            <el-col :sm="24" v-for="(item, index) in FORM1_INFO" :key="index">
              <el-form-item v-if="item.value === 'verifyCode'" :label="item.name" :prop="item.value">
                <el-input size="medium" v-model="formdata1.verifyCode" class="input-with-select">
                  <div class="verify-code" slot="append">
                    <span class="append" v-show="!countdown" @click="sendVerifyCode">发送验证码</span>
                    <span class="append" v-show="countdown">
                      <span class="count-down">
                      </span>秒后再获取
                    </span>
                  </div>
                </el-input>
              </el-form-item>
              <el-form-item v-else :label="item.name" :prop="item.value">
                <eui-input :type="item.type" v-model="formdata1[item.value]"></eui-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24">
              <el-form-item label="" prop="agree">
                <el-checkbox v-model="formdata1.agree" class="agree">
                  <label>我已阅读并同意<span>鉴真宝服务条款</span></label>
                </el-checkbox>
              </el-form-item>
            </el-col>
            <el-button @click="step1Submit" size="small" type="primary" class="btn-next" :loading="loading">下一步
            </el-button>
          </el-form>
        </div>
        <div class="form-box" v-show="active === 1">
          <div class="tips" v-show="tips2Show">
            <span class="icon"></span>
            <span class="tip">请认真填写，可加快核对和审核速度</span>
            <span class="close el-icon-close" @click="hideTips2"></span>
          </div>
          <el-form class="form clearfix" ref="form2" :model="formdata2" label-width="160px" label-position="right"
                   :rules="RULES2">
            <el-col :sm="24" v-for="(item, index) in FORM2_INFO" :key="index">
              <el-form-item :label="item.name" :prop="item.value">
                <div class="upload-wrapper" v-if="item.value === 'legalIdcardPic'">
                  <div class="img-wrap">
                    <img v-if="helper.getImgUrl(formdata2.legalIdcardPic)"
                         :src="helper.getImgUrl(formdata2.legalIdcardPic)"
                         class="avatar">
                    <img v-else class="avatar" src="../../../assets/img/uploadpic.png">
                  </div>
                  <el-upload
                    class="btn-upload"
                    action=""
                    :show-file-list="false"
                    :http-request="form2Options.legalIdcardPic.uploadFile">
                    <el-button size="small" class="btn">上传图片</el-button>
                  </el-upload>
                </div>
                <div class="upload-wrapper" v-else-if="item.value === 'businessLicencePic'">
                  <div class="img-wrap">
                    <img v-if="helper.getImgUrl(formdata2.businessLicencePic)"
                         :src="helper.getImgUrl(formdata2.businessLicencePic)"
                         class="avatar">
                    <img v-else class="avatar" src="../../../assets/img/uploadpic.png">
                  </div>
                  <el-upload
                    class="btn-upload"
                    action=""
                    :show-file-list="false"
                    :http-request="form2Options.businessLicencePic.uploadFile">
                    <el-button size="small" class="btn">上传图片</el-button>
                  </el-upload>
                </div>
                <div class="upload-wrapper" v-else-if="item.value === 'otherPicList'">
                  <div class="img-wrap" v-if="formdata2.otherPicList.length > 0">
                    <div class="imgs" :key="index" v-for="(img, index) in formdata2.otherPicList">
                      <img :src="helper.getImgUrl(img)" class="avatar">
                      <span class="el-icon-close delete" @click="form2Options.otherPicList.deletePic(index)"></span>
                    </div>
                  </div>
                  <img  v-else class="avatar" src="../../../assets/img/uploadpic.png">
                  <el-upload
                    class="btn-upload"
                    action=""
                    :multiple="true"
                    :show-file-list="false"
                    :http-request="form2Options.otherPicList.uploadFile">
                    <el-button size="small" class="btn">{{getOtherPicBtnName}}</el-button>
                  </el-upload>
                </div>
                <eui-input
                  v-else-if="item.value === 'region'"
                  :type="item.type"
                  :cascader-item-change="regionItemChange"
                  :cascader-list="formdata2.regionList"
                  v-model="formdata2[item.value]"
                  :options="form2Options.region">
                </eui-input>
                <eui-input
                  v-else
                  :type="item.type"
                  v-model="formdata2[item.value]"
                  :options="form2Options[item.value]">
                </eui-input>
                <span v-if="item.notic" class="notic">{{item.notic}}</span>
              </el-form-item>
            </el-col>
            <el-button @click="step2Submit" size="small" type="primary" class="btn-next" style="margin-left: 160px"
                       :loading="loading">提&nbsp;交
            </el-button>
          </el-form>
        </div>
        <div class="form-box" v-show="active === 2">
          <div v-if="getCode" class="success-wrapper">
            <span class="failed el-icon-error"></span>
            <p class="done">审核失败</p>
            <p class="reason">失败原因: {{getFailReason}}</p>
            <p class="rewrite" @click="reWriteMsg">重新填写</p>
          </div>
          <div v-else class="success-wrapper">
            <span class="icon"></span>
            <p class="done">您的资料已提交审核</p>
            <p class="wait">请耐心等待</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import HeaderPage from '@/pages/common/Header'
  import EuiSteps from '@/components/common/form/EuiSteps'
  import {FORM1_DATA, FORM1_INFO, RULES1, STEPS, FORM2_DATA, FORM2_INFO, RULES2, FORM2_OPTIONS} from './register.config'
  import EuiInput from '@/components/common/form/EuiInput'
  export default {
    name: 'register-view',
    components: {
      EuiSteps,
      EuiInput,
      HeaderPage
    },
    computed: {
      getOtherPicBtnName() {
        return this.formdata2.otherPicList.length > 0 ? '继续添加' : '上传图片'
      },
      showUser() {
        return !!this.$store.state.code
      },
      getUsername() {
        return this.$store.state.rgUser
      },
      getCode() {
        return this.code === '352' || this.code === 352
      },
      getFailReason() {
        return this.$store.state.rgMsg
      }
    },
    data() {
      return {
        helper,
        code: this.$store.state.code,
        STEPS: STEPS,
        loading: false,
        countdown: false,
        active: 0,
        tips1Show: true,
        tips2Show: true,
        formdata1: {...FORM1_DATA},
        FORM1_INFO: FORM1_INFO,
        RULES1: Object.assign(RULES1, {
          password: [{
            required: true,
            validator: (rule, value, callback) => {
              if (value === '' || value === null) {
                callback(new Error('请输入密码'))
              } else {
                if (this.formdata1.rePassword !== '' && this.formdata1.rePassword !== null) {
                  this.$refs.form1.validateField('rePassword')
                }
                callback()
              }
            },
            trigger: 'blur'
          }, {min: 6, message: '密码长度至少为6位', trigger: 'blur'}],
          rePassword: [{
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value === '' || value === null) {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.formdata1.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            }
          }, {min: 6, message: '密码长度至少为6位', trigger: 'blur'}]
        }),
        formdata2: {...FORM2_DATA},
        FORM2_INFO: FORM2_INFO,
        RULES2: Object.assign(RULES2, {}),
        form2Options: Object.assign(FORM2_OPTIONS, {
          legalIdcardPic: {
            uploadFile: (params) => {
              api.register.upload(params.file).then(data => {
                this.formdata2.legalIdcardPic = data.path
              })
            }
          },
          businessLicencePic: {
            uploadFile: (params) => {
              api.register.upload(params.file).then(data => {
                this.formdata2.businessLicencePic = data.path
              })
            }
          },
          otherPicList: {
            uploadFile: (params) => {
              api.register.upload(params.file).then(data => {
                this.formdata2.otherPicList.push(data.path)
                this.formdata2.otherPic = this.formdata2.otherPicList.join(',')
                this.$forceUpdate()
              })
            },
            deletePic: (index) => {
              this.formdata2.otherPicList.splice(index, 1)
              this.formdata2.otherPic = this.formdata2.otherPicList.join(',')
              this.$forceUpdate()
            }
          },
          region: []
        })
      }
    },
    methods: {
      hideTips1() {
        this.tips1Show = false
      },
      hideTips2() {
        this.tips2Show = false
      },
      step1Submit() {
        this.$refs.form1.validate((valid) => {
          if (valid) {
            this.loading = true
            api.register.register(this.formdata1).then(data => {
              this.$message({
                message: '用户注册成功!',
                type: 'success',
                duration: 2000,
                onClose: () => {
                  this.active = 1
                  this.loading = false
                  this.$store.commit('SET_TOKEN', data)
                  window.localStorage.setItem('token', data)
                  this.getForm1Data()
                }
              })
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      step2Submit() {
        this.$refs.form2.validate((valid) => {
          if (valid) {
            this.loading = true
            api.register.cooApply(this.formdata2).then(data => {
              this.$message({
                message: '企业信息认证成功!',
                type: 'success',
                duration: 2000,
                onClose: () => {
                  this.active = 2
                  this.loading = false
                  this.code = null
                  // this.$store.commit('SET_TOKEN', data)
                }
              })
            }).catch(() => {
              this.loading = false
            })
          } else {
            this.$confirm(`请先将本页信息填写完整。`, '提示', {
              iconClass: 'el-icon-warning'
            }).then(() => {
              return false
            }).catch(() => {
            })
          }
        })
      },
      sendVerifyCode() {
        this.$refs.form1.validateField('email', (result) => {
          if (!result) {
            this.countdown = true
            let countdown = document.getElementsByClassName('count-down')[0]
            let time = 60
            countdown.innerHTML = time
            let timer = setInterval(() => {
              time--
              if (time === 0) {
                clearInterval(timer)
                this.countdown = false
              } else {
                countdown.innerHTML = time
              }
            }, 1000)
            api.register.sendRegisterEmail(this.formdata1.email).then((data) => {
            })
          }
        })
      },
      getStepByCodeOrToken() {
        let code = this.$store.state.code
        let token = window.localStorage.getItem('token') || null
        if (code === '350' || code === 350) {
          this.active = 1
          this.getForm1Data()
        } else if (code === '351' || code === 351 || code === '352' || code === 352) {
          this.active = 2
        } else if (token === null) {
          this.active = 0
        } else {
          api.register.validToken(token).then(() => {
            this.getStepByCodeOrToken()
            this.code = this.$store.state.code
          }).catch(() => {
          })
        }
      },
      logOut() {
        api.companyPublic.logout().then(() => {
          window.localStorage.removeItem('token')
          this.$router.push('/company/login')
        })
      },
      getIndustryPaged() {
        api.register.getIndustryPaged({
          page: 1,
          pageSize: 999
        }).then(data => {
          this.form2Options.industryId = data.records.map(i => ({
            label: i.name,
            value: i.id
          }))
        })
      },
      getProv() {
        api.public.getRegionProv().then(data => {
          this.form2Options.region = data.map(prov => ({
            label: prov,
            value: prov,
            children: []
          }))
        })
      },
      regionItemChange(val) {
        let findIndex = (items, value) => {
          let index = -1
          items.forEach((item, i) => {
            if (item.label === value) {
              index = i
            }
          })
          return index
        }
        if (val.length === 1) {
          api.public.getRegionCities(val[0]).then(cities => {
            this.form2Options.region[findIndex(this.form2Options.region, val[0])].children = cities.map(city => ({
              label: city,
              value: city,
              children: []
            }))
          })
        } else if (val.length === 2) {
          api.public.getRegionDistrict(val[1]).then(districts => {
            this.form2Options.region[findIndex(this.form2Options.region, val[0])].children[findIndex(this.form2Options.region[findIndex(this.form2Options.region, val[0])].children, val[1])].children = districts.map(district => ({
              label: district.district,
              value: district.id
            }))
          })
        }
      },
      getRegionList() {
        if (this.formdata2.region) {
          let findIndex = (items, value) => {
            let index = -1
            items.forEach((item, i) => {
              if (item.label === value) {
                index = i
              }
            })
            return index
          }
          api.public.getRegionById(this.formdata2.region).then(data => {
            api.public.getRegionCities(data.prov).then(cities => {
              this.form2Options.region[findIndex(this.form2Options.region, data.prov)].children = cities.map(city => ({
                label: city,
                value: city,
                children: []
              }))
              api.public.getRegionDistrict(data.city).then(districts => {
                this.form2Options.region[findIndex(this.form2Options.region, data.prov)].children[findIndex(this.form2Options.region[findIndex(this.form2Options.region, data.prov)].children, data.city)].children = districts.map(district => ({
                  label: district.district,
                  value: district.id
                }))
                this.formdata2.regionList = [data.prov, data.city, data.id]
                this.$forceUpdate()
              })
            })
          })
        }
      },
      getForm1Data() {
        this.getIndustryPaged()
        this.getProv()
      },
      reWriteMsg() {
        this.getForm1Data()
        this.active = 1
        this.formdata2 = {...this.$store.state.rgFormdata}
        this.formdata2.regionList = []
        this.formdata2.otherPicList = []
        this.formdata2.otherPicList = this.formdata2.otherPicList ? this.formdata2.otherPic.split(',') : this.formdata2.otherPicList
        this.getRegionList()
      }
    },
    mounted() {
      this.getStepByCodeOrToken()
    },
    beforeDestroy() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login-page
    min-width: 1440px
    background-color: #ffffff
    margin: 0 auto
    .center
      width: 100%
      height: 100vh
      /*background: blue*/
      background-image: url("../../../assets/img/bg.jpg")
      background-repeat: no-repeat
      position: relative
      .form-wrapper
        position: absolute
        width: 1136px
        overflow-y: auto
        /*height: 550px*/
        max-height: calc(100vh - 128px)
        top: 100px
        left: 50%
        margin-left: -568px
        background: #ffffff
        border-radius: 2px
        .step-wrapper
          padding: 30px
        .form-box
          width: 540px
          margin: auto
          margin-bottom: 10px
          .tips
            border: 1px solid #91D5FF
            border-radius: 4px
            background: #E6F7FF
            padding: 12px 14px
            white-space: nowrap
            .icon
              width: 14px
              height: 14px
              display: inline-block
              background-image: url("../../../assets/img/shape@2x.png")
              background-size: 14px 14px
              background-repeat: no-repeat
              vertical-align: middle
            .tip
              font-size: 14px
              color: rgba(0, 0, 0, .65)
            .close
              float: right
              vertical-align: middle
              color: #999
              font-size: 14px
              cursor: pointer
          .form
            margin-top: 20px
            .agree
              label
                font-size: 14px
                color: rgba(0, 0, 0, .85)
                span
                  display: inline-block
                  margin-left: 2px
                  color: #1890FF
                  cursor: pointer
            .verify-code
              width: 100%
              .append
                display: inline-block
                text-align: center
                width: 80px
            .upload-wrapper
              display: inline-block
              .img-wrap
                display: inline-block
                .avatar
                  display: inline-block
                  width: 125px
                  height: 125px
                .imgs
                  position: relative
                  display: inline-block
                  &:hover
                    .delete
                      opacity: 1
                  img
                    display: inline-block
                    margin: 5px 5px 0 0
                  .delete
                    position: absolute
                    width: 20px
                    height: 20px
                    text-align: center
                    line-height: 20px
                    top: 0
                    right: 0
                    background: rgba(0, 0, 0, .5)
                    color: #ffffff
                    border-radius: 50%
                    padding: 3px
                    cursor: pointer
                    opacity: 0
              .avatar
                display: inline-block
                width: 125px
                height: 125px
              .btn-upload
                display: inline-block
                vertical-align: text-bottom
                .btn
                  background: #f0f1f3
            .notic
              display: inline-block
              line-height: 20px
              color: #909090
              font-size: 12px
              vertical-align: top
          .btn-next
            margin: 0 0 30px 100px
          .success-wrapper
            text-align: center
            padding: 70px 0 130px
            .failed
              width: 72px
              height: 72px
              font-size: 72px
              color: rgba(255, 0, 0, 0.7)
              display: block
              margin: auto
            .rewrite
              font-size: 14px
              color: rgba(0, 0, 0, .45)
              line-height: 22px
              margin: 12px 0
              cursor: pointer
              &:hover
                text-decoration: underline
            .reason
              width: 200px
              margin: 12px auto
              font-size: 14px
              color: rgba(0, 0, 0, .45)
              line-height: 22px
              text-align: left
              /*margin: 12px 0*/
            .icon
              width: 72px
              height: 72px
              display: block
              background-image: url("../../../assets/img/succes.png")
              background-size: 72px 72px
              background-repeat: no-repeat
              margin: auto
            .done
              font-size: 24px
              color: rgba(0, 0, 0, .85)
              line-height: 32px
              margin: 12px 0
            .wait
              font-size: 14px
              color: rgba(0, 0, 0, .45)
              line-height: 22px
              margin: 12px 0
  ::-webkit-scrollbar
    width: 10px
    height: 10px
</style>
<style>
  .el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
</style>
