<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar slot="north"
                  :buttons="buttons"
                  @click="onBtnClick">
    </main-toolbar>
    <eui-tree  slot="west" :options="treeOptions">
      <template slot-scope="scope">
        <el-button type="text" size="mini" @click="() => setSysDefault(scope)">
          设为默认
        </el-button>
      </template>
    </eui-tree>
    <div slot="center" class="center">
      <el-form ref="form" :model="formdata" label-width="80px" :rules="rules">
        <el-col :sm="6" v-for="(item, index) in FORMDATA" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <eui-input v-model="formdata[item.value]"
                       :type="item.type"
                       :disabled="!editflag"
                       :readonly="item.readonly"
                       :options="formOptions[item.value]">
            </eui-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="form-btns" v-show="editflag">
        <el-button type="primary" size="small" @click="submitForm">保存</el-button>
        <el-button type="danger" @click="cancelForm" size="small">放弃</el-button>
        <el-button @click="resetForm" size="small">重置</el-button>
      </div>
    </div>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import TabPane from '@/components/views/TabPane'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTree from '@/components/common/form/EuiTree'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import utils from '@/app/app.utils'
  const FORMDATA = [
    {
      name: '名称',
      value: 'name'
    }, {
      name: '备注',
      value: 'memo'
    }, {
      name: '排序',
      value: 'seq'
    }, {
      name: '类型',
      value: 'resourceType',
      type: 'select'
    }, {
      name: '权限',
      value: 'permission'
    }, {
      name: '上级菜单',
      value: 'pid',
      type: 'treeselect'
    }, {
      name: 'URL',
      value: 'url'
    }, {
      name: '终端',
      value: 'channel',
      type: 'select'
    }, {
      name: '键名',
      value: 'btnKey'
    }, {
      name: '图标',
      value: 'logo'
    }
  ]
  const INFO = {
    name: null, // 名称
    memo: null, // 备注
    url: null, // URL
    seq: null, // 排序
    pid: null, // 上级菜单
    resourceType: null, // 类型
    logo: null, // 图标
    btnKey: null, // 键名
    channel: 0, // 使用渠道
    permission: null // 权限
  }
  const REGIONS = {
    north: {},
    west: {},
    center: {}
  }
  export default {
    name: 'company-permission',
    _meta: {
      path: 'company/permission',
      title: '企业权限'
    },
    mixins: [TabPane],
    components: {
      EuiInput,
      MainToolbar,
      EuiWindow,
      EuiTree,
      EuiLayout
    },
    data() {
      return {
        REGIONS,
        buttons: helper.getMainButtons(),
        FORMDATA,
        editflag: false,
        treeOptions: {
          data: [],
          defaultExpandAll: true,
          expandOnClickNode: false,
          nodeClick: (data, node, vnode) => {
            if (this.editflag) {
              utils.confirm('是否放弃编辑?', this.cancelForm)
            } else {
              api.companyPermission.getCompanyPermission(data.id).then(data => {
                this.formdata = JSON.parse(JSON.stringify(data))
              })
            }
          }
        },
        formdata: JSON.parse(JSON.stringify(INFO)),
        formOptions: {
          resourceType: [{
            value: '0',
            label: '文件夹'
          }, {
            value: '1',
            label: '页面'
          }, {
            value: '2',
            label: '按钮'
          }, {
            value: '3',
            label: '权限'
          }, {
            value: '9',
            label: '子系统'
          }],
          channel: [{
            value: 0,
            label: 'PC端'
          }, {
            value: 1,
            label: 'APP端'
          }],
          pid: []
        },
        rules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          resourceType: [
            {required: true, message: '请选择类型', trigger: 'change'}
          ],
          permission: [
            {required: true, message: '请输入权限', trigger: 'blur'}
          ],
          pid: [
            {required: true, message: '请选择父级', trigger: 'change'}
          ],
          url: [
            {required: true, message: '请输入URL', trigger: 'blur'}
          ],
          channel: [
            {required: true, message: '请选择终端', trigger: 'change'}
          ],
          btnKey: [
            {required: true, message: '请输入键名', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getData() {
        api.companyPermission.getCompanyAllPermissionTree().then((data) => {
          this.treeOptions.data = helper.getTreeData(data['permissionList'], 'childCompanyPermission', 'name')
          this.formOptions.pid = [{
            id: '0',
            label: '根目录',
            children: helper.getTreeData(data['permissionList'], 'childCompanyPermission', 'name')
          }]
        })
      },
      onBtnClick(btnKey) {
        let btnHandlers = {
          btnAdd: () => {
            this.editflag = true
            let pid = ['0', '1', '9'].some(v => v === this.formdata.resourceType) ? this.formdata.id || '0' : this.formdata.pid
            this.formdata = Object.assign({}, INFO, {pid})
          },
          btnEdit: () => {
            if (this.formdata.id) {
              this.editflag = true
            } else {
              this.$message({
                message: '请先选择要编辑的权限!',
                type: 'warning'
              })
            }
          },
          btnDelete: () => {
            if (this.formdata.id) {
              this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
                iconClass: 'el-icon-question'
              })
                .then(() => {
                  api.companyPermission.deleteCompanyPermission(this.formdata.id).then(() => {
                    this.$message({
                      message: '删除成功!',
                      type: 'success'
                    })
                    this.getData()
                  })
                })
                .catch(() => {
                })
            } else {
              this.$message({
                message: '请先选择要删除的菜单!',
                type: 'warning'
              })
            }
          },
          btnCopy: () => {
            this.editflag = true
            let _currentMenuCopy = JSON.parse(JSON.stringify(this.formdata))
            if (_currentMenuCopy.hasOwnProperty('id')) {
              delete _currentMenuCopy.id
            }
            this.formdata = JSON.parse(JSON.stringify(_currentMenuCopy))
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this)
        }
      },
      submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.companyPermission.addCompanyPermission(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.cancelForm()
                this.getData()
              })
            } else {
              api.companyPermission.updateCompanyPermission(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.cancelForm()
                this.getData()
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm() {
        this.$refs.form.resetFields()
      },
      cancelForm() {
        this.$refs.form.resetFields()
        this.editflag = false
        this.formdata = JSON.parse(JSON.stringify(INFO))
      },
      setSysDefault(scope) {
        this.$confirm(`是否将"${scope.data.label}"设为默认系统?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          iconClass: 'fa fa-question-circle'
          // type: 'info'
        }).then(() => {
          api.companyPermission.setCompanySysDefault(scope.data.id).then(() => {
            this.$message({
              message: '设置默认系统成功!',
              type: 'success'
            })
          })
        }).catch(() => {
        })
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .form-btns
    display: block
    clear: both
    text-align: center

  .center
    box-sizing: border-box
    height: 100%
    padding: 20px
</style>



