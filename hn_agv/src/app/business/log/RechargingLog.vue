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
  import {RECHARGING} from './log.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'recharging-log',
    _meta: {
      path: '/recharging/log',
      title: '充电记录管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      SuperSearch
    },
    data() {
      return {
        helper,
        REGIONS: RECHARGING.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10,
          vehicleNo: null,   // 充电车辆编号
          pilePoint: null,   // 充电桩编号
          rechargingPercentStart: null,  // 开始时的百分比
          rechargingPercentEnd: null,
          rechargeTimeStart: null,    // 充电时间开始
          rechargeTimeEnd: null,
          endTimeStart: null,  // 充电结束时间开始
          endTimeEnd: null
        },
        SEARCH_OPTIONS: RECHARGING.SEARCH_OPTIONS,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'vehicleNo', label: '充电车辆编号', minWidth: 100},
            {prop: 'pilePoint', label: '充电桩编号', minWidth: 150},
            {prop: 'rechargeTime', label: '充电时间', minWidth: 150},
            {prop: 'rechargingPercent', label: '充电结束电量百分比(%)', minWidth: 100}
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
        api.log.rechargingPaged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.vehicleNo = searchinfo.vehicleNo
        this.query.pilePoint = searchinfo.pilePoint
        this.query.rechargingPercentStart = searchinfo.rechargingPercentStart
        this.query.rechargingPercentEnd = searchinfo.rechargingPercentEnd
        this.query.rechargeTimeStart = searchinfo.rechargeTimeStart
        this.query.rechargeTimeEnd = searchinfo.rechargeTimeEnd
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

