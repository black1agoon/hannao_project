<template>
  <el-transfer
    :filterable="filterable"
    :titles="titles"
    :filter-method="filterMethod"
    :filter-placeholder="filterHolder"
    v-model="transferValue"
    :data="transferData"
    @change="itemChanges">
  </el-transfer>
</template>

<script>
  export default {
    name: 'eui-transfer',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      filterable: {
        type: Boolean,
        default: true
      },
      filterHolder: {
        type: String,
        default: ''
      },
      titles: {
        type: Array,
        default: () => ['未绑定', '已绑定']
      },
      value: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        transferData: [],
        transferValue: [],
        filterMethod(query, item) {
          return item.filter.indexOf(query) > -1
        }
      }
    },
    methods: {
      itemChanges() {
        this.$emit('update:value', this.transferValue)
      }
    },
    mounted() {
    },
    watch: {
      'data' () {
        this.transferData = this.data.map((d, index) => ({
          label: d.label,
          key: d.key,
          filter: d.filter
        }))
      },
      'value' () {
        this.transferValue = this.value
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .el-transfer
    width: 100%
    height: 100%
    /deep/ .el-transfer-panel
      width: calc((100% - 96px) / 2)
      height: 100%
    /deep/ .el-transfer-panel__body
      height: calc(100% - 55px)
    /deep/ .el-transfer-panel__list
      padding: 0
      &.is-filterable
        height: calc(100% - 47px)
</style>
