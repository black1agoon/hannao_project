<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons, tableButtons)"
      @click="onBtnClick">
    </main-toolbar>
    <eui-table
      slot="center"
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column label="是否强制下载" align="center" minWidth="100">
        <template slot-scope="scope">
          <i :class="['icon', getStatus(scope.row.forceInstall)]"></i>
        </template>
      </el-table-column>
      <el-table-column label="最新版本" align="center" minWidth="100">
        <template slot-scope="scope">
          <i :class="['fa icon-star', getIsLastest(scope.row.updateid)]"></i>
        </template>
      </el-table-column>
      <el-table-column label="更新日志" align="center" prop="updatelog" minWidth="200">
      </el-table-column>
      <el-table-column label="操作" minWidth="300" align="center" fixed="right">
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
      <el-form
        class="clearfix"
        ref="form"
        :model="formdata"
        label-width="100px"
        :rules="rules"
        v-loading="loading"
        style="padding: 20px">
        <el-col :sm="24" v-for="(item, index) in FORM_INFO" :key="index">
          <el-form-item :label="item.name" :prop="item.value" v-if="item.value ==='file'" v-show="!formdata.id">
            <el-input
              style="width: 65%"
              v-model="formdata[item.value]"
              :readonly="true"
              size="small">
            </el-input>
            <el-upload
              class="btn-upload"
              ref="upload"
              action=""
              :show-file-list="false"
              :auto-upload="false"
              :http-request="uploadFile"
              :on-change="handleChange"
              :before-upload="beforeUpload">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item :label="item.name" :prop="item.value" v-else>
            <eui-input
              v-model="formdata[item.value]"
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
  import {APPVERSION} from './othersetting.config'
  export default {
    name: 'app-version-controller',
    _meta: {
      path: '/appversion/controller',
      title: 'APP版本管理'
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
        editflag: false,
        helper,
        REGIONS: APPVERSION.REGIONS,
        FORM_INFO: APPVERSION.FORM_INFO,
        buttons: helper.getMainButtons(),
        tableButtons: ['btnSetLastest'],
        formdata: {...APPVERSION.FORM_DATA},
        formOptions: APPVERSION.FORM_OPTIONS,
        rules: Object.assign(APPVERSION.RULES, {
          file: [{
            required: true,
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (!this.formdata.id && (value === null)) {
                callback(new Error('请选择上传的文件'))
              } else {
                callback()
              }
            }
          }, {
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value && !/.*(.apk)$/.test(value)) {
                callback(new Error('请选择正确的后缀apk格式的文件'))
              } else {
                callback()
              }
            }
          }]
        }),
        loading: false,
        query: {
          name: null,
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: 'APP版本信息',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'appname', label: 'APP名称', minWidth: 200},
            {prop: 'currentversion', label: '版本号', minWidth: 100}
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
        api.appVersion.getPaged(query).then(data => {
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
              this.formdata = {...APPVERSION.FORM_DATA}
            })
          },
          btnEdit: (arg) => {
            this.formdata = JSON.parse(JSON.stringify(arg))
            this.$refs.window.open()
          },
          btnDelete: (arg) => {
            this.formdata = JSON.parse(JSON.stringify(arg))
            this.$confirm(`是否删除:${this.formdata.appname}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.appVersion.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnSetLastest: (arg) => {
            this.formdata = JSON.parse(JSON.stringify(arg))
            this.$confirm(`是否将:${this.formdata.appname} 设为最新版本？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.appVersion.setLastest(this.formdata.id).then(() => {
                this.$message({
                  message: '设置成功!',
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
              this.$refs.upload[0].submit()
            } else {
              api.appVersion.update(this.formdata).then(() => {
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
        return status === 0 ? 'el-icon-close close' : 'el-icon-check check'
      },
      getIsLastest(status) {
        return status === '0' ? 'fa-star' : ''
      },
      handleChange(file, fileList) {
        let currentfile = fileList.filter(f => f.name === file.name)
        if (currentfile.length > 1) {
          fileList.splice(fileList.findIndex(f => f.name === file.name), 1)
        }
        this.formdata.file = file.name
      },
      beforeUpload(file) {
        return file.name === this.formdata.file
      },
      uploadFile(params) {
        this.loading = true
        let data = new FormData()
        data.append('file', params.file)
        data.append('forceInstall', this.formdata.forceInstall)
        data.append('updatelog', this.formdata.updatelog)
        api.appVersion.add(data).then(() => {
          this.loading = true
          this.$message({
            message: '新增成功!',
            type: 'success'
          })
          this.getData(this.query)
          this.$refs.window.cancel()
        }).catch(() => {
          this.loading = false
        })
      }
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.icon-star
  font-size: 17px
  color: #67c23a
  vertical-align: middle
.btn-upload
  width: 30%
  display: inline-block
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
