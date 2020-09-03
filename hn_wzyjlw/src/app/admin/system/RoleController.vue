<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons)"
      @click="onBtnClick">
    </main-toolbar>
    <eui-table
      slot="center"
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="openPermission(scope.$index, scope.row)">
            <i class="btn-icon fa fa-gear"></i>配置权限</el-button>
          <el-button
            size="mini"
            type="text"
            @click="openUserWindow(scope.$index, scope.row)">
            <i class="btn-icon fa fa-file-text-o"></i>查看关联人员</el-button>
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
      <el-form class="clearfix" ref="form" :model="formdata" label-width="100px" :rules="rules" style="padding: 20px">
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
    <eui-window ref="permissionWindow"
                :options="permissWindowOptions">
      <eui-layout
        :regions="PERMISS_REGIONS"
        v-loading="ploading">
        <el-tabs slot="west"
                 tab-position="left"
                 type="border-card"
                 style="height: 500px;"
                 @tab-click="tabClick">
          <el-tab-pane
            v-for="(sys, index) in subSystemList"
            :label="sys.name"
            :key="index">
          </el-tab-pane>
        </el-tabs>
        <div slot="center" style="width: 100%;padding: 20px 0;overflow: auto;box-sizing: border-box;height: 500px;">
          <eui-tree
            ref="tree"
            :options="treeOptions">
          </eui-tree>
        </div>
      </eui-layout>
      <div slot="btns">
        <el-button type="primary" size="small" @click="permissionSure">确定</el-button>
        <el-button size="small" @click="permissionCancel">关闭</el-button>
      </div>
    </eui-window>
    <role-user-window ref="roleuser">
    </role-user-window>
  </eui-layout>
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
  import RoleUserWindow from './window/RoleUserWindow'
  const REGIONS = {
    north: {},
    center: {}
  }
  const PERMISS_REGIONS = {
    west: {
      style: {
        width: 130,
        border: false
      }
    },
    center: {}
  }
  const FORMDATA = [
    {
      name: '角色名称',
      value: 'role'
    }, {
      name: '角色描述',
      value: 'description',
      type: 'textarea',
      autosize: {
        minRows: 6,
        maxRows: 6
      }
    }
  ]
  const INFO = {
    role: null,
    description: null,
    templateId: null
  }
  export default {
    name: 'role-controller',
    _meta: {
      path: 'role/controller',
      title: '角色管理'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      MainToolbar,
      EuiLayout,
      EuiTree,
      EuiWindow,
      EuiInput,
      RoleUserWindow
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        REGIONS,
        PERMISS_REGIONS,
        FORMDATA,
        formdata: JSON.parse(JSON.stringify(INFO)),
        formOptions: {
          templateId: []
        },
        rules: {
          role: [{
            required: true, message: '请输入角色名称', trigger: ['blur', 'change']
          }]
        },
        query: {
          page: 1,
          pageSize: 10
        },
        pquery: {
          roleId: null,
          subSystemId: null
        },
        windowOptions: {
          title: '角色信息',
          width: '25%'
        },
        permissWindowOptions: {
          title: '权限设置',
          width: '40%'
        },
        treeOptions: {
          data: [],
          checkStrictly: false,
          showCheckbox: true,
          // defaultExpandAll: true,
          defaultCheckedKeys: [],
          defaultExpandedKeys: [],
          nodeClick: (data, node, vnode) => {
          }
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'role', label: '角色名称', width: 400, fixed: true},
            {prop: 'description', label: '角色描述', width: 400, fixed: true}
          ],
          rowClick: (row, event, column) => {
            this.formdata = JSON.parse(JSON.stringify(row))
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
        subSystemList: [],
        ploading: false
      }
    },
    methods: {
      getData(query) {
        api.role.getPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.formdata = JSON.parse(JSON.stringify(INFO))
            this.formdata.templateId = this.formOptions.templateId.length > 0 ? this.formOptions.templateId[0].value : null
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$refs.window.open()
          },
          btnDelete: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$confirm(`是否删除:${this.formdata.role}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.role.deleteRole(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            })
            .catch(() => {
            })
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
              api.role.addRole(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.role.updateRole(this.formdata).then(() => {
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
      permissionSure() {
        let checked = this.$refs.tree.callByName('getCheckedNodes', false, true) || []
        // console.log(checked)
        api.role.setRolePermission({
          permissionList: checked.map(c => c.id),
          roleId: this.pquery.roleId,
          subSystemId: this.pquery.subSystemId
        }).then(() => {
          this.$message({
            message: '设置成功!',
            type: 'success'
          })
          this.$refs.permissionWindow.cancel()
        })
      },
      permissionCancel() {
        this.$refs.permissionWindow.cancel()
      },
      openPermission(index, row) {
        this.$refs.permissionWindow.open()
        this.pquery.roleId = row.id
        this.getSubSyetemList(this.pquery)
      },
      openUserWindow(index, row) {
        this.$refs.roleuser.open(row.id)
      },
      getSubSyetemList(query) {
        this.ploading = true
        api.permission.getPermissRoleTree(query).then((data) => {
          if (data.subSystem) {
            this.subSystemList = data.subSystem
            this.pquery.subSystemId = data.subSystem[0].id
          }
          this.treeOptions.data = helper.getTreeData(data.subSystemPermissionList, 'childUserPermission', 'name')
          this.treeOptions.defaultCheckedKeys = helper.getCheckedList(data.subSystemPermissionList, 'childUserPermission')
          this.treeOptions.defaultExpandedKeys = this.treeOptions.data.map(t => t.id)
          this.ploading = false
        }).catch(() => {
          this.ploading = false
        })
      },
      tabClick(vObj) {
        this.pquery.subSystemId = this.subSystemList[vObj.index].id
        this.getSubSyetemList(this.pquery)
      }
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog__body
    padding: 0
  .el-tabs--border-card
    box-shadow: none
    border-right: none
  /deep/ .el-tabs--border-card
    border: none
</style>

