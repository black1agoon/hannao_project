<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
    </main-toolbar>
    <eui-table
        class="center-wrap"
        slot="south"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions">
      <el-table-column label="操作" align="center" minWidth="200" fixed="right">
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
    <activities-controller-window
        ref="window"
        @reload="tableOptions.reload">
    </activities-controller-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {PILE} from './pile.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import ActivitiesControllerWindow from './window/ChargingPileWindow'
  export default {
    name: 'charging-pile-controller',
    _meta: {
      path: '/chargingpile/controller',
      title: '充电桩管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      ActivitiesControllerWindow
    },
    data() {
      return {
        helper,
        REGIONS: PILE.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'num', label: '充电桩编号', minWidth: 150},
            {prop: 'point', label: '站点', minWidth: 100},
            {prop: 'seq', label: '排序', minWidth: 100},
            {prop: 'createTime', label: '创建时间', minWidth: 150}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
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
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            this.$refs.window.open(row)
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除:充电桩 ${row.num}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.pile.delete([row.id]).then(() => {
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
        api.pile.paged(this.query).then(data => {
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

