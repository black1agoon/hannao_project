<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons, mainfilterButtons.concat(switchButtons))"
      @click="onBtnClick">
      <eui-search
        :formOptions="SEARCH_OPTIONS"
        :forminfo="SEARCH_INFO"
        :formdata.sync="SEARCH_DATA"
        :formfunctions="SEARCH_FUNS"
        @search="(keyword) => {searchFunctions('search', keyword)}">
      </eui-search>
    </main-toolbar>
    <eui-table
      slot="center"
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column v-if="getSwitchButton.name" :label="getSwitchButton.memo" align="center" fixed="right">
        <template slot-scope="scope">
          <el-switch :value="Boolean(scope.row.pretermission)"
                     @change="setDefault(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" minWidth="200" prop="createTime">
      </el-table-column>
      <el-table-column label="操作" width="200" align="center" fixed="right">
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
    <eui-layout slot="south" :regions="REGIONS2">
      <model-data slot="west"
                  ref="modeldata"
                  class="south-table"
                  @modeldetail="reloadModelDetail"
                  @modeldetailOpenWindow="openWindowModelDetail"
                  :buttons="helper.getTableButtonsByKeys(buttons, dataTableButtons)">
      </model-data>
      <model-detail slot="center"
                    ref="modeldetail"
                    class="south-table"
                    :buttons="helper.getTableButtonsByKeys(buttons, detailTableButtons)">
      </model-detail>
    </eui-layout>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="clearfix" ref="form" :model="formdata" label-width="100px" :rules="rules" style="padding: 20px">
        <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <eui-input v-model="formdata[item.value]"
                       :type="item.type"
                       :multiple="item.multiple"
                       :placeholder="item.placeholder"
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
  import {CONTROLLER} from './model.config'
  import ModelData from './ModelData'
  import ModelDetail from './ModelDetail'

  export default {
    name: 'model-controller',
    _meta: {
      path: '/model/controller',
      title: '机器型号'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch,
      ModelData,
      ModelDetail
    },
    computed: {
      getSwitchButton() {
        return this.buttons.find(btn => btn.btnKey === this.switchButtons[0]) || {}
      }
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        switchButtons: ['btnSetDefault'],
        mainfilterButtons: ['btndataAdd', 'btndataEdit', 'btndataDelete', 'btndetailAdd', 'btndetailEdit', 'btndetailDelete'],
        tableButtons: ['btndataAdd'],
        dataTableButtons: ['btndataEdit', 'btndataDelete', 'btndetailAdd'],
        detailTableButtons: ['btndetailEdit', 'btndetailDelete'],
        REGIONS: CONTROLLER.REGIONS,
        REGIONS2: CONTROLLER.REGIONS2,
        forminfo: {...CONTROLLER.FORM_INFO},
        formdata: {...CONTROLLER.FORM_DATA},
        formOptions: {...CONTROLLER.FORM_OPTIONS},
        rules: CONTROLLER.RULES,
        SEARCH_INFO: CONTROLLER.SEARCH_INFO,
        SEARCH_DATA: CONTROLLER.SEARCH_DATA,
        SEARCH_OPTIONS: CONTROLLER.SEARCH_OPTIONS,
        SEARCH_FUNS: CONTROLLER.SEARCH_FUNS,
        query: {
          modelName: null,
          modelCode: null,
          pretermission: null,
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '模型信息',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'modelName', label: '模型名称', width: 150},
            {prop: 'modelCode', label: '模型编码', width: 100, align: 'center'},
            {prop: 'stockingsCode', label: '袜型', width: 100},
            {prop: 'needleNumber', label: '针数', width: 100},
            {prop: 'needleCode', label: '单双针', width: 100}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
            this.$refs.modeldata.reload(this.formdata)
            this.$refs.modeldetail.setNullData()
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
        api.modelName.paged(query).then(data => {
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
              this.formdata = {...CONTROLLER.FORM_DATA}
            })
          },
          btnEdit: (arg) => {
            this.formdata = {...arg}
            this.$refs.window.open()
          },
          btnDelete: (arg) => {
            this.formdata = {...arg}
            this.$confirm(`是否删除:${this.formdata.modelName}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.modelName.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btndataAdd: (arg) => {
            this.$refs.modeldata.openWindow(arg)
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
              api.modelName.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.modelName.update(this.formdata).then(() => {
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
            this.query.modelName = keyword.modelName
            this.query.modelCode = keyword.modelCode
            this.query.pretermission = keyword.pretermission
            this.getData(this.query)
          }
        }
        funs[method].call(this, keyword)
      },
      reloadModelDetail(modeldata) {
        this.$refs.modeldetail.reload(modeldata)
      },
      openWindowModelDetail(modeldata) {
        this.$refs.modeldetail.openWindow(modeldata)
      },
      setDefault(row) {
        if (row.pretermission === 1) {
          this.$message({
            message: '该类型已是默认，请设置其他类型!',
            type: 'warning'
          })
        } else {
          api.modelName.setDefault(row.id).then(() => {
            this.$message({
              message: '设置默认成功!',
              type: 'success'
            })
            this.getData(this.query)
          })
        }
      }
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .south-table
    height: 100%
    position: relative
</style>
