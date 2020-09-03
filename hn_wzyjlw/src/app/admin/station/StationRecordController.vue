<template>
  <div>
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons([])"
        @click="onBtnClick">
        <eui-search
          :formOptions="SEARCH_OPTIONS"
          :forminfo="SEARCH_INFO"
          :formdata.sync="SEARCH_DATA"
          :formfunctions="SEARCH_FUNS"
          @openSpinnerChose="searchFunctions('openSpinnerChose')"
          @search="(keyword) => {searchFunctions('search', keyword)}">
        </eui-search>
      </main-toolbar>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
      </eui-table>
    </eui-layout>
    <spinner-chose-window ref="spinnerchose">
    </spinner-chose-window>
  </div>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiSearch from '@/components/common/form/EuiSearch'
  import {RECORD} from './station.config'
  import SpinnerChoseWindow from '@/app/admin/common/SpinnerChoseWindow'
  export default {
    name: 'station-record-controller',
    _meta: {
      path: '/station/record',
      title: '机台记录'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch,
      SpinnerChoseWindow
    },
    computed: {},
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        REGIONS: RECORD.REGIONS,
        formdata: {},
        formOptions: {...RECORD.FORM_OPTIONS},
        SEARCH_INFO: RECORD.SEARCH_INFO,
        SEARCH_DATA: RECORD.SEARCH_DATA,
        SEARCH_OPTIONS: RECORD.SEARCH_OPTIONS,
        SEARCH_FUNS: RECORD.SEARCH_FUNS,
        query: {
          page: 1,
          pageSize: 10,
          stationCode: null,
          startTime: null,
          endTime: null,
          spinnerId: null,
          state: null,
          orderNumber: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'orderNumber', label: '订单编号', width: 150},
            {prop: 'stationName', label: '机台名称', width: 100},
            {prop: 'taskNumber', label: '任务单号', width: 120},
            {prop: 'stationNumber', label: '任务号', width: 120},
            {prop: 'articleNumber', label: '货号', width: 100},
            {prop: 'articleNumber1', label: '款号', width: 100},
            {prop: 'modelName', label: '模型名称', width: 100},
            {prop: 'needleCode', label: '单双针', width: 80},
            {prop: 'stockingsCode', label: '袜型', width: 100},
            {prop: 'number', label: '数量', width: 80},
            {prop: 'stateMean', label: '状态', width: 80},
            {prop: 'realName', label: '挡车工', minWidth: 80},
            {prop: 'createTime', label: '创建时间', minWidth: 100}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
          },
          rowDblclick: (row, event) => {
            this.$refs.window.open()
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
        api.stationRecord.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {}
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, arg)
        }
      },
      searchFunctions(method, keyword) {
        let funs = {
          openSpinnerChose: () => {
            this.$refs.spinnerchose.open('search')
          },
          search: (keyword) => {
            this.query.page = 1
            this.query.stationName = keyword.stationName
            this.query.stationCode = keyword.stationCode
            this.query.startTime = keyword.startTime
            this.query.endTime = keyword.endTime
            this.query.spinnerId = keyword.spinnerId
            this.query.state = keyword.state
            this.query.orderNumber = keyword.orderNumber
            this.getData(this.query)
          }
        }
        funs[method].call(this, keyword)
      }
    },
    mounted() {
      this.getData(this.query)
    },
    created() {
      this.$on('spinnerchose', (node, from) => {
        // console.log(node)
        if (from === 'form') {
        } else if (from === 'search') {
          this.SEARCH_DATA.spinnerId = node.id
          this.SEARCH_DATA.spinnerName = node.jobNumber
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
