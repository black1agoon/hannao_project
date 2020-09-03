<template>
  <div class="table-wrapper">
    <el-table
        ref="table"
        class="table"
        :row-class-name="options.rowClassName"
        :data="options.data"
        :span-method="options.objectSpanMethod"
        :cell-style="cellStyle"
        :header-cell-style="headerCellStyle"
        style="width: 100%"
        :size="size"
        height="数值无关紧要，但必须要设置"
        header-row-class-name="header-class"
        :highlight-current-row="highlightCurrentRow"
        @cell-click="(...params) => todoEvent('cellClick', ...params)"
        @selection-change="(...params) => todoEvent('handleSelectionChange', ...params)"
        @row-click="(...params) => todoEvent('rowClick', ...params)"
        @row-dblclick="(...params) => todoEvent('rowDblclick', ...params)">
      <el-table-column
          v-if="showIndex"
          type="index"
          align="center"
          width="40"
          :index="indexMethod">
      </el-table-column>
      <el-table-column
          v-if="showSelection"
          type="selection"
          align="center"
          width="50"
          fixed>
      </el-table-column>
      <slot name="prev"></slot>
      <template v-for="(item) in (options.columns)">
        <template v-if="item.slot">
          <slot :name="item.prop"></slot>
        </template>
        <el-table-column
            v-else-if="item.click && item.type !== 'picture'"
            :key="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :align="item.align || 'center'"
            :sortable="item.sortable">
          <template slot-scope="scope">
          <span class="click-span" @click="handleClick(scope.row, item.prop)">{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--            v-else-if="item.type === 'picture'"-->
<!--            :key="item.prop"-->
<!--            :label="item.label"-->
<!--            :width="item.width"-->
<!--            :min-width="item.minWidth"-->
<!--            :fixed="item.fixed"-->
<!--            :align="item.align"-->
<!--            :sortable="item.sortable">-->
<!--          <template slot-scope="scope">-->
<!--            <div class="image-wrap">-->
<!--              <img v-if="scope.row[item.prop]"-->
<!--                   :src="helper.getImgUrl(scope.row[item.prop])">-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column
            v-else-if="item.showTips"
            :key="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :align="item.align || 'center'"
            :sortable="item.sortable">
          <template slot-scope="scope" >
            <el-tooltip :content="scope.row[item.prop]"
                        placement="bottom-start" effect="light">
              <span>{{scope.row[item.prop]}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.columns && item.columns.length > 0"
          :key="item.prop"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :align="item.align || 'center'"
          :sortable="item.sortable">
          <el-table-column
              v-for="(it, index) in (item.columns)"
              :prop="it.prop"
              :key="it.prop + index"
              :label="it.label"
              :width="it.width"
              :min-width="it.minWidth"
              :fixed="it.fixed"
              :align="it.align || 'center'"
              :sortable="it.sortable">
          </el-table-column>
        </el-table-column>
        <el-table-column
            v-else
            :prop="item.prop"
            :key="item.prop"
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
        :layout="layout"
        :small="false"
        background
        :total="options.total">
      <div class="slot-refresh">
        <span class="fa fa-refresh" @click="refresh"></span>
      </div>
    </el-pagination>
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
          currentPage: 1,
          columns: []
        })
      },
      size: {
        type: String,
        default: 'medium'
      },
      cellStyle: Function,
      headerCellStyle: Function,
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
        default: 'prev, pager, next, sizes, jumper'
      },
      showRefresh: {
        type: Boolean,
        default: true
      },
      highlightCurrentRow: {
        type: Boolean,
        default: false
      }
    },
    components: {
      //
    },
    data() {
      return {
        currentPage: 1,
        selectionList: []
      }
    },
    methods: {
      indexMethod(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1
      },
      todoEvent(name, ...params) {
        if (this.options[name]) {
          this.options[name](...params)
        }
      },
      handleSizeChange(pageSize) {
        this.options['reload']('rows', pageSize)
        // this.$emit('reloadTable', 'pageSize', pageSize)
      },
      handleCurrentChange(page) {
        this.currentPage = page
        this.options['reload']('page', page)
        // this.$emit('reloadTable', 'page', page)
      },
      refresh() {
        this.options['reload']()
      },
      callByName(fn, ...args) {
        this.$refs.table[fn].call(this, ...args)
      },
      columnsSort(list) {
        // return list.sort((a, b) => a.req - b.req)
        return list
      },
      handleClick(row, prop) {
        this.$emit('fieldClick', row, prop)
      }
    },
    watch: {
      'currentPage'() {
        if (this.options.data.length === 0) {
          this.$emit('reloadTable', 'page', this.currentPage)
        }
      }
    },
    mounted() {
      //
    }
  }
</script>

<style lang="sass" scoped>
  .table-wrapper
    display: flex
    flex-direction: column
    flex: 1
    width: 100%
    height: 100%
    /*padding: 0 10px*/
    box-sizing: border-box
    /*background: #ebf1f6*/
    .table
      flex: 1
      .click-span
        font-weight: bold
        color: #409eff
        cursor: pointer
      .image-wrap
        width: 100%
        height: 100%
        line-height: 0 !important
        img
          width: 100%
          height: 50px
          cursor: pointer
    .pagination
      padding: 5px
      border-bottom: 1px solid #eee
      text-align: left
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
  ::v-deep
    .header-class
      color: #000
    .el-table .cell
      white-space: nowrap !important
  .el-pagination
    background: #fff
    ::v-deep
      .el-input__inner
        height: 22px
        line-height: 22px
      .el-input__icon
        line-height: 22px
</style>

