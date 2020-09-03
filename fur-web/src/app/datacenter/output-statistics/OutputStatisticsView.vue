<template>
  <section class="content-view">
    <div class="tool-btn">
      <div class="search-item" v-for="item in searchItems" :key="item.value">
        <label>{{item.name}}：</label>
        <el-date-picker v-if="item.value === 'time'" v-model="selectDate"
                        type="daterange" size="small" value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <tree-select ref="treeSelect" v-else-if="item.value === 'departmentGuid'" v-model="query[item.value]" size="small"
                     :loader="depLoader" :props="depProps"></tree-select>
        <el-input v-else v-model="query[item.value]" size="small" clearable placeholder="请输入"></el-input>
      </div>
      <el-button type="primary" size="small" icon="el-icon-search" @click="getData">查询</el-button>
      <el-button size="small" icon="el-icon-refresh" @click="clearSearch">重置</el-button>
      <el-button size="small" icon="el-icon-download" @click="handleExport">导出</el-button>
      <el-button size="small" icon="el-icon-setting" @click="handleOpenCols"></el-button>
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" height="auto" size="medium" highlight-current-row>
        <el-table-column type="index" :index="tableIndex" label="序号" align="center"></el-table-column>
        <el-table-column v-for="prop in tableColumns" :key="prop.name"
                         :label="prop.label" :prop="prop.name">
        </el-table-column>
      </el-table>
      <el-pagination layout="sizes, prev, pager, next, jumper"
                     background :page-sizes="[10, 20, 50, 100]"
                     :page-size="query.rows" :total="total"
                     :current-page="query.page"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <la-export-dialog ref="exportDialog"></la-export-dialog>
  </section>
</template>

<script>
  import {api} from "@/api";
  import { searchItems, tableColumns } from './output-statistics.config';
  import TreeSelect from "@/components/form/TreeSelect";
  import LaExportDialog from '@/components/base/LaExportDialog.vue';
  import { loadTableColumns } from '@/helpers/TableHelper'
  export default {
    name: "OutputStatisticsView",
    components: {TreeSelect, LaExportDialog},
    computed: {
      searchItems () {
        return searchItems.map( item => {
          return { ...item }
        })
      },
      tableColumns () {
        return this.customTableColumns.map( col => {
          return { ...col }
        })
      }
    },
    data() {
      return {
        customTableColumns: loadTableColumns(this.$route.path, tableColumns),
        selectDate: '',
        query: {
          startTime: '',
          endTime: '',
          departmentGuid: '',
          realName: '',
          page: 1,
          rows: 20,
        },
        tableData: [],
        total: 0,
        tableIndex: 1,
        depLoader: api.dropdown.department,
        depProps: {
          value: 'id',
          label: 'text',
          children: 'children',
        }
      }
    },
    methods: {
      getData() {
        this.query.startTime = this.selectDate && this.selectDate[0] || ''
        this.query.endTime = this.selectDate && this.selectDate[1] || ''
        api.dataCenter.getOperatorListOut(this.query).then( data => {
          this.tableData = data?.rows || []
          this.total = data?.total || data?.length || 0
          this.tableIndex = this.query.rows * this.query.page - (this.query.rows - 1)
        })
      },
      clearSearch () {
        this.selectDate = ''
        this.$refs.treeSelect[0].clearHandle()
        this.query.realName = ''
      },
      handleOpenCols () {
        this.$store.commit('common/setColumnsConfig', {
          name: this.$route.path,
          columns: tableColumns,
          callback: (columns) => {
            this.customTableColumns = columns
          }
        })
      },
      handleExport () {
        this.$refs.exportDialog.open({
          title: '员工产量统计报表',
          url: '/api/DataCenter/OperatorListExportExcel',
          columns: this.tableColumns,
          params: this.query,
        })
      },
      handleSizeChange (val) {
        this.query.rows = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.query.page = val
        this.getData()
      },
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style lang="sass" scoped>
  .content-view
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    .tool-btn
      display: flex
      flex-wrap: wrap
      align-items: center
      line-height: 40px
      padding: 0 10px
      .search-item
        display: flex
        align-items: center
        label
          white-space: nowrap
    .table-wrap
      flex: 1
      display: flex
      flex-direction: column
      align-items: flex-start
      overflow: hidden
  ::v-deep
    .el-input,
    .el-date-editor,
    .el-select
      margin-right: 10px
    .el-pagination
      padding: 5px
    .el-tabs__header
      margin: 0 0 5px
    .el-tabs__content
      flex: 1
      display: flex
    .el-button
      margin-top: 4px
      margin-bottom: 4px
</style>
