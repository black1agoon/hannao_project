<template>
  <div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form v-loading="loading" class="clearfix" ref="form" :model="formdata" label-width="100px" :rules="rules"
               style="padding: 20px;display: block">
        <el-col :sm="24" v-for="(item, index) in FORM_INFO" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <template v-if="item.value === 'file'" style="display: flex">
              <el-input
                style="width: calc(100% - 150px)"
                v-model="formdata[item.value]"
                :readonly="true"
                size="small">
              </el-input>
              <el-upload
                class="btn-upload"
                ref="upload"
                action=""
                :show-file-list="false"
                :auto-upload="false"
                :http-request="uploadFile"
                :on-change="handleChange"
                :before-upload="beforeUpload">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
              <span class="temp" @click="getTemplate">获取模板</span>
            </template>
            <eui-input v-else v-model="formdata[item.value]"
                       :type="item.type"
                       :readonly="item.readonly"
                       :suffixIcon="item.suffixIcon"
                       :options="formOptions[item.value]"
                       :autosize="item.autosize">
            </eui-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">导入</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
  </div>
</template>

<script>
  import api from '@/api'
  import config from '@/config'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'

  const FORM_INFO = [{
    name: '模板文件',
    value: 'file'
  }]
  const FORM_DATA = {
    file: null,
    companyId: null,
    companyName: null
  }
  export default {
    name: 'create-bar-code',
    components: {
      EuiWindow,
      EuiInput
    },
    data() {
      return {
        loading: false,
        serverURI: config.serverURI,
        FORM_INFO,
        formdata: {...FORM_DATA},
        formOptions: {},
        rules: {
          file: [{
            required: true, message: '请选取模板文件', trigger: 'change'
          }]
        },
        windowOptions: {
          title: '导入模板',
          width: '480px'
        }
      }
    },
    methods: {
      open() {
        this.formdata = {...FORM_DATA}
        this.$refs.window.open()
      },
      uploadFile(params) {
        this.loading = true
        let data = new FormData()
        data.append('file', params.file)
        api.companyProduct.productImport(data).then(() => {
          this.loading = false
          this.$message({
            message: '产品信息导入成功!',
            type: 'success'
          })
          this.$refs.window.cancel()
          this.$parent.$emit('reload')
        }).catch(() => {
          this.loading = false
        })
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$refs.upload[0].submit()
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      handleChange(file, fileList) {
        let currentfile = fileList.filter(f => f.name === file.name)
        if (currentfile.length > 1) {
          fileList.splice(fileList.findIndex(f => f.name === file.name), 1)
        }
        this.formdata.file = file.name
      },
      beforeUpload(file) {
        return file.name === this.formdata.file
      },
      getTemplate() {
        window.open(this.serverURI + api.companyProduct.getProductTemplate())
      }
    },
    created() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn-upload
    width: 80px
    display: inline-block

  .temp
    cursor: pointer
    text-decoration: underline
    color: #606266

  .is-success
    .el-input__inner
      border: 1px solid #dcdfe6 !important

  .el-form-item.is-success
    .el-textarea__inner
      border: 1px solid #dcdfe6 !important
</style>
