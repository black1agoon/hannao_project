<template>
  <div class="search-container">
    <slot></slot>
    <template v-for="(item) in searchInfo">
      <span class="label" :key="item.label">{{item.label}}:</span>
      <eui-input
          class="input"
          :type="item.type"
          :clearable="item.clearable"
          :key="item.value"
          :options="searchOptions[item.value]"
          v-model="searchdata[item.value]">
      </eui-input>
    </template>
    <slot name="next"></slot>
    <el-button class="button" type="primary" size="small" @click="search">
      <i class="btn-icon fa fa-search"></i>搜索
    </el-button>
    <el-button class="button" type="default" size="small" @click="reset">
      <i class="btn-icon fa fa-search"></i>重置
    </el-button>
  </div>
</template>

<script>
  import EuiInput from '@/components/common/form/EuiInput'
  export default {
    name: 'search-toolbar',
    components: {
      EuiInput
    },
    props: {
      searchInfo: {
        type: Array,
        default: () => []
      },
      searchOptions: {
        type: Object,
        default: () => ({})
      },
      query: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        searchdata: this.searchInfo.reduce((rst, cur) => {
          rst[cur.value] = this.query[cur.value]
          return rst
        }, {})
      }
    },
    methods: {
      search() {
        this.$emit('click', 'btnSearch', this.searchdata)
      },
      reset() {
        Object.keys(this.searchdata).forEach(key => {
          this.searchdata[key] = null
        })
        this.$emit('click', 'btnSearch', this.searchdata)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .search-container
    line-height: 40px
    font-size: 13px
    .button
      margin-left: 10px
    .label
      margin: 0 5px

    .select, .input
      width: 200px !important

    .search
      margin-left: 20px
</style>