<template>
  <section class="design-view">
    <div class="view-top">
      <div class="tool-btn">
        <div class="search-item">
          <label>年份：</label>
          <el-date-picker v-model="query.year"
                          type="year" size="small" value-format="yyyy"
                          placeholder="选择年份">
          </el-date-picker>
        </div>
        <el-button type="primary" size="small" icon="el-icon-search" @click="getData">查询</el-button>
        <el-button size="small" icon="el-icon-download" @click="handleExport">导出</el-button>
      </div>
      <div class="table-wrap">
        <el-table :data="tableData" height="auto" size="medium" highlight-current-row @row-click="rowClick">
          <el-table-column type="index" :index="tableIndex" label="序号" align="center"></el-table-column>
          <el-table-column v-for="prop in tableColumns" :key="prop.name"
                           :width="prop.width" :min-width="prop.minWidth"
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
    </div>
    <el-tabs v-model="activeTab" type="card" class="view-bottom">
      <el-tab-pane label="员工产量明细" name="first" class="tab-wrap">
        <div class="tool-btn">
          <div class="search-item">
            <label>款号：</label>
            <el-input v-model="query.month" size="small" placeholder="请输入"></el-input>
          </div>
          <el-button type="primary" size="small" icon="el-icon-search" @click="searchDetail">查询</el-button>
          <el-button size="small" icon="el-icon-refresh" @click="handleExportDetail">导出</el-button>
        </div>
        <div class="table-wrap">
          <el-table :data="detailData" height="auto" size="medium" highlight-current-row>
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column v-for="prop in detailColumns" :key="prop.name"
                             :width="prop.width" :min-width="prop.minWidth"
                             :label="prop.label" :prop="prop.name">
            </el-table-column>
          </el-table>
          <el-pagination layout="sizes, prev, pager, next, jumper"
                         background :page-sizes="[10, 20, 50, 100]"
                         :page-size="detailQuery.rows" :total="detailTotal"
                         :current-page="detailQuery.page"
                         @size-change="detailSizeChange"
                         @current-change="detailCurrentChange">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <la-export-dialog ref="exportDialog"></la-export-dialog>
  </section>
</template>

<script>
  import { tableColumns, detailColumns } from './monthly-report.config';
  import LaExportDialog from '@/components/base/LaExportDialog.vue';
  import {api} from "@/api";
  export default {
    name: "MonthlyReportView",
    components: {
      LaExportDialog
    },
    computed: {
      tableColumns () {
        return tableColumns.map( col => {
          return { ...col }
        })
      },
      detailColumns () {
        return detailColumns.map( col => {
          return { ...col }
        })
      }
    },
    data() {
      return {
        query: {
          year: '',
          page: 1,
          rows: 20,
        },
        tableData: [],
        total: 0,
        tableIndex: 1,
        selectRow: {},
        detailQuery: {
          yearandmonth: '',
          styleCode: '',
          page: 1,
          rows: 20
        },
        activeTab: 'first',
        detailData: [],
        detailTotal: 0,
        detailIndex: 1,
      }
    },
    methods: {
      getData() {
        api.dataCenter.getStoInOut(this.query).then( data => {
          this.tableData = data?.rows || []
          this.total = data?.total || data?.length || 0
          this.tableIndex = this.query.rows * this.query.page - (this.query.rows - 1)
        })
      },
      getDetailData () {
        api.dataCenter.getStoInDetailOut(this.detailQuery).then( data => {
          this.detailData = data?.rows || []
          this.detailTotal = data?.total || data?.length || 0
          this.detailTotal = this.detailQuery.rows * this.detailQuery.page - (this.detailQuery.rows - 1)
        })
      },
      rowClick (row) {
        this.selectRow = row
        const month = +row.month.substr(0,row.month.length -1)
        this.detailQuery.yearandmonth = this.query.year + '-' + (month < 10 ? '0' + month : month)
        this.getDetailData()
      },
      handleExport () {
        this.$refs.exportDialog.open({
          title: '公司生产月报表',
          url: '/api/DataCenter/StoInExportExcel',
          columns: this.tableColumns,
          params: this.query,
        })
      },
      searchDetail () {
        if (this.detailQuery.yearandmonth) {
          this.detailQuery.page = 1
          this.getDetailData()
        } else {
          this.$message.warning('请选择月份')
        }
      },
      handleExportDetail () {
        if (this.detailQuery.yearandmonth !== '') {
          this.$refs.exportDialog.open({
            title: '员工产量明细-' + this.detailQuery.yearandmonth,
            url: '/api/DataCenter/StoInDetailExportExcel',
            columns: this.detailColumns,
            params: this.detailQuery
          })
        } else {
          this.$message.warning('请选择月份')
        }
      },
      handleSizeChange (val) {
        this.query.rows = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.query.page = val
        this.getData()
      },
      detailSizeChange (val) {
        this.detailQuery.rows = val
        this.getDetailData()
      },
      detailCurrentChange (val) {
        this.detailQuery.page = val
        this.getDetailData()
      }
    },
    mounted() {
      this.query.year = new Date().getFullYear() + ''
      this.getData()
    }
  }
</script>

<style lang="sass" scoped>
  .design-view
    width: 100%
    height: 100%
    .view-top
      height: 52%
      display: flex
      flex-direction: column
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
    .view-bottom
      height: 48%
      display: flex
      flex-direction: column
      .tab-wrap
        flex: 1
        display: flex
        flex-direction: column
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