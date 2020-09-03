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
          slot="right"
          style="margin-right: 35px">
        </super-search>
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
        <el-table-column label="描述" prop="catDesc" align="center" minWidth="200">
        </el-table-column>
        <el-table-column label="操作" minWidth="300" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="go2Attr(scope.$index, scope.row)">
              <i class="btn-icon fa fa-bars"></i>属性列表
            </el-button>
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
      <equipment-category-window
        ref="window" @reload="getData">
      </equipment-category-window>
    </eui-layout>
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
  import {CATEGORY} from './equipment.config'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import EquipmentCategoryWindow from './window/EquipmentCategoryWindow'
  export default {
    name: 'equipment-category',
    _meta: {
      path: '/equipment/category',
      title: '设备分类'
    },
    mixins: [TabPane],
    components: {
      EquipmentCategoryWindow,
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiInput,
      SuperSearch
    },
    data() {
      return {
        helper,
        REGIONS: CATEGORY.REGIONS,
        SEARCH_OPTIONS: CATEGORY.SEARCH_OPTIONS,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnAudit'],
        query: {
          page: 1,
          pageSize: 10,
          companyId: null,
          companyName: null,
          name: null,
          status: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '分类名称', minWidth: 150},
            {prop: 'createTime', label: '创建时间', minWidth: 150},
            {prop: 'seq', label: '排序', minWidth: 100, sortable: true}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
          },
          rowDblclick: (row, event) => {
            this.$refs.window.open({...row})
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
        api.equipmentCategory.paged(this.query).then(data => {
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
              api.equipmentCategory.delete(row.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData()
              })
            })
              .catch(() => {
              })
          },
          btnAudit: (row) => {
            this.$refs.audit.open(row)
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getIsShow(status) {
        return status === 0 ? 'el-icon-close close' : 'el-icon-check check'
      },
      go2Attr(index, row) {
        this.$router.push({path: '/equipment/attr', query: {id: row.id, attrName: row.name}})
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.name = searchinfo.name
        this.query.companyId = searchinfo.companyId
        this.getData()
      }
    },
    mounted() {
      this.getData()
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
