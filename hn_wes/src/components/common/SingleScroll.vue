<template>
  <div class="scroll-box">
    <div class="scroll" :style="{marginTop: tableData.length > 5 ? '-59px' : 0}">
      <ul :class="['item', rowClasses, {deepcolor: !detail._ids}]"
          v-for="(detail, index) in viewList"
          :key="index"
          @animationend="onSlidingEnd">
        <li class="name">{{detail.productCode}}</li>
        <li class="sum">{{detail.sumQty}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'single-scroll',
    props: {
      tableData: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      rowClasses() {
        return {
          'kira-slide-in-up': this.isSliding,
        }
      },
      rowCount() {
        return this.tableData.length
      },
      viewList() {
        if (this.tableData.length <= 5) {
          return this.tableData.concat(Array.from({length: 5 - this.tableData.length}, () => ({}))).map((item, idx) => ({
            _ids: idx % 2,
            ...item
          }))
        } else if (this.tableData.length > 5) {
          let list = this.tableData.slice()
          if (this.tableData.length % 2 !== 0) {
            list.push({})
          }
          return list.concat(list).map((item, idx) => ({
            _ids: idx % 2,
            ...item
          })).slice(this.currentRow)
        } else {
          return []
        }
      }
    },
    data() {
      return {
        isSliding: false,
        slidingId: 0,
        currentRow: 0
      }
    },
    methods: {
      onSlidingEnd() {
        this.isSliding = false
      },
      startSliding() {
        if (!this.slidingId) {
          this.slidingId = window.setInterval(() => {
            this.currentRow = (this.currentRow + 1) % this.rowCount
            this.isSliding = true
          }, 2000)
        }
      },
      stopSliding() {
        if (this.slidingId) {
          window.clearInterval(this.slidingId)
        }
      }
    },
    mounted() {
      this.currentRow = this.rowCount - 1
      if (this.tableData.length > 5) {
        this.startSliding()
      }
    },
    watch: {
      'tableData'() {
        if (this.tableData.length > 5) {
          this.startSliding()
        }
      }
    },
    destroyed() {
      this.stopSliding()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../assets/stylus/scroll.styl'
.scroll-box
  height: 295px
  overflow: hidden
  .scroll
    .item
      display: flex
      justify-content: space-around
      height: 59px
      line-height: 59px
      font-size: 20px
      text-align: center
      &.deepcolor
        background: rgba(14, 95, 183, .3)
      li
        &.name
          flex: 2
          padding: 0 20px
          font-size: 22px
          color: #ffffff
          text-align: center
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
        &.sum
          flex: 1
          font-size: 22px
          color: #ffffff
          text-align: center
</style>