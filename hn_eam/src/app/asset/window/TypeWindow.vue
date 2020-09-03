<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form clearfix" ref="form" :model="formdata" label-width="90px" :rules="rules" style="padding: 20px">
      <el-col :sm="12" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <eui-input
                  v-if="item.value === 'parentId'"
                  v-model="formdata[item.value]"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  :disabled="!!formdata.id"
                  :options="defaultformOptions[item.value]"
                  :unit="item.unit">
              </eui-input>
              <eui-input
                  v-else
                  v-model="formdata[item.value]"
                  :type="item.type"
                  :options="defaultformOptions[item.value]"
                  :placeholder="item.placeholder"
                  :unit="item.unit">
              </eui-input>
            </div>
          </div>
        </el-form-item>
      </el-col>
    </el-form>
    <div slot="btns">
      <el-button type="primary" size="small" @click="sure">确定</el-button>
      <el-button size="small" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import {TYPE} from '../setting/setting.config'
  import api from '@/api'
  export default {
    name: 'type-window',
    components: {
      EuiWindow,
      EuiInput
    },
    props: {
      formOptions: {
        type: Object,
        default: () => ({})
      },
      parentId: {
        type: String,
        default: ''
      }
    },
    computed: {
      defaultformOptions() {
        return Object.assign({}, this.formOptions)
      }
    },
    data() {
      return {
        forminfo: {...TYPE.FORM_INFO},
        formdata: {...TYPE.FORM_DATA},
        rules: TYPE.rules,
        windowOptions: {
          title: '资产类别信息',
          width: '50%'
        }
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.windowOptions.title = '编辑资产类别'
          this.formdata = row
          this.$refs.window.open()
        } else {
          this.$refs.window.open()
          this.$nextTick(() => {
            this.windowOptions.title = '新增资产类别'
            this.$refs.form.resetFields()
            this.formdata = {...TYPE.FORM_DATA}
            if (this.parentId) {
              this.formdata.parentId = this.parentId
            }
          })
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.typeSetting.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              api.typeSetting.update(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            }
          } else {
            return false
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .item
    width: 100%
    display: flex
    .explain
      flex: 0 0 10px
      height: 10px
      margin-right: 10px
    .input
      flex: 1

  /deep/ .el-dialog__body
    overflow: visible
</style>