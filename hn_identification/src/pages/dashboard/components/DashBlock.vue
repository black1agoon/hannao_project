<template>
  <div class="table-wrapper">
    <div class="top" :style="{ borderBottom: title instanceof Array ? 'none' : '1px solid #D8D8D8'}">
      <el-tabs
          v-if="title instanceof Array"
          v-model="tabValue"
          :stretch="true"
          style="height: 40px"
          @tab-click="handleClick">
        <el-tab-pane
            v-for="(tit, idx) in title"
            :label="tit"
            :name="'tab' + idx">
        </el-tab-pane>
      </el-tabs>
      <div class="title" v-else>{{title}}</div>
      <div class="tabs">
        <dash-tabs
          v-show="tabList.length > 0"
          :tab-list="tabList"
          @activeIndex="atvindex">
        </dash-tabs>
      </div>
      <slot name="ltitle"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  import DashTabs from './DashTabs'
  export default {
    name: 'dash-table-block',
    components: {
      DashTabs
    },
    props: {
      title: [String, Array],
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
        tabValue: 'tab0'
      }
    },
    methods: {
      atvindex(index) {
        this.$emit('atvindex', index)
      },
      handleClick(tab) {
        this.$emit('titleTabIndex', tab.index)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.table-wrapper
  width: 100%
  height: 100%
  background: #ffffff
  display: flex
  flex-direction: column
  .top
    position: relative
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
      height: 25px
  .content
    flex: 1
    overflow: hidden
  /deep/ .el-tabs__nav
    height: 40px
    .el-tabs__item
      line-height: 40px
</style>
