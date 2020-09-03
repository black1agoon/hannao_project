<template>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="form clearfix" ref="form" :model="formdata" label-width="110px" :rules="rules" style="padding: 20px 20px 0 20px">
        <el-col :sm="item.sm || 8" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <div class="input-item">
              <div class="explain">
                <el-tooltip popper-class="tooltip" v-show="item.explain" :content="item.explain"
                            placement="bottom-start" effect="light">
                  <div class="el-icon-question"></div>
                </el-tooltip>
              </div>
              <div class="input">
                <span v-if="item.value === 'cleanUserName'">{{formdata.cleanUserName}}</span>
                <eui-input v-else v-model="formdata[item.value]"
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
      <el-radio-group size="mini" v-model="formdata.checkType">
        <el-radio-button label="6">复制盘点</el-radio-button>
      </el-radio-group>
      <div class="radio-content">
        <div class="item">
          <el-form ref="form2" class="form clearfix" label-width="70px" :model="formdata" :rules="rules">
            <el-col :sm="8">
              <el-form-item label="比例" prop="percentage">
                <div class="input-item">
                  <div class="input">
                    <eui-input
                        type="number"
                        placeholder="请输入抽样占比"
                        unit="%"
                        v-model="formdata.percentage">
                    </eui-input>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
</template>

<script>
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import {CHECK_COPY} from '../asset.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  export default {
    name: 'asset-check-copy-window',
    components: {
      EuiInput,
      EuiWindow
    },
    data() {
      return {
        helper,
        forminfo: CHECK_COPY.FORM_INFO,
        formdata: Object.assign({...CHECK_COPY.FORM_DATA}, {checkType: 6, percentage: 100}),
        formOptions: Object.assign(CHECK_COPY.FORM_OPTIONS, {}),
        rules: CHECK_COPY.RULES,
        windowOptions: {
          title: '复制盘点单',
          width: '1000px'
        }
      }
    },
    methods: {
      open(row) {
        this.getInputData()
        this.formdata.id = row.id
        this.formdata.taskName = row.taskName
        this.formdata.checkUser = row.checkUser
        this.formdata.startTime = row.startTime
        this.formdata.endTime = row.endTime
        this.formdata.remark = row.remark
        this.formdata.checkType = 6
        this.formdata.percentage = 100
        this.$refs.window.open()
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$refs.form2.validate((valid) => {
              if (valid) {
                this.formdata.agencyId = this.$store.state.agencyId
                api.assetCheck.add(this.formdata).then(() => {
                  this.$message({
                    message: '新增成功!',
                    type: 'success'
                  })
                  this.$emit('reload')
                  this.$refs.window.cancel()
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      getInputData() {
        api.assetCheck.getUserList().then(data => {
          this.formOptions.checkUser = data.map(user => ({
            label: user.name,
            value: user.id
          }))
        })
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog__body
    overflow: visible !important
  .el-radio-group
    margin: 0 20px
  .radio-content
    .item
      margin: 10px 20px
      .form
        width: 100%
        box-sizing: border-box
        .input-item
          .explain
            flex: none !important
          .input
            margin-left: 10px
      .asset-choose
        width: 100%
        .button
          margin: 0 20px 10px 0
        .chosenum
          font-size: 12px
          font-weight: bold
          margin-right: 10px
          display: inline-block
          float: right
          line-height: 28px

  .table
    min-height: 300px
    /deep/ .el-table
      .cell
        line-height: 30px !important
</style>