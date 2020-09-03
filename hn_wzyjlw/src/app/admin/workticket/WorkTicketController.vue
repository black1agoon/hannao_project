<template>
  <div>
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons([])"
        @click="onBtnClick">
        <eui-search
          :formOptions="SEARCH_OPTIONS"
          :forminfo="SEARCH_INFO"
          :formdata.sync="SEARCH_DATA"
          :formfunctions="SEARCH_FUNS"
          @openOrderChose="searchFunctions('openOrderChose')"
          @openOrderDetailChose="searchFunctions('openOrderDetailChose')"
          @clearOrder="searchFunctions('clearOrder')"
          @clearDetail="searchFunctions('clearDetail')"
          @search="(keyword) => {searchFunctions('search', keyword)}">
        </eui-search>
      </main-toolbar>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <template slot="prev">
          <el-table-column label="机台任务序号" prop="stationNumber" width="100">
          </el-table-column>
          <el-table-column label="订单编号" prop="orderNumber" width="100">
          </el-table-column>
          <el-table-column label="任务单号" prop="taskNumber" width="120">
          </el-table-column>
          <el-table-column label="明细编号" prop="detailNumber" width="120">
          </el-table-column>
          <el-table-column label="工单状态" prop="stateName" width="100">
          </el-table-column>
          <el-table-column label="机台名称" prop="stationName" width="100">
          </el-table-column>
          <el-table-column label="当前任务" width="90">
            <template slot-scope="scope">
              <i :class="['icon', {active: currentWork(scope.row.currentWork)}]"></i>
            </template>
          </el-table-column>
        </template>
      </eui-table>
    </eui-layout>
    <work-shop-order-chose-window ref="orderchose">
    </work-shop-order-chose-window>
    <work-shop-order-detail-chose-window ref="detailchose">
    </work-shop-order-detail-chose-window>
  </div>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiSearch from '@/components/common/form/EuiSearch'
  import {CONTROLLER} from './workticket.config'
  import WorkShopOrderChoseWindow from '@/app/admin/common/WorkShopOrderChoseWindow'
  import WorkShopOrderDetailChoseWindow from '@/app/admin/common/WorkShopOrderDetailChoseWindow'
  export default {
    name: 'work-ticket-controller',
    _meta: {
      path: '/workticket/controller',
      title: '工票任务'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch,
      WorkShopOrderChoseWindow,
      WorkShopOrderDetailChoseWindow
    },
    computed: {},
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        REGIONS: CONTROLLER.REGIONS,
        forminfo: {...CONTROLLER.FORM_INFO},
        formdata: {...CONTROLLER.FORM_DATA},
        formOptions: {...CONTROLLER.FORM_OPTIONS},
        SEARCH_INFO: CONTROLLER.SEARCH_INFO,
        SEARCH_DATA: CONTROLLER.SEARCH_DATA,
        SEARCH_OPTIONS: CONTROLLER.SEARCH_OPTIONS,
        SEARCH_FUNS: CONTROLLER.SEARCH_FUNS,
        rules: CONTROLLER.RULES,
        query: {
          state: null,
          stationCode: null,
          detailNumber: null,
          orderNumber: null,
          currentWork: null,
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'articleNumber', label: '款号', width: 90},
            {prop: 'articleNumber1', label: '货号', width: 90},
            {prop: 'number', label: '任务数(双)', width: 90},
            {prop: 'completeNumber', label: '完成数(双)', width: 90},
            {prop: 'dayNumber', label: '24小时生产量(双)', width: 120},
            {prop: 'hourNumber', label: '每小时生产量(双)', width: 120},
            {prop: 'estimatedStartDate', label: '预计开始时间', width: 150},
            {prop: 'estimatedEndDate', label: '预计结束时间', width: 150},
            {prop: 'finishTime', label: '完成时间', width: 150},
            {prop: 'createTime', label: '创建时间', width: 150},
            {prop: 'createUser', label: '创建人', minWidth: 150}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
          },
          rowDblclick: (row, event) => {
            this.$refs.window.open()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        }
      }
    },
    methods: {
      getData(query) {
        api.workticket.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
            this.$nextTick(() => {
              this.$refs.form.resetFields()
              this.formdata = {...CONTROLLER.FORM_DATA}
            })
          },
          btnEdit: (arg) => {
            this.formdata = {...arg}
            this.$refs.window.open()
          },
          btnDelete: (arg) => {
            this.formdata = {...arg}
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.stationType.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, arg)
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.stationType.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.stationType.update(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getStatus(status) {
        return status === 0 ? 'el-icon-close' : 'el-icon-check'
      },
      currentWork(status) {
        return status === 1
      },
      searchFunctions(method, keyword) {
        let funs = {
          search: (keyword) => {
            this.query.page = 1
            this.query.state = keyword.state
            this.query.stationCode = keyword.stationCode
            this.query.stationName = keyword.stationName
            this.query.orderNumber = keyword.orderNumber
            this.query.detailNumber = keyword.detailNumber
            this.query.currentWork = keyword.currentWork
            this.getData(this.query)
          }
        }
        funs[method].call(this, keyword)
      }
    },
    mounted() {
      this.getData(this.query)
    },
    created() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .icon
    display: inline-block
    width: 17px
    height: 17px
    border-radius: 50%
    background: #999
    &.active
      background: #13ce66
</style>
