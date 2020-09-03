<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      <super-search
          :options="searchOptions"
          v-model="query"
          @appendClick="appendClick"
          slot="right"
          @search="superSearch">
      </super-search>
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
    <meeting-period-window ref="window" @reload="tableOptions.reload">
    </meeting-period-window>
    <organization-user-window ref="user" @selectUser="selectUser">
    </organization-user-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {ROOM} from './meeting.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import MeetingPeriodWindow from './window/MeetingPeriodWindow'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import OrganizationUserWindow from './components/common/OrganizationUserWindow'

  export default {
    name: 'meeting-period',
    _meta: {
      path: '/meeting/period',
      title: '周期会议管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      MeetingPeriodWindow,
      SuperSearch,
      OrganizationUserWindow
    },
    data() {
      return {
        helper,
        REGIONS: ROOM.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          endDate: null, //
          meetingPattern: null, //
          page: 1, //
          pageSize: 20, //
          promoterId: null,
          promoterName: null,
          roomId: null, //
          startDate: null, //
          status: null, //
          theme: null, //
          type: null, //
          agencyId: this.$store.state.agencyId
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'theme', label: '会议主题'},
            {prop: 'typeValue', label: '会议类型'},
            {prop: 'roomName', label: '会议室名称'},
            {prop: 'statusValue', label: '会议状态'},
            {prop: 'promoterName', label: '发起人'},
            {prop: 'patternValue', label: '会议重复模式'},
            {prop: 'startDate', label: '重复开始日期'},
            {prop: 'endDate', label: '重复结束日期'}
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
        },
        searchOptions: {
          width: 700,
          fieldSearch: {
            theme: {
              placeholder: '会议主题'
            },
            startDate: {
              placeholder: '开始时间',
              type: 'date'
            },
            endDate: {
              placeholder: '结束时间',
              type: 'date'
            }
          },
          conditionSearch: {
            roomId: {
              placeholder: '会议室',
              type: 'select',
              options: []
            },
            status: {
              placeholder: '会议状态',
              type: 'select',
              options: [{
                label: '正常',
                value: '0'
              }, {
                label: '结束',
                value: '1'
              }, {
                label: '取消',
                value: '2'
              }]
            },
            type: {
              placeholder: '会议类型',
              type: 'select',
              options: [{
                label: '部门会议',
                value: '0'
              }, {
                label: '公司会议',
                value: '1'
              }, {
                label: '项目会议',
                value: '2'
              }, {
                label: '其他会议',
                value: '3'
              }]
            },
            meetingPattern: {
              placeholder: '会议重复模式',
              type: 'select',
              options: [{
                label: '每日重复',
                value: '0'
              }, {
                label: '每周重复',
                value: '1'
              }, {
                label: '每月重复',
                value: '2'
              }]
            },
            promoterName: {
              placeholder: '发起人',
              id: 'promoterId',
              appendicon: 'fa fa-search',
              clearable: true,
              readonly: true,
            }
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
            api.meetingPeriod.get(row.id).then(data => {
              this.$refs.window.open(data)
            })
          },
          btnDelete: (row) => {
            this.$confirm(`是否取消周期会议:${row.theme}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.meetingPeriod.cancel(row.id).then(() => {
                this.$message({
                  message: '取消成功!',
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
      reload() {
        this.getData(this.query)
      },
      getData(query) {
        api.meetingPeriod.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getRoomData() {
        api.meetingRoom.paged({
          agencyId: this.$store.state.agencyId,
          page: 1,
          pageSize: 999
        }).then(data => {
          if (data.records && data.records.length > 0) {
            this.searchOptions.conditionSearch.roomId.options = data.records.map(r => ({
              label: r.name,
              value: r.id
            }))
          }
        })
      },
      appendClick(value) {
        if (value === 'promoterName') {
          this.$refs.user.open('promoterName', [this.query.promoterId])
        }
      },
      selectUser(rows, from) {
        if (from === 'promoterName') {
          this.query.promoterName = rows[0].name
          this.query.promoterId = rows[0].id
        }
      },
      superSearch(searchinfo) {
        this.query.roomId = searchinfo.roomId
        this.query.promoterId = searchinfo.promoterId
        this.query.meetingPattern = searchinfo.meetingPattern
        this.query.startDate = searchinfo.startDate
        this.query.endDate = searchinfo.endDate
        this.query.theme = searchinfo.theme
        this.query.type = searchinfo.type
        this.query.status = searchinfo.status
        this.reload()
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
        vm.getRoomData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

