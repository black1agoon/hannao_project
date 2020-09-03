<template>
  <eui-window ref="window" :options="windowOptions">
    <eui-tree
      ref="tree"
      :options="treeOptions">
    </eui-tree>
    <div slot="btns">
      <el-button type="primary" size="small" @click="sure">确定</el-button>
      <el-button size="small" @click="cancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import api from '@/api'
  import helper from '@/app/app.helpers'
  import EuiTree from '@/components/common/form/EuiTree'
  import EuiWindow from '@/components/common/form/EuiWindow'

  export default {
    name: 'dep-chose-window',
    components: {
      EuiTree,
      EuiWindow
    },
    data() {
      return {
        index: 0,
        windowOptions: {
          title: '部门选择',
          width: '30%'
        },
        treeOptions: {
          data: [],
          showCheckbox: true,
          expandOnClickNode: false,
          defaultExpandAll: true,
          checkChange: (item, checked) => {
            this.index++
            if (this.index % 2 === 0) {
              if (checked) {
                this.$refs.tree.callByName('setCheckedNodes', [item])
              } else {
                this.$refs.tree.callByName('setCheckedNodes', [])
              }
            }
          }
        }
      }
    },
    methods: {
      getTreeData() {
        api.department.getTree().then((data) => {
          this.treeOptions.data = helper.getTreeData(data, 'childDepartmentDtoList')
        })
      },
      sure() {
        this.checkedNode = this.$refs.tree.callByName('getCheckedNodes')[0] || {}
        this.$emit('checkedNode', this.checkedNode)
        this.$refs.window.cancel()
      },
      cancel() {
        this.$refs.window.cancel()
      },
      open() {
        this.$refs.window.open()
        this.$nextTick(() => {
          this.$refs.tree.callByName('setCheckedNodes', [])
        })
      }
    },
    mounted() {
      this.getTreeData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
