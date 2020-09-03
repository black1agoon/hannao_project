<template>
  <div class="table-wrapper">
    <el-table
      ref="table"
      class="table"
      :data="options.data"
      :span-method="options.objectSpanMethod"
      style="width: 100%"
      size="small"
      height="数值无关紧要，但必须要设置"
      header-row-class-name="header-class"
      :highlight-current-row="highlightCurrentRow"
      :show-summary="showSummary"
      @selection-change="(...params) => todoEvent('handleSelectionChange', ...params)"
      @row-click="(...params) => todoEvent('rowClick', ...params)"
      @row-dblclick="(...params) => todoEvent('rowDblclick', ...params)">
      <el-table-column
        v-if="showSelection"
        type="selection"
        width="40"
        fixed>
      </el-table-column>
      <el-table-column
        v-if="showIndex"
        type="index"
        width="40"
        fixed>
      </el-table-column>
      <slot name="prev"></slot>
      <template v-for="(item) in options.columns">
        <el-table-column
          v-if="item.click"
          :key="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :align="item.align"
          :sortable="item.sortable">
          <template slot-scope="scope">
            <span class="click-span" @click="handleClick(scope.row)">{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :align="item.align || 'center'"
          :sortable="item.sortable">
        </el-table-column>
      </template>
      <slot></slot>
    </el-table>
    <el-pagination
      v-if="showPagination"
      class="pagination"
      :current-page.sync="options.currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      :small="true"
      :layout="layout"
      :total="options.total">
      <div class="slot-refresh">
        <span class="fa fa-refresh" @click="refresh"></span>
      </div>
    </el-pagination>
    <!--<span v-show="showRefresh && showPagination" class="refresh fa fa-refresh" @click="refresh"></span>-->
  </div>
</template>

<script>
  export default {
    name: 'eui-table',
    props: {
      options: {
        type: Object,
        default: () => ({
          data: [],
          total: 0,
          currentPage: 1
        })
      },
      showPagination: {
        type: Boolean,
        default: true
      },
      showIndex: {
        type: Boolean,
        default: true
      },
      showSelection: {
        type: Boolean,
        default: false
      },
      pageSize: {
        type: Number,
        default: 10
      },
      layout: {
        type: String,
        default: 'total, sizes, prev, pager, next, jumper, slot'
      },
      showRefresh: {
        type: Boolean,
        default: true
      },
      highlightCurrentRow: {
        type: Boolean,
        default: true
      },
      showSummary: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentPage: 1,
        selectionList: []
      }
    },
    methods: {
      todoEvent(name, ...params) {
        if (this.options[name]) {
          this.options[name](...params)
        }
      },
      handleSizeChange(pageSize) {
        // this.$emit('reloadTable', 'pageSize', pageSize)
        this.options['reload']('pageSize', pageSize)
      },
      handleCurrentChange(page) {
        this.currentPage = page
        // this.$emit('reloadTable', 'page', page)
        this.options['reload']('page', page)
      },
      refresh() {
        // this.$emit('reloadTable')
        this.options['reload']()
      },
      callByName(fn, ...args) {
        this.$refs.table[fn].call(this, ...args)
      },
      handleClick(row) {
        this.$emit('fieldClick', row)
      }
    },
    watch: {
      'currentPage' () {
        if (this.options.data.length === 0) {
          this.$emit('reloadTable', 'page', this.currentPage)
        }
      }
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.table-wrapper
  display: flex
  flex-direction: column
  flex: 1
  width: 100%
  height: 100%
  padding: 0 20px
  box-sizing: border-box
  /*background: #ebf1f6*/
  .table
    flex: 1
    .click-span
      font-weight: bold
      color: #409eff
      cursor: pointer
  .pagination
    padding: 5px
    border-bottom: 1px solid #eee
    .slot-refresh
      display: inline-block
      text-align: center
      cursor: pointer
      margin-left: 10px
      span
        font-size: 16px
      &:hover
        color: #409EFF
  .refresh
    position: absolute
    display: block
    width: 38px
    height: 38px
    bottom: 0
    right: 0
    line-height: 38px
    cursor: pointer
    text-align: center
    &:hover
      color: #409EFF
/deep/ .header-class
  color: #000
  th
    /*background: #ebf1f6*/
    /*border-right: 1px solid #fff*/
</style>
<style>
  .el-table th>.cell{
    color: #000;
    font-weight: bold;
  }
  .el-table__body tr.current-row>td,
  .el-table__body tr.hover-row.current-row>td{
    background-color: rgba(102, 177, 255, .4) !important;
  }
  .el-table--border th{
    padding: 0;
    background: #ebf1f6;
  }
  .el-table{
    color: #333;
  }
  .el-table--small td{
    padding: 4px 0;
  }
  .el-table .cell{
    white-space: nowrap;
  }
  .el-table .cell i{
    vertical-align: top;
  }
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .el-table__fixed-right::before, .el-table__fixed::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
    background-color: #ebeef5;
    z-index: 4;
  }

</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-pagination
    background: #fff
    /deep/ .el-input__inner
      height: 22px
      line-height: 22px
    /deep/ .el-input__icon
      line-height: 22px
</style>
