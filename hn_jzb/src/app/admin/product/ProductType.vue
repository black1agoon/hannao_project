<template>
  <div>
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      </main-toolbar>
      <eui-tree
        slot="west"
        :options="treeOptions">
      </eui-tree>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <el-table-column label="操作" width="200" align="center" fixed="right">
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
      <eui-window ref="window" :options="windowOptions">
        <el-form class="clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules"
                 style="padding: 20px 20px 20px 0">
          <el-col :sm="24" v-for="(item, index) in FORM_INFO" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <eui-input v-model="formdata[item.value]"
                         :type="item.type"
                         :readonly="item.readonly"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize">
              </eui-input>
            </el-form-item>
          </el-col>
        </el-form>
        <div slot="btns">
          <el-button type="primary" size="mini" @click="sure">确定</el-button>
          <el-button size="mini" @click="cancel">关闭</el-button>
        </div>
      </eui-window>
    </eui-layout>
  </div>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTree from '@/components/common/form/EuiTree'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import {TYPE} from './product.config'

  export default {
    name: 'product-type',
    _meta: {
      path: '/product/type',
      title: '产品类别'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      MainToolbar,
      EuiLayout,
      EuiTree,
      EuiWindow,
      EuiInput
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        REGIONS: TYPE.REGIONS,
        FORM_INFO: TYPE.FORM_INFO,
        formdata: JSON.parse(JSON.stringify(TYPE.FORM_DATA)),
        formOptions: TYPE.FORM_OPTIONS,
        rules: TYPE.RULES,
        query: {
          pid: 0,
          page: 1,
          pageSize: 10
        },
        addinfo: {
          pid: 0,
          pidName: '类别'
        },
        windowOptions: {
          title: '类别信息',
          width: '25%'
        },
        treeOptions: {
          data: [],
          expandOnClickNode: false,
          defaultExpandAll: true,
          nodeClick: (data, node, vnode) => {
            this.query.pid = data.id
            this.addinfo.pid = data.id
            this.addinfo.pidName = data.label
            this.getData(this.query)
          }
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '名称', minWidth: 200},
            {prop: 'seq', label: '排序', minWidth: 100, sortable: true},
            {prop: 'pidName', label: '上级', minWidth: 200},
            {prop: 'memo', label: '备注', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
          },
          rowDblclick: (row, event) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$refs.window.open()
            this.$nextTick(() => {
              this.initForm('btnEdit', this.formdata)
            })
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        }
      }
    },
    computed: {},
    methods: {
      getData(query) {
        api.productType.getTypesubPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getTreeData() {
        api.productType.getTypeTree().then((data) => {
          this.treeOptions.data = this.formOptions.pid = [{
            id: 0,
            label: '类别',
            icon: 'fa-folder',
            children: helper.getTreeData(data && data.length > 0 ? data : [], 'childProductTypeList', 'name')
          }]
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
            this.$nextTick(() => {
              this.$refs.form.resetFields()
              this.formdata = JSON.parse(JSON.stringify(TYPE.FORM_DATA))
              this.formdata.pid = this.addinfo.pid
            })
          },
          btnEdit: (row) => {
            this.$refs.window.open()
            this.formdata = JSON.parse(JSON.stringify(row))
          },
          btnDelete: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.productType.deleteType(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.getTreeData()
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      thendoing(msg) {
        this.$message({
          message: msg,
          type: 'success'
        })
        this.getData(this.query)
        this.getTreeData()
        this.$refs.window.cancel()
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.productType.addType(this.formdata).then(() => {
                this.thendoing('新增成功!')
              })
            } else {
              api.productType.updateType(this.formdata).then(() => {
                this.thendoing('编辑成功!')
              })
            }
          } else {
            return false
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      }
    },
    created() {
    },
    mounted() {
      this.getData(this.query)
      this.getTreeData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog__body
    padding: 0
    overflow: visible !important
</style>
