<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      <super-search
          ref="supersearch"
          :options="searchOptions"
          @tagsChange="tags => {this.tags = tags}"
          slot="right"
          @superSearch="superSearch"
          style="float: right">
      </super-search>
    </main-toolbar>
    <div slot="center" class="table-handle clearfix">
      <super-search-tags
          @emptySearch="emptySearch"
          class="searchtabs"
          :tags="tags">
      </super-search-tags>
      <div class="handle">
        <edit-table-field
            @filterField="filterField"
            :field-list="fieldlist">
        </edit-table-field>
        <el-dropdown class="batch-operation">
          <el-button type="primary" size="mini" round :disabled="tableRowsSelect.length === 0">
            批量操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="batchDelete">批量删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="chose">
          已选{{tableRowsSelect.length}}条
        </div>
      </div>
    </div>
    <eui-table
        slot="south"
        ref="table"
        :showIndex="false"
        :showSelection="true"
        :highlight-current-row="false"
        :options="tableOptions"
        @fieldClick="handleFieldClick"
        @reloadTable="tableOptions.reload"
        @handleSelectionChange="tableOptions.handleSelectionChange">
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
    <position-window ref="positionWindow"
                     @reload="getPositionData">
    </position-window>
    <asset-receive-detail-window ref="detailWindow">
    </asset-receive-detail-window>
    <asset-receive-window ref="window"
                          :organization-data="organizationData"
                          :position-data="positionData"
                          @reload="reload"
                          @addFunctions="addFunctions">
    </asset-receive-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import SuperSearchTags from '@/components/common/tools/SuperSearchTags'
  import EditTableField from '@/components/common/tools/EditTableField'
  import {RECEIVE} from './asset.config'
  import config from '@/config'
  import PositionWindow from './window/PositionWindow'
  import AssetReceiveDetailWindow from './window/detail/AssetReceiveDetailWindow'
  import AssetReceiveWindow from './window/AssetReceiveWindow'
  import fileDownload from 'js-file-download'
  const COLUMNS = [
    {prop: 'receiveCode', label: '领用单号', width: 150, fixed: 'left', click: true},
    {prop: 'receiveTimeStr', label: '领用时间', width: 150, fixed: 'left'},
    {prop: 'username', label: '领用人', width: 120, fixed: 'left'},
    {prop: 'departmentName', label: '领用后使用部门', width: 150, align: 'center', fixed: 'left'},
    {prop: 'positionName', label: '领用后使用地', width: 150, align: 'center'},
    {prop: 'station', label: '领用后使用工位', width: 150, align: 'center'},
    {prop: 'disposeUserName', label: '领用处理人', width: 100, align: 'center'},
    {prop: 'receiveRemark', label: '领用备注', width: 150, align: 'center'},
    {prop: 'assetCode', label: '领用前资产编码', width: 150, align: 'center'},
    {prop: 'assetName', label: '领用前资产名称', width: 150, align: 'center'},
    {prop: 'typename', label: '领用前资产类别', width: 150, align: 'center'},
    {prop: 'assetStatusName', label: '领用前资产状态', width: 150, align: 'center'},
    {prop: 'addTimeStr', label: '领用前入库时间', width: 150, align: 'center'},
    {prop: 'brand', label: '领用前品牌', width: 150, align: 'center'},
    {prop: 'assetSourceName', label: '领用前来源', width: 150, align: 'center'},
    {prop: 'model', label: '领用前型号', width: 150, align: 'center'},
    {prop: 'unit', label: '领用前计量单位', width: 150, align: 'center'},
    {prop: 'place', label: '领用前渠道', width: 150, align: 'center'},
    // {prop: 'positionId', label: '领用前金额', width: 100, align: 'center'},
    {prop: 'buyTimeStr', label: '领用前购入时间', width: 150, align: 'center'},
    {prop: 'usetime', label: '领用前使用期限', width: 150, align: 'center'},
    {prop: 'snnumber', label: '领用前SN号', width: 150, align: 'center'},
    {prop: 'warrantyStartStr', label: '领用前保修起始时间', width: 150, align: 'center'},
    {prop: 'warrantyEndStr', label: '领用前过保时间', width: 150, align: 'center'},
    {prop: 'pictures', label: '领用前图片', width: 150, align: 'center', type: 'picture'},
    {prop: 'remark', label: '领用前资产备注', minWidth: 150, align: 'center'}
  ]
  export default {
    name: 'asset-receive',
    _meta: {
      path: '/agency/assets/receive',
      title: '资产领用'
    },
    mixins: [TabPane],
    components: {
      EditTableField,
      EuiTable,
      MainToolbar,
      EuiLayout,
      SuperSearch,
      SuperSearchTags,
      PositionWindow,
      AssetReceiveDetailWindow,
      AssetReceiveWindow
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        REGIONS: RECEIVE.REGIONS,
        buttons: helper.getMainButtons(),
        fieldlist: COLUMNS,
        tags: [],
        OrderIndexArr: [],
        searchOptions: {
          width: 700,
          fieldSearch: [{
            placeholder: '领用单号',
            value: 'receiveCode'
          }, {
            placeholder: '领用后工位',
            value: 'station'
          }, {
            placeholder: '资产编码',
            value: 'assetCode'
          }, {
            placeholder: '资产名称',
            value: 'assetName'
          }, {
            placeholder: '资产型号',
            value: 'model'
          }, {
            placeholder: '渠道',
            value: 'place'
          }, {
            placeholder: '品牌',
            value: 'brand'
          }, {
            placeholder: '使用期限',
            value: 'usetime'
          }, {
            placeholder: '使用人',
            value: 'username'
          }, {
            placeholder: 'SN号',
            value: 'snnumber'
          }, {
            placeholder: '领用备注',
            value: 'receiveRemark'
          }, {
            placeholder: '备注信息',
            value: 'remark'
          }],
          conditionSearch: [
            {
              placeholder: '请选择资产类别',
              value: 'typeid',
              type: 'treeselect',
              options: []
            }, {
              placeholder: '资产状态',
              value: 'assetStatus',
              type: 'select',
              options: [{
                label: '闲置',
                value: '1'
              }, {
                label: '在用',
                value: '2'
              }, {
                label: '维修',
                value: '3'
              }, {
                label: '报废',
                value: '5'
              }, {
                label: '全部',
                value: '8'
              }]
            }, {
              placeholder: '资产来源',
              value: 'assetSource',
              type: 'select',
              options: [{
                label: '自购',
                value: '1'
              }, {
                label: '租赁',
                value: '2'
              }, {
                label: '借用',
                value: '3'
              }, {
                label: '其他',
                value: '4'
              }, {
                label: '自产',
                value: '5'
              }, {
                label: '赠送',
                value: '6'
              }]
            }, {
              placeholder: '使用地',
              value: 'positionId',
              type: 'select',
              options: []
            }, {
              placeholder: '请选择使用部门',
              value: 'department',
              type: 'treeselect',
              options: []
            }, {
              placeholder: '入库开始日期',
              value: 'addTimeStart',
              type: 'date'
            }, {
              placeholder: '入库结束日期',
              value: 'addTimeEnd',
              type: 'date'
            }, {
              placeholder: '领用开始日期',
              value: 'receiveTimeStart',
              type: 'date'
            }, {
              placeholder: '领用结束日期',
              value: 'receiveTimeEnd',
              type: 'date'
            }, {
              placeholder: '保修起始日期',
              value: 'warrantyStartStart',
              type: 'date'
            }, {
              placeholder: '保修结束日期',
              value: 'warrantyStartEnd',
              type: 'date'
            }]
        },
        query: {
          addTimeEnd: null,
          addTimeStart: null,
          agencyId: this.$store.state.agencyId,
          assetCode: null,
          assetName: null,
          assetSource: null,
          assetStatus: null,
          assetcodeOrAssetnameOrReceivecode: null,
          brand: null,
          department: null,
          model: null,
          page: 1,
          pageSize: 10,
          place: null,
          positionId: null,
          receiveCode: null,
          receiveRemark: null,
          receiveTimeEnd: null,
          receiveTimeStart: null,
          remark: null,
          snnumber: null,
          station: null,
          typeId: null,
          username: null,
          usetime: null,
          warrantyStartEnd: null,
          warrantyStartStart: null
        },
        tabValue: 'table1',
        tableOptions: {
          data: [],
          total: 0,
          columns: COLUMNS,
          rowClassName: ({row, rowIndex}) => {
          },
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
          objectSpanMethod: ({ row, column, rowIndex, columnIndex }) => {
            // console.log(row, column, rowIndex, columnIndex)
            if (columnIndex < 9 || columnIndex === 26) {
              for (let i = 0; i < this.OrderIndexArr.length; i++) {
                let element = this.OrderIndexArr[i]
                for (let j = 0; j < element.length; j++) {
                  let item = element[j]  // 0,1    3,4,5
                  if (rowIndex === item) {
                    if (j === 0) {
                      return {
                        rowspan: element.length,
                        colspan: 1
                      }
                    } else if (j !== 0) {
                      return {
                        rowspan: 0,
                        colspan: 0
                      }
                    }
                  }
                }
              }
            }
          }
        },
        tableRowsSelect: [],
        organizationData: null,
        positionData: null
      }
    },
    methods: {
      getData(query) {
        api.assetReceive.paged(query).then(data => {
          // this.tableOptions.data = data.records
          this.tableOptions.data = []
          data.records.forEach(r => {
            if (r.ectypeDtoList && r.ectypeDtoList.length > 0) {
              r.ectypeDtoList.forEach(l => {
                delete l.id
                r['receiveRemark'] = r['remark']
                this.tableOptions.data.push(Object.assign({}, r, l))
              })
            }
          })
          this.getOrderNumber(this.tableOptions.data)
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            api.assetReceive.get(row.id).then(data => {
              this.$refs.window.open(data)
            })
          },
          btnDelete: (row) => {
            this.formdata = {...row}
            this.$confirm(`是否删除:${this.formdata.receiveCode}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.assetReceive.delete([this.formdata.id]).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnSingleSearch: (arg) => {
            this.query.assetcodeOrAssetnameOrReceivecode = arg
            this.query.page = 1
            this.getData(this.query)
          },
          btnSingleSearchClear: () => {
            this.query.assetcodeOrAssetnameOrReceivecode = null
            this.getData(this.query)
          },
          btnSplitExport0: () => {
            if (this.tableRowsSelect.length === 0) {
              this.$message({
                message: '请至少选择一条记录!',
                type: 'warning'
              })
            } else {
              api.assetReceive.assetExport({
                type: 2,
                ids: this.tableRowsSelect.toString()
              }).then(res => {
                let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
                fileDownload(blob, '领用记录.xls')
              })
            }
          },
          btnSplitExport1: () => {
            api.assetReceive.assetExport({
              type: 1,
              ids: [].toString()
            }).then(res => {
              let disposition = (res.headers['content-disposition'] || '')
              let v = disposition.match(/filename=(.*)/)
              let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
              fileDownload(blob, window.decodeURI(v ? v[1] : '领用记录.xls'))
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      filterField(fields) {  // 过滤表格field
        this.tableOptions.columns = COLUMNS.filter(f => fields.includes(f.prop))
      },
      emptySearch(tagname) {
        this.$refs.supersearch.emptyValue(tagname)
      },
      handleFieldClick(row) { // 点击表格某项触发事件
        this.$refs.detailWindow.open(row)
      },
      batchDelete() {
        this.$confirm(`是否批量删除选中项？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          api.assetReceive.delete(this.tableRowsSelect).then(() => {
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
      },
      superSearch(searchinfo) {
        this.query.receiveCode = searchinfo.receiveCode
        this.query.station = searchinfo.station
        this.query.assetCode = searchinfo.assetCode
        this.query.assetName = searchinfo.assetName
        this.query.model = searchinfo.model
        this.query.place = searchinfo.place
        this.query.brand = searchinfo.brand
        this.query.usetime = searchinfo.usetime
        this.query.username = searchinfo.username
        this.query.snnumber = searchinfo.snnumber
        this.query.remark = searchinfo.remark
        this.query.receiveRemark = searchinfo.receiveRemark

        this.query.typeid = searchinfo.typeid
        this.query.assetStatus = searchinfo.assetStatus
        this.query.assetSource = searchinfo.assetSource
        this.query.positionId = searchinfo.positionId
        this.query.department = searchinfo.department
        this.query.addTimeStart = searchinfo.addTimeStart
        this.query.addTimeEnd = searchinfo.addTimeEnd
        this.query.receiveTimeStart = searchinfo.receiveTimeStart
        this.query.receiveTimeEnd = searchinfo.receiveTimeEnd
        this.query.warrantyStartStart = searchinfo.warrantyStartStart
        this.query.warrantyStartEnd = searchinfo.warrantyStartEnd
        this.reload()
      },
      addFunctions(prop) {
        let handlers = {
          positionId: () => {
            this.$refs.positionWindow.open()
          }
        }
        if (handlers[prop]) {
          handlers[prop].call(this)
        }
      },
      getOrganizationData() {
        api.assetController.getOrganizationTree().then(data => {
          this.organizationData = data
          this.searchOptions.conditionSearch.find(cond => cond.value === 'department').options = helper.getTreeData([this.organizationData], 'children', 'name')
        })
      },
      getPositionData() {
        api.positionSetting.getAll().then(data => {
          this.positionData = data
          this.searchOptions.conditionSearch.find(cond => cond.value === 'positionId').options = data && data.length > 0 ? data.map(p => ({
            label: p.positionName,
            value: p.id
          })) : []
        })
      },
      getTypeData() {
        api.typeSetting.getTypeTree().then(data => {
          this.searchOptions.conditionSearch.find(cond => cond.value === 'typeid').options = helper.getTreeData(data, 'assetsTypeDtoList', 'typename')
        })
      },
      getOrderNumber(tableData) {
        this.OrderIndexArr = []
        let OrderObj = {}
        tableData.forEach((element, index) => {
          element.rowIndex = index
          if (OrderObj[element.id]) {
            OrderObj[element.id].push(index)
          } else {
            OrderObj[element.id] = []
            OrderObj[element.id].push(index)
          }
        })
        // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
        for (let k in OrderObj) {
          if (OrderObj[k].length > 1) {
            // console.log(OrderObj[k])
            this.OrderIndexArr.push(OrderObj[k])
          }
        }
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
        vm.getOrganizationData()
        vm.getPositionData()
        vm.getTypeData()
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
    width: 100%
    display: flex
    .searchtabs
      flex: 1
      padding-left: 10px
    .handle
      flex: 0 0 400px
      box-sizing: border-box
      padding: 11px 0 11px 10px
      .chose
        float: right
        font-size: 12px
        color: #555555
        line-height: 28px
      .chose, .batch-operation
        float: right
        margin-right: 35px

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

