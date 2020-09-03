<template>
  <eui-window ref="window"
              :options="windowOptions">
    <el-form class="form"
             ref="form"
             :model="formdata"
             label-width="150px"
             :rules="rules"
             style="padding: 20px">
      <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
        <el-form-item :label="item.name" :prop="item.value">
            <eui-input
                v-if="item.value !== 'tasktime'"
                v-model="formdata[item.value]"
                :type="item.type"
                :options="defaultformOptions[item.value]"
                :placeholder="item.placeholder"
                @change="(val) => changeOptions(item.value, val)"
                :unit="item.unit">
            </eui-input>
            <div class="tasktime" v-else>
              <template v-if="formdata.taskType === '1'">
                <div class="row">
                  <label>日期:</label>
                  <eui-input class="input"
                             v-model="formdata.taskStartTime"
                             type="date">
                  </eui-input>
                </div>
                <div class="row">
                  <label>时间:</label>
                  <eui-input class="input"
                             v-model="formdata.startTime"
                             type="timepicker">
                  </eui-input>
                </div>
              </template>
              <template v-else-if="formdata.taskType === '2'">
                <div class="row">
                  <label>日期:</label>
                  <eui-input class="input"
                             v-model="formdata.cyclePeriod"
                             :options="defaultformOptions.cyclePeriod"
                             @change="(val) => changeOptions('cyclePeriod', val)"
                             type="select">
                  </eui-input>
                  <eui-input class="input multiple-select"
                             v-if="formdata.cyclePeriod === 7"
                             v-model="formdata.periodPointList"
                             :multiple="true"
                             :options="defaultformOptions.periodPoint"
                             type="select">
                  </eui-input>
                </div>
                <div class="row">
                  <label>时间:</label>
                  <eui-input class="input"
                             v-model="formdata.startTime"
                             type="timepicker">
                  </eui-input>
                </div>
              </template>
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
  import {DISINFECT} from '../disinfect.config'
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import { formatDate } from '@/assets/js/tools'

  export default {
    name: 'disinfect-task-window',
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
      let [date, time] = formatDate(new Date(), 'yyyy-MM-dd hh:mm').split(' ')
      return {
        helper,
        forminfo: {...DISINFECT.form_info},
        formdata: {...DISINFECT.form_data},
        formOptions: Object.assign(DISINFECT.form_options, {
        }),
        rules: DISINFECT.rules,
        windowOptions: {
          title: null,
          width: '800px'
        },
        todayDate: date,
        todayTime: time
      }
    },
    methods: {
      open(row = {}) {
        if (row.id) {
          this.windowOptions.title = '编辑消毒任务'
          this.formdata = {
            ...row,
            periodPointList: []
          }
          this.formdata.periodPointList = this.formdata.periodPoint.split(',')
          this.$refs.window.open()
        } else {
          this.$refs.window.open()
          this.$nextTick(() => {
            this.windowOptions.title = '新增消毒任务'
            this.$refs.form.resetFields()
            this.formdata = {...DISINFECT.form_data}
            this.formdata.taskStartTime = this.todayDate
            this.formdata.startTime = this.todayTime
          })
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.formdata.taskStartTime < this.todayDate) {
              this.$message({
                message: '日期不能早于今日!',
                type: 'warning'
              })
              return
            }
            this.formdata.periodPoint = this.formdata.periodPointList.join(',')
            if (!this.formdata.id) {
              if (this.formdata.startTime.length === 5) {
                this.formdata.startTime += ':00'
              }
              this.formdata.taskStartTime += ' ' + this.formdata.startTime
              api.disinfect.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              }).catch(() => {
                this.formdata.taskStartTime = this.formdata.taskStartTime.split(' ')[0]
              })
            } else {
              if (this.formdata.startTime.length === 5) {
                this.formdata.startTime += ':00'
              }
              this.formdata.taskStartTime = this.formdata.taskStartTime.split(' ')[0] + ' ' + this.formdata.startTime
              api.disinfect.update(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              }).catch(() => {
                this.formdata.taskStartTime = this.formdata.taskStartTime.split(' ')[0]
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
      changeOptions(key, val) {
        let handler = {
          taskType: () => {
            if (val === '2') {
              this.formdata.cyclePeriod = 1
              this.formdata.periodPointList = []
            } else if (val === '1') {
              this.formdata.cyclePeriod = 0
              this.formdata.periodPointList = ['0']
            }
          },
          cyclePeriod: () => {
            if (val === 1) {
              this.formdata.periodPointList = ['1']
            } else {
              this.formdata.periodPointList = []
            }
          }
        }
        handler[key] && handler[key].call(this)
      }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.row
  margin-bottom: 10px
  label
    margin-right: 10px
    vert-align: top
    line-height: 28px
  .input
    display: inline-block
    vertical-align: top
    margin-right: 10px
    width: 150px !important
    &.multiple-select
      width: 250px !important
</style>
