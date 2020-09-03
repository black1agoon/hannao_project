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
            v-model="query.deliverTimeStart">
        </eui-input>
        至
        <eui-input
            class="input"
            type="date"
            :clearable="true"
            v-model="query.deliverTimeEnd">
        </eui-input>
        <span class="label">加工点:</span>
        <eui-input
            class="input"
            type="select"
            :clearable="true"
            :options="searchOptions.processPointID"
            v-model="query.processPointID">
        </eui-input>
        <span class="label">状态:</span>
        <eui-input
            class="input"
            type="select"
            :options="searchOptions.state"
            v-model="query.state">
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

    <la-export-dialog ref="exportDialog" :is-all="true"></la-export-dialog>
  </eui-layout>
</template>

<script>
  import EuiTable from '@/app/produce/components/form/EuiTable'
  import EuiLayout from '@/app/produce/components/layout/EuiLayout'
  import { OUTSOURCE } from '../produce.config'
  import { api } from '@/api'
  import EuiInput from '@/app/produce/components/form/EuiInput'
  import LaExportDialog from '@/components/base/LaExportDialog.vue'
  export default {
    name: 'outsource-view',
    components: {
      EuiInput,
      EuiTable,
      EuiLayout,
      LaExportDialog
    },
    data() {
      return {
        region: OUTSOURCE.region,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'code', label: '委外任务号', minWidth: 120},
            {prop: 'workSpaceName', label: '加工点', minWidth: 80},
            {prop: 'principal', label: '联系人', minWidth: 80},
            {prop: 'contactsPhone', label: '联系方式', minWidth: 100},
            {prop: 'processNumber', label: '委外数', minWidth: 80},
            {prop: 'recoveryNumber', label: '回收数', minWidth: 80},
            {prop: 'state', label: '状态', minWidth: 80},
            {prop: 'deliverTime', label: '预计交付时间', minWidth: 80},
            {prop: 'createUserName', label: '制单人', minWidth: 80},
            {prop: 'createTime', label: '制单时间', minWidth: 80}
          ],
          rowClick: (row) => {
            this.$refs.table.callByName('toggleRowSelection', row)
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
        buttons: OUTSOURCE.buttons,
        query: {
          page: 1,
          rows: 10,
          createTimeStart: null,
          createTimeEnd: null,
          deliverTimeStart: null,
          deliverTimeEnd: null,
          state: 0,
          processPointID: null
        },
        searchOptions: {
          state: [],
          processPointID: []
        },
        tableRowsSelect: []
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        const btnHandlers = {
          'btnAdd': () => {
            this.$router.push('/produce/outsource-add')
          },
          'btnExport': () => {
            this.$refs.exportDialog.open({
              title: '委外管理导出',
              url: '/api/Produce/OutsourcingManageExportExcel',
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
            this.query.state = 0
            this.query.processPointID = null
            this.query.createTimeStart = null
            this.query.createTimeEnd = null
            this.query.deliverDateStart = null
            this.query.deliverDateEnd = null
            this.getTableData()
          },
          'btnReturn': () => {
            this.$router.push('/produce/outsource-return')
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getTableData() {
        api.produce.outsource.SelectOutsourcingManage(this.query).then(data => {
          this.tableOptions.data = data.rows || []
          this.tableOptions.total = data.total || 0
        })
      },
      GetProState() { // 获取状态下拉框
        api.produce.outsource.GetOutState().then(data => {
          this.searchOptions.state = data.map(status => ({
            label: status.stateExplain,
            value: status.stateKey
          }))
        })
      },
      GetWorkSpaceCombo() { // 获取加工点下拉框
        api.produce.outsource.GetWorkSpaceCombo().then(data => {
          this.searchOptions.processPointID = data.map(processPoint => ({
            label: processPoint.text,
            value: processPoint.id
          }))
        })
      }
    },
    mounted() {

      this.GetProState()
      this.GetWorkSpaceCombo()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getTableData()
      })
    },
  }
</script>

<style lang="sass" scoped>
  .btn-icon
    margin-right: 5px
  .btns-wrapper
    text-align: left
    line-height: 40px
    padding: 0 20px

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
</style>
