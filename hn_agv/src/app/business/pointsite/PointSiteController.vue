<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
      <super-search
          ref="search"
          v-model="query"
          :options="SEARCH_OPTIONS"
          @search="superSearch"
          slot="right"
          style="margin-right: 35px">
      </super-search>
    </main-toolbar>
    <eui-table
        class="center-wrap"
        slot="south"
        ref="table"
        :highlight-current-row="false"
        :options="tableOptions">
      <el-table-column label="操作" align="center" minWidth="200" fixed="right">
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
    <point-site-window
        ref="window"
        @reload="tableOptions.reload">
    </point-site-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import {POINT} from './pointsite.config'
  import helper from '@/app/app.helpers'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTable from '@/components/common/form/EuiTable'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import PointSiteWindow from './window/PointSiteWindow'
  import SuperSearch from '@/components/common/tools/SuperSearch'
  export default {
    name: 'point-site-controller',
    _meta: {
      path: '/pointsite/controller',
      title: '地图点位管理'
    },
    components: {
      EuiLayout,
      EuiTable,
      MainToolbar,
      PointSiteWindow,
      SuperSearch
    },
    data() {
      return {
        helper,
        REGIONS: POINT.REGIONS,
        buttons: helper.getMainButtons(),
        query: {
          page: 1,
          pageSize: 10,
          name: null, // 编号
          position: null, // 站点号
          lineNumber: null, // 行位置
          columnNumber: null, // 列位置
          callSite: null // 呼叫点
        },
        SEARCH_OPTIONS: POINT.SEARCH_OPTIONS,
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'name', label: '编号', minWidth: 150},
            {prop: 'position', label: '站点号', minWidth: 100},
            {prop: 'lineNumber', label: '行位置', minWidth: 100},
            {prop: 'columnNumber', label: '列位置', minWidth: 100},
            {prop: 'callSite', label: '呼叫点', minWidth: 100},
            {prop: 'seq', label: '排序', minWidth: 100, sortable: true}
          ],
          rowClassName: ({row, rowIndex}) => {
          },
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
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
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            this.$refs.window.open(row)
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除: 地图点位 ${row.name}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.pointSite.delete([row.id]).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData()
              })
            }).catch(() => {
            })
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      getData() {
        api.pointSite.paged(this.query).then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
        })
      },
      superSearch(searchinfo) {
        this.query.page = 1
        this.query.name = searchinfo.name
        this.query.position = searchinfo.position
        this.query.lineNumber = searchinfo.lineNumber
        this.query.columnNumber = searchinfo.columnNumber
        this.query.callSite = searchinfo.callSite
        this.getData()
      }
    },
    mounted() {
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData()
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

