<template>
  <eui-layout :regions="region">

    <super-search
        class="search"
        slot="north"
        ref="search"
        v-model="query"
        :options="search_options"
        @search="superSearch">
    </super-search>
    <eui-table
        slot="center"
        ref="table"
        :showPagination="true"
        :highlight-current-row="true"
        :options="tableOptions">
    </eui-table>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import { MASK } from './mask.config'
  import helper from '@/app/app.helpers'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'mask-history-data-controller',
    _meta: {
      path: '/maskhistorydata/controller',
      title: '流水历史数据'
    },
    components: {
      EuiTable,
      EuiLayout,
      SuperSearch
    },
    data() {
      return {
        helper,
        region: MASK.regions,
        buttons: helper.getMainButtons(),
        tableButtons: [],
        query: {
          page: 1,
          pageSize: 10,
          dataType: null, //
          startDate: null,
          startHour: null,
          endDate: null,
          endHour: null,
          maskName: null //
        },
        search_options: MASK.search_options,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'maskName', label: '口罩设备名称', minWidth: 100},
            {prop: 'equipmentName', label: '流水线名称', minWidth: 100},
            {prop: 'dataType', label: '数据类型', minWidth: 100},
            {prop: 'data', label: '合格数', minWidth: 100},
            {prop: 'day', label: '日期', minWidth: 100},
            {prop: 'hour', label: '小时', minWidth: 100}
          ],
          rowClick: (row) => {
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'rows' ? val : this.query.pageSize
            this.getTableData()
          }
        }
      }
    },
    methods: {
      getTableData() {
        api.maskcommon.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      superSearch(searchinfo) {
        this.query.page = 1
        for (let key in searchinfo) {
          this.query[key] = searchinfo[key]
        }
        this.getTableData()
      },
      getInputData() {
        api.maskcommon.getAllMaskEquipmentInfo().then(data => {
          this.search_options.conditionSearch.equipmentId.options = data.map(d => ({
            label: d.equipmentName,
            value: d.id
          }))
        })
      }
    },
    mounted() {
      this.getTableData()
      this.getInputData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .search
    line-height: 40px
    padding: 0 20px
</style>