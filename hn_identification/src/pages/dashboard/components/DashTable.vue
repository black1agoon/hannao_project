<template>
  <div class="table-wrapper">
    <el-table
      ref="table"
      class="table"
      :data="options.data"
      size="medium"
      :highlight-current-row="false">
      <slot name="prev"></slot>
      <el-table-column v-if="options.showSeq" label="排名" align="center" width="60">
        <template slot-scope="scope">
          <span :class="getSeqClass(scope.$index + 1)">{{getSeq(scope.$index + 1)}}</span>
        </template>
      </el-table-column>
      <template v-for="(item, index) in options.columns" >
        <el-table-column
            v-if="item.showTips"
            :key="index"
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
            v-else
            :key="'tips' + index"
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
      v-show="showPagination"
      class="pagination"
      :current-page.sync="options.currentPage"
      @current-change="handleCurrentChange"
      :page-size="5"
      :layout="'total, prev, pager, next'"
      :total="options.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'dash-table',
    props: {
      options: {
        type: Object,
        default: () => ({})
      },
      showPagination: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentPage: 1
      }
    },
    methods: {
      handleCurrentChange(page) {
        this.currentPage = page
        this.$emit('reloadTable', 'page', page)
      },
      getSeqClass(seq) {
        let _seq = seq + 5 * (this.currentPage - 1)
        return _seq === 1 || _seq === 2 || _seq === 3 ? 'seq-blue' : 'seq-normal'
      },
      getSeq(seq) {
        return seq + 5 * (this.currentPage - 1)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .table
    width: 100%
    box-sizing: border-box
    padding: 0 20px
    height: 245px
  /deep/ .el-table
    .cell
      color: #606266
  /deep/ .el-table__header-wrapper
    .cell
      color: #909399
  .el-pagination
    padding: 2px 25px
  .seq-blue
    display: inline-block
    width: 20px
    height: 20px
    border-radius: 50%
    background: #1989FA
    color: #ffffff
  .seq-normal
    display: inline-block
    width: 20px
    height: 20px
    border-radius: 50%
    background: #C0C4CC
    color: #ffffff
</style>
