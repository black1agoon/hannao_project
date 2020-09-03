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
    <consumable-window ref="window" @reload="reload"></consumable-window>
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
  import {CONTROLLER} from './consumable.config'
  import ConsumableWindow from './window/ConsumableWindow'
  import config from '@/config'
  import fileDownload from 'js-file-download'
  export default {
    name: 'consumable-controller',
    _meta: {
      path: '/agency/consumable/controller',
      title: '物料档案'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      MainToolbar,
      EuiLayout,
      UploadFile,
      ConsumableWindow
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        REGIONS: CONTROLLER.REGIONS,
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
            {prop: 'consumableCode', label: '物料编码', width: 150, align: 'center', fixed: 'left'},
            {prop: 'consumableName', label: '物料名称', width: 150, align: 'center', fixed: 'left'},
            {prop: 'consumableTypeName', label: '物料分类', width: 150, align: 'center', fixed: 'left'},
            {prop: 'brand', label: '品牌', width: 100, align: 'center'},
            {prop: 'model', label: '规格型号', width: 150, align: 'center'},
            {prop: 'unit', label: '单位', width: 100, align: 'center'},
            {prop: 'barCode', label: '物料条码', width: 150, align: 'center'},
            {prop: 'buyer', label: '采购员', width: 100, align: 'center'},
            {prop: 'supplier', label: '供应商', width: 150, align: 'center'},
            {prop: 'pictures', label: '照片', width: 150, align: 'center', type: 'picture'}
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
        uploadApi: api.consumable.importTemplate
      }
    },
    methods: {
      getData(query) {
        api.consumable.paged(query).then(data => {
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
            this.$confirm(`是否删除:${row.consumableName}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.consumable.delete([row.id]).then(() => {
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
            window.open(this.serverURI + api.consumable.getTemplate())
          },
          btnExport: () => {
            // window.open(this.serverURI + api.consumable.exportAll())
            api.consumable.exportAll().then(res => {
              // console.log(res)
              let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
              fileDownload(blob, '物料档案.xls')
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
          api.consumable.delete(this.tableRowsSelect).then(() => {
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
      this.getData(this.query)
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // vm.getData(vm.query)
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

