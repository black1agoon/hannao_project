<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
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
      <el-table-column label="生日" minWidth="150" align="center">
        <template slot-scope="scope">{{helper.formatBirthday(scope.row.birthday)}}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" minWidth="150" align="center">
      </el-table-column>
      <el-table-column label="手机号" prop="mobile" minWidth="150">
      </el-table-column>
      <el-table-column label="是否启用" align="center" minWidth="200" fixed="right">
        <template slot-scope="scope">
          <!--<el-switch v-model="scope.row.enabled">-->
          <!--</el-switch>-->
          <el-switch v-if="tableButtons.includes('btnEnabled') && tableButtons.includes('btnUnenabled')" :value="Boolean(scope.row.enabled)"
                     @change="changeAble(scope.$index,scope.row)">
          </el-switch>
          <el-switch v-else-if="tableButtons.includes('btnEnabled') && !tableButtons.includes('btnUnenabled')" :value="Boolean(scope.row.enabled)"
                     @change="changeAble(scope.$index,scope.row)" :disabled="Boolean(scope.row.enabled)">
          </el-switch>
          <el-switch v-else :value="Boolean(scope.row.enabled)"
                     @change="changeAble(scope.$index,scope.row)" :disabled="Boolean(!scope.row.enabled)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" minWidth="200" align="center" fixed="right">
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
    <eui-window ref="window" :options="windowOptions" :handleClose="getHandleClose">
      <el-tabs type="card" :value="windowTabOpen">
        <el-tab-pane label="基本信息" name="first">
          <el-form class="clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules">
            <el-col :sm="item.sm || 8" v-for="(item, index) in FORMDATA" :key="index">
              <el-form-item :label="item.name" :prop="item.value">
                <eui-input v-if="item.value === 'username'"
                           :disabled="editflag"
                           v-model="formdata[item.value]">
                </eui-input>
                <eui-input v-else-if="item.value !== 'avatar' && item.value !== 'username'" v-model="formdata[item.value]"
                           :type="item.type"
                           :readonly="item.readonly"
                           :suffixIcon="item.suffixIcon"
                           :options="formOptions[item.value]"
                           :autosize="item.autosize"
                           @suffixClick="formFunctions(item.value, 'suffixClick')">
                </eui-input>
                <div v-else style="width: 100%;padding-bottom: 100%">
                  <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    :http-request="formOptions.avatar.uploadFile"
                    :before-upload="formOptions.avatar.beforeAvatarUpload">
                    <img v-if="helper.getImgUrl(formdata.avatar)" :src="helper.getImgUrl(formdata.avatar)" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="角色信息" name="second">
          <el-checkbox-group v-model="role.checkedList">
            <el-checkbox
              v-for="(role, index) in role.list"
              :label="role.id"
              :key="index">{{role.role}}
            </el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
      </el-tabs>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import utils from '@/app/app.utils'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTree from '@/components/common/form/EuiTree'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  const REGIONS = {
    north: {},
    west: {},
    center: {}
  }
  const FORMDATA = [
    {
      name: '用户名',
      value: 'username'
    }, {
      name: '姓名',
      value: 'realname'
    }, {
      name: '拼音码',
      value: 'hotkey'
    }, {
      name: '头像',
      value: 'avatar'
    }, {
      name: '部门',
      value: 'depId',
      type: 'treeselect'
    }, {
      name: '性别',
      value: 'sex',
      type: 'select'
    }, {
      name: '手机号码',
      value: 'mobile',
      type: 'number'
    }, {
      name: '联系电话',
      value: 'contactTel',
      type: 'number'
    }, {
      name: '生日',
      value: 'birthday',
      type: 'date'
    }, {
      name: '身份证',
      value: 'idCard'
    }, {
      name: '入职时间',
      value: 'entryTime',
      type: 'date'
    }, {
      name: '邮箱',
      value: 'email'
    }, {
      name: '职称',
      value: 'graduate'
    }, {
      name: '地址',
      value: 'address',
      sm: 16,
      type: 'textarea'
    }, {
      name: '备注',
      value: 'memo',
      sm: 24,
      type: 'textarea'
    }
  ]
  const INFO = {
    username: null,  // 用户名
    hotkey: null, //
    realname: null, // 真实姓名
    depId: null, // 所属部门
    sex: null, // 性别
    mobile: null, // 手机号码
    contactTel: null, // 联系电话
    birthday: null, // 生日
    avatar: null, // 头像
    entryTime: null, // 入职时间
    email: null, // 邮箱
    graduate: null, // 学位
    enabled: 1, // 是否1：启动，0：禁用
    idCard: null, // 身份证号码
    memo: null, // 备注
    address: null // 地址
  }
  export default {
    name: 'user-controller',
    _meta: {
      path: 'user/controller',
      title: '用户管理'
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
        tableButtons: [],
        REGIONS,
        FORMDATA,
        able: true,
        editflag: false,
        windowTabOpen: 'first',
        formdata: JSON.parse(JSON.stringify(INFO)),
        formdataCopy: JSON.parse(JSON.stringify(INFO)),
        formOptions: {
          sex: [{
            value: '1',
            label: '男'
          }, {
            value: '2',
            label: '女'
          }],
          avatar: {
            uploadFile: (params) => {
              api.public.uploadAvatar(params.file).then(data => {
                this.formdata.avatar = data.path
              })
            },
            beforeAvatarUpload: (file) => {
              const isLt2M = file.size / 1024 / 1024 < 2
              if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
              }
              return isLt2M
            }
          }
        },
        rules: {
          username: [{
            required: true, message: '请输入用户名', trigger: ['blur', 'change']
          }],
          realname: [{
            required: true, message: '请输入姓名', trigger: ['blur', 'change']
          }],
          depId: [{
            required: true, message: '请选择部门', trigger: 'change'
          }],
          email: [
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          mobile: [
            {required: true, message: '请输入手机号码', trigger: ['blur', 'change']},
            {
              validator: (rule, value, callback) => {
                if (/^1[34578]\d{9}$/.test(value) === false && value) {
                  callback(new Error('请输入正确的手机号'))
                } else {
                  callback()
                }
              },
              trigger: ['blur', 'change']
            }],
          idCard: [{
            validator: (rule, value, callback) => {
              if (/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(value) === false && value) {
                callback(new Error('请输入正确的身份证号码'))
              } else {
                callback()
              }
            },
            trigger: ['blur', 'change']
          }]
        },
        query: {
          page: 1,
          pageSize: 10,
          depId: null,
          mobile: null,
          realname: null,
          sex: null,
          username: null
        },
        role: {
          list: [],
          checkedList: [],
          checkedCopyList: []
        },
        windowOptions: {
          title: '用户信息'
        },
        treeOptions: {
          data: [],
          defaultExpandAll: true,
          nodeClick: (data, node, vnode) => {
            this.query.depId = data.id
            this.getData(this.query)
          }
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'username', label: '用户名', minWidth: 150, fixed: true},
            {prop: 'realname', label: '姓名', minWidth: 150, fixed: true},
            {prop: 'departmentName', label: '部门', minWidth: 150},
            {prop: 'sexName', label: '性别', minWidth: 100},
            {prop: 'graduate', label: '职称', minWidth: 150},
            {prop: 'idCard', label: '身份证', minWidth: 150}
          ],
          rowClick: (row, event, column) => {
            this.formdata.id = row.id
          },
          rowDblclick: (row, event) => {
            api.user.getUser(this.formdata.id).then(data => {
              this.$refs.window.open()
              this.$nextTick(() => {
                this.initForm('btnEdit', data)
              })
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
    computed: {
      getHandleClose() {
        // console.log(this.formdata)
        // console.log(this.formdataCopy)
        return utils.isChanged(this.formdata, this.formdataCopy)
      }
    },
    methods: {
      changeAble(index, row) {
        if (row.enabled === 1) {
          api.user.disableUser({
            idList: [row.id]
          }).then(() => {
            row.enabled = 0
            this.$notify({
              title: '',
              message: '禁用成功',
              type: 'success'
            })
          })
        } else {
          api.user.enableUser({
            idList: [row.id]
          }).then(() => {
            row.enabled = 1
            this.$notify({
              title: '',
              message: '启用成功',
              type: 'success'
            })
          })
        }
      },
      getData(query) {
        api.user.getPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getTreeData() {
        api.department.getTree().then((data) => {
          this.treeOptions.data = this.formOptions.depId = helper.getTreeData(data, 'childDepartmentDtoList', 'name')
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
            this.$nextTick(() => {
              this.initForm(btnKey)
            })
          },
          btnEdit: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            api.user.getUser(this.formdata.id).then(data => {
              this.$refs.window.open()
              this.$nextTick(() => {
                this.initForm(btnKey, data)
              })
            })
          },
          btnDelete: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$confirm(`是否删除:${this.formdata.username}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.user.deleteUser(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
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
        this.$refs.window.cancel()
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.formdataCopy = JSON.parse(JSON.stringify(this.formdata))
            if (!this.formdata.id) {
              api.user.addUser(this.formdata).then((data) => {
                if (this.role.checkedList.sort().toString() !== this.role.checkedCopyList.sort().toString()) {
                  api.role.setUserRoles({
                    roleIdList: this.role.checkedList,
                    userId: data.userId
                  }).then(() => {
                    this.thendoing('新增成功!')
                  })
                } else {
                  this.thendoing('新增成功!')
                }
              })
            } else {
              api.user.updateUser(this.formdata).then(() => {
                if (this.role.checkedList.sort().toString() !== this.role.checkedCopyList.sort().toString()) {
                  api.role.setUserRoles({
                    roleIdList: this.role.checkedList,
                    userId: this.formdata.id
                  }).then(() => {
                    this.thendoing('编辑成功!')
                  })
                } else {
                  this.thendoing('编辑成功!')
                }
              })
            }
          } else {
            return false
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      initForm(key, data) {
        this.windowTabOpen = 'first'
        this.$refs.form.resetFields()
        this.getRolesData()
        if (key === 'btnAdd') {
          this.editflag = false
          this.formdata = JSON.parse(JSON.stringify(INFO))
          this.formdataCopy = JSON.parse(JSON.stringify(INFO))
          this.role.checkedList = []
          this.role.checkedCopyList = []
        } else if (key === 'btnEdit') {
          this.editflag = true
          this.formdata = JSON.parse(JSON.stringify(data.user))
          this.formdataCopy = JSON.parse(JSON.stringify(data.user))
          this.role.checkedList = JSON.parse(JSON.stringify(data.roleList.map(r => r.id)))
          this.role.checkedCopyList = JSON.parse(JSON.stringify(data.roleList.map(r => r.id)))
        }
      },
      getRolesData() {
        api.role.getPaged({
          page: 1,
          pageSize: 999
        }).then(data => {
          this.role.list = data.records
        })
      },
      getTableButtons() {
        this.tableButtons = this.buttons.filter(btn => btn.btnKey === 'btnEnabled' || btn.btnKey === 'btnUnenabled').map(m => m.btnKey)
      }
    },
    mounted() {
      this.getData(this.query)
      this.getTreeData()
      this.getTableButtons()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog__body
    padding: 0

  /deep/ .el-tabs__content
    padding: 20px

  .el-checkbox
    line-height: 40px
    width: 150px
    &:first-child
      margin-left: 30px
  .avatar-uploader
    width: 100%
    height: 100%
    position: absolute
    /deep/ .el-upload
      width: 100%
      height: 100%
      .avatar-uploader-icon
        width: 100%
        height: 100%
        line-height: 0
      .el-icon-plus:before
        position: absolute
        top: 50%
        left: 50%
        transform: translateX(-50%) translateY(-50%)
  .avatar
    width: 100%
    height: 100%
</style>
<style>
</style>
