<template>
  <div class="form-wrapper">
    <div class="form-box">
      <el-form class="form clearfix" ref="form" :model="formdata" label-width="150px" :rules="rules">
        <div v-for="(item, index) in forminfo" :key="index">
          <div class="big-title">
            <i class="el-icon-edit"></i><span>{{item.title}}</span>
          </div>
          <el-col :sm="item.sm || 24" v-for="(it, idx) in item.forms" :key="idx">
            <el-form-item  :label="it.name" :prop="it.value">
              <div class="item">
                <div class="explain"></div>
                <div class="input">
                  <el-upload
                      v-if="it.value === 'legalIdcardPic' || it.value === 'businessLicencePic'"
                      class="avatar-uploader"
                      action=""
                      :show-file-list="false"
                      :http-request="formOptions[it.value].uploadFile">
                    <img v-if="helper.getImgUrl(formdata[it.value])"
                         :src="helper.getImgUrl(formdata[it.value])"
                         class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <area-box
                      v-else-if="it.value === 'area'"
                      v-model="formdata[it.value]">
                  </area-box>
                  <el-upload
                      v-else-if="it.value === 'otherPic'"
                      class="avatar-uploader"
                      action=""
                      list-type="picture-card"
                      :multiple="true"
                      :file-list="helper.getFlieList(formdata.otherPicList)"
                      :show-file-list="true"
                      :http-request="formOptions.otherPic.uploadFile"
                      :on-remove="formOptions.otherPic.handleRemove"
                      :before-remove="formOptions.otherPic.beforeRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <eui-input
                      v-else
                      v-model="formdata[it.value]"
                      :type="it.type"
                      :autosize="it.autosize"
                      :placeholder="it.placeholder"
                      :unit="it.unit"
                      :options="formOptions[it.value]">
                  </eui-input>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </div>

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
        forminfo: ENTERPRISE.COMPANY_FORM,
        rules: ENTERPRISE.COMPANY_RULES,
        formdata: {...ENTERPRISE.COMPANY_INFO},
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
          },
          otherPic: {
            uploadFile: (params) => {
              api.enterprise.upload(params.file).then(data => {
                if (!this.formdata.otherPicList || !Array.isArray(this.formdata.otherPicList)) {
                  this.formdata.otherPicList = []
                  this.formdata.otherPicList.push(data.path)
                } else {
                  this.formdata.otherPicList.push(data.path)
                }
                this.formdata.otherPic = this.formdata.otherPicList.join(',')
              })
            },
            handleRemove: (file, fileList) => {
              // console.log(file, fileList)
              this.formdata.otherPicList = this.formdata.otherPicList.filter(l => l.split('/')[l.split('/').length - 1] !== file.name)
              this.formdata.otherPic = this.formdata.otherPicList.join(',')
            },
            beforeRemove: () => {
              return this.$confirm(`是否删除该图片？`, '提示', {
                iconClass: 'fa fa-question-circle'
              })
            }
          },
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
      .big-title
        margin-left: -10%
        color: #606266
        font-size: 22px
        font-weight: bold
        padding-bottom: 5px
        margin-bottom: 10px
        border-bottom: 1px solid #dcdfe6
        span
          margin-left: 5px
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
    .avatar-uploader
      display: inline-block
      white-space: nowrap
      /deep/ .el-upload
        border: 1px dashed #d9d9d9
        border-radius: 6px
        cursor: pointer
        position: relative
        overflow: hidden
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
    /deep/ .el-upload--picture-card
      background: #ffffff
</style>
