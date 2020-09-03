<template>
  <eui-layout :regions="region">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
        @click="onBtnClick">
      <super-search
          ref="search"
          v-model="query"
          :options="search_options"
          @search="superSearch"
          slot="right"
          style="margin-right: 35px;float: right">
      </super-search>
    </main-toolbar>
    <eui-table
        slot="center"
        ref="table"
        :showPagination="true"
        :highlight-current-row="true"
        :options="tableOptions">
      <el-table-column label="操作" align="center" minWidth="200" fixed="right">
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
    <equipment-window ref="window"
                           @reload="tableOptions.reload">
    </equipment-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import { EQUIPMENT } from './disinfect.config'
  import helper from '@/app/app.helpers'
  import EquipmentWindow from './window/EquipmentWindow'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'equipment-controller',
    _meta: {
      path: '/equipment/controller',
      title: '消毒设备管理'
    },
    components: {
      EuiTable,
      EuiLayout,
      MainToolbar,
      EquipmentWindow,
      SuperSearch
    },
    data() {
      return {
        helper,
        region: EQUIPMENT.regions,
        buttons: helper.getMainButtons(),
        tableButtons: [],
        query: {
          page: 1,
          pageSize: 10,
          equipmentCode: null,
          equipmentName: null,
          equipmentType: null
        },
        search_options: EQUIPMENT.search_options,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'equipmentName', label: '设备名称', minWidth: 100},
            {prop: 'equipmentTypeName', label: '设备类型', minWidth: 100},
            {prop: 'equipmentStatusName', label: '设备状态', minWidth: 100},
            {prop: 'equipmentData', label: '设备数据', minWidth: 100},
            {prop: 'equipmentCode', label: '设备编码', minWidth: 100},
            {prop: 'location', label: '安装位置', minWidth: 100},
          ],
          rowClick: (row) => {
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'rows' ? val : this.query.pageSize
            this.getTableData()
          }
        }
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            this.$refs.window.open(row)
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除设备: ${row.equipmentName}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.equipment.delete(row.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getTableData()
              })
            }).catch(() => {
            })
          },
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getTableData() {
        api.equipment.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      superSearch(searchinfo) {
        this.query.page = 1
        for (let key in searchinfo) {
          this.query[key] = searchinfo[key]
        }
        this.getTableData()
      }
    },
    mounted() {
      this.getTableData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>