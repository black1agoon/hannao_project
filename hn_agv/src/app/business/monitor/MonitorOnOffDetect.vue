<template>
  <eui-layout :regions="REGIONS">
    <div slot="north" class="input-wrapper">
      <span class="label">检测对象类型:</span>
      <eui-input
          class="select"
          type="select"
          :options="searchOptions.objectType"
          v-model="query.objectType">
      </eui-input>
      <span class="label">检测开始时间:</span>
      <eui-input
          class="input"
          type="datetime"
          v-model="query.detectTimeStart">
      </eui-input>
      <span class="label">检测结束时间:</span>
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
    </div>
    <charts-view slot="south" ref="chart" :options="chartsOptions">
    </charts-view>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {ONOFF} from './monitor.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiInput from '@/components/common/form/EuiInput'
  import ChartsView from '@/components/views/ChartsView'
  import {formatDate} from '../../../assets/js/tools'

  export default {
    name: 'monitor-on-off-detect',
    _meta: {
      path: '/monitor/onoffdetect',
      title: '设备上下线管理'
    },
    components: {
      EuiLayout,
      EuiInput,
      ChartsView
    },
    data() {
      let date = new Date()
      return {
        helper,
        REGIONS: ONOFF.REGIONS,
        buttons: helper.getMainButtons(),
        chartsOptions: ONOFF.CHARTS,
        query: {
          detectStatus: null,    // 检查对象的状态
          detectTimeEnd: formatDate(date, 'yyyy-MM-dd hh:mm:ss'),   // 检查时间结束
          detectTimeStart: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`, // 检查时间开始
          objectNo: null,    // 检测对象的编号
          objectType: 'VEHILCE',  // 检测对象的类型
          properties: null   // 检测对象的属性
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'objectNo', label: '检测对象编号', minWidth: 150},
            {prop: 'objectType', label: '检测对象类型', minWidth: 150},
            {prop: 'detectStatus', label: '状态', minWidth: 100},
            {prop: 'detectTime', label: '检测时间', minWidth: 100}
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
        },
        searchOptions: {
          objectType: [
            {
              label: 'AGV车辆',
              value: 'VEHILCE'
            }, {
              label: '下料库位',
              value: 'STORAGE_UL'
            }, {
              label: '上料库位',
              value: 'STORAGE_LD'
            }, {
              label: '充电桩',
              value: 'PILE'
            }
          ]
        }
      }
    },
    methods: {
      getData() {
        api.monitorOnoff.paged(this.query).then(data => {
          this.chartsOptions.xAxis[0].data = []
          this.chartsOptions.series = []
          if (data && data.length > 0) {
            this.chartsOptions.xAxis[0].data = data[0].list.map(item => item.detectTime.substr(0, 16))
            for (let i = 0; i < data.length; i++) {
              this.chartsOptions.series.push({
                name: data[i].objectNo,
                symbol: 'circle',
                smooth: false,
                step: 'middle',
                type: 'line',
                barWidth: 22,
                data: data[i].list.map(item => item.detectStatus)
              })
            }
          }
        })
      },
      search() {
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
      font-size: 14px
      margin: 0 5px
    .select, .input
      width: 200px !important
    .search
      margin-left: 20px
</style>

