<template>
  <eui-layout :regions="REGIONS">
    <eui-table
        class="center-wrap"
        slot="center"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
    </eui-table>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import {PILE} from './record.config'
  export default {
    name: 'pile-controller',
    _meta: {
      path: '/pile/controller',
      title: '充电桩管理'
    },
    components: {
      EuiLayout,
      EuiTable,
    },
    data() {
      return {
        helper,
        REGIONS: PILE.REGIONS,
        query: {
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'pileNo', label: '充电桩编号'},
            {prop: 'pileTypeName', label: '充电桩类型'},
            {prop: 'pileNum', label: '充电枪数量'},
            {prop: 'pileVersion', label: '桩软件版本号'},
            {prop: 'operatorCode', label: '运营商编码'}
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
      getData(query) {
        api.pileinfo.paged(query).then(data => {
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

