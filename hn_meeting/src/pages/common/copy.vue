<template>
  <div class="wrap">
    <div class="wrap-title">
      <p class="name">新增会议</p>
      <div class="button-wrap">
        <el-button type="primary" size="mini" @click="sure">确定</el-button>
        <el-button size="mini" @click="reset">重置</el-button>
      </div>
    </div>
    <el-form class="form clearfix" ref="form" :model="formdata" label-width="90px" :rules="rules">
      <template v-for="(block, index) in forminfo">
        <div class="title" @click="toggleItem(index)" :key="index">
          <i :class="['icon', 'fa fa-bars', {rotate: !block.open}]"></i><span>{{block.title}}</span>
        </div>
        <div :class="['item-wrap', 'clearfix', {unOpened: !block.open}]" :key="'title' + index">
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
                      v-else-if="item.value === 'promoterName'"
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
                <div v-if="item.value === 'attendeeNames'" class="search fa fa-search" @click="inputHandler(item.value)"></div>
              </div>
            </el-form-item>
          </el-col>
        </div>
      </template>
      <organization-user-window ref="user" @selectUser="selectUser">
      </organization-user-window>
    </el-form>
  </div>
</template>

<script>
  import EuiInput from '@/components/common/form/EuiInput'
  import {HOME} from '../config/config.config'
  import api from '@/api'
  import config from '@/config'
  import OrganizationUserWindow from '@/app/meeting/components/common/OrganizationUserWindow'
  export default {
    name: 'meeting-form',
    props: {
      inputOptions: {
        type: Object,
        default: () => ({})
      }
    },
    components: {
      EuiInput,
      OrganizationUserWindow
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
        forminfo: {...HOME.FORM_INFO},
        formdata: Object.assign({}, {...HOME.FORM_DATA}, {
          promoterName: this.$store.state.user.name
        }),
        formOptions: HOME.FORM_OPTIONS,
        rules: HOME.RULES,
        serverURI: config.serverURI
      }
    },
    methods: {
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            api.meetingCalendar.add(this.formdata).then(() => {
              this.$message({
                message: '新增成功!',
                type: 'success'
              })
              this.$emit('reload')
              this.reset()
            })
          } else {
            return false
          }
        })
      },
      reset() {
        this.$refs.form.resetFields()
        this.formdata = Object.assign({}, {...HOME.FORM_DATA}, {
          promoterName: this.$store.state.user.name
        })
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
      },
      getRoomData() {
        api.meetingRoom.paged({
          page: 1,
          pageSize: 999,
          agencyId: this.$store.state.agencyId
        }).then(data => {
          this.formOptions.roomId = data.records.map(r => ({
            label: r.name,
            value: r.id,
            projectionValue: r.projectionValue,
            capacity: r.capacity
          }))
        })
      },
      toggleItem(index) {
        this.forminfo[index].open = !this.forminfo[index].open
      }
    },
    mounted() {
      this.getRoomData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrap-title
    height: 57px
    font-family: 'pingfang'
    font-size: 14px
    color: #333333
    position: relative
    .name
      padding: 23px 0 10px 26px
    .button-wrap
      position: absolute
      right: 26px
      top: 15px
  .form
    width: 100%
    padding: 0 26px
    height: calc(100% - 57px)
    overflow-y: scroll
    box-sizing: border-box
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
        transition: all .3s
      .rotate
        transform: rotate(90deg)
    .item-wrap
      width: 100%
      transition: all .2s
      overflow: hidden
      &.unOpened
        height: 0
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