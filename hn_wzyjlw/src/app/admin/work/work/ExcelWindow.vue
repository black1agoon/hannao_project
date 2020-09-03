<template>
    <eui-window ref="window"
                :options="windowOptions">
      <div class="html-wrap" v-html="htmldata">
      </div>
    </eui-window>
</template>

<script>

  import config from '@/config'
  import helper from '@/app/app.helpers'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import api from '@/api'
  export default {
    name: 'excel-window',
    components: {
      EuiWindow
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        windowOptions: {
          title: 'Excel窗口',
          width: '1100px'
        },
        htmldata: null
      }
    },
    methods: {
      open(row) {
        this.getExcel(row.id).then(() => {
          this.$refs.window.open()
        })
      },
      getExcel(id) {
        return api.workshopOrder.getExcel(id).then(data => {
          this.htmldata = data
          console.log(data)
        })
      }
    },
    created() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .html-wrap
    /*width: 100%*/
    height: 600px
    padding: 10px 20px
  /deep/ .el-dialog__body
    overflow-y: auto
  /deep/ .el-dialog__footer
    padding: 0 !important
  /deep/ table
    tr
      border: 1px solid #000
      td
        border: 1px solid #000
</style>
<style>
</style>
