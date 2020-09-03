<template>
  <div id="app" class="skin-blue">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    },
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    mounted() {
      if (this.$route.path && this.$route.path.indexOf('index.html') > 0) {
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
*
  font-family: 'Microsoft YaHei'
#app
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  height: 100%

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

  [class*=" el-icon-"].avatar-uploader-icon, [class^=el-icon-].avatar-uploader-icon {
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
