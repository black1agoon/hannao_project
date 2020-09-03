<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
      @click="onBtnClick">
      <super-search
        ref="search"
        v-model="query"
        :options="SEARCH_OPTIONS"
        @search="superSearch"
        @appendClick="appendClick"
        slot="right"
        style="margin-right: 35px">
      </super-search>
    </main-toolbar>
    <eui-table
      slot="center"
      ref="table"
      :options="tableOptions">
      <el-table-column label="生日" minWidth="150" align="center">
        <template slot-scope="scope">{{helper.formatBirthday(scope.row.birthday)}}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email" minWidth="200" align="center">
      </el-table-column>
      <el-table-column label="备注" prop="memo" minWidth="200" align="center">
      </el-table-column>
      <el-table-column label="操作" minWidth="300" align="center" fixed="right">
        <template slot-scope="scope">
          <template v-for="(btn, index) in helper.getTableButtons(buttons, tableButtons)">
            <el-button
              v-if="btn.btnKey === 'btnDisable'"
              v-show="scope.row.state === 1 || scope.row.state === 2"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
            <el-button
              v-else-if="btn.btnKey === 'btnEnable'"
              v-show="scope.row.state === 3"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
            <el-button
              v-else-if="btn.btnKey === 'btnLocked'"
              v-show="scope.row.state === 1"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
            <el-button
              v-else-if="btn.btnKey === 'btnRealseLock'"
              v-show="scope.row.state === 2"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
            <el-button
              v-else
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
    <el-tabs slot="south"
             type="card"
             :value="tabValue"
             @tab-click="tabClick"
             style="height: 100%">
      <el-tab-pane label="积分兑换记录" name="exchange">
        <eui-table
          :show-index="false"
          :options="subTableOptions1">
        </eui-table>
      </el-tab-pane>
      <el-tab-pane label="积分变化" name="detail">
        <eui-table
          :show-index="false"
          :options="subTableOptions2">
        </eui-table>
      </el-tab-pane>
      <el-tab-pane label="收件人信息" name="address">
        <eui-table
          :show-index="false"
          :options="subTableOptions3">
          <el-table-column label="默认收件地址" minWidth="150" align="center">
            <template slot-scope="scope">{{scope.row.defaulted === 0 ? '否' : '是'}}
            </template>
          </el-table-column>
        </eui-table>
      </el-tab-pane>
    </el-tabs>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules" style="padding: 20px">
        <el-col :sm="item.sm || 12" v-for="(item, index) in FORM_INFO" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <el-upload
              v-if="item.value === 'avatar'"
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="formOptions.avatar.uploadFile"
              :before-upload="formOptions.avatar.beforeAvatarUpload">
              <img v-if="helper.getImgUrl(formdata.avatar)" :src="helper.getImgUrl(formdata.avatar)" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <eui-input v-else-if="item.value === 'username'"
                       v-model="formdata[item.value]"
                       :disabled="editingFlag">
            </eui-input>
            <eui-input v-else v-model="formdata[item.value]"
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
    <eui-window ref="lockWindow" :options="lockWindowOptions">
      <div style="padding: 20px">
        <eui-input type="date" v-model="lockdata.lockto">
        </eui-input>
      </div>
      <div slot="btns">
        <el-button type="primary" size="small" @click="locked">锁定</el-button>
        <el-button size="small" @click="lockedCancel">关闭</el-button>
      </div>
    </eui-window>
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
  import {USER} from './mssuser.config'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'mss-user-controller',
    _meta: {
      path: '/mss/user',
      title: '用户信息'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      SuperSearch
    },
    data() {
      return {
        helper,
        REGIONS: USER.REGIONS,
        FORM_INFO: USER.FORM_INFO,
        formdata: {...USER.FORM_DATA},
        buttons: helper.getMainButtons(),
        tableButtons: ['btnDisable', 'btnEnable', 'btnLocked', 'btnRealseLock'],
        formOptions: Object.assign(USER.FORM_OPTIONS, {
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
        }),
        rules: USER.RULES,
        SEARCH_OPTIONS: USER.SEARCH_OPTIONS,
        editingFlag: false,
        query: {
          username: null,
          realName: null,
          icCard: null,
          page: 1,
          pageSize: 10,
          state: null
        },
        windowOptions: {
          title: '用户信息',
          width: '40%'
        },
        lockWindowOptions: {
          title: '设置锁定时间',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'username', label: '用户名', width: 150},
            {prop: 'stateName', label: '状态', width: 100},
            {prop: 'lockTo', label: '锁定到期时间', width: 200},
            {prop: 'regTime', label: '注册时间', width: 150},
            {prop: 'regTypeName', label: '注册方式', width: 150},
            {prop: 'regIp', label: '注册ip', width: 150},
            {prop: 'credit', label: '积分', width: 100},
            {prop: 'level', label: '等级', width: 100},
            {prop: 'realName', label: '真实姓名', width: 100},
            {prop: 'icCard', label: '身份证', width: 200},
            {prop: 'sex', label: '性别', width: 100},
            {prop: 'inviter', label: '主要邀请人', width: 150}
          ],
          rowClick: (row, event, column) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.subQuery.userId = row.id
            this.loadTabs()
          },
          rowDblclick: (row, event) => {
            this.editingFlag = true
            this.$refs.window.open()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        },
        lockdata: {
          idList: [],
          lockto: null,
          row: null
        },
        tabValue: 'exchange',
        subQuery: {
          page: 1,
          pageSize: 10,
          userId: null
        },
        subTableOptions1: {
          data: [],
          total: 0,
          columns: [
            {prop: 'goodsName', label: '名称', minWidth: 150},
            {prop: 'goodsIcon', label: '图标', width: 100, type: 'picture'},
            {prop: 'goodsCredit', label: '需要的积分', minWidth: 150},
            {prop: 'createTime', label: '兑换时间', minWidth: 150},
            {prop: 'deliveryName', label: '收件人名字', minWidth: 150},
            {prop: 'deliveryMobile', label: '收件人电话', minWidth: 100},
            {prop: 'deliveryAddress', label: '收件人地址', minWidth: 200}
          ],
          reload: (name, val) => {
            this.subQuery.page = name === 'page' ? val : this.subQuery.page
            this.subQuery.pageSize = name === 'pageSize' ? val : this.subQuery.pageSize
            this.getSubData1()
          }
        },
        subTableOptions2: {
          data: [],
          total: 0,
          columns: [
            {prop: 'itemName', label: '积分类型', minWidth: 150},
            {prop: 'amount', label: '积分变化', minWidth: 150},
            {prop: 'createTime', label: '创建时间', minWidth: 150},
            {prop: 'memo', label: '备注', minWidth: 200}
          ],
          reload: (name, val) => {
            this.subQuery.page = name === 'page' ? val : this.subQuery.page
            this.subQuery.pageSize = name === 'pageSize' ? val : this.subQuery.pageSize
            this.getSubData2()
          }
        },
        subTableOptions3: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '积分类型', minWidth: 150},
            {prop: 'mobile', label: '积分变化', minWidth: 150},
            {prop: 'address', label: '创建时间', minWidth: 150}
          ],
          reload: (name, val) => {
            this.subQuery.page = name === 'page' ? val : this.subQuery.page
            this.subQuery.pageSize = name === 'pageSize' ? val : this.subQuery.pageSize
            this.getSubData3()
          }
        }
      }
    },
    methods: {
      reload() {
        this.getData(this.query)
      },
      getData(query) {
        api.mssUser.getUserPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getSubData1() {
        api.mssUser.exchangeLogPaged(this.subQuery).then(data => {
          this.subTableOptions1.data = data.records
          this.subTableOptions1.total = data.total
        })
      },
      getSubData2() {
        api.mssUser.mssCreditsDetailPaged(this.subQuery).then(data => {
          this.subTableOptions2.data = data.records
          this.subTableOptions2.total = data.total
        })
      },
      getSubData3() {
        api.mssUser.deliveryAddressPaged(this.subQuery).then(data => {
          this.subTableOptions3.data = data.records
          this.subTableOptions3.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnAdd: () => {
            this.editingFlag = false
            this.$refs.window.open()
            this.$nextTick(() => {
              this.$refs.form.resetFields()
              this.formdata = {...USER.FORM_DATA}
            })
          },
          btnEdit: (arg) => {
            this.editingFlag = true
            this.formdata = JSON.parse(JSON.stringify(arg))
            this.$refs.window.open()
          },
          btnDelete: (arg) => {
            this.formdata = JSON.parse(JSON.stringify(arg))
            this.$confirm(`是否删除:${this.formdata.username}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.mssUser.deleteUser(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnDisable: (arg) => {
            api.mssUser.disable({
              idList: [arg.id]
            }).then(() => {
              this.reload()
              this.$notify({
                title: '',
                message: '禁用成功',
                type: 'success'
              })
            })
          },
          btnEnable: (arg) => {
            api.mssUser.enable({
              idList: [arg.id]
            }).then(() => {
              this.reload()
              this.$notify({
                title: '',
                message: '启用成功',
                type: 'success'
              })
            })
          },
          btnLocked: (arg) => {
            this.lockdata.idList = [arg.id]
            this.lockdata.row = arg
            this.$refs.lockWindow.open()
          },
          btnRealseLock: (arg) => {
            api.mssUser.realseLock({
              idList: [arg.id]
            }).then(() => {
              this.$notify({
                title: '',
                message: '解锁成功',
                type: 'success'
              })
              this.reload()
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
              api.mssUser.addUser(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.cancel()
              })
            } else {
              api.mssUser.updateUser(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.cancel()
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      cancel() {
        this.editingFlag = false
        this.$refs.window.cancel()
      },
      locked() {
        api.mssUser.locked({
          idList: this.lockdata.idList,
          lockto: this.lockdata.lockto
        }).then(() => {
          this.$notify({
            title: '',
            message: '锁定成功',
            type: 'success'
          })
          this.reload()
          this.lockedCancel()
        })
      },
      lockedCancel() {
        this.$refs.lockWindow.cancel()
      },
      appendClick(value) {
        let funs = {
          companyName: () => {
            this.$refs.companyWindow.open('search')
          }
        }
        funs[value].call(this)
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.username = searchinfo.username
        this.query.icCard = searchinfo.icCard
        this.query.realName = searchinfo.realName
        this.getData(this.query)
      },
      tabClick(tab) {
        this.tabValue = tab.name
        this.loadTabs()
      },
      loadTabs() {
        this.query.page = 1
        if (this.tabValue === 'exchange' && this.subQuery.userId) {
          this.getSubData1()
        } else if (this.tabValue === 'detail' && this.subQuery.userId) {
          this.getSubData2()
        } else if (this.tabValue === 'address' && this.subQuery.userId) {
          this.getSubData3()
        }
      }
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .avatar-uploader-icon
    width: 150px
    height: 150px
    line-height: 150px
  .avatar
    width: 150px
    height: 150px
    display: block
  /deep/ .el-tabs__content
    height: calc(100% - 31px)
    .el-tab-pane
      height: 100%
</style>

