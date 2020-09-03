<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      <super-search
          ref="search"
          v-model="query"
          :options="SEARCH_OPTIONS"
          @search="superSearch"
          slot="right"
          style="margin-right: 35px">
      </super-search>
    </main-toolbar>
    <eui-table
        class="center-wrap"
        slot="south"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions">
      <el-table-column label="操作" align="center" minWidth="200" fixed="right">
        <template slot-scope="scope">
          <el-button
              v-for="(btn, index) in helper.getTableButtons(buttons)"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
            <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
    <loading-window
        ref="window"
        :input-options="inputOptions"
        @reload="tableOptions.reload">
    </loading-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {LOADING} from './loading.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import LoadingWindow from './window/LoadingWindow'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'loading-controller',
    _meta: {
      path: '/loading/controller',
      title: '上料区管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      LoadingWindow,
      SuperSearch
    },
    data() {
      return {
        helper,
        REGIONS: LOADING.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10,
          name: null,      // 编号
          position: null,   // 站点号
          capacity: null,    // 仓库存放情况
          lineNumber: null, // 行位置
          columnNumber: null,   // 列位置
          goodsId: null,    // 物料
          location: null,   // 库位的位置
          status: null,        // 仓库小车停放状态
          vehicleNo: null  // 小车编号
        },
        SEARCH_OPTIONS: LOADING.SEARCH_OPTIONS,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '编号', minWidth: 150},
            {prop: 'position', label: '站点号', minWidth: 100},
            {prop: 'capacityStr', label: '仓库存放情况', minWidth: 100},
            {prop: 'lineNumber', label: '行位置', minWidth: 100},
            {prop: 'columnNumber', label: '列位置', minWidth: 100},
            {prop: 'goodsName', label: '物料', minWidth: 100},
            {prop: 'location', label: '库位的位置', minWidth: 100},
            {prop: 'vehicleNo', label: '小车编号', minWidth: 100},
            {prop: 'statusStr', label: '小车停放状态', minWidth: 100},
            {prop: 'seq', label: '排序', minWidth: 100, sortable: true}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        },
        inputOptions: {
          goodsId: []
        }
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            this.$refs.window.open(row)
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除: 上料区 ${row.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.loading.delete([row.id]).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData()
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getData() {
        api.loading.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.name = searchinfo.name
        this.query.position = searchinfo.position
        this.query.lineNumber = searchinfo.lineNumber
        this.query.columnNumber = searchinfo.columnNumber
        this.query.capacity = searchinfo.capacity
        this.query.goodsId = searchinfo.goodsId
        this.query.location = searchinfo.location
        this.query.status = searchinfo.status
        this.query.vehicleNo = searchinfo.vehicleNo
        this.getData()
      },
      getInputData() {
        api.goods.paged({
          page: 1,
          pageSize: 999
        }).then(data => {
          if (data && data.records.length > 0) {
            this.inputOptions.goodsId = this.SEARCH_OPTIONS.conditionSearch.goodsId.options = data.records.map(d => ({
              label: d.name,
              value: d.id
            }))
          } else {
            this.inputOptions.goodsId = []
            this.SEARCH_OPTIONS.conditionSearch.goodsId.options = []
          }
        })
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData()
        vm.getInputData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

