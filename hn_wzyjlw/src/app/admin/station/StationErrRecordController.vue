<template>
  <div>
    <eui-layout :regions="REGIONS" v-show="tableShow">
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
    <eui-layout :regions="REGIONS" v-show="!tableShow">
      <el-form slot="north" class="form clearfix" ref="form" label-width="80px">
        <el-col class="format-height" :sm="8">
          <el-form-item label="选择日期">
            <eui-input size="mini" type="date" v-model="contentform.date"></eui-input>
          </el-form-item>
        </el-col>
        <el-col class="format-height" :sm="12">
          <el-form-item label="选择机台">
            <eui-input size="mini"
                       :readonly="true"
                       appendicon="fa fa-search"
                       v-model="contentform.stationNames"
                       @appendClick="contentStation">
            </eui-input>
          </el-form-item>
        </el-col>
        <el-col class="format-height" :sm="4">
          <el-button type="primary" class="button" @click="contentSearch" size="mini">确定</el-button>
        </el-col>
      </el-form>
      <div class="center" slot="center">
       <station-time-line :data="contentData">
       </station-time-line>
      </div>
    </eui-layout>
    <div class="content-type">
      <span>显示形式:</span>
      <eui-input
        v-model="content"
        type="select"
        :options="contentOptions">
      </eui-input>
    </div>
    <spinner-chose-window ref="spinnerchose">
    </spinner-chose-window>
    <multiple-stations-chose-window ref="multiplestation">
    </multiple-stations-chose-window>
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
  import {ERROR} from './station.config'
  import SpinnerChoseWindow from '@/app/admin/common/SpinnerChoseWindow'
  import MultipleStationsChoseWindow from '@/app/admin/common/MultipleStationsChoseWindow'
  import StationTimeLine from './station/StationTimeLine'
  export default {
    name: 'station-err-record-controller',
    _meta: {
      path: '/station/errrecord',
      title: '机台异常记录'
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
      MultipleStationsChoseWindow,
      StationTimeLine
    },
    computed: {},
    data() {
      return {
        helper,
        tableShow: true,
        buttons: helper.getMainButtons(),
        REGIONS: ERROR.REGIONS,
        formdata: {},
        formOptions: {...ERROR.FORM_OPTIONS},
        SEARCH_INFO: ERROR.SEARCH_INFO,
        SEARCH_DATA: ERROR.SEARCH_DATA,
        SEARCH_OPTIONS: ERROR.SEARCH_OPTIONS,
        SEARCH_FUNS: ERROR.SEARCH_FUNS,
        query: {
          page: 1,
          pageSize: 10,
          stationCode: null,
          startTime: null,
          endTime: null,
          spinnerId: null,
          orderNumber: null
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
            {prop: 'realName', label: '挡车工', width: 80},
            {prop: 'message', label: '消息', width: 100},
            {prop: 'mean', label: '解释', minWidth: 100},
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
        },
        contentOptions: [{
          label: '表格',
          value: 0
        }, {
          label: '图表',
          value: 1
        }],
        content: 0,
        contentform: {
          date: null,
          stationIds: [],
          stationNames: null
        },
        contentData: null
      }
    },
    methods: {
      getData(query) {
        api.stationErrRecord.paged(query).then(data => {
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
            this.query.orderNumber = keyword.orderNumber
            this.getData(this.query)
          }
        }
        funs[method].call(this, keyword)
      },
      contentSearch() {
        api.stationErrRecord.errorDetail(this.contentform).then(data => {
          console.log(data)
          this.contentData = data
        })
      },
      contentStation() {
        this.$refs.multiplestation.open('content')
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
      this.$on('multiplestation', (from, list) => {
        if (from === 'content') {
          this.contentform.stationNames = list.map(l => l.stationCode).join(',')
          this.contentform.stationIds = list.map(l => l.id)
        } else if (from === 'search') {
        }
      })
    },
    watch: {
      'content'() {
        this.tableShow = this.content === 0
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.content-type
  position: absolute
  height: 36px
  right: 10px
  top: 12px
  span
    font-size: 14px
    color: #606266
    display inline-block
    padding-right: 12px
  /deep/ .el-input
    display: inline-block
    width: 150px
  /deep/ .el-select
    width: auto
.form
  display: block
  width: 800px
  height: 60px
  .el-form-item
    margin-top: 10px
  .format-height
    height: 35px
    .button
      margin: 16px 0 0 12px
.center
  width: 1200px
  /*margin: 0 auto*/

</style>
