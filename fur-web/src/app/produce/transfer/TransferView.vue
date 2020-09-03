<template>
  <eui-layout :regions="region">
    <div slot="north" class="btns-wrapper">
      <div class="input-wrapper">
        <span class="label">条码:</span>
        <eui-input
            class="input"
            v-model="query.barCode">
        </eui-input>
        <span class="label">上报时间:</span>
        <eui-input
            class="input"
            type="date"
            :clearable="true"
            v-model="query.reportTimeStart">
        </eui-input>
        至
        <eui-input
            class="input"
            type="date"
            :clearable="true"
            v-model="query.reportTimeEnd">
        </eui-input>
        <span class="label">报工人姓名:</span>
        <eui-input
            class="input"
            v-model="query.reportUserName">
        </eui-input>
        <span class="label">报工人工号:</span>
        <eui-input
            class="input"
            v-model="query.reportUserCode">
        </eui-input>
        <span class="label">工序:</span>
        <eui-input
            class="input"
            type="select"
            :options="searchOptions.processId"
            v-model="query.processId">
        </eui-input>
        <el-button class="button" type="primary" size="small" @click="onBtnClick('search')">
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
    <el-form slot="south" class="form" ref="form" :model="formdata" label-width="150px" :rules="rules">
      <el-col :sm="12" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <eui-input
              class="input"
              :disabled="item.disabled"
              @change="() => functionChange(item.value)"
              v-model="formdata[item.value]">
          </eui-input>
        </el-form-item>
      </el-col>
      <div class="button-wrap">
        <el-button class="button" type="primary" size="small" @click="onBtnClick('submit')">
          <i class="btn-icon fa fa-check"></i>确认转移
        </el-button>
      </div>
    </el-form>
    <la-export-dialog ref="exportDialog"></la-export-dialog>
    <transfer-detail-window ref="transferDetailWindow" @reload="getTableData">
    </transfer-detail-window>
  </eui-layout>
</template>

<script>
  import LaExportDialog from '@/components/base/LaExportDialog.vue'
  import EuiTable from '@/app/produce/components/form/EuiTable'
  import EuiLayout from '@/app/produce/components/layout/EuiLayout'
  import EuiInput from '@/app/produce/components/form/EuiInput'
  import { TRANSFER } from '../produce.config'
  import {api} from '@/api'
  import TransferDetailWindow from './window/TransferDetailWindow'
  export default {
    name: 'transfer-view',
    components: {
      LaExportDialog,
      EuiTable,
      EuiLayout,
      EuiInput,
      TransferDetailWindow
    },
    data() {
      return {
        region: TRANSFER.region,
        formdata: TRANSFER.formData,
        rules: TRANSFER.rules,
        forminfo: TRANSFER.formInfo,
        query: {
          page: 1,
          rows: 10,
          barCode: null,
          reportTimeStart: null,
          reportTimeEnd: null,
          reportUserCode: null,
          reportUserName: null,
          processId: null
        },
        searchOptions: {
          processId: []
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'barCode', label: '条码', minWidth: 80},
            {prop: 'styleCode', label: '款号', minWidth: 80},
            {prop: 'colorName', label: '颜色', minWidth: 80},
            {prop: 'size', label: '尺码', minWidth: 100},
            {prop: 'reportUserCode', label: '上报人工号', minWidth: 80},
            {prop: 'reportUserName', label: '上报人姓名', minWidth: 80},
            {prop: 'processName', label: '上报工序', minWidth: 80},
            {prop: 'reportTime', label: '上报时间', minWidth: 80}
          ],
          rowClick: (row) => {
            this.$refs.table.callByName('clearSelection')
            this.$refs.table.callByName('toggleRowSelection', row)
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.rows = name === 'rows' ? val : this.query.rows
            this.getTableData()
          },
          handleSelectionChange: val => {
            this.selectRow = val.length > 0 ? val[0] : {}
          }
        },
        selectRow: {}
      }
    },
    methods: {
      getTableData() {
        api.produce.transfer.selectReportWork(this.query).then(data => {
          this.tableOptions.data = data.rows || []
          this.tableOptions.total = data.total || 0
        })
      },
      GetProcessListGwj() {
        api.produce.report.GetProcessListGwj().then(data => {
          this.searchOptions.processId = (data || []).map(d => ({
            label: d.processName,
            value: d.processId,
            type: d.type
          }))
        })
      },
      onBtnClick(key) {
        switch (key) {
          case 'reset':
            Object.keys(this.query).forEach(key => {
              this.query[key] = null
            })
            this.query.page = 1
            this.query.rows = 10
            this.getTableData()
            break
          case 'search':
            this.query.page = 1
            this.getTableData()
            break
          case 'submit':
            if (!this.selectRow.barCode) {
              this.$message({
                message: '请先选择一条转移条码!',
                type: 'warning'
              })
              return
            }
            this.$refs.form.validate((valid) => {
              if (valid) {
                api.produce.transfer.selectReceiveReportUserId({
                  ReceiveReportUserCode: this.formdata.receiveReportUserCode
                }).then(data => {
                  this.formdata.receiveReportUserId = data
                  this.formdata = Object.assign(this.formdata, this.selectRow)
                  this.$refs.transferDetailWindow.open(this.formdata)
                })
              } else {
                return false
              }
            })
            break
        }
      },
      functionChange(key) {
        switch (key) {
          case 'receiveReportUserCode':
            api.produce.report.getReportUserName({
              ReportUserCode: this.formdata.receiveReportUserCode
            }).then(data => {
              if (!data) {
                this.$message({
                  message: '请输入正确的工号!',
                  type: 'error'
                })
                this.formdata.receiveReportUserName = null
              } else {
                this.formdata.receiveReportUserName = data
              }
            })
        }
      },
    },
    mounted() {
      this.GetProcessListGwj()
    }
  }
</script>

<style lang="sass" scoped>
  .btn-icon
    margin-right: 5px
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
  .form
    width: 700px
    margin: 50px
    overflow: hidden
    &:after
      display: block
      content: ''
      height: 0
      line-height: 0
      clear: both
      visibility: hidden
    .button-wrap
      margin-top: 100px
      text-align: center
</style>