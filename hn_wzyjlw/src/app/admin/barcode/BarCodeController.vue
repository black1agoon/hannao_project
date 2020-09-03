<template>
  <div>
    <eui-layout :regions="REGIONS" v-loading="loading">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
        @click="onBtnClick">
        <eui-search
          :show="showSearchform"
          :formOptions="BARCODE_SEARCH_OPTIONS"
          :forminfo="BARCODE_SEARCH_INFO"
          :formdata.sync="BARCODE_SEARCH_DATA"
          @search="(keyword) => {searchFunctions('search', keyword)}">
        </eui-search>
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
  import {BARCODE} from './barcode.config'
  import EuiSearch from '@/components/common/form/EuiSearch'
  import ImportTemplate from './barcode/ImportTemplate'
  export default {
    name: 'barcode-controller',
    _meta: {
      path: '/barcode/controller',
      title: '条码信息'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch,
      ImportTemplate
    },
    data() {
      return {
        helper,
        loading: false,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnQRcode'],
        REGIONS: BARCODE.REGIONS,
        FORM_INFO: BARCODE.FORM_INFO,
        formdata: {...BARCODE.FORM_DATA},
        rules: BARCODE.RULES,
        formOptions: BARCODE.FORM_OPTIONS,
        BARCODE_SEARCH_INFO: BARCODE.SEARCH_INFO,
        BARCODE_SEARCH_DATA: BARCODE.SEARCH_DATA,
        BARCODE_SEARCH_OPTIONS: BARCODE.SEARCH_OPTIONS,
        query: {
          barCode: null,
          batch: null,
          page: 1,
          pageSize: 10
        },
        showSearchform: false,
        windowOptions: {
          title: '条码信息',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'barCode', label: '条码名称', width: 200},
            {prop: 'batch', label: '导入批号', width: 400},
            {prop: 'createTime', label: '创建日期', width: 200}
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
        }
      }
    },
    methods: {
      getData(query) {
        api.barCode.getBarCodePaged(query).then(data => {
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
              this.formdata = {...BARCODE.FORM_DATA}
            })
          },
          btnEdit: (arg) => {
            this.formdata = {...arg}
            this.$refs.window.open()
          },
          btnDelete: (arg) => {
            this.formdata = JSON.parse(JSON.stringify(arg))
            this.$confirm(`是否删除该条码？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.barCode.deleteBarCode(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnImportTemplate: () => {
            this.$refs.importtemp.open()
          },
          btnBatchDetails: () => {
            this.$router.push({path: '/barcode/batchdetails'})
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
              api.barCode.addBarCode(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.barCode.updateBarCode(this.formdata).then(() => {
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
      searchFunctions(method, keyword) {
        let funs = {
          search: (keyword) => {
            this.query.page = 1
            this.query.barCode = keyword.barCode
            this.query.batch = keyword.batch
            this.getData(this.query)
          }
        }
        funs[method].call(this, keyword)
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
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.query.page = 1
        vm.query.batch = to.query.batch || null
        vm.BARCODE_SEARCH_DATA.batch = vm.query.batch
        vm.showSearchform = vm.query.batch !== null && vm.query.batch !== ''
        vm.showSearchform = !!vm.query.batch
        vm.getData(vm.query)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
