<template>
  <eui-layout :regions="REGIONS">
    <!--<main-toolbar-->
    <!--slot="north"-->
    <!--:buttons="helper.getMainFilterButtons(buttons)"-->
    <!--@click="onBtnClick">-->
    <!--<div class="table-handle">-->
    <!--</div>-->
    <!--</main-toolbar>-->
    <div class="btn-wrapper" slot="north">
      <eui-input
          class="input"
          type="select"
          :clearable="true"
          placeholder="全部仓库"
          :options="warehouseOptions"
          v-model="query.warehouseId">
      </eui-input>
      <eui-input
          class="input"
          type="treeselect"
          placeholder="所有部门"
          :options="departmentOptions"
          @change="departmentChange"
          v-model="query.department">
      </eui-input>
      <eui-input
          class="input"
          type="select"
          placeholder="所有员工"
          :options="userOptions"
          v-model="query.userid">
      </eui-input>
      <el-date-picker
          class="data-input"
          v-model="query.time"
          type="daterange"
          range-separator="-"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
      </el-date-picker>
      <el-button
          round
          type="default"
          size="mini"
          @click="onBtnClick('btnExport')">
        导出
      </el-button>
      <el-button
          round
          type="default"
          size="mini"
          @click="onBtnClick('btnSearch')">
        搜索
      </el-button>
    </div>
    <eui-table
        slot="center"
        ref="table"
        :showIndex="false"
        :highlight-current-row="false"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
    </eui-table>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiInput from '@/components/common/form/EuiInput'
  import {USED} from './consumable.config'
  import config from '@/config'
  import fileDownload from 'js-file-download'
  export default {
    name: 'consumable-used',
    _meta: {
      path: '/agency/consumable/used',
      title: '耗材领用'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      EuiLayout,
      EuiInput
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        REGIONS: USED.REGIONS,
        buttons: helper.getMainButtons(),
        tags: [],
        query: {
          agencyId: 1,
          page: 1,
          pageSize: 10,
          department: null,
          endTime: null,
          startTime: null,
          userid: null,
          warehouseId: null,
          time: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'consumableCode', label: '物料编码', minWidth: 100, align: 'center'},
            {prop: 'consumableName', label: '物料名称', minWidth: 100, align: 'center'},
            {prop: 'stockoutCode', label: '领用单号', minWidth: 100, align: 'center'},
            {prop: 'usedTimeStr', label: '领用日期', minWidth: 100, align: 'center'},
            {prop: 'departmentName', label: '领用部门', minWidth: 100, align: 'center'},
            {prop: 'useridName', label: '领用人', minWidth: 100, align: 'center'},
            {prop: 'warehouseName', label: '领用仓库', minWidth: 100, align: 'center'},
            {prop: 'quantity', label: '领用量', minWidth: 100, align: 'center'},
            {prop: 'totalPrice', label: '领用总金额', minWidth: 100, align: 'center'}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        },
        warehouseOptions: [],
        departmentOptions: [],
        userOptions: [],
        organizationData: null
      }
    },
    methods: {
      getData(query) {
        api.consumableUsed.paged(query).then(data => {
          this.tableOptions.data = data.records.map(d => Object.assign(d.consumableDto, d.consumableStockoutDto, d))
          this.tableOptions.total = data.total
        })
      },
      getWarehouseData() {
        api.consumableWarehouse.paged({
          page: 1,
          pageSize: 999
        }).then(data => {
          this.warehouseOptions = data ? data.records.map(d => ({
            label: d.warehouseName,
            value: d.id
          })) : []
        })
      },
      getOrganizationData() {
        api.assetController.getOrganizationTree().then(data => {
          this.organizationData = data
          this.departmentOptions = helper.getTreeData([this.organizationData], 'children', 'name')
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnExport: () => {
            // window.open(this.serverURI + api.consumable.exportAll())
            api.consumableUsed.exportByQuery(this.query).then(res => {
              // console.log(res)
              let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
              fileDownload(blob, '耗材领用.xls')
            })
          },
          btnSearch: () => {
            this.reload()
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      reload() {
        this.getData(this.query)
      },
      departmentChange(val) {
        this.query.userid = null
        if (val === undefined) {
          this.userOptions = []
        } else {
          let node = helper.getTreeNode([this.organizationData], val, 'children')
          this.userOptions = node.employeeList ? node.employeeList.map(e => ({
            label: e.name,
            value: e.id
          })) : []
        }
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
        vm.getWarehouseData()
        vm.getOrganizationData()
      })
    },
    watch: {
      'query.time'() {
        if (Array.isArray(this.query.time) && this.query.time.length === 2) {
          this.query.startTime = this.query.time[0]
          this.query.endTime = this.query.time[1]
        } else {
          this.query.startTime = null
          this.query.endTime = null
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn-wrapper
    padding: 10px
    font-size: 14px
    .input
      float: left
      width: 200px
      margin-right: 10px
    .data-input
      float: left
      width: 300px
      margin-right: 10px
      height: 32px
      /deep/ .el-range__icon
        line-height: 1
      /deep/ .el-range-separator
        line-height: 24px
      /deep/ .el-range__close-icon
        line-height: 1
</style>

