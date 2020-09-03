<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
        @click="onBtnClick">
      <el-button type="primary"
                 class="batch-operation"
                 size="mini"
                 round
                 v-show="buttons.some(b => b.btnKey === 'btnBatchDelete')"
                 :disabled="tableRowsSelect.length === 0 || tableRowsSelect.some(s => s.stockoutStatus === '1')"
                 @click="onBtnClick('btnBatchDelete')">批量删除
      </el-button>
      <el-button type="primary"
                 size="mini"
                 round
                 v-show="buttons.some(b => b.btnKey === 'btnCancelBatch')"
                 :disabled="tableRowsSelect.length === 0 || tableRowsSelect.some(s => s.stockoutStatus === '0')"
                 @click="onBtnClick('btnCancelBatchs')">取消出库
      </el-button>
    </main-toolbar>
    <eui-table
        slot="center"
        ref="table"
        :showIndex="false"
        :showSelection="true"
        :highlight-current-row="false"
        :options="tableOptions"
        @fieldClick="handleFieldClick"
        @handleSelectionChange="tableOptions.handleSelectionChange"
        @reloadTable="tableOptions.reload">
      <el-table-column label="操作" align="center" width="200" fixed="right">
        <template slot-scope="scope">
          <template v-for="(btn) in helper.getTableButtons(buttons, tableButtons)">
            <el-button
                v-if="btn.btnKey === 'btnEdit' || btn.btnKey === 'btnDelete'"
                v-show="scope.row.stockoutStatus !== '1'"
                size="mini"
                type="text"
                :key="btn.btnKey"
                @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
            <el-button
                v-else-if="btn.btnKey === 'btnCancelBatch'"
                v-show="scope.row.stockoutStatus === '1'"
                size="mini"
                type="text"
                :key="btn.btnKey"
                @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </eui-table>
    <consumable-stockout-window
        :organization-data="organizationData"
        ref="window"
        @reload="reload">
    </consumable-stockout-window>
    <consumable-stockout-detail-window ref="detailWindow">
    </consumable-stockout-detail-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import {STOCKOUT} from './consumable.config'
  import ConsumableStockoutWindow from './window/ConsumableStockoutWindow'
  import ConsumableStockoutDetailWindow from './window/detail/ConsumableStockoutDetailWindow'
  import config from '@/config'
  import fileDownload from 'js-file-download'
  export default {
    name: 'consumable-stockout',
    _meta: {
      path: '/agency/consumable/stockout',
      title: '出库管理'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      MainToolbar,
      EuiLayout,
      ConsumableStockoutWindow,
      ConsumableStockoutDetailWindow
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        REGIONS: STOCKOUT.REGIONS,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnCancelBatch', 'btnBatchDelete'],
        tags: [],
        query: {
          page: 1,
          pageSize: 10
        },
        tableRowsSelect: [],
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'stockoutStatusExplain', label: '单据状态', align: 'center', fixed: 'left'},
            {prop: 'stockoutCode', label: '出库单号', align: 'center', fixed: 'left', click: true, sortable: true},
            {prop: 'createTime', label: '单据日期', align: 'center', sortable: true},
            {prop: 'departmentName', label: '领用部门', align: 'center'},
            {prop: 'useridName', label: '领用人', align: 'center'},
            {prop: 'createUserName', label: '经办人', align: 'center', sortable: true},
            {prop: 'stockoutTimeStr', label: '出库日期', align: 'center', sortable: true}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          },
          handleSelectionChange: val => {
            this.tableRowsSelect = val
          }
        },
        organizationData: null
      }
    },
    methods: {
      getData(query) {
        api.consumableStockout.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            api.consumableStockout.get(row.stockoutCode).then(data => {
              this.$refs.window.open({...data})
            })
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除:${row.stockoutCode}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.consumableStockout.delete([row.id]).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnExport: () => {
            api.consumableStockout.exportAll().then(res => {
              // console.log(res)
              let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
              fileDownload(blob, '出库信息.xls')
            })
          },
          btnCancelBatch: (row) => {
            this.$confirm(`是否取消出库:${row.stockoutCode}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.consumableStockout.cancelBatch([row.id]).then(() => {
                this.$message({
                  message: '取消成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnCancelBatchs: () => {
            this.$confirm(`是否批量取消出库？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.consumableStockout.cancelBatch(this.tableRowsSelect.map(r => r.id)).then(() => {
                this.$message({
                  message: '取消成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnBatchDelete: () => {
            this.$confirm(`是否批量删除选择？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.consumableStockout.delete(this.tableRowsSelect.map(r => r.id)).then(() => {
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
          btnHandlers[btnKey].call(this, row)
        }
      },
      reload() {
        this.getData(this.query)
      },
      handleFieldClick(row) { // 点击表格某项触发事件
        api.consumableStockout.get(row.stockoutCode).then(data => {
          this.$refs.detailWindow.open(data)
        })
      },
      getOrganizationData() {
        api.assetController.getOrganizationTree().then(data => {
          this.organizationData = data
          // this.searchOptions.conditionSearch.find(cond => cond.value === 'department').options = helper.getTreeData([this.organizationData], 'children', 'name')
        })
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
        vm.getOrganizationData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .batch-operation
    float: right
    margin-right: 35px

</style>

