<template>
  <div style="width: 100;height: 100%">
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
        @click="onBtnClick">
        <edit-table-field
          @filterField="filterField"
          :field-list="fieldlist">
        </edit-table-field>
      </main-toolbar>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        :showPagination="false"
        @reloadTable="tableOptions.reload">
        <el-table-column v-for="(item) in tableinfo"
                         :key="item.value"
                         :label="item.label"
                         :width="item.width"
                         :minWidth="item.minWidth">
          <template slot-scope="scope">
            <el-input class="edit-input"
                      v-if="scope.$index === editIndex && !item.uneditable"
                      size="small"
                      v-model="scope.row[item.value]">
            </el-input>
            <span v-else>{{scope.row[item.value]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" minWidth="300" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="onBtnClick('btnDistributeList', scope.row)">
              <i class="fa fa-file-text-o"></i>&nbsp;&nbsp;分配列表
            </el-button>
            <template v-if="scope.$index === editIndex">
              <el-button
                size="mini"
                type="success"
                @click="onBtnClick('btndetailSave', scope.row)">
                保存
              </el-button>
              <el-button
                size="mini"
                type="info"
                @click="onBtnClick('btndetailCancel', scope.row)">
                取消
              </el-button>
            </template>
            <el-button
              v-else
              v-for="(btn, index) in helper.getTableButtons(buttons, tableButtons)"
              size="mini"
              :key="index"
              :type="btn.logo"
              @click="onBtnClick(btn.btnKey, scope.row, scope.$index)">
              {{btn.memo}}
            </el-button>
          </template>
        </el-table-column>
      </eui-table>
    </eui-layout>
    <distribute-list-window ref="distributelist">
    </distribute-list-window>
  </div>
</template>

<script>
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import helper from '@/app/app.helpers'
  import {LIST} from '../work.config'
  import api from '@/api'
  import DistributeListWindow from './DistributeListWindow'
  import EditTableField from '@/components/common/tools/EditTableField'
  const REGIONS = {
    north: {},
    center: {}
  }
  export default {
    name: 'detail-list',
    components: {
      MainToolbar,
      EuiLayout,
      EuiTable,
      DistributeListWindow,
      EditTableField
    },
    props: {
      buttons: {
        type: Array,
        default: () => []
      },
      dataList: {
        type: Array,
        default: () => []
      },
      workshopOrderId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        REGIONS,
        helper,
        tableinfo: LIST.DETAIL.TABLE_INFO,
        fieldlist: LIST.DETAIL.TABLE_INFO,
        tableButtons: ['btndetailEdit', 'btndetailDelete'],
        editRow: {},
        editIndex: null,
        rowClickData: {},
        tableOptions: {
          data: [],
          total: 0,
          columns: [],
          rowClick: (row, event, column) => {
            this.rowClickData = {...row}
          },
          rowDblclick: (row, event) => {
          },
          reload: (name, val) => {
          }
        }
      }
    },
    methods: {
      onBtnClick(btnKey, ...args) {
        let btnHandlers = {
          btndetailAdd: () => {
            if (!this.workshopOrderId) {
              this.$message.warning('请先选择要添加详情的订单')
              return false
            }
            if (this.editIndex !== null) {
              this.$message.warning('请先保存当前编辑项')
              return false
            }
            this.tableOptions.data.push({...LIST.DETAIL.FORM_DATA})
            this.editIndex = this.tableOptions.data.length - 1
          },
          btndetailCopy: () => {
            if (!this.rowClickData.id) {
              this.$message.warning('请先选择要复制的记录')
              return false
            }
            if (this.editIndex !== null) {
              this.$message.warning('请先保存当前编辑项')
              return false
            }
            let _copy = this.rowClickData
            delete _copy.id
            this.tableOptions.data.push({..._copy})
            this.editIndex = this.tableOptions.data.length - 1
          },
          btndetailEdit: (args) => {
            this.editRow = {...args[0]}
            if (this.editIndex !== null && args[1] !== this.editIndex) { // 编辑行存在，且点击编辑的是其他行
              this.$message.warning('请先保存当前编辑项')
              return false
            }
            this.editIndex = args[1]
          },
          btndetailDelete: (args) => {
            this.$confirm(`是否删除此条详情？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.workshopOrderDetail.delete(args[0].id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.$emit('reloadParent')
              })
            }).catch(() => {
            })
          },
          btndetailCancel: (args) => { // 点击取消
            if (this.tableOptions.data[this.editIndex].id) { // 如果是编辑的取消
              this.editIndex = null
              Object.keys(this.editRow).forEach(k => {
                args[0][k] = this.editRow[k]
              })
            } else {   // 如果是新增时的取消
              this.tableOptions.data.pop()
              this.editIndex = null
            }
          },
          btndetailSave: (args) => {
            if (this.tableOptions.data[this.editIndex].id) {
              api.workshopOrderDetail.update(args[0]).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.editIndex = null
                this.$emit('reloadParent')
              }).catch(() => {
                Object.keys(this.editRow).forEach(k => {
                  args[0][k] = this.editRow[k]
                })
                this.editIndex = null
              })
            } else {
              let _data = args[0]
              _data.workshopOrderId = this.workshopOrderId
              api.workshopOrderDetail.add(_data).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.editIndex = null
                this.$emit('reload')   // 新增完之后 需要重新请求 获取新增项的id
                this.$emit('reloadParent')
              }).catch(() => {
                this.tableOptions.data.pop()
                this.editIndex = null
              })
            }
          },
          btnDistributeList: (args) => {
            console.log(args)
            this.$refs.distributelist.open(args[0].id)
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, args)
        }
      },
      filterField(fields) {  // 过滤表格field
        // console.log(fields)
        this.tableinfo = LIST.DETAIL.TABLE_INFO.filter(f => fields.includes(f.value))
      }
    },
    mounted() {
    },
    watch: {
      'dataList'() {
        this.tableOptions.data = this.dataList.map(data => {
          // data.isSet = false
          return data
        })
        this.editIndex = null
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .edit-input
    padding: 0
    /deep/ .el-input__inner
      padding: 0 10px
</style>
