<template>
  <div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="form clearfix" ref="form" :model="formdata" label-width="110px"
               style="padding: 20px">
        <el-col :sm="item.sm || 8" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name">
            <div class="value" v-if="item.value === 'disposeUserName'">{{formdata.disposeUserName}}</div>
            <div class="value" v-else>{{formdata[item.value]}}</div>
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
      name: '报修部门:',
      value: 'departmentName'
    }, {
      name: '报修人:',
      value: 'username'
    }, {
      name: '报修时间:',
      value: 'maintainTimeStr'
    }, {
      name: '报修原因:',
      value: 'maintainReason'
    }, {
      name: '维修内容:',
      value: 'details'
    }, {
      name: '维修花费:',
      value: 'expenditure'
    }, {
      name: '维修状态:',
      value: 'maintainStatusName'
    }, {
      name: '维修处理人:',
      value: 'disposeUserName'
    }, {
      name: '维修备注:',
      value: 'remark',
      sm: 24
    }
  ]
  export default {
    name: 'asset-transfer-detail-window',
    components: {
      EuiTable,
      EuiWindow
    },
    data() {
      return {
        helper,
        user: this.$store.state.user,
        forminfo: DETAIL_INFO,
        formdata: {},
        windowOptions: {
          title: '维修单',
          width: '1000px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'assetCode', label: '资产编码', width: 150},
            {prop: 'assetName', label: '资产名称', width: 150},
            {prop: 'typename', label: '资产类别', width: 150},
            {prop: 'addTimeStr', label: '入库时间', width: 150},
            {prop: 'departmentName', label: '使用部门', width: 150},
            {prop: 'username', label: '使用人', width: 150}
          ]
        },
        tableRowsSelect: []
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.formdata = row
          this.tableOptions.data = row.assetDtoList
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