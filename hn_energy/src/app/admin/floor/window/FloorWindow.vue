<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form" ref="form" :model="formdata" label-width="70px" :rules="rules" style="padding: 20px">
      <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <eui-input
                  v-if="item.value !== 'picture'"
                  v-model="formdata[item.value]"
                  :type="item.type"
                  :options="defaultformOptions[item.value]"
                  :placeholder="item.placeholder"
                  :unit="item.unit">
              </eui-input>
              <el-upload
                  v-else
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :http-request="formOptions.picture.uploadFile">
                <img v-if="formdata.picture" :src="helper.getImgUrl(formdata.picture)" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
  import {FLOOR} from '../floor.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  export default {
    name: 'floor-window',
    components: {
      EuiWindow,
      EuiInput
    },
    props: {
    },
    computed: {
      defaultformOptions() {
        return Object.assign({}, this.formOptions)
      }
    },
    data() {
      return {
        helper,
        forminfo: {...FLOOR.FORM_INFO},
        formdata: {...FLOOR.FORM_DATA},
        formOptions: Object.assign(FLOOR.FORM_OPTIONS, {
          picture: {
            uploadFile: (params) => {
              api.floor.uploadMap(params.file).then(data => {
                this.formdata.picture = data.path
              })
            }
          }
        }),
        rules: FLOOR.RULES,
        windowOptions: {
          title: null,
          width: '500px'
        }
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.windowOptions.title = '编辑楼层'
          this.formdata = {...row}
          this.$refs.window.open()
        } else {
          this.$refs.window.open()
          this.$nextTick(() => {
            this.windowOptions.title = '新增楼层'
            this.$refs.form.resetFields()
            this.formdata = {...FLOOR.FORM_DATA}
          })
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.floor.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              api.floor.update(this.formdata).then(() => {
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
  .avatar-uploader, .avatar, .avatar-uploader-icon
    width: 200px
    height: 150px
  .avatar-uploader-icon
    line-height: 150px
</style>
