<template>
  <div>
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      </main-toolbar>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <el-table-column label="是否可修改" width="100" align="center">
          <template slot-scope="scope">{{getChangeCN(scope.row.change)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="500" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-for="(btn, index) in helper.getTableButtons(buttons)"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
          </template>
        </el-table-column>
      </eui-table>
    </eui-layout>
    <scheduling-window ref="window" @reload="reload">
    </scheduling-window>
  </div>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiSearch from '@/components/common/form/EuiSearch'
  import SchedulingWindow from './scheduling/SchedulingWindow'
  import { CONTROLLER } from './scheduling.config'
  export default {
    name: 'scheduling-controller',
    _meta: {
      path: '/scheduling/controller',
      title: '班次'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch,
      SchedulingWindow
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        REGIONS: CONTROLLER.REGIONS,
        query: {
          name: null,
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '名称', width: 200},
            {prop: 'cycle', label: '周期(天)', width: 100},
            {prop: 'startDate', label: '起始日期', width: 200},
            {prop: 'createTime', label: '创建时间', width: 200}
          ],
          rowClick: (row, event, column) => {
          },
          rowDblclick: (row, event) => {
            this.$refs.window.open(row.id)
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
        api.scheduling.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (arg) => {
            this.$refs.window.open(arg.id)
          },
          btnDelete: (arg) => {
            this.$confirm(`是否删除:${arg.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.scheduling.delete(arg.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, arg)
        }
      },
      reload() {
        this.getData(this.query)
      },
      getChangeCN(val) {
        return val ? '是' : '否'
      }
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
