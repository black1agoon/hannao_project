<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form clearfix" ref="form" :model="formdata" label-width="90px" :rules="rules">
      <template v-for="(block, index) in forminfo">
        <div class="title" :key="index">
          <i class="icon fa fa-bars"></i><span>{{block.title}}</span>
        </div>
        <el-col v-for="(item) in block.form" :sm="20"  :key="item.value">
          <el-form-item :label="item.name" :prop="item.value">
            <div class="item">
              <div class="explain"></div>
              <div class="input">
                <div v-if="item.value === 'files'" class="files">
                  <div class="filename"
                       v-for="(filename, i) in fileNames"
                       :key="i">
                    <a target="_blank" :href="getFileHref(i)">{{filename}}</a><i @click="deleteFile(i)" class="fa fa-close"></i>
                  </div>
                  <el-upload
                      class="btn-upload"
                      ref="upload"
                      action=""
                      :multiple="true"
                      :show-file-list="false"
                      :http-request="uploadFile">
                    <span slot="trigger" class="addfile fa fa-plus-circle"></span>
                  </el-upload>
                </div>
                <eui-input
                    v-else-if="item.value === 'promoterName' && !isAdmin"
                    v-model="formdata[item.value]"
                    :disabled="true">
                </eui-input>
                <el-select v-else-if="item.value === 'roomId'"
                           size="mini"
                          v-model="formdata.roomId">
                  <el-option v-for="(item, index) in defaultformOptions.roomId"
                             :key="index"
                             :label="item.label"
                             :value="item.value">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">可容纳人数:{{ item.capacity }}&nbsp;&nbsp; 是否有投影:{{item.projectionValue}}</span>
                  </el-option>
                </el-select>
                <eui-input
                    v-else-if="item.value === 'remind'"
                    v-model="formdata[item.value]"
                    :disabled="!!formdata.id"
                    :type="item.type"
                    :options="defaultformOptions[item.value]"
                    :placeholder="item.placeholder"
                    :clearable="item.clearable"
                    :multiple="item.multiple"
                    :readonly="item.readonly">
                </eui-input>
                <eui-input
                    v-else
                    v-model="formdata[item.value]"
                    :type="item.type"
                    :options="defaultformOptions[item.value]"
                    :placeholder="item.placeholder"
                    :clearable="item.clearable"
                    :appendicon="item.appendicon"
                    :readonly="item.readonly"
                    :unit="item.unit"
                    :autosize="item.autosize"
                    :multiple="item.multiple"
                    @appendClick="inputHandler(item.value)">
                </eui-input>
              </div>
              <div v-if="item.value === 'attendeeNames' || (item.value === 'promoterName' && isAdmin)" class="search fa fa-search" @click="inputHandler(item.value)"></div>
            </div>
          </el-form-item>
        </el-col>
      </template>
    </el-form>
    <div slot="btns">
      <el-button v-show="formdata.isHandle === 1" type="success" size="mini" @click="finishMeeting">结束会议</el-button>
      <el-button v-show="formdata.isHandle === 2" type="danger" size="mini" @click="cancelMeeting">取消会议</el-button>
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
    <organization-user-window ref="user" @selectUser="selectUser">
    </organization-user-window>
  </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import {CALENDAR} from '../meeting.config'
  import OrganizationUserWindow from '../components/common/OrganizationUserWindow'
  import api from '@/api'
  import config from '@/config'
  export default {
    name: 'meeting-calendar-window',
    components: {
      EuiWindow,
      EuiInput,
      OrganizationUserWindow
    },
    props: {
      inputOptions: {
        type: Object,
        default: () => ({})
      },
      windowApi: {
        type: Object,
        default: () => ({})
      },
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      defaultformOptions() {
        return Object.assign({}, this.formOptions, this.inputOptions)
      },
      fileNames() {
        return this.formdata.fileNames ? this.formdata.fileNames.split(',') : []
      }
    },
    data() {
      return {
        forminfo: {...CALENDAR.FORM_INFO},
        formdata: Object.assign({}, {...CALENDAR.FORM_DATA}, {
          promoterName: this.$store.state.user.name
        }),
        formOptions: CALENDAR.FORM_OPTIONS,
        rules: CALENDAR.RULES,
        windowOptions: {
          title: '',
          width: '800px'
        },
        serverURI: config.serverURI
      }
    },
    methods: {
      open(row) {
        if (row) {
          this.windowOptions.title = '编辑会议'
          this.formdata = row
          this.$refs.window.open()
        } else {
          this.$refs.window.open()
          this.$nextTick(() => {
            this.windowOptions.title = '新增会议'
            this.$refs.form.resetFields()
            this.formdata = Object.assign({}, {...CALENDAR.FORM_DATA}, {
              promoterName: this.isAdmin ? null : this.$store.state.user.name
            })
          })
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              this.windowApi.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              this.windowApi.update(this.formdata).then(() => {
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
      finishMeeting() {
        this.$confirm(`是否结束该会议？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          this.windowApi.finish(this.formdata.id).then(() => {
            this.$message({
              message: '结束成功!',
              type: 'success'
            })
            this.$emit('reload')
            this.cancel()
          })
        }).catch(() => {
        })
      },
      cancelMeeting() {
        this.$confirm(`是否取消该会议？`, '提示', {
          iconClass: 'fa fa-question-circle'
        }).then(() => {
          this.windowApi.cancel(this.formdata.id).then(() => {
            this.$message({
              message: '取消成功!',
              type: 'success'
            })
            this.$emit('reload')
            this.cancel()
          })
        }).catch(() => {
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      inputHandler(val) {
        let handler = {
          promoterName: () => {
            this.$refs.user.open('promoterName', [this.formdata.promoterId])
          },
          attendeeNames: () => {
            this.$refs.user.open('attendeeNames', this.formdata.attendeeIds, true)
          }
        }
        if (handler.hasOwnProperty(val)) {
          handler[val].call(this)
        }
      },
      uploadFile(params) {
        api.meeting.uploadFile(params).then((data) => {
          if (data.path) {
            let filename = data.fileName
            let filenameList = this.formdata.fileNames ? this.formdata.fileNames.split(',') : []
            let filepathList = this.formdata.files ? this.formdata.files.split(',') : []
            filenameList.push(filename)
            filepathList.push(data.path)
            this.formdata.fileNames = filenameList.join(',')
            this.formdata.files = filepathList.join(',')
          }
        }).catch(() => {
        })
      },
      deleteFile(index) {
        let filenameList = this.formdata.fileNames.split(',')
        let filepathList = this.formdata.files.split(',')
        filenameList.splice(index, 1)
        filepathList.splice(index, 1)
        this.formdata.fileNames = filenameList.join(',')
        this.formdata.files = filepathList.join(',')
      },
      getFileHref(i) {
        let filepathList = this.formdata.files.split(',')
        return this.serverURI + config.prev + filepathList[i]
      },
      selectUser(rows, from) {
        if (from === 'promoterName') {
          this.formdata.promoterName = rows[0].name
          this.formdata.promoterId = rows[0].id
        } else if (from === 'attendeeNames') {
          this.formdata.attendeeNames = rows.map(r => r.name).join(',')
          this.formdata.attendeeIds = rows.map(r => r.id)
        }
      }
    },
    watch: {
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.form
  width: 100%
  box-sizing: border-box
  padding: 20px
  .title
    float: left
    width: 100%
    height: 30px
    line-height: 30px
    border-bottom: 1px solid #eee
    margin-bottom: 10px
    i
      color: #b8b8b8
      margin-right: 10px
  .item
    width: 100%
    display: flex
    .explain
      flex: 0 0 10px
      height: 10px
      margin-right: 10px
    .input
      flex: 1
      .files
        display: flex
        flex-wrap: wrap
        line-height: 28px
        .filename
          white-space: nowrap
          margin-right: 10px
          i
            margin-left: 5px
            cursor: pointer
            &:hover
              opacity: .8
          a
            text-decoration: underline
        .addfile
          font-size: 20px
          line-height: 28px
          cursor: pointer
          &:hover
            color: #409eff
    .search
      line-height: 28px
      font-size: 16px
      margin-left: 5px
      cursor: pointer
      &:hover
        color: #409eff

</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-select
    width: 100%
</style>