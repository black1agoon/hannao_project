<template>
  <eui-layout :regions="REGIONS">
    <div style="line-height: 30px" slot="north">
      <el-radio-group class="meeting-status" size="mini" v-model="query.status" @change="radioChange">
        <el-radio-button label="null">所有</el-radio-button>
        <el-radio-button label="0">未完成</el-radio-button>
        <el-radio-button label="1">进行中</el-radio-button>
        <el-radio-button label="2">完成</el-radio-button>
        <el-radio-button label="4">过期</el-radio-button>
      </el-radio-group>
      <super-search
          class="search"
          :options="searchOptions"
          v-model="query"
          @appendClick="appendClick"
          @search="search">
      </super-search>
    </div>
    <eui-table
        slot="center"
        ref="table"
        :showIndex="false"
        :showSelection="false"
        :highlight-current-row="false"
        :options="tableOptions">
    </eui-table>
    <organization-user-window ref="user" @selectUser="selectUser">
    </organization-user-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import {EMPMEETING} from '../meeting.config'
  import OrganizationUserWindow from './common/OrganizationUserWindow'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'emp-meeting',
    props: {
      roomId: {
        type: String,
        default: null
      }
    },
    components: {
      EuiTable,
      EuiLayout,
      OrganizationUserWindow,
      SuperSearch
    },
    data() {
      return {
        REGIONS: EMPMEETING.REGIONS,
        query: {
          agencyId: this.$store.state.agencyId,
          empId: null,
          empName: null,
          page: 1,
          pageSize: 20,
          status: null,
          roomId: null,
          stateDate: null,
          endDate: null
        },
        searchOptions: EMPMEETING.SEARCH_OPTIONS,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'date', label: '日期'},
            {prop: 'theme', label: '会议主题'},
            {prop: 'startTime', label: '开始时间'},
            {prop: 'endTime', label: '结束时间'}
          ],
          rowDblclick: (row, event) => {
            row.id = row.meetingId
            this.$emit('meetingClick', {...row})
          },
          objectSpanMethod: ({ row, column, rowIndex, columnIndex }) => {
            if (columnIndex < 1) {
              for (let i = 0; i < this.OrderIndexArr.length; i++) {
                let element = this.OrderIndexArr[i]
                for (let j = 0; j < element.length; j++) {
                  let item = element[j]  // 0,1    3,4,5
                  if (rowIndex === item) {
                    if (j === 0) {
                      return {
                        rowspan: element.length,
                        colspan: 1
                      }
                    } else if (j !== 0) {
                      return {
                        rowspan: 0,
                        colspan: 0
                      }
                    }
                  }
                }
              }
            }
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getEmpData()
          }
        }
      }
    },
    methods: {
      getOrderNumber(tableData) {
        this.OrderIndexArr = []
        let OrderObj = {}
        tableData.forEach((element, index) => {
          element.rowIndex = index
          if (OrderObj[element.date]) {
            OrderObj[element.date].push(index)
          } else {
            OrderObj[element.date] = []
            OrderObj[element.date].push(index)
          }
        })
        // 将数组长度大于1的值 存储到this.OrderIndexArr（也就是需要合并的项）
        for (let k in OrderObj) {
          if (OrderObj[k].length > 1) {
            // console.log(OrderObj[k])
            this.OrderIndexArr.push(OrderObj[k])
          }
        }
      },
      getEmpData() {
        this.$nextTick(() => {
          // this.query.status = this.query.status === -1 ? null : this.query.status
          this.query.roomId = this.roomId
          api.meetingAdmin.getEmpMeeting(this.query).then(data => {
            this.tableOptions.data = data.records
            this.tableOptions.total = data.total
            this.getOrderNumber(this.tableOptions.data)
          })
        })
      },
      radioChange() {
        this.getEmpData()
      },
      selectUser(rows, from) {
        if (from === 'empName') {
          this.query.empName = rows[0].name
          this.query.empId = rows[0].id
        }
      },
      reload() {
        this.getEmpData()
      },
      search(searchinfo) {
        this.query.status = searchinfo.status
        this.query.startDate = searchinfo.startDate
        this.query.endDate = searchinfo.endDate
        this.query.theme = searchinfo.theme
        this.reload()
      },
      appendClick(value) {
        let funs = {
          empName: () => {
            this.$refs.user.open('empName', [this.query.empId])
          }
        }
        funs[value].call(this)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .meeting-status
    margin: 6px 0 6px 20px
  .input-wrapper
    display: inline-block
    margin-left: 30px
    .label
      font-size: 14px
      margin: 0 5px
    .select
      vertical-align: middle
      width: 250px
  .search
    float: right
    margin: 6px 20px 0 0
</style>