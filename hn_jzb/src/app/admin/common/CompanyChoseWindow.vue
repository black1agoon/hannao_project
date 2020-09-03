<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-layout :regions="REGIONS">
      <div slot="north">
        <el-input placeholder="请输入企业名称"
                  v-model="query.cnName"
                  class="input-with-select searchbox"
                  :clearable="true"
                  @clear="clearSearch">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="search">
          </el-button>
        </el-input>
      </div>
      <eui-table
        slot="center"
        ref="table"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
      </eui-table>
    </eui-layout>
    <div slot="btns">
      <el-button type="primary" size="mini" @click="sure">确定</el-button>
      <el-button size="mini" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import EuiTree from '@/components/common/form/EuiTree'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  const REGIONS = {
    north: {
      style: {
        height: '42px'
      }
    },
    center: {}
  }
  export default {
    name: 'company-chose-window',
    components: {
      EuiLayout,
      EuiTree,
      EuiWindow,
      EuiTable
    },
    data() {
      return {
        REGIONS,
        index: 0,
        from: null,
        query: {
          page: 1,
          pageSize: 10,
          cnName: null
        },
        checkedNode: {},
        windowOptions: {
          title: '企业选择'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'cnName', label: '企业名称', width: 200, fixed: true},
            {prop: 'enName', label: '英文名', width: 200},
            {prop: 'username', label: '登录名', width: 200},
            {prop: 'gradeName', label: '企业等级', width: 150},
            {prop: 'industryName', label: '所属行业', width: 150},
            {prop: 'legalRepresentative', label: '法人代表', width: 100},
            {prop: 'expireDate', label: '到期时间', width: 200},
            {prop: 'contractPeriod', label: '合同期限', width: 100},
            {prop: 'operator', label: '公司运营者', width: 100},
            {prop: 'telephone', label: '联系电话', width: 150},
            {prop: 'employees', label: '员工总数', width: 100},
            {prop: 'regAddress', label: '企业注册地址', width: 200},
            {prop: 'regAddressCode', label: '注册地址邮编', width: 100},
            {prop: 'regionName', label: '地址所属区域', width: 100},
            {prop: 'operateAddress', label: '运营地址', width: 200},
            {prop: 'statusName', label: '状态', width: 100},
            {prop: 'workingLanguage', label: '工作语言', width: 100}
          ],
          rowClick: (row, event, column) => {
            this.checkedNode = JSON.parse(JSON.stringify(row))
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
        api.company.getCompanyPassedPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      sure() {
        if (this.checkedNode.id) {
          this.$parent.$emit('checkedNode', this.checkedNode, this.from)
          this.$refs.window.cancel()
        } else {
          this.$refs.window.cancel()
        }
      },
      cancel() {
        this.$refs.window.cancel()
      },
      open(from = 'form') {
        this.from = from
        this.getData(this.query)
        this.$refs.window.open()
      },
      search() {
        this.query.page = 1
        this.getData(this.query)
      },
      clearSearch(val) {
        this.query.cnName = null
        this.getData(this.query)
      }
    },
    mounted() {
      // this.getData(this.query)
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog
    height: 70%

  /deep/ .el-dialog__body
    padding: 0 20px
    height: calc(100% - 78px)
    overflow-y: auto

  .searchbox
    width: 30%
    margin: 6px 0 0 10px
    /deep/ .el-input__inner
      height: 30px
</style>
