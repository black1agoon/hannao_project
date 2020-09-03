<template>
  <div>
    <eui-layout :regions="REGIONS">
      <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
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
          <el-table-column label="logo" align="center" minWidth="100">
            <template slot-scope="scope">
              <img
                v-if="helper.getImgUrl(scope.row.logo)"
                :src="helper.getImgUrl(scope.row.logo)"
                @click="showBigpic(helper.getImgUrl(scope.row.logo))"
                class="logo"/>
            </template>
          </el-table-column>
          <el-table-column label="品牌名称" align="center" minWidth="200">
            <template slot-scope="scope">
              <a :href="scope.row.url" target="_blank">{{scope.row.name}}</a>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="审核状态" align="center" minWidth="200">
          <template slot-scope="scope">
            <i :class="['icon', getStatus(scope.row.status).className]"></i>{{getStatus(scope.row.status).name}}
          </template>
        </el-table-column>
        <el-table-column label="备注" minWidth="200" align="center">
          <template slot-scope="scope">{{scope.row.memo}}
          </template>
        </el-table-column>
        <el-table-column label="操作" minWidth="200" align="center" fixed="right">
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
        <el-form class="clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules" style="padding: 20px">
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
                         :prepend="item.prepend">
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
    <pic-looking-mask
      ref="piclook"
      :src="showPicUrl">
    </pic-looking-mask>
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
  import SuperSearch from '@/components/common/tools/SuperSearch'
  import {BRAND} from './product.config'

  export default {
    name: 'company-product-brand',
    _meta: {
      path: '/company/product/brand',
      title: '产品品牌'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      SuperSearch
    },
    data() {
      return {
        helper,
        REGIONS: BRAND.REGIONS,
        FORM_INFO: BRAND.FORM_INFO,
        formdata: JSON.parse(JSON.stringify(BRAND.FORM_DATA)),
        SEARCH_OPTIONS: BRAND.SEARCH_OPTIONS,
        buttons: helper.getMainButtons(),
        formOptions: {
          logo: {
            uploadFile: (params) => {
              api.companyPublic.uploadPic(params.file).then(data => {
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
          }]
        },
        rules: BRAND.RULES,
        query: {
          page: 1,
          pageSize: 10,
          name: null,
          status: null
        },
        windowOptions: {
          title: '品牌信息',
          width: '25%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'createTime', label: '创建时间', minWidth: 200},
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
        },
        showPicUrl: null
      }
    },
    methods: {
      getData(query) {
        api.companyProductBrand.getBrandPaged(query).then(data => {
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
              this.formdata = JSON.parse(JSON.stringify(BRAND.FORM_DATA))
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
              api.companyProductBrand.deleteBrand(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
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
              api.companyProductBrand.addBrand(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.companyProductBrand.updateBrand(this.formdata).then(() => {
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
        return status === 0 ? {
          className: 'el-icon-close close',
          name: '待审核'
        } : {
          className: 'el-icon-check check',
          name: '审核通过'
        }
      },
      showBigpic(url) {
        this.showPicUrl = url
        this.$refs.piclook.show()
      },
      appendClick(value) {
        let funs = {
        }
        funs[value].call(this)
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.name = searchinfo.name
        this.query.status = searchinfo.status
        this.getData(this.query)
      }
    },
    created() {},
    mounted() {
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

  .logo
    width: 70px
    height: 70px
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
