<template>
  <div>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="clearfix" ref="form" :model="formdata" label-width="100px" :rules="rules"
               style="padding: 20px 20px 20px 0">
        <el-col :sm="24" v-for="(item, index) in FORM_INFO" :key="index">
          <el-form-item v-if="item.value === 'forceUnshelveId'"
                        v-show="formdata.force === 1"
                        :label="item.name"
                        :prop="item.value">
            <eui-input v-model="formdata[item.value]"
                       :type="item.type"
                       :options="formOptions[item.value]">
            </eui-input>
          </el-form-item>
          <el-form-item v-else :label="item.name" :prop="item.value">
            <eui-input v-model="formdata[item.value]"
                       :type="item.type"
                       :options="formOptions[item.value]">
            </eui-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="btns">
        <el-button type="primary" size="mini" @click="sure">确定</el-button>
        <el-button size="mini" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
  </div>
</template>

<script>
  import api from '@/api'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'

  const FORM_INFO = [{
    name: '审核',
    value: 'status',
    type: 'select'
  }]
  const FORM_DATA = {
    status: null,
    productCatIdList: []
  }

  export default {
    name: 'category-audit-window',
    components: {
      EuiWindow,
      EuiInput
    },
    data() {
      return {
        windowOptions: {
          title: '审核',
          width: '25%'
        },
        row: null,
        FORM_INFO: FORM_INFO,
        formdata: {...FORM_DATA},
        formOptions: {
          status: [{
            label: '审核通过',
            value: 1
          }, {
            label: '审核不通过',
            value: 2
          }]
        },
        rules: {
          status: [{
            required: true, message: '请选择审核状态', trigger: 'change'
          }]
        }
      }
    },
    methods: {
      open(row) {
        this.row = row
        this.formdata = {...FORM_DATA}
        this.formdata.productCatIdList = [row.id]
        this.$refs.window.open()
        this.$refs.form.resetFields()
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            api.productCategory.categoryAudit(this.formdata).then(() => {
              this.$refs.window.cancel()
              this.$notify({
                title: '',
                message: '审核完毕',
                type: 'success'
              })
              this.row.status = this.formdata.status
            })
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog
    height: auto

</style>
