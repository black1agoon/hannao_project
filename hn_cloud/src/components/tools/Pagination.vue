<template>
  <div class="pagination">
    <ul>
      <li :class="['prev', {disabled: activePage === 1}]" @click="prev">上一页</li>

      <div class="page-wrapper">

        <li :class="['page', {active: activePage === 1}]" @click="go2page(1)">1</li>


        <li class="page nomean" v-show="activePage > 4 && page > 6">...</li>
        <li :class="['page', {active: pageIndex === activePage}]"
            v-show="pageIndex !== 1 && pageIndex !== page && (pageIndex >= activePage - 2 || pageIndex + 5 > page)"
            @click="go2page(pageIndex)"
            v-for="(pageIndex, index) in getCenterPageNum"
            :key="index">
          {{pageIndex}}
        </li>
        <li class="page nomean" v-show="(activePage < page - 3 && page > 6) || (activePage === 4 && page === 7)">...</li>


        <li :class="['page', {active: activePage === page}]" v-show="page !== 1" @click="go2page(page)">
          {{page}}
        </li>
      </div>

      <li :class="['next', {disabled: activePage === page}]" @click="next">下一页</li>

    </ul>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      pageSize: {
        type: Number,
        default: 5
      },
      total: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        activePage: 1
      }
    },
    computed: {
      page() {
        if (Math.ceil(this.total / this.pageSize) !== 0) {
          return Math.ceil(this.total / this.pageSize)
        } else {
          return 1
        }
      },
      getCenterPageNum() {
        if (this.activePage <= 4 && this.page >= 5) {
          return 5
        } else if (this.activePage > 4 && this.activePage < this.page - 1) {
          return this.activePage + 2
        } else {
          return this.page - 1
        }
      }
    },
    methods: {
      prev() {
        if (this.activePage > 1) {
          this.activePage--
          this.$emit('pageChange', this.activePage)
        } else {
          return false
        }
      },
      next() {
        if (this.activePage < this.total / this.pageSize) {
          this.activePage++
          this.$emit('pageChange', this.activePage)
        } else {
          return false
        }
      },
      go2page(pageindex) {
        this.activePage = pageindex
        this.$emit('pageChange', this.activePage)
      },
      initActivePage() {
        this.activePage = 1
      }
    },
    watch: {
      'currentPage'() {
        this.activePage = this.currentPage
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .pagination
    width: 100%
    font-family: 'Microsoft YaHei'
    .prev, .next
      width: 60px
      height: 30px
      line-height: 30px
      text-align: center
      border: 1px solid #e2e2e2
      &.disabled
        cursor: not-allowed
        color: #e2e2e2
    .prev
      border-right: none
    .next
      border-left: none
    li, .page-wrapper
      display: inline-block
      user-select: none
      font-size: 12px
      cursor: pointer
    .page
      width: 36px
      height: 30px
      line-height: 30px
      text-align: center
      border: 1px solid #e2e2e2
      margin-right: -1px
      &.nomean
        cursor: default
      &.active
        background: #353434
        border: 1px solid #353434
        color: #ffffff
</style>