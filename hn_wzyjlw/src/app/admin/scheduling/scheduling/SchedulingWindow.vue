<template>
  <eui-window ref="window"
              :options="windowOptions">
    <eui-layout :regions="REGIONS">
      <el-form slot="north" class="clearfix" ref="form" :model="formdata" label-width="110px" :rules="rules"
               style="padding: 20px">
        <el-col :sm="12" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <eui-input v-model="formdata[item.value]"
                       :type="item.type"
                       :readonly="item.readonly"
                       :suffixIcon="item.suffixIcon"
                       :placeholder="item.placeholder"
                       :options="formOptions[item.value]"
                       :autosize="item.autosize">
            </eui-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="west" slot="west">
        <eui-table
          slot="center"
          ref="table"
          :options="tableOptions"
          :showPagination="false"
          :showIndex="false"
          :showSelection="true"
          @handleSelectionChange="tableOptions.handleSelectionChange">
        </eui-table>
      </div>
      <div class="center" slot="center">
        <div class="title"><i class="fa fa-clock-o"></i>时间段</div>
        <div class="time-list" v-show="rowChose.id">
          <el-checkbox-group v-model="chooseIndex" @change="checkBoxGroupChange">
            <el-checkbox v-for="i in Number(formdata.cycle)"
                         :key="i"
                         :label="i-1">
              第{{i}}天&nbsp;&nbsp;{{rowChose.time2time}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </eui-layout>
    <div slot="btns">
      <el-button type="primary" size="small" @click="sure">确定</el-button>
      <el-button size="small" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import {CONTROLLER} from '../scheduling.config'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiWindow from '@/components/common/form/EuiWindow'

  const REGIONS = {
    north: {},
    west: {
      style: {
        width: '70%'
      }
    },
    center: {}
  }
  export default {
    name: 'scheduling-window',
    components: {
      EuiTable,
      EuiLayout,
      EuiInput,
      EuiWindow
    },
    data() {
      return {
        REGIONS,
        forminfo: {...CONTROLLER.FORM_INFO},
        formdata: {...CONTROLLER.FORM_DATA},
        formOptions: {...CONTROLLER.FORM_OPTIONS},
        rules: CONTROLLER.RULES,
        rowChose: {  // 表格当前选择项
          time2time: null
        },
        tableCheckList: [],  // 表格多选中的数组
        chooseIndex: [],       // 多选框选中的数组
        windowOptions: {
          title: '班次',
          width: '850px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '名称', width: 100},
            {prop: 'seq', label: '排序', width: 100, sortable: true},
            {prop: 'startTime', label: '开始时间', width: 100},
            {prop: 'endTime', label: '结束时间', minWidth: 100}
          ],
          rowClick: (row, event, column) => {
            if (!this.formdata.cycle) {
              this.$message.error('请先填写周期数')
            } else {
              this.rowChose = row
              this.rowChose.time2time = this.rowChose.startTime + '-' + this.rowChose.endTime
              let index = this.formdata.choose.findIndex(c => c.schedulingDetailId === this.rowChose.id)
              if (index !== -1) {
                this.chooseIndex = this.formdata.choose[index].chooseIndex
              } else {
                this.chooseIndex = []
              }
            }
          },
          handleSelectionChange: val => {
            if (!this.formdata.cycle) {
              this.$message.error('请先填写周期数')
            }
            this.tableCheckList = val.map(v => v.id)
            // this.formdata.choose = this.tableCheckList.map(id => ({
            //   schedulingDetailId: id,
            //   chooseIndex: []
            // }))
            // 找到this.formdata.choose 和 this.tableCheckList  id不一样的项，去除
          }
        }
      }
    },
    methods: {
      getData() {
        return api.schedulingDetail.paged({
          page: 1,
          pageSize: 999
        }).then(data => {
          this.tableOptions.data = data.records
        })
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.scheduling.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            } else {
              api.scheduling.update(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.$emit('reload')
                this.cancel()
              })
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      cancel() {
        this.$refs.window.cancel()
      },
      open(id = null) {
        this.getData().then(() => {
          this.$refs.window.open()
          this.$nextTick(() => {
            this.$refs.form.resetFields()
            if (!id) {
              this.formdata = {...CONTROLLER.FORM_DATA}
            } else {
              api.scheduling.get(id).then(data => {
                this.formdata = {...data}
              })
            }
          })
        })
      },
      checkBoxGroupChange(val) {
        if (!this.tableCheckList.includes(this.rowChose.id)) {
          this.chooseIndex = []
          this.$message.error('请先勾选左侧列表中与右侧当前显示时间一致的复选框')
        } else {
          let index = this.formdata.choose.findIndex(c => c.schedulingDetailId === this.rowChose.id)
          if (index === -1) {
            this.formdata.choose.push({
              schedulingDetailId: this.rowChose.id,
              chooseIndex: this.chooseIndex
            })
          } else {
            this.formdata.choose[index].chooseIndex = this.chooseIndex
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .west
    height: 300px

  .center
    height: 300px
    overflow: hidden
    .title
      font-size: 15px
      padding: 5px
      border-bottom: 1px solid #eeeeee
      i
        margin-right: 10px
    .time-list
      overflow-y: auto
      height: 264px
      padding: 5px
      .el-checkbox
        margin-bottom: 5px
      /deep/ .el-checkbox + .el-checkbox
        margin-left: 0
</style>
