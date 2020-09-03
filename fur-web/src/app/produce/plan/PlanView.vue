<template>
  <eui-layout :regions="region">
    <div slot="north" class="btns-wrapper">
      <template v-for="(btn, index) in buttons">
        <el-button
            :key="index"
            type="primary"
            size="small" @click="onBtnClick(btn.btnKey)">
          <i :class="['btn-icon fa', btn.icon]"></i>{{btn.name}}
        </el-button>
      </template>
      <div class="input-wrapper">
        <span class="label">制单时间:</span>
        <eui-input
            class="input"
            type="date"
            :clearable="true"
            v-model="query.createTimeStart">
        </eui-input>
        至
        <eui-input
            class="input"
            type="date"
            :clearable="true"
            v-model="query.createTimeEnd">
        </eui-input>
        <span class="label">交期:</span>
        <eui-input
            class="input"
            type="date"
            :clearable="true"
            v-model="query.deliverDateStart">
        </eui-input>
        至
        <eui-input
            class="input"
            type="date"
            :clearable="true"
            v-model="query.deliverDateEnd">
        </eui-input>
        <span class="label">任务单编号:</span>
        <eui-input
            class="input"
            v-model="query.code">
        </eui-input>
        <span class="label">状态:</span>
        <eui-input
            class="input"
            type="select"
            :options="searchOptions.proState"
            v-model="query.proState">
        </eui-input>
        <el-button class="button" type="primary" size="small" @click="tableOptions.reload">
          <i class="btn-icon fa fa-search"></i>查询
        </el-button>
        <el-button class="button" type="primary" size="small" @click="onBtnClick('reset')">
          <i class="btn-icon fa fa-undo"></i>重置
        </el-button>
      </div>
    </div>
    <eui-table
        slot="center"
        ref="table"
        :show-selection="true"
        :showPagination="true"
        :show-index="false"
        :highlight-current-row="true"
        :options="tableOptions">
    </eui-table>
    <el-tabs slot="south"
             type="card"
             size="small"
             :value="tabValue"
             @tab-click="tabClick"
             style="height: 100%">
      <el-tab-pane label="尺码明细" name="first">
        <eui-table
            :showPagination="false"
            :highlight-current-row="true"
            :options="subTableOptions">
          <el-table-column label="操作" width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="text"
                  @click="onBtnClick('barCodeDetail', scope.row)">
                条码明细
              </el-button>
            </template>
          </el-table-column>
        </eui-table>
      </el-tab-pane>
      <el-tab-pane label="条码明细" name="second" class="tab-container">
        <div class="buttons-wrap">
          <el-button class="button" type="primary" size="small" @click="onBtnClick('btnBarcodeBD', barCodeSelect)">
            <i class="btn-icon fa fa-check-square-o"></i>条码补打
          </el-button>
        </div>
        <eui-table
            class="sub-table"
            :showPagination="false"
            :show-selection="true"
            :show-index="false"
            :highlight-current-row="true"
            :options="subTable2Options">
          <el-table-column label="流水查看" width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  type="text"
                  @click="onBtnClick('lookRecord', scope.row)">
                流水查看
              </el-button>
            </template>
          </el-table-column>
        </eui-table>
      </el-tab-pane>
    </el-tabs>
    <bar-code-record-window ref="barcodeRecord">
    </bar-code-record-window>
    <bar-code-detail-window ref="barcodeDetail" @barCodePrint="(select) => onBtnClick('btnBarcodeBD', select)">
    </bar-code-detail-window>
    <plan-view-window ref="window" @reload="getTableData">
    </plan-view-window>
    <la-export-dialog ref="exportDialog" :is-all="true"></la-export-dialog>
    <import-dialog ref="importDialog"
                   :api-template="apiTemplate"
                   :api-upload="apiUpload">
    </import-dialog>
    <barcode-print ref="barcodePrint">
    </barcode-print>
    <plan-bill-print ref="planbillPrint">
    </plan-bill-print>
  </eui-layout>
</template>

<script>
  import EuiTable from '@/app/produce/components/form/EuiTable'
  import EuiLayout from '@/app/produce/components/layout/EuiLayout'
  import {PLAN} from '../produce.config'
  import {api} from '@/api'
  import EuiInput from '@/app/produce/components/form/EuiInput'
  import BarCodeRecordWindow from './window/BarCodeRecordWindow'
  import BarCodeDetailWindow from './window/BarCodeDetailWindow'
  import PlanViewWindow from './window/PlanViewWindow'
  import LaExportDialog from '@/components/base/LaExportDialog.vue'
  import ImportDialog from '@/app/produce/components/common/ImportDialog'
  import BarcodePrint from './print/BarcodePrint'
  import PlanBillPrint from './print/PlanBillPrint'
  export default {
    name: 'PlanView',
    components: {
      EuiInput,
      EuiTable,
      EuiLayout,
      BarCodeRecordWindow,
      BarCodeDetailWindow,
      PlanViewWindow,
      LaExportDialog,
      ImportDialog,
      BarcodePrint,
      PlanBillPrint
    },
    computed: {
    },
    data() {
      return {
        region: PLAN.region,
        apiTemplate: api.produce.plan.DownloadMapTemplateAsync2,
        apiUpload: api.produce.plan.XlsUpload,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'code', label: '生产任务单号', minWidth: 120},
            {prop: 'styleCode', label: '款号', minWidth: 80},
            {prop: 'colorName', label: '颜色', minWidth: 80},
            {prop: 'customerName', label: '客户', minWidth: 100},
            {prop: 'number', label: '数量', minWidth: 80},
            {prop: 'proState', label: '状态', minWidth: 80},
            {prop: 'deliverDate', label: '交期', minWidth: 80},
            {prop: 'userName', label: '制单人', minWidth: 80},
            {prop: 'createTime', label: '制单时间', minWidth: 80},
          ],
          rowClick: (row) => {
            // this.$refs.table.callByName('toggleRowSelection', row)
            this.subQuery.parGuid = row.parGuid
            this.selectRow = row
            if (this.tabValue === 'second') {
              this.getSubTable2Data()
            } else {
              this.getSubTableData()
            }
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.rows = name === 'rows' ? val : this.query.rows
            this.getTableData()
          },
          handleSelectionChange: val => {
            this.tableRowsSelect = val.map(v => v.parGuid)
          }
        },
        subTableOptions: {
          data: [],
          columns: [
            {prop: 'colorName', label: '颜色', minWidth: 100},
            {prop: 'type', label: '类型', minWidth: 100},
            {prop: 'size', label: '尺码', minWidth: 100},
            {prop: 'number', label: '数量', minWidth: 100},
            {prop: 'printState', label: '状态', minWidth: 100}
          ]
        },
        subTable2Options: {
          data: [],
          columns: [
            {prop: 'barCode', label: '条码', minWidth: 100},
            {prop: 'styleCode', label: '款号', minWidth: 100},
            {prop: 'colorName', label: '颜色', minWidth: 100},
            {prop: 'size', label: '尺码', minWidth: 100}
          ],
          handleSelectionChange: val => {
            this.barCodeSelect = val
          }
        },
        buttons: PLAN.buttons,
        query: {
          page: 1,
          rows: 10,
          code: null,
          proState: 0,
          createTimeStart: null,
          createTimeEnd: null,
          deliverDateStart: null,
          deliverDateEnd: null
        },
        subQuery: {
          parGuid: null
        },
        searchOptions: {
          proState: []
        },
        tabValue: 'first',
        selectRow: {},
        tableRowsSelect: [],
        barCodeSelect: []
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        const btnHandlers = {
          'btnAdd': () => {
            this.$refs.window.open()
          },
          'btnEdit': () => {
            this.$refs.window.open(this.selectRow)
          },
          'btnDelete': () => {
            if (this.tableRowsSelect.length === 0) {
              this.$message({
                message: '请至少选择一条生产任务单记录!',
                type: 'warning'
              })
              return
            }
            this.$confirm(`是否删除生产任务单？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.produce.plan.delProPlanBill({
                msgIDs: this.tableRowsSelect
              }).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getTableData()
                this.subTableOptions.data = []
                this.subTable2Options.data = []
              })
            }).catch(() => {
              //
            })
          },
          'btnExport': () => {
            this.$refs.exportDialog.open({
              title: '生产任务单',
              url: '/api/Produce/ExportExcel',
              columns: this.tableOptions.columns.map(column => ({
                label: column.label,
                name: column.prop
              })),
              params: this.query,
            })
          },
          'reset': () => {
            this.query.page = 1
            this.query.code = null
            this.query.proState = 0
            this.query.createTimeStart = null
            this.query.createTimeEnd = null
            this.query.deliverDateStart = null
            this.query.deliverDateEnd = null
            this.getTableData()
          },
          'lookRecord': () => {
            this.$refs.barcodeRecord.open(row)
          },
          'barCodeDetail': () => {
            this.$refs.barcodeDetail.open(row)
          },
          'btnImport': () => {
            this.$refs.importDialog.open()
          },
          'btnBarCodePrint': () => {
            if (this.tableRowsSelect.length === 1) {
              api.produce.plan.SelectBarCodeDetail({
                parGuid: this.tableRowsSelect[0]
              }).then(data => {
                if (data.length === 0) {
                  this.$message({
                    message: '该生产任务单下没有条码需要打印!',
                    type: 'warning'
                  })
                  return
                }
                this.$refs.barcodePrint.print(data)
              })
            } else if (this.tableRowsSelect.length === 0) {
              this.$message({
                message: '请先勾选一条任务单信息!',
                type: 'warning'
              })
            } else if (this.tableRowsSelect.length > 1) {
              this.$message({
                message: '最多只能勾选一条任务单信息打印!',
                type: 'warning'
              })
            }
          },
          'btnBarcodeBD': (row) => {
            if (row.length === 0) {
              this.$message({
                message: '请先选择需要补打的条码!',
                type: 'warning'
              })
              return
            }
            this.$refs.barcodePrint.print(row)
          },
          'btnOrderPrint': () => {
            if (this.tableRowsSelect.length === 1) {
              api.produce.plan.SelectOneProPlanBill({
                parGuid: this.tableRowsSelect[0]
              }).then(data => {
                this.$refs.planbillPrint.print(data)
              })
            } else if (this.tableRowsSelect.length === 0) {
              this.$message({
                message: '请先勾选一条任务单信息!',
                type: 'warning'
              })
            } else if (this.tableRowsSelect.length > 1) {
              this.$message({
                message: '最多只能勾选一条任务单信息打印!',
                type: 'warning'
              })
            }
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getTableData() {
        api.produce.plan.SelectProPlanBill(this.query).then(data => {
          this.tableOptions.data = data.rows || []
          this.tableOptions.total = data.total || 0
        })
      },
      getSubTableData() {
        api.produce.plan.SelectProSizeDetail(this.subQuery).then(data => {
          if (data) {
            this.subTableOptions.data = data
          }
        })
      },
      getSubTable2Data() {
        api.produce.plan.SelectBarCodeDetail(this.subQuery).then(data => {
          if (data) {
            this.subTable2Options.data = data
          }
        })
      },
      tabClick(tab) {
        this.tabValue = tab.name
        if (this.subQuery.parGuid) {
          if (tab.name === 'second') {
            this.getSubTable2Data()
          } else (
            this.getSubTableData()
          )
        }
      },
      GetProState() {
        api.produce.plan.GetProState().then(data => {
          this.searchOptions.proState = data.map(status => ({
            label: status.stateExplain,
            value: status.stateKey
          }))
        })
      }
    },
    mounted() {
      this.getTableData()
      this.GetProState()
    }
  }
</script>

<style lang="sass" scoped>
  .btn-icon
    margin-right: 5px
  .btns-wrapper
    text-align: left
    line-height: 40px
    padding: 0 20px
  ::v-deep
    .el-tabs__item
      height: 30px
      line-height: 30px

    .el-tabs__header
      margin: 0 !important

    .el-tabs__content
      height: calc(100% - 31px)
    .el-tab-pane
      height: 100%

  .input-wrapper
    line-height: 40px
    font-size: 14px
    border-top: 1px solid #cccccc
    .button
      margin-left: 10px
    .label
      font-size: 14px
      margin: 0 5px
    .select, .input
      width: 150px !important
    .search
      margin-left: 20px
  .tab-container
    display: flex
    flex-direction: column
    .buttons-wrap
      flex: 0 0 40px
      line-height: 40px
      margin-left: 20px
    .sub-table
      flex: 1
</style>
