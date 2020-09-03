<template>
  <eui-layout :regions="REGIONS">
    <main-toolbar
        slot="north"
        :buttons="helper.getMainFilterButtons(buttons)"
        @click="onBtnClick">
    </main-toolbar>
    <eui-tree  slot="west" :options="treeOptions">
    </eui-tree>
    <eui-table
        class="west-tree"
        slot="center"
        ref="table"
        :showSelection="false"
        :highlight-current-row="false"
        :show-pagination="false"
        :options="tableOptions"
        @reloadTable="tableOptions.reload">
      <el-table-column label="操作" align="center" minWidth="200" fixed="right">
        <template slot-scope="scope">
          <el-button
              v-for="(btn, index) in helper.getTableButtons(buttons)"
              size="mini"
              type="text"
              :key="index"
              @click="onBtnClick(btn.btnKey, scope.row)">
            <i :class="['btn-icon fa', btn.logo]"></i>{{btn.name}}
          </el-button>
        </template>
      </el-table-column>
    </eui-table>
    <upload-file
        ref="uploadfile"
        :upload-api="uploadApi"
        title="导入模板"
        @reload="reload">
    </upload-file>
    <type-window
        :parent-id="parentId"
        ref="window"
        @reload="reload"
        :form-options="formOptions">
    </type-window>
  </eui-layout>
</template>

<script>
  import api from '@/api'
  import TabPane from '@/components/views/TabPane'
  import helper from '@/app/app.helpers'
  import MainToolbar from '@/components/common/tools/MainToolbar'
  import EuiTable from '@/components/common/form/EuiTable'
  import EuiLayout from '@/components/common/layout/EuiLayout'
  import EuiTree from '@/components/common/form/EuiTree'
  import UploadFile from '@/app/tools/UploadFile'
  import TypeWindow from './window/TypeWindow'
  import {TYPE} from './consumable.config'
  import config from '@/config'
  export default {
    name: 'consumable-type',
    _meta: {
      path: '/agency/consumable/type',
      title: '物料分类'
    },
    mixins: [TabPane],
    components: {
      EuiTree,
      EuiTable,
      MainToolbar,
      EuiLayout,
      UploadFile,
      TypeWindow
    },
    data() {
      return {
        helper,
        serverURI: config.serverURI,
        REGIONS: TYPE.REGIONS,
        buttons: helper.getMainButtons(),
        nodesData: null,
        formOptions: {
          parentId: []
        },
        parentId: null,
        treeOptions: {
          data: [],
          // defaultExpandAll: true,
          defaultExpandedKeys: [],
          expandOnClickNode: false,
          nodeClick: (data, node, vnode) => {
            this.treeOptions.defaultExpandedKeys = [data.id]
            this.tableOptions.data = this.traversalTree(this.getTreeNode(this.nodesData, data.id))
            this.parentId = data.id
          }
        },
        tableOptions: {
          data: [],
          total: 0,
          columns: [
            {prop: 'typeCode', label: '分类编号', align: 'center'},
            {prop: 'typename', label: '分类名称', align: 'center'},
            {prop: 'parentTypename', label: '上级分类', align: 'center'},
            {prop: 'istoolExplain', label: '是否工具', align: 'center'}
          ],
          rowClick: (row, event, column) => {
            // this.formdata = {...row}
          },
          reload: (name, val) => {
            this.query.page = name === 'page' ? val : this.query.page
            this.query.pageSize = name === 'pageSize' ? val : this.query.pageSize
            this.getData(this.query)
          }
        },
        tableRowsSelect: [],
        uploadApi: api.consumableType.importTemplate
      }
    },
    methods: {
      getTreeNode(treedata, nodeid) { // 根据节点id 获取该节点
        let nd = null
        let traverse = list => {
          for(let i = 0; i < list.length; i++) {
            if (list[i].id === nodeid) {
              nd = list[i]
            } else {
              list[i].consumableTypeDtoList && traverse(list[i].consumableTypeDtoList)
            }
          }
        }
        traverse(treedata)
        return nd
      },
      traversalTree(treenode) {
        let itemlist = []
        itemlist.push(treenode)
        let traverse = list => {
          list.forEach(i => {
            itemlist.push(i)
            i.consumableTypeDtoList && traverse(i.consumableTypeDtoList)
          })
        }
        traverse(treenode.consumableTypeDtoList)
        return itemlist
      },
      getTreeData(treedata, childProp) {
        let sortNodes = nodes => nodes.sort((a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime())
        let setName = node => {
          let hasChildren = node[childProp] && node[childProp].length > 0
          return {
            id: node.id,
            label: node.typeCode + '-' + node.typename,
            icon: hasChildren ? 'fa-folder' : 'fa-gear',
            resourceType: node.resourceType,
            children: hasChildren ? sortNodes(node[childProp]).map(setName) : undefined
          }
        }
        return sortNodes(treedata).map(setName)
      },
      getData() {
        api.consumableType.getTypeTree().then(data => {
          this.tableOptions.data = data.records
          this.tableOptions.total = data.total
          this.nodesData = data
          this.treeOptions.data = this.getTreeData(data, 'consumableTypeDtoList')
          this.formOptions.parentId = [{
            id: '0',
            label: '根目录',
            children: helper.getTreeData(data, 'consumableTypeDtoList', 'typename')
          }]
        })
      },
      onBtnClick(btnKey, row) {
        let btnHandlers = {
          btnAdd: () => {
            this.$refs.window.open()
          },
          btnEdit: (row) => {
            this.$refs.window.open({...row})
          },
          btnDelete: (row) => {
            this.$confirm(`是否删除:${row.typename}？`, '提示', {
              iconClass: 'fa fa-question-circle'
            }).then(() => {
              api.consumableType.delete(row.id).then(() => {
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
                this.getData(this.query)
              })
            }).catch(() => {
            })
          },
          btnSplitBatchImport0: () => {
            this.$refs.uploadfile.open()
          },
          btnSplitBatchImport1: () => {
            window.open(this.serverURI + api.consumableType.getTemplate())
          }
        }
        if (btnHandlers[btnKey]) {
          btnHandlers[btnKey].call(this, row)
        }
      },
      reload() {
        this.getData(this.query)
      }
    },
    mounted() {
      this.getData()
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .table-handle
    float: right
    .chose
      float: right
      font-size: 12px
      color: #555555
      line-height: 28px
    .chose, .batch-operation
      float: right
      margin-right: 35px
</style>

