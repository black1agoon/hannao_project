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
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiSearch from '@/components/common/form/EuiSearch'
  import {BATCHDETAILS} from './barcode.config'
  const REGIONS = {
    north: {},
    center: {}
  }
  export default {
    name: 'bar-code-batch-details',
    _meta: {
      path: '/barcode/batchdetails',
      title: '导入批次详情'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      EuiLayout,
      EuiSearch,
      MainToolbar
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
          batch: null,
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'batch', label: '导入批号', width: 400, fixed: true},
            {prop: 'count', label: '数量', width: 200}
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
        api.barCode.getBarCodeBatchPaged(query).then(data => {
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
        this.$router.push({path: '/barcode/controller', query: {batch: row.batch}})
      },
      searchFunctions(method, keyword) {
        let funs = {
          search: (keyword) => {
            this.query.page = 1
            this.query.batch = keyword.batch
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
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
