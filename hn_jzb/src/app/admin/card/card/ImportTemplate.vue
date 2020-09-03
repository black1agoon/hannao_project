<template>
  <div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form v-loading="loading" class="clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules"
               style="padding: 20px;display: block">
        <el-col :sm="24" v-for="(item, index) in FORM_INFO" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <template v-if="item.value === 'file'">
              <el-input
                style="width: calc(100% - 150px)"
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
              <span class="temp" @click="getTemplate">获取模板</span>
            </template>
            <eui-input v-else v-model="formdata[item.value]"
                       :type="item.type"
                       :readonly="item.readonly"
                       :suffixIcon="item.suffixIcon"
                       :options="formOptions[item.value]"
                       :autosize="item.autosize"
                       @suffixClick="formFunctions(item.value, 'suffixClick')">
            </eui-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">导入</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
    <company-chose-window ref="companyWindow">
    </company-chose-window>
    <card-type-chose-window ref="cardtypeWindow">
    </card-type-chose-window>
  </div>
</template>

<script>
  import api from '@/api'
  import config from '@/config'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import CompanyChoseWindow from '@/app/admin/common/CompanyChoseWindow'
  import CardTypeChoseWindow from '@/app/admin/common/CardTypeChoseWindow'
  const FORM_INFO = [{
    name: '文件',
    value: 'file'
  }, {
    name: '标签类型',
    value: 'cardTypeName',
    readonly: true,
    suffixIcon: 'fa fa-search'
  }, {
    name: '所属企业',
    value: 'companyName',
    readonly: true,
    suffixIcon: 'fa fa-search'
  }, {
    name: '描述',
    value: 'memo',
    type: 'textarea',
    sm: 24,
    autosize: {
      minRows: 4,
      maxRows: 4
    }
  }]
  const FORM_DATA = {
    file: null,
    companyId: null,
    companyName: null,
    cardType: null,
    cardTypeName: null,
    memo: null
  }
  export default {
    name: 'create-bar-code',
    components: {
      EuiWindow,
      EuiInput,
      CompanyChoseWindow,
      CardTypeChoseWindow
    },
    data() {
      return {
        serverURI: config.serverURI,
        loading: false,
        FORM_INFO,
        formdata: {...FORM_DATA},
        formOptions: {},
        rules: {
          file: [{
            required: true, message: '请选取文件', trigger: 'change'
          }],
          companyName: [{
            required: true, message: '请选择所属公司', trigger: 'change'
          }],
          cardTypeName: [{
            required: true, message: '请选择标签类型', trigger: 'change'
          }]
        },
        windowOptions: {
          title: '导入模板',
          width: '480px'
        }
      }
    },
    methods: {
      open() {
        this.formdata = {...FORM_DATA}
        this.$refs.window.open()
      },
      uploadFile(params) {
        this.loading = true
        let data = new FormData()
        data.append('file', params.file)
        data.append('companyId', this.formdata.companyId)
        data.append('cardType', this.formdata.cardType)
        data.append('memo', this.formdata.memo)
        // console.log(params)
        api.card.batchImporticChip(data).then(() => {
          this.loading = false
          this.$message({
            message: '标签导入成功!',
            type: 'success'
          })
          this.$refs.window.cancel()
          this.$parent.$emit('reload')
        }).catch(() => {
          this.loading = false
        })
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$refs.upload[0].submit()
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
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
      formFunctions(val, method) {
        let funs = {
          companyName: {
            suffixClick: () => {
              this.$refs.companyWindow.open('form')
            }
          },
          cardTypeName: {
            suffixClick: () => {
              this.$refs.cardtypeWindow.open()
            }
          }
        }
        funs[val][method].call(this)
      },
      getTemplate() {
        window.open(this.serverURI + api.card.getCardIcTemplate())
      }
    },
    created() {
      this.$on('checkedNode', (node, from) => {
        if (from === 'form') {
          this.formdata.companyName = node.cnName
          this.formdata.companyId = node.id
        }
      })
      this.$on('checkedCardType', (node, from) => {
        if (from === 'form') {
          this.formdata.cardTypeName = node.name
          this.formdata.cardType = node.code
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .btn-upload
    width: 80px
    display: inline-block
  .temp
    cursor: pointer
    text-decoration: underline
    color: #606266
  .is-success
    .el-input__inner
      border: 1px solid #dcdfe6 !important

  .el-form-item.is-success
    .el-textarea__inner
      border: 1px solid #dcdfe6 !important
</style>
