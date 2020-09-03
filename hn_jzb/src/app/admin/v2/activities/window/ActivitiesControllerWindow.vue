<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form" ref="form" :model="formdata" label-width="130px" :rules="rules" style="padding: 20px">
      <el-col :sm="item.sm || 12" v-for="(item, index) in forminfo" :key="index">
        <el-form-item v-if="item.value === 'pic'" :label="item.name" :prop="item.value">
          <div class="item">
            <div class="explain"></div>
            <div class="input">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :http-request="formOptions.pic.uploadFile">
                <img v-if="helper.getImgUrl(formdata.pic)" :src="helper.getImgUrl(formdata.pic)" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item
          v-show="formdata.smsNotification === 1"
          v-else-if="item.value === 'smsList'"
          :label="item.name"
          :prop="item.value">
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
        <el-form-item
          v-show="formdata.emailNotification === 1"
          v-else-if="item.value === 'emailList'"
          :label="item.name"
          :prop="item.value">
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
        <el-form-item  v-else :label="item.name" :prop="item.value">
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
  import {ACTIVITIES} from '../activities.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  export default {
    name: 'focus-store-window',
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
        forminfo: {...ACTIVITIES.FORM_INFO},
        formdata: {...ACTIVITIES.FORM_DATA},
        formOptions: Object.assign(ACTIVITIES.FORM_OPTIONS, {
          pic: {
            uploadFile: (params) => {
              api.public.uploadPic(params.file).then(data => {
                this.formdata.pic = data.path
              })
            }
          }
        }),
        rules: ACTIVITIES.RULES,
        windowOptions: {
          title: null,
          width: '960px'
        }
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.windowOptions.title = '编辑服务项'
          this.formdata = {...row}
          this.$refs.window.open()
        } else {
          this.$refs.window.open()
          this.$nextTick(() => {
            this.windowOptions.title = '新增报名项'
            this.$refs.form.resetFields()
            this.formdata = {...ACTIVITIES.FORM_DATA}
          })
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.activities.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              api.activities.update(this.formdata).then(() => {
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
  .avatar-uploader-icon, .avatar
    width: 100px
    height: 100px
    line-height: 100px
</style>
