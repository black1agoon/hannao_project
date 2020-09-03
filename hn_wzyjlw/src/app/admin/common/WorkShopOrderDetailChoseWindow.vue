<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-layout :regions="REGIONS">
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
      </eui-table>
    </eui-layout>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  const REGIONS = {
    center: {}
  }
  export default {
    name: 'work-shop-order-detail-chose-window',
    components: {
      EuiLayout,
      EuiWindow,
      EuiTable
    },
    data() {
      return {
        REGIONS,
        index: 0,
        from: null,
        query: {
          page: 1,
          pageSize: 10,
          workshopOrderId: null
        },
        checkedNode: {},
        windowOptions: {
          title: '订单明细选择'
        },
        tableOptions: {
          data: [],
          total: 0,
          currentPage: 1,
          columns: [
            {prop: 'detailNumber', label: '明细编号', width: 150},
            {prop: 'articleNumber', label: '款号', width: 100},
            {prop: 'color', label: '颜色', width: 150},
            {prop: 'essentialColour', label: '主色', width: 80},
            {prop: 'measurement', label: '测量法', width: 80},
            {prop: 'measurementUnit', label: '计量单位', width: 70},
            {prop: 'needleCode', label: '单双针', width: 80},
            {prop: 'needleNumber', label: '针数', width: 80},
            {prop: 'pattern', label: '花型', width: 80},
            {prop: 'productType', label: '产品类型', width: 80},
            {prop: 'prospectusNumber', label: '计划数', width: 80},
            {prop: 'shipmentNumber', label: '出货数', width: 80},
            {prop: 'size', label: '尺寸', width: 80},
            {prop: 'stitchingMethod', label: '缝合方式', width: 80},
            {prop: 'stockingsCode', label: '适用袜型', width: 100},
            {prop: 'productionNumber', label: '已生产数', width: 100},
            {prop: 'distributionNumber', label: '已分配数', width: 100}
          ],
          rowClick: (row, event, column) => {
            this.checkedNode = {...row}
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
        api.workshopOrderDetail.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      sure() {
        if (this.checkedNode.id) {
          this.$parent.$emit('workshoporderdetail', this.checkedNode, this.from)
          this.$refs.window.cancel()
        } else {
          this.$refs.window.cancel()
        }
      },
      cancel() {
        this.$refs.window.cancel()
      },
      open(from = 'form', workshopOrderId = null) {
        this.from = from
        this.query.workshopOrderId = workshopOrderId
        this.query.page = 1
        this.tableOptions.currentPage = 1
        this.getData(this.query)
        this.$refs.window.open()
      }
    },
    mounted() {
      // this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  /deep/ .el-dialog__body
    padding: 0 20px
    height: calc(100% - 78px)
    overflow-y: auto

  .searchbox
    width: 30%
    margin: 6px 0 0 10px
    /deep/ .el-input__inner
      height: 30px
</style>
