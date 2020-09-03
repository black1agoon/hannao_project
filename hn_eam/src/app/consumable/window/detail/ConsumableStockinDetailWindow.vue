<template>
  <div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="form clearfix" ref="form" :model="formdata" label-width="110px"
               style="padding: 20px">
        <el-col :sm="item.sm || 8" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name">
            <div class="value">{{formdata[item.value]}}</div>
          </el-form-item>
        </el-col>
      </el-form>
      <eui-table
          class="table"
          ref="table"
          :showIndex="false"
          :showSelection="false"
          :showPagination="false"
          :highlight-current-row="false"
          :options="tableOptions">
      </eui-table>
      <div slot="btns">
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
  </div>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import helper from '@/app/app.helpers'
  const DETAIL_INFO = [
    {
      name: '入库单号:',
      value: 'stockinCode'
    }, {
      name: '单据日期:',
      value: 'createTime'
    }, {
      name: '单据状态:',
      value: 'stockinStatusExplain',
    }, {
      name: '入库仓库:',
      value: 'warehouseName'
    }, {
      name: '经办人:',
      value: 'createUserName'
    }, {
      name: '入库日期:',
      value: 'stockinTimeStr'
    }, {
      name: '领用备注:',
      value: 'remark',
      sm: 16
    }, {
      name: '金额合计:',
      value: 'amount'
    }
  ]
  export default {
    name: 'consumable-stockin-detail-window',
    components: {
      EuiTable,
      EuiWindow
    },
    data() {
      return {
        helper,
        forminfo: DETAIL_INFO,
        formdata: {},
        windowOptions: {
          title: '入库管理查看',
          width: '1000px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'consumableCode', label: '物料编码'},
            {prop: 'consumableName', label: '物料名称'},
            {prop: 'consumableTypeName', label: '物料分类'},
            {prop: 'brand', label: '品牌'},
            {prop: 'model', label: '规格型号'},
            {prop: 'price', label: '单价'},
            {prop: 'quantity', label: '数量'},
            {prop: 'totalPrice', label: '总金额'}
          ]
        }
      }
    },
    methods: {
      open(row) {
        if (row) {
          console.log(row)
          this.formdata = row
          this.tableOptions.data = row.stockinConsumableDtoList
          this.$refs.window.open()
        }
      },
      cancel() {
        this.$refs.window.cancel()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .value
    line-height: 32px
    margin-left: 10px
  .table
    min-height: 300px
    /deep/ .el-table
      .cell
        line-height: 30px !important
</style>