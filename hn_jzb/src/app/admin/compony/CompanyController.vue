<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
      @click="onBtnClick">
    </main-toolbar>
    <eui-table
      slot="center"
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column label="操作" align="center" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="openPermission(scope.$index, scope.row)">
            <i class="btn-icon fa fa-gear"></i>配置权限
          </el-button>
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
    <set-permission-window
      ref="permissionWindow"
      :set-permission="setPermission"
      :get-permission="getPermission">
    </set-permission-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import SetPermissionWindow from '@/app/admin/common/SetPermissionWindow'

  const REGIONS = {
    north: {},
    center: {}
  }
  export default {
    name: 'company-controller',
    _meta: {
      path: '/company/controller',
      title: '企业信息'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      SetPermissionWindow
    },
    data() {
      return {
        helper,
        REGIONS,
        formdata: {},
        query: {
          cnName: null,
          page: 1,
          pageSize: 10
        },
        buttons: helper.getMainButtons(),
        tableButtons: ['btnDetail'],
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'cnName', label: '企业名称', width: 200, fixed: true},
            {prop: 'enName', label: '英文名', width: 200},
            {prop: 'username', label: '登录名', width: 200},
            {prop: 'gradeName', label: '企业等级', width: 200},
            {prop: 'statusName', label: '状态', width: 200},
            {prop: 'industryName', label: '所属行业', width: 200},
            {prop: 'legalRepresentative', label: '法人代表', width: 200},
            {prop: 'expireDate', label: '到期时间', width: 200},
            {prop: 'contractPeriod', label: '合同期限', width: 200},
            {prop: 'operator', label: '公司运营者', width: 200},
            {prop: 'telephone', label: '联系电话', width: 200},
            {prop: 'employees', label: '员工总数', width: 200},
            {prop: 'regAddress', label: '企业注册地址', width: 200},
            {prop: 'regAddressCode', label: '注册地址邮编', width: 200},
            {prop: 'regionName', label: '地址所属区域', width: 200},
            {prop: 'operateAddress', label: '运营地址', width: 200},
            {prop: 'workingLanguage', label: '工作语言', width: 200}
          ],
          rowClick: (row, event, column) => {
            this.formdata = JSON.parse(JSON.stringify(row))
          },
          rowDblclick: (row, event) => {
            if (this.formdata.id) {
              this.$router.push({
                path: '/company/infoform',
                query: {
                  id: this.formdata.id
                }
              })
            }
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
        api.company.getCompanyPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$router.push({
              path: '/company/infoform',
              query: {
                id: null
              }
            })
          },
          btnEdit: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$router.push({
              path: '/company/infoform',
              query: {
                id: this.formdata.id
              }
            })
          },
          btnDelete: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$confirm(`是否删除:${this.formdata.cnName}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.company.deleteCompany(this.formdata.id).then(() => {
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
            this.query.cnName = arg
            this.query.page = 1
            this.getData(this.query)
          },
          btnSingleSearchClear: () => {
            this.query.cnName = null
            this.getData(this.query)
          },
          btnDetail: () => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$router.push({
              path: '/company/detail',
              query: {
                id: this.formdata.id
              }
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      openPermission(index, row) {
        this.$refs.permissionWindow.open(row.id)
      },
      getPermission(query, _this) {
        return api.companyPermission.getCompanyPermissionTree(query).then((data) => {
          if (data.length > 0) {
            _this.subSystemList = data
          }
          _this.treeOptions.data = helper.getTreeData(data, 'childCompanyPermission', 'name')
          _this.treeOptions.defaultCheckedKeys = helper.getCheckedList(data, 'childCompanyPermission')
        })
      },
      setPermission(checkedlist, _this) {
        api.companyPermission.setCompanyPermission({
          permissionList: checkedlist.map(c => c.id),
          companyId: _this.pquery.id
        }).then(() => {
          this.$message({
            message: '设置成功!',
            type: 'success'
          })
        })
      }
    },
    beforeRouteLeave(to, from, next) {
      // console.log(to, from)
      // to.meta.title = '企业新增'
      next()
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getData(vm.query)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
