<template>
  <div class="form-wrapper">
    <div class="form-box">
      <eui-tips>
        <ul>
          <li>标识"<em>*</em>"的选项为必填项，其余为选填项</li>
          <li>企业相关信息设置，请谨慎填写信息</li>
        </ul>
      </eui-tips>
      <el-form class="form2 clearfix" ref="form" :model="formdata" label-width="150px" :rules="COMPANY_RULES">
        <div v-for="(item, index) in COMPANY_FORM" :key="index">
          <div class="big-title">
            <i class="el-icon-edit"></i><span>{{item.title}}</span>
          </div>
          <el-col :sm="24" v-for="(it, i) in item.forms" :key="i">
            <el-form-item :label="it.name" :prop="it.value">
              <eui-input v-if="it.value === 'username'"
                         v-model="formdata[it.value]"
                         :disabled="editingFlag">
              </eui-input>
              <el-upload
                v-else-if="it.value === 'legalIdcardPic'"
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
              <eui-input
                v-else-if="it.value === 'region'"
                :type="it.type"
                :cascader-item-change="regionItemChange"
                v-model="formdata[it.value]"
                :cascader-list="formdata.regionList"
                :options="formOptions.region">
              </eui-input>
              <eui-input v-else
                         v-model="formdata[it.value]"
                         :type="it.type"
                         :readonly="it.readonly"
                         :suffixIcon="it.suffixIcon"
                         :options="formOptions[it.value]"
                         :autosize="it.autosize"
                         :clearable="it.clearable"
                         @suffixClick="formFunctions(it.value, 'suffixClick')">
              </eui-input>
              <span v-if="it.notic" class="notic">{{it.notic}}</span>
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
    <user-chose-window ref="userWindow"></user-chose-window>
  </div>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import {mapState} from 'vuex'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiTips from '@/components/common/tools/EuiTips'
  import {COMPANY_FORM, COMPANY_RULES, COMPANY_INFO} from '../company.config'
  import UserChoseWindow from '@/app/admin/common/UserChoseWindow'
  export default {
    name: 'company-info-form',
    _meta: {
      path: 'company/infoform',
      title: ''
    },
    components: {
      EuiInput,
      EuiTips,
      UserChoseWindow
    },
    computed: {
      ...mapState([
        'tabs'
      ])
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getSelectData()
        vm.getProv()
        if (from.path === '/') {
          vm.$router.push('/')
          vm.$store.commit('REMOVE_TAB', vm.name)
        } else {
          if (!to.query.id && !vm.formdata.id || to.query.id === null) {
            to.meta.title = '企业新增'
            vm.editingFlag = false
          } else {
            to.meta.title = '企业编辑'
            vm.editingFlag = true
          }
          vm.$store.commit('UPDATE_TAB', {
            ...to,
            title: to.meta.title,
            keep: to.meta.keep || false
          })
          if (to.query.id && vm.formdata.id !== to.query.id) {  // 传进来的id存在
            vm.getData(to.query.id)
          } else if (vm.formdata.id && to.query.id !== null) { // query.id不存在, formdata.id存在, 且不是 新增
            // vm.getData(vm.formdata.id)
          } else if ((!vm.formdata.id && !to.query.id) || vm.formdata.id === to.query.id) {
          } else {   // 没有传id，则认为是新增
            vm.formdata = {...COMPANY_INFO}
          }
        }
      })
    },
    data() {
      return {
        helper,
        COMPANY_FORM,
        COMPANY_RULES,
        formdata: {...COMPANY_INFO},
        formOptions: {
          agentId: [{
            label: '平台',
            value: '0000000000000000'
          }],
          barCodeEnable: [{
            value: 0,
            label: '不启用'
          }, {
            value: 1,
            label: '启用'
          }],
          icChipEnable: [{
            value: 0,
            label: '不启用'
          }, {
            value: 1,
            label: '启用'
          }],
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
            label: '初始化资料'
          }, {
            value: 1,
            label: '申请中'
          }, {
            value: 2,
            label: '通过申请'
          }, {
            value: 3,
            label: '拒绝申请'
          }, {
            value: 4,
            label: '禁用'
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
          },
          region: []
        },
        editingFlag: false
      }
    },
    created() {
      this.$on('checkedNode', (node) => {
        this.formdata.csmIdName = node.realname
        this.formdata.csmId = node.id
      })
    },
    methods: {
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.formdata.otherPic = this.formdata.otherPicList.join(',')
            if (!this.formdata.id) {
              api.company.addCompany(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.removeTab(this.$route.name)
                  }
                })
              })
            } else {
              delete this.formdata.password
              api.company.updateCompany(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.removeTab(this.$route.name)
                  }
                })
              })
            }
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
        }), api.companyGrade.getCompanyGradeEnablePaged({
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
      formFunctions(val, method) {
        let funs = {
          csmIdName: {
            suffixClick: () => {
              this.$refs.userWindow.open()
            }
          }
        }
        funs[val][method].call(this)
      },
      getData(id) {
        api.company.getCompany(id).then(data => {
          this.formdata = data
          this.formdata.regionList = []
          this.formdata.otherPicList = this.formdata.otherPic
          this.getRegionList()
        })
      },
      getProv() {
        api.public.getRegionProv().then(data => {
          this.formOptions.region = data.map(prov => ({
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
            this.formOptions.region[findIndex(this.formOptions.region, val[0])].children = cities.map(city => ({
              label: city,
              value: city,
              children: []
            }))
          })
        } else if (val.length === 2) {
          api.public.getRegionDistrict(val[1]).then(districts => {
            this.formOptions.region[findIndex(this.formOptions.region, val[0])].children[findIndex(this.formOptions.region[findIndex(this.formOptions.region, val[0])].children, val[1])].children = districts.map(district => ({
              label: district.district,
              value: district.id
            }))
          })
        }
      },
      getRegionList() {
        if (this.formdata.region) {
          let findIndex = (items, value) => {
            let index = -1
            items.forEach((item, i) => {
              if (item.label === value) {
                index = i
              }
            })
            return index
          }
          api.public.getRegionById(this.formdata.region).then(data => {
            api.public.getRegionCities(data.prov).then(cities => {
              this.formOptions.region[findIndex(this.formOptions.region, data.prov)].children = cities.map(city => ({
                label: city,
                value: city,
                children: []
              }))
              api.public.getRegionDistrict(data.city).then(districts => {
                this.formOptions.region[findIndex(this.formOptions.region, data.prov)].children[findIndex(this.formOptions.region[findIndex(this.formOptions.region, data.prov)].children, data.city)].children = districts.map(district => ({
                  label: district.district,
                  value: district.id
                }))
                this.formdata.regionList = [data.prov, data.city, data.id]
                this.$forceUpdate()
              })
            })
          })
        }
      }
    },
    mounted() {
    }
    // beforeRouteUpdate (to, from, next) {
    //   this.getSelectData()
    //   this.getProv()
    //   next()
    // }
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
      .form2
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
          button
            width: 100%
            margin-top: 12px
    .el-input, .el-date-editor, .el-select, .el-textarea
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
