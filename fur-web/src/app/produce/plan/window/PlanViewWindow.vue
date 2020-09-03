<template>
  <eui-window ref="window"
              :options="windowOptions">
    <div class="window-container">
      <el-form class="form" ref="form" :model="formdata" label-width="120px" :rules="rules">
        <el-col :sm="item.sm || 8" v-for="(item, index) in forminfo" :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <div class="item">
              <eui-input
                  class="input"
                  v-model="formdata[item.value]"
                  :type="item.type"
                  :disabled="item.disabled"
                  :autosize="item.autosize"
                  :options="defaultformOptions[item.value]"
                  :placeholder="item.placeholder"
                  @change="formfunction(item.value)"
                  :unit="item.unit">
              </eui-input>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
      <div class="tab-content">
          <el-tabs type="card"
                   size="small"
                   value="first"
                   style="height: 100%">
            <el-tab-pane label="尺码明细" name="first">
              <eui-table size="mini"
                         :showPagination="false"
                         :options="subTableOptions">
                <el-table-column slot="number" label="数量" align="center" minWidth="100">
                  <template slot-scope="scope">
                    <el-input ref="input"
                              size="small"
                              @change="calculateNumber"
                              v-model="scope.row.number">
                    </el-input>
                  </template>
                </el-table-column>
              </eui-table>
            </el-tab-pane>
          </el-tabs>
      </div>
    </div>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import {PLAN} from '../../produce.config'
  import EuiWindow from '@/app/produce/components/form/EuiWindow'
  import EuiInput from '@/app/produce/components/form/EuiInput'
  import EuiTable from '@/app/produce/components/form/EuiTable'
  import {api} from '@/api'
  export default {
    name: 'plan-view-window',
    components: {
      EuiWindow,
      EuiInput,
      EuiTable
    },
    props: {
      inputOptions: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      defaultformOptions() {
        return Object.assign({}, this.formOptions, this.inputOptions)
      }
    },
    data() {
      return {
        formdata: {...PLAN.formData},
        forminfo: PLAN.formInfo,
        formOptions: PLAN.formOptions,
        rules: PLAN.rules,
        windowOptions: {
          title: null,
          width: '1000px'
        },
        subTableOptions: {
          data: [],
          columns: [
            {prop: 'colorName', label: '颜色', minWidth: 100},
            {prop: 'type', label: '类型', minWidth: 100},
            {prop: 'size', label: '尺码', minWidth: 100},
            {prop: 'number', label: '数量', minWidth: 100, slot: true}
          ]
        }
      }
    },
    methods: {
      open(row = {}) {
        if (row.parGuid) {
          this.windowOptions.title = '编辑'
          api.produce.plan.SelectOneProPlanBill({
            ParGuid: row.parGuid
          }).then(data => {
            this.formdata.parID = data.parGuid
            this.formdata.code = data.code
            this.formdata.styleID = data.styleID
            this.formdata.cusGuid = data.cusGuid
            this.formdata.number = data.number
            this.formdata.deliverDate = data.deliverDate
            this.formdata.cusRequire = data.cusRequire
            this.formdata.colorID = data.colorID
            this.subTableOptions.data = data.sizeDetailList
            this.getInputData()
            api.produce.select.SelectColorAndSize({
              styleId: this.formdata.styleID
            }).then(data => {
              this.formOptions.colorID = (data || []).map(d => ({
                value: d.colorId,
                label: d.colorName
              }))
            })
            this.$refs.window.open()
          })
        } else {
          this.getInputData()
          this.$refs.window.open()
          this.$nextTick(() => {
            this.windowOptions.title = '新增'
            this.$refs.form.resetFields()
            this.formdata = {...PLAN.formData}
          })
        }
      },
      cancel() {
        this.$refs.window.cancel()
      },
      sure() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.formdata.sizeDetailList = this.subTableOptions.data.filter(d => d.number !== 0 && d.number !== null).map(d => ({
              ...d,
              id: d.sizeDetailId,
              styleId: this.formdata.styleID,
              colorId: this.formdata.colorID
            }))
            api.produce.plan.AddProPlanBill(this.formdata).then(() => {
              this.$message({
                message: this.formdata.parID ? '编辑成功!' : '新增成功!',
                type: 'success'
              })
              this.$emit('reload')
              this.cancel()
            })
          } else {
            return false
          }
        })
      },
      getInputData() {
        api.produce.select.GetCustomerCombo().then(data => {
          this.formOptions.cusGuid = (data || []).map(cus => ({
            label: cus.text,
            value: cus.id
          }))
        })
        api.produce.select.SelectStyle().then(data => {
          this.formOptions.styleID = (data || []).map(style => ({
            label: style.styleName,
            value: style.styleId
          }))
        })
      },
      getSubTableData() {
        const colorName = this.formOptions.colorID.find(c => c.value === this.formdata.colorID).label
        api.produce.plan.SelectColorAndSizeByStyleIdAndColorId({
          styleId: this.formdata.styleID,
          colorName: colorName
        }).then(data => {
          this.subTableOptions.data = (data || []).map(d => ({
            ...d,
            number: 0
          }))
        })
      },
      formfunction(key) {
        const handler = {
          styleID: () => {
            api.produce.select.SelectColorAndSize({
              styleId: this.formdata.styleID
            }).then(data => {
              this.formOptions.colorID = (data || []).map(d => ({
                value: d.colorId,
                label: d.colorName
              }))
              this.formdata.sizeDetailList = []
              this.formdata.colorID = null
              this.subTableOptions.data = []
            })
          },
          colorID: () => {
            this.formdata.number = 0
            this.getSubTableData()
          }
        }
        handler[key] && handler[key].call(this)
      },
      calculateNumber() {
        this.formdata.number = this.subTableOptions.data.reduce((rst, cur) => {
          return Number(rst) + Number(cur.number)
        }, 0)
      }
    },
    mounted() {
      //
    }
  }
</script>

<style lang="sass" scoped>
.window-container
  .form
    padding: 20px
  .tab-content
    height: 300px
    clear: both
</style>