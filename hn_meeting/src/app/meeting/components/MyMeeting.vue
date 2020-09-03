<template>
  <eui-layout :regions="REGIONS">
    <template slot="north">
      <el-radio-group class="meeting-status"  size="mini" v-model="query.status" @change="radioChange">
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
          @search="search">
      </super-search>
    </template>
    <eui-table
        slot="center"
        ref="table"
        :showIndex="false"
        :showSelection="false"
        :highlight-current-row="false"
        :options="tableOptions">
    </eui-table>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import {MYMEETING} from '../meeting.config'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'my-meeting',
    props: {
      roomId: {
        type: String,
        default: null
      }
    },
    components: {
      EuiTable,
      EuiLayout,
      SuperSearch
    },
    data() {
      return {
        REGIONS: MYMEETING.REGIONS,
        query: {
          page: 1,
          pageSize: 20,
          status: null,
          roomId: null,
          startDate: null,
          endDate: null,
          theme: null
        },
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
          objectSpanMethod: ({row, column, rowIndex, columnIndex}) => {
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
            this.getMyData()
          }
        },
        OrderIndexArr: [],
        searchOptions: MYMEETING.SEARCH_OPTIONS
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
      getMyData() {
        this.$nextTick(() => {
          this.query.roomId = this.roomId
          api.meetingCalendar.getMyMeeting(this.query).then(data => {
            this.tableOptions.data = data.records
            this.tableOptions.total = data.total
          })
        })
      },
      radioChange() {
        this.reload()
      },
      reload() {
        this.getMyData()
      },
      search(searchinfo) {
        this.query.status = searchinfo.status
        this.query.startDate = searchinfo.startDate
        this.query.endDate = searchinfo.endDate
        this.query.theme = searchinfo.theme
        this.reload()
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .meeting-status
    margin: 6px 0 6px 20px
  .search
    float: right
    margin: 6px 20px 0 0
</style>