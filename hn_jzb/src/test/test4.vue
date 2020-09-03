<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action=""
      list-type="picture-card"
      :show-file-list="true"
      :file-list="getFlieList(otherpic)"
      :multiple="true"
      :http-request="uploadFile"
      :on-remove="handleRemove">
      <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
      <i class="el-icon-plus"></i>
    </el-upload>
    <button @click="aaa">按钮</button>
  </div>
</template>

<script>
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import Test from '@/components/common/form/Test'
  import api from '@/api'
  import config from '@/config'
  export default {
    name: 'test4',
    _meta: {
      path: 'test4',
      title: '测试444'
    },
    components: {
      EuiLayout,
      Test
    },
    data() {
      return {
        imageUrl: '',
        serverURI: config.serverURI,
        otherpic: ['/upload/user/avatar/e6525ef9bfeb40e980d8f48a957b7741.png', '/upload/user/avatar/5afca1ed0fb242ce9ecd9c25f06c2784.jpg', '/upload/user/avatar/5219aa9d1ac54b059c3fabd2a435fbbb.png']
      }
    },
    methods: {
      aaa() {
        console.log(this.otherpic)
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      uploadFile(params) {
        // console.log(params)
        api.public.uploadAvatar(params.file).then(data => {
          // console.log(data)
          if (!this.otherpic) {
            this.otherpic = []
            this.otherpic.push(data.path)
          } else {
            this.otherpic.push(data.path)
          }
          this.imageUrl = this.serverURI + data.path
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
        this.otherpic = this.otherpic.filter(l => l.split('/')[l.split('/').length - 1] !== file.name)
      },
      getFlieList(list) {
        return list.map(l => ({
          name: l.split('/')[l.split('/').length - 1],
          url: this.serverURI + l
        }))
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
