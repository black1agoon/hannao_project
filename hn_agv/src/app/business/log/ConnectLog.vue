<template>
  <eui-layout :regions="REGIONS">
    <super-search
        class="super-search"
        ref="search"
        v-model="query"
        :options="SEARCH_OPTIONS"
        @search="superSearch"
        slot="north">
    </super-search>
    <eui-table
        class="center-wrap"
        slot="south"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions">
    </eui-table>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {CONNECT} from './log.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'connect-log',
    _meta: {
      path: '/connect/log',
      title: '链接日志管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      SuperSearch
    },
    data() {
      return {
        helper,
        REGIONS: CONNECT.REGIONS,
        buttons: helper.getMainButtons(),
        SEARCH_OPTIONS: CONNECT.SEARCH_OPTIONS,
        query: {
          page: 1,
          pageSize: 10,
          vehicleNo: null, // 车辆编号
          position: null, // 车辆接入时的位置
          connectTimeStart: null, // 接入时间点开始
          connectTimeEnd: null, // 接入时间点结束
          batteryStart: null, // 接入时的电量
          batteryEnd: null // 结束时的电量
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'vehicleNo', label: '车辆编号', minWidth: 100},
            {prop: 'position', label: '车辆接入时的位置', minWidth: 100},
            {prop: 'battery', label: '车辆接入时的电量', minWidth: 100},
            {prop: 'connectTime', label: '车辆接入的时间', minWidth: 100}
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
      getData() {
        api.log.connectPaged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.vehicleNo = searchinfo.vehicleNo
        this.query.position = searchinfo.position
        this.query.connectTimeStart = searchinfo.connectTimeStart
        this.query.connectTimeEnd = searchinfo.connectTimeEnd
        this.query.batteryStart = searchinfo.batteryStart
        this.query.batteryEnd = searchinfo.batteryEnd
        this.getData()
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
  .super-search
    height: 40px
    line-height: 40px
    padding-left: 30px
</style>

