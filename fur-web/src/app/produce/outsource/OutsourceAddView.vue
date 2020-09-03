<template>
  <eui-layout :regions="region">
    <div slot="center" class="content-wrapper">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/produce/outsource' }" @click.native="goToOutsourceView">委外管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增委外</el-breadcrumb-item>
      </el-breadcrumb>
      <template v-for="(btn, index) in buttons">
        <el-button
            :key="index"
            :type="btn.type"
            size="small"
            @click="onBtnClick(btn.btnKey)">
          <i :class="['btn-icon fa', btn.icon]"></i>{{btn.name}}
        </el-button>
      </template>
      <el-form class="form" ref="form" :model="formdata" label-width="150px" :rules="rules">
        <el-col :sm="8"
                :pull="item.pull"
                :offset="item.offset"
                v-for="(item, index) in forminfo"
                :key="index">
          <el-form-item :label="item.name" :prop="item.value">
            <div v-if="item.value === 'passRate' || item.value === 'onTimeRate'">
              {{formdata[item.value] ? formdata[item.value] : '0%'}}
            </div>
            <el-autocomplete
                size="small"
                v-else-if="item.value === 'processPointName'"
                v-model="formdata.processPointName"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @change="handleChange"
                @select="handleSelect"
            ></el-autocomplete>
            <eui-input
                v-else-if="item.value === 'stepID'"
                class="input"
                :placeholder="item.placeholder"
                :type="item.type"
                :multiple="item.multiple"
                :options="formOptions[item.value]"
                :disabled="tableOptions.data.length > 0"
                v-model="formdata[item.value]">
            </eui-input>
            <eui-input
                v-else
                class="input"
                :placeholder="item.placeholder"
                :type="item.type"
                :multiple="item.multiple"
                :options="formOptions[item.value]"
                :disabled="item.disabled"
                v-model="formdata[item.value]">
            </eui-input>
            <el-button
                v-if="item.value === 'code'"
                size="small"
                type="primary"
                @click="onBtnClick('btnBarCode')">
              <i class="btn-icon fa fa-check"></i>确定
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <eui-table
        slot="south"
        ref="table"
        :show-selection="false"
        :showPagination="false"
        :show-index="true"
        :highlight-current-row="true"
        :options="tableOptions">
      <el-table-column slot="prev" label="删除" align="center" width="100">
        <template slot-scope="scope">
          <i class="delete fa fa-minus" @click="deleteBarCode(scope)"></i>
        </template>
      </el-table-column>
    </eui-table>
  </eui-layout>
</template>

<script>
  import EuiTable from '@/app/produce/components/form/EuiTable'
  import EuiLayout from '@/app/produce/components/layout/EuiLayout'
  import { OUTSOURCE_ADD } from '../produce.config'
  import { api } from '@/api'
  import EuiInput from '@/app/produce/components/form/EuiInput'
  export default {
    name: 'outsource-add-view',
    components: {
      EuiInput,
      EuiTable,
      EuiLayout
    },
    data() {
      return {
        region: OUTSOURCE_ADD.region,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'barCode', label: '条码', minWidth: 100},
            {prop: 'styleCode', label: '款号', minWidth: 80},
            {prop: 'styleName', label: '品名', minWidth: 80},
            {prop: 'colorName', label: '颜色', minWidth: 100},
            {prop: 'size', label: '尺码', minWidth: 80}
          ]
        },
        buttons: OUTSOURCE_ADD.buttons,
        formdata: OUTSOURCE_ADD.formData,
        forminfo: OUTSOURCE_ADD.formInfo,
        formOptions: OUTSOURCE_ADD.formOptions,
        rules: Object.assign(OUTSOURCE_ADD.rules, {
          processPointName: [{
            required: true, message: '请输入加工点', trigger: ['blur', 'change']
          }]
        }),
        blurData: []
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        const btnHandlers = {
          'btnSave': () => {
            this.$refs.form.validate((valid) => {
              if (valid) {
                api.produce.outsourceAdd.saveOutsourcingInfo(this.formdata).then(() => {
                  this.$message({
                    message: '新增成功!',
                    type: 'success'
                  })
                  this.formdata.parGuid = null
                  this.goToOutsourceView()
                })
              } else {
                return false
              }
            })
          },
          'btnReturn': () => {
            this.goToOutsourceView()
          },
          'btnBarCode': () => {
            api.produce.outsourceAdd.AddWorkingOutDetail({
              parGuid: this.formdata.parGuid,
              stepID: this.formdata.stepID,
              code: this.formdata.code
            }).then(data => {
              this.tableOptions.data.push(data)
              this.formdata.barCodes.push(data.barCode)
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      goToOutsourceView() {
        this.$router.push('/produce/outsource')
      },
      OutsourcingBack() {
        api.produce.outsourceAdd.OutsourcingBack({
          ParGuid: this.formdata.parGuid
        })
      },
      GetProcessListGwj() { // 获取工序
        api.produce.report.GetProcessListGwj().then(data => {
          this.formOptions.stepID = (data || []).map(d => ({
            label: d.processName,
            value: d.processId
          }))
        })
      },
      handleSelect(item) {
        this.formdata.processPointID = item.id
        api.produce.outsourceAdd.selectWorkingSpaceDetail({
          workSpaceId: this.formdata.processPointID
        }).then(data => {
          this.formdata.contactsName = data.contactsName
          this.formdata.contactsPhone = data.contactsPhone
          this.formdata.onTimeRate = data.onTimeRate
          this.formdata.passRate = data.passRate
        })
      },
      handleChange() {
        if (!this.formdata.processPointID) {
          this.formdata.processPointName = null
        } else {
          const find = this.blurData.find(data => data.id === this.formdata.processPointID)
          if (find) {
            this.formdata.processPointName = find.value
          } else {
            this.formdata.processPointID = null
          }
        }
      },
      querySearchAsync(queryString, cb) {
        api.produce.outsourceAdd.selectWorkingSpace({
          WorkSpaceName: queryString
        }).then(data => {
          this.blurData = data.map(d => ({
            value: d.workSpaceName,
            id: d.id
          }))
          const results = queryString ? this.blurData.filter(state => state.value.includes(queryString)) : this.blurData
          cb(results)
        })
      },
      deleteBarCode(scope) {
        this.tableOptions.data = this.tableOptions.data.filter(data => data.barCode !== scope.row.barCode)
        this.formdata.barCodes = this.formdata.barCodes.filter(barcode => barcode !== scope.row.barCode)
      }
    },
    mounted() {
      this.GetProcessListGwj()
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.formdata = JSON.parse(JSON.stringify(OUTSOURCE_ADD.formData))
        vm.tableOptions.data = []
      })
    },
    beforeRouteLeave (to, from, next) {
      next()
    }
  }
</script>

<style lang="sass" scoped>
  .btn-icon
    margin-right: 5px
  .content-wrapper
    text-align: left
    margin: 16px
    .el-breadcrumb
      margin-bottom: 16px
  .form
    margin-top: 20px
    .el-autocomplete
      width: 100%
  .delete
    margin-top: 5px
    cursor: pointer
    color: #337ab7
</style>
