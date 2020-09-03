<template>
  <div class="table-wrapper">
    <div class="top">
      <div class="title">{{title}}</div>
      <div class="tabs" v-show="tabList.length > 0">
        <dash-tabs
          :tab-list="tabList"
          @activeIndex="atvindex">
        </dash-tabs>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>

  import DashTabs from './DashTabs'
  export default {
    name: 'dash-line-block',
    components: {
      DashTabs
    },
    props: {
      title: String,
      showTabs: {
        type: Boolean,
        default: false
      },
      tabList: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
      }
    },
    methods: {
      atvindex(index) {
        this.$emit('atvindex', index)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .table-wrapper
    width: 100%
    height: 340px
    background: #ffffff
    position: relative
    .top
      position: absolute
      width: 100%
      z-index: 1000
      top: 0
      border-bottom: 1px solid #D8D8D8
      height: 40px
      line-height: 40px
      .title
        font-size: 14px
        color: #1890FF
        font-weight: 500
        padding: 0 25px
      .tabs
        position: absolute
        right: 20px
        top: 8px
        /*width: 180px*/
        height: 25px
        display: flex
</style>
