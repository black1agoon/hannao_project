<template>
  <eui-window ref="window"
              :options="windowOptions">
    <eui-layout :regions="region">
      <div class="detail-container" slot="north">
        <div class="label">条码: {{recordDetail.barCode}}</div>
        <div class="label">款号: {{recordDetail.styleCode}}</div>
        <div class="label">品名: {{recordDetail.StyleName}}</div>
        <div class="label">颜色: {{recordDetail.colorName}}</div>
        <div class="label">尺码: {{recordDetail.size}}</div>
      </div>
      <eui-table slot="center"
                 size="mini"
                 :showPagination="false"
                 :options="tableOptions">
      </eui-table>
    </eui-layout>
    <div slot="btns">
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/app/produce/components/form/EuiWindow'
  import EuiLayout from '@/app/produce/components/layout/EuiLayout'
  import EuiTable from '@/app/produce/components/form/EuiTable'
  import {api} from '@/api'
  export default {
    name: 'bar-code-record-window',
    components: {
      EuiWindow,
      EuiLayout,
      EuiTable
    },
    data() {
      return {
        region: {
          north: {},
          middle: {
            center: {}
          }
        },
        windowOptions: {
          title: '生产流水',
          width: '1000px'
        },
        tableOptions: {
          total: 0,
          data: [],
          columns: [
            {prop: 'createTime', label: '最新更新时间', minWidth: 100},
            {prop: 'recordContent', label: '流水记录', minWidth: 100},
            {prop: 'createUser', label: '操作人', minWidth: 100}
          ]
        },
        recordDetail: {}
      }
    },
    methods: {
      open(row) {
        this.recordDetail = row
        api.produce.plan.SelectBarCodeRecord({BarCode: row.barCode}).then(data => {
          this.tableOptions.data = data
          this.$refs.window.open()
        })
      },
      cancel() {
        this.$refs.window.cancel()
      }
    }
  }
</script>

<style lang="sass" scoped>
::v-deep
  .el-dialog__body
    height: 500px
.detail-container
  display: flex
  font-size: 14px
  line-height: 40px
  padding: 0 30px
  text-align: center
  .label
    flex: 1
</style>