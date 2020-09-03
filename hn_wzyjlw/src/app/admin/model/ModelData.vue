<template>
  <div>
      <eui-table
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
        <el-table-column label="是否可远程" align="center" width="80">
          <template slot-scope="scope">
            <i :class="getStatus(scope.row.change)"></i>
          </template>
        </el-table-column>
        <el-table-column label="数据类型" align="center" width="80">
          <template slot-scope="scope">
            {{getMsgType(scope.row.msgType)}}
          </template>
        </el-table-column>
        <el-table-column label="备注" minWidth="100" prop="memo">
        </el-table-column>
        <el-table-column label="操作" :width="buttons.length * 80 + 'px'" align="center" fixed="right">
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
        <el-form class="clearfix" ref="form" :model="formdata" label-width="100px" :rules="rules" style="padding: 20px">
          <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
            <el-form-item :label="item.name" :prop="item.value">
              <eui-input v-model="formdata[item.value]"
                         :type="item.type"
                         :readonly="item.readonly"
                         :disabled="item.disabled"
                         :options="formOptions[item.value]"
                         :autosize="item.autosize">
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
  import {DATA} from './model.config'

  export default {
    name: 'model-data',
    components: {
      EuiTable,
      EuiWindow,
      EuiInput
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
        forminfo: {...DATA.FORM_INFO},
        formdata: {...DATA.FORM_DATA},
        formOptions: {...DATA.FORM_OPTIONS},
        rules: DATA.RULES,
        query: {
          change: null,
          message: null,
          modelId: null,
          msgIndex: null,
          msgType: null,
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '模型数据',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'message', label: '数据名称', width: 100},
            {prop: 'msgIndex', label: '下标', width: 50}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
            this.$emit('modeldetail', this.formdata)
          },
          rowDblclick: (row, event) => {
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
        api.modelData.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btndataEdit: (arg) => {
            this.formdata = {...arg}
            this.$refs.window.open()
          },
          btndataDelete: (arg) => {
            this.formdata = {...arg}
            this.$confirm(`是否删除:${this.formdata.message}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.modelData.delete(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btndetailAdd: (arg) => {
            this.$emit('modeldetailOpenWindow', arg)
            // this.$refs.modeldetail.openWindow(arg)
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
              api.modelData.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.modelData.update(this.formdata).then(() => {
                this.$message({
                  message: '编辑成功!',
                  type: 'success'
                })
                this.getData(this.query)
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
      getStatus(status) {
        return status === 0 ? 'el-icon-close' : 'el-icon-check'
      },
      getMsgType(msgtype) {
        return msgtype === 0 ? '值' : '功能码'
      },
      reload(model) {
        this.query.modelId = model.id
        this.formdata.modelName = model.modelName
        this.getData(this.query)
      },
      openWindow(model) {
        this.$refs.window.open()
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.formdata = {...DATA.FORM_DATA}
          this.formdata.modelId = model.id
          this.formdata.modelName = model.modelName
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
