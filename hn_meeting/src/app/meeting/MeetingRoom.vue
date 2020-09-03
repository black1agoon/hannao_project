<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
    </main-toolbar>
    <eui-table
        class="center-wrap"
        slot="center"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
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
    <meeting-room-window ref="window" @reload="tableOptions.reload">
    </meeting-room-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {ROOM} from './meeting.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import MeetingRoomWindow from './window/MeetingRoomWindow'
  export default {
    name: 'meeting-room',
    _meta: {
      path: '/meeting/room',
      title: '会议室管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      MeetingRoomWindow
    },
    data() {
      return {
        helper,
        REGIONS: ROOM.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 20,
          name: null,
          projection: null,
          agencyId: this.$store.state.agencyId
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '会议室名称'},
            {prop: 'capacity', label: '可容纳人数'},
            {prop: 'projectionValue', label: '是否有投影'},
            {prop: 'barCode', label: '设备条码'}
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
            this.$confirm(`是否删除:${row.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.meetingRoom.delete(row.id).then(() => {
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
          btnHandlers[btnKey].call(this, row)
        }
      },
      getData(query) {
        api.meetingRoom.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

