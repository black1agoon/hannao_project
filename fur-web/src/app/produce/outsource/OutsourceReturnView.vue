<template>
  <eui-layout :regions="region">
    <div slot="north" class="content-wrapper">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/produce/outsource' }" @click.native="goToOutsourceView">委外管理</el-breadcrumb-item>
        <el-breadcrumb-item>委外回收</el-breadcrumb-item>
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
      <div class="bar-box">
        <div class="label">条码: </div>
        <eui-input class="input" v-model="barCode" placeholder="请输入条码">
        </eui-input>
        <el-button
            size="small"
            type="primary"
            @click="onBtnClick('btnBarCode')">
          <i class="btn-icon fa fa-check"></i>确定
        </el-button>
      </div>
    </div>
    <eui-table
      slot="center"
      ref="table"
      :show-selection="false"
      :showPagination="false"
      :show-index="true"
      :highlight-current-row="true"
      :options="tableOptions">
    </eui-table>
  </eui-layout>
</template>

<script>
  import EuiTable from '@/app/produce/components/form/EuiTable'
  import EuiLayout from '@/app/produce/components/layout/EuiLayout'
  import { OUTSOURCE_RETURN } from '../produce.config'
  import { api } from '@/api'
  import EuiInput from '@/app/produce/components/form/EuiInput'
  export default {
    name: 'outsource-return-view',
    components: {
      EuiInput,
      EuiTable,
      EuiLayout
    },
    data() {
      return {
        region: OUTSOURCE_RETURN.region,
        tableOptions: {
          data: [],
          columns: [
            {prop: 'barCode', label: '条码', minWidth: 100},
            {prop: 'styleCode', label: '款号', minWidth: 80},
            {prop: 'styleName', label: '品名', minWidth: 80},
            {prop: 'colorName', label: '颜色', minWidth: 100},
            {prop: 'size', label: '尺码', minWidth: 80},
            {prop: 'workspace', label: '加工点', minWidth: 80},
          ]
        },
        buttons: OUTSOURCE_RETURN.buttons,
        barCode: null,
      }
    },
    methods: {
      onBtnClick(btnKey, row) {
        const btnHandlers = {
          'btnReturn': () => {
            this.$confirm(`是否确定回收？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.produce.outsourceReturn.OutsourcingReceive(this.tableOptions.data.map(row => row.barCode)).then(() => {
                this.$message({
                  message: '回收成功!',
                  type: 'success'
                })
                this.goToOutsourceView()
              })
            }).catch(() => {
              //
            })
          },
          'btnBack': () => {
            this.goToOutsourceView()
          },
          'btnBarCode': () => {
            if (this.tableOptions.data.findIndex(row => row.barCode === this.barCode) !== -1) {
              this.$message({
                message: '请不要添加重复的条码!',
                type: 'warning'
              })
              return
            }
            api.produce.outsourceReturn.OutsourcingReceiveInfo({
              barcode: this.barCode
            }).then(data => {
              this.tableOptions.data.push(data)
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      goToOutsourceView() {
        this.$router.push('/produce/outsource')
      }
    },
    mounted() {
      //
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.barCode = null
        vm.tableOptions.data = []
      })
    },
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
    .bar-box
      margin: 16px
      .label
        display: inline-block
        font-size: 14px
        margin-right: 10px
      .input
        display: inline-block
        width: 300px
        margin-right: 20px
</style>
