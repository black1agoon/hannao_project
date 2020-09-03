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
        <template slot="prev">
          <el-table-column label="产品信息" width="200">
            <template slot-scope="scope">
              <div class="pr-wrap">
                <div class="pr-left">
                  <img v-if="helper.getImgUrl(scope.row.thumb)"
                       :src="helper.getImgUrl(scope.row.thumb)"
                       class="logo"
                       @click="showBigpic(helper.getImgUrl(scope.row.thumb))"/>
                </div>
                <div class="pr-right">
                  <div>
                    <p>
                      <span>名称:</span><a :href="scope.row.buyUrl" target="_blank" :title="scope.row.name">&nbsp;{{scope.row.name}}</a>
                    </p>
                    <p>
                      <span>状态: </span>
                      <span
                        :style="{color: getStatus(scope.row.status).color}">{{getStatus(scope.row.status).status}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" align="center" width="330" fixed="right">
          <template slot-scope="scope">
            <template v-for="(btn, index) in helper.getTableButtons(buttons, tableButtons)">
              <el-button
                v-if="btn.btnKey === 'btnOnShelve'"
                v-show="scope.row.status === 0 || scope.row.status === null || scope.row.status === 99"
                size="mini"
                type="text"
                :key="index"
                @click="onBtnClick(btn.btnKey, scope.row)">
                <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
              </el-button>
              <el-button
                v-else-if="btn.btnKey === 'btnUnShelve'"
                v-show="scope.row.status === 1"
                size="mini"
                type="text"
                :key="index"
                @click="onBtnClick(btn.btnKey, scope.row)">
                <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
              </el-button>
              <el-button
                v-else
                size="mini"
                type="text"
                :key="index"
                @click="onBtnClick(btn.btnKey, scope.row)">
                <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </eui-table>
    </eui-layout>
    <create-bar-code ref="barcode">
    </create-bar-code>
    <un-shelve-window ref="shelve" @reload="reload">
    </un-shelve-window>
    <product-import ref="productimport">
    </product-import>
    <company-chose-window ref="companyWindow">
    </company-chose-window>
    <product-brand-chose-window ref="brandWindow">
    </product-brand-chose-window>
    <pic-looking-mask
      ref="piclook"
      :src="showPicUrl">
    </pic-looking-mask>
    <qr-code-show-mask
      ref="qrcode"
      :src="showQRcode">
    </qr-code-show-mask>
  </div>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import CreateBarCode from './product/CreateBarCode'
  import UnShelveWindow from './product/UnShelveWindow'
  import ProductImport from './product/ProductImport'
  import EuiSearch from '@/components/common/form/EuiSearch'
  import CompanyChoseWindow from '@/app/admin/common/CompanyChoseWindow'
  import ProductBrandChoseWindow from '@/app/admin/common/ProductBrandChoseWindow'
  import QrCodeShowMask from '@/app/header/QRcodeShowMask'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import {PRODUCT} from './product.config'

  const REGIONS = {
    north: {},
    center: {}
  }
  export default {
    name: 'product-controller',
    _meta: {
      path: '/product/controller',
      title: '产品信息'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      CreateBarCode,
      UnShelveWindow,
      ProductImport,
      EuiSearch,
      CompanyChoseWindow,
      ProductBrandChoseWindow,
      QrCodeShowMask,
      SuperSearch
    },
    data() {
      return {
        helper,
        REGIONS,
        formdata: {},
        query: {
          name: null,
          typeId: null,
          brandId: null,
          brandName: null,
          companyId: null,
          companyName: null,
          status: null,
          page: 1,
          pageSize: 10
        },
        SEARCH_OPTIONS: PRODUCT.SEARCH_OPTIONS,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnBatchImport', 'btnOnShelve', 'btnUnShelve', 'btnQRcode'],
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'companyName', label: '所属公司', width: 200},
            {prop: 'brandName', label: '商家品牌', width: 200},
            {prop: 'typeName', label: '产品类型', width: 100},
            {prop: 'modelNo', label: '规格', width: 100, align: 'center'},
            {prop: 'price', label: '价格', width: 100, align: 'center'},
            {prop: 'productNo', label: '产品编号', width: 150, align: 'center'},
            {prop: 'viewtimes', label: '查看次数', width: 100, align: 'center'},
            {prop: 'createTime', label: '创建时间', width: 200, align: 'center'},
            {prop: 'sourceName', label: '来源', width: 100, align: 'center'},
            {prop: 'seq', label: '排序', width: 100, sortable: true},
            {prop: 'statusRelReasonIdName', label: '强制下架理由', minWidth: 200, align: 'center'}
          ],
          rowClick: (row, event, column) => {
            this.formdata = JSON.parse(JSON.stringify(row))
          },
          rowDblclick: (row, event) => {
            if (this.formdata.id) {
              this.$router.push({
                path: '/product/infoform',
                query: {
                  id: this.formdata.id
                }
              })
            }
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        },
        showPicUrl: null,
        showQRcode: null
      }
    },
    methods: {
      getData(query) {
        api.product.getProductPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getTypeData() {
        api.productType.getTypeTree().then((data) => {
          this.SEARCH_OPTIONS.conditionSearch.typeId.options = helper.getTreeData(data && data.length > 0 ? data : [], 'childProductTypeList', 'name')
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$router.push({
              path: '/product/infoform',
              query: {
                id: null
              }
            })
          },
          btnEdit: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$router.push({
              path: '/product/infoform',
              query: {
                id: this.formdata.id
              }
            })
          },
          btnDelete: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'el-icon-question'
            }).then(() => {
              api.product.deleteProduct(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnBatchImport: (row) => {
            this.$refs.barcode.open(row.id)
          },
          btnOnShelve: (row) => {
            this.$confirm(`是否上架:${row.name}？`, '提示', {
              iconClass: 'el-icon-question'
            }).then(() => {
              api.product.OnShelve({
                productIdList: [row.id]
              }).then(() => {
                this.$notify({
                  title: '',
                  message: '上架成功',
                  type: 'success'
                })
                this.reload()
              })
            }).catch(() => {
            })
          },
          btnUnShelve: (row) => {
            this.$refs.shelve.open(row)
          },
          btnBatchImportProduct: () => {
            this.$refs.productimport.open()
          },
          btnQRcode: (row) => {
            this.showQRcode = row.qrcodeUrl
            this.$refs.qrcode.show()
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getStatus(state) {
        if (state === 0) {
          return {
            status: '下架',
            color: 'red'
          }
        } else if (state === 1) {
          return {
            status: '上架',
            color: 'green'
          }
        } else if (state === 99) {
          return {
            status: '强制下架',
            color: '#ffaa71'
          }
        }
      },
      showBigpic(url) {
        this.showPicUrl = url
        this.$refs.piclook.show()
      },
      reload() {
        this.getData(this.query)
      },
      appendClick(value) {
        let funs = {
          brandName: () => {
            this.$refs.brandWindow.open()
          },
          companyName: () => {
            this.$refs.companyWindow.open()
          }
        }
        funs[value].call(this)
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.name = searchinfo.name
        this.query.typeId = searchinfo.typeId
        this.query.brandId = searchinfo.brandId
        this.query.status = searchinfo.status
        this.query.companyId = searchinfo.companyId
        this.getData(this.query)
      }
    },
    created() {
      this.$on('reload', () => {
        this.getData(this.query)
      })
      this.$on('checkedNode', (node, from) => {
        this.query.companyName = node.cnName
        this.query.companyId = node.id
      })
      this.$on('brandChose', (node) => {
        this.query.brandName = node.name
        this.query.brandId = node.id
      })
    },
    beforeRouteLeave(to, from, next) {
      next()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
        vm.getTypeData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog__body
    padding: 0

  .el-tabs--border-card
    box-shadow: none
    border-right: none

  .pr-wrap
    width: 100%
    display: flex
    .pr-left
      flex: 0 0 60px
      display: flex
      align-items: center
      /*justify-content: center*/
      .logo
        width: 50px
        height: 50px

    .pr-right
      flex: 1
      display: flex
      align-items: center
      p
        display: block
        text-align: left
</style>
