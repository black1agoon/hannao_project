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
  import {CHARGE} from './record.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import SuperSearchTags from '@/components/common/tools/SuperSearchTags'
  export default {
    name: 'charge-record-controller',
    _meta: {
      path: '/charge/record',
      title: '充电记录'
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
        REGIONS: CHARGE.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10,
          cardNo: null,
          orderNo: null,
          startTime: null,
          endTime: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'orderNo', label: '订单号', minWidth: 120},
            {prop: 'cardNo', label: '卡号', minWidth: 120},
            {prop: 'gunNo', label: '枪号', minWidth: 100},
            {prop: 'chargeTypeName', label: '充电类型', minWidth: 100},
            {prop: 'startEdge', label: '充电开始电表行度', minWidth: 100},
            {prop: 'endEdge', label: '充电结束电表行度', minWidth: 100},
            {prop: 'totalCharge', label: '充电总电量', minWidth: 100},
            {prop: 'totalAmount', label: '充电总费用', minWidth: 100},
            {prop: 'stateName', label: '状态', minWidth: 100},
            {prop: 'startTime', label: '开始时间', minWidth: 150},
            {prop: 'endTime', label: '结束时间', minWidth: 150},
            {prop: 'whyEnd', label: '结束原因', minWidth: 100}
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
            placeholder: '订单号',
            value: 'orderNo'
          }, {
            placeholder: '卡号',
            value: 'cardNo'
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
        api.chargeRecord.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      superSearch(searchinfo) {
        this.query.cardNo = searchinfo.cardNo
        this.query.orderNo = searchinfo.orderNo
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

