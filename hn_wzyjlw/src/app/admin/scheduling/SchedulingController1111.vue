<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons, tableButtons.concat(sub_tableButtons))"
      @click="onBtnClick">
    </main-toolbar>
    <div slot="center" class="flex-content">
      <eui-table
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <el-table-column label="操作" width="500" align="center" fixed="right">
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
      <eui-window ref="window"
                  :options="windowOptions">
        <el-form class="clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules" style="padding: 20px">
          <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <eui-input v-model="formdata[item.value]"
                         :type="item.type"
                         :readonly="item.readonly"
                         :suffixIcon="item.suffixIcon"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize">
              </eui-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="btns">
          <el-button type="primary" size="small" @click="sure">确定</el-button>
          <el-button size="small" @click="cancel">关闭</el-button>
        </div>
      </eui-window>
    </div>
    <div slot="south" class="flex-content">
      <eui-table
        ref="table"
        :options="subTableOptions"
        @reloadTable="tableOptions.reload">
        <el-table-column label="操作" width="500" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-for="(btn, index) in helper.getTableButtons(sub_buttons, sub_tableButtons)"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
          </template>
        </el-table-column>
      </eui-table>
      <eui-window ref="subwindow"
                  :options="subWindowOptions">
        <el-form class="clearfix" ref="subform" :model="subformdata" label-width="80px" :rules="subrules" style="padding: 20px">
          <el-col :sm="24" v-for="(item, index) in subforminfo" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <eui-input v-model="subformdata[item.value]"
                         :type="item.type"
                         :readonly="item.readonly"
                         :suffixIcon="item.suffixIcon"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize">
              </eui-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="btns">
          <el-button type="primary" size="small" @click="subsure">确定</el-button>
          <el-button size="small" @click="subcancel">关闭</el-button>
        </div>
      </eui-window>
    </div>
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
  import EuiSearch from '@/components/common/form/EuiSearch'
  import { CONTROLLER, DETAIL } from './scheduling.config'
  export default {
    name: 'scheduling-controller',
    _meta: {
      path: '/scheduling/controller',
      title: '排班管理'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch
    },
    data() {
      return {
        helper,
        buttons: [], // 所有的按钮
        sub_buttons: [],  // 下方表格按钮
        tableButtons: ['btnSubAdd'], // 上方表格中的按钮
        sub_tableButtons: ['btnSubEdit', 'btnSubDelete'],  // 下方表格中的按钮
        REGIONS: CONTROLLER.REGIONS,
        forminfo: {...CONTROLLER.FORM_INFO},
        formdata: {...CONTROLLER.FORM_DATA},
        formOptions: {...CONTROLLER.FORM_OPTIONS},
        rules: CONTROLLER.RULES,
        subforminfo: {...DETAIL.FORM_INFO},
        subformdata: {...DETAIL.FORM_DATA},
        subformOptions: {...DETAIL.FORM_OPTIONS},
        subrules: DETAIL.RULES,
        query: {
          name: null,
          page: 1,
          pageSize: 10
        },
        subQuery: {
          schedulingId: null,
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '排班信息',
          width: '20%'
        },
        subWindowOptions: {
          title: '排班详情',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '车间名称', width: 300},
            {prop: 'createTime', label: '创建时间', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
            this.subQuery.schedulingId = row.id
            this.getSubData(this.subQuery)
            this.formdata = {...row}
          },
          rowDblclick: (row, event) => {
            this.$refs.window.open()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        },
        subTableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '详情名称', width: 200},
            {prop: 'seq', label: '排序', width: 100, sortable: true},
            {prop: 'startTime', label: '开始时间', width: 200},
            {prop: 'endTime', label: '结束时间', width: 200},
            {prop: 'createTime', label: '创建时间', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
            this.subformdata = {...row}
          },
          rowDblclick: (row, event) => {
            this.$refs.subwindow.open()
          },
          reload: (name, val) => {
            this.subQuery.page = name === 'page' ? val : this.subQuery.page
            this.subQuery.pageSize = name === 'pageSize' ? val : this.subQuery.pageSize
            this.getData(this.subQuery)
          }
        }
      }
    },
    methods: {
      getData(query) {
        api.scheduling.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getSubData(query) {
        api.schedulingDetail.paged(query).then(data => {
          this.subTableOptions.data = data.records
          this.subTableOptions.total = data.total
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
              api.scheduling.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnSubAdd: () => {
            this.$refs.subwindow.open()
          },
          btnSubEdit: (arg) => {
            this.subformdata = {...arg}
            this.$refs.subwindow.open()
          },
          btnSubDelete: (arg) => {
            this.subformdata = {...arg}
            this.$confirm(`是否删除:${this.subformdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.schedulingDetail.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getSubData(this.subQuery)
              })
            }).catch(() => {
            })
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
              api.scheduling.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.scheduling.update(this.formdata).then(() => {
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
      subsure() {
        this.$refs.subform.validate((valid) => {
          if (valid) {
            this.subformdata.schedulingId = this.formdata.id
            if (!this.subformdata.id) {
              api.schedulingDetail.add(this.subformdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getSubData(this.subQuery)
                this.$refs.subwindow.cancel()
              })
            } else {
              api.schedulingDetail.update(this.subformdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.getSubData(this.subQuery)
                this.$refs.subwindow.cancel()
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      subcancel() {
        this.$refs.subwindow.cancel()
      },
      getButtons() {
        let buttons = helper.getMainButtons()
        this.buttons = buttons
        this.sub_buttons = buttons.filter(btn => {
          return btn.btnKey.startsWith('btnSub')
        })
      }
    },
    mounted() {
      this.getData(this.query)
      this.getButtons()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .flex-content
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
</style>
