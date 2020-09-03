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
        <el-table-column label="操作" minWidth="200" align="center" fixed="right">
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
      <eui-window ref="window"
                  :options="windowOptions">
        <el-form class="clearfix" ref="form" :model="formdata" label-width="100px" :rules="rules" style="padding: 20px">
          <el-col :sm="24" v-for="(item, index) in FORM_INFO" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <eui-input v-model="formdata[item.value]"
                         :type="item.type"
                         :readonly="item.readonly"
                         :suffixIcon="item.suffixIcon"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize">
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
    <import-template ref="importtemp">
    </import-template>
    <company-chose-window ref="companyWindow">
    </company-chose-window>
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
  import ImportTemplate from './card/ImportTemplate'
  import CompanyChoseWindow from '@/app/admin/common/CompanyChoseWindow'
  import QrCodeShowMask from '@/app/header/QRcodeShowMask'
  export default {
    name: 'card-controller',
    _meta: {
      path: '/card/controller',
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
      ImportTemplate,
      CompanyChoseWindow,
      QrCodeShowMask
    },
    data() {
      return {
        helper,
        loading: false,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnQRcode'],
        REGIONS: TYPE.REGIONS,
        FORM_INFO: TYPE.FORM_INFO,
        formdata: {...TYPE.FORM_DATA},
        rules: TYPE.RULES,
        formOptions: TYPE.FORM_OPTIONS,
        SEARCH_OPTIONS: TYPE.SEARCH_OPTIONS,
        query: {
          idNo: null,
          batchId: null,
          companyId: null,
          companyName: null,
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '标签信息',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'idNo', label: '标签编号', width: 300},
            {prop: 'batchId', label: '导入批号', width: 200},
            {prop: 'productName', label: '关联产品', width: 200},
            {prop: 'companyName', label: '所属企业', width: 200},
            // {prop: 'equipmentCode', label: '设备编码', width: 200},
            {prop: 'typeName', label: '标签类型', width: 200},
            {prop: 'statusName', label: '标签状态', width: 200},
            {prop: 'viewtimes', label: '查看次数', width: 100, align: 'center'},
            {prop: 'mobile', label: '所有人电话', width: 200},
            {prop: 'owner', label: '标签所有人', width: 200},
            {prop: 'qcUser', label: '质检员', width: 100},
            {prop: 'qcTime', label: '质检时间', width: 200},
            {prop: 'qcProductStyle', label: '产品款号', width: 100},
            {prop: 'manufacturingDate', label: '生产日期', width: 200},
            {prop: 'memo', label: '备注', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
          },
          rowDblclick: (row, event) => {
            // this.$refs.window.open()
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
        api.card.getCardPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
            this.$nextTick(() => {
              this.$refs.form.resetFields()
              this.formdata = {...TYPE.FORM_DATA}
            })
          },
          btnEdit: (arg) => {
            this.formdata = {...arg}
            this.$refs.window.open()
          },
          btnDelete: (arg) => {
            this.formdata = JSON.parse(JSON.stringify(arg))
            this.$confirm(`是否删除该标签？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.card.deleteCard(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnSingleSearch: (arg) => {
            this.query.name = arg
            this.query.page = 1
            this.getData(this.query)
          },
          btnSingleSearchClear: () => {
            this.query.name = null
            this.getData(this.query)
          },
          btnImportTemplate: () => {
            this.$refs.importtemp.open()
          },
          btnBatchDetails: () => {
            this.$router.push({path: '/card/batchdetails'})
          },
          btnQRcode: (arg) => {
            this.showQRcode = arg.qrcodeUrl
            this.$refs.qrcode.show()
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
            } else {
              api.card.updateCard(this.formdata).then(() => {
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
      appendClick(value) {
        let funs = {
          companyName: () => {
            this.$refs.companyWindow.open('search')
          }
        }
        funs[value].call(this)
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.idNo = searchinfo.idNo
        this.query.batchId = searchinfo.batchId
        this.query.companyId = searchinfo.companyId
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
      this.$on('checkedNode', (node, from) => {
        if (from === 'form') {
        } else if (from === 'search') {
          this.query.companyName = node.cnName
          this.query.companyId = node.id
        }
      })
    },
    beforeRouteEnter(to, from, next) {
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
