<template>
  <div>
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tabsButtons.concat(tableButtons))"
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
        @fieldClick="tableOptions.fieldClick"
        @reloadTable="tableOptions.reload">
        <el-table-column label="采购数(双)/计划生产(双)" width="150">
          <template slot-scope="scope">
            {{scope.row.shipmentNumber}}/{{scope.row.prospectusNumber}}
          </template>
        </el-table-column>
        <el-table-column label="已分配(双)/已生产(双)">
          <template slot-scope="scope">
            {{scope.row.distributionNumber}}/{{scope.row.productionNumber}}
          </template>
        </el-table-column>
        <el-table-column label="计划开始时间" prop="startDateStr">
        </el-table-column>
        <el-table-column label="交货日期" prop="deliveryDate">
        </el-table-column>
        <el-table-column label="操作" minWidth="150" align="center" fixed="right">
          <template slot-scope="scope">
            <template v-for="(btn, index) in helper.getTableButtons(buttons, tableButtons)">
              <el-button
                v-if="btn.btnKey === 'btnProduction'"
                v-show="scope.row.state === 0"
                :key="index"
                size="mini"
                type="text"
                @click="onBtnClick(btn.btnKey, scope.row)">
                <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
              </el-button>
              <el-button
                v-else-if="btn.btnKey === 'btnCancel'"
                v-show="scope.row.state === 1"
                :key="index"
                size="mini"
                type="text"
                @click="onBtnClick(btn.btnKey, scope.row)">
                <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
              </el-button>
              <el-button
                v-else
                :key="index"
                size="mini"
                type="text"
                @click="onBtnClick(btn.btnKey, scope.row)">
                <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </eui-table>
      <el-tabs slot="south"
               type="card"
               :value="tabValue"
               @tab-click="tabClick"
               style="height: 100%">
        <el-tab-pane label="明细" name="detail">
          <detail-list
            :buttons="helper.getTabsTableButtons(buttons, 'detail')"
            :workshopOrderId="formdata.id"
            :data-list="detailList"
            @reload="reloadQuery"
            @reloadParent="reload">
          </detail-list>
        </el-tab-pane>
        <el-tab-pane label="生产用料" name="materia">
          <material-list
            :buttons="helper.getTabsTableButtons(buttons, 'material')"
            :workshopOrderId="formdata.id"
            :data-list="materialList"
            @reload="reloadQuery">
          </material-list>
        </el-tab-pane>
        <el-tab-pane label="成品工艺" name="product">
          <product-list
            :workshopOrderId="formdata.id"
            :data-list="productList"
            @reload="reloadQuery">
          </product-list>
        </el-tab-pane>
        <el-tab-pane label="落机工艺" name="deplane">
          <deplane-list
            :workshopOrderId="formdata.id"
            :data-list="deplaneList"
            @reload="reloadQuery">
          </deplane-list>
        </el-tab-pane>
        <el-tab-pane label="样品图例" name="image">
          <image-list
            :workshopOrderId="formdata.id"
            :data-list="imageList"
            @reload="reloadQuery">
          </image-list>
        </el-tab-pane>
      </el-tabs>
      <eui-window ref="window"
                  :options="windowOptions">
        <el-form class="clearfix" ref="form" :model="formdata" label-width="110px" :rules="rules" style="padding: 20px">
          <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <eui-input v-model="formdata[item.value]"
                         :disabled="(item.value === 'jobNumber' || item.value === 'username') && editflag"
                         :type="item.type"
                         :readonly="item.readonly"
                         :suffixIcon="item.suffixIcon"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize"
                         @suffixClick="formFunctions(item.value, 'suffixClick')">>
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
    <work-shop-order-import ref="orderimport">
    </work-shop-order-import>
    <excel-window ref="excelWindow">
    </excel-window>
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
  import {ORDER} from './work.config'
  import WorkShopChoseWindow from '../common/WorkShopChoseWindow'
  import WorkShopOrderImport from './work/WorkShopOrderImport'
  import DetailList from './work/DetailList'
  import MaterialList from './work/MaterialList'
  import ImageList from './work/ImageList'
  import ProductList from './work/ProductList'
  import DeplaneList from './work/DeplaneList'
  import ExcelWindow from './work/ExcelWindow'
  export default {
    name: 'work-shop-order-controller',
    _meta: {
      path: '/workshop/order',
      title: '车间订单'
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
      WorkShopOrderImport,
      DetailList,
      MaterialList,
      ImageList,
      ProductList,
      DeplaneList,
      ExcelWindow
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        tabsButtons: ['btndetailAdd', 'btndetailEdit', 'btndetailDelete', 'btndetailCopy', 'btnmaterialAdd', 'btnmaterialEdit', 'btnmaterialDelete'],
        tableButtons: ['btnProduction', 'btnCancel'],
        REGIONS: ORDER.REGIONS,
        forminfo: {...ORDER.FORM_INFO},
        formdata: {...ORDER.FORM_DATA},
        formOptions: {...ORDER.FORM_OPTIONS},
        SEARCH_INFO: ORDER.SEARCH_INFO,
        SEARCH_DATA: ORDER.SEARCH_DATA,
        SEARCH_OPTIONS: ORDER.SEARCH_OPTIONS,
        SEARCH_FUNS: ORDER.SEARCH_FUNS,
        rules: ORDER.RULES,
        query: {
          orderNumber: null,
          workshopId: null,
          state: null,
          page: 1,
          pageSize: 10
        },
        tabValue: 'detail',
        editflag: false,
        windowOptions: {
          title: '订单信息',
          width: '480px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'orderNumber', label: '订单编号', click: true},
            {prop: 'taskNumber', label: '任务单号', width: 100, align: 'center'},
            // {prop: 'articleNumber', label: '货号', width: 100},
            {prop: 'workshopName', label: '所属车间'},
            {prop: 'stateName', label: '订单状态'},
            {prop: 'isSameExitName', label: '是否缝头'}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
            this.getOrderQuery()
          },
          rowDblclick: (row, event) => {
            this.$refs.excelWindow.open(row)
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          },
          fieldClick: (row) => {
            this.$refs.excelWindow.open(row)
          }
        },
        detailList: [],
        materialList: [],
        productList: {},
        deplaneList: {
          names: [],
          sizes: [],
          values: []
        },
        imageList: []
      }
    },
    methods: {
      getData(query) {
        api.workshopOrder.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnAdd: () => {
            this.editflag = false
            this.$refs.window.open()
            this.$nextTick(() => {
              this.$refs.form.resetFields()
              this.formdata = {...ORDER.FORM_DATA}
            })
          },
          btnEdit: (arg) => {
            this.editflag = true
            this.formdata = {...arg}
            this.$refs.window.open()
          },
          btnDelete: (arg) => {
            this.formdata = {...arg}
            this.$confirm(`是否删除订单:${this.formdata.orderNumber}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.workshopOrder.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnOrderImport: () => {
            this.$refs.orderimport.open()
          },
          btnProduction: (arg) => {
            this.$confirm(`是否下发订单:${arg.orderNumber}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.workshopOrder.production(arg.id).then(() => {
                this.$message({
                  message: '下发成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnCancel: (arg) => {
            this.$confirm(`是否取消下发:${arg.orderNumber}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.workshopOrder.cancel(arg.id).then(() => {
                this.$message({
                  message: '取消成功!',
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
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.workshopOrder.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.workshopOrder.update(this.formdata).then(() => {
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
      tabClick(tab) {
        this.tabValue = tab.name
      },
      getOrderQuery() {
        api.workshopOrder.getQuery(this.formdata.id).then(data => {
          // console.log(data)
          this.detailList = data.detailList
          this.materialList = data.materialList
          this.imageList = data.imageList
          this.productList = data.productList
          this.deplaneList = data.deplaneList
        })
      },
      reloadQuery() {
        this.getOrderQuery()
      },
      reload() {
        this.getData(this.query)
      },
      searchFunctions(method, keyword) {
        let funs = {
          openWorkshopChose: () => {
            this.$refs.workshop.open('search')
          },
          search: (keyword) => {
            this.query.page = 1
            this.query.orderNumber = keyword.orderNumber
            this.query.state = keyword.state
            this.query.workshopId = keyword.workshopId
            this.getData(this.query)
          }
        }
        funs[method].call(this, keyword)
      }
    },
    mounted() {
      this.getData(this.query)
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
      this.$on('reload', () => {
        this.getData(this.query)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-tab-pane
    height: 100%

  /deep/ .el-tabs__content
    height: calc(100% - 41px)

  /deep/ .el-tabs__item
    width: 100px
    text-align: center
</style>
