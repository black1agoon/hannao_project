<template>
  <div>
    <eui-window ref="window"
                :options="windowOptions">
      <div class="file-wrapper" v-loading="loading">
        <div class="dashed-wrap">
          <span>请选择需要导入的Excel文件</span>
          <el-upload
              class="btn-upload"
              ref="upload"
              action=""
              :show-file-list="false"
              :auto-upload="false"
              :http-request="uploadFile"
              :on-change="handleChange"
              :before-upload="beforeUpload">
            <el-button slot="trigger" size="mini" plain>选取文件</el-button>
          </el-upload>
          <div class="filename">{{filename}}</div>
        </div>
      </div>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">上传</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
  </div>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'

  export default {
    name: 'work-shop-order-import',
    components: {
      EuiWindow
    },
    props: {
      uploadApi: {
        type: Function,
        default: () => {}
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        loading: false,
        filename: '未选择文件',
        windowOptions: {
          title: this.title,
          width: '480px'
        }
      }
    },
    methods: {
      open() {
        this.filename = '未选择文件'
        this.$refs.window.open()
      },
      uploadFile(params) {
        this.loading = true
        this.uploadApi(params).then((data) => {
          this.loading = false
          this.$message({
            message: '导入成功!',
            type: 'success'
          })
          this.$refs.window.cancel()
          this.$emit('reload', data)
        }).catch(() => {
          this.loading = false
        })
        // api.assetController.importTemplate(params).then((data) => {
      },
      sure() {
        this.$refs.upload.submit()
      },
      cancel() {
        this.$refs.window.cancel()
      },
      handleChange(file, fileList) {
        let currentfile = fileList.filter(f => f.name === file.name)
        if (currentfile.length > 1) {
          fileList.splice(fileList.findIndex(f => f.name === file.name), 1)
        }
        this.filename = file.name
      },
      beforeUpload(file) {
        return file.name === this.filename
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.file-wrapper
  padding: 20px
  .dashed-wrap
    border: 1px dashed #e9e9e9
    border-radius: 8px
    padding: 30px
    text-align: center
    .btn-upload
      display: inline-block
      margin-left: 10px
    .filename
      margin-top: 10px
</style>
