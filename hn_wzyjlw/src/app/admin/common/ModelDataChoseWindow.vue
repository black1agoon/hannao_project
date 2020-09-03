<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-transfer :data="transferOptions.data"
                  :choseData="transferOptions.choseData"
                  :filter-holder="transferOptions.filterHolder"
                  :value.sync="transferOptions.value">
    </eui-transfer>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiTransfer from '@/components/common/form/EuiTransfer'
  export default {
    name: 'model-data-chose-window',
    components: {
      EuiWindow,
      EuiTable,
      EuiTransfer
    },
    props: {
    },
    data() {
      return {
        from: null,
        stationId: null,
        query: {
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '模型数据',
          width: '500px'
        },
        transferOptions: {
          data: [],
          value: [],
          choseData: [],
          filterHolder: '请输入模型数据名称'
        }
      }
    },
    methods: {
      getChoseData() {
        api.stationValue.getChoose(this.stationId).then(data => {
          this.transferOptions.data = data.allData.map(d => ({
            label: d.message,
            key: d.id,
            filter: d.message
          }))
          this.transferOptions.value = data.choose.map(d => d.id)
        })
      },
      sure() {
        api.stationValue.setChange({
          stationId: this.stationId,
          modelDataIds: this.transferOptions.value
        }).then(data => {
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
          this.$refs.window.cancel()
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      open(row, from = 'form') {
        this.from = from
        this.$refs.window.open()
        this.stationId = row.id
        this.getChoseData()
      },
      clearSearch() {},
      search() {}
    },
    mounted() {
    },
    create() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog
    height: 70%
  /deep/ .el-dialog__body
    padding: 0 20px
    height: calc(100% - 78px)
    overflow-y: auto

</style>
