<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)">
    </main-toolbar>
    <eui-table
        slot="center"
        ref="table"
        :showIndex="false"
        :highlight-current-row="false"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
    </eui-table>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import {LOG} from './setting.config'
  import config from '@/config'
  export default {
    name: 'operation-log-controller',
    _meta: {
      path: '/agency/operationlog',
      title: '操作记录'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      MainToolbar,
      EuiLayout
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        REGIONS: LOG.REGIONS,
        buttons: helper.getMainButtons(),
        tags: [],
        query: {
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'assetCode', label: '资产编码', align: 'center', fixed: 'left'},
            {prop: 'assetName', label: '资产名称', align: 'center', fixed: 'left'},
            {prop: 'typename', label: '资产类别', align: 'center'},
            {prop: 'beforeUserName', label: '之前使用人', align: 'center'},
            {prop: 'afterUserName', label: '之后使用人', align: 'center'},
            {prop: 'beforeStatusName', label: '之前状态', align: 'center'},
            {prop: 'afterStatusName', label: '之后状态', align: 'center'},
            {prop: 'operationTypeName', label: '操作类型名称', align: 'center'},
            {prop: 'createTime', label: '创建时间', align: 'center'}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          },
          handleSelectionChange: val => {
            this.tableRowsSelect = val.map(v => v.id)
          }
        }
      }
    },
    methods: {
      getData(query) {
        api.operationLog.paged(query).then(data => {
          this.tableOptions.data = data.records.map(r => {
            r.assetCode = r.dto.assetCode
            r.assetName = r.dto.assetName
            r.typename = r.dto.typename
            return r
          })
          this.tableOptions.total = data.total
        })
      },
      reload() {
        this.getData(this.query)
      }
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .table-handle
    float: right
    .chose
      float: right
      font-size: 12px
      color: #555555
      line-height: 28px
    .chose, .batch-operation
      float: right
      margin-right: 35px

</style>

