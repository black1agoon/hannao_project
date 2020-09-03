<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form v-loading="loading" class="clearfix" ref="form" :model="formdata" label-width="60px" :rules="rules" style="padding: 20px; display: block">
      <el-col :sm="24">
        <el-form-item label="文件" prop="file">
          <el-input
              style="width: calc(100% - 160px)"
              v-model="formdata.file"
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
        </el-form-item>
      </el-col>
    </el-form>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/app/produce/components/form/EuiWindow'
  export default {
    name: 'import',
    components: {
      EuiWindow
    },
    props: {
      apiTemplate: Function,
      apiUpload: Function
    },
    data() {
      return {
        windowOptions: {
          title: '导入',
          width: '500px'
        },
        loading: false,
        formdata: {
          file: null
        },
        rules: {
          file: [{
            required: true, message: '请选取文件', trigger: 'change'
          }]
        }
      }
    },
    methods: {
      open() {
        this.$refs.window.open()
      },
      cancel() {
        this.$refs.window.cancel()
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            // console.log(this.$refs.upload)
            this.$refs.upload.submit()
          }
        })
      },
      getTemplate() {
        // window.open(api.produce.plan.DownloadMapTemplateAsync())
        this.apiTemplate()
      },
      uploadFile(params) {
        this.loading = true
        this.apiUpload({
         file: params.file
        }).then(() => {
          this.$message({
            message: '导入成功!',
            type: 'success'
          })
          this.$emit('reload')
          this.cancel()
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      handleChange(file, fileList) {
        const currentfile = fileList.filter(f => f.name === file.name)
        if (currentfile.length > 1) {
          fileList.splice(fileList.findIndex(f => f.name === file.name), 1)
        }
        this.formdata.file = file.name
      },
      beforeUpload(file) {
        return file.name === this.formdata.file
      },
    }
  }
</script>

<style lang="sass" scoped>
  .btn-upload
    margin: 0 5px
    display: inline-block
  .temp
    cursor: pointer
    text-decoration: underline
    color: #606266
  .clearfix
    display: inline-block
    &:after
      content: ''
      display: block
      height: 0
      line-height: 0
      clear: both
</style>