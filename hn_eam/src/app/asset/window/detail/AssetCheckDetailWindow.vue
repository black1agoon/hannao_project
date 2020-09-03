<template>
  <div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="form clearfix" ref="form" :model="formdata" label-width="130px"
               style="padding: 20px">
        <el-col :sm="item.sm || 8" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name">
            <div class="value" v-if="item.value === 'cleanUserName'">{{formdata.cleanUserName}}</div>
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
  import api from '@/api'
  const DETAIL_INFO = [
    {
      name: '盘点单号:',
      value: 'taskCode'
    }, {
      name: '实际完成盘点时间:',
      value: 'endTimeStr'
    }, {
      name: '盘点任务名称:',
      value: 'taskName'
    }, {
      name: '盘点执行人:',
      value: 'checkUserName'
    }, {
      name: '盘点备注:',
      value: 'remark',
      sm: 24
    }
  ]
  export default {
    name: 'asset-check-detail-window',
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
          title: '盘点单',
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
            {prop: 'checkResultName', label: '盘点结果', width: 150},
            {prop: 'remark', label: '盘点备注', width: 150}
          ]
        },
        tableRowsSelect: []
      }
    },
    methods: {
      open(id) {
        api.assetCheck.get(id).then(data => {
          this.formdata = data ? data : {}
          this.tableOptions.data = data.checkListDtoList.map(row => {
            row.assetCode = row.agencyAssetDto.assetCode
            row.assetName = row.agencyAssetDto.assetName
            row.typename = row.agencyAssetDto.typename
            row.addTimeStr = row.agencyAssetDto.addTimeStr
            return row
          })
          this.$refs.window.open()
        })
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