<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tableButtons.concat(SubTableButtons))"
        @click="onBtnClick">
    </main-toolbar>
    <eui-table
        class="center-wrap"
        slot="center"
        ref="table"
        :highlight-current-row="true"
        :options="tableOptions">
      <el-table-column label="操作" align="center" minWidth="200" fixed="right">
        <template slot-scope="scope">
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
    <eui-table
        class="center-wrap"
        slot="south"
        ref="table"
        :highlight-current-row="false"
        :options="subTableOptions">
      <el-table-column label="是否主表" align="center" minWidth="200">
        <template slot-scope="scope">
          <i v-show="scope.row.main === 0" class="icon el-icon-check check"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" minWidth="200" fixed="right">
        <template slot-scope="scope">
          <el-button
              v-for="(btn, index) in helper.getSubTableButtons(buttons, SubTableButtons)"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
            <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
    <floor-window ref="window" @reload="tableOptions.reload">
    </floor-window>
    <table-choose-window ref="addTable" @subReload="getSubData">
    </table-choose-window>
    <set-table-num-window ref="setNum" @subReload="getSubData">
    </set-table-num-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {FLOOR} from './floor.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import FloorWindow from './window/FloorWindow'
  import TableChooseWindow from '../common/TableChooseWindow'
  import SetTableNumWindow from './window/SetTableNumWindow'
  export default {
    name: 'floor-controller',
    _meta: {
      path: '/floor/controller',
      title: '楼层信息'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      FloorWindow,
      TableChooseWindow,
      SetTableNumWindow
    },
    data() {
      return {
        helper,
        REGIONS: FLOOR.REGIONS,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnSetTable'],
        SubTableButtons: ['btnSetMain', 'btnSetRelease', 'btnSetNumber'],
        query: {
          page: 1,
          pageSize: 20,
          name: null
        },
        subQuery: {
          page: 1,
          pageSize: 10,
          state: 2,
          floorNumber: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '楼层名称'},
            {prop: 'floorNumber', label: '楼层编号'}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            this.subQuery.floorNumber = row.floorNumber
            this.getSubData()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData()
          }
        },
        subTableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '表名'},
            {prop: 'ratio', label: '倍率'},
            {prop: 'typeName', label: '类型'},
            {prop: 'number', label: '排序', sortable: true}
          ],
          reload: (name, val) => {
            this.subQuery.page = name === 'page' ? val : this.subQuery.page
            this.subQuery.pageSize = name === 'pageSize' ? val : this.subQuery.pageSize
            this.getSubData()
          }
        }
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            this.$refs.window.open(row)
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除:${row.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.floor.delete(row.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData()
              })
            }).catch(() => {
            })
          },
          btnSetTable(row) {
            this.$refs.addTable.open(row)
          },
          btnSetMain(row) {
            this.$confirm(`是否设置:${row.name} 为主表？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.floorNumber.setMain({
                floorNumber: this.subQuery.floorNumber,
                number: row.number,
                tableId: row.id,
                type: row.type,
                main: 0
              }).then(() => {
                this.$message({
                  message: '设置成功!',
                  type: 'success'
                })
                this.getSubData()
              })
            }).catch(() => {
            })
          },
          btnSetNumber(row) {
            this.$refs.setNum.open(row, this.subQuery.floorNumber)
          },
          btnSetRelease() {
            this.$confirm(`是否解除表:${row.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.floorNumber.cancel({
                floorNumber: this.subQuery.floorNumber,
                number: row.number,
                tableId: row.id,
                type: row.type
              }).then(() => {
                this.$message({
                  message: '解除成功!',
                  type: 'success'
                })
                this.getSubData()
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getData() {
        api.floor.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getSubData() {
        api.floor.tablePaged(this.subQuery).then(data => {
          this.subTableOptions.data = data.records
          this.subTableOptions.total = data.total
        })
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .icon
    display: inline-block
    margin-right: 10px
    line-height: 20px
    color: #ffffff
    width: 20px
    height: 20px
    text-align: center
    border-radius: 50%
    &.check
      background: #67c23a
</style>

