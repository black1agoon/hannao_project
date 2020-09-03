<template>
  <div>
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tableButtons.concat(spinnerTableButtons, stationTableButtons))"
        @click="onBtnClick">
        <eui-search
          :formOptions="SEARCH_OPTIONS"
          :forminfo="SEARCH_INFO"
          :formdata.sync="SEARCH_DATA"
          :formfunctions="SEARCH_FUNS"
          @openWorkshopChose="searchFunctions('openWorkshopChose')"
          @search="(keyword) => {searchFunctions('search', keyword)}">
        </eui-search>
      </main-toolbar>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <el-table-column label="操作" :width="tableButtons.length * 80 + 150 + 'px'" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              v-for="(btn, index) in helper.getTableButtonsByKeys(buttons, tableButtons)"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
              <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
            </el-button>
          </template>
        </el-table-column>
      </eui-table>
      <el-tabs slot="south"
               type="card"
               :value="tabValue"
               @tab-click="tabClick"
               style="height: 100%">
        <el-tab-pane label="关联挡车工" name="spinner">
          <group-rel-spinner ref="spinner"
                             :buttons="helper.getTabsTableButtons(buttons, spinnerTableButtons)">
          </group-rel-spinner>
        </el-tab-pane>
        <el-tab-pane label="关联机台" name="station">
          <group-rel-station ref="station"
                             :buttons="helper.getTabsTableButtons(buttons, stationTableButtons)">
          </group-rel-station>
        </el-tab-pane>
      </el-tabs>
      <eui-window ref="window"
                  :options="windowOptions">
        <el-form class="clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules" style="padding: 20px">
          <el-col :sm="24" v-for="(item, index) in FORM_INFO" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <eui-input v-model="formdata[item.value]"
                         :type="item.type"
                         :readonly="item.readonly"
                         :suffixIcon="item.suffixIcon"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize"
                         :prepend="item.prepend"
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
    <work-shop-chose-window ref="workshop">
    </work-shop-chose-window>
    <group-rel-user-window ref="reluser"
                           :get-paged="getPaged"
                           :groupId="formdata.id">
    </group-rel-user-window>
    <group-rel-station-window ref="relstation">
    </group-rel-station-window>
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
  import EuiSearch from '@/components/common/form/EuiSearch'
  import {CONTROLLER} from './group.config'
  import WorkShopChoseWindow from '../common/WorkShopChoseWindow'
  import GroupRelSpinner from './spinner/GroupRelSpinner'
  import GroupRelStation from './station/GroupRelStation'
  import GroupRelUserWindow from './group/GroupRelUserWindow'
  import GroupRelStationWindow from './group/GroupRelStationWindow'

  export default {
    name: 'group-controller',
    _meta: {
      path: '/group/controller',
      title: '组管理'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch,
      WorkShopChoseWindow,
      GroupRelSpinner,
      GroupRelStation,
      GroupRelUserWindow,
      GroupRelStationWindow
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnRelSpinner', 'btnRelStation', 'btnEdit', 'btnDelete'],
        spinnerTableButtons: ['btnRelSpinnerDelete'],
        stationTableButtons: ['btnRelStationDelete'],
        REGIONS: CONTROLLER.REGIONS,
        FORM_INFO: CONTROLLER.FORM_INFO,
        formdata: {...CONTROLLER.FORM_DATA},
        SEARCH_INFO: CONTROLLER.SEARCH_INFO,
        SEARCH_DATA: CONTROLLER.SEARCH_DATA,
        SEARCH_OPTIONS: CONTROLLER.SEARCH_OPTIONS,
        SEARCH_FUNS: CONTROLLER.SEARCH_FUNS,
        formOptions: CONTROLLER.FORM_OPTIONS,
        rules: CONTROLLER.RULES,
        stationInfo: CONTROLLER.STATION_INFO,
        station: CONTROLLER.STATION_DATA,
        stationRules: CONTROLLER.STATION_RULES,
        tabValue: 'spinner',
        getPaged: null,
        query: {
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '组信息',
          width: '500px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'groupName', label: '组名', width: 200},
            {prop: 'workshopName', label: '车间', width: 200},
            {prop: 'createTime', label: '创建时间', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
            this.loadTabs()
            // this.$refs.spinner.reload(this.formdata.id)
          },
          rowDblclick: (row, event) => {
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
        api.group.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
            this.$nextTick(() => {
              this.$refs.form.resetFields()
              this.formdata = {...CONTROLLER.FORM_DATA}
            })
          },
          btnEdit: (row) => {
            this.formdata = {...row}
            this.$refs.window.open()
          },
          btnDelete: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$confirm(`是否删除:${this.formdata.groupName}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.group.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnRelSpinner: (row) => {
            this.tabValue = 'spinner'
            this.getPaged = api.spinner.paged
            this.$nextTick(() => {
              this.$refs.reluser.open('spinner')
            })
          },
          btnRelStation: (row) => {
            this.tabValue = 'station'
            this.$refs.relstation.open(row.id)
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.group.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.group.update(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.getData(this.query)
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
      getStatus(status) {
        return status === 0 ? 'el-icon-close' : 'el-icon-check'
      },
      formFunctions(val, method) {
        let funs = {
          workshopName: {
            suffixClick: () => {
              this.$refs.workshop.open('form')
            }
          }
        }
        funs[val][method].call(this)
      },
      searchFunctions(method, keyword) {
        let funs = {
          openWorkshopChose: () => {
            this.$refs.workshop.open('search')
          },
          search: (keyword) => {
            this.query.page = 1
            this.query.groupName = keyword.groupName
            this.query.workshopId = keyword.workshopId
            this.query.workshopName = keyword.workshopName
            this.getData(this.query)
          }
        }
        funs[method].call(this, keyword)
      },
      tabClick(tab) {
        this.tabValue = tab.name
        this.loadTabs()
      },
      loadTabs() {
        if (this.formdata.id) {
          if (this.tabValue === 'spinner') {
            this.$refs.spinner.reload(this.formdata.id)
          } else if (this.tabValue === 'station') {
            this.$refs.station.reload(this.formdata.id)
          }
        }
      }
    },
    created() {
      this.$on('workshop', (node, from) => {
        // console.log(node)
        if (from === 'form') {
          this.formdata.workshopId = node.id
          this.formdata.workshopName = node.name
        } else if (from === 'search') {
          this.SEARCH_DATA.workshopId = node.id
          this.SEARCH_DATA.workshopName = node.name
        }
      })
      this.$on('multipleuser', (from, list) => {
        api.groupRelSpinner.change({
          groupId: this.formdata.id,
          spinnerIds: list
        }).then(() => {
          this.$message({
            message: '新增成功!',
            type: 'success'
          })
          this.$refs.reluser.cancel()
          this.$refs.spinner.reload(this.formdata.id)
        })
      })
      this.$on('multiplestation', list => {
        api.groupRelStation.change({
          groupId: this.formdata.id,
          stations: list
        }).then(() => {
          this.$message({
            message: '新增成功!',
            type: 'success'
          })
          this.$refs.reluser.cancel()
          this.$refs.station.reload(this.formdata.id)
        })
      })
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .item
    /*display: inline-block*/
    margin-right: 20px
    &:last-child
      .value:after
        display: none
    .value:after
      display: inline-block
      position: absolute
      width: 10px
      content: '-'
      right: -18px

  /deep/ .el-tabs__content
    height: calc(100% - 41px)

  .eui-table
    height: 100%
    position: absolute
</style>
