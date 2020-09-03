<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons, switchButtons)"
      @click="onBtnClick">
    </main-toolbar>
    <eui-table
      slot="center"
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column label="创建时间" minWidth="200" prop="createTime">
      </el-table-column>
      <el-table-column v-if="getSwitchButton.name" :label="getSwitchButton.memo" align="center" fixed="right">
        <template slot-scope="scope">
          <el-switch :value="Boolean(scope.row.pretermission)"
                     @change="setDefault(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-for="(btn, index) in helper.getTableButtons(buttons)"
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
        <el-col :sm="24" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <eui-input v-model="formdata[item.value]"
                       :type="item.type"
                       :readonly="item.readonly"
                       :suffixIcon="item.suffixIcon"
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
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiInput from '@/components/common/form/EuiInput'
  import EuiSearch from '@/components/common/form/EuiSearch'
  import {TYPE} from './station.config'
  export default {
    name: 'station-type',
    _meta: {
      path: '/station/type',
      title: '机台类型'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput,
      EuiSearch
    },
    computed: {
      getSwitchButton() {
        return this.buttons.find(btn => btn.btnKey === this.switchButtons[0]) || {}
      }
    },
    data() {
      return {
        helper,
        buttons: helper.getMainButtons(),
        switchButtons: ['btnSetDefault'],
        REGIONS: TYPE.REGIONS,
        forminfo: {...TYPE.FORM_INFO},
        formdata: {...TYPE.FORM_DATA},
        formOptions: {...TYPE.FORM_OPTIONS},
        rules: TYPE.RULES,
        query: {
          name: null,
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '类型信息',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '类型名称', width: 150}
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
        api.stationType.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      onBtnClick(btnKey, arg) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
            this.$nextTick(() => {
              this.$refs.form.resetFields()
              this.formdata = {...TYPE.FORM_DATA}
            })
          },
          btnEdit: (arg) => {
            this.formdata = {...arg}
            this.$refs.window.open()
          },
          btnDelete: (arg) => {
            this.formdata = {...arg}
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.stationType.delete(this.formdata.id).then(() => {
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
              api.stationType.add(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.stationType.update(this.formdata).then(() => {
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
      setDefault(row) {
        if (row.pretermission === 1) {
          this.$message({
            message: '该类型已是默认，请设置其他类型!',
            type: 'warning'
          })
        } else {
          api.stationType.setDefault(row.id).then(() => {
            this.$message({
              message: '设置默认成功!',
              type: 'success'
            })
            this.getData(this.query)
          })
        }
      }
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
