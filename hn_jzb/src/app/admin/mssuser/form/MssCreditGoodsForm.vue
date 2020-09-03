<template>
  <div class="form-wrapper">
    <div class="form-box">
      <el-form class="form clearfix" ref="form" :model="formdata" label-width="100px" :rules="rules">
        <el-col :sm="item.sm || 24" v-for="(item, index) in forminfo" :key="index">
          <el-form-item v-if="item.value === 'icon'" :label="item.name" :prop="item.value">
            <div class="item">
              <div class="explain"></div>
              <div class="input">
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :http-request="formOptions.icon.uploadFile">
                  <img v-if="helper.getImgUrl(formdata.icon)" :src="helper.getImgUrl(formdata.icon)" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-else-if="item.value === 'content'" :label="item.name" :prop="item.value">
            <div class="item">
              <div class="explain"></div>
              <div class="input">
                <eui-editor :upload-pic="uploadPic"
                            v-model="formdata.content"
                            placeholder="积分礼品内容"
                            :toolbars="toolbarOptions"
                            style="width: 90%">
                </eui-editor>
              </div>
            </div>
          </el-form-item>
          <el-form-item  v-else :label="item.name" :prop="item.value">
            <div class="item">
              <div class="explain"></div>
              <div class="input">
                <eui-input
                  v-model="formdata[item.value]"
                  :type="item.type"
                  :autosize="item.autosize"
                  :placeholder="item.placeholder"
                  :unit="item.unit">
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
  import EuiEditor from '@/components/common/form/EuiEditor'
  import {GOODS} from '../mssuser.config'
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{'header': 1}, {'header': 2}],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],
    [{'indent': '-1'}, {'indent': '+1'}],
    [{'direction': 'rtl'}],
    [{'size': ['small', false, 'large', 'huge']}],
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'font': []}],
    [{'color': []}, {'background': []}],
    [{'align': []}],
    // ['clean'],
    ['link', 'image']
  ]
  export default {
    name: 'mss-creditgoods-form',
    _meta: {
      path: '/mss/creditgoods/form',
      title: ''
    },
    components: {
      EuiInput,
      EuiEditor
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
            to.meta.title = '新增礼品'
          } else {
            to.meta.title = '编辑礼品'
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
            vm.formdata = {...GOODS.FORM_DATA}
          }
        }
      })
    },
    data() {
      return {
        helper,
        forminfo: {...GOODS.FORM_INFO},
        rules: GOODS.RULES,
        formdata: {...GOODS.FORM_DATA},
        formOptions: Object.assign(GOODS.FORM_OPTIONS, {
          icon: {
            uploadFile: (params) => {
              api.public.uploadPic(params.file).then(data => {
                this.formdata.icon = data.path
              })
            }
          }
        }),
        uploadPic: api.public.uploadPic,
        toolbarOptions
      }
    },
    methods: {
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.mssCreditGoods.add(this.formdata).then(() => {
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
              api.mssCreditGoods.update(this.formdata).then(() => {
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
        api.mssCreditGoods.get(id).then(data => {
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
    .el-input
      width: 400px
    .avatar-uploader-icon, .avatar
      width: 150px
      height: 150px
      line-height: 150px
    .form-btns
      display: block
      clear: both
      .wrap
        width: 400px
        margin-left: calc(10% + 100px)
        padding-bottom: 30px
        button
          width: 100%
          margin-top: 12px
</style>
