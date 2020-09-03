<template>
  <div class="report-container">
    <el-form class="form" ref="form" :model="formdata" label-width="120px" :rules="rules">
      <template v-for="(info, index) in forminfo">
        <div class="title" :key="'title' + index">{{info.title}}</div>
        <template v-for="item in info.items">
          <div class="pic" v-if="item.value ==='styleImg'"
               :key="item.name"
               v-show="formdata[item.value]">
            <div class="label">图片</div>
            <el-image
                style="width: 180px; height: 180px;display: inline-block"
                :src="getImgUrl(formdata.styleImg)"
                fit="cover">
            </el-image>
          </div>
          <el-col v-else
                  :sm="item.sm || 6"
                  :key="item.name"
                  :offset="item.offset"
                  :pull="item.pull">
            <div class="bad-reason" v-show="showBadReason"
                 v-if="item.value === 'badReason'">
              <div class="bad" @click="openBadReason">不良原因</div>
              <ul class="reasons">
                <li class="main">不良原因:</li>
                <li>{{badReason.join('、')}}</li>
              </ul>
            </div>
            <el-form-item :label="item.name" :prop="item.value" v-else>
              <eui-input
                  v-if="item.value === 'barCode'"
                  class="input"
                  v-model="formdata[item.value]"
                  :disabled="!formdata.processId"
                  :placeholder="item.placeholder"
                  @blur="functionBlur(item.value)">
              </eui-input>
              <eui-input
                  v-else
                  class="input"
                  v-model="formdata[item.value]"
                  :type="item.type"
                  :disabled="item.disabled"
                  :autosize="item.autosize"
                  :options="defaultformOptions[item.value]"
                  :placeholder="item.placeholder"
                  @change="val => functionChange(item.value, val)">
              </eui-input>
              <div v-if="item.value === 'styleRequire'"
                   v-show="formdata.styleProcessPicList.length > 0"
                   class="showpic" @click="picklook(item.value)">查看图片
              </div>
              <el-image
                  :ref="item.value"
                  style="width: 0; height: 0"
                  :preview-src-list="getPreviewList(formdata.styleProcessPicList)">
              </el-image>
              <div v-if="item.value === 'generalProcess'"
                   v-show="formdata.generalProcessPicList.length > 0"
                   class="showpic" @click="picklook(item.value)">查看图片
              </div>
              <el-image
                  :ref="item.value"
                  style="width: 0; height: 0"
                  :preview-src-list="getPreviewList(formdata.generalProcessPicList)">
              </el-image>
            </el-form-item>
          </el-col>
        </template>
      </template>
    </el-form>
    <div class="button-wrap">
      <el-button class="button" type="primary" size="small" @click="submit">
        <i class="btn-icon fa fa-check"></i>确认报工
      </el-button>
    </div>
    <bad-reason-window ref="badReason" :bar-code="formdata.barCode" @badreason="getBadReason">
    </bad-reason-window>
  </div>
</template>

<script>
  import EuiInput from '@/app/produce/components/form/EuiInput'
  import {REPORT} from '../produce.config'
  import {api} from '@/api'
  import BadReasonWindow from '@/app/produce/report/window/BadReasonWindow'

  export default {
    name: 'report-view',
    components: {
      EuiInput,
      BadReasonWindow
    },
    computed: {
      defaultformOptions() {
        return Object.assign({}, this.formOptions)
      }
    },
    data() {
      return {
        forminfo: REPORT.formInfo,
        formdata: REPORT.formData,
        formOptions: REPORT.formOptions,
        rules: REPORT.rules,
        showBadReason: false,
        badReason: []
      }
    },
    methods: {
      getImgUrl(url) {
        return url
      },
      GetProcessListGwj() {
        api.produce.report.GetProcessListGwj().then(data => {
          this.formOptions.processId = (data || []).map(d => ({
            label: d.processName,
            value: d.processId,
            type: d.type
          }))
        })
      },
      functionChange(key, val) {
        switch (key) {
          case 'processId': {
            this.showBadReason = this.formOptions.processId.find(process => process.value === val).type === 2
            this.formdata.processName = this.formOptions.processId.find(process => process.value === val).label
            break
          }
          case 'reportUserCode':
            api.produce.report.getReportUserName({
              ReportUserCode: this.formdata.reportUserCode
            }).then(data => {
              if (!data) {
                this.$message({
                  message: '请输入正确的员工工号!',
                  type: 'error'
                })
                this.formdata.reportUserName = null
              } else {
                this.formdata.reportUserName = data
              }
            })
        }
      },
      functionBlur(key) {
        switch (key) {
          case 'barCode': {
            if (!this.formdata.barCode) {
              this.$message({
                message: '请输入成衣条码!',
                type: 'warning'
              })
              return
            }
            api.produce.report.GetInfoBysBarCode({
              barCode: this.formdata.barCode,
              processId: this.formdata.processId
            }).then(data => {
              this.formdata = Object.assign(this.formdata, data)
            })
            break
          }
        }
      },
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            api.produce.report.AddProduceReport(this.formdata).then(() => {
              this.$message({
                message: '报工成功!',
                type: 'success'
              })
            })
          } else {
            return false
          }
        })
      },
      picklook(key) {
        this.$refs[key][0].clickHandler()
      },
      openBadReason() {
        if (this.formdata.barCode) {
          this.$refs.badReason.open()
        } else {
          this.$message({
            message: '请先输入成衣条码!',
            type: 'warning'
          })
        }
      },
      getBadReason(reasons) {
        this.formdata.badReasonIds = reasons.map(r => r.badReasonID)
        this.badReason = reasons.map(r => r.processName + '-' + r.badReasonName)
      },
      getPreviewList(list) {
        return list.map(li => li.pic)
      }
    },
    mounted() {
      this.GetProcessListGwj()
      // this.$refs.badReason.open()
    }
  }
</script>

<style lang="sass" scoped>
  .report-container
    position: relative
    min-width: 1300px
    padding: 0 30px

    .btn-icon
      margin-right: 5px

    .title
      clear: both
      font-size: 14px
      font-weight: bold
      margin-top: 30px

    .bad-reason
      position: relative

      .bad
        font-size: 14px
        color: #1890FF
        text-decoration: underline
        font-weight: bold
        cursor: pointer
        line-height: 40px
        padding-left: 50px

      .reasons
        display: flex
        position: absolute
        font-size: 12px
        color: #2991BF
        top: 30px
        left: -50px
        width: 460px

        li
          list-style: none

          &.main
            margin-right: 5px
            white-space: nowrap

    .pic
      position: absolute
      right: 7%

      .label
        display: inline-block
        text-align: right
        vertical-align: top
        font-size: 12px
        color: #606266
        line-height: 40px
        padding: 0 12px 0 0
        box-sizing: border-box

    .showpic
      position: absolute
      right: -100px
      top: 0
      font-size: 14px
      color: #1890FF
      text-decoration: underline
      font-weight: bold
      cursor: pointer

    .button-wrap
      clear: both
      text-align: center

    ::v-deep
      .el-form-item__label
        font-size: 12px
</style>