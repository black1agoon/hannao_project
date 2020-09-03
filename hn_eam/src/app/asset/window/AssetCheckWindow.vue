<template>
  <div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="form clearfix" ref="form" :model="formdata" label-width="110px" :rules="rules" style="padding: 20px 20px 0 20px">
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
                <span v-if="item.value === 'cleanUserName'">{{formdata.cleanUserName}}</span>
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
            </div>
          </el-form-item>
        </el-col>
      </el-form>
      <el-radio-group size="mini" v-model="formdata.checkType">
        <el-radio-button label="1">全部盘点</el-radio-button>
        <el-radio-button label="2">抽样盘点</el-radio-button>
        <el-radio-button label="4">资产设定</el-radio-button>
        <!--<el-radio-button label="type5">全民盘点</el-radio-button>-->
      </el-radio-group>
      <div class="radio-content">
        <div class="item" v-show="formdata.checkType === '1'">
        </div>
        <div class="item" v-show="formdata.checkType === '2'">
          <el-form class="form clearfix" label-width="70px" :model="formdata" :rules="rules">
            <el-col :sm="8">
              <el-form-item label="比例" prop="percentage">
                <div class="input-item">
                  <div class="input">
                    <eui-input
                        type="number"
                        placeholder="请输入抽样占比"
                        unit="%"
                        v-model="formdata.percentage">
                    </eui-input>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="部门">
                <div class="input-item">
                  <div class="input">
                    <eui-input
                        type="treeselect"
                        :multiple="true"
                        placeholder="请选择部门"
                        :options="formOptions.departmentList"
                        v-model="formdata.departmentList">
                    </eui-input>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="资产分类">
                <div class="input-item">
                  <div class="input">
                    <eui-input
                        type="treeselect"
                        :multiple="true"
                        placeholder="请选择资产分类"
                        :options="formOptions.assetTypeList"
                        v-model="formdata.assetTypeList">
                    </eui-input>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="来源">
                <div class="input-item">
                  <div class="input">
                    <eui-input
                        type="select"
                        :multiple="true"
                        placeholder="请选择资产来源"
                        :options="formOptions.assetSourceList"
                        v-model="formdata.assetSourceList">
                    </eui-input>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :sm="8">
              <el-form-item label="资产状态">
                <div class="input-item">
                  <div class="input">
                    <eui-input
                        :multiple="true"
                        type="select"
                        placeholder="请选择资产状态"
                        :options="formOptions.assetStatusList"
                        v-model="formdata.assetStatusList">
                    </eui-input>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div class="item" v-show="formdata.checkType === '4'">
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
        </div>
        <!--<div class="item" v-show="formdata.checkType === '5'"></div>-->
      </div>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
    <assets-choose-window ref="assetsChoose"
                          :searchType="5"
                          @selectRows="setSelectRows">
    </assets-choose-window>
  </div>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiTable from '@/components/common/form/EuiTable'
  import {CHECK} from '../asset.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import AssetsChooseWindow from './AssetsChooseWindow'
  export default {
    name: 'asset-check-window',
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
        forminfo: CHECK.FORM_INFO,
        formdata: {...CHECK.FORM_DATA},
        formOptions: Object.assign(CHECK.FORM_OPTIONS, {}),
        rules: CHECK.RULES,
        windowOptions: {
          title: '',
          width: '1000px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'assetStatusName', label: '资产状态'},
            {prop: 'assetCode', label: '资产编码'},
            {prop: 'assetName', label: '资产名称'},
            {prop: 'typename', label: '资产类别'},
            {prop: 'addTimeStr', label: '入库时间'},
            {prop: 'brand', label: '品牌'},
            {prop: 'assetSource', label: '来源'},
            {prop: 'place', label: '渠道'}
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
        this.getInputData()
        if (row) {
          this.windowOptions.title = '编辑盘点单'
          this.formdata = row
          this.formdata.assetIds = row.checkListDtoList ? row.checkListDtoList.map(r => r.agencyAssetDto.id) : []
          this.tableOptions.data = row.checkListDtoList ? row.checkListDtoList.map(r => r.agencyAssetDto) : []
          this.$refs.window.open()
        } else {
          this.windowOptions.title = '新增盘点单'
          this.$refs.window.open()
          // this.formdata = {...RECEIVE.FORM_DATA}
          this.tableOptions.data = []
          this.$nextTick(() => {
            this.$refs.form.resetFields()
            this.formdata = JSON.parse(JSON.stringify(CHECK.FORM_DATA))
          })
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.formdata.agencyId = this.$store.state.agencyId
            this.formdata.department = this.formdata.departmentList
            this.formdata.assetType = this.formdata.assetTypeList
            this.formdata.assetStatus = this.formdata.assetStatusList
            this.formdata.assetSource = this.formdata.assetSourceList
            if (!this.formdata.id) {
              api.assetCheck.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.$refs.window.cancel()
              })
            } else {
              api.assetCheck.update(this.formdata).then(() => {
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
      },
      getInputData() {
        Promise.all([api.assetCheck.getUserList(), api.assetController.getOrganizationTree(), api.typeSetting.getTypeTree()]).then(result => {
          this.formOptions.checkUser = result[0].map(user => ({
            label: user.name,
            value: user.id
          }))
          this.formOptions.departmentList = helper.getTreeData([result[1]], 'children', 'name')
          this.formOptions.assetTypeList = helper.getTreeData(result[2], 'assetsTypeDtoList', 'typename')
        })
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog__body
    overflow: visible !important
  .el-radio-group
    margin: 0 20px
  .radio-content
    .item
      margin: 10px 20px
      .form
        width: 100%
        box-sizing: border-box
        .input-item
          .explain
            flex: none !important
          .input
            margin-left: 10px
      .asset-choose
        width: 100%
        .button
          margin: 0 20px 10px 0
        .chosenum
          font-size: 12px
          font-weight: bold
          margin-right: 10px
          display: inline-block
          float: right
          line-height: 28px

  .table
    /*min-height: 300px*/
    height: 310px
    overflow-y: auto
    /deep/ .el-table
      .cell
        line-height: 30px !important
</style>