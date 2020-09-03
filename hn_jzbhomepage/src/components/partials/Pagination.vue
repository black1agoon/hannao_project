<template>

  <div class="show-more pagination">
    <div class="pure-button-group" role="group">
      <span class="pure-button"
            :class="{'pure-button-disabled': page <= 1}"
            @click="prevPage()">
        上一页
      </span>
      <span v-for="n in totalPage()"
            v-if="Math.abs(page - n) < 4" @click="gotoPage(n)"
            :class="{'pure-button-active': n == page}" class="pure-button">
        {{ n }}
      </span>
      <span class="pure-button"
            :class="{'pure-button-disabled': page >= totalPage()}"
            @click="nextPage()">
        下一页
      </span>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'pagination',
    props: {
      total: {
        type: Number,
        default: 0
      },
      initPage: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 4
      }
    },
    data () {
      return {
        page: this.initPage
      }
    },
    methods: {
      totalPage: function () {
        return Math.ceil(this.total / this.pageSize)
      },
      gotoPage: function (n) {
        if (!this.postType) {
          this.$router.push({query: {page: n}})
        }
        this.page = n
        this.$emit('page-changed', n)
      },
      nextPage: function () {
        if (this.totalPage() > this.page) {
          this.gotoPage(+this.page + 1)
        }
      },
      prevPage: function () {
        if (this.page > 1) {
          this.gotoPage(this.page - 1)
        }
      }
    }
  }
</script>

<style scoped>
.more_info .pure-button-group {
  padding: 20px 0 40px;
}
.more_info .pure-button-group .pure-button-active {
  box-shadow: 0 0 0 1px rgba(0,0,0, 0.10) inset, 0 0 6px rgba(0,0,0, 0.4) inset;
}
.more_info .pure-button {
  font-size: 12px;
}
.more_info .pagination .pure-button {
  background-color: inherit;
  border-right: none;
}
</style>
