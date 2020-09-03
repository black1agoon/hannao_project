<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules" style="padding: 20px">
      <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <eui-input
                  v-if="item.value !== 'typeCode' && item.value !== 'parentId'"
                  v-model="formdata[item.value]"
                  :type="item.type"
                  :options="defaultformOptions[item.value]"
                  :placeholder="item.placeholder"
                  :unit="item.unit">
              </eui-input>
              <eui-input
                  v-else
                  :disabled="!!formdata.id"
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
  import {TYPE} from '../consumable.config'
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
        return Object.assign({}, this.formOptions, {
          istool: [{
            label: '是',
            value: '1'
          }, {
            label: '否',
            value: '0'
          }]
        })
      }
    },
    data() {
      return {
        forminfo: {...TYPE.FORM_INFO},
        formdata: {...TYPE.FORM_DATA},
        rules: TYPE.rules,
        windowOptions: {
          title: '',
          width: '500px'
        }
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.windowOptions.title = '编辑分类'
          this.formdata = row
          this.formdata.parentId = this.formdata.parentId ? this.formdata.parentId: '0'
          this.$refs.window.open()
        } else {
          this.windowOptions.title = '新增分类'
          this.$refs.window.open()
          this.$nextTick(() => {
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
            this.formdata.agencyId = this.$store.state.agencyId
            if (!this.formdata.id) {
              api.consumableType.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              api.consumableType.update(this.formdata).then(() => {
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
    line-height: 32px
    .explain
      flex: 0 0 10px
      height: 10px
      margin-right: 10px
    .input
      flex: 1

  /deep/ .el-dialog__body
    overflow: visible
</style>