<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-table
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column label="生日" width="150" align="center">
        <template slot-scope="scope">{{helper.formatBirthday(scope.row.birthday)}}
        </template>
      </el-table-column>
    </eui-table>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import EuiTree from '@/components/common/form/EuiTree'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import helper from '@/app/app.helpers'
  export default {
    name: 'company-chose-window',
    components: {
      EuiLayout,
      EuiTree,
      EuiWindow,
      EuiTable
    },
    data() {
      return {
        helper,
        query: {
          page: 1,
          pageSize: 10,
          roleId: null
        },
        checkedNode: {},
        windowOptions: {
          title: '关联人员名单'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'username', label: '工号', minWidth: 100, fixed: true},
            {prop: 'realname', label: '姓名', minWidth: 100, fixed: true},
            {prop: 'departmentName', label: '部门', minWidth: 100},
            {prop: 'sexName', label: '性别', minWidth: 100},
            {prop: 'graduate', label: '职称', minWidth: 100},
            {prop: 'idCard', label: '身份证', minWidth: 150},
            {prop: 'email', label: '邮箱', minWidth: 150},
            {prop: 'mobile', label: '手机号', minWidth: 150}
          ],
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
        api.user.getPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      open(roleId) {
        this.$refs.window.open()
        this.query.roleId = roleId
        this.getData(this.query)
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog
    height: 60%

  /deep/ .el-dialog__body
    padding: 0 20px
    height: calc(100% - 40px)
    overflow-y: auto
  /deep/ .el-dialog__footer
    padding: 0 !important
</style>
