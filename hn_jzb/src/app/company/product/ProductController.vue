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
          <el-table-column label="产品信息" align="center" width="200" >
            <template slot-scope="scope">
              <div class="pr-wrap">
                <div class="pr-left">
                  <img
                    v-if="helper.getImgUrl(scope.row.thumb)"
                    :src="helper.getImgUrl(scope.row.thumb)"
                    @click="showBigpic(helper.getImgUrl(scope.row.thumb))"
                    class="logo"/>
                </div>
                <div class="pr-right">
                  <div>
                    <p>
                      <span>名称:</span><a :href="scope.row.buyUrl" target="_blank">&nbsp;{{scope.row.name}}</a>
                    </p>
                    <p>
                      <span>状态: </span>
                      <span :style="{color: getStatus(scope.row.status).color}">{{getStatus(scope.row.status).status}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="操作" align="center" :width="tableButtons.length * 100 + 'px'" fixed="right">
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
    <product-brand-chose-window ref="brandWindow">
    </product-brand-chose-window>
    <product-import ref="productimport">
    </product-import>
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
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import {PRODUCT} from './product.config'
  import ProductBrandChoseWindow from '@/app/company/common/ProductBrandChoseWindow'
  import ProductImport from './product/ProductImport'
  import QrCodeShowMask from '@/app/header/QRcodeShowMask'
  const REGIONS = {
    north: {},
    center: {}
  }
  export default {
    name: 'company-product-controller',
    _meta: {
      path: '/company/product/controller',
      title: '产品信息'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      CreateBarCode,
      SuperSearch,
      ProductBrandChoseWindow,
      ProductImport,
      QrCodeShowMask
    },
    data() {
      return {
        helper,
        REGIONS,
        SEARCH_OPTIONS: PRODUCT.SEARCH_OPTIONS,
        formdata: {},
        query: {
          name: null,
          status: null,
          brandId: null,
          brandName: null,
          page: 1,
          pageSize: 10
        },
        buttons: helper.getMainButtons(),
        tableButtons: ['btnCopy', 'btnBatchImport', 'btnOnShelve', 'btnUnShelve', 'btnQRcode'],
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'brandName', label: '商家品牌', minWidth: 150},
            {prop: 'modelNo', label: '规格', minWidth: 100},
            {prop: 'price', label: '价格', minWidth: 100},
            {prop: 'productNo', label: '产品编号', minWidth: 150},
            {prop: 'viewtimes', label: '查看次数', minWidth: 100},
            {prop: 'createTime', label: '创建时间', minWidth: 200},
            {prop: 'sourceName', label: '来源', minWidth: 100},
            {prop: 'seq', label: '排序', minWidth: 100, sortable: true}
          ],
          rowClick: (row, event, column) => {
            this.formdata = JSON.parse(JSON.stringify(row))
          },
          rowDblclick: (row, event) => {
            if (this.formdata.id) {
              this.$router.push({
                path: '/company/product/infoform',
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
        api.companyProduct.getProductPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$router.push({
              path: '/company/product/infoform',
              query: {
                id: null
              }
            })
          },
          btnEdit: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$router.push({
              path: '/company/product/infoform',
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
              api.companyProduct.deleteProduct(this.formdata.id).then(() => {
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
              api.companyProduct.OnShelve({
                productIdList: [row.id]
              }).then(() => {
                row.status = 1
                this.$notify({
                  title: '',
                  message: '上架成功',
                  type: 'success'
                })
              })
            }).catch(() => {
            })
          },
          btnUnShelve: (row) => {
            this.$confirm(`是否下架:${row.name}？`, '提示', {
              iconClass: 'el-icon-question'
            }).then(() => {
              api.companyProduct.UnShelve({
                productIdList: [row.id]
              }).then(() => {
                row.status = 0
                this.$notify({
                  title: '',
                  message: '下架成功',
                  type: 'success'
                })
              })
            }).catch(() => {
            })
          },
          btnBatchImportProduct: () => {
            this.$refs.productimport.open()
          },
          btnQRcode: () => {
            this.showQRcode = row.qrcodeUrl
            this.$refs.qrcode.show()
          },
          btnCopy: (row) => {
            this.$router.push({
              path: '/company/product/infoform',
              query: {
                id: row.id,
                ac: 'copy'
              }
            })
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
      appendClick(value) {
        let funs = {
          brandName: () => {
            this.$refs.brandWindow.open()
          }
        }
        funs[value].call(this)
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.name = searchinfo.name
        this.query.brandId = searchinfo.brandId
        this.query.status = searchinfo.status
        this.getData(this.query)
      }
    },
    beforeRouteLeave(to, from, next) {
      // console.log(to, from)
      // to.meta.title = '企业新增'
      next()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
      })
    },
    created() {
      this.$on('reload', () => {
        this.getData(this.query)
      })
      this.$on('brandChose', (node) => {
        this.query.brandName = node.name
        this.query.brandId = node.id
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
