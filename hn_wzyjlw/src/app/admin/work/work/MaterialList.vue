<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
      @click="onBtnClick">
    </main-toolbar>
    <eui-table
      slot="center"
      ref="table"
      :options="tableOptions"
      :showPagination="false"
      @reloadTable="tableOptions.reload">
      <el-table-column v-for="(item,index) in tableinfo"
                       :key="index"
                       :label="item.label"
                       :width="item.width"
                       :minWidth="item.minWidth">
        <template slot-scope="scope">
          <el-input v-if="scope.$index === editIndex && !item.uneditable" size="small" v-model="scope.row[item.value]"></el-input>
          <span v-else>{{scope.row[item.value]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <template v-if="scope.$index === editIndex">
            <el-button
              size="mini"
              type="success"
              @click="onBtnClick('btnmaterialSave', scope.row)">
              保存
            </el-button>
            <el-button
              size="mini"
              type="info"
              @click="onBtnClick('btnmaterialCancel', scope.row)">
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
</template>

<script>
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import helper from '@/app/app.helpers'
  import {LIST} from '../work.config'
  import api from '@/api'
  const REGIONS = {
    north: {},
    center: {}
  }
  export default {
    name: 'materia-list',
    components: {
      MainToolbar,
      EuiLayout,
      EuiTable
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
        tableinfo: LIST.MATERIAL.TABLE_INFO,
        tableButtons: ['btnmaterialEdit', 'btnmaterialDelete'],
        editRow: {},
        editIndex: null,
        rowClickData: {},
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            // {prop: 'workshopOrderId', label: '订单号', width: 200},
            // {prop: 'color', label: '颜色', width: 100},
            // {prop: 'essentialColour', label: '主色', width: 100},
            // {prop: 'measurement', label: '测量法', width: 100},
            // {prop: 'measurementUnit', label: '计量单位', width: 100},
            // {prop: 'needle', label: '单双针', width: 100},
            // {prop: 'needleNumber', label: '针数', width: 100},
            // {prop: 'distributionNumber', label: '分配数', width: 100},
            // {prop: 'productionNumber', label: '生产数', width: 100},
            // {prop: 'planDate', label: '预计完成时间', width: 100},
            // {prop: 'deliveryDate', label: '交货日期', minWidth: 100}
          ],
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
          btnmaterialAdd: () => {
            if (!this.workshopOrderId) {
              this.$message.warning('请先选择要添加原料的订单')
              return false
            }
            if (this.editIndex !== null) {
              this.$message.warning('请先保存当前编辑项')
              return false
            }
            this.tableOptions.data.push({...LIST.MATERIAL.FORM_DATA})
            this.editIndex = this.tableOptions.data.length - 1
          },
          btnmaterialEdit: (args) => {
            this.editRow = {...args[0]}
            if (this.editIndex !== null && args[1] !== this.editIndex) {
              this.$message.warning('请先保存当前编辑项')
              return false
            }
            this.editIndex = args[1]
          },
          btnmaterialDelete: (args) => {
            this.$confirm(`是否删除此条详情？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.workshopOrderMaterial.delete(args[0].id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.$emit('reload')
              })
            }).catch(() => {
            })
          },
          btnmaterialCancel: (args) => { // 点击取消
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
          btnmaterialSave: (args) => {
            if (this.tableOptions.data[this.editIndex].id) {
              api.workshopOrderMaterial.update(args[0]).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.editIndex = null
              }).catch(() => {
                Object.keys(this.editRow).forEach(k => {
                  args[0][k] = this.editRow[k]
                })
                this.editIndex = null
              })
            } else {
              let _data = args[0]
              _data.workshopOrderId = this.workshopOrderId
              api.workshopOrderMaterial.add(_data).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.editIndex = null
                this.$emit('reload')   // 新增完之后 需要重新请求 获取新增项的id
              }).catch(() => {
                this.tableOptions.data.pop()
                this.editIndex = null
              })
            }
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, args)
        }
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
