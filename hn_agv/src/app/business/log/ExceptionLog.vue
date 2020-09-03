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
  import {EXCEPTION} from './log.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'exception-log',
    _meta: {
      path: '/exception/log',
      title: '异常日志管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      SuperSearch
    },
    data() {
      return {
        helper,
        REGIONS: EXCEPTION.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10,
          createTimeStart: null,  // 创建时间开始
          createTimeEnd: null,   // 创建时间结束
          exception: null,      // 异常信息
          from: null,           // 异常来源
          handler: null         // 处理器
        },
        SEARCH_OPTIONS: EXCEPTION.SEARCH_OPTIONS,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'exception', label: '异常信息', minWidth: 150},
            {prop: 'from', label: '异常来源', minWidth: 150},
            {prop: 'handler', label: '处理器', minWidth: 100},
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
            this.getData(this.query)
          }
        }
      }
    },
    methods: {
      getData() {
        api.log.exceptionPaged(this.query).then(data => {
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

