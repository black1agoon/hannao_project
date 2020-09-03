<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form" ref="form" :model="formdata" label-width="100px" :rules="rules" style="padding: 20px">
      <el-col :sm="item.sm || 24" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <eui-input
                v-if="item.value !== 'options'"
                v-model="formdata[item.value]"
                :type="item.type"
                :autosize="item.autosize"
                :options="defaultformOptions[item.value]"
                :placeholder="item.placeholder"
                :unit="item.unit">
              </eui-input>
              <eui-input
                v-else
                v-model="formdata[item.value]"
                :type="item.type"
                :autosize="item.autosize"
                :options="defaultformOptions[item.value]"
                :placeholder="item.placeholder"
                :disabled="optionsDisabled"
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
  import {ATTR} from '../equipment.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  export default {
    name: 'equipment-category-window',
    components: {
      EuiWindow,
      EuiInput
    },
    props: {
    },
    computed: {
      defaultformOptions() {
        return Object.assign({}, this.formOptions)
      },
      optionsDisabled() {
        return this.formdata.type === 1
      }
    },
    data() {
      return {
        helper,
        forminfo: {...ATTR.FORM_INFO},
        formdata: {...ATTR.FORM_DATA},
        formOptions: Object.assign(ATTR.FORM_OPTIONS, {
        }),
        rules: ATTR.RULES,
        windowOptions: {
          title: null,
          width: '500px'
        }
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.windowOptions.title = '编辑属性'
          this.formdata = {...row}
          this.$refs.window.open()
        } else {
          this.$refs.window.open()
          this.$nextTick(() => {
            this.windowOptions.title = '新增属性'
            this.$refs.form.resetFields()
            this.formdata = {...ATTR.FORM_DATA}
          })
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.formdata.categoryId = this.$route.query.id
            if (!this.formdata.id) {
              api.equipmentAttr.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              api.equipmentAttr.update(this.formdata).then(() => {
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
</style>
