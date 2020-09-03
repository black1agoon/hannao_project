<template>
  <div class="flex-wrapper">
    <div class="flex-content">
      <main-toolbar class="main-toolbar"
        :buttons="BUTTONS"
        @click="onBtnClick">
      </main-toolbar>
      <eui-table
        ref="table"
        :data="tabledata"
        :options="tableOptions"
        :row-click="rowClick"
        @reloadTable="reload">
      </eui-table>
    </div>
    <div class="flex-content">
      <main-toolbar
        :buttons="BUTTONS"
        @click="onBtnClick">
      </main-toolbar>
      <eui-table
        :data="valuedata"
        :options="tableOptions"
        @reloadTable="reloadValue">
      </eui-table>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  const BUTTONS = ['btnAdd', 'btnEdit', 'btnDelete']
  export default {
    name: 'test3',
    _meta: {
      path: 'test3',
      title: '测试333'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      MainToolbar
    },
    data() {
      return {
        BUTTONS,
        tabledata: {},
        valuedata: {},
        query: {
          page: 1,
          pageSize: 10
        },
        valueQuery: {
          attrCode: null,
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          columns: [
            {label: '编号', width: 400, prop: 'code'},
            {label: '名称', width: 400, prop: 'name'},
            {label: '备注', width: 400, prop: 'memo'}
          ]
        }
      }
    },
    methods: {
      getData(query) {
        api.dictionary.getPaged(query).then(data => {
          this.tabledata = {
            data: data.records,
            total: data.total
          }
        })
      },
      getValueData(query) {
        api.dictionary.getValuePaged(query).then(data => {
          this.valuedata = {
            data: data.records,
            total: data.total
          }
        })
      },
      onBtnClick(btnKey) {
        let btnHandlers = {
          btnAdd: () => {
            // this.editflag = true
            // this.formdata = JSON.parse(JSON.stringify(INFO))
          },
          btnEdit: () => {
            // if (this.formdata.id) {
            //   this.editflag = true
            // } else {
            //   this.$message({
            //     message: '请先选择要编辑的菜单!',
            //     type: 'warning'
            //   })
            // }
          },
          btnDelete: () => {
            // if (this.formdata.id) {
            //   this.$confirm(`是否删除:${this.formdata.name}？`)
            //     .then(() => {
            //       api.permission.deletePermission(this.formdata.id).then(() => {
            //         this.$message({
            //           message: '删除成功!',
            //           type: 'success'
            //         })
            //         this.getData()
            //       })
            //     })
            //     .catch(() => {
            //     })
            // } else {
            //   this.$message({
            //     message: '请先选择要删除的菜单!',
            //     type: 'warning'
            //   })
            // }
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this)
        }
      },
      reload(name, val) {
        this.query.page = name === 'page' ? val : this.query.page
        this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
        this.getData(this.query)
      },
      reloadValue(name, val) {
        this.valueQuery.page = name === 'page' ? val : this.valueQuery.page
        this.valueQuery.pageSize = name === 'pageSize' ? val : this.valueQuery.pageSize
        this.getValueData(this.valueQuery)
      },
      rowClick(row, event, column) {
        // console.log(row, event, column)
        this.valueQuery.attrCode = row.code
        this.getValueData(this.valueQuery)
      }
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.flex-wrapper
  display: flex
  flex-direction: column
  width: 100%
  height: 100%
  position: absolute
  .flex-content
    flex: 1
    display: flex
    flex-direction: column
    .main-toolbar
      flex: 0 0 28px
</style>
