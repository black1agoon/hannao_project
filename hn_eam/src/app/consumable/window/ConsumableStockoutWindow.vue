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
                <eui-input v-model="formdata[item.value]"
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
            </div>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="asset-choose clearfix">
        <el-button class="button" size="mini" plain @click="choose">选择物料</el-button>
        <el-button :disabled="tableRowsSelect.length === 0" class="button" size="mini" plain @click="deleteChoose">删除物料</el-button>
        <el-button class="button" size="mini" plain @click="importTemplate">导入物料</el-button>
        <el-button class="button" size="mini" plain @click="getTemplate">物料模板下载</el-button>
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
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">
            <el-input class="edit-input" size="small"
                      type="number"
                      v-model="scope.row.quantity">
            </el-input>
          </template>
        </el-table-column>
      </eui-table>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure('zancun')">暂存</el-button>
        <el-button type="primary" size="small" @click="sure('add')">确认出库</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
    <consumable-choose-window ref="choose"
                              @selectRows="setSelectRows">
    </consumable-choose-window>
    <upload-file
        ref="uploadfile"
        :upload-api="uploadApi"
        title="批量导入"
        @reload="reload">
    </upload-file>
  </div>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiTable from '@/components/common/form/EuiTable'
  import {STOCKOUT} from '../consumable.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import ConsumableChooseWindow from './ConsumableChooseWindow'
  import UploadFile from '@/app/tools/UploadFile'
  import config from '@/config'
  import fileDownload from 'js-file-download'
  export default {
    name: 'consumable-stockout-window',
    props: {
      organizationData: {
        type: Object,
        default: () => ({})
      }
    },
    components: {
      EuiTable,
      EuiInput,
      EuiWindow,
      ConsumableChooseWindow,
      UploadFile
    },
    data() {
      return {
        serverURI: config.serverURI,
        helper,
        user: this.$store.state.user,
        forminfo: STOCKOUT.FORM_INFO,
        formdata: {...STOCKOUT.FORM_DATA},
        formOptions: Object.assign(STOCKOUT.FORM_OPTIONS, {
          warehouseId: []
        }),
        rules: STOCKOUT.RULES,
        windowOptions: {
          title: '',
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
            {prop: 'unit', label: '单位'}
          ],
          rowClassName: ({row, rowIndex}) => {
            row.index = rowIndex
          },
          handleSelectionChange: val => {
            this.tableRowsSelect = val
            // this.tableRowsSelect = val.map(v => v.id)
          }
        },
        tableRowsSelect: [],
        uploadApi: api.consumableStockout.importTemplate
      }
    },
    methods: {
      open(row) {
        this.getWarehouseData()
        if (row) {
          this.windowOptions.title = '出库管理编辑'
          this.formdata = row
          this.formdata.usedDtoList = []
          this.tableOptions.data = row.stockoutConsumableDtoList.map(r => {
            r.id = r.consumableId
            return r
          })
          this.$refs.window.open()
        } else {
          this.windowOptions.title = '出库管理新增'
          this.$refs.window.open()
          // this.formdata = {...RECEIVE.FORM_DATA}
          this.tableOptions.data = []
          this.$nextTick(() => {
            this.$refs.form.resetFields()
            this.formdata = JSON.parse(JSON.stringify(STOCKOUT.FORM_DATA))
          })
        }
      },
      sure(method) {
        this.$refs.form.validate((valid) => {
          if (this.tableOptions.data.some(d => d.quantity === null)) {
            this.$message({
              message: '物料数量不能为空！',
              type: 'warning'
            })
          } else if (valid) {
            this.formdata.usedDtoList = this.tableOptions.data.map(row => ({
              consumableId: row.id,
              quantity: row.quantity
            }))
            this.formdata.agencyId = this.$store.state.agencyId
            if (!this.formdata.id) {
              api.consumableStockout[method](this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.$refs.window.cancel()
              })
            } else {
              let updateFunName = ''
              if (method === 'zancun') {
                this.formdata.stockoutStatus = '0'
                updateFunName = 'updateZancun'
              } else if (method === 'add') {
                this.formdata.stockoutStatus = '1'
                updateFunName = 'updateAdd'
              }
              api.consumableStockout[updateFunName](this.formdata).then(() => {
                this.$message({
                  message: '编辑成功',
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
        if (this.formdata.warehouseId) {
          this.$refs.choose.open(this.formdata.warehouseId)
        } else {
          this.$message({
            message: '请先选择物料所属仓库!',
            type: 'warning'
          })
        }
      },
      deleteChoose() {
        let filterindex = this.tableRowsSelect.map(t => t.index)
        this.tableOptions.data = this.tableOptions.data.filter((d, index) => !filterindex.includes(index))
        this.formdata.amount = this.tableOptions.data.reduce((rst, row) => {
          return rst += Number(row.totalPrice)
        }, 0).toFixed(2)
      },
      setSelectRows(rows) {
        rows.forEach(row => {
          this.$set(row, 'quantity', null)
          this.tableOptions.data.push(row)
        })
      },
      getTemplate() {
        // window.open(this.serverURI + api.consumableStockout.getTemplate())
        if (this.formdata.warehouseId) {
          api.consumableStockout.getTemplate(this.formdata.warehouseId).then(res => {
            let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
            fileDownload(blob, '物料模板.xls')
          })
        } else {
          this.$message({
            message: '请先选择物料所属仓库!',
            type: 'warning'
          })
        }
      },
      importTemplate() {
        this.$refs.uploadfile.open()
      },
      reload(data) {
        if (data && data.length > 0) {
          // data.forEach(d => {
          //   d.id = d.consumableId
          //   this.tableOptions.data.push(d)
          // })
          this.tableOptions.data = data
        }
      },
      getWarehouseData() {
        api.consumableWarehouse.getStockoutList().then(data => {
          this.formOptions.warehouseId = data ? Object.keys(data).map(key => ({
            label: data[key],
            value: key
          })) : []
        })
      },
      selectChange(prop, val) {
        let handlers = {
          department: () => {
            this.formdata.userid = this.formdata.id ? this.formdata.userid : null
            if (val === undefined) {
              this.formOptions.userid = []
            } else {
              let node = helper.getTreeNode([this.organizationData], val, 'children')
              this.formOptions.userid = node.employeeList ? node.employeeList.map(e => ({
                label: e.name,
                value: e.id
              })) : []
            }
          }
        }
        if (handlers[prop]) {
          handlers[prop].call(this, val)
        }
      }
    },
    watch: {
      'organizationData'() {
        this.formOptions.department = helper.getTreeData([this.organizationData], 'children', 'name')
      },
      'formdata.department'() {
        let node = helper.getTreeNode([this.organizationData], this.formdata.department, 'children')
        if (node) {
          this.formOptions.userid = node.employeeList ? node.employeeList.map(e => ({
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