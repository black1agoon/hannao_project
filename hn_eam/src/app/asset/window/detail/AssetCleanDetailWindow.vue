<template>
  <div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="form clearfix" ref="form"  label-width="110px"
               style="padding: 20px">
        <el-col :sm="item.sm || 8" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name">
            <div class="value" v-if="item.value !== 'cleanPictures'">{{formdata[item.value]}}</div>
            <div v-else class="pic-wrap">
              <img class="pic" v-for="(pic, idx) in splitPictures" :key="idx" :src="helper.getImgUrl(pic)">
            </div>
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
      name: '清理处理人:',
      value: 'cleanUserName'
    }, {
      name: '清理时间:',
      value: 'cleanTimeStr'
    }, {
      name: '清理原因:',
      value: 'cleanReason'
    }, {
      name: '清理备注:',
      value: 'remark',
      sm: 24
    }, {
      name: '图片:',
      value: 'cleanPictures',
      sm: 24
    }
  ]
  export default {
    name: 'asset-clean-detail-window',
    components: {
      EuiTable,
      EuiWindow
    },
    computed: {
      splitPictures() {
        return this.formdata.cleanPictures ? this.formdata.cleanPictures.split(',') : []
      }
    },
    data() {
      return {
        helper,
        user: this.$store.state.user,
        forminfo: DETAIL_INFO,
        formdata: {},
        windowOptions: {
          title: '清理单',
          width: '1000px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'assetCode', label: '资产编码'},
            {prop: 'assetName', label: '资产名称'},
            {prop: 'typename', label: '资产类别'},
            {prop: 'addTimeStr', label: '入库时间'}
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
  .pic-wrap
    .pic
      width: 100px
      height: 100px
      margin: 0 5px
      display: inline-block
      border: 1px solid #eee
  .table
    min-height: 300px
    /deep/ .el-table
      .cell
        line-height: 30px !important
</style>