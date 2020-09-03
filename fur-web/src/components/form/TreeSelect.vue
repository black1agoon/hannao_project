<template>
  <el-select ref="select" :value="valueTitle" :clearable="clearable" @clear="clearHandle" :size="size">
    <el-option :value="valueTitle" :label="valueTitle" class="options">
      <el-tree id="tree-option"
               ref="selectTree"
               :accordion="accordion"
               :data="resultOptions"
               :props="props"
               :node-key="props.value"
               :default-expand-all="!value"
               :default-expanded-keys="defaultExpandedKey"
               @node-click="handleNodeClick">
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'TreeSelect',
  props: {

    // 配置项
    props: {
      type: Object,
      default: () => ({
        value: 'id',             // ID字段名
        label: 'title',          // 显示名称
        children: 'children',    // 子级字段名
      }),
    },

    size: {},

    loader: {
      type: Function,
    },

    // 选项列表数据(树形结构的对象数组)
    options: { type: Array, default: () => [] },

    // 初始值
    value: { default: null },

    // 可清空选项
    clearable: { type: Boolean, default: true },

    // 自动收起
    accordion: { type: Boolean, default: false },

  },
  data () {
    return {
      valueId: null,
      valueTitle: '',
      defaultExpandedKey: [],
      remoteOptions: null,
      cacheOptions: null,
    }
  },
  mounted () {
    this.valueId = this.value    // 初始值
    this.remoteMethod('').then(() => {
      this.initHandle()
    })
  },
  methods: {
    // 初始化值
    initHandle () {
      if (this.valueId) {
        this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[this.props.label]     // 初始化显示
        this.$refs.selectTree.setCurrentKey(this.valueId)       // 设置默认选中
        this.defaultExpandedKey = [this.valueId]      // 设置默认展开
      }
      this.initScroll()
    },

    // 初始化滚动条
    initScroll () {
      this.$nextTick(() => {
        const scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
        const scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
        scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
        scrollBar.forEach(ele => ele.style.width = 0)
      })
    },

    // 切换选项
    handleNodeClick (node) {
      this.valueTitle = node[this.props.label]
      this.valueId = node[this.props.value]
      this.$emit('input', this.valueId)
      this.defaultExpandedKey = []
      this.$refs.select.handleClose()
    },

    // 清除选中
    clearHandle () {
      this.valueTitle = ''
      this.valueId = null
      this.defaultExpandedKey = []
      this.clearSelected()
      this.$emit('input', null)
    },

    // 清空选中样式
    clearSelected () {
      const allNode = document.querySelectorAll('#tree-option .el-tree-node')
      allNode.forEach((element) => element.classList.remove('is-current'))
    },

    remoteMethod (q = '') {
      if (typeof this.loader === 'function') {
        return this.loader(q).then(data => {
          this.remoteOptions = data
          if (!q) {
            this.cacheOptions = data
          }
        })
      }
      return Promise.resolve()
    },
  },

  watch: {
    value () {
      this.valueId = this.value
      this.initHandle()
    },
  },

  computed: {
    resultOptions () {
      return this.loader && this.remoteOptions || this.cacheOptions || this.options || []
    },
  },
}
</script>

<style scoped lang="scss">
.el-select {
  width: 100%;
}

.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}

.el-select-dropdown__item.selected {
  font-weight: normal;
}

ul li ::v-deep .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}

.el-tree-node__label {
  font-weight: normal;
}

.el-tree ::v-deep .is-current .el-tree-node__label {
  color: #409EFF;
  font-weight: 700;
}

.el-tree ::v-deep .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
