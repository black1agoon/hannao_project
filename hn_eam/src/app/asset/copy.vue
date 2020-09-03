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
      <super-search-tags
          @emptySearch="emptySearch"
          :tags="tags">
      </super-search-tags>
    </main-toolbar>
    <div slot="center" class="table-handle clearfix">
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
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="form clearfix" ref="form" :model="formdata" label-width="110px" :rules="rules"
               style="padding: 20px">
        <el-col :sm="item.sm || 8" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <div class="input-item">
              <div class="explain">
                <el-tooltip popper-class="tooltip" v-show="item.explain" :content="item.explain"
                            placement="bottom-start" effect="light">
                  <div class="el-icon-question"></div>
                </el-tooltip>
              </div>
              <div class="input">
                <eui-input v-model="formdata[item.value]"
                           :type="item.type"
                           :readonly="item.readonly"
                           :placeholder="item.placeholder"
                           :options="formOptions[item.value]"
                           :autosize="item.autosize"
                           :disabled="item.disabled"
                           :unit="item.unit"
                           @change="(val) => {selectChange(item.value, val)}">
                </eui-input>
              </div>
              <div class="add" v-if="item.add" @click="addFunctions(item.value)">新增</div>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
    <position-window ref="positionWindow"
                     @reload="getPositionData">
    </position-window>
    <type-window
        ref="typeWindow"
        @reload="getTypeData"
        :form-options="typeWindowOptions">
    </type-window>
    <asset-detail-window ref="detailWindow"></asset-detail-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import SuperSearchTags from '@/components/common/tools/SuperSearchTags'
  import EditTableField from '@/components/common/tools/EditTableField'
  import {RECEIVE} from './asset.config'
  import config from '@/config'
  import PositionWindow from './window/PositionWindow'
  import TypeWindow from './window/TypeWindow'
  import AssetDetailWindow from './window/AssetDetailWindow'
  const COLUMNS = [
    {prop: 'receiveCode', label: '领用单号', width: 150, fixed: 'left', click: true},
    {prop: 'receiveTimeStr', label: '领用时间', width: 150, fixed: 'left'},
    {prop: 'username', label: '领用人', width: 150, fixed: 'left'},
    {prop: 'department', label: '领用后使用部门', width: 150, align: 'center', fixed: 'left'},
    {prop: 'positionName', label: '领用后使用地', width: 150, align: 'center'},
    {prop: 'station', label: '领用后使用工位', width: 150, align: 'center'},
    // {prop: 'assetSource', label: '领用处理人', width: 100, align: 'center'},
    {prop: 'receiveRemark', label: '领用备注', width: 150, align: 'center'},
    {prop: 'assetCode', label: '领用前资产编码', width: 150, align: 'center'},
    {prop: 'assetName', label: '领用前资产名称', width: 150, align: 'center'},
    {prop: 'typeId', label: '领用前资产类别', width: 150, align: 'center'},
    {prop: 'assetStatusName', label: '领用前资产状态', width: 150, align: 'center'},
    {prop: 'addTimeStartStr', label: '领用前入库时间', width: 150, align: 'center'},
    {prop: 'brand', label: '领用前品牌', width: 150, align: 'center'},
    {prop: 'assetSource', label: '领用前来源', width: 150, align: 'center'},
    {prop: 'model', label: '领用前型号', width: 150, align: 'center'},
    {prop: 'unit', label: '领用前计量单位', width: 150, align: 'center'},
    {prop: 'place', label: '领用前渠道', width: 150, align: 'center'},
    // {prop: 'positionId', label: '领用前金额', width: 100, align: 'center'},
    {prop: 'buyTimeStr', label: '领用前购入时间', width: 150, align: 'center'},
    {prop: 'usetime', label: '领用前使用期限', width: 150, align: 'center'},
    {prop: 'snnumber', label: '领用前SN号', width: 150, align: 'center'},
    {prop: 'warrantyStartStartStr', label: '领用前保修起始时间', width: 150, align: 'center'},
    {prop: 'warrantyStartEndStr', label: '领用前过保时间', width: 150, align: 'center'},
    {prop: 'picture', label: '领用前图片', width: 150, align: 'center', type: 'picture'},
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
      EuiInput,
      EuiWindow,
      SuperSearch,
      SuperSearchTags,
      PositionWindow,
      TypeWindow,
      AssetDetailWindow
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        REGIONS: RECEIVE.REGIONS,
        buttons: helper.getMainButtons(),
        fieldlist: COLUMNS,
        tags: [],
        forminfo: RECEIVE.FORM_INFO,
        formdata: {...RECEIVE.FORM_DATA},
        formOptions: Object.assign(RECEIVE.FORM_OPTIONS, {
          pictures: {
            uploadFile: (params) => {
              api.assetController.uploadPic(params.file).then(data => {
                this.formdata.pictures = data.path
              })
            }
          },
          department: []
        }),
        rules: RECEIVE.RULES,
        searchOptions: {
          width: 700,
          fieldSearch: [{
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
                label: '损坏',
                value: '4'
              }, {
                label: '报废',
                value: '5'
              }, {
                label: '外借',
                value: '6'
              }, {
                label: '租用',
                value: '7'
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
        windowOptions: {
          title: '资产信息',
          width: '1000px',
          height: '600px'
        },
        tabValue: 'table1',
        tableOptions: {
          data: [],
          total: 0,
          columns: COLUMNS,
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
          }
        },
        tableRowsSelect: [],
        uploadApi: api.assetController.importTemplate,
        organizationData: null,
        typeData: null,
        typeWindowOptions: {
          parentId: []
        }
      }
    },
    methods: {
      getData(query) {
        api.assetReceive.paged(query).then(data => {
          // this.tableOptions.data = data.records
          data.records.forEach(r => {
            if (r.ectypeDtoList && r.ectypeDtoList.length > 0) {
              r.ectypeDtoList.forEach(l => {
                this.tableOptions.data.push(Object.assign(r, l))
              })
            }
          })
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
            this.$nextTick(() => {
              this.$refs.form.resetFields()
              this.formdata = {...RECEIVE.FORM_DATA}
            })
          },
          btnEdit: (row) => {
            Object.keys(row).forEach(key => {
              this.formdata[key] = row[key]
            })
            let depNode = helper.getTreeNode([this.organizationData], this.formdata.department, 'children')
            if (depNode) {
              this.formdata.userid = depNode.employeeList.find(e => e.name === this.formdata.username).id
            }
            this.$refs.window.open()
          },
          btnDelete: (row) => {
            this.formdata = {...row}
            this.$confirm(`是否删除:${this.formdata.assetName}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.assetController.delete([this.formdata.id]).then(() => {
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
          api.assetController.delete(this.tableRowsSelect).then(() => {
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
        this.query.assetCode = searchinfo.assetCode
        this.query.assetName = searchinfo.assetName
        this.query.model = searchinfo.model
        this.query.place = searchinfo.place
        this.query.brand = searchinfo.brand
        this.query.usetime = searchinfo.usetime
        this.query.username = searchinfo.username
        this.query.snnumber = searchinfo.snnumber
        this.query.remark = searchinfo.remark

        this.query.typeid = searchinfo.typeid
        this.query.assetStatus = searchinfo.assetStatus
        this.query.assetSource = searchinfo.assetSource
        this.query.positionId = searchinfo.positionId
        this.query.department = searchinfo.department
        this.query.addTimeStart = searchinfo.addTimeStart
        this.query.addTimeEnd = searchinfo.addTimeEnd
        this.query.receiveTimeStart = searchinfo.receiveTimeStart
        this.query.receiveTimeEnd = searchinfo.receiveTimeEnd
        this.query.receiveTimeStart = searchinfo.warrantyStartStart
        this.query.receiveTimeEnd = searchinfo.warrantyStartEnd
        this.reload()
      },
      getOrganizationData() {
        api.assetController.getOrganizationTree().then(data => {
          this.organizationData = data
          this.formOptions.department = this.searchOptions.conditionSearch.find(cond => cond.value === 'department').options = helper.getTreeData([this.organizationData], 'children', 'name')
        })
      },
      getPositionData() {
        api.positionSetting.getAll().then(data => {
          this.formOptions.positionId = this.searchOptions.conditionSearch.find(cond => cond.value === 'positionId').options = data && data.length > 0 ? data.map(p => ({
            label: p.positionName,
            value: p.id
          })) : []
          this.$forceUpdate()
        })
      },
      getTypeData() {
        api.typeSetting.getTypeTree().then(data => {
          this.typeData = data
          this.formOptions.typeid = helper.getTreeData(data, 'assetsTypeDtoList', 'typename')
          this.typeWindowOptions.parentId = [{
            id: '0',
            label: '根目录',
            children: helper.getTreeData(data, 'assetsTypeDtoList', 'typename')
          }]
          this.searchOptions.conditionSearch.find(cond => cond.value === 'typeid').options = helper.getTreeData(data, 'assetsTypeDtoList', 'typename')
          this.$forceUpdate()
        })
      },
      selectChange(prop, val) {
        let handlers = {
          userid: () => {
            this.formdata.username = this.formOptions.userid.find(u => u.value === val).label
          },
          department: () => {
            this.formdata.userid = null
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
      },
      addFunctions(prop) {
        let handlers = {
          positionId: () => {
            this.$refs.positionWindow.open()
          },
          typeid: () => {
            this.$refs.typeWindow.open()
          }
        }
        if (handlers[prop]) {
          handlers[prop].call(this)
        }
      }
    },
    mounted() {
      // this.getData(this.query)
      // this.getInputData()
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
    box-sizing: border-box
    padding: 11px 0 11px 10px
    .chose
      /*display: inline-block*/
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

