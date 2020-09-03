<template>
  <eui-window ref="window"
              :options="windowOptions">
    <eui-table class="table"
        ref="table"
        :showSelection="true"
        :showIndex="false"
        :highlight-current-row="false"
        :options="tableOptions"
        :showPagination="false">
    </eui-table>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import api from '@/api'
  export default {
    name: 'light-select-window',
    components: {
      EuiWindow,
      EuiTable
    },
    computed: {
    },
    data() {
      return {
        windowOptions: {
          title: '新增周期设备',
          width: '50%'
        },
        query: {
          page: 1,
          pageSize: 999,
          periodStatus: 0
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '设备名'},
            {prop: 'code', label: '条码'},
            {prop: 'volume', label: '音量(%)'}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            this.$refs.table.callByName('toggleRowSelection', row)
          },
          handleSelectionChange: val => {
            this.tableRowsSelect = val.map(v => v.id)
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        },
        tableRowsSelect: []
      }
    },
    methods: {
      open() {
        this.getData().then(() => {
          this.$refs.window.open()
        })
      },
      sure() {
        api.music.setPeriodStatus({
          periodStatus: 1,
          idList: this.tableRowsSelect
        }).then(() => {
          this.$message({
            message: '新增路灯周期成功!',
            type: 'success'
          })
          this.$emit('reload')
          this.cancel()
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getData() {
        return api.music.paged(this.query).then(data => {
          if (data.records && data.records.length > 0) {
            this.tableOptions.data = data.records
          } else {
            this.tableOptions.data = []
          }
        })
      }
    },
    mounted() {
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>