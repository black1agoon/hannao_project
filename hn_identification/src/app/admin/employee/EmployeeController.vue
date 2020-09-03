<template>
    <eui-layout :regions="REGIONS">
      <search-toolbar :query="query"
                      slot="north"
                      :search-info="searchInfo" @click="onBtnClick">
      </search-toolbar>
        <eui-table
                slot="center"
                ref="table"
                :highlight-current-row="false"
                :options="tableOptions">
          <el-table-column slot="prev" label="编码" align="center" minWidth="150">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.dataServiceCode"
                          placement="bottom-start" effect="light">
                <span>{{scope.row.dataServiceCode}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
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
        <div class="table-box" slot="south">
            <div class="table-title">
                关联企业信息:
            </div>
            <eui-table
                    class="table"
                    :highlight-current-row="false"
                    :options="subTableOptions">
            </eui-table>
        </div>

        <employee-controller-window
                ref="window"
                @reload="tableOptions.reload">
        </employee-controller-window>
    </eui-layout>
</template>

<script>
  import api from '@/api'
  import {EMPLOYEE} from './employee.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import SearchToolbar from '@/components/common/form/SearchToolbar'
  import EmployeeControllerWindow from './window/EmployeeControllerWindow'
  export default {
    name: 'employee-controller',
    _meta: {
      path: '/employee/controller',
      title: '职员标识管理'
    },
    components: {
      EmployeeControllerWindow,
      EuiLayout,
      EuiTable,
      SearchToolbar
    },
    data() {
      return {
        helper,
        REGIONS: EMPLOYEE.REGIONS,
        searchInfo: EMPLOYEE.searchInfo,
        buttons: helper.getMainButtons(),
        tableButtons: [],
        query: {
          name: null,
          dataServiceCode: null,
          idCard: null,
          page: 1,
          pageSize: 10
        },
        subQuery: {
          id: null,
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '职员姓名', minWidth: 150},
            {prop: 'sexName', label: '性别', minWidth: 100},
            {prop: 'birthday', label: '生日', minWidth: 100},
            {prop: 'idCard', label: '身份证号码', minWidth: 100},
            {prop: 'mobile', label: '联系方式', minWidth: 100},
            {prop: 'areaNumberName', label: '区域', minWidth: 100},
            {prop: 'email', label: '邮箱', minWidth: 100}
          ],
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
            this.subQuery.id = row.id
            this.subQuery.page = 1
            this.subTableOptions.currentPage = 1
            this.getSubData()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        },
        subTableOptions: {
          data: [],
          total: 0,
          currentPage: 1,
          columns: [
            {prop: 'name', label: '企业名称', minWidth: 100},
            {prop: 'equipment', label: '设备数量', minWidth: 100},
            {prop: 'contacts', label: '联系人', minWidth: 100},
            {prop: 'address', label: '地址', minWidth: 100}
          ],
          reload: (name, val) => {
            this.subQuery.page = name === 'page' ? val : this.subQuery.page
            this.subQuery.pageSize = name === 'pageSize' ? val : this.subQuery.pageSize
            this.getSubData(this.subQuery)
          }
        }
      }
    },
    methods: {
      onBtnClick(btnKey, data) {
        let btnHandlers = {
          btnAdd: () => {
          },
          btnEdit: (data) => {
            this.$refs.window.open(data)
          },
          btnDelete: (data) => {
          },
          btnSearch: (data) => {
            Object.keys(data).forEach(key => {
              this.query[key] = data[key]
            })
            this.query.page = 1
            this.getData()
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, data)
        }
      },
      getData() {
        api.employee.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getSubData() {
        api.employee.getEnterprisesByEmployeeId(this.subQuery).then(data => {
          this.subTableOptions.data = data.records
          this.subTableOptions.total = data.total
        })
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .table-box
        height: 100%
        display: flex
        flex-direction: column
        .table-title
            font-size: 15px
            padding: 10px 0 10px 20px
</style>

