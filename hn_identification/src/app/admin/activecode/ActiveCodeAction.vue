<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
        @click="onBtnClick">
    </main-toolbar>
    <eui-table
        class="center-wrap"
        slot="south"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions">
      <el-table-column
          slot="status"
          label="任务状态"
          :min-width="100"
          align="center">
        <template slot-scope="scope" >
          <el-switch :value="scope.row.status === 0"
                     @change="changeAble(scope.$index,scope.row)">
          </el-switch>
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
    <active-code-action-window
        ref="window"
        :input-options="inputOptions"
        @reload="tableOptions.reload">
    </active-code-action-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {ACTION} from './activecode.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import ActiveCodeActionWindow from './window/ActiveCodeActionWindow'
  export default {
    name: 'active-code-action',
    _meta: {
      path: '/activecode/action',
      title: '主动码设备行为'
    },
    components: {
      ActiveCodeActionWindow,
      EuiLayout,
      EuiTable,
      MainToolbar
    },
    data() {
      return {
        helper,
        REGIONS: ACTION.REGIONS,
        buttons: helper.getMainButtons(),
        tableButtons: [],
        query: {
          page: 1,
          pageSize: 10,
          code: null,
          action: null
        },
        SEARCH_OPTIONS: ACTION.SEARCH_OPTIONS,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'action', label: '主动码动作名称', minWidth: 100},
            {prop: 'code', label: '主动码动作编码', minWidth: 100},
            {prop: 'createTime', label: '创建时间', minWidth: 100}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData()
          }
        },
        inputOptions: {
          jobGroup: []
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
            this.$confirm(`是否删除: ${ACTION.WINDOW_NAME} ${row.action}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.activeCodeAction.delete([row.id]).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData()
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
        api.activeCodeAction.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
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

</style>

