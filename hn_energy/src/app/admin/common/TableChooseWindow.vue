<template>
  <eui-window ref="window"
              :options="windowOptions">
    <eui-layout :regions="regions">
      <eui-table class="table"
                 slot="center"
                 ref="table"
                 :showSelection="true"
                 :showIndex="false"
                 :highlight-current-row="false"
                 :options="tableOptions">
      </eui-table>
      <div slot="east" class="chooses">
        <div class="title">已选择电表{{multipleSelectionAll.length}}个</div>
        <div class="choose-wrapper">
          <div class="choose"
               v-for="(choose, index) in multipleSelectionAll"
               :key="index">
            <div class="name">{{choose.name}}</div>
            <eui-input type="number"
                       class="eui-input"
                       v-model="choose.number"
                       placeholder="排序">
            </eui-input>
            <span class="close fa fa-close" @click="deleteUser(choose.id)"></span>
          </div>
        </div>
      </div>
    </eui-layout>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import api from '@/api'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiInput from '@/components/common/form/EuiInput'
  export default {
    name: 'table-choose-window',
    components: {
      EuiInput,
      EuiWindow,
      EuiTable,
      EuiLayout
    },
    computed: {
    },
    data() {
      return {
        regions: {
          middle: {
            center: {},
            east: {
              style: {
                width: 200
              }
            }
          }
        },
        floorNumber: null,
        windowOptions: {
          title: '添加表',
          width: '700px'
        },
        query: {
          page: 1,
          pageSize: 10,
          state: 1
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '表名'},
            {prop: 'ratio', label: '倍率'},
            {prop: 'typeName', label: '类型'}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            this.$refs.table.callByName('toggleRowSelection', row)
          },
          handleSelectionChange: val => {
            this.multipleSelection = val
            this.$nextTick(() => {
              this.changePageCoreRecordData()
            })
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData().then(() => {
              this.setSelectRow()
            })
          }
        },
        multipleSelectionAll: [],   // 所有选中的数据包含跨页数据
        multipleSelection: [],
      }
    },
    methods: {
      open(row) {
        this.getData().then(() => {
          this.floorNumber = row.floorNumber
          this.multipleSelectionAll = []
          this.multipleSelection = []
          this.$refs.window.open()
        })
      },
      sure() {
        api.floorNumber.choose({
          chooseDetails: this.multipleSelectionAll.map(c => ({
            tableId: c.id,
            type: c.type,
            number: c.number
          })),
          floorNumber: this.floorNumber
        }).then(() => {
          this.$message({
            message: '设置成功!',
            type: 'success'
          })
          this.$emit('subReload')
          this.cancel()
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getData() {
        return api.floor.tablePaged(this.query).then(data => {
          if (data.records && data.records.length > 0) {
            this.tableOptions.data = data.records
            this.tableOptions.total = data.total
          } else {
            this.tableOptions.data = []
            this.tableOptions.total = data.total
          }
        })
      },
      changePageCoreRecordData() {
        let selectAllIds = []
        let selectIds = []
        let noSelectIds = []

        this.multipleSelectionAll.forEach(row => {
          selectAllIds.push(row.id)      // ----------->获取<上一次><所有选中>的id,selectAllIds
        })

        this.multipleSelection.forEach(row => {
          selectIds.push(row.id)         // ----------->  所有<当前页选中>的id
          if (selectAllIds.indexOf(row.id) < 0) {    // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
            this.multipleSelectionAll.push(row)
          }
        })

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
        // if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        //   return
        // }
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
      deleteUser(id) {
        this.multipleSelectionAll = this.multipleSelectionAll.filter(choose => choose.id !== id)
        this.setSelectRow()
      }
    },
    mounted() {
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .table
    height: 500px
  .chooses
    width: 100%
    height: 500px
    overflow-y: auto
    border-left: 1px solid #eee
    padding: 0 10px
    box-sizing: border-box
    .title
      font-weight: bold
      background: #ffffff
      border-bottom: 1px solid #eee
      padding-bottom: 5px
      padding-top: 10px
      position: fixed
    .choose-wrapper
      margin-top: 35px
      .choose
        display: flex
        margin: 5px 0
        .name
          width: 100px
          height: 30px
          line-height: 30px
        .eui-input
          width: 60px
          height: 30px
        .close
          width: 15px
          margin-left: 10px
          margin-top: 7px
          cursor: pointer
</style>