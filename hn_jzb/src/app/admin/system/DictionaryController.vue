<template>
  <eui-layout :regions="REGIONS">
    <div slot="center" class="flex-content">
      <main-toolbar
        :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
        @click="onBtnClick">
      </main-toolbar>
      <eui-table
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <el-table-column label="操作" align="center" minWidth="200" fixed="right">
          <template slot-scope="scope">
            <template v-for="(btn, index) in helper.getTableButtons(buttons, tableButtons)">
              <el-button
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
    </div>
    <div slot="south" class="flex-content">
      <main-toolbar
        :buttons="helper.getMainFilterButtons(sub_buttons, sub_tableButtons)"
        @click="onBtnClick">
      </main-toolbar>
      <eui-table
        :options="tableOptions2"
        @reloadTable="tableOptions2.reload">
        <el-table-column label="操作" align="center" minWidth="200" fixed="right">
          <template slot-scope="scope">
            <template v-for="(btn, index) in helper.getTableButtons(sub_buttons, sub_tableButtons)">
              <el-button
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
    </div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules" style="padding: 20px">
        <el-col :sm="24" v-for="(item, index) in FORMDATA" :key="index">
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
    <eui-window ref="subwindow"
                :options="subWindowOptions">
      <el-form class="clearfix" ref="subform" :model="subformdata" label-width="80px" :rules="rules"
               style="padding: 20px">
        <el-col :sm="24" v-for="(item, index) in FORMDATA" :key="index">
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
        <el-button type="primary" size="small" @click="subSure">确定</el-button>
        <el-button size="small" @click="subCancel">关闭</el-button>
      </div>
    </eui-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import TabPane from '@/components/views/TabPane'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'

  const REGIONS = {
    center: {
      style: {
        flex: 1
      }
    },
    south: {
      style: {
        flex: 1
      }
    }
  }
  const FORMDATA = [
    {
      name: '名称',
      value: 'name'
    }, {
      name: '备注',
      value: 'memo',
      type: 'textarea',
      autosize: {
        minRows: 6,
        maxRows: 6
      }
    }
  ]
  const INFO = {
    name: null,
    memo: null
  }
  const SUBINFO = {
    name: null,
    pid: null,
    memo: null
  }
  export default {
    name: 'dictionary-controller',
    _meta: {
      path: '/dictionary/controller',
      title: '数据字典'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      MainToolbar,
      EuiLayout,
      EuiWindow,
      EuiInput
    },
    data() {
      return {
        helper,
        buttons: [],
        sub_buttons: [],
        REGIONS,
        FORMDATA,
        formdata: JSON.parse(JSON.stringify(INFO)),
        subformdata: JSON.parse(JSON.stringify(SUBINFO)),
        tableButtons: ['btnEdit', 'btnDelete'],
        sub_tableButtons: ['btnSubEdit', 'btnSubDelete'],
        formOptions: {},
        windowOptions: {
          title: '字典定义',
          width: '20%'
        },
        subWindowOptions: {
          title: '字典值',
          width: '20%'
        },
        rules: {
          name: [{
            required: true, message: '请输入名称', trigger: ['blur', 'change']
          }]
        },
        query: {
          page: 1,
          pageSize: 10
        },
        valueQuery: {
          attrCode: null,
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: null,
          columns: [
            {label: '编号', minWidth: 200, prop: 'code'},
            {label: '名称', minWidth: 200, prop: 'name'},
            {label: '备注', prop: 'memo', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
            this.valueQuery.attrCode = row.code
            this.getValueData(this.valueQuery)
            this.formdata = JSON.parse(JSON.stringify(row))
          },
          rowDblclick: (row, event) => {
            this.$refs.window.open()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
            this.formdata = {...INFO}
          }
        },
        tableOptions2: {
          data: [],
          total: null,
          columns: [
            {label: '编号', minWidth: 200, prop: 'code'},
            {label: '名称', minWidth: 200, prop: 'name'},
            {label: '备注', prop: 'memo', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
            this.subformdata = JSON.parse(JSON.stringify(row))
          },
          rowDblclick: (row, event) => {
            this.$refs.subwindow.open()
          },
          reload: (name, val) => {
            this.valueQuery.page = name === 'page' ? val : this.valueQuery.page
            this.valueQuery.pageSize = name === 'pageSize' ? val : this.valueQuery.pageSize
            this.getValueData(this.valueQuery)
            this.subformdata = {...SUBINFO}
          }
        }
      }
    },
    methods: {
      getData(query) {
        api.dictionary.getPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getValueData(query) {
        api.dictionary.getValuePaged(query).then(data => {
          this.tableOptions2.data = data.records
          this.tableOptions2.total = data.total
        })
      },
      onBtnClick(btnKey) {
        let btnHandlers = {
          btnAdd: () => {
            this.formdata = JSON.parse(JSON.stringify(INFO))
            this.$refs.window.open()
          },
          btnEdit: () => {
            this.$refs.window.open()
          },
          btnDelete: () => {
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'el-icon-question'
            }).then(() => {
              api.dictionary.deleteAttrCode(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              }).catch(() => {
              })
            })
          },
          btnSubAdd: () => {
            if (this.formdata.id) {
              this.subformdata = JSON.parse(JSON.stringify(INFO))
              this.subformdata.pid = this.formdata.id
              this.$refs.subwindow.open()
            } else {
              this.$message({
                message: '请先选择字典定义，再添加值!',
                type: 'warning'
              })
            }
          },
          btnSubEdit: () => {
            this.$refs.subwindow.open()
          },
          btnSubDelete: () => {
            this.$confirm(`是否删除:${this.subformdata.name}？`, '提示', {
              iconClass: 'el-icon-question'
            }).then(() => {
              api.dictionary.deleteAttrValue(this.subformdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getValueData(this.valueQuery)
              }).catch(() => {
              })
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this)
        }
      },
      getButtons() {
        let buttons = helper.getMainButtons()
        this.buttons = buttons.filter(btn => {
          return !btn.btnKey.startsWith('btnSub')
        })
        this.sub_buttons = buttons.filter(btn => {
          return btn.btnKey.startsWith('btnSub')
        })
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.dictionary.addAttrCode(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.dictionary.updateAttrCode(this.formdata).then(() => {
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
      subSure() {
        this.$refs.subform.validate((valid) => {
          if (valid) {
            if (!this.subformdata.id) {
              api.dictionary.addAttrValue(this.subformdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getValueData(this.valueQuery)
                this.$refs.subwindow.cancel()
              })
            } else {
              api.dictionary.updateAttrValue(this.subformdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.getValueData(this.valueQuery)
                this.$refs.subwindow.cancel()
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      subCancel() {
        this.$refs.subwindow.cancel()
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
