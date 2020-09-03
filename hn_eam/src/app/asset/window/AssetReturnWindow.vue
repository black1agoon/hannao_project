<template>
  <div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="form clearfix" ref="form" :model="formdata" label-width="110px" :rules="rules"
               style="padding: 20px">
        <el-col :sm="item.sm || 8" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <div class="input-item">
              <div class="explain">
                <el-tooltip popper-class="tooltip" v-show="item.explain" :content="item.explain"
                            placement="bottom-start" effect="light">
                  <div class="el-icon-question"></div>
                </el-tooltip>
              </div>
              <div class="input">
                <span v-if="item.value === 'disposeUserName'">{{formdata.disposeUserName}}</span>
                <eui-input v-else v-model="formdata[item.value]"
                           :type="item.type"
                           :readonly="item.readonly"
                           :placeholder="item.placeholder"
                           :options="formOptions[item.value]"
                           :autosize="item.autosize"
                           :disabled="item.disabled"
                           :unit="item.unit">
                </eui-input>
              </div>
              <div class="add" v-if="item.add" @click="addFunctions(item.value)">新增</div>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="asset-choose clearfix">
        <el-button class="button" size="mini" plain @click="choose">选择资产</el-button>
        <el-button :disabled="tableRowsSelect.length === 0" class="button" size="mini" plain @click="deleteChoose">删除选中</el-button>
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
      </eui-table>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
    <assets-choose-window ref="assetsChoose"
                          :searchType="3"
                          @selectRows="setSelectRows">
    </assets-choose-window>
  </div>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiTable from '@/components/common/form/EuiTable'
  import {RETURN} from '../asset.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import AssetsChooseWindow from './AssetsChooseWindow'
  export default {
    name: 'asset-return-window',
    props: {
      positionData: {
        type: Array,
        default: () => []
      }
    },
    components: {
      EuiTable,
      EuiInput,
      EuiWindow,
      AssetsChooseWindow
    },
    data() {
      return {
        helper,
        user: this.$store.state.user,
        forminfo: RETURN.FORM_INFO,
        formdata: {...RETURN.FORM_DATA},
        formOptions: Object.assign(RETURN.FORM_OPTIONS, {
          department: []
        }),
        rules: RETURN.RULES,
        windowOptions: {
          title: '资产退库',
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
          ],
          handleSelectionChange: val => {
            this.tableRowsSelect = val.map(v => v.id)
          }
        },
        tableRowsSelect: []
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.formdata = row
          this.formdata.assetIds = row.ectypeDtoList ? row.ectypeDtoList.map(ec => ec.assetId) : []
          this.tableOptions.data = row.ectypeDtoList ? row.ectypeDtoList.map(ec => {
            ec.id = ec.assetId
            return ec
          }) : []
          this.$refs.window.open()
        } else {
          this.$refs.window.open()
          // this.formdata = {...RECEIVE.FORM_DATA}
          this.tableOptions.data = []
          this.$nextTick(() => {
            this.$refs.form.resetFields()
            this.formdata = JSON.parse(JSON.stringify(RETURN.FORM_DATA))
            this.formdata.disposeUserName = this.user.name
            this.formdata.disposeUser = this.user.id
          })
        }
      },
      addFunctions(prop) {
        this.$emit('addFunctions', prop)
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.formdata.agencyId = this.$store.state.agencyId
            if (!this.formdata.id) {
              api.assetReturn.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.$refs.window.cancel()
              })
            } else {
              api.assetReturn.update(this.formdata).then(() => {
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
      },
      choose() {
        this.$refs.assetsChoose.open(this.formdata.assetIds)
      },
      deleteChoose() {
        this.tableRowsSelect.forEach(rowId => {
          this.tableOptions.data = this.tableOptions.data.filter(row => row.id !== rowId)
          this.formdata.assetIds = this.formdata.assetIds.filter(id => id !== rowId)
        })
      },
      setSelectRows(rows) {
        rows.forEach(row => {
          this.tableOptions.data.push(row)
          this.formdata.assetIds.push(row.id)
        })
      }
    },
    watch: {
      'positionData'() {
        this.formOptions.positionId = this.positionData && this.positionData.length > 0 ? this.positionData.map(p => ({
          label: p.positionName,
          value: p.id
        })) : []
        this.$forceUpdate()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .explain
    flex: none !important
  .input
    span
      margin-left: 10px
      line-height: 32px

  .asset-choose
    width: 100%
    .button
      margin: 0 10px 10px
    .chosenum
      font-size: 12px
      font-weight: bold
      margin-right: 10px
      display: inline-block
      float: right
      line-height: 28px

  .table
    min-height: 300px
    /deep/ .el-table
      .cell
        line-height: 30px !important
</style>