<template>
  <eui-layout :regions="region">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tableButtons.concat(subTableButtons))"
        @click="onBtnClick">
      <super-search
          ref="search"
          v-model="query"
          :options="search_options"
          @search="superSearch"
          slot="right"
          style="margin-right: 35px;float: right">
      </super-search>
    </main-toolbar>
    <eui-table
        slot="center"
        ref="table"
        :showPagination="true"
        :highlight-current-row="true"
        :options="tableOptions">
      <el-table-column slot="periodPoint" label="循环周期" align="center" minWidth="200">
        <template slot-scope="scope">
          {{getPeriodPoint(scope.row)}}
        </template>
      </el-table-column>
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
    <el-tabs slot="south"
             type="card"
             size="small"
             value="first"
             style="height: 100%">
      <el-tab-pane label="消毒任务列表" name="first">
        <eui-table
            ref="table"
            :showPagination="true"
            :highlight-current-row="true"
            :options="subTableOptions">
          <el-table-column label="操作" align="center" minWidth="200" fixed="right">
            <template slot-scope="scope">
              <el-button
                  v-for="(btn, index) in helper.getSubTableButtons(buttons, subTableButtons)"
                  size="mini"
                  type="text"
                  :key="index"
                  @click="onBtnClick(btn.btnKey, scope.row)">
                <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
              </el-button>
            </template>
          </el-table-column>
        </eui-table>
      </el-tab-pane>
    </el-tabs>
    <disinfect-task-window ref="window"
                           @reload="tableOptions.reload">
    </disinfect-task-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import {DISINFECT} from './disinfect.config'
  import helper from '@/app/app.helpers'
  import DisinfectTaskWindow from './window/DisinfectTaskWindow'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'disinfect-task-controller',
    _meta: {
      path: '/disinfecttask/controller',
      title: '消毒任务管理'
    },
    components: {
      EuiTable,
      EuiLayout,
      MainToolbar,
      DisinfectTaskWindow,
      SuperSearch
    },
    data() {
      return {
        helper,
        region: DISINFECT.regions,
        buttons: helper.getMainButtons(),
        tableButtons: [],
        subTableButtons: ['btnStop'],
        query: {
          page: 1,
          pageSize: 10,
          taskType: null,
          taskStartTimeStart: null,
          taskStartTimeEnd: null
        },
        subQuery: {
          taskId: null,
          page: 1,
          pageSize: 10
        },
        search_options: DISINFECT.search_options,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'taskTypeName', label: '任务类别', minWidth: 100},
            {prop: 'taskStartTime', label: '任务开始时间', minWidth: 100},
            {prop: 'duration', label: '持续时间(分钟)', minWidth: 100},
            {prop: 'periodPoint', slot: true},
          ],
          rowClick: (row) => {
            this.subQuery.taskId = row.id
            this.getSubTableData()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'rows' ? val : this.query.pageSize
            this.getTableData()
          }
        },
        subTableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'taskTypeName', label: '任务类别', minWidth: 100},
            {prop: 'executeStatusName', label: '状态', minWidth: 100},
            {prop: 'duration', label: '持续时间(分钟)', minWidth: 100},
            {prop: 'startTime', label: '开始时间', minWidth: 100},
            {prop: 'endTime', label: '结束时间', minWidth: 100},
          ],
          rowClick: (row) => {
            // this.getSubTableData()
          },
          reload: (name, val) => {
            this.subQuery.page = name === 'page' ? val : this.subQuery.page
            this.subQuery.pageSize = name === 'rows' ? val : this.subQuery.pageSize
            this.getSubTableData()
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
            this.$confirm(`是否确定删除该任务？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.disinfect.delete(row.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getTableData()
              })
            }).catch(() => {
            })
          },
          btnStop: (row) => {
            if (row.executeStatus === '3') {
              this.$message({
                message: '该任务已终止!',
                type: 'warning'
              })
              return
            }
            this.$confirm(`是否确定终止该任务？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.tasklist.stop(row.id).then(() => {
                this.$message({
                  message: '终止成功!',
                  type: 'success'
                })
                this.getTableData()
                this.subTableOptions.data = []
                this.subTableOptions.total = 0
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getTableData() {
        api.disinfect.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getSubTableData() {
        api.tasklist.paged(this.subQuery).then(data => {
          this.subTableOptions.data = data.records
          this.subTableOptions.total = data.total
        })
      },
      getPeriodPoint(row) {
        let week = {
          '1': '星期一',
          '2': '星期二',
          '3': '星期三',
          '4': '星期四',
          '5': '星期五',
          '6': '星期六',
          '7': '星期日'
        }
        if (row.cyclePeriod === 0) {
          return '单次'
        } else if (row.cyclePeriod === 1) { //  && row.periodPoint === ''
          return '每日'
        } else if (row.cyclePeriod === 7) {
          let fmt = row.periodPoint
          // return row.periodPoint.split(',').map(key => (week[key])).join(',')
          for (let k in week) {
            if (new RegExp(`(${k})`).test(fmt)) {
              fmt = fmt.replace(RegExp.$1, week[k])
            }
          }
          return fmt
        }
      },
      superSearch(searchinfo) {
        this.query.page = 1
        for (let key in searchinfo) {
          this.query[key] = searchinfo[key]
        }
        this.getTableData()
      }
    },
    mounted() {
      this.getTableData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-tabs__content
    height: 100%
    .el-tab-pane
      height: calc(100% - 31px)
</style>