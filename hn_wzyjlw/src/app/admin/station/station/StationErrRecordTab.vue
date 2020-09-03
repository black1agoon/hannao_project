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
    name: 'station-err-record-tab',
    components: {
      EuiTable
    },
    props: {
    },
    data() {
      return {
        query: {
          stationCode: null,
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'orderNumber', label: '订单编号', width: 150},
            {prop: 'stationName', label: '机台名称', width: 100},
            {prop: 'taskNumber', label: '任务单号', width: 100},
            {prop: 'stationNumber', label: '任务号', width: 100},
            {prop: 'articleNumber', label: '货号', width: 100},
            {prop: 'articleNumber1', label: '款号', width: 100},
            {prop: 'modelName', label: '模型名称', width: 100},
            {prop: 'needleCode', label: '单双针', width: 80},
            {prop: 'stockingsCode', label: '袜型', width: 100},
            {prop: 'number', label: '数量', width: 80},
            {prop: 'state', label: '状态', width: 80},
            {prop: 'realName', label: '挡车工', width: 80},
            {prop: 'message', label: '消息', minWidth: 100},
            {prop: 'mean', label: '解释', minWidth: 200}
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
        api.stationErrRecord.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      reload(stationCode) {
        this.query.stationCode = stationCode
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
