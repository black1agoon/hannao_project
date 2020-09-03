<template>
  <div class="form-wrapper">
    <div class="form-box">
      <el-form class="form clearfix" ref="form" :model="formdata" label-width="150px" :rules="rules">
        <el-col :sm="item.sm || 24" v-for="(item, index) in forminfo" :key="index">
          <el-form-item  :label="item.name" :prop="item.value">
            <div class="item">
              <div class="explain"></div>
              <div class="input">
                <el-upload
                    v-if="item.value === 'legalIdcardPic' || item.value === 'businessLicencePic'"
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :http-request="formOptions[item.value].uploadFile">
                  <img v-if="helper.getImgUrl(formdata[item.value])"
                       :src="helper.getImgUrl(formdata[item.value])"
                       class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <area-box
                    v-else-if="item.value === 'area'"
                    v-model="formdata[item.value]">
                </area-box>
                <eui-input
                    v-else
                    v-model="formdata[item.value]"
                    :type="item.type"
                    :autosize="item.autosize"
                    :placeholder="item.placeholder"
                    :unit="item.unit"
                    :options="formOptions[item.value]">
                </eui-input>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="form-btns">
        <div class="wrap">
          <el-button type="primary" size="small" @click="submitForm">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import {mapState} from 'vuex'
  import helper from '@/app/app.helpers'
  import EuiInput from '@/components/common/form/EuiInput'
  import {ENTERPRISE} from '../enterprise.config'
  import AreaBox from '@/app/tools/AreaBox'
  export default {
    name: 'enterprise-controller-form',
    _meta: {
      path: '/enterprise/controller/form',
      title: '企业信息编辑'
    },
    components: {
      EuiInput,
      AreaBox
    },
    computed: {
      ...mapState([
        'tabs'
      ])
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.formdata.typeId = to.query.typeId
        vm.$store.commit('UPDATE_TAB', {
          ...to,
          title: to.meta.title,
          keep: to.meta.keep || false
        })
        vm.getData(to.query.id)
      })
    },
    data() {
      return {
        helper,
        forminfo: ENTERPRISE.FORM_INFO,
        rules: ENTERPRISE.RULES,
        formdata: {...ENTERPRISE.FORM_DATA},
        formOptions: Object.assign(ENTERPRISE.FORM_OPTIONS, {
          legalIdcardPic: {
            uploadFile: (params) => {
              api.enterprise.upload(params.file).then(data => {
                this.formdata.legalIdcardPic = data.path
              })
            }
          },
          businessLicencePic: {
            uploadFile: (params) => {
              api.enterprise.upload(params.file).then(data => {
                this.formdata.businessLicencePic = data.path
              })
            }
          }
        })
      }
    },
    methods: {
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            api.enterprise.update(this.formdata).then(() => {
              this.$message({
                message: '编辑成功!',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.removeTab(this.$route.name)
                }
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      removeTab(targetName) {
        let tabs = this.tabs
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              this.$router.push(this.tabs.find(t => { // 进入下一个tab
                return t.name === nextTab.name
              }).path)
            } else {
              this.$router.push('/')
            }
          }
        })
        this.$store.commit('REMOVE_TAB', targetName)
      },
      getData(id) {
        api.enterprise.get(id).then(data => {
          this.formdata = Object.assign(this.formdata, data)
        })
      },
      getInputData() {
        api.enterprise.getIndustry().then(data => {
          this.formOptions.industryId = data ? data.map(industry => ({
            label: industry.name,
            value: industry.id
          })) : []
        })
      }
    },
    mounted() {
      this.getInputData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .form-wrapper
    width: 100%
    height: 100%
    background: #f0f2f5
    overflow-y: scroll
    .form-box
      margin: 30px
      height: calc(100% - 60px)
      background: #ffffff
      .form
        background: #fff
        padding: 20px 0 20px 10%
        display: block
    .el-input, .el-textarea, .el-cascader, .el-select
      width: 400px
    .avatar-uploader, .avatar-uploader-icon, .avatar
      display: inline-block
      vertical-align: top
      width: 150px
      height: 150px
      line-height: 150px
    .avatar-uploader
      border: 1px dashed #d9d9d9
      &:hover
        border-color: #409EFF
    .form-btns
      display: block
      clear: both
      .wrap
        width: 400px
        margin-left: calc(10% + 120px)
        padding-bottom: 30px
        button
          width: 100%
          margin-top: 12px
</style>
