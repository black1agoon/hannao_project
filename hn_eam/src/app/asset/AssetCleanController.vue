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
          class="searchtabs"
          @emptySearch="emptySearch"
          :tags="tags">
      </super-search-tags>
      <div class="handle">
        <edit-table-field
            @filterField="filterField"
            :field-list="fieldlist">
        </edit-table-field>
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
    </eui-table>
    <asset-clean-detail-window ref="detailWindow">
    </asset-clean-detail-window>
    <asset-clean-window ref="window"
                         :position-data="positionData"
                         @reload="reload"
                         @addFunctions="addFunctions">
    </asset-clean-window>
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
  import {RETURN} from './asset.config'
  import config from '@/config'
  import AssetCleanDetailWindow from './window/detail/AssetCleanDetailWindow'
  import AssetCleanWindow from './window/AssetCleanWindow'
  import fileDownload from 'js-file-download'
  const COLUMNS = [
    {prop: 'cleanCode', label: '清理单号', width: 150, fixed: 'left', click: true, sortable: true},
    {prop: 'cleanTimeStr', label: '清理时间', width: 150, align: 'center', sortable: true},
    {prop: 'cleanUserName', label: '清理人', width: 150, align: 'center'},
    {prop: 'cleanReason', label: '清理原因', width: 150, align: 'center'},
    {prop: 'remark', label: '清理备注', width: 150, align: 'center'},
    {prop: 'assetName', label: '资产名称', width: 150, align: 'center'},
    {prop: 'typename', label: '资产类别', width: 150, align: 'center'},
    {prop: 'assetCode', label: '资产编码', minWidth: 150, align: 'center'}
  ]
  export default {
    name: 'asset-clean',
    _meta: {
      path: '/agency/assets/clean',
      title: '清理报废'
    },
    mixins: [TabPane],
    components: {
      EditTableField,
      EuiTable,
      MainToolbar,
      EuiLayout,
      SuperSearch,
      SuperSearchTags,
      AssetCleanDetailWindow,
      AssetCleanWindow
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        REGIONS: RETURN.REGIONS,
        buttons: helper.getMainButtons(),
        fieldlist: COLUMNS,
        tags: [],
        OrderIndexArr: [],
        searchOptions: {
          width: 700,
          fieldSearch: [{
            placeholder: '清理单号',
            value: 'cleanCode'
          }, {
            placeholder: '清理原因',
            value: 'cleanReason'
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
            placeholder: 'SN号',
            value: 'snnumber'
          }, {
            placeholder: '清理备注',
            value: 'cleanRemark'
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
              placeholder: '入库开始日期',
              value: 'addTimeStart',
              type: 'date'
            }, {
              placeholder: '入库结束日期',
              value: 'addTimeEnd',
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
          assetcodeOrAssetnameOrCleancode: null,
          brand: null,
          cleanCode: null,
          cleanReason: null,
          cleanRemark: null,
          model: null,
          page: 1,
          pageSize: 10,
          place: null,
          remark: null,
          snnumber: null,
          typeId: null,
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
            if (columnIndex < 6) {
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
        api.assetClean.paged(query).then(data => {
          // this.tableOptions.data = data.records
          this.tableOptions.data = []
          data.records.forEach(r => {
            if (r.assetDtoList && r.assetDtoList.length > 0) {
              r.assetDtoList.forEach(l => {
                delete l.id
                delete l.remark
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
          btnSingleSearch: (arg) => {
            this.query.assetcodeOrAssetnameOrCleancode = arg
            this.query.page = 1
            this.getData(this.query)
          },
          btnSingleSearchClear: () => {
            this.query.assetcodeOrAssetnameOrCleancode = null
            this.getData(this.query)
          },
          btnSplitExport0: () => {
            if (this.tableRowsSelect.length === 0) {
              this.$message({
                message: '请至少选择一条记录!',
                type: 'warning'
              })
            } else {
              api.assetClean.assetExport({
                type: 2,
                ids: this.tableRowsSelect.toString()
              }).then(res => {
                let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
                fileDownload(blob, '清理报废记录.xls')
              })
            }
          },
          btnSplitExport1: () => {
            api.assetClean.assetExport({
              type: 1,
              ids: [].toString()
            }).then(res => {
              let disposition = (res.headers['content-disposition'] || '')
              let v = disposition.match(/filename=(.*)/)
              let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
              fileDownload(blob, window.decodeURI(v ? v[1] : '清理报废记录.xls'))
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
      reload() {
        this.getData(this.query)
      },
      superSearch(searchinfo) {
        this.query.cleanCode = searchinfo.cleanCode
        this.query.cleanReason = searchinfo.cleanReason
        this.query.assetCode = searchinfo.assetCode
        this.query.assetName = searchinfo.assetName
        this.query.model = searchinfo.model
        this.query.place = searchinfo.place
        this.query.brand = searchinfo.brand
        this.query.usetime = searchinfo.usetime
        this.query.snnumber = searchinfo.snnumber
        this.query.remark = searchinfo.remark
        this.query.cleanRemark = searchinfo.cleanRemark

        this.query.typeid = searchinfo.typeid
        this.query.assetStatus = searchinfo.assetStatus
        this.query.assetSource = searchinfo.assetSource
        this.query.addTimeStart = searchinfo.addTimeStart
        this.query.addTimeEnd = searchinfo.addTimeEnd
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
        })
      },
      getPositionData() {
        api.positionSetting.getAll().then(data => {
          this.positionData = data
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

