<template>
  <div>
    <eui-table
      class="eui-table"
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
    </eui-table>
  </div>
</template>

<script>
  import api from '@/api'
  import EuiTable from '@/components/common/form/EuiTable'
  export default {
    name: 'station-show-table',
    components: {
      EuiTable
    },
    data() {
      return {
        query: {
          workshopId: null,
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'stationName', label: '机台名称', width: 150},
            {prop: 'stationCode', label: '机台编码', width: 150},
            {prop: 'workshopName', label: '所属车间', width: 150},
            {prop: 'stationTypeName', label: '机台类型', width: 150},
            {prop: 'modelNameName', label: '模型名称', width: 150},
            {prop: 'barCode', label: '条形码', minWidth: 150}
          ],
          rowClick: (row, event, column) => {
          },
          rowDblclick: (row, event) => {
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
        api.station.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      reload(data) {
        this.query.workshopId = data.id
        this.getData(this.query)
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .eui-table
    height: 100%
    position absolute
</style>
