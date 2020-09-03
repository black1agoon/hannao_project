<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-layout :regions="REGIONS">
      <div slot="north">
        <el-input placeholder="请输入工号搜索"
                  v-model="query.jobNumber"
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
        :showSelection="true"
        @reloadTable="tableOptions.reload"
        @handleSelectionChange="tableOptions.handleSelectionChange">
      </eui-table>
      <div slot="south" class="choose-wrapper">
        <p>已选中工号:</p>
        <eui-input
          class="textarea"
          type="textarea"
          v-model="getChooseList"
          :autosize="{minRows: 4,maxRows: 4}">
        </eui-input>
      </div>
    </eui-layout>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiTree from '@/components/common/form/EuiTree'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiInput from '@/components/common/form/EuiInput'
  const REGIONS = {
    north: {
      style: {
        height: 42
      }
    },
    center: {},
    south: {
      style: {
        height: 110
      }
    }
  }
  export default {
    name: 'group-rel-user-window',
    components: {
      EuiInput,
      EuiLayout,
      EuiTree,
      EuiWindow,
      EuiTable
    },
    props: {
      groupId: {
        type: String,
        default: ''
      },
      getPaged: Function
    },
    computed: {
      getChooseList() {
        return this.multipleSelectionAll.map(s => s.jobNumber).join(',')
      }
    },
    data() {
      return {
        REGIONS,
        from: null,
        query: {
          page: 1,
          pageSize: 10,
          groupId: null,
          jobNumber: null
        },
        multipleSelection: [],
        multipleSelectionAll: [],
        windowOptions: {
          title: '用户选择'
        },
        tableOptions: {
          data: [],
          total: 0,
          currentPage: 1,
          columns: [
            {prop: 'jobNumber', label: '工号', width: 100},
            {prop: 'name', label: '真实姓名', width: 100},
            {prop: 'workshopName', label: '所属车间', width: 100},
            {prop: 'sexName', label: '性别', width: 100},
            {prop: 'phone', label: '电话', width: 150},
            {prop: 'memo', label: '备注', minWidth: 100}
          ],
          rowClick: (row, event, column) => {
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            // this.changePageCoreRecordData()
            this.getData(this.query).then(() => {
              this.setSelectRow()
            })
          },
          handleSelectionChange: val => {
            this.multipleSelection = val
            this.$nextTick(() => {
              this.changePageCoreRecordData()
            })
          }
        }
      }
    },
    methods: {
      changePageCoreRecordData() {
        let selectAllIds = []
        this.multipleSelectionAll.forEach(row => {
          selectAllIds.push(row.id)      // ----------->为了获取<所有选中>的id,selectAllIds
        })
        let selectIds = []
        this.multipleSelection.forEach(row => {
          selectIds.push(row.id)         // ----------->  所有<当前页选中>的id
          if (selectAllIds.indexOf(row.id) < 0) {    // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
            this.multipleSelectionAll.push(row)
          }
        })
        let noSelectIds = []
        this.tableOptions.data.forEach(row => {
          if (selectIds.indexOf(row.id) < 0) {
            noSelectIds.push(row.id)      // ------------>当前页所有table数据中 没选中的id
          }
        })
        noSelectIds.forEach(id => {
          if (selectAllIds.indexOf(id) >= 0) {
            for (let i = 0; i < this.multipleSelectionAll.length; i++) {
              if (this.multipleSelectionAll[i].id === id) {   //  --------> 如果总选择中有未被选中的，那么就删除这条
                this.multipleSelectionAll.splice(i, 1)
                break
              }
            }
          }
        })
      },
      setSelectRow() {
        if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
          return
        }
        let selectAllIds = []
        this.multipleSelectionAll.forEach(row => {
          selectAllIds.push(row.id)
        })
        this.$refs.table.callByName('clearSelection')
        for (let i = 0; i < this.tableOptions.data.length; i++) {
          if (selectAllIds.indexOf(this.tableOptions.data[i].id) >= 0) {
            this.$refs.table.callByName('toggleRowSelection', this.tableOptions.data[i], true)
          }
        }
      },
      getData(query) {
        return this.getPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      sure() {
        if (this.multipleSelectionAll.length > 0) {
          this.$parent.$emit('multipleuser', this.from, this.multipleSelectionAll.map(m => m.id))
          this.$refs.window.cancel()
        } else {
          this.$refs.window.cancel()
        }
      },
      cancel() {
        this.$refs.window.cancel()
      },
      open(from = null) {
        this.from = from
        this.multipleSelectionAll = []
        this.tableOptions.currentPage = this.query.page = 1
        this.getData(this.query)
        this.$refs.window.open()
      },
      search() {
        this.query.page = 1
        this.getData(this.query)
      },
      clearSearch(val) {
        this.query.jobNumber = null
        this.getData(this.query)
      }
    },
    mounted() {
      // this.getData(this.query)
    },
    watch: {
      'groupId'() {
        this.query.groupId = this.groupId
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .table-wrapper
    padding: 0
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
  .choose-wrapper
    width: 100%
    height: 100%
    p
      padding: 5px
    .textarea
      box-sizing: border-box
      padding: 5px
</style>
