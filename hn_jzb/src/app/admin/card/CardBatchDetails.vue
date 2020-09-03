<template>
  <div>
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
        <eui-search
          :formOptions="BATCHDETAILS_SEARCH_OPTIONS"
          :forminfo="BATCHDETAILS_SEARCH_INFO"
          :formdata.sync="BATCHDETAILS_SEARCH_DATA"
          :formfunctions="BATCHDETAILS_SEARCH_FUNS"
          @openCompanyChose="searchFunctions('openCompanyChose')"
          @search="(keyword) => {searchFunctions('search', keyword)}">
        </eui-search>
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
    <company-chose-window ref="companyWindow"></company-chose-window>
  </div>
</template>

<script>
  import api from '@/api'
  import config from '@/config'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiSearch from '@/components/common/form/EuiSearch'
  import {BATCHDETAILS} from './card.config'
  import CompanyChoseWindow from '@/app/admin/common/CompanyChoseWindow'

  const REGIONS = {
    north: {},
    center: {}
  }
  export default {
    name: 'card-batch-details',
    _meta: {
      path: '/card/batchdetails',
      title: '导入批次详情'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      EuiLayout,
      EuiSearch,
      MainToolbar,
      CompanyChoseWindow
    },
    data() {
      return {
        helper,
        REGIONS,
        serverURI: config.serverURI,
        BATCHDETAILS_SEARCH_INFO: BATCHDETAILS.SEARCH_INFO,
        BATCHDETAILS_SEARCH_DATA: BATCHDETAILS.SEARCH_DATA,
        BATCHDETAILS_SEARCH_OPTIONS: BATCHDETAILS.SEARCH_OPTIONS,
        BATCHDETAILS_SEARCH_FUNS: BATCHDETAILS.SEARCH_FUNS,
        buttons: helper.getMainButtons(),
        query: {
          batchId: null,
          companyId: null,
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
            {prop: 'companyName', label: '所属公司', width: 200},
            {prop: 'createUser', label: '导入人员', width: 200},
            {prop: 'createTime', label: '导入时间', width: 200},
            {prop: 'memo', label: '描述', minWidth: 400}
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
        api.card.getImportBatchPaged(query).then(data => {
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
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      batchDetails(index, row) {
        this.$router.push({path: '/card/controller', query: {batchId: row.batchId}})
      },
      exportBatchDetails(index, row) {
        window.open(this.serverURI + api.card.exportBatchDetails(row.batchId))
      },
      searchFunctions(method, keyword) {
        let funs = {
          openCompanyChose: () => {
            this.$refs.companyWindow.open('search')
          },
          search: (keyword) => {
            this.query.page = 1
            this.query.batchId = keyword.batchId
            this.query.companyId = keyword.companyId
            this.getData(this.query)
          }
        }
        funs[method].call(this, keyword)
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
      })
    },
    created() {
      this.$on('checkedNode', (node, from) => {
        if (from === 'form') {
        } else if (from === 'search') {
          this.BATCHDETAILS_SEARCH_DATA.companyName = node.cnName
          this.BATCHDETAILS_SEARCH_DATA.companyId = node.id
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
