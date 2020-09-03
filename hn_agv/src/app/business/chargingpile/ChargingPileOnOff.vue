<template>
  <eui-layout :regions="REGIONS">
    <div slot="north" class="input-wrapper">
      <span class="label">充电桩编号:</span>
      <eui-input
          class="select"
          v-model="query.chargerNo">
      </eui-input>
      <span class="label">状态:</span>
      <eui-input
          class="input"
          v-model="query.detectState">
      </eui-input>
      <span class="label">检测时间点开始:</span>
      <eui-input
          class="input"
          type="datetime"
          v-model="query.detectTimeStart">
      </eui-input>
      <span class="label">检测时间点结束:</span>
      <eui-input
          class="input"
          type="datetime"
          v-model="query.detectTimeEnd">
      </eui-input>
      <el-button class="search"
                 type="primary"
                 size="mini"
                 @click="search">
        搜索
      </el-button>
      <el-button class="search"
                 size="mini"
                 @click="reset">
        重置
      </el-button>
    </div>
    <eui-table
        class="center-wrap"
        slot="south"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions">
    </eui-table>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {ONOFF} from './pile.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiInput from '@/components/common/form/EuiInput'
  export default {
    name: 'charging-pile-on-off',
    _meta: {
      path: '/chargingpile/onoffdetect',
      title: '充电桩上下线管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      EuiInput
    },
    data() {
      return {
        helper,
        REGIONS: ONOFF.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10,
          chargerNo: null,
          detectState: null,
          detectTimeStart: null,
          detectTimeEnd: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'chargerNo', label: '充电桩编号', minWidth: 150},
            {prop: 'detectState', label: '状态', minWidth: 100},
            {prop: 'detectTime', label: '检测时间', minWidth: 100},
            {prop: 'memo', label: '备注', minWidth: 150}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
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
      getData() {
        api.pileOnoff.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      search() {
        this.getData()
      },
      reset() {
        this.query.page = 1
        this.query.chargerNo = null
        this.query.detectState = null
        this.query.detectTimeStart = null
        this.query.detectTimeEnd = null
        this.getData()
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .input-wrapper
    line-height: 40px
    .label
      font-size: 13px
      margin: 0 5px
    .select, .input
      width: 200px !important
    .search
      margin-left: 20px
</style>

