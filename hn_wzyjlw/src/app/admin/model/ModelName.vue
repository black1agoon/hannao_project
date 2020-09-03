<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons)"
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
      <el-table-column label="是否默认" align="center" width="200">
        <template slot-scope="scope">
          <i :class="getStatus(scope.row.pretermission)"></i>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" minWidth="200" prop="createTime">
      </el-table-column>
      <el-table-column label="操作" width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-for="(btn, index) in helper.getTableButtons(buttons)"
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
        <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
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
  import {NAME} from './model.config'
  export default {
    name: 'model-name',
    _meta: {
      path: '/model/name',
      title: '模型名称'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        REGIONS: NAME.REGIONS,
        forminfo: {...NAME.FORM_INFO},
        formdata: {...NAME.FORM_DATA},
        formOptions: {...NAME.FORM_OPTIONS},
        rules: NAME.RULES,
        SEARCH_INFO: NAME.SEARCH_INFO,
        SEARCH_DATA: NAME.SEARCH_DATA,
        SEARCH_OPTIONS: NAME.SEARCH_OPTIONS,
        SEARCH_FUNS: NAME.SEARCH_FUNS,
        query: {
          modelName: null,
          modelCode: null,
          pretermission: null,
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '模型名称',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'modelName', label: '模型名称', width: 200},
            {prop: 'modelCode', label: '模型编码', width: 200, align: 'center'}
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
              this.formdata = {...NAME.FORM_DATA}
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
          btnSingleSearch: (arg) => {
            this.query.name = arg
            this.query.page = 1
            this.getData(this.query)
          },
          btnSingleSearchClear: () => {
            this.query.name = null
            this.getData(this.query)
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
      getStatus(status) {
        return status === 0 ? 'el-icon-close' : 'el-icon-check'
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
      }
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
