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
                           :unit="item.unit"
                           @change="(val) => {selectChange(item.value, val)}">
                </eui-input>
              </div>
              <div class="add" v-if="item.add" @click="addFunctions(item.value)">新增</div>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="asset-choose clearfix" v-show="!formdata.id">
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
        <el-table-column v-if="formdata.id" label="操作" align="center" minWidth="200" fixed="right">
          <template slot-scope="scope">
            <eui-input type="radio"
                       v-model="scope.row.maintainStatus"
                       @change="tableStatusChange"
                       :options="tableStatusOptions">
            </eui-input>
          </template>
        </el-table-column>
      </eui-table>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
    <assets-choose-window ref="assetsChoose"
                          :searchType="4"
                          @selectRows="setSelectRows">
    </assets-choose-window>
  </div>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiTable from '@/components/common/form/EuiTable'
  import {MAINTAIN} from '../asset.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import AssetsChooseWindow from './AssetsChooseWindow'
  export default {
    name: 'asset-maintain-window',
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
      EuiInput,
      EuiWindow,
      AssetsChooseWindow
    },
    data() {
      return {
        helper,
        user: this.$store.state.user,
        forminfo: MAINTAIN.FORM_INFO,
        formdata: {...MAINTAIN.FORM_DATA},
        formOptions: Object.assign(MAINTAIN.FORM_OPTIONS, {
          department: []
        }),
        rules: MAINTAIN.RULES,
        windowOptions: {
          title: '资产维修',
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
          ],
          handleSelectionChange: val => {
            this.tableRowsSelect = val.map(v => v.id)
          }
        },
        tableRowsSelect: [],
        tableStatusOptions: [{
          label: '维修中',
          value: '2'
        }, {
          label: '已完成',
          value: '1'
        }]
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.formOptions.maintainStatus = [{
            label: '已完成',
            value: '1'
          }, {
            label: '维修中',
            value: '2'
          }, {
            label: '部分完成',
            value: '3',
            disabled: true
          }]
          this.formdata = row
          this.tableOptions.data = row.assetDtoList
          this.$refs.window.open()
        } else {
          this.formOptions.maintainStatus = [{
            label: '已完成',
            value: '1'
          }, {
            label: '维修中',
            value: '2'
          }]
          this.$refs.window.open()
          // this.formdata = {...RECEIVE.FORM_DATA}
          this.tableOptions.data = []
          this.$nextTick(() => {
            this.$refs.form.resetFields()
            this.formdata = JSON.parse(JSON.stringify(MAINTAIN.FORM_DATA))
            this.formdata.disposeUserName = this.user.name
            this.formdata.disposeUser = this.user.id
          })
        }
      },
      addFunctions(prop) {
        this.$emit('addFunctions', prop)
      },
      selectChange(prop, val) {
        let handlers = {
          maintainUser: () => {
            this.formdata.username = this.formOptions.maintainUser.find(u => u.value === val).label
          },
          department: () => {
            this.formdata.maintainUser = this.formdata.id ? this.formdata.maintainUser : null
            if (val === undefined) {
              this.formOptions.maintainUser = []
            } else {
              let node = helper.getTreeNode([this.organizationData], val, 'children')
              this.formOptions.maintainUser = node.employeeList ? node.employeeList.map(e => ({
                label: e.name,
                value: e.id
              })) : []
              this.formdata.departmentName = helper.getTreeNode([this.organizationData], val, 'children').name
            }
          },
          maintainStatus: () => {
            this.formdata.assetDtoList.forEach(asset => {
              asset.maintainStatus = this.formdata.maintainStatus
            })
          }
        }
        if (handlers[prop]) {
          handlers[prop].call(this, val)
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.formdata.agencyId = this.$store.state.agencyId
            this.formdata.disposeUser = this.user.id
            if (!this.formdata.id) {
              this.formdata.assetDtoList.forEach(asset => {
                asset.maintainStatus = this.formdata.maintainStatus
              })
              api.assetMaintain.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.$refs.window.cancel()
              })
            } else {
              api.assetMaintain.update(this.formdata).then(() => {
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
        this.$refs.assetsChoose.open(this.formdata.assetDtoList.map(a => a.id))
      },
      deleteChoose() { // 删除选中过的资产
        this.tableRowsSelect.forEach(rowId => {
          this.tableOptions.data = this.tableOptions.data.filter(row => row.id !== rowId)
          this.formdata.assetDtoList = this.formdata.assetDtoList.filter(row => row.id !== rowId)
        })
      },
      setSelectRows(rows) {
        rows.forEach(row => {
          this.tableOptions.data.push(row)
          this.formdata.assetDtoList.push(row)
        })
      },
      tableStatusChange() {
        if (this.formdata.assetDtoList.find(asset => asset.maintainStatus === '1') && this.formdata.assetDtoList.find(asset => asset.maintainStatus === '2')) {
          this.formdata.maintainStatus = '3'
        } else if (this.formdata.assetDtoList.find(asset => asset.maintainStatus === '1')) {
          this.formdata.maintainStatus = '1'
        } else {
          this.formdata.maintainStatus = '2'
        }

      }
    },
    watch: {
      'organizationData'() {
        this.formOptions.department = helper.getTreeData([this.organizationData], 'children', 'name')
      },
      'positionData'() {
        this.formOptions.positionId = this.positionData && this.positionData.length > 0 ? this.positionData.map(p => ({
          label: p.positionName,
          value: p.id
        })) : []
        this.$forceUpdate()
      },
      'formdata.department'() {
        let node = helper.getTreeNode([this.organizationData], this.formdata.department, 'children')
        if (node) {
          this.formOptions.maintainUser = node.employeeList ? node.employeeList.map(e => ({
            label: e.name,
            value: e.id
          })) : []
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .explain
    flex: 0 0 14px
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
    min-height: 200px
    /deep/ .el-table
      .cell
        line-height: 30px !important
</style>