<template>
  <div class="data-tree">
    <div class="tree-toolbar">
      <el-button v-for="btn in featureButtons" :key="btn.id"
                 :icon="btn.icon" type="text"
                 @click="handleButtonClick(btn)">
      </el-button>
    </div>
    <el-tree node-key="id" :props="propsMap" highlight-current :data="treeData"
             :default-expand-all="defaultExpandAll"
             :expand-on-click-node="false"
             @current-change="updateCurrent" @node-click="handleClick">
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'DataTree',
  props: {
    features: {
      type: [Array, Boolean],
      default: () => [],
    },
    buttons: {
      type: Array,
      default: () => [],
    },
    actions: {
      type: Object,
      default: () => ({}),
    },
    loader: {
      type: Function,
    },
    propsMap: {
      default: () => ({ label: 'text' }),
    },
    defaultExpandAll: {
      default: false,
    },
    reloadTrigger: {},
  },

  watch: {
    reloadTrigger () {
      this.reloadTree()
    },
  },

  computed: {
    featureKeys () {
      if (Array.isArray(this.features)) {
        return this.features.map((feat) => feat.dom)
      } else if (this.features) {
        return this.buttons.map((btn) => btn.id)
      } else {
        return []
      }
    },
    featureButtons () {
      return this.buttons.filter(btn => {
        return !btn.hidden && (btn.authorize === false || this.featureKeys.includes(btn.id))
      })
    },
    showToolbar () {
      return Boolean(this.featureButtons.length || this.$slots.bar || this.$slots.barBefore)
    },
  },

  data () {
    return {
      treeData: [],
      currentNode: null,
    }
  },

  methods: {
    handleButtonClick (btn) {
      const actionCallback = this.actions[btn.id]
      if (typeof actionCallback === 'function') {
        actionCallback(this.currentNode)
      }
    },
    updateCurrent (nodeData) {
      this.currentNode = nodeData
    },
    handleClick (nodeData) {
      console.log('nodeData', nodeData)
      if (typeof this.actions.onChange === 'function') {
        this.actions.onChange(nodeData)
      }
    },
    reloadTree () {
      if (typeof this.loader === 'function') {
        this.loading = true
        this.loader().then((data) => {
          this.loading = false
          this.treeData = data || []
        })
      }
    },
  },
  mounted () {
    this.reloadTree()
  },
}
</script>

<style scoped lang="scss">
.data-tree {
  width: 200px;
}

.tree-toolbar {
  text-align: left;
  padding: 0 10px;

  .el-button {
    margin-right: 8px;
  }
}
</style>