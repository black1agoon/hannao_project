<template>
  <div class="form-wrapper">
    <div class="form-box">
      <eui-tips>
        <ul>
          <li>标识"<em>*</em>"的选项为必填项，其余为选填项</li>
          <li>企业相关信息设置，请谨慎填写信息</li>
        </ul>
      </eui-tips>
      <el-form class="form2 clearfix" ref="form" :model="formdata" label-width="130px" :rules="rules">
        <el-col :sm="24" v-for="(item, index) in FORMDATA" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <eui-input v-if="item.value !== 'gradeImg'" v-model="formdata[item.value]"
                       :type="item.type"
                       :readonly="item.readonly"
                       :suffixIcon="item.suffixIcon"
                       :options="formOptions[item.value]"
                       :autosize="item.autosize">
            </eui-input>
            <el-upload
              v-else
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="formOptions.gradeImg.uploadFile">
              <img v-if="helper.getImgUrl(formdata.gradeImg)" :src="helper.getImgUrl(formdata.gradeImg)" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span v-if="item.notic" class="notic">{{item.notic}}</span>
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
  import EuiTips from '@/components/common/tools/EuiTips'

  const FORMDATA = [
    {
      name: '等级名称',
      value: 'name'
    }, {
      name: '可发布产品总和',
      value: 'goodsSun',
      type: 'number'
    }, {
      name: '等级图标',
      value: 'gradeImg',
      notic: '点击上传和替换图片'
    }, {
      name: '等级描述',
      value: 'gradeIntroduce',
      type: 'textarea',
      autosize: {
        minRows: 2,
        maxRows: 4
      }
    }, {
      name: '条码数',
      value: 'barCodeCount',
      type: 'number'
    }, {
      name: '条码功能',
      value: 'barCodeEnable',
      type: 'ratio'
    }, {
      name: '芯片功能',
      value: 'icChipEnable',
      type: 'ratio'
    }, {
      name: '是否默认',
      value: 'isDefault',
      type: 'ratio'
    }, {
      name: '是否启用',
      value: 'isOpen',
      type: 'ratio'
    }, {
      name: '排序',
      value: 'seq',
      type: 'number'
    }
  ]
  const INFO = {
    name: null, // 等级名称
    goodsSun: null, // 可发布的产品总和
    gradeImg: null, // 等级图标地址
    gradeIntroduce: null, // 等级描述
    isDefault: 0, // 是否默认
    isOpen: 1, // 是否启用
    barCodeCount: null,
    barCodeEnable: 1,
    icChipEnable: 0,
    seq: null  // 排序
  }
  export default {
    name: 'company-grade-form',
    _meta: {
      path: 'company/gradeform',
      title: ''
    },
    components: {
      EuiInput,
      EuiTips
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
          if (!to.query.id && !vm.formdata.id || to.query.id === null) {
            to.meta.title = '等级新增'
          } else {
            to.meta.title = '等级编辑'
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
          } else if ((!vm.formdata.id && !to.query.id) || vm.formdata.id === to.query.id) { // 切换到别的页面，再切回来 则什么都不用做
          } else {   // 没有传id，则认为是新增
            vm.formdata = {...INFO}
          }
        }
      })
    },
    data() {
      return {
        helper,
        FORMDATA,
        rules: {
          name: [{
            required: true, message: '请输入等级名称', trigger: ['blur', 'change']
          }],
          goodsSun: [{
            required: true, message: '请输入发布产品总和', trigger: ['blur', 'change']
          }]
        },
        formdata: JSON.parse(JSON.stringify(INFO)),
        formOptions: {
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
          isDefault: [{
            value: 0,
            label: '否'
          }, {
            value: 1,
            label: '是'
          }],
          isOpen: [{
            value: 0,
            label: '不启用'
          }, {
            value: 1,
            label: '启用'
          }],
          gradeImg: {
            uploadFile: (params) => {
              api.public.uploadPic(params.file).then(data => {
                this.formdata.gradeImg = data.path
              })
            }
          }
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.companyGrade.addCompanyGrade(this.formdata).then(() => {
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
              api.companyGrade.updateCompanyGrade(this.formdata).then(() => {
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
            }
          }
        })
        this.$store.commit('REMOVE_TAB', targetName)
      },
      getData(id) {
        api.companyGrade.getCompanyGrade(id).then(data => {
          this.formdata = data
        })
      }
    },
    mounted() {
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
      .form2
        background: #fff
        padding: 20px 0 20px 10%
        display: block
        .avatar-uploader
          display: inline-block
    .el-input
      width: 400px
    .el-select
      width: 400px
    .el-textarea
      width: 400px
    .avatar-uploader-icon
      width: 150px
      height: 150px
      line-height: 150px
    .notic
      margin-left: 10px
      color: #909090
      font-size: 12px
      vertical-align: top
    .form-btns
      display: block
      clear: both
      background: #ffffff
      .wrap
        width: 400px
        margin-left: calc(10% + 130px)
        padding-bottom: 30px
        button
          width: 100%
          margin-top: 12px
</style>
