<template>
  <eui-layout :regions="regions">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons)"
      @click="onBtnClick">
    </main-toolbar>
    <eui-table
      slot="center"
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column label="是否显示" align="center" minWidth="100">
        <template slot-scope="scope">
          <i :class="['icon', getIsShow(scope.row.isShow)]"></i>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" minWidth="200">
      </el-table-column>
      <el-table-column label="分类描述" align="center" prop="catDesc" minWidth="200">
      </el-table-column>
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
    <consultation-category-window
      ref="window"
      @reload="tableOptions.reload">
    </consultation-category-window>
  </eui-layout>
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
  import {CATEGORY} from './consultation.config'
  import ConsultationCategoryWindow from './window/ConsultationCategoryWindow'

  export default {
    name: 'consultation-category',
    _meta: {
      path: '/consultation/category',
      title: '栏目管理'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      ConsultationCategoryWindow
    },
    data() {
      return {
        helper,
        regions: CATEGORY.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '名称', minWidth: 200},
            {prop: 'seq', label: '排序', minWidth: 200, sortable: true}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
          },
          rowDblclick: (row, event) => {
            this.$refs.window.open(row)
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
        api.consultation.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (arg) => {
            this.$refs.window.open(arg)
          },
          btnDelete: (arg) => {
            this.formdata = {...arg}
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.consultation.delete([this.formdata.id]).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, arg)
        }
      },
      getIsShow(status) {
        return status === 0 ? 'el-icon-close close' : 'el-icon-check check'
      }
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .icon
    display: inline-block
    margin-right: 10px
    line-height: 20px
    color: #ffffff
    width: 20px
    height: 20px
    text-align: center
    border-radius: 50%
    &.check
      background: #67c23a
    &.close
      background: #f78989
</style>
