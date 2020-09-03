<template>
  <eui-window ref="window"
              :options="windowOptions">
    <eui-layout :regions="PERMISS_REGIONS">
      <el-tabs slot="west" tab-position="left" type="border-card" style="width: 97px;height: 500px;">
        <el-tab-pane
          v-for="(sys, index) in subSystemList"
          :label="sys.name"
          :key="index">
        </el-tab-pane>
      </el-tabs>
      <div slot="center" style="padding: 20px;overflow: auto;position: absolute">
        <eui-tree
          ref="tree"
          :options="treeOptions">
        </eui-tree>
      </div>
    </eui-layout>
    <div slot="btns">
      <el-button type="primary" size="small" @click="permissionSure">确定</el-button>
      <el-button size="small" @click="permissionCancel">关闭</el-button>
    </div>
  </eui-window>
</template>

<script>
  import EuiTree from '@/components/common/form/EuiTree'
  import EuiWindow from '@/components/common/form/EuiWindow'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  const PERMISS_REGIONS = {
    west: {
      style: {
        width: '130px',
        border: false
      }
    },
    center: {}
  }
  export default {
    name: 'set-permission-window',
    components: {
      EuiTree,
      EuiWindow,
      EuiLayout
    },
    props: {
      setPermission: Function,
      getPermission: Function
    },
    data() {
      return {
        PERMISS_REGIONS,
        pquery: {
          id: null
        },
        subSystemList: [],
        windowOptions: {
          title: '权限设置',
          width: '40%'
        },
        treeOptions: {
          data: [],
          checkStrictly: false,
          showCheckbox: true,
          defaultExpandAll: true,
          defaultCheckedKeys: []
        }
      }
    },
    methods: {
      open(id) {
        this.pquery.id = id
        this.$refs.window.open()
        this.getPermission(this.pquery, this)
      },
      permissionSure() {
        let checked = this.$refs.tree.callByName('getCheckedNodes', false, true) || []
        // console.log(checked)
        this.setPermission(checked, this)
      },
      permissionCancel() {
        this.$refs.window.cancel()
      },
      tabClick(vObj) {
        // this.pquery.gradeId = this.subSystemList[vObj.index].id
        // this.getPermission(this.pquery, this)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  /deep/ .el-dialog__body
    padding: 0
</style>
