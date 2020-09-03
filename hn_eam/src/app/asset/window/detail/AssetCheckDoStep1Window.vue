<template>
  <eui-window ref="window"
              :options="windowOptions">
    <div class="asset-choose">
      <el-button  class="check"
                  type="primary"
                  size="mini"
                  :disabled="tableRowsSelect.length === 0"
                  @click="doCheck(tableRowsSelect)"
                  round>
        批量盘点
      </el-button>
      <span class="chosenum">已选{{tableRowsSelect.length}}条</span>
    </div>
    <eui-table
        class="table"
        ref="table"
        :showIndex="false"
        :showSelection="true"
        :showPagination="false"
        :highlight-current-row="false"
        :options="tableOptions"
        @handleSelectionChange="tableOptions.handleSelectionChange">
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              @click="doCheck([scope.row])">
            <i class="btn-icon fa fa-hand-pointer-o"></i>执行盘点
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
    <div slot="btns">
      <el-button type="primary" size="small" @click="sure">确定</el-button>
      <el-button size="small" @click="cancel">关闭</el-button>
    </div>
    <asset-check-do-step2-window
        @cancel="cancel"
        ref="dostep2">
    </asset-check-do-step2-window>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import AssetCheckDoStep2Window from './AssetCheckDoStep2Window'
  export default {
    name: 'asset-check-do-step1-window',
    props: {
      organizationData: {
        type: Object,
        default: () => ({})
      },
      positionData: {
        type: Array,
        default: () => []
      }
    },
    components: {
      EuiTable,
      EuiWindow,
      AssetCheckDoStep2Window
    },
    data() {
      return {
        helper,
        user: this.$store.state.user,
        windowOptions: {
          title: '执行盘点任务',
          width: '1000px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'checkResultName', label: '盘点状态'},
            {prop: 'assetCode', label: '资产编码', width: 150},
            {prop: 'assetName', label: '资产名称'},
            {prop: 'typename', label: '资产类别'},
            {prop: 'addTimeStr', label: '入库时间'},
            {prop: 'departmentName', label: '使用部门'},
            {prop: 'username', label: '使用人'}
          ],
          rowClassName: ({row, rowIndex}) => {
            row.index = rowIndex
          },
          handleSelectionChange: val => {
            this.tableRowsSelect = val
          }
        },
        tableRowsSelect: [],
        checkData: []
      }
    },
    methods: {
      open(idlist) {
        api.assetCheck.getCheckTask(idlist).then(data => {
          if (data && data.length > 0) {
            this.checkData = data
            this.tableOptions.data = data.map(d => {
              d.agencyAssetDto.checkResultName = d.checkResultName
              return d.agencyAssetDto
            })
          } else {
            this.tableOptions.data = []
            this.checkData = []
          }
          this.$refs.window.open()
        })
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.formdata.agencyId = this.$store.state.agencyId
            if (!this.formdata.id) {
              api.assetReceive.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.$refs.window.cancel()
              })
            } else {
              api.assetReceive.update(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.$refs.window.cancel()
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
        this.$emit('reload')
      },
      choose() {
        this.$refs.assetsChoose.open(this.formdata.assetIds)
      },
      doCheck(rowlist) {
        this.$refs.dostep2.open(rowlist.reduce((result, current) => {
          result.push(this.checkData[current.index])
          return result
        }, []))
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .asset-choose
    position: relative
    width: 100%
    height: 38px
    .check
      margin: 5px 0 5px 10px
    .chosenum
      position: absolute
      right: 10px
      top: 5px
      font-size: 12px
      font-weight: bold
      margin-right: 10px
      line-height: 28px

  .table
    min-height: 400px
    /deep/ .el-table
      .cell
        line-height: 30px !important
</style>