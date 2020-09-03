<template>
  <eui-layout :regions="REGIONS">
    <super-search
        class="super-search"
        ref="search"
        v-model="query"
        :options="SEARCH_OPTIONS"
        @search="superSearch"
        slot="north">
    </super-search>
    <eui-table
        class="center-wrap"
        slot="center"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions">
      <el-table-column slot="onlineStatus" label="状态" align="center" minWidth="100">
        <template slot-scope="scope">
          <span class="circle-status" :class="{online: scope.row.onlineStatus === '1'}">
          </span>
        </template>
      </el-table-column>
    </eui-table>
    <div class="table-box" slot="south">

      <el-tabs type="card" v-model="tabValue" @tab-click="tabClick">
        <el-tab-pane label="主动码设备行为日志" name="first">
          <eui-table
              class="table"
              :highlight-current-row="false"
              :options="subTableOptions">
          </eui-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {ACTIVE_CODE} from './activecode.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'active-code-controller',
    _meta: {
      path: '/activecode/controller',
      title: '主动码'
    },
    components: {
      EuiLayout,
      EuiTable,
      SuperSearch
    },
    data() {
      return {
        helper,
        REGIONS: ACTIVE_CODE.REGIONS,
        buttons: helper.getMainButtons(),
        SEARCH_OPTIONS: ACTIVE_CODE.SEARCH_OPTIONS,
        tabValue: 'first',
        query: {
          page: 1,
          pageSize: 10,
          code: null,
          codeType: null,
          name: null,
          enterpriseName: null,
          dataServiceCode: null,
          activeCodeOnlineStatus: null
        },
        subQuery: {
          page: 1,
          pageSize: 10,
          activeCodeId: null
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'dataServiceCode', label: '编码', minWidth: 150},
            {prop: 'name', label: '设备名称', minWidth: 100},
            {prop: 'enterpriseName', label: '企业名称', minWidth: 100},
           // {prop: 'code', label: '条码值', minWidth: 100},
            {prop: 'codeTypeName', label: '条码类型名称', minWidth: 100},
            {prop: 'onlineStatus', label: '在线状态', minWidth: 100, slot: true},
            {prop: 'statusStartTime', label: '状态开始时间', minWidth: 100},
            {prop: 'version', label: '版本号', minWidth: 100},
            {prop: 'station', label: '工位号', minWidth: 100},
            {prop: 'createTime', label: '创建时间', minWidth: 100}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            this.subQuery.activeCodeId = row.id
            this.subQuery.page = 1
            this.subTableOptions.currentPage = 1
            this.getSubData()
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData()
          }
        },
        subTableOptions: {
          data: [],
          total: 0,
          currentPage: 1,
          columns: [
            {prop: 'actionName', label: '主动码动作名称', minWidth: 100},
            {prop: 'action', label: '编码', minWidth: 100},
            {prop: 'createTime', label: '创建时间', minWidth: 100}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
          },
          reload: (name, val) => {
            this.subQuery.page = name === 'page' ? val : this.subQuery.page
            this.subQuery.pageSize = name === 'pageSize' ? val : this.subQuery.pageSize
            this.getSubData()
          }
        }
      }
    },
    methods: {
      getData() {
        api.activeCode.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      getSubData() {
        api.activeCode.subPaged(this.subQuery).then(data => {
          this.subTableOptions.data = data.records
          this.subTableOptions.total = data.total
        })
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.code = searchinfo.code
        this.query.codeType = searchinfo.codeType
        this.query.name = searchinfo.name
        this.query.enterpriseName = searchinfo.enterpriseName
        this.query.dataServiceCode = searchinfo.dataServiceCode
        this.query.activeCodeOnlineStatus = searchinfo.activeCodeOnlineStatus
        this.getData()
      },
      getTreeData() {
        api.activeCodeType.groupTree('0').then((data) => {
          this.SEARCH_OPTIONS.conditionSearch.codeType.options = this.getTree(data ? data : [], 'types', 'name')
        })
      },
      getTree(treedata, childProp, prop) {
        let sortNodes = nodes => nodes.sort((a, b) => a.seq - b.seq)
        let setName = node => {
          let hasChildren = node[childProp] && node[childProp].length > 0
          return {
            id: node.code,
            label: node[prop],
            icon: hasChildren ? 'fa-folder' : 'fa-gear',
            resourceType: node.resourceType,
            children: hasChildren ? sortNodes(node[childProp]).map(setName) : undefined,
          }
        }
        return sortNodes(treedata).map(setName)
      },
      tabClick() {
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData()
        vm.getTreeData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .super-search
    height: 40px
    line-height: 40px
    padding-left: 30px
  .table-box
    height: 100%
    display: flex
    flex-direction: column
  .el-tabs
    height: 100%
    /deep/ .el-tabs__content
      height: calc(100% - 30px)
    /deep/ .el-tab-pane
      height: 100%
  .circle-status
    display: inline-block
    width: 20px
    height: 20px
    border-radius: 50%
    background: #7e8c8d
    margin: 0 auto
    &.online
      background: chartreuse
</style>

