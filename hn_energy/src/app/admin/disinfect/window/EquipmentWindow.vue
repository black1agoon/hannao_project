<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form" ref="form" :model="formdata" label-width="80px" :rules="rules" style="padding: 20px">
      <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <eui-input
                  v-model="formdata[item.value]"
                  :type="item.type"
                  :autosize="item.autosize"
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
  import { EQUIPMENT } from '../disinfect.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  export default {
    name: 'equipment-window',
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
        helper,
        forminfo: {...EQUIPMENT.form_info},
        formdata: {...EQUIPMENT.form_data},
        formOptions: Object.assign(EQUIPMENT.form_options, {
        }),
        rules: EQUIPMENT.rules,
        windowOptions: {
          title: null,
          width: '400px'
        }
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.windowOptions.title = '编辑' + EQUIPMENT.WINDOW_NAME
          this.formdata = {...row}
          this.$refs.window.open()
        } else {
          this.$refs.window.open()
          this.$nextTick(() => {
            this.windowOptions.title = '新增' + EQUIPMENT.WINDOW_NAME
            this.$refs.form.resetFields()
            this.formdata = {...EQUIPMENT.form_data}
          })
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.equipment.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              api.equipment.update(this.formdata).then(() => {
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
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
