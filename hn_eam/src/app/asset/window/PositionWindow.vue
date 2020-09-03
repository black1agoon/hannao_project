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
                  v-model="formdata[item.value]"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  :readonly="item.readonly"
                  :autosize="item.autosize">
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
  import {POSITION} from '../setting/setting.config'
  import api from '@/api'
  export default {
    name: 'position-window',
    components: {
      EuiWindow,
      EuiInput
    },
    data() {
      return {
        forminfo: {...POSITION.FORM_INFO},
        formdata: {...POSITION.FORM_DATA},
        rules: POSITION.rules,
        windowOptions: {
          title: '位置信息',
          width: '25%'
        }
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.windowOptions.title = '编辑位置'
          this.formdata = row
          this.$refs.window.open()
        } else {
          this.$refs.window.open()
          this.$nextTick(() => {
            this.windowOptions.title = '新增位置'
            this.$refs.form.resetFields()
            this.formdata = {...POSITION.FORM_DATA}
          })
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.positionSetting.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              api.positionSetting.update(this.formdata).then(() => {
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
</style>