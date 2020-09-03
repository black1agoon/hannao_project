<template>
  <eui-window ref="window"
              :options="windowOptions">
    <div class="ratio-wrapper">
      <el-button class="user" type="primary" plain @click="userChose">用户中选择</el-button>
      <el-button class="define" type="primary" plain @click="defineAdd">自定义添加</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  export default {
    name: 'type-of-add-user',
    components: {
      EuiWindow
    },
    data() {
      return {
        name: null,
        windowOptions: {
          title: '类型选择',
          width: '300px'
        }
      }
    },
    methods: {
      open(name) {
        this.name = name
        this.$refs.window.open()
      },
      userChose() {
        this.$parent.$emit('typeofadduser', {
          name: this.name,
          value: 0
        })
        // this.$refs.window.cancel()
      },
      defineAdd() {
        this.$parent.$emit('typeofadduser', {
          name: this.name,
          value: 1
        })
        // this.$refs.window.cancel()
      },
      cancel() {
        this.$refs.window.cancel()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.ratio-wrapper
  padding: 20px
  display: flex
  .user
    flex: 1
  .define
    flex: 1
/deep/ .el-dialog__footer
  padding: 0 !important
</style>
