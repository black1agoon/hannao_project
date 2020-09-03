<template>
  <div class="image-wrapper">
    <div class="piclist">
      <div class="pic-wrapper" v-for="(pic, index) in dataList" :key="index">
        <div class="pic">
          <img :src="helper.getImgUrl(pic.imagePath)" @click="showBigpic(helper.getImgUrl(pic.imagePath))">
          <span class="el-icon-close delete" @click="deletePic(pic.id)"></span>
        </div>
      </div>
      <el-upload
        ref="upload"
        :multiple="true"
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :http-request="uploadFile">
        <i class="el-icon-plus"></i>
      </el-upload>
    </div>
    <pic-looking-mask
      ref="piclook"
      :src="showPicUrl">
    </pic-looking-mask>
  </div>
</template>

<script>
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import helper from '@/app/app.helpers'
  import api from '@/api'
  export default {
    name: 'image-list',
    components: {
      MainToolbar
    },
    props: {
      buttons: {
        type: Array,
        default: () => []
      },
      dataList: {
        type: Array,
        default: () => []
      },
      workshopOrderId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        helper,
        showPicUrl: null
      }
    },
    methods: {
      deletePic(id) {
        this.$confirm(`是否删除该图？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          api.workshopOrderImage.delete(id).then(() => {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.$emit('reload')
          })
        }).catch(() => {
        })
      },
      uploadFile(params) {
        if (!this.workshopOrderId) {
          this.$message.warning('请先选择要添加图片的订单')
          return false
        }
        let isJpg = params.file.type === 'image/jpeg'
        let isPng = params.file.type === 'image/png'
        if (isJpg || isPng) {
          api.workshopOrder.upload(params.file).then(data => {
            let _image = {}
            _image.imagePath = data.path
            _image.workshopOrderId = this.workshopOrderId
            api.workshopOrderImage.add(_image).then(() => {
              this.$message({
                message: '新增成功!',
                type: 'success'
              })
              this.$emit('reload')
            })
          })
        } else {
          this.loading = false
          this.$message.error('上传图片只能是 JPG或者PNG 格式!')
        }
      },
      showBigpic(url) {
        this.showPicUrl = url
        this.$refs.piclook.show()
      }
    },
    mounted() {
    },
    watch: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.image-wrapper
  height: 100%
  overflow-y: auto
  .piclist
    display: flex
    flex-wrap: wrap
    width: 900px
    .pic-wrapper
      width: 100px
      text-align: center
      margin: 10px 5px 10px 5px
      position: relative
      .el-input
        width: 150px
        margin-top: 10px
      .pic
        &:hover
          img, .delete
            opacity: 1
        img
          display: block
          border: 1px solid #e4e7ed
          box-sizing: border-box
          padding: 2px
          width: 100px
          height: 100px
          opacity: 0.8
          transition: all 0.5s
        .delete
          position: absolute
          top: -5px
          right: -5px
          width: 20px
          height: 20px
          line-height: 20px
          display: block
          font-size: 16px
          color: #fff
          transition: all 0.5s
          cursor: pointer
          opacity: 0
          border-radius: 50%
          background: rgba(38, 38, 38, 0.5)
          text-align: center

  /deep/ .el-upload
    width: 100px
    height: 100px
    line-height: 100px
    margin: 10px 5px 10px 5px
</style>
