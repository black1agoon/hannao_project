<template>
  <section class="design-view">
    <div class="view-top">
      <div class="tool-btn">
        <div class="search-item" v-for="item in searchItems" :key="item.value">
          <label>{{ item.name }}：</label>
          <el-date-picker v-if="item.value === 'createTime' || item.value === 'deliverDate'"
                          v-model="selectDate[item.value]" type="daterange" size="small"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期" value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-select v-else-if="item.value === 'proState'" v-model="query[item.value]" size="small" placeholder="请选择">
            <el-option
              v-for="item in proStateItems"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input v-else v-model="query[item.value]" clearable size="small" placeholder="请输入"></el-input>
        </div>
        <el-button type="primary" size="small" icon="el-icon-search" @click="getData">查询</el-button>
        <el-button size="small" icon="el-icon-refresh" @click="reloadTable">重置</el-button>
        <el-button size="small" icon="el-icon-download" @click="handleExport">导出</el-button>
        <el-button size="small" icon="el-icon-setting" @click="handleOpenCols"></el-button>
      </div>
      <div class="table-wrap">
        <el-table ref="table" :data="tableData" height="auto" size="medium"
                  highlight-current-row header-row-class-name="table-header" @row-click="rowClick">
          <el-table-column type="selection" :index="tableIndex" align="center"></el-table-column>
          <el-table-column type="index" label="序号" align="center"></el-table-column>
          <el-table-column v-for="prop in tableColumns" :key="prop.name" :width="prop.width" :min-width="prop.minWidth"
                           :label="prop.label" :prop="prop.name" :fixed="prop.fixed">
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
      <el-tab-pane label="各工序完成明细" name="first" class="tab-wrap">
        <el-table :data="detailData" height="auto" size="medium" v-loading="detailLoading"
                  highlight-current-row>
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column v-for="prop in detailColumns" :key="prop.name"
                           :label="prop.label" :prop="prop.name">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <la-export-dialog ref="exportDialog"></la-export-dialog>
    <la-table-columns-setting ref="column-dialog" @selectedColumns="selectedColumns"></la-table-columns-setting>
  </section>
</template>

<script>
  import { api } from '@/api'
  import { searchItems, tableButtons, tableColumns, detailColumns } from './production-progress.config'
  import LaExportDialog from '@/components/base/LaExportDialog.vue'
  import LaTableColumnsSetting from '@/components/base/LaTableColumnsSetting'
  import { loadTableColumns } from '@/helpers/TableHelper'
  import { indexByProperty } from '@/utils/object-list'

  export default {
    name: 'ProductionProgressView',
    components: { LaTableColumnsSetting, LaExportDialog },
    computed: {
      searchItems () {
        return searchItems.map(item => {
          return { ...item }
        })
      },
      tableButtons () {
        return tableButtons.filter(btn => {
          return !btn.hidden
        })
      },
      detailColumns () {
        const cols = indexByProperty(this.detailData.flatMap(row => row.stepsAndNumberList), 'stepName')
        return detailColumns.concat(Object.values(cols).map(v => ({name: v.stepName, label: v.stepName, minWidth: 100})))
      },
    },
    data () {
      return {
        tableColumns: loadTableColumns(this.$route.path, tableColumns),
        selectDate: {
          createTime: '',
          deliverDate: '',
        },
        proStateItems: [],
        query: {
          createTimeStart: '',
          createTimeEnd: '',
          deliverDateStart: '',
          deliverDateEnd: '',
          code: '',
          proState: 0,
          page: 1,
          rows: 20,
        },
        tableData: [],
        total: 0,
        tableIndex: 1,
        selectRow: {},
        activeTab: 'first',
        detailLoading: false,
        detailData: [],
        showDialog: false,
      }
    },
    methods: {
      getData () {
        this.query.createTimeStart = this.selectDate.createTime[0] || ''
        this.query.createTimeEnd = this.selectDate.createTime[1] || ''
        this.query.deliverDateStart = this.selectDate.deliverDate[0] || ''
        this.query.deliverDateEnd = this.selectDate.deliverDate[1] || ''
        api.dataCenter.getPlanBillPage(this.query).then(data => {
          this.tableData = data?.rows || []
          this.total = data?.total || data?.length || 0
          this.tableIndex = this.query.rows * this.query.page - (this.query.rows - 1)
        })
      },
      getDetailsData () {
        this.detailLoading = true
        api.dataCenter.getStepsDetail(this.selectRow.parGuid).then(data => {
          this.detailData = (data ? data : []).map(v => ({...v, ...Object.assign({}, ...v.stepsAndNumberList.map(n => ({[n.stepName]: n.number})))}))
          this.detailLoading = false
        })
      },
      selectedColumns (arr) {
        this.tableColumns = arr
      },
      reloadTable () {
        this.selectDate = {
          createTime: '',
          deliverDate: '',

        }
        this.query.proState = 0
        this.query.code = ''
      },
      handleExport () {
        this.$refs.exportDialog.open({
          title: '生产进度监控',
          url: '/api/DataCenter/ExportExcel',
          columns: this.tableColumns,
          params: this.query,
        })
      },
      handleOpenCols () {
        this.$refs['column-dialog'].open({
          columns: tableColumns,
          name: this.$route.path,
        })
      },
      rowClick (row) {
        this.selectRow = row
        this.getDetailsData()
      },
      handleSizeChange (val) {
        this.query.rows = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.query.page = val
        this.getData()
      },
      getCommonInfo () {
        api.produce.plan.GetProState().then(data => {
          this.proStateItems = data.map(v => {
            return {
              value: v.stateKey,
              label: v.stateExplain,
            }
          })
        })
      },
    },
    mounted () {
      this.getData()
      this.getCommonInfo()
    },
  }
</script>

<style lang="sass" scoped>
  .design-view
    width: 100%
    height: 100%

    .view-top
      height: 55%
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

          .el-select
            width: 150px

      .table-wrap
        flex: 1
        display: flex
        flex-direction: column
        align-items: flex-start
        overflow: hidden

    .view-bottom
      height: 45%
      display: flex
      flex-direction: column

      .tab-wrap
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
