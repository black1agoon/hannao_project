<template>
  <div>
    <eui-layout :regions="REGIONS">
      <!--<main-toolbar-->
        <!--slot="north"-->
        <!--:buttons="helper.getMainFilterButtons(buttons)"-->
        <!--@click="onBtnClick">-->
        <!--<eui-search-->
          <!--slot="prev"-->
          <!--:show="true"-->
          <!--:formOptions="SEARCH_OPTIONS"-->
          <!--:forminfo="SEARCH_INFO"-->
          <!--:formdata.sync="SEARCH_DATA"-->
          <!--:formfunctions="SEARCH_FUNS"-->
          <!--@openSpinnerChose="searchFunctions('openSpinnerChose')"-->
          <!--@search="(keyword) => {searchFunctions('search', keyword)}">-->
        <!--</eui-search>-->
      <!--</main-toolbar>-->
      <div class="btn-wrapper" slot="north">
        <eui-input
          size="mini"
          class="input"
          placeholder="请选择挡车工"
          appendicon="fa fa-search"
          :readonly="true"
          @appendClick="appendClick('spinnerName')"
          v-model="query.spinnerName">
        </eui-input>
        <eui-input
          size="mini"
          class="input"
          placeholder="请选择工位"
          appendicon="fa fa-search"
          :readonly="true"
          @appendClick="appendClick('stationName')"
          v-model="query.stationName">
        </eui-input>
        <eui-input
          size="mini"
          class="input"
          placeholder="请选择车间"
          appendicon="fa fa-search"
          :readonly="true"
          @appendClick="appendClick('workshopName')"
          v-model="query.workshopName">
        </eui-input>
        <eui-input
          size="mini"
          class="input"
          placeholder="请选择订单"
          appendicon="fa fa-search"
          :readonly="true"
          @appendClick="appendClick('workshopOrderName')"
          v-model="query.workshopOrderName">
        </eui-input>
        <el-date-picker
          size="mini"
          class="data-input"
          v-model="query.time"
          type="daterange"
          range-separator="-"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button
          class="button"
          round
          type="primary"
          size="mini"
          @click="onBtnClick('btnSearch')">
          搜索
        </el-button>
        <el-button
          class="button"
          round
          type="default"
          size="mini"
          @click="onBtnClick('btnReset')">
          重置
        </el-button>
        <el-button
          class="button"
          round
          type="primary"
          size="mini"
          @click="onBtnClick('btnExport')">
          导出
        </el-button>
      </div>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
      </eui-table>
    </eui-layout>
    <spinner-chose-window ref="spinnerchose">
    </spinner-chose-window>
    <station-chose-window ref="stationchose">
    </station-chose-window>
    <work-shop-chose-window ref="workshop">
    </work-shop-chose-window>
    <work-shop-order-chose-window ref="workshopOrder">
    </work-shop-order-chose-window>
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
  import {REPORT} from './station.config'
  import SpinnerChoseWindow from '@/app/admin/common/SpinnerChoseWindow'
  import StationChoseWindow from '@/app/admin/common/StationChoseWindow'
  import WorkShopChoseWindow from '@/app/admin/common/WorkShopChoseWindow'
  import WorkShopOrderChoseWindow from '@/app/admin/common/WorkShopOrderChoseWindow'
  import fileDownload from 'js-file-download'
  export default {
    name: 'station-report-controller',
    _meta: {
      path: '/station/report',
      title: '机台报工'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch,
      SpinnerChoseWindow,
      StationChoseWindow,
      WorkShopChoseWindow,
      WorkShopOrderChoseWindow
    },
    computed: {},
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        REGIONS: REPORT.REGIONS,
        formdata: {},
        formOptions: {...REPORT.FORM_OPTIONS},
        SEARCH_INFO: REPORT.SEARCH_INFO,
        SEARCH_DATA: REPORT.SEARCH_DATA,
        SEARCH_OPTIONS: REPORT.SEARCH_OPTIONS,
        SEARCH_FUNS: REPORT.SEARCH_FUNS,
        query: {
          page: 1,
          pageSize: 10,
          spinnerId: null, // 挡车工
          spinnerName: null, // 挡车工
          stationId: null, // 工位
          stationName: null, // 工位
          workshopId: null, // 车间
          workshopName: null, // 车间
          workshopOrderId: null, // 订单
          workshopOrderName: null, // 订单
          time: null,
          startDate: null,
          endDate: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'orderNumber', label: '订单编号', minWidth: 80},
            {prop: 'stationName', label: '机台名称', minWidth: 80, align: 'center'},
            {prop: 'stationCode', label: '机台编号', minWidth: 100, align: 'center'},
            {prop: 'spinnerName', label: '挡车工', minWidth: 100, align: 'center'},
            {prop: 'count', label: '计数', minWidth: 100, align: 'center'},
            {prop: 'number', label: '报工数', minWidth: 100, align: 'center'},
            {prop: 'createDate', label: '创建时间', minWidth: 100, align: 'center'}
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
        api.stationReport.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnSearch: () => {
            if (Array.isArray(this.query.time) && this.query.time.length === 2) {
              this.query.startDate = this.query.time[0]
              this.query.endDate = this.query.time[1]
            }
            this.getData(this.query)
          },
          btnReset: () => {
            this.query.spinnerId = null
            this.query.spinnerName = null
            this.query.stationId = null
            this.query.stationName = null
            this.query.workshopId = null
            this.query.workshopName = null
            this.query.workshopOrderId = null
            this.query.workshopOrderName = null
            this.query.time = null
            this.query.startDate = null
            this.query.endDate = null
            this.getData(this.query)
          },
          btnExport: () => {
            api.stationReport.exportReport(this.query).then(res => {
              let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
              fileDownload(blob, '报工信息.xls')
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, arg)
        }
      },
      appendClick(method, keyword) {
        let funs = {
          spinnerName: () => {
            this.$refs.spinnerchose.open('search')
          },
          stationName: () => {
            this.$refs.stationchose.open('search')
          },
          workshopName: () => {
            this.$refs.workshop.open('search')
          },
          workshopOrderName: () => {
            this.$refs.workshopOrder.open('search')
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
          this.query.spinnerId = node.id
          this.query.spinnerName = node.jobNumber
        }
      })
      this.$on('station', (node, from) => {
        // console.log(node)
        if (from === 'form') {
        } else if (from === 'search') {
          this.query.stationId = node.id
          this.query.stationName = node.stationName
        }
      })
      this.$on('workshop', (node, from) => {
        // console.log(node)
        if (from === 'form') {
        } else if (from === 'search') {
          this.query.workshopId = node.id
          this.query.workshopName = node.name
        }
      })
      this.$on('workshoporder', (node, from) => {
        // console.log(node)
        if (from === 'form') {
        } else if (from === 'search') {
          this.query.workshopOrderId = node.id
          this.query.workshopOrderName = node.orderNumber
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn-wrapper
    padding-left: 10px
    font-size: 14px
    display: flex
    margin-top: 6px
    .input
      width: 180px
      margin-right: 10px
    .data-input
      width: 230px
      margin-right: 10px
</style>
