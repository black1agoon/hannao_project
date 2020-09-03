<template>
  <div>
    <eui-layout :regions="REGIONS">
      <div slot="north">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/equipment/category' }">{{categoryName}}</el-breadcrumb-item>
          <el-breadcrumb-item>产品属性</el-breadcrumb-item>
        </el-breadcrumb>
        <main-toolbar
          :buttons="helper.getMainFilterButtons(buttons)"
          @click="onBtnClick">
        </main-toolbar>
      </div>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <template slot="prev">
          <el-table-column label="属性名称" prop="name" align="center">
          </el-table-column>
          <el-table-column label="类型" prop="name" align="center">
            <template slot-scope="scope">{{scope.row.type === 1 ? '手动录入' : '列表选择'}}
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-for="(btn, index) in helper.getTableButtons(buttons)"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
          </template>
        </el-table-column>
      </eui-table>
    </eui-layout>
    <equipment-attr-window ref="window" @reload="getData">
    </equipment-attr-window>
  </div>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiInput from '@/components/common/form/EuiInput'
  import {ATTR} from './equipment.config'
  import EquipmentAttrWindow from './window/EquipmentAttrWindow'
  export default {
    name: 'equipment-attr',
    _meta: {
      path: '/equipment/attr',
      title: '分类属性'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiInput,
      EquipmentAttrWindow
    },
    data() {
      return {
        helper,
        REGIONS: ATTR.REGIONS,
        FORM_INFO: ATTR.FORM_INFO,
        buttons: helper.getMainButtons(),
        categoryName: null,
        query: {
          page: 1,
          pageSize: 10,
          categoryId: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'keyName', label: 'keyName'},
            {prop: 'seq', label: '排序', sortable: true},
            {prop: 'options', label: '分类名称'}
          ],
          rowClick: (row, event, column) => {
            this.formdata = JSON.parse(JSON.stringify(row))
          },
          rowDblclick: (row, event) => {
            this.$refs.window.open()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData()
          }
        }
      }
    },
    methods: {
      getData() {
        api.equipmentAttr.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            this.$refs.window.open(row)
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除:${row.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.equipmentAttr.delete(row.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData()
              })
            })
              .catch(() => {
              })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      }
    },
    created() {
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.query.categoryId = to.query.id
        vm.categoryName = to.query.attrName
        vm.getData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-breadcrumb
    padding: 10px 0 5px 10px

  /deep/ .el-dialog__body
    padding: 30px 0
</style>
