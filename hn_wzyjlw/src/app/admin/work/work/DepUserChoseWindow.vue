<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-layout :regions="REGIONS">
      <div slot="north">
        <el-input placeholder="请输入工号搜索"
                  v-model="query.username"
                  class="input-with-select searchbox"
                  :clearable="true"
                  @clear="clearSearch">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="search">
          </el-button>
        </el-input>
      </div>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
      </eui-table>
    </eui-layout>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import EuiTree from '@/components/common/form/EuiTree'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  const REGIONS = {
    north: {
      style: {
        height: '42px'
      }
    },
    center: {}
  }
  export default {
    name: 'dep-user-chose-window',
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
        from: null,
        prop: null,
        query: {
          page: 1,
          pageSize: 10,
          username: null,
          depId: null
        },
        checkedNode: {},
        windowOptions: {
          title: '用户选择'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'realname', label: '姓名', width: 150, fixed: true},
            {prop: 'username', label: '工号', width: 150, fixed: true},
            {prop: 'departmentName', label: '部门', width: 150},
            {prop: 'sexName', label: '性别', width: 100},
            {prop: 'graduate', label: '职称', width: 150},
            {prop: 'idCard', label: '身份证', minWidth: 150},
            {prop: 'birthday', label: '生日', width: 150},
            {prop: 'email', label: '邮箱', width: 150},
            {prop: 'mobile', label: '手机号', minWidth: 150}
          ],
          rowClick: (row, event, column) => {
            this.checkedNode = JSON.parse(JSON.stringify(row))
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
      sure() {
        if (this.checkedNode.id) {
          this.$parent.$emit(this.prop, this.checkedNode, this.from)
          this.$refs.window.cancel()
        } else {
          this.$refs.window.cancel()
        }
      },
      cancel() {
        this.$refs.window.cancel()
      },
      open(depId, prop, from = 'form') {
        this.from = from
        this.prop = prop
        this.query.depId = depId
        this.getData(this.query)
        this.$refs.window.open()
      },
      search() {
        this.query.page = 1
        this.getData(this.query)
      },
      clearSearch(val) {
        this.query.username = null
        this.getData(this.query)
      }
    },
    mounted() {
      // this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog
    height: 70%
  /deep/ .el-dialog__body
    padding: 0 20px
    height: calc(100% - 78px)
    overflow-y: auto

  .searchbox
    width: 30%
    margin: 6px 0 0 10px
    /deep/ .el-input__inner
      height: 30px
</style>
