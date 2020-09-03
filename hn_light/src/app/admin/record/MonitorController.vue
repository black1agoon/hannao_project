<template>
  <eui-layout :regions="REGIONS">
    <div slot="north" class="">
      <super-search-tags
          class="searchtabs"
          @emptySearch="emptySearch"
          :tags="tags">
      </super-search-tags>
      <super-search
          ref="supersearch"
          :options="searchOptions"
          @tagsChange="tags => {this.tags = tags}"
          slot="right"
          @superSearch="superSearch"
          style="float: right;margin: 6px 20px 0 0">
      </super-search>
    </div>
    <eui-table
        class="center-wrap"
        slot="center"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
    </eui-table>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {MONITOR} from './record.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import SuperSearchTags from '@/components/common/tools/SuperSearchTags'
  export default {
    name: 'monitor-controller',
    _meta: {
      path: '/monitor/controller',
      title: '环境监测'
    },
    components: {
      EuiLayout,
      EuiTable,
      SuperSearch,
      SuperSearchTags
    },
    data() {
      return {
        helper,
        REGIONS: MONITOR.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10,
          number: null,
          startTime: null,
          endTime: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'number', label: '编号', minWidth: 150},
            {prop: 'createTime', label: '采集日期', minWidth: 150},
            {prop: 'minimumWindDirection', label: '最小风向值', minWidth: 100},
            {prop: 'maximumWindDirection', label: '最大风向值', minWidth: 100},
            {prop: 'averageWindDirection', label: '平均风向值', minWidth: 100},
            {prop: 'minimumWindSpeed', label: '最小风速值', minWidth: 100},
            {prop: 'maximumWindSpeed', label: '最大风速值', minWidth: 100},
            {prop: 'averageWindSpeed', label: '平均风速值', minWidth: 100},
            {prop: 'temprature', label: '大气温度(C=℃)', minWidth: 150},
            {prop: 'relativeHumidity', label: '大气相对湿度(P=%RH)', minWidth: 150},
            {prop: 'pressure', label: '大气气压(H = hPa)', minWidth: 150},
            {prop: 'rainfall', label: '降雨量', minWidth: 150},
            {prop: 'solarRadiation', label: '太阳辐射(w/m2)', minWidth: 150},
            {prop: 'uvIntensity', label: '紫外强度(紫外等级I)', minWidth: 150},
            {prop: 'noise', label: '噪声(dB)', minWidth: 100},
            {prop: 'pm2', label: 'PM2.5颗粒物浓度(ug/m3)', minWidth: 180},
            {prop: 'pm10', label: 'PM10颗粒物浓度(ug/m3)', minWidth: 180}
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
        tags: [],
        searchOptions: {
          width: 700,
          fieldSearch: [{
            placeholder: '编号',
            value: 'number'
          }, {
            placeholder: '开始时间',
            value: 'startTime',
            type: 'datetime'
          }, {
            placeholder: '结束时间',
            value: 'endTime',
            type: 'datetime'
          }],
          conditionSearch: []
        }
      }
    },
    methods: {
      getData(query) {
        api.monitor.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      superSearch(searchinfo) {
        this.query.number = searchinfo.number
        this.query.startTime = searchinfo.startTime
        this.query.endTime = searchinfo.endTime
        this.reload()
      },
      emptySearch(tagname) {
        this.$refs.supersearch.emptyValue(tagname)
      },
      reload() {
        this.getData(this.query)
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .searchtabs
    float: left
    margin-left: 20px
</style>

