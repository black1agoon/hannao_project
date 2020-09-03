<template>
  <div class="form-wrapper">
    <div class="form-box">
      <eui-tips>
        <ul>
          <li>标识"<em>*</em>"的选项为必填项，其余为选填项</li>
          <li>已审核通过的记录不可再编辑</li>
        </ul>
      </eui-tips>
      <el-form class="form clearfix" ref="form" :model="formdata" label-width="150px" :rules="COMPANY_COOP_RULES">
        <div v-for="(item, index) in COMPANY_COOP_FORM" :key="index">
          <div class="big-title">
            <i class="el-icon-edit"></i><span>{{item.title}}</span>
          </div>
          <el-col :sm="24" v-for="(it, i) in item.forms" :key="i">
            <el-form-item :label="it.name" :prop="it.value">
              <el-upload
                v-if="it.value === 'legalIdcardPic'"
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="formOptions.legalIdcardPic.uploadFile">
                <img v-if="helper.getImgUrl(formdata.legalIdcardPic)" :src="helper.getImgUrl(formdata.legalIdcardPic)"
                     class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-upload
                v-else-if="it.value === 'businessLicencePic'"
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="formOptions.businessLicencePic.uploadFile">
                <img v-if="helper.getImgUrl(formdata.businessLicencePic)"
                     :src="helper.getImgUrl(formdata.businessLicencePic)" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
              <eui-input v-else
                         v-model="formdata[it.value]"
                         :type="it.type"
                         :readonly="it.readonly"
                         :suffixIcon="it.suffixIcon"
                         :options="formOptions[it.value]"
                         :autosize="it.autosize"
                         :clearable="it.clearable">
              </eui-input>
              <span v-if="it.notic" class="notic">{{it.notic}}</span>
            </el-form-item>
          </el-col>
        </div>
      </el-form>
      <div class="form-btns">
        <div class="wrap">
          <el-button type="primary" size="small" @click="openAudit">审核</el-button>
          <el-button size="small" @click="go2Paged">返回</el-button>
        </div>
      </div>
    </div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="clearfix" ref="form2" :rules="COMPANY_COOP_RULES2" :model="formdata" label-width="120px" style="padding: 20px">
        <el-col :sm="24">
          <el-form-item label="状态" prop="status">
            <eui-input style="width: 100%" v-model="formdata.status" type="select"
                       :options="formOptions.status">
            </eui-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24">
          <el-form-item label="审核结果信息" prop="review">
            <eui-input style="width: 100%" v-model="formdata.review" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }">
            </eui-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="btns">
        <el-button type="primary" size="small" @click="audit">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
  </div>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import {mapState} from 'vuex'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiTips from '@/components/common/tools/EuiTips'
  import {COMPANY_COOP_FORM, COMPANY_COOP_RULES, COMPANY_COOP_RULES2, COMPANY_COOP_INFO} from '../company.config'
  import EuiWindow from '@/components/common/form/EuiWindow'
  export default {
    name: 'company-cooper',
    _meta: {
      path: 'company/cooper',
      title: '查看申请'
    },
    components: {
      EuiInput,
      EuiTips,
      EuiWindow
    },
    computed: {
      ...mapState([
        'tabs'
      ])
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (from.path === '/') {
          vm.$router.push('/')
          vm.$store.commit('REMOVE_TAB', vm.name)
        } else {
          vm.$store.commit('UPDATE_TAB', {
            ...to,
            title: to.meta.title,
            keep: to.meta.keep || false
          })
          if (to.query.id) {  // 传进来的id存在
            vm.getData(to.query.id)
          } else if (vm.formdata.id && to.query.id !== null) { // query.id不存在, formdata.id存在, 且不是 新增
            vm.getData(vm.formdata.id)
          } else {   // 没有传id，则认为是新增
            vm.formdata = {...COMPANY_COOP_INFO}
          }
        }
      })
    },
    data() {
      return {
        helper,
        COMPANY_COOP_FORM,
        COMPANY_COOP_RULES,
        COMPANY_COOP_RULES2,
        formdata: {...COMPANY_COOP_INFO},
        formOptions: {
          industryId: [],
          multipleSites: [{
            value: 0,
            label: '不是'
          }, {
            value: 1,
            label: '是'
          }],
          status: [{
            value: 0,
            label: '申请中'
          }, {
            value: 1,
            label: '通过申请'
          }, {
            value: 2,
            label: '拒绝申请'
          }],
          legalIdcardPic: {
            uploadFile: (params) => {
              api.public.uploadPic(params.file).then(data => {
                this.formdata.legalIdcardPic = data.path
              })
            }
          },
          businessLicencePic: {
            uploadFile: (params) => {
              api.public.uploadPic(params.file).then(data => {
                this.formdata.businessLicencePic = data.path
              })
            }
          },
          otherPic: {
            uploadFile: (params) => {
              api.public.uploadPic(params.file).then(data => {
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
          }
        },
        windowOptions: {
          title: '审核',
          width: '25%'
        }
      }
    },
    created() {
      this.$on('checkedNode', (node) => {
        this.formdata.csmIdName = node.realname
        this.formdata.csmId = node.id
      })
    },
    methods: {
      removeTab(targetName) {
        let tabs = this.tabs
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              this.$router.push(this.tabs.find(t => { // 进入下一个tab
                return t.name === nextTab.name
              }).path)
            }
          }
        })
        this.$store.commit('REMOVE_TAB', targetName)
      },
      getSelectData() {
        Promise.all([api.companyIndustry.getCompanyIndustryPaged({
          page: 1,
          pageSize: 999
        }), api.companyGrade.getCompanyGradePaged({
          page: 1,
          pageSize: 999
        })]).then(result => {
          if (result[0].records && result[0].records.length > 0) {
            this.formOptions.industryId = result[0].records.map(d => ({
              value: d.id,
              label: d.name
            }))
          }
          if (result[1].records && result[1].records.length > 0) {
            this.formOptions.grade = result[1].records.map(d => ({
              value: d.id,
              label: d.name
            }))
          }
        })
      },
      getData(id) {
        api.company.getCompanyCooApplyGet(id).then(data => {
          this.formdata = data
          this.formdata.otherPicList = this.formdata.otherPic
        })
      },
      openAudit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$refs.window.open()
          } else {
            this.$alert('信息未填写完整，请继续填写', '', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
              }
            })
            return false
          }
        })
      },
      go2Paged() {
        this.removeTab(this.$route.name)
      },
      audit() {
        this.$refs.form2.validate((valid) => {
          this.formdata.otherPic = this.formdata.otherPicList.join(',')
          if (valid) {
            api.company.getCompanyCoopAudit(this.formdata).then(() => {
              this.$message({
                message: '审核成功!',
                type: 'success'
              })
            })
            this.cancel()
          } else {
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      }
    },
    mounted() {
      this.getSelectData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .form-wrapper
    width: 100%
    height: 100%
    overflow-y: scroll
    .form-box
      padding: 30px
      background: #f0f2f5
      .form
        background: #fff
        padding: 20px 0 20px 10%
        display: block
        .avatar-uploader
          display: inline-block
      .form-btns
        display: block
        clear: both
        background: #ffffff
        .wrap
          width: 400px
          padding-bottom: 30px
          margin-left: calc(10% + 150px)
          text-align: center
          button
            width: 40%
            margin-top: 12px
    .el-input
      width: 400px
    .el-select
      width: 400px
    .el-textarea
      width: 400px
    .notic
      margin-left: 10px
      color: #909090
      font-size: 12px
      vertical-align: top
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
    /deep/ .el-upload--picture-card
      background: #ffffff
</style>
