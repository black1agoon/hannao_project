<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form clearfix" ref="form" :model="formdata" label-width="100px" :rules="rules" style="padding: 20px">
      <el-col :sm="12" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <el-upload
                  v-if="item.value === 'pictures'"
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :http-request="formOptions.pictures.uploadFile">
                <img v-if="formdata.pictures" :src="helper.getImgUrl(formdata.pictures)" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <eui-input v-else
                         v-model="formdata[item.value]"
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
  import {CONTROLLER} from '../consumable.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  export default {
    name: 'consumable-window',
    components: {
      EuiWindow,
      EuiInput
    },
    data() {
      return {
        helper,
        forminfo: {...CONTROLLER.FORM_INFO},
        formdata: {...CONTROLLER.FORM_DATA},
        formOptions: Object.assign(CONTROLLER.FORM_OPTIONS, {
          pictures: {
            uploadFile: (params) => {
              api.consumable.uploadPic(params.file).then(data => {
                this.formdata.pictures = data.path
              })
            }
          },
          consumableType: []
        }),
        rules: CONTROLLER.rules,
        windowOptions: {
          title: '',
          width: '800px'
        }
      }
    },
    methods: {
      open(row) {
        this.getTreeselectData().then(() => {
          if (row) {
            this.windowOptions.title = '编辑物料'
            this.formdata = row
            this.$refs.window.open()
          } else {
            this.$refs.window.open()
            this.$refs.form.resetFields()
            this.$nextTick(() => {
              this.windowOptions.title = '新增物料'
              this.formdata = {...CONTROLLER.FORM_DATA}
            })
          }
        })
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.consumable.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              api.consumable.update(this.formdata).then(() => {
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
      },
      getTreeselectData() {
        return api.consumableType.getTypeTree().then(data => {
          this.formOptions.consumableType = helper.getTreeData(data, 'consumableTypeDtoList', 'typename')

        })
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