<template>
  <div>
    <eui-layout :regions="REGIONS">
      <div slot="north">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/product/category' }">{{categoryName}}</el-breadcrumb-item>
          <el-breadcrumb-item>产品属性</el-breadcrumb-item>
        </el-breadcrumb>
        <main-toolbar
          :buttons="helper.getMainFilterButtons(buttons)"
          @click="onBtnClick">
        </main-toolbar>
      </div>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <template slot="prev">
          <el-table-column label="属性名称" prop="name" align="center" width="200">
          </el-table-column>
          <el-table-column label="类型" prop="name" align="center" width="200">
            <template slot-scope="scope">{{getAttrType(scope.row.type)}}
            </template>
          </el-table-column>
        </template>
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
        <el-form class="clearfix" ref="form" :model="formdata" label-width="100px" :rules="rules"
                 style="padding: 20px 20px 20px 0">
          <el-col :sm="24" v-for="(item, index) in FORM_INFO" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <eui-input v-model="formdata[item.value]"
                         :type="item.type"
                         :readonly="item.readonly"
                         :suffixIcon="item.suffixIcon"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize"
                         :prepend="item.prepend"
                         :placeholder="item.placeholder"
                         :disabled="item.disabled"
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
  import {ATTR} from './product.config'

  export default {
    name: 'product-attr',
    _meta: {
      path: '/product/attr',
      title: '产品属性'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput
    },
    data() {
      return {
        helper,
        REGIONS: ATTR.REGIONS,
        FORM_INFO: ATTR.FORM_INFO,
        formdata: JSON.parse(JSON.stringify(ATTR.FORM_DATA)),
        CATEGORY_SEARCH_INFO: ATTR.SEARCH_INFO,
        CATEGORY_SEARCH_DATA: ATTR.SEARCH_DATA,
        CATEGORY_SEARCH_OPTIONS: ATTR.SEARCH_OPTIONS,
        CATEGORY_SEARCH_FUNS: ATTR.SEARCH_FUNS,
        rules: ATTR.RULES,
        buttons: helper.getMainButtons(),
        formOptions: ATTR.FORM_OPTIONS,
        categoryName: null,
        query: {
          page: 1,
          pageSize: 10,
          categoryId: null
        },
        windowOptions: {
          title: '属性信息',
          width: '25%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'seq', label: '排序', width: 100, sortable: true},
            {prop: 'options', label: '分类名称', minWidth: 400}
          ],
          rowClick: (row, event, column) => {
            this.formdata = JSON.parse(JSON.stringify(row))
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
        api.productCategoryAttr.getAttrPaged(query).then(data => {
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
              this.formdata = JSON.parse(JSON.stringify(ATTR.FORM_DATA))
            })
          },
          btnEdit: (row) => {
            this.$refs.window.open()
            this.formdata = JSON.parse(JSON.stringify(row))
            this.formdata.options = this.formdata.options.replace(/(,)|(，)/g, '\n')
          },
          btnDelete: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.productCategoryAttr.deleteAttr(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            })
              .catch(() => {
              })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          this.formdata.categoryId = this.query.categoryId
          if (valid) {
            let params = JSON.parse(JSON.stringify(this.formdata))
            params.options = params.options ? params.options.replace(/\n/g, ',') : params.options
            if (!this.formdata.id) {
              api.productCategoryAttr.addAttr(params).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              }).catch(() => {
              })
            } else {
              api.productCategoryAttr.updateAttr(params).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              }).catch(() => {
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
      getAttrType(type) {
        return type === 1 ? '手动录入' : '列表选择'
      },
      formFunctions(val, method) {
        let funs = {
          companyName: {
            suffixClick: () => {
              this.$refs.companyWindow.open('form')
            }
          }
        }
        funs[val][method].call(this)
      }
    },
    created() {
    },
    mounted() {
    },
    watch: {
      'formdata.type'() {
        this.FORM_INFO.find(item => {
          return item.value === 'options'
        }).disabled = this.formdata.type === 1
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.query.categoryId = to.query.id
        vm.categoryName = to.query.attrName
        vm.getData(vm.query)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-breadcrumb
    padding: 10px 0 5px 10px

  /deep/ .el-dialog__body
    padding: 30px 0
</style>
