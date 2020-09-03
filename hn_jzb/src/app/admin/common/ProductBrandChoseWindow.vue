<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-layout :regions="REGIONS">
      <div slot="north">
        <el-input placeholder="请输入品牌名称"
                  v-model="query.name"
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
        <template slot="prev">
          <el-table-column label="品牌名称" align="center" minWidth="200">
            <template slot-scope="scope">
              <a :href="scope.row.url" target="_blank">{{scope.row.name}}</a>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="审核状态" align="center" minWidth="200">
          <template slot-scope="scope">
            <i :class="getStatus(scope.row.status)"></i>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" minWidth="200">
          <template slot-scope="scope">{{scope.row.memo}}
          </template>
        </el-table-column>
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
  import helper from '@/app/app.helpers'
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
    name: 'product-brand-chose-window',
    components: {
      EuiLayout,
      EuiTree,
      EuiWindow,
      EuiTable
    },
    props: {
      companyId: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        helper,
        REGIONS,
        index: 0,
        from: null,
        query: {
          companyId: null,
          page: 1,
          pageSize: 10,
          name: null
        },
        checkedNode: {},
        windowOptions: {
          title: '品牌选择'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'companyName', label: '所属企业', minWidth: 200}
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
        api.productBrand.getBrandShowPaged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      sure() {
        if (this.checkedNode.id) {
          this.$parent.$emit('brandChose', this.checkedNode, this.from)
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
        this.$refs.window.open()
        this.query.companyId = this.companyId
        this.getData(this.query)
      },
      search() {
        this.query.page = 1
        this.getData(this.query)
      },
      clearSearch(val) {
        this.query.cnName = null
        this.getData(this.query)
      },
      getStatus(status) {
        return status === 0 ? 'el-icon-close' : 'el-icon-check'
      }
    },
    mounted() {
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

  /deep/ .el-dialog__body
    padding: 0
  .searchbox
    width: 30%
    margin: 6px 0 0 10px
    /deep/ .el-input__inner
      height: 30px
</style>
