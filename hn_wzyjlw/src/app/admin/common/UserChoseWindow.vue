<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-layout :regions="REGIONS" style="height: 500px">
      <eui-tree
        slot="west"
        :options="treeOptions">
      </eui-tree>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
      </eui-table>
    </eui-layout>
    <div slot="btns">
      <el-button type="primary" size="small" @click="sure">确定</el-button>
      <el-button size="small" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import EuiTree from '@/components/common/form/EuiTree'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  const REGIONS = {
    west: {},
    center: {}
  }
  export default {
    name: 'user-chose-window',
    components: {
      EuiLayout,
      EuiTree,
      EuiWindow,
      EuiTable
    },
    data() {
      return {
        REGIONS,
        index: 0,
        query: {
          page: 1,
          pageSize: 10,
          depId: null,
          mobile: null,
          realname: null,
          sex: null,
          username: null
        },
        checkedNode: {},
        windowOptions: {
          title: '人员选择'
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
            {prop: 'username', label: '工号', width: 150, fixed: true},
            {prop: 'realname', label: '姓名', width: 150, fixed: true},
            {prop: 'departmentName', label: '部门', width: 150},
            {prop: 'sexName', label: '性别', width: 100},
            {prop: 'graduate', label: '职称', width: 150},
            {prop: 'idCard', label: '身份证', minWidth: 150},
            {prop: 'birthday', label: '生日', width: 150},
            {prop: 'email', label: '邮箱', width: 150},
            {prop: 'mobile', label: '手机号', minWidth: 150}
          ],
          rowClick: (row, event, column) => {
            this.checkedNode = {...row}
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
        api.user.getPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getTreeData() {
        api.department.getTree().then((data) => {
          this.treeOptions.data = helper.getTreeData(data, 'childDepartmentDtoList')
        })
      },
      sure() {
        if (this.checkedNode.id) {
          this.$parent.$emit('checkedNode', this.checkedNode)
          this.$refs.window.cancel()
        } else {
          this.$refs.window.cancel()
        }
      },
      cancel() {
        this.$refs.window.cancel()
      },
      open() {
        this.$refs.window.open()
      }
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
</style>
