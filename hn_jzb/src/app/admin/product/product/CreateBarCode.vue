<template>
  <div>
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
    <company-chose-window ref="companyWindow"></company-chose-window>
  </div>
</template>

<script>
  import api from '@/api'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import CompanyChoseWindow from '@/app/admin/common/CompanyChoseWindow'

  const FORM_INFO = [{
    name: '数量',
    value: 'count',
    type: 'number'
  }, {
    name: '备注',
    value: 'memo',
    type: 'textarea',
    autosize: {
      minRows: 3,
      maxRows: 5
    }
  }]
  const FORM_DATA = {
    productId: null,
    count: null,
    memo: null
  }

  export default {
    name: 'create-bar-code',
    components: {
      EuiWindow,
      EuiInput,
      CompanyChoseWindow
    },
    data() {
      return {
        windowOptions: {
          title: '生成条码',
          width: '25%'
        },
        FORM_INFO: FORM_INFO,
        formdata: {...FORM_DATA},
        formOptions: {},
        rules: {
          count: [{
            required: true, message: '请输入生成数量', trigger: ['blur', 'change']
          }]
        }
      }
    },
    methods: {
      open(productId) {
        this.formdata = {...FORM_DATA}
        this.formdata.productId = productId
        this.$refs.window.open()
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            api.card.batchImportBarCode(this.formdata).then(() => {
              this.$message({
                message: '生成条码成功!',
                type: 'success'
              })
              this.$refs.window.cancel()
            })
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
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
      this.$on('checkedNode', (node, from) => {
        if (from === 'form') {
          this.formdata.companyName = node.cnName
          this.formdata.companyId = node.id
        }
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
