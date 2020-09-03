<template>
  <div>
    <eui-layout :regions="REGIONS" v-loading="loading">
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
        <el-table-column label="操作" align="center" minWidth="150" fixed="right">
          <template slot-scope="scope">
            <template v-for="(btn, index) in helper.getTableButtons(buttons, tableButtons)">
              <el-button
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
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import {TYPE} from './card.config'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import QrCodeShowMask from '@/app/header/QRcodeShowMask'
  export default {
    name: 'company-card-controller',
    _meta: {
      path: 'company/card/controller',
      title: '标签信息'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      SuperSearch,
      QrCodeShowMask
    },
    data() {
      return {
        helper,
        loading: false,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnQRcode'],
        REGIONS: TYPE.REGIONS,
        SEARCH_OPTIONS: TYPE.SEARCH_OPTIONS,
        query: {
          idNo: null,
          batchId: null,
          page: 1,
          pageSize: 10
        },
        showSearchform: false,
        windowOptions: {
          title: '标签信息',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'idNo', label: '标签编号', minWidth: 300},
            {prop: 'batchId', label: '导入批号', minWidth: 200},
            // {prop: 'equipmentCode', label: '设备编码', width: 200},
            {prop: 'productName', label: '关联产品', minWidth: 200},
            {prop: 'typeName', label: '标签类型', minWidth: 200},
            {prop: 'statusName', label: '标签状态', minWidth: 200},
            {prop: 'viewtimes', label: '查看次数', minWidth: 100},
            {prop: 'mobile', label: '所有人电话', minWidth: 150},
            {prop: 'owner', label: '标签所有人', minWidth: 100},
            {prop: 'qcUser', label: '质检员', minWidth: 100},
            {prop: 'qcTime', label: '质检时间', minWidth: 200},
            {prop: 'qcProductStyle', label: '产品款号', minWidth: 100},
            {prop: 'manufacturingDate', label: '生产日期', minWidth: 200},
            {prop: 'memo', label: '备注', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
          },
          rowDblclick: (row, event) => {
            this.$refs.window.open()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        },
        showQRcode: null
      }
    },
    methods: {
      getData(query) {
        api.companyCard.getCardPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {},
          btnEdit: (row) => {},
          btnDelete: (row) => {},
          btnQRcode: (row) => {
            this.showQRcode = row.qrcodeUrl
            this.$refs.qrcode.show()
          },
          btnBatchDetails: () => {
            this.$router.push({path: '/company/card/batchdetails'})
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      appendClick(value) {
        let funs = {
        }
        funs[value].call(this)
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.idNo = searchinfo.idNo
        this.query.batchId = searchinfo.batchId
        this.getData(this.query)
      }
    },
    mounted() {
      // this.getData(this.query)
    },
    created() {
      this.$on('reload', () => {
        this.getData(this.query)
      })
    },
    beforeRouteEnter(to, from, next) { // 为了查看详情时，搜索框内显示
      next(vm => {
        vm.query.page = 1
        vm.query.batchId = to.query.batchId || null
        vm.getData(vm.query)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
