<template>
  <div>
    <eui-table
      class="eui-table"
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column label="操作" width="300" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-for="(btn, index) in buttons"
            size="mini"
            type="text"
            :key="index"
            @click="onBtnClick(btn.btnKey, scope.row)">
            <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
    <eui-window ref="window"
                :options="windowOptions">
      <el-form class="clearfix" ref="form" :model="formdata" label-width="80px" :rules="rules" style="padding: 20px">
        <el-col :sm="12" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <eui-input
              v-if="item.value !== 'workshopName'"
              v-model="formdata[item.value]"
              :disabled="(item.value === 'jobNumber') && editflag"
              :type="item.type"
              :options="formOptions[item.value]">
            </eui-input>
            <eui-input v-else
                       v-model="formdata[item.value]"
                       :disabled="true">
            </eui-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="btns">
        <el-button type="primary" size="small" @click="sure">确定</el-button>
        <el-button size="small" @click="cancel">关闭</el-button>
      </div>
    </eui-window>
  </div>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiSearch from '@/components/common/form/EuiSearch'
  import {CONTROLLER} from './fettler.config'

  export default {
    name: 'fettler-controller',
    components: {
      EuiTable,
      EuiWindow,
      EuiInput,
      EuiSearch
    },
    props: {
      buttons: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        helper,
        REGIONS: CONTROLLER.REGIONS,
        forminfo: {...CONTROLLER.FORM_INFO},
        formdata: {...CONTROLLER.FORM_DATA},
        formOptions: {...CONTROLLER.FORM_OPTIONS},
        rules: CONTROLLER.RULES,
        query: {
          workshopId: null,
          page: 1,
          pageSize: 10
        },
        editflag: false,
        windowOptions: {
          title: '维修工信息',
          width: '600px'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'jobNumber', label: '工号', width: 100},
            {prop: 'name', label: '真实姓名', width: 100},
            {prop: 'workshopName', label: '所属车间', width: 100},
            {prop: 'sexName', label: '性别', width: 100},
            {prop: 'phone', label: '电话', width: 200},
            {prop: 'createTime', label: '创建时间', width: 200},
            {prop: 'memo', label: '备注', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
          },
          rowDblclick: (row, event) => {
            this.editflag = true
            this.$refs.window.open()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        }
      }
    },
    methods: {
      getData(query) {
        api.fettler.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnfettlerEdit: (arg) => {
            this.getInputData()
            this.editflag = true
            this.formdata = {...arg}
            this.$refs.window.open()
          },
          btnfettlerDelete: (arg) => {
            this.formdata = {...arg}
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.fettler.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, arg)
        }
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (!this.formdata.id) {
              api.fettler.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$emit('closeType')
                this.$refs.window.cancel()
              })
            } else {
              api.fettler.update(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$emit('closeType')
                this.$refs.window.cancel()
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
      getInputData() {
        if (this.formOptions.sex.length === 0) {
          api.dictionary.getValuePaged({
            attrCode: '0001',
            page: 1,
            pageSize: 999
          }).then(data => {
            this.formOptions.sex = data.records.map(d => ({
              label: d.name,
              value: d.code
            }))
          })
        }
      },
      windowOpen(data) {
        this.editflag = false
        this.$refs.window.open()
        this.getInputData()
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.formdata = {...CONTROLLER.FORM_DATA}
          this.formdata.workshopId = data.id
          this.formdata.workshopName = data.name
        })
      },
      reload(data) {
        this.query.workshopId = data.id
        this.getData(this.query)
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .eui-table
    height: 100%
    position absolute
</style>
