<template>
  <eui-window ref="window"
              :options="windowOptions">
    <eui-layout :regions="region">
      <div class="btn-container" slot="north">
        <el-button class="button" type="primary" size="small" @click="barCodePrint">
          <i class="btn-icon fa fa-check-square-o"></i>条码补打
        </el-button>
      </div>
      <eui-table slot="center"
                 size="mini"
                 :show-index="false"
                 :show-selection="true"
                 :showPagination="false"
                 :options="tableOptions">
      </eui-table>
      <el-tabs slot="south"
               type="card"
               size="small"
               value="first"
               style="height: 100%">
        <el-tab-pane label="条码流水记录" name="first">
          <eui-table size="mini"
                     :showPagination="false"
                     :options="subTableOptions">
          </eui-table>
        </el-tab-pane>
      </el-tabs>
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
    name: 'bar-code-detail-window',
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
          },
          south: {
            style: {
              height: '40%'
            }
          }
        },
        windowOptions: {
          title: '条码明细',
          width: '1300px'
        },
        tableOptions: {
          data: [],
          columns: [
            {prop: 'barCode', label: '条码', minWidth: 100},
            {prop: 'styleCode', label: '款号', minWidth: 100},
            {prop: 'colorName', label: '颜色', minWidth: 100},
            {prop: 'size', label: '尺码', minWidth: 100}
          ],
          rowClick: (row) => {
            this.BarCode = row.barCode
            this.SelectBarCodeRecord()
          },
          handleSelectionChange: val => {
            this.barCodeSelect = val
          }
        },
        subTableOptions: {
          data: [],
          columns: [
            {prop: 'createTime', label: '最新更新时间', minWidth: 100},
            {prop: 'recordContent', label: '流水记录', minWidth: 100},
            {prop: 'createUser', label: '操作人', minWidth: 100}
          ]
        },
        BarCode: null,
        barCodeSelect: []
      }
    },
    methods: {
      open(row) {
        api.produce.plan.SelectProBarCodeDetail({
          SizeDetailId: row.sizeDetailId
        }).then(data => {
          this.tableOptions.data = data || []
          this.$refs.window.open()
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      SelectBarCodeRecord() {
        api.produce.plan.SelectBarCodeRecord({BarCode: this.BarCode}).then(data => {
          // data = Array.from({length: 10}, () => ({}))
          this.subTableOptions.data = data
        })
      },
      barCodePrint() {
        //
        this.$emit('barCodePrint', this.barCodeSelect)
      }
    }
  }
</script>

<style lang="sass" scoped>
  ::v-deep
    .el-dialog__body
      height: 800px
  .btn-container
    font-size: 14px
    line-height: 40px
    padding: 0 10px
</style>