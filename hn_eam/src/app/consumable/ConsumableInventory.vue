<template>
  <eui-layout :regions="REGIONS">
    <!--<main-toolbar-->
        <!--slot="north"-->
        <!--:buttons="helper.getMainFilterButtons(buttons)"-->
        <!--@click="onBtnClick">-->
      <!--<div class="table-handle">-->
      <!--</div>-->
    <!--</main-toolbar>-->
    <div class="btn-wrapper" slot="north">
      <eui-input
          class="warehouse"
          type="select"
          :clearable="true"
          placeholder="全部仓库"
          :options="warehouseOptions"
          v-model="query.warehouseId">
      </eui-input>
      <el-button
          round
          type="default"
          size="mini"
          @click="onBtnClick('btnExport')">
        导出
      </el-button>
      <super-search
          ref="supersearch"
          :options="searchOptions"
          @tagsChange="tags => {this.tags = tags}"
          @superSearch="superSearch"
          style="float: right;margin-right: 10px">
      </super-search>
      <super-search-tags
          class="searchtabs"
          @emptySearch="emptySearch"
          :tags="tags">
      </super-search-tags>
    </div>
    <eui-table
        slot="center"
        ref="table"
        :showIndex="false"
        :highlight-current-row="false"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
    </eui-table>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiInput from '@/components/common/form/EuiInput'
  import {INVENTORY} from './consumable.config'
  import config from '@/config'
  import fileDownload from 'js-file-download'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import SuperSearchTags from '@/components/common/tools/SuperSearchTags'
  export default {
    name: 'consumable-inventory',
    _meta: {
      path: '/agency/consumable/inventory',
      title: '即时库存'
    },
    mixins: [TabPane],
    components: {
      EuiTable,
      EuiLayout,
      EuiInput,
      SuperSearch,
      SuperSearchTags
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        REGIONS: INVENTORY.REGIONS,
        buttons: helper.getMainButtons(),
        tags: [],
        query: {
          agencyId: 1,
          barCode: null,
          consumableCode: null,
          consumableName: null,
          consumableType: null,
          lowerLimit: null,
          model: null,
          page: 1,
          pageSize: 10,
          price: null,
          quantity: null,
          totalPrice: null,
          typeCode: null,
          unit: null,
          upperLimit: null,
          warehouseId: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'typeCode', label: '分类编号', minWidth: 100, align: 'center'},
            {prop: 'typeName', label: '分类名称', minWidth: 100, align: 'center'},
            {prop: 'consumableCode', label: '物料编码', minWidth: 100, align: 'center'},
            {prop: 'consumableName', label: '物料名称', minWidth: 100, align: 'center'},
            {prop: 'barCode', label: '物料条码', minWidth: 100, align: 'center'},
            {prop: 'model', label: '规格型号', minWidth: 100, align: 'center'},
            {prop: 'unit', label: '单位', minWidth: 100, align: 'center'},
            {prop: 'warehouseIdName', label: '所在仓库', minWidth: 100, align: 'center'},
            {prop: 'quantity', label: '数量', minWidth: 100, align: 'center'},
            {prop: 'price', label: '平均单价', minWidth: 100, align: 'center'},
            {prop: 'totalPrice', label: '总金额', minWidth: 100, align: 'center'},
            {prop: 'lowerLimit', label: '安全库存下限', minWidth: 100, align: 'center'},
            {prop: 'upperLimit', label: '安全库存上限', minWidth: 100, align: 'center'}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        },
        warehouseOptions: [],
        searchOptions: {
          width: 700,
          fieldSearch: [{
            placeholder: '分类编号',
            value: 'typeCode'
          }, {
            placeholder: '物料编码',
            value: 'consumableCode'
          }, {
            placeholder: '物料名称',
            value: 'consumableName'
          }, {
            placeholder: '物料条码',
            value: 'barCode'
          }, {
            placeholder: '规格型号',
            value: 'model'
          }, {
            placeholder: '单位',
            value: 'unit'
          }, {
            placeholder: '数量',
            value: 'quantity'
          }, {
            placeholder: '平均单价',
            value: 'price'
          }, {
            placeholder: '总金额',
            value: 'totalPrice'
          }, {
            placeholder: '安全库存上限',
            value: 'upperLimit'
          }, {
            placeholder: '安全库存下限',
            value: 'lowerLimit'
          }],
          conditionSearch: [
            {
              placeholder: '请选择物料分类',
              value: 'consumableType',
              type: 'treeselect',
              options: []
            }, {
              placeholder: '所在仓库',
              value: 'warehouseId',
              type: 'select',
              options: []
            }
          ]
        }
      }
    },
    methods: {
      getData(query) {
        api.consumableInventory.paged(query).then(data => {
          this.tableOptions.data = data.records.map(d => Object.assign(d, d.consumableDtoList[0]))
          this.tableOptions.total = data.total
        })
      },
      getWarehouseData() {
        api.consumableWarehouse.paged({
          page: 1,
          pageSize: 999
        }).then(data => {
          this.warehouseOptions = this.searchOptions.conditionSearch.find(cond => cond.value === 'warehouseId').options = data ? data.records.map(d => ({
            label: d.warehouseName,
            value: d.id
          })) : []

        })
      },
      getTreeselectData() {
        return api.consumableType.getTypeTree().then(data => {
          this.searchOptions.conditionSearch.find(cond => cond.value === 'consumableType').options = helper.getTreeData(data, 'consumableTypeDtoList', 'typename')
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnExport: () => {
            // window.open(this.serverURI + api.consumable.exportAll())
            api.consumableInventory.exportWh(this.query.warehouseId).then(res => {
              // console.log(res)
              let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
              fileDownload(blob, '即时库存.xls')
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      reload() {
        this.getData(this.query)
      },
      superSearch(searchinfo) {
        this.query.barCode = searchinfo.barCode
        this.query.consumableCode = searchinfo.consumableCode
        this.query.consumableName = searchinfo.consumableName
        this.query.consumableType = searchinfo.consumableType
        this.query.model = searchinfo.model
        this.query.lowerLimit = searchinfo.lowerLimit
        this.query.price = searchinfo.price
        this.query.quantity = searchinfo.quantity
        this.query.totalPrice = searchinfo.totalPrice
        this.query.typeCode = searchinfo.typeCode
        this.query.unit = searchinfo.unit
        this.query.upperLimit = searchinfo.upperLimit
        this.query.warehouseId = searchinfo.warehouseId
        this.reload()
      },
      emptySearch(tagname) {
        this.$refs.supersearch.emptyValue(tagname)
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData(vm.query)
        vm.getWarehouseData()
        vm.getTreeselectData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.btn-wrapper
  padding: 10px
  .warehouse
    width: 200px
    margin-right: 10px
</style>

