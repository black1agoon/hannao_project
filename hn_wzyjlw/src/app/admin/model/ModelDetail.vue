<template>
  <div>
    <eui-table
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column label="操作" width="200" align="center" fixed="right">
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
  import {DETAIL} from './model.config'
  export default {
    name: 'model-detail',
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
        forminfo: {...DETAIL.FORM_INFO},
        formdata: {...DETAIL.FORM_DATA},
        formOptions: {...DETAIL.FORM_OPTIONS},
        rules: DETAIL.RULES,
        query: {
          value: null,
          modelDataId: null,
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '数据详情',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'value', label: '值', width: 100},
            {prop: 'mean', label: '解释', width: 200},
            {prop: 'memo', label: '备注', minWidth: 100}
          ],
          rowClick: (row, event, column) => {
            this.formdata = {...row}
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
        api.modelDetail.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btndetailEdit: (arg) => {
            this.formdata = {...arg}
            this.$refs.window.open()
          },
          btndetailDelete: (arg) => {
            this.formdata = {...arg}
            this.$confirm(`是否删除:${this.formdata.value}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.modelDetail.delete(this.formdata.id).then(() => {
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
              api.modelDetail.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.modelDetail.update(this.formdata).then(() => {
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
      reload(modeldata) {
        this.query.modeldataId = modeldata.id
        this.formdata.modelDataName = modeldata.message
        this.getData(this.query)
      },
      setNullData() {
        this.tableOptions.data = []
        this.tableOptions.total = 0
      },
      openWindow(modeldata) {
        this.$refs.window.open()
        this.$nextTick(() => {
          this.$refs.form.resetFields()
          this.formdata = {...DETAIL.FORM_DATA}
          this.formdata.modelDataId = modeldata.id
          this.formdata.modelDataName = modeldata.message
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
