<template>
  <eui-window ref="window"
              :options="windowOptions">
    <div class="user-wrapper">
      <eui-tree
          class="left"
          ref="tree"
          :options="treeOptions">
      </eui-tree>
      <eui-table
          class="right"
          ref="table"
          :showIndex="false"
          :showSelection="multipleSelect"
          :showPagination="false"
          :highlight-current-row="!multipleSelect"
          :options="tableOptions">
      </eui-table>
    </div>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiTree from '@/components/common/form/EuiTree'
  export default {
    name: 'organization-user-window',
    components: {
      EuiWindow,
      EuiTable,
      EuiTree
    },
    props: {
      // multipleSelect: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        helper,
        agencyId: this.$store.state.agencyId,
        organizationOptions: [],
        tableRowsSelect: [],
        tableRowSelect: {},
        windowOptions: {
          title: '人员选择',
          width: '800px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '姓名'},
            {prop: 'userName', label: '工号'},
            {prop: 'mobile', label: '电话'},
          ],
          handleSelectionChange: val => {
            this.tableRowsSelect = val
          },
          rowClick: (row, event, column) => {
            if (!this.multipleSelect) {
              this.tableRowSelect = {...row}
            } else {
              this.$refs.table.callByName('toggleRowSelection', row)
            }
            // if (this.tableRowsSelect.some(r => r.id === row.id)) {
            //   this.$refs.table.callByName('clearSelection', this.tableRowsSelect)
            // } else {
            //   this.$refs.table.callByName('clearSelection', this.tableRowsSelect)
            //   this.$refs.table.callByName('toggleRowSelection', row)
            // }
          },
          select: (selection, row) => {
            // if (this.tableRowsSelect.some(r => r.id === row.id)) {
            //   this.$refs.table.callByName('clearSelection', selection)
            // } else {
            //   this.$refs.table.callByName('clearSelection', selection)
            //   this.$refs.table.callByName('toggleRowSelection', row)
            // }
          }
        },
        treeOptions: {
          data: [],
          defaultExpandAll: true,
          expandOnClickNode: false,
          nodeClick: (data, node, vnode) => {
            this.getTabelData(data.id)
          }
        },
        from: null,
        multipleSelect: false
      }
    },
    methods: {
      open(from, selects = [], multiple = false) {
        this.from = from
        this.multipleSelect = multiple
        this.tableRowsSelect = []
        this.tableRowSelect = {}
        this.$refs.window.open()
        this.getTabelData(this.treeOptions.data[0].id).then(() => {
          if (!multiple && selects.length === 1) {
            let row = this.tableOptions.data.find(row => row.id === selects[0])
            this.$refs.table.callByName('setCurrentRow', row)
            this.$refs.tree.callByName('setCurrentNode', this.treeOptions.data[0])
          } else if (multiple && selects.length > 0) {
            this.$refs.table.callByName('clearSelection', this.tableOptions.data)
            this.$refs.tree.callByName('setCurrentNode', this.treeOptions.data[0])
            selects.forEach(rowId => {
              let row = this.tableOptions.data.find(row => row.id === rowId)
              this.$refs.table.callByName('toggleRowSelection', row)
            })
          } else if (multiple && selects.length === 0) {
            this.$refs.table.callByName('clearSelection', this.tableOptions.data)
            this.$refs.tree.callByName('setCurrentNode', this.treeOptions.data[0])
          }
        })
      },
      sure() {
        if (this.multipleSelect) {
          this.$emit('selectUser', this.tableRowsSelect, this.from)
        } else {
          this.$emit('selectUser', [this.tableRowSelect], this.from)
        }
        this.cancel()
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getOrgTree() {
        return api.meeting.getDeptree(this.agencyId).then(data => {
          this.treeOptions.data = this.getTreeData([data], 'children', 'name')
        })
      },
      getTreeData(treedata, childProp, prop) {
        let setName = node => {
          let hasChildren = node[childProp] && node[childProp].length > 0
          return {
            id: node.code,
            label: node[prop],
            children: hasChildren ? node[childProp].map(setName) : undefined
          }
        }
        return treedata.map(setName)
      },
      getTabelData(orgCode) {
        return api.meeting.getDepEmp({
          agencyId: this.agencyId,
          orgCode: orgCode,
          page: 1,
          pageSize: 999
        }).then(data => {
          if (data && data.records) {
            this.tableOptions.data = data.records
          } else {
            this.tableOptions.data = []
          }
        })
      }
    },
    mounted() {
      this.getOrgTree()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.user-wrapper
  width: 100%
  height: 100%
  display: flex
  .left
    width: 200px
    height: 500px
    border-right: 1px solid #eee
    overflow-y: auto
  .right
    width: 600px
    height: 500px
</style>