<template>
  <section class="content-view">
    <div class="tool-btn">
      <div class="search-item">
        <label>条码：</label>
        <el-input v-model="query.barCode" size="small" placeholder="请输入"></el-input>
      </div>
      <el-button type="primary" size="small" icon="el-icon-search" @click="getData">查询</el-button>
<!--      <el-button size="small" @click="reloadTable">条码补打</el-button>-->
    </div>
    <div class="table-wrap">
      <el-table :data="tableData" height="auto" size="medium"
                highlight-current-row>
        <el-table-column type="index" label="序号" :index="tableIndex" align="center"></el-table-column>
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
  </section>
</template>

<script>
  import { tableColumns } from './garment-lifecycle.config';
  import {api} from "@/api";
  export default {
    name: "GarmentLifecycleView",
    computed: {
      tableColumns () {
        return tableColumns.map( col => {
          return { ...col }
        })
      }
    },
    data() {
      return {
        selectDate: '',
        query: {
          barCode: '',
          page: 1,
          rows: 20,
        },
        tableData: [],
        total: 0,
        tableIndex: 1,
      }
    },
    methods: {
      getData() {
        api.dataCenter.getSelectRecord({...this.query, barCode: this.query.barCode ? this.query.barCode : '-1'}).then( data => {
          this.tableData = data?.rows || []
          this.total = data?.total || data?.length || 0
          this.tableIndex = this.query.rows * this.query.page - (this.query.rows - 1)
        })
      },
      handleSizeChange (val) {
        this.query.rows = val
        this.getData()
      },
      handleCurrentChange (val) {
        this.query.page = val
        this.getData()
      }
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
