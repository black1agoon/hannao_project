<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-layout :regions="REGIONS">
      <div slot="north">
        <el-input placeholder="请输入模型名称"
                  v-model="query.modelName"
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
        <el-table-column label="是否默认" align="center" width="200">
          <template slot-scope="scope">
            <i :class="getStatus(scope.row.pretermission)"></i>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" minWidth="200" prop="createTime">
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
    name: 'model-name-chose-window',
    components: {
      EuiLayout,
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
          modelName: null
        },
        checkedNode: {},
        windowOptions: {
          title: '模型名称'
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'modelName', label: '模型名称', width: 150},
            {prop: 'modelCode', label: '模型编码', width: 100, align: 'center'},
            {prop: 'stockingsCode', label: '袜型', width: 100},
            {prop: 'needleNumber', label: '针数', width: 100},
            {prop: 'needleCode', label: '单双针', width: 100}
          ],
          rowClick: (row, event, column) => {
            this.checkedNode = {...row}
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
        api.modelName.paged(query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      sure() {
        if (this.checkedNode.id) {
          this.$parent.$emit('modelName', this.checkedNode, this.from)
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
        this.getData(this.query)
      },
      getStatus(status) {
        return status === 0 ? 'el-icon-close' : 'el-icon-check'
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
