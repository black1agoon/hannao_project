<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      <div class="table-handle">
        <el-button  class="batch-operation"
                    type="primary"
                    size="mini"
                    :disabled="tableRowsSelect.length === 0"
                    round
                    @click.native="batchDelete">
          批量删除
        </el-button>
        <div class="chose">
          已选类目{{tableRowsSelect.length}}条
        </div>
      </div>
    </main-toolbar>
    <eui-table
        slot="center"
        ref="table"
        :showIndex="false"
        :showSelection="true"
        :highlight-current-row="false"
        :options="tableOptions"
        @reloadTable="tableOptions.reload"
        @handleSelectionChange="tableOptions.handleSelectionChange">
      <el-table-column label="操作" align="center" width="200" fixed="right">
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
    <upload-file
        ref="uploadfile"
        :upload-api="uploadApi"
        title="导入模板"
        @reload="reload">
    </upload-file>
    <consumable-warehouse-window ref="window" @reload="reload">
    </consumable-warehouse-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import UploadFile from '@/app/tools/UploadFile'
  import {WAREHOUSE} from './consumable.config'
  import ConsumableWarehouseWindow from './window/ConsumableWarehouseWindow'
  import config from '@/config'
  import fileDownload from 'js-file-download'
  export default {
    name: 'consumable-warehouse',
    _meta: {
      path: '/agency/consumable/warehouse',
      title: '仓库档案'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      MainToolbar,
      EuiLayout,
      UploadFile,
      ConsumableWarehouseWindow
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        REGIONS: WAREHOUSE.REGIONS,
        buttons: helper.getMainButtons(),
        tags: [],
        query: {
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'warehouseCode', label: '仓库编码', align: 'center', fixed: 'left'},
            {prop: 'warehouseName', label: '仓库名称', align: 'center', fixed: 'left'},
            {prop: 'seq', label: '排序', align: 'center', sortable: true},
            {prop: 'remark', label: '备注', align: 'center'},
            {prop: 'createTime', label: '创建时间', align: 'center'}
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
            this.tableRowsSelect = val.map(v => v.id)
          }
        },
        tableRowsSelect: [],
        uploadApi: api.consumableWarehouse.importTemplate
      }
    },
    methods: {
      getData(query) {
        api.consumableWarehouse.paged(query).then(data => {
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
            this.$refs.window.open({...row})
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除仓库, 编码为:${row.warehouseCode}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.consumableWarehouse.delete([row.id]).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnSplitBatchImport0: () => {
            this.$refs.uploadfile.open()
          },
          btnSplitBatchImport1: () => {
            window.open(this.serverURI + api.consumableWarehouse.getTemplate())
          },
          btnExport: () => {
            // window.open(this.serverURI + api.consumable.exportAll())
            api.consumableWarehouse.exportAll().then(res => {
              // console.log(res)
              let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
              fileDownload(blob, '仓库档案.xls')
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      batchDelete() {
        this.$confirm(`是否批量删除选中项？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          api.consumableWarehouse.delete(this.tableRowsSelect).then(() => {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.getData(this.query)
          })
        }).catch(() => {
        })
      },
      reload() {
        this.getData(this.query)
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .table-handle
    float: right
    .chose
      float: right
      font-size: 12px
      color: #555555
      line-height: 28px
    .chose, .batch-operation
      float: right
      margin-right: 35px

</style>

