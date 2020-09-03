<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-layout :regions="REGIONS">
      <div class="input-wrapper" slot="north">
        <span class="label">礼品名称:</span>
        <eui-input
          class="input"
          v-model="query.name">
        </eui-input>
        <span class="label">收件人名字:</span>
        <eui-input
          class="input"
          v-model="query.deliveryName">
        </eui-input>
        <span class="label">收件人电话:</span>
        <eui-input
          class="input"
          v-model="query.deliveryMobile">
        </eui-input>
        <el-button
          size="mini"
          type="primary"
          @click="search">
          <i class="btn-icon fa search"></i>搜索
        </el-button>
        <el-button
          size="mini"
          @click="reset">
          <i class="btn-icon fa search"></i>清空
        </el-button>
      </div>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
      </eui-table>
    </eui-layout>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiInput from '@/components/common/form/EuiInput'
  const REGIONS = [{
    center: {}
  }, {
    north: {},
    center: {}
  }]
  export default {
    name: 'mss-credit-goods-list-window',
    components: {
      EuiLayout,
      EuiWindow,
      EuiTable,
      EuiInput
    },
    props: {
    },
    data() {
      return {
        REGIONS: REGIONS[0],
        query: {
          name: null,
          goodsId: null,
          deliveryName: null,
          deliveryMobile: null,
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '兑换记录',
          width: '80%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'goodsName', label: '名称', minWidth: 150},
            {prop: 'goodsIcon', label: '图标', width: 100, type: 'picture'},
            {prop: 'goodsCount', label: '兑换数量', width: 100},
            {prop: 'goodsCredit', label: '需要的积分', minWidth: 150},
            {prop: 'createTime', label: '兑换时间', minWidth: 150},
            {prop: 'deliveryName', label: '收件人名字', minWidth: 150},
            {prop: 'deliveryMobile', label: '收件人电话', minWidth: 100},
            {prop: 'deliveryAddress', label: '收件人地址', minWidth: 200}
          ],
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData()
          }
        }
      }
    },
    methods: {
      getData() {
        api.mssCreditGoods.allPage(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      open(id) {
        if (id) {
          this.query.goodsId = id
          this.query.name = null
          this.query.deliveryName = null
          this.query.deliveryMobile = null
          this.query.page = 1
          this.REGIONS = REGIONS[0]
        } else {
          this.query.page = 1
          this.query.goodsId = null
          this.REGIONS = REGIONS[1]
        }
        this.getData()
        this.$refs.window.open()
      },
      search() {
        this.query.page = 1
        this.getData()
      },
      reset() {
        this.query.name = null
        this.query.deliveryName = null
        this.query.deliveryMobile = null
        this.query.page = 1
        this.getData()
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog
    height: 70%
  /deep/ .el-dialog__body
    padding: 0 20px
    height: calc(100% - 40px)
    overflow-y: auto
  .input-wrapper
    margin-top: 6px
    .label
      font-size: 14px
      margin: 0 5px
    .input
      width: 150px
</style>
