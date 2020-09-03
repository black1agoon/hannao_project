<template>
  <div>
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
        @click="onBtnClick">
        <eui-search
          :formOptions="SEARCH_OPTIONS"
          :forminfo="SEARCH_INFO"
          :formdata.sync="SEARCH_DATA"
          :formfunctions="SEARCH_FUNS"
          @openBarCodeChose="searchFunctions('openBarCodeChose')"
          @openStationTypeChose="searchFunctions('openStationTypeChose')"
          @openModelNameChose="searchFunctions('openModelNameChose')"
          @openWorkshopChose="searchFunctions('openWorkshopChose')"
          @search="(keyword) => {searchFunctions('search', keyword)}">
        </eui-search>
      </main-toolbar>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <el-table-column label="操作" :width="tableButtons.length * 100 + 200 + 'px'" align="center" fixed="right">
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
      <el-tabs slot="south"
               type="card"
               :value="tabValue"
               @tab-click="tabClick"
               style="height: 100%">
        <el-tab-pane label="机台记录" name="record">
          <station-record-tab ref="record">
          </station-record-tab>
        </el-tab-pane>
        <el-tab-pane label="异常记录" name="error">
          <station-err-record-tab ref="error">
          </station-err-record-tab>
        </el-tab-pane>
      </el-tabs>
      <eui-window ref="window"
                  :options="windowOptions">
        <el-form class="clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules" style="padding: 20px">
          <el-col :sm="24" v-for="(item, index) in FORM_INFO" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <div v-if="item.value === 'stationCode'">
                <el-form class="clearfix" ref="form2" :model="station" :rules="stationRules">
                  <el-col class="item" :sm="5" v-for="item in stationInfo" :key="item.value">
                    <el-form-item v-if="item.value==='chej'" :prop="item.value">
                      <eui-input class="value" :placeholder="item.label" type="number"
                                 v-model="station[item.value]" @change="chejChange"></eui-input>
                    </el-form-item>
                    <el-form-item v-else :prop="item.value">
                      <eui-input class="value" :placeholder="item.label" type="number"
                                 v-model="station[item.value]"></eui-input>
                    </el-form-item>
                  </el-col>
                </el-form>
              </div>
              <eui-input v-else v-model="formdata[item.value]"
                         :type="item.type"
                         :multiple="item.multiple"
                         :readonly="item.readonly"
                         :placeholder="item.placeholder"
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
    <bar-code-chose-window ref="barCode">
    </bar-code-chose-window>
    <station-type-chose-window ref="stationtype">
    </station-type-chose-window>
    <model-name-chose-window ref="modelname">
    </model-name-chose-window>
    <model-data-chose-window ref="modeldata">
    </model-data-chose-window>
    <station-value-window ref="stationvalue">
    </station-value-window>
    <work-shop-chose-window ref="workshop">
    </work-shop-chose-window>
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
  import {CONTROLLER} from './station.config'
  import BarCodeChoseWindow from '../common/BarCodeChoseWindow'
  import StationTypeChoseWindow from '../common/StationTypeChoseWindow'
  import ModelNameChoseWindow from '../common/ModelNameChoseWindow'
  import ModelDataChoseWindow from '../common/ModelDataChoseWindow'
  import StationValueWindow from './station/StationValueWindow'
  import WorkShopChoseWindow from '../common/WorkShopChoseWindow'
  import StationRecordTab from './station/StationRecordTab'
  import StationErrRecordTab from './station/StationErrRecordTab'

  export default {
    name: 'station-controller',
    _meta: {
      path: '/station/controller',
      title: '机台列表'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch,
      BarCodeChoseWindow,
      StationTypeChoseWindow,
      ModelNameChoseWindow,
      ModelDataChoseWindow,
      StationValueWindow,
      WorkShopChoseWindow,
      StationRecordTab,
      StationErrRecordTab
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnModelDataChange', 'btnLook'],
        REGIONS: CONTROLLER.REGIONS,
        FORM_INFO: CONTROLLER.FORM_INFO,
        formdata: {...CONTROLLER.FORM_DATA},
        SEARCH_INFO: CONTROLLER.SEARCH_INFO,
        SEARCH_DATA: CONTROLLER.SEARCH_DATA,
        SEARCH_OPTIONS: CONTROLLER.SEARCH_OPTIONS,
        SEARCH_FUNS: CONTROLLER.SEARCH_FUNS,
        formOptions: CONTROLLER.FORM_OPTIONS,
        rules: Object.assign(CONTROLLER.RULES, {
          stationCode: [{
            required: true,
            trigger: ['blur', 'change'],
            validator: (rule, value, callback) => {
              if (this.station.chej === '' || this.station.chej === null || this.station.lie === '' || this.station.lie === null || this.station.wei === '' || this.station.wei === null) {
                callback(new Error('请输入完整的机台编码!'))
              } else {
                callback()
              }
            }
          }]
        }),
        stationInfo: CONTROLLER.STATION_INFO,
        station: {...CONTROLLER.STATION_DATA},
        stationRules: CONTROLLER.STATION_RULES,
        tabValue: 'record',
        workshopList: [],
        query: {
          page: 1,
          pageSize: 10,
          barCode: null,
          stationName: null,
          stationCode: null,
          modelNameId: null,
          stationTypeId: null
        },
        windowOptions: {
          title: '机台信息',
          width: '600px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'stationName', label: '机台名称', width: 100},
            {prop: 'stationCode', label: '机台编码', width: 100},
            {prop: 'workshopName', label: '所属车间', width: 100},
            {prop: 'stationTypeName', label: '机台类型', width: 100},
            {prop: 'modelNameName', label: '模型名称', width: 100},
            {prop: 'stockingsCode', label: '袜型', width: 100},
            {prop: 'needleNumber', label: '针数', width: 100},
            {prop: 'needleCode', label: '单双针', width: 100},
            {prop: 'barCode', label: '条形码', width: 150},
            {prop: 'createTime', label: '创建时间', minWidth: 150}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
            this.loadTabs()
          },
          rowDblclick: (row, event) => {
            let arr = this.formdata.stationCode.split('-')
            this.station.chej = arr[0]
            this.station.lie = arr[1]
            this.station.wei = arr[2]
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
      tabClick(tab) {
        this.tabValue = tab.name
        this.loadTabs()
      },
      loadTabs() {
        if (this.formdata.stationCode) {
          if (this.tabValue === 'record') {
            this.$refs.record.reload(this.formdata.stationCode)
          } else if (this.tabValue === 'error') {
            this.$refs.error.reload(this.formdata.stationCode)
          }
        }
      },
      getData(query) {
        api.station.paged(query).then(data => {
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
              this.$refs.form2[0].resetFields()
              this.formdata = {...CONTROLLER.FORM_DATA}
              this.station = {...CONTROLLER.STATION_DATA}
              this.getWorkshopList()
              this.getDefault().then(data => {
                if (data[0].id) {
                  this.formdata.stationTypeName = data[0].name
                  this.formdata.stationTypeId = data[0].id
                }
                this.formdata.stockingsCode = data[1].stockingsCode
                this.formdata.needleNumber = data[1].needleNumber
                this.formdata.needleCode = data[1].needleCode
                this.formdata.modelNameName = data[1].modelName
                this.formdata.modelNameId = data[1].id
              })
            })
          },
          btnEdit: (row) => {
            this.formdata = {...row}
            let arr = this.formdata.stationCode.split('-')
            this.station.chej = arr[0]
            this.station.lie = arr[1]
            this.station.wei = arr[2]
            this.$refs.window.open()
          },
          btnDelete: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$confirm(`是否删除机台:${this.formdata.stationCode}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.station.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnModelDataChange: (row) => {
            this.$refs.modeldata.open(row, 'form')
          },
          btnLook: (row) => {
            this.$refs.stationvalue.open(row)
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$refs.form2[0].validate((valid) => {
              if (valid) {
                this.formdata.stationCode = Object.keys(this.station).map(key => this.station[key]).join('-')
                if (!this.formdata.id) {
                  api.station.add(this.formdata).then(() => {
                    this.$message({
                      message: '新增成功!',
                      type: 'success'
                    })
                    this.getData(this.query)
                    this.$refs.window.cancel()
                  })
                } else {
                  api.station.update(this.formdata).then(() => {
                    this.$message({
                      message: '编辑成功!',
                      type: 'success'
                    })
                    this.getData(this.query)
                    this.$refs.window.cancel()
                  })
                }
              }
            })
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
      getWorkshopList() {
        api.workshop.paged({
          page: 1,
          pageSize: 999
        }).then(data => {
          this.workshopList = data.records.map(d => ({
            name: d.name,
            id: d.id
          }))
        })
      },
      getDefault() {
        return Promise.all([api.stationType.getDefault(), api.modelName.getDefault()]).then(result => {
          return result
        })
      },
      chejChange() {
        if (this.workshopList.some(w => {
            return this.station.chej === w.name.toString()
          })) {
          this.workshopList.forEach(ws => {
            if (ws.name.toString() === this.station.chej) {
              this.formdata.workshopName = ws.name
              this.formdata.workshopId = ws.id
            }
          })
        }
      },
      formFunctions(val, method) {
        let funs = {
          barCode: {
            suffixClick: () => {
              this.$refs.barCode.open('form')
            }
          },
          modelNameName: {
            suffixClick: () => {
              this.$refs.modelname.open('form')
            }
          },
          stationTypeName: {
            suffixClick: () => {
              this.$refs.stationtype.open('form')
            }
          },
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
          openBarCodeChose: () => {
            this.$refs.barCode.open('search')
          },
          openStationTypeChose: () => {
            this.$refs.stationtype.open('search')
          },
          openModelNameChose: () => {
            this.$refs.modelname.open('search')
          },
          search: (keyword) => {
            this.query.page = 1
            this.query.barCode = keyword.barCode
            this.query.stationName = keyword.stationName
            this.query.stationCode = keyword.stationCode
            this.query.stationTypeId = keyword.stationTypeId
            this.query.modelNameId = keyword.modelNameId
            this.query.workshopId = keyword.workshopId
            this.getData(this.query)
          }
        }
        funs[method].call(this, keyword)
      }
    },
    created() {
      this.$on('barCode', (node, from) => {
        // console.log(node)
        if (from === 'form') {
          this.formdata.barCode = node.barCode
        } else if (from === 'search') {
          this.SEARCH_DATA.barCode = node.barCode
        }
      })
      this.$on('stationType', (node, from) => {
        // console.log(node)
        if (from === 'form') {
          this.formdata.stationTypeId = node.id
          this.formdata.stationTypeName = node.name
        } else if (from === 'search') {
          this.SEARCH_DATA.stationTypeId = node.id
          this.SEARCH_DATA.stationTypeName = node.name
        }
      })
      this.$on('modelName', (node, from) => {
        if (from === 'form') {
          this.formdata.modelNameId = node.id
          this.formdata.modelNameName = node.modelName
          this.formdata.stockingsCode = node.stockingsCode
          this.formdata.needleNumber = node.needleNumber
          this.formdata.needleCode = node.needleCode
        } else if (from === 'search') {
          this.SEARCH_DATA.modelNameId = node.id
          this.SEARCH_DATA.modelNameName = node.modelName
        }
      })
      this.$on('workshop', (node, from) => {
        if (from === 'form') {
          this.formdata.workshopId = node.id
          this.formdata.workshopName = node.name
        } else if (from === 'search') {
          this.SEARCH_DATA.workshopId = node.id
          this.SEARCH_DATA.workshopName = node.name
        }
      })
    },
    mounted() {
      this.getData(this.query)
      this.getWorkshopList()
    },
    watch: {}
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

  /deep/ .el-tabs__item
    width: 100px
    text-align: center

  /deep/ .el-tabs__content
    height: calc(100% - 41px)

  /*.eui-table*/
  /*height: 100%*/
  /*position: absolute*/
</style>
