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
          <template slot="prev">
            <el-table-column label="编码" align="center" minWidth="200">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row.dataServiceCode"
                            placement="bottom-start" effect="light">
                  <span>{{scope.row.dataServiceCode}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
              <el-table-column label="短编码" prop="uniqId" align="center" minWidth="100">
              </el-table-column>
            <el-table-column label="企业名称" prop="name" align="center" minWidth="150">
            </el-table-column>
            <el-table-column label="社会统一信用代码" align="center" minWidth="200">
              <template slot-scope="scope">
                <el-tooltip :content="scope.row.unifiedSocialCreditCode"
                            placement="bottom-start" effect="light">
                  <span>{{scope.row.unifiedSocialCreditCode}}</span>
                </el-tooltip>
              </template>
            </el-table-column>
          </template>

          <el-table-column label="地址" align="center" minWidth="200">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.address"
                          placement="bottom-start" effect="light">
                <span>{{scope.row.address}}</span>
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

          <el-tabs type="card" v-model="tabValue" @tab-click="tabClick">
            <el-tab-pane label="关联职员" name="first">
              <eui-table
                  class="table"
                  :highlight-current-row="false"
                  :options="subTableOptions">
                <el-table-column label="编码" align="center" minWidth="200">
                  <template slot-scope="scope">
                    <el-tooltip popper-class="tooltip" :content="scope.row.dataServiceCode"
                                placement="bottom-start" effect="light">
                      <span>{{scope.row.dataServiceCode}}</span>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </eui-table>
            </el-tab-pane>
            <el-tab-pane label="关联主动码" name="second">
              <eui-table
                  class="table"
                  :highlight-current-row="false"
                  :options="subTableOptions2">
              </eui-table>
            </el-tab-pane>
          </el-tabs>
        </div>

        <enterprise-controller-window
                ref="window"
                @reload="tableOptions.reload">
        </enterprise-controller-window>
    </eui-layout>
</template>

<script>
  import api from '@/api'
  import {ENTERPRISE} from './enterprise.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import SearchToolbar from '@/components/common/form/SearchToolbar'
  import EnterpriseControllerWindow from './window/EnterpriseControllerWindow'
  export default {
    name: 'enterprise-controller',
    _meta: {
      path: '/enterprise/controller',
      title: '企业标识管理'
    },
    components: {
      EnterpriseControllerWindow,
      EuiLayout,
      EuiTable,
      SearchToolbar
    },
    data() {
      return {
        helper,
        REGIONS: ENTERPRISE.REGIONS,
        searchInfo: ENTERPRISE.searchInfo,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnDetail'],
        tabValue: 'first',
        query: {
          name: null,
          page: 1,
          pageSize: 10,
          dataServiceCode: null,
          unifiedSocialCreditCode: null
        },
        subQuery: {
          id: null,
          page: 1,
          pageSize: 10
        },
        subQuery2: {
          enterpriseId: null,
          page: 1,
          pageSize: 10
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'contacts', label: '联系人', minWidth: 100},
            {prop: 'mobile', label: '联系电话', minWidth: 100}
          ],
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
            this.subQuery.id = row.id
            this.subQuery.page = 1
            this.subQuery2.enterpriseId = row.id
            this.subQuery2.page = 1
            this.subTableOptions.currentPage = 1
            this.subTableOptions2.currentPage = 1
            this.tabClick()
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
            {prop: 'name', label: '职员姓名', minWidth: 150},
            {prop: 'sexName', label: '性别', minWidth: 100},
            {prop: 'birthday', label: '生日', minWidth: 100},
            {prop: 'idCard', label: '身份证号码', minWidth: 100},
            {prop: 'email', label: '邮箱', minWidth: 100}
          ],
          reload: (name, val) => {
            // this.subQuery
            this.subQuery.page = name === 'page' ? val : this.subQuery.page
            this.subQuery.pageSize = name === 'pageSize' ? val : this.subQuery.pageSize
            this.getSubData()
          }
        },
        subTableOptions2: {
          data: [],
          total: 0,
          currentPage: 1,
          columns: [
            {prop: 'name', label: '设备名称', minWidth: 100},
            {prop: 'enterpriseName', label: '企业名称', minWidth: 100},
            {prop: 'code', label: '条码值', minWidth: 100},
            {prop: 'codeTypeName', label: '条码类型名称', minWidth: 100},
            {prop: 'status', label: '状态', minWidth: 100},
            {prop: 'dataServiceCode', label: '编码', minWidth: 100},
            {prop: 'createTime', label: '创建时间', minWidth: 100}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
          },
          reload: (name, val) => {
            this.subQuery2.page = name === 'page' ? val : this.subQuery2.page
            this.subQuery2.pageSize = name === 'pageSize' ? val : this.subQuery2.pageSize
            this.getSubData2()
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
            this.$router.push({
              path: '/enterprise/controller/form',
              query: {
                id: data.id
              }
            })
          },
          btnDelete: (data) => {
            this.$confirm(`是否删除:企业 ${data.name} 的标识？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.enterprise.delete(data.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData()
              })
            }).catch(() => {
            })
          },
          btnSearch: (data) => {
            Object.keys(data).forEach(key => {
              this.query[key] = data[key]
            })
            this.query.page = 1
            this.getData()
          },
          btnDetail: () => {
            this.$router.push({
              path: '/company/detail',
              query: {
                id: data.id
              }
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, data)
        }
      },
      getData() {
        api.enterprise.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getSubData() {
        api.enterprise.getEmployeesByEnterpriseId(this.subQuery).then(data => {
          this.subTableOptions.data = data.records
          this.subTableOptions.total = data.total
        })
      },
      getSubData2() {
        api.activeCode.paged(this.subQuery2).then(data => {
          this.subTableOptions2.data = data.records
          this.subTableOptions2.total = data.total
        })
      },
      tabClick() {
        this.tabValue === 'first' ? this.subQuery.id && this.getSubData() : this.subQuery2.enterpriseId && this.getSubData2()
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
      .el-tabs
        height: 100%
        /deep/ .el-tabs__content
          height: calc(100% - 30px)
        /deep/ .el-tab-pane
          height: 100%
</style>

