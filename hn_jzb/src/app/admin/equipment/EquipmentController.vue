<template>
  <div>
    <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
      @click="onBtnClick">
      <super-search
        ref="search"
        v-model="query"
        :options="SEARCH_OPTIONS"
        @search="superSearch"
        @appendClick="appendClick"
        slot="right"
        style="margin-right: 35px">
      </super-search>
    </main-toolbar>
    <eui-table
      slot="center"
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column label="操作" minWidth="300" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-for="(btn, index) in helper.getTableButtons(buttons, tableButtons)"
            size="mini"
            type="text"
            :key="index"
            @click="onBtnClick(btn.btnKey, scope.row)">
            <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="clearfix" ref="form" :model="formdata" label-width="120px" :rules="rules" style="padding: 20px">
        <el-col :sm="item.sm || 8" v-for="(item, index) in FORM_INFO" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <eui-input v-if="item.value === 'name'"
                       v-model="formdata[item.value]"
                       :disabled="editingFlag">
            </eui-input>
            <eui-input v-else
                       v-model="formdata[item.value]"
                       :type="item.type"
                       :readonly="item.readonly"
                       :suffixIcon="item.suffixIcon"
                       :options="formOptions[item.value]"
                       :autosize="item.autosize"
                       @suffixClick="formFunctions(item.value, 'suffixClick')">
            </eui-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
  </eui-layout>
    <company-chose-window ref="companyWindow">
    </company-chose-window>
    <equipment-category-chose-window ref="categoryWindow">
    </equipment-category-chose-window>
    <equipment-set-attr-window ref="attrWindow">
    </equipment-set-attr-window>
  </div>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import CompanyChoseWindow from '@/app/admin/common/CompanyChoseWindow'
  import EquipmentCategoryChoseWindow from '@/app/admin/common/EquipmentCategoryChoseWindow'
  import {EQUIP} from './equipment.config'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import EquipmentSetAttrWindow from './window/EquipmentSetAttrWindow'
  export default {
    name: 'equipment-controller',
    _meta: {
      path: '/equipment/controller',
      title: '设备信息'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      SuperSearch,
      CompanyChoseWindow,
      EquipmentCategoryChoseWindow,
      EquipmentSetAttrWindow
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnEditAttr'],
        REGIONS: EQUIP.REGIONS,
        FORM_INFO: EQUIP.FORM_INFO,
        formdata: {...EQUIP.FORM_DATA},
        rules: EQUIP.RULES,
        formOptions: {},
        SEARCH_OPTIONS: EQUIP.SEARCH_OPTIONS,
        editingFlag: false,
        query: {
          name: null,
          barCode: null,
          companyId: null,
          companyName: null,
          equipmentCode: null,
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '设备信息',
          width: '60%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '设备名称', minWidth: 200},
            {prop: 'id', label: '设备ID', minWidth: 300},
            {prop: 'companyName', label: '所属企业', minWidth: 200},
            {prop: 'model', label: '设备型号', minWidth: 200},
            {prop: 'barCode', label: '资产条码', minWidth: 200},
            {prop: 'equipmentCode', label: '设备条码', minWidth: 200},
            {prop: 'createTime', label: '创建时间', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
            this.formdata = JSON.parse(JSON.stringify(row))
          },
          rowDblclick: (row, event) => {
            this.editingFlag = true
            this.$refs.window.open()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        }
      }
    },
    methods: {
      getData(query) {
        api.equipment.getEquipmentPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnAdd: () => {
            this.editingFlag = false
            this.$refs.window.open()
            this.$nextTick(() => {
              this.$refs.form.resetFields()
              this.formdata = {...EQUIP.FORM_DATA}
            })
          },
          btnEdit: (arg) => {
            this.formdata = {...arg}
            this.editingFlag = true
            this.$refs.window.open()
          },
          btnDelete: (arg) => {
            this.formdata = JSON.parse(JSON.stringify(arg))
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.equipment.deleteEquipment(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnSingleSearch: (arg) => {
            this.query.name = arg
            this.query.page = 1
            this.getData(this.query)
          },
          btnSingleSearchClear: () => {
            this.query.name = null
            this.getData(this.query)
          },
          btnEditAttr: (row) => {
            api.equipment.get(row.id).then(data => {
              console.log(data)
              if (data.equipmentCategoryAttrValueDtoList.length > 0) {
                // data.equipmentCategoryAttrValueDtoList[0].options = 'aaa,bbb,ccc'
                this.$refs.attrWindow.open(data)
              } else {
                this.$message({
                  message: '暂无属性可以编辑!',
                  type: 'warning'
                })
              }
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, arg)
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.equipment.addEquipment(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.cancel()
              })
            } else {
              api.equipment.updateEquipment(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.cancel()
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      cancel() {
        this.editingFlag = false
        this.$refs.window.cancel()
      },
      formFunctions(val, method) {
        let funs = {
          companyName: {
            suffixClick: () => {
              this.$refs.companyWindow.open('form')
            }
          },
          categoryIdName: {
            suffixClick: () => {
              this.$refs.categoryWindow.open('form')
            }
          }
        }
        funs[val][method].call(this)
      },
      appendClick(value) {
        let funs = {
          companyName: () => {
            this.$refs.companyWindow.open('search')
          }
        }
        funs[value].call(this)
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.name = searchinfo.name
        this.query.barCode = searchinfo.barCode
        this.query.equipmentCode = searchinfo.equipmentCode
        this.query.companyId = searchinfo.companyId
        this.getData(this.query)
      }
    },
    mounted() {
      this.getData(this.query)
    },
    created() {
      this.$on('checkedNode', (node, from) => {
        if (from === 'form') {
          this.formdata.companyName = node.cnName
          this.formdata.companyId = node.id
        } else if (from === 'search') {
          this.query.companyId = node.id
          this.query.companyName = node.cnName
        }
      })
      this.$on('categoryChose', (node, from) => {
        if (from === 'form') {
          this.formdata.categoryIdName = node.name
          this.formdata.categoryId = node.id
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
