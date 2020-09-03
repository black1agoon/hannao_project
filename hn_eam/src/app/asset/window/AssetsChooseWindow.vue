<template>
  <div>
    <eui-window ref="window" :options="windowOptions">
      <div class="search-wrapper">
        <eui-input
            class="input"
            v-model="query.assetCodeOrName"
            appendicon="el-icon-search"
            :clearable="true"
            @appendClick="reload"
            @clear="reload"
            placeholder="输入资产编码或名称搜索">
        </eui-input>
      </div>
      <eui-table
          class="table"
          ref="table"
          :showIndex="false"
          :showSelection="true"
          :highlight-current-row="false"
          :options="tableOptions"
          @reloadTable="tableOptions.reload"
          @handleSelectionChange="tableOptions.handleSelectionChange">
      </eui-table>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
  </div>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiInput from '@/components/common/form/EuiInput'
  import api from '@/api'
  export default {
    name: 'assets-choose-window',
    components: {
      EuiWindow,
      EuiTable,
      EuiInput
    },
    props: {
      searchType: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        query: {
          agencyId: this.$store.state.agencyId,
          assetIds: [],
          page: 1,
          pageSize: 10,
          searchType: this.searchType,
          assetCodeOrName: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'assetCode', label: '资产编码', width: 150},
            {prop: 'assetName', label: '资产名称', width: 150},
            {prop: 'typename', label: '资产类别', width: 150},
            {prop: 'addTimeStr', label: '入库时间', width: 150},
            {prop: 'departmentName', label: '使用部门', width: 150},
            {prop: 'username', label: '使用人', width: 150}
          ],
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          },
          handleSelectionChange: val => {
            // this.tableRowsSelect = val.map(v => v.id)
            this.tableRowsSelect = val
          }
        },
        windowOptions: {
          title: '选择资产',
          width: '1000px'
        },
        tableRowsSelect: []
      }
    },
    methods: {
      getData(query) {
        api.assetController.pagedByType(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      open(assetIds) {
        this.query.assetIds = assetIds
        this.getData(this.query)
        this.$refs.window.open()
      },
      cancel() {
        this.$refs.window.cancel()
      },
      sure() {
        this.$emit('selectRows', this.tableRowsSelect)
        this.cancel()
      },
      reload() {
        this.getData(this.query)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.search-wrapper
  height: 40px
  line-height: 40px
  .input
    margin-left: 20px
    width: 350px
.table
  height: 550px
  /deep/ .el-table
    .cell
      line-height: 30px !important
</style>