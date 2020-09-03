<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
        @click="onBtnClick">
    </main-toolbar>
    <div slot="center">
      <div class="table-handle">
        <el-radio-group size="mini" v-model="query.checkStatus" @change="radioChange">
          <el-radio-button :label="2">未完成盘点</el-radio-button>
          <el-radio-button :label="1">已完成盘点</el-radio-button>
        </el-radio-group>
        <div class="chosen">
          已选{{tableRowsSelect.length}}条资产
        </div>
        <el-button  class="batch-operation"
                    type="primary"
                    size="mini"
                    v-show="buttons.some(b => b.btnKey === 'btnDoCheck')"
                    :disabled="tableRowsSelect.length === 0 || query.checkStatus === 1"
                    @click="onBtnClick('btnDoChecks')"
                    round>
          批量盘点
        </el-button>
        <el-button  class="batch-operation"
                    type="primary"
                    size="mini"
                    v-show="buttons.some(b => b.btnKey === 'btnCompare')"
                    :disabled="tableRowsSelect.length < 2 || query.checkStatus === 2"
                    @click="onBtnClick('btnCompare')"
                    round>
          对比盘点
        </el-button>
      </div>
    </div>
    <eui-table
        slot="south"
        ref="table"
        :showIndex="false"
        :showSelection="tableOptions.showSelection"
        :highlight-current-row="false"
        :options="tableOptions"
        @fieldClick="tableOptions.handleFieldClick"
        @reloadTable="tableOptions.reload"
        @handleSelectionChange="tableOptions.handleSelectionChange">
      <el-table-column label="操作" align="center" fixed="right" v-show="helper.getTableButtons(buttons).length > 0">
        <template slot-scope="scope">
          <template v-for="(btn, index) in helper.getTableButtons(buttons)">
            <el-button
                v-if="btn.btnKey !== 'btnEdit'"
                size="mini"
                type="text"
                :key="index"
                @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
            <el-button
                v-show="query.checkStatus === 2"
                v-else
                size="mini"
                type="text"
                :key="index"
                @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </eui-table>
    <asset-check-do-step1-window ref="dostep1" @reload="reload">
    </asset-check-do-step1-window>
    <asset-check-window ref="window" @reload="reload">
    </asset-check-window>
    <asset-check-copy-window ref="copyWindow" @reload="reload">
    </asset-check-copy-window>
    <asset-check-compare-window ref="compareWindow">
    </asset-check-compare-window>
    <asset-check-detail-window ref="detail">
    </asset-check-detail-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import {CONTROLLER} from './asset.config'
  import config from '@/config'
  import AssetCheckWindow from './window/AssetCheckWindow'
  import AssetCheckDoStep1Window from './window/detail/AssetCheckDoStep1Window'
  import AssetCheckCopyWindow from './window/AssetCheckCopyWindow'
  import AssetCheckCompareWindow from './window/AssetCheckCompareWindow'
  import AssetCheckDetailWindow from './window/detail/AssetCheckDetailWindow'
  const COLUMNS1 = [
    {prop: 'taskCode', label: '盘点单号', fixed: 'left', click: true},
    {prop: 'taskName', label: '盘点任务名称', fixed: 'left'},
    {prop: 'startTimeStr', label: '盘点开始时间', align: 'center'},
    {prop: 'endTimeStr', label: '盘点结束时间', align: 'center'},
    {prop: 'checkUserName', label: '盘点发起人', align: 'center'},
    {prop: 'checkStatusName', label: '盘点状态', align: 'center'},
    {prop: 'remark', label: '盘点备注', align: 'center'},
  ]
  const COLUMNS2 = [
    {prop: 'taskCode', label: '盘点单号', minWidth: 150, fixed: 'left', click: true},
    {prop: 'taskName', label: '盘点任务名称', minWidth: 150, fixed: 'left'},
    {prop: 'startTimeStr', label: '盘点开始时间', minWidth: 100, align: 'center'},
    {prop: 'endTimeStr', label: '盘点结束时间', minWidth: 100, align: 'center'},
    {prop: 'completeTimeStr', label: '实际完成盘点时间', minWidth: 150, align: 'center'},
    {prop: 'checkUserName', label: '盘点发起人', minWidth: 100, align: 'center'},
    {prop: 'remark', label: '盘点任务备注', minWidth: 100, align: 'center'},
  ]
  export default {
    name: 'asset-check',
    _meta: {
      path: '/agency/assets/check',
      title: '资产盘点'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      MainToolbar,
      EuiLayout,
      AssetCheckDoStep1Window,
      AssetCheckWindow,
      AssetCheckCopyWindow,
      AssetCheckCompareWindow,
      AssetCheckDetailWindow
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        REGIONS: CONTROLLER.REGIONS,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnDoCheck', 'btnCompare'],
        forminfo: CONTROLLER.FORM_INFO,
        formdata: {...CONTROLLER.FORM_DATA},
        formOptions: Object.assign(CONTROLLER.FORM_OPTIONS, {
        }),
        rules: CONTROLLER.RULES,
        query: {
          agencyId: this.$store.state.agencyId,
          page: 1,
          pageSize: 10,
          checkStatus: 2,
          assetcodeOrAssetnameOrCheckcode: null
        },
        tableOptions: {
          data: [],
          total: 0,
          showSelection: true,
          columns: COLUMNS1,
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          },
          handleSelectionChange: val => {
            this.tableRowsSelect = val.map(v => v.id)
          },
          handleFieldClick: (row) => { // 点击表格某项触发事件
            if (this.query.checkStatus === 2) {
              this.$refs.dostep1.open([row.id])
            } else {
              this.$refs.detail.open(row.id)
            }
          }
        },
        tableRowsSelect: []
      }
    },
    methods: {
      getData(query) {
        api.assetCheck.paged(query).then(data => {
          this.tableOptions.data = data ? data.records : []
          this.tableOptions.total = data ? data.total : 0
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            api.assetCheck.get(row.id).then(data => {
              this.$refs.window.open(data)
            })
            // this.$refs.window.open({...row})
          },
          btnSingleSearch: (arg) => {
            this.query.assetcodeOrAssetnameOrCheckcode = arg
            this.query.page = 1
            this.getData(this.query)
          },
          btnSingleSearchClear: () => {
            this.query.assetcodeOrAssetnameOrCheckcode = null
            this.getData(this.query)
          },
          btnSplitExport0: () => {
          },
          btnSplitExport1: () => {
          },
          btnDoChecks: () => {
            this.$refs.dostep1.open(this.tableRowsSelect)
          },
          btnCopy: () => {
            if (this.tableRowsSelect.length === 1) {
              api.assetCheck.get(this.tableRowsSelect[0]).then(data => {
                this.$refs.copyWindow.open(data)
              })
            } else {
              this.$message({
                message: '至多(少)选择一条需要复制的盘点单!',
                type: 'warning'
              })
            }
          },
          btnCompare: () => {
            this.$refs.compareWindow.open(this.tableRowsSelect)
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.assetController.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.assetController.update(this.formdata).then(() => {
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
      radioChange(label) {
        if (label === 2) {
          this.tableOptions.columns = COLUMNS1
          this.getData(this.query)
        } else if (label === 1) {
          this.tableOptions.columns = COLUMNS2
          this.getData(this.query)
        }
      },
      reload() {
        this.getData(this.query)
      },
      selectChange(prop, val) {
        let handlers = {
          userid: () => {
            this.formdata.username = this.formOptions.userid.find(u => u.value === val).label
          },
          department: () => {
            console.log('selectChange')
            this.formdata.userid = this.formdata.id ? this.formdata.userid : null
            if (val === undefined) {
              this.formOptions.userid = []
            } else {
              let node = helper.getTreeNode([this.organizationData], val, 'children')
              this.formOptions.userid = node.employeeList ? node.employeeList.map(e => ({
                label: e.name,
                value: e.id
              })) : []
              this.formdata.departmentName = helper.getTreeNode([this.organizationData], val, 'children').name
            }
          },
          typeid: () => {
            let node = helper.getTreeNode(this.typeData, val, 'assetsTypeDtoList')
            if (node) {
              this.formdata.unit = node.unit
            } else {
              this.formdata.unit = null
            }
          }
        }
        if (handlers[prop]) {
          handlers[prop].call(this, val)
        }
      }
    },
    mounted() {
      // console.log(helper.getTableButtons(this.buttons))
    },
    watch: {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .tags-wrap
    padding-top: 10px
    .el-tag
      margin-right: 10px

  .table-handle
    padding: 11px 0 11px 10px
    .chosen
      /*display: inline-block*/
      float: right
      font-size: 12px
      color: #555555
      line-height: 28px
    .chosen, .batch-operation
      float: right
      margin-right: 15px

  .el-dropdown-menu
    padding: 0
    margin: 0
    border-radius: 8px
    .el-dropdown-menu__item
      padding: 0 15px

  .dashedline
    clear: both
    border-bottom: 1px dashed #e9e9e9

  .el-form-item
    margin-bottom: 10px
    margin-top: 10px
</style>

