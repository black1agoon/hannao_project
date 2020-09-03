<template>
  <div>
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, mainFilterButtons)"
        @click="onBtnClick">
      </main-toolbar>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <template slot="prev">
          <el-table-column label="车间编号" width="100" prop="name">
          </el-table-column>
          <el-table-column label="行 * 列" width="100">
            <template slot-scope="scope">
              {{scope.row.lineNumber}} * {{scope.row.columnNumber}}
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" :width="tableButtons.length * 100 + 150 + 'px'" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-for="(btn, index) in helper.getTableButtons(buttons, tableButtons)"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
          </template>
        </el-table-column>
      </eui-table>
      <el-tabs slot="south"
               type="card"
               :value="tabValue"
               @tab-click="tabClick"
               style="height: 100%">
        <el-tab-pane label="关联挡车工" name="spinner">
          <spinner-controller
            @closeType="closeTypeOfUserAdd"
            :buttons="helper.getTabsTableButtons(buttons, 'spinner', tableButtons)"
            ref="spinner">
          </spinner-controller>
        </el-tab-pane>
        <el-tab-pane label="关联维修工" name="fettler">
          <fettler-controller
            @closeType="closeTypeOfUserAdd"
            :buttons="helper.getTabsTableButtons(buttons, 'fettler', tableButtons)"
            ref="fettler">
          </fettler-controller>
        </el-tab-pane>
        <el-tab-pane label="关联机台" name="station">
          <station-show-table ref="station">
          </station-show-table>
        </el-tab-pane>
      </el-tabs>
      <eui-window ref="window"
                  :options="windowOptions">
        <el-form class="clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules" style="padding: 20px">
          <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
            <el-form-item v-if="item.value === 'row_column'" :label="item.name" prop="row_column">
              <eui-input class="line-column" v-model="formdata.lineNumber" type="number">
              </eui-input>
              <span> * </span>
              <eui-input class="line-column" v-model="formdata.columnNumber" type="number">
              </eui-input>
            </el-form-item>
            <el-form-item v-else :label="item.name" :prop="item.value">
              <eui-input v-model="formdata[item.value]"
                         :type="item.type"
                         :readonly="item.readonly"
                         :suffixIcon="item.suffixIcon"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize"
                         @suffixClick="formFunctions(item.value, 'suffixClick')">
              </eui-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="btns">
          <el-button type="primary" size="small" @click="sure">确定</el-button>
          <el-button size="small" @click="cancel">关闭</el-button>
        </div>
      </eui-window>
    </eui-layout>
    <dep-user-chose-window ref="depuser">
    </dep-user-chose-window>
    <type-of-add-user ref="typeofadduser">
    </type-of-add-user>
    <multiple-user-chose-window
      ref="multipleuser"
      :depId="formdata.departmentId">
    </multiple-user-chose-window>
  </div>
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
  import EuiSearch from '@/components/common/form/EuiSearch'
  import {CONTROLLER} from './work.config'
  import DepUserChoseWindow from './work/DepUserChoseWindow'
  import SpinnerController from './spinner/SpinnerController'
  import FettlerController from './fettler/FettlerController'
  import StationShowTable from './station/StationShowTable'
  import TypeOfAddUser from './work/TypeOfAddUser'
  import MultipleUserChoseWindow from '@/app/admin/common/MultipleUserChoseWindow'
  export default {
    name: 'workshop-controller',
    _meta: {
      path: '/workshop/controller',
      title: '车间管理'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch,
      DepUserChoseWindow,
      SpinnerController,
      FettlerController,
      StationShowTable,
      TypeOfAddUser,
      MultipleUserChoseWindow
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        mainFilterButtons: ['btnspinnerAdd', 'btnspinnerEdit', 'btnspinnerDelete', 'btnfettlerAdd', 'btnfettlerEdit', 'btnfettlerDelete'],
        tableButtons: ['btnspinnerAdd', 'btnfettlerAdd'],
        REGIONS: CONTROLLER.REGIONS,
        forminfo: {...CONTROLLER.FORM_INFO},
        formdata: {...CONTROLLER.FORM_DATA},
        formOptions: {...CONTROLLER.FORM_OPTIONS},
        rules: Object.assign(CONTROLLER.RULES, {
          row_column: [{
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (this.formdata.lineNumber === '' || this.formdata.lineNumber === null || this.formdata.columnNumber === '' || this.formdata.columnNumber === null) {
                callback(new Error('行、列不能为空!'))
              } else {
                callback()
              }
            }
          }]
        }),
        query: {
          name: null,
          page: 1,
          pageSize: 10
        },
        tabValue: 'spinner',
        windowOptions: {
          title: '车间信息',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'departmentName', label: '所属部门', width: 150},
            {prop: 'directorName', label: '车间主任', width: 150},
            {prop: 'maintenanceOfficerName', label: '机修主任', width: 150},
            {prop: 'createTime', label: '创建时间', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
            this.loadTabs()
          },
          rowDblclick: (row, event) => {
            this.$refs.window.open()
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
        api.workshop.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
            this.$nextTick(() => {
              this.$refs.form.resetFields()
              this.formdata = {...CONTROLLER.FORM_DATA}
            })
          },
          btnEdit: (arg) => {
            this.formdata = {...arg}
            this.$refs.window.open()
          },
          btnDelete: (arg) => {
            this.formdata = {...arg}
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.workshop.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnspinnerAdd: (arg) => {
            this.tabValue = 'spinner'
            // this.$refs.spinner.windowOpen(arg)
            this.$refs.typeofadduser.open('spinner')
          },
          btnfettlerAdd: (arg) => {
            this.tabValue = 'fettler'
            // this.$refs.fettler.windowOpen(arg)
            this.$refs.typeofadduser.open('fettler')
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, arg)
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.workshop.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.workshop.update(this.formdata).then(() => {
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
      formFunctions(val, method) {
        let funs = {
          directorName: {
            suffixClick: () => {
              if (!this.formdata.departmentId) {
                this.$message.error('请先选择所属部门')
              } else {
                this.$refs.depuser.open(this.formdata.departmentId, 'directorName')
              }
            }
          },
          maintenanceOfficerName: {
            suffixClick: () => {
              if (!this.formdata.departmentId) {
                this.$message.error('请先选择所属部门')
              } else {
                this.$refs.depuser.open(this.formdata.departmentId, 'maintenanceOfficerName')
              }
            }
          }
        }
        funs[val][method].call(this)
      },
      loadTabs() {
        if (this.formdata.id) {
          if (this.tabValue === 'spinner') {
            this.$refs.spinner.reload(this.formdata)
          } else if (this.tabValue === 'fettler') {
            this.$refs.fettler.reload(this.formdata)
          } else if (this.tabValue === 'station') {
            this.$refs.station.reload(this.formdata)
          }
        }
      },
      tabClick(tab) {
        this.tabValue = tab.name
        this.loadTabs()
      },
      closeTypeOfUserAdd() {
        this.$refs.typeofadduser.cancel()
      },
      getDepData() {
        api.department.getTree().then((data) => {
          this.formOptions.departmentId = helper.getTreeData(data, 'childDepartmentDtoList', 'name')
        })
      }
    },
    mounted() {
      this.getData(this.query)
      this.getDepData()
    },
    watch: {
      'formdata.departmentId'() {
        this.formdata.director = null
        this.formdata.maintenanceOfficerName = null
        this.formdata.maintenanceOfficer = null
      },
      'tabValue'() {
        this.loadTabs()
      }
    },
    created() {
      this.$on('directorName', node => {
        this.formdata.directorName = node.realname
        this.formdata.director = node.id
      })
      this.$on('maintenanceOfficerName', node => {
        this.formdata.maintenanceOfficerName = node.realname
        this.formdata.maintenanceOfficer = node.id
      })
      this.$on('typeofadduser', type => {
        if (type.name === 'spinner') {
          if (type.value === 0) {
            this.$refs.multipleuser.open('spinner')
          } else {
            this.$refs.spinner.windowOpen(this.formdata)
          }
        } else if (type.name === 'fettler') {
          if (type.value === 0) {
            this.$refs.multipleuser.open('fettler')
          } else {
            this.$refs.fettler.windowOpen(this.formdata)
          }
        }
      })
      this.$on('multipleuser', (from, list) => {
        if (from === 'spinner') {
          api.spinner.addBatch({
            workshopId: this.formdata.id,
            userIds: list
          }).then(() => {
            this.$message({
              message: '新增成功!',
              type: 'success'
            })
            this.$refs.multipleuser.cancel()
            this.closeTypeOfUserAdd()
            this.$refs.spinner.reload(this.formdata)
          })
        } else if (from === 'fettler') {
          api.fettler.addBatch({
            workshopId: this.formdata.id,
            userIds: list
          }).then(() => {
            this.$message({
              message: '新增成功!',
              type: 'success'
            })
            this.$refs.multipleuser.cancel()
            this.closeTypeOfUserAdd()
            this.$refs.fettler.reload(this.formdata)
          })
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
/deep/ .el-tabs__content
  height: calc(100% - 41px)
.eui-table
  height: 100%
  position: absolute
.line-column
  width: 40%
/deep/ .el-dialog__body
  padding: 0
  overflow: visible !important
</style>
