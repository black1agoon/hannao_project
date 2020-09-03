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

        <el-table-column label="审核状态" align="center" minWidth="200">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">待审核</span>
            <span v-else-if="scope.row.status === 1">审核通过</span>
            <span v-else-if="scope.row.status === 2">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" align="center" minWidth="100">
          <template slot-scope="scope">
            <i :class="['icon', getIsShow(scope.row.isShow)]"></i>
          </template>
        </el-table-column>
        <el-table-column label="描述" prop="catDesc" align="center" minWidth="200">
        </el-table-column>
        <el-table-column label="操作" minWidth="300" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="go2Attr(scope.$index, scope.row)">
              <i class="btn-icon fa fa-bars"></i>属性列表
            </el-button>
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
        <el-form class="clearfix" ref="form" :model="formdata" label-width="100px" :rules="rules"
                 style="padding: 20px 20px 20px 0">
          <el-col :sm="24" v-for="(item, index) in FORM_INFO" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <el-upload
                v-if="item.value === 'logo'"
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="formOptions.logo.uploadFile">
                <img v-if="helper.getImgUrl(formdata.logo)" :src="helper.getImgUrl(formdata.logo)" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <eui-input v-else v-model="formdata[item.value]"
                         :type="item.type"
                         :readonly="item.readonly"
                         :suffixIcon="item.suffixIcon"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize"
                         :prepend="item.prepend"
                         :clearable="item.clearable"
                         @suffixClick="formFunctions(item.value, 'suffixClick')">
              </eui-input>
            </el-form-item>
          </el-col>

        </el-form>
        <div slot="btns">
          <el-button type="primary" size="mini" @click="sure">确定</el-button>
          <el-button size="mini" @click="cancel">关闭</el-button>
        </div>
      </eui-window>
    </eui-layout>
    <company-chose-window ref="companyWindow">
    </company-chose-window>
    <category-audit-window ref="audit">
    </category-audit-window>
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
  import CompanyChoseWindow from '@/app/admin/common/CompanyChoseWindow'
  import CategoryAuditWindow from './product/CategoryAuditWindow'
  import {CATEGORY} from './product.config'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'product-category',
    _meta: {
      path: '/product/category',
      title: '产品分类'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      CompanyChoseWindow,
      CategoryAuditWindow,
      SuperSearch
    },
    data() {
      return {
        helper,
        REGIONS: CATEGORY.REGIONS,
        FORM_INFO: CATEGORY.FORM_INFO,
        formdata: JSON.parse(JSON.stringify(CATEGORY.FORM_DATA)),
        SEARCH_OPTIONS: CATEGORY.SEARCH_OPTIONS,
        rules: CATEGORY.RULES,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnAudit'],
        formOptions: {
          logo: {
            uploadFile: (params) => {
              api.public.uploadPic(params.file).then(data => {
                this.formdata.logo = data.path
              })
            }
          },
          status: [{
            value: 0,
            label: '待审核'
          }, {
            value: 1,
            label: '审核通过'
          }, {
            value: 2,
            label: '审核不通过'
          }],
          isShow: [{
            label: '隐藏',
            value: 0
          }, {
            label: '显示',
            value: 1
          }],
          template: []
        },
        query: {
          page: 1,
          pageSize: 10,
          companyId: null,
          companyName: null,
          name: null,
          status: null
        },
        windowOptions: {
          title: '分类信息',
          width: '25%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '分类名称', minWidth: 150},
            {prop: 'companyName', label: '所属企业', minWidth: 150},
            {prop: 'createTime', label: '创建时间', minWidth: 150},
            {prop: 'seq', label: '排序', minWidth: 100, sortable: true}
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
        api.productCategory.getCategoryPaged(query).then(data => {
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
              this.formdata = JSON.parse(JSON.stringify(CATEGORY.FORM_DATA))
            })
          },
          btnEdit: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$refs.window.open()
          },
          btnDelete: (row) => {
            this.formdata = JSON.parse(JSON.stringify(row))
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.productCategory.deleteCategory(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            })
              .catch(() => {
              })
          },
          btnAudit: (row) => {
            this.$refs.audit.open(row)
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.productCategory.addCategory(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.productCategory.updateCategory(this.formdata).then(() => {
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
      getIsShow(status) {
        return status === 0 ? 'el-icon-close close' : 'el-icon-check check'
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
      },
      go2Attr(index, row) {
        this.$router.push({path: '/product/attr', query: {id: row.id, attrName: row.name}})
      },
      getTemplateData() {
        api.productTemplate.getPaged({
          page: 1,
          pageSize: 999
        }).then(data => {
          this.formOptions.template = data.records.map(m => ({
            label: m.name,
            value: m.id
          }))
        })
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
        this.query.name = searchinfo.name
        this.query.companyId = searchinfo.companyId
        this.getData(this.query)
      }
    },
    created() {
      this.$on('checkedNode', (node, from) => {
        if (from === 'form') {
          this.formdata.companyName = node.cnName
          this.formdata.companyId = node.id
        } else if (from === 'search') {
          this.query.companyName = node.cnName
          this.query.companyId = node.id
        }
      })
    },
    mounted() {
      this.getTemplateData()
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog
    height: 70%

  /deep/ .el-dialog__body
    padding: 0 20px
    height: calc(100% - 78px)
    overflow-y: auto

  .avatar-uploader-icon, .avatar
    width: 120px
    height: 120px
    line-height: 120px
  .icon
    display: inline-block
    margin-right: 10px
    line-height: 20px
    color: #ffffff
    width: 20px
    height: 20px
    text-align: center
    border-radius: 50%
    &.check
      background: #67c23a
    &.close
      background: #f78989
</style>
