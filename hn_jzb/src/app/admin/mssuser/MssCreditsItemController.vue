<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
      slot="north"
      :buttons="helper.getMainFilterButtons(buttons)"
      @click="onBtnClick">
    </main-toolbar>
    <eui-table
      slot="center"
      ref="table"
      :options="tableOptions"
      @reloadTable="tableOptions.reload">
      <el-table-column label="是否显示" align="center" minWidth="100">
        <template slot-scope="scope">
          <i :class="['icon', getIsShow(scope.row.appShow)]"></i>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="memo" minWidth="100">
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" minWidth="200">
      </el-table-column>
      <el-table-column label="操作" minWidth="200" align="center" fixed="right">
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
        <el-col :sm="24" v-for="(item, index) in FORMDATA" :key="index">
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

  const REGIONS = {
    north: {},
    center: {}
  }
  const FORMDATA = [
    {
      name: '名称',
      value: 'name'
    }, {
      name: '编码',
      value: 'code'
    }, {
      name: '积分值',
      value: 'amount'
    }, {
      name: 'app端显示',
      value: 'appShow',
      type: 'radio'
    }, {
      name: 'app动作',
      value: 'appAction'
    }, {
      name: '排序',
      value: 'seq'
    }, {
      name: '备注',
      value: 'memo',
      type: 'textarea',
      autosize: {
        minRows: 3,
        maxRows: 5
      }
    }
  ]
  const INFO = {
    name: null,
    code: null,
    amount: null,
    seq: null,
    memo: null,
    appShow: 0,
    appAction: null
  }
  export default {
    name: 'mss-credits-item-controller',
    _meta: {
      path: '/mss/creditsitem',
      title: '积分类型'
    },
    mixins: [TabPane],
    components: {
      MainToolbar,
      EuiTable,
      EuiLayout,
      EuiWindow,
      EuiInput
    },
    data() {
      return {
        helper,
        REGIONS,
        FORMDATA,
        buttons: helper.getMainButtons(),
        formdata: JSON.parse(JSON.stringify(INFO)),
        formOptions: {
          appShow: [{
            label: '否',
            value: 0
          }, {
            label: '是',
            value: 1
          }]
        },
        rules: {
          name: [{
            required: true, message: '请输入类型名称', trigger: ['blur', 'change']
          }],
          code: [{
            required: true, message: '请输入编码', trigger: ['blur', 'change']
          }],
          amount: [{
            required: true, message: '请输入积分值', trigger: ['blur', 'change']
          }]
        },
        query: {
          name: null,
          page: 1,
          pageSize: 10
        },
        windowOptions: {
          title: '积分类型',
          width: '20%'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '名称', minWidth: 150},
            {prop: 'amount', label: '积分值', minWidth: 100, align: 'center'},
            {prop: 'code', label: '编码', minWidth: 100, align: 'center'},
            {prop: 'seq', label: '排序', minWidth: 100, sortable: true},
            {prop: 'appAction', label: 'app端动作', minWidth: 200}
          ],
          rowClick: (row, event, column) => {
            this.formdata = JSON.parse(JSON.stringify(row))
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
        api.mssCreditsItem.getMssCreditsItemPaged(query).then(data => {
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
              this.formdata = JSON.parse(JSON.stringify(INFO))
            })
          },
          btnEdit: (arg) => {
            this.formdata = JSON.parse(JSON.stringify(arg))
            this.$refs.window.open()
          },
          btnDelete: (arg) => {
            this.formdata = JSON.parse(JSON.stringify(arg))
            this.$confirm(`是否删除:${this.formdata.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.mssCreditsItem.deleteMssCreditsItem(this.formdata.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnSingleSearch: (arg) => {
            this.query.name = arg
            this.query.page = 1
            this.getData(this.query)
          },
          btnSingleSearchClear: () => {
            this.query.name = null
            this.getData(this.query)
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
              api.mssCreditsItem.addMssCreditsItem(this.formdata).then(() => {
                this.$message({
                  message: '新增成功!',
                  type: 'success'
                })
                this.getData(this.query)
                this.$refs.window.cancel()
              })
            } else {
              api.mssCreditsItem.updateMssCreditsItem(this.formdata).then(() => {
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
      getIsShow(status) {
        return status === 0 ? 'el-icon-close close' : 'el-icon-check check'
      }
    },
    mounted() {
      this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .icon
    display: inline-block
    margin-right: 10px
    line-height: 20px
    color: #ffffff
    width: 20px
    height: 20px
    text-align: center
    border-radius: 50%
    &.check
      background: #67c23a
    &.close
      background: #f78989
</style>

