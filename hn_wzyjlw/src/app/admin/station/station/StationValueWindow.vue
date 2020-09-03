<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-layout :regions="REGIONS">
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
      </eui-table>
    </eui-layout>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  const REGIONS = {
    center: {}
  }
  export default {
    name: 'station-value-window',
    components: {
      EuiLayout,
      EuiWindow,
      EuiTable
    },
    props: {
    },
    data() {
      return {
        REGIONS,
        query: {
          stationId: null,
          page: 1,
          pageSize: 10
        },
        checkedNode: {},
        windowOptions: {
          title: '设备状态'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'modelDataName', label: '模型数据名称', width: 200},
            {prop: 'valueName', label: '状态', width: 200},
            {prop: 'memo', label: '备注', minWidth: 300}
          ],
          rowClick: (row, event, column) => {
            this.checkedNode = {...row}
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
        api.stationValue.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      open(row) {
        this.query.stationId = row.id
        this.getData(this.query)
        this.$refs.window.open()
      },
      search() {
        this.query.page = 1
        this.getData(this.query)
      },
      clearSearch(val) {
        this.getData(this.query)
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog
    height: 70%
  /deep/ .el-dialog__body
    padding: 0 20px
    height: calc(100% - 78px)
    overflow-y: auto

  .searchbox
    width: 30%
    margin: 6px 0 0 10px
    /deep/ .el-input__inner
      height: 30px
</style>
