<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form" ref="form" :model="formdata" label-width="90px" :rules="rules" style="padding: 20px">
      <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <eui-input
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
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import {LIGHT} from '../light.config'
  import api from '@/api'
  export default {
    name: 'light-window',
    components: {
      EuiWindow,
      EuiInput
    },
    props: {
      inputOptions: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      defaultformOptions() {
        return Object.assign({}, this.formOptions, this.inputOptions)
      }
    },
    data() {
      return {
        forminfo: {...LIGHT.FORM_INFO},
        formdata: {...LIGHT.FORM_DATA},
        formOptions: LIGHT.FORM_OPTIONS,
        rules: LIGHT.RULES,
        windowOptions: {
          title: null,
          width: '500px'
        }
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.windowOptions.title = '编辑路灯'
          this.formdata = {...row}
          this.$refs.window.open()
        } else {
          this.$refs.window.open()
          this.$nextTick(() => {
            this.windowOptions.title = '新增路灯'
            this.$refs.form.resetFields()
            this.formdata = {...LIGHT.FORM_DATA}
          })
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.light.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              api.light.update(this.formdata).then(() => {
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
    mounted() {
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .form
    /*width: 100%*/
    /*box-sizing: border-box*/
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