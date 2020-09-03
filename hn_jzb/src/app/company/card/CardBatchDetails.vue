<template>
  <div>
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      </main-toolbar>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <el-table-column label="操作" minWidth="200" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="exportBatchDetails(scope.$index, scope.row)">
              <i class="btn-icon fa fa-download"></i>导出
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="batchDetails(scope.$index, scope.row)">
              <i class="btn-icon fa fa-file-text-o"></i>查看批次详情
            </el-button>
          </template>
        </el-table-column>
      </eui-table>
    </eui-layout>
  </div>
</template>

<script>
  import api from '@/api'
  import config from '@/config'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'

  const REGIONS = {
    north: {},
    center: {}
  }
  export default {
    name: 'company-card-batch-details',
    _meta: {
      path: '/company/card/batchdetails',
      title: '导入批次详情'
    },
    components: {
      EuiTable,
      EuiLayout,
      MainToolbar
    },
    data() {
      return {
        helper,
        REGIONS,
        serverURI: config.serverURI,
        buttons: helper.getMainButtons(),
        query: {
          batchId: null,
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'batchId', label: '导入批号', width: 200, fixed: true},
            {prop: 'cardTypeName', label: '标签类型', width: 200},
            {prop: 'count', label: '数量', width: 200},
            {prop: 'createUser', label: '导入人员', width: 200},
            {prop: 'createTime', label: '导入时间', width: 200},
            {prop: 'memo', label: '备注', minWidth: 400}
          ],
          rowClick: (row, event, column) => {
            this.formdata = JSON.parse(JSON.stringify(row))
          },
          rowDblclick: (row, event) => {
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
        api.companyCard.getImportBatchPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
          },
          btnEdit: (row) => {
          },
          btnDelete: (row) => {
          },
          btnSingleSearch: (arg) => {
            this.query.batchId = arg
            this.query.page = 1
            this.getData(this.query)
          },
          btnSingleSearchClear: () => {
            this.query.batchId = null
            this.getData(this.query)
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      batchDetails(index, row) {
        this.$router.push({path: '/company/card/controller', query: {batchId: row.batchId}})
      },
      exportBatchDetails(index, row) {
        window.open(this.serverURI + api.companyCard.exportBatchDetails(row.batchId))
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
      })
    },
    created() {
    },
    mounted() {
      this.buttons = [{
        btnKey: 'btnSingleSearch',
        memo: '请输入导入批次号'
      }]
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
