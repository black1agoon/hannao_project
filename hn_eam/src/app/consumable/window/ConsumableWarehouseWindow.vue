<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form clearfix" ref="form" :model="formdata" label-width="100px" :rules="rules" style="padding: 20px">
      <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <eui-input v-model="formdata[item.value]"
                         :type="item.type"
                         :readonly="item.readonly"
                         :placeholder="item.placeholder"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize"
                         :disabled="item.disabled"
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
  import {WAREHOUSE} from '../consumable.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  export default {
    name: 'consumable-warehouse-window',
    components: {
      EuiWindow,
      EuiInput
    },
    data() {
      return {
        helper,
        forminfo: {...WAREHOUSE.FORM_INFO},
        formdata: {...WAREHOUSE.FORM_DATA},
        formOptions: WAREHOUSE.FORM_OPTIONS,
        rules: WAREHOUSE.rules,
        windowOptions: {
          title: '',
          width: '500px'
        }
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.windowOptions.title = '编辑仓库'
          this.formdata = row
          this.$refs.window.open()
        } else {
          this.windowOptions.title = '新增仓库'
          this.$refs.window.open()
          this.$nextTick(() => {
            this.$refs.form.resetFields()
            this.formdata = {...WAREHOUSE.FORM_DATA}
          })
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.consumableWarehouse.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              api.consumableWarehouse.update(this.formdata).then(() => {
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