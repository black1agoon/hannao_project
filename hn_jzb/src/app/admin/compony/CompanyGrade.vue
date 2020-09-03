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
      <el-table-column label="等级图标" align="center" minWidth="70">
        <template slot-scope="scope">
          <img v-if="helper.getImgUrl(scope.row.gradeImg)" :src="helper.getImgUrl(scope.row.gradeImg)" class="grade-img" @click="showBigpic(helper.getImgUrl(scope.row.gradeImg))"/>
        </template>
      </el-table-column>
      <el-table-column label="功能启用" minWidth="200" align="center" fixed="right">
        <template slot-scope="scope">
          <div>
            <span class="switch-label">条码功能:</span>
            <el-switch :value="Boolean(scope.row.barCodeEnable)"
                       @change="changeStatus(scope.$index,scope.row, 'KBCE')">
            </el-switch>
          </div>
          <div>
            <span class="switch-label">芯片功能:</span>
            <el-switch :value="Boolean(scope.row.icChipEnable)"
                       @change="changeStatus(scope.$index,scope.row,'KICE')">
            </el-switch>
          </div>
          <div>
            <span class="switch-label">是否启用:</span>
            <el-switch :value="Boolean(scope.row.isOpen)"
                       @change="changeStatus(scope.$index,scope.row,'KIO')">
            </el-switch>
          </div>
          <div>
            <span class="switch-label">是否默认:</span>
            <el-switch :value="Boolean(scope.row.isDefault)"
                       @change="changeStatus(scope.$index,scope.row,'KID')">
            </el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" minWidth="300" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="openPermission(scope.$index, scope.row)">
            <i class="btn-icon fa fa-gear"></i>配置权限</el-button>
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
    <set-permission-window
      ref="permissionWindow"
      :set-permission="setPermission"
      :get-permission="getPermission">
    </set-permission-window>
    <pic-looking-mask
      ref="piclook"
      :src="showPicUrl">
    </pic-looking-mask>
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
    name: 'company-grade',
    _meta: {
      path: 'company/grade',
      title: '企业等级'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      MainToolbar,
      EuiLayout,
      SetPermissionWindow
    },
    data() {
      return {
        buttons: helper.getMainButtons(),
        REGIONS,
        helper,
        formdata: {},
        query: {
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '等级名称', minWidth: 200, fixed: true},
            {prop: 'goodsSun', label: '可发布产品总和', minWidth: 150},
            {prop: 'seq', label: '排序', minWidth: 100, sortable: true},
            {prop: 'gradeIntroduce', label: '等级描述', minWidth: 200},
            {prop: 'barCodeCount', label: '条码可用数量', minWidth: 150}
          ],
          rowClick: (row, event, column) => {
            this.formdata = JSON.parse(JSON.stringify(row))
          },
          rowDblclick: (row, event) => {
            if (this.formdata.id) {
              this.$router.push({
                path: '/company/gradeform',
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
        },
        showPicUrl: null
      }
    },
    methods: {
      getData(query) {
        api.companyGrade.getCompanyGradePaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.formdata = {}
            this.$router.push({
              path: '/company/gradeform',
              query: {
                id: null
              }
            })
          },
          btnEdit: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$router.push({
              path: '/company/gradeform',
              query: {
                id: this.formdata.id
              }
            })
          },
          btnDelete: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.companyGrade.deleteCompanyGrade(this.formdata.id).then(() => {
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
      changeStatus(index, row, key) {
        let status = {
          KIO: 'isOpen',
          KID: 'isDefault',
          KBCE: 'barCodeEnable',
          KICE: 'icChipEnable'
        }
        api.companyGrade.changeCompanyGradeStatusSwitch({
          id: row.id,
          key: key
        }).then(() => {
          row[status[key]] = row[status[key]] === 0 ? 1 : 0
          if (row[status[key]] === 0) {
            this.$notify({
              title: '',
              message: '关闭成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '',
              message: '开启成功',
              type: 'success'
            })
          }
        })
      },
      openPermission(index, row) {
        this.$refs.permissionWindow.open(row.id)
      },
      getPermission(query, _this) {
        return api.companyGrade.getCompanyGradePermissionTree(query).then((data) => {
          if (data.length > 0) {
            _this.subSystemList = data
          }
          _this.treeOptions.data = helper.getTreeData(data, 'childCompanyPermission', 'name')
          _this.treeOptions.defaultCheckedKeys = helper.getCheckedList(data, 'childCompanyPermission')
        })
      },
      setPermission(checkedlist, _this) {
        api.companyGrade.setCompanyGradePermission({
          permissionList: checkedlist.map(c => c.id),
          gradeId: _this.pquery.id
        }).then(() => {
          this.$message({
            message: '设置成功!',
            type: 'success'
          })
        })
      },
      showBigpic(url) {
        this.showPicUrl = url
        this.$refs.piclook.show()
      }
    },
    mounted() {
      // this.getData(this.query)
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getData(vm.query)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-tabs--border-card
    box-shadow: none
    border-right: none
  .grade-img
    width: 50px
    height: 50px
  .switch-label
    display: inline-block
    margin-right: 5px
</style>

