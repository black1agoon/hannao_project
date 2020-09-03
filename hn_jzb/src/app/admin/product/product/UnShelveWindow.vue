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
        <el-button type="primary" size="small" @click="sure">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
  </div>
</template>

<script>
  import api from '@/api'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'

  const FORM_INFO = [{
    name: '下架',
    value: 'force',
    type: 'select'
  }, {
    name: '下架理由',
    value: 'forceUnshelveId',
    type: 'select'
  }]
  const FORM_DATA = {
    force: null,
    forceUnshelveId: null,
    productIdList: []
  }

  export default {
    name: 'un-shelve-window',
    components: {
      EuiWindow,
      EuiInput
    },
    data() {
      return {
        windowOptions: {
          title: '下架',
          width: '25%'
        },
        row: null,
        FORM_INFO: FORM_INFO,
        formdata: {...FORM_DATA},
        formOptions: {
          force: [{
            label: '正常下架',
            value: 0
          }, {
            label: '强制下架',
            value: 1
          }]
        },
        rules: {
          force: [{
            required: true, message: '请选择下架类型', trigger: ['blur', 'change']
          }],
          forceUnshelveId: [{
            validator: (rule, value, callback) => {
              if (this.formdata.force === 1 && (value === '' || value === null)) {
                callback(new Error('请选择强制下架类型'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      open(row) {
        this.row = row
        this.$refs.window.open()
        this.$nextTick(() => {
          this.formdata = {...FORM_DATA}
          this.formdata.productIdList = [row.id]
          this.$refs.form.resetFields()
        })
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            api.product.UnShelve(this.formdata).then(() => {
              this.$refs.window.cancel()
              this.$notify({
                title: '',
                message: '下架成功',
                type: 'success'
              })
              this.$emit('reload')
            })
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getUnshelveReason() {
        api.productUnshelveReason.getReasonPaged({
          page: 1,
          pageSize: 999
        }).then(data => {
          this.formOptions.forceUnshelveId = data.records.map(d => ({
            label: d.name,
            value: d.id
          }))
        })
      }
    },
    mounted() {
      this.getUnshelveReason()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
