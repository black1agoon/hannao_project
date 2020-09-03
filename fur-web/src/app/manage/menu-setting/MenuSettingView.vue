<template>
  <section class="menu-setting-view">
    <div class="menu-tree-container">
      <div class="tree-toolbar">
        <el-button v-for="btn in treeButtons" :key="btn.id"
                   :icon="btn.icon" type="text"
                   @click="handleButtonClick(btn)">
        </el-button>
        <el-popover placement="bottom" trigger="hover">
          <el-switch class="setting-switch" v-model="dragMenus"
                     :active-text="$t('app.system.pages.menuSetting.dragNode')"
                     active-color="#13ce66" inactive-color="lightgray">
          </el-switch>
          <el-switch class="setting-switch" v-model="changeMenus"
                     :active-text="$t('app.system.pages.menuSetting.changeNode')"
                     active-color="#13ce66" inactive-color="lightgray">
          </el-switch>
          <el-button type="text" icon="el-icon-setting" slot="reference"></el-button>
        </el-popover>
      </div>
      <el-tree ref="tree" :data="treeData" show-checkbox
               node-key="id" :props="{ label: 'text' }"
               highlight-current
               :draggable="dragMenus"
               @check="handleTreeCheck"
               @node-drag-end="onDragEnd"
               @node-drop="handleNodeDrop"
               @node-click="handleNodeClick">
      </el-tree>
    </div>

    <div class="menu-form">
      <el-form v-model="editingMenu" :disabled="!currentMenu">
        <el-button type="primary" :disabled="!readyToSave" size="small" @click="saveMenu">
          {{ $t('app.system.save') }}
        </el-button>
        <el-button v-if="showUseRoot" type="default" size="small" @click="useRootParent">
          {{ $t('app.system.pages.menuSetting.useRoot') }}
        </el-button>
        <el-form-item v-for="field in menuFormFields" :key="field.name"
                      :label="field.label" label-width="60px" size="small">
          <el-image v-if="field.name === 'picUrl'"
                    :src="editingMenu.picUrl || ''" class="icon-preview"
                    @click.native="selectIcon">
            <div slot="error" class="failed-icon">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <el-input v-else v-model="editingMenu[field.name]" size="small" :readonly="field.readonly"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="false" class="feature-table">
      <data-table ref="table" :columns="tableColumns" :pagination="false" :loader="tableLoader"
                  :features="true" :buttons="tableButtons" :actions="featureActions"
                  :reload-trigger="editingMenu">
      </data-table>
    </div>

    <form-dialog ref="formDialog" :title="getDialogTitle" label-width="120px"
                 :form-fields="featureFormFields" :form-rules="formRules"
                 :actions="{ save: saveFeature }">
    </form-dialog>

    <icon-select-dialog ref="iconDialog" @select="updateIcon"></icon-select-dialog>
  </section>
</template>

<script>
import { api } from '@/api'
import { DataTable, FormDialog } from '@/app/manage/components'
import IconSelectDialog from './IconSelectDialog'
import { featureButtons, menuProps, tableColumns, formRules } from './menu-setting.config'
import Tree from '@/utils/tree'

export default {
  name: 'MenuSettingView',

  components: {
    DataTable,
    FormDialog,
    IconSelectDialog,
  },

  data () {
    return {
      menuList: [],
      formAction: 'add',
      formRules,
      currentMenu: null,
      editingMenu: {},
      dragMenus: false,
      changeMenus: false,
      checkedKeys: [],
    }
  },

  computed: {
    treeButtons () {
      return featureButtons.filter(btn => btn.group === 1 && !btn.hidden)
    },
    treeData () {
      return new Tree(this.menuList).map(node => {
        node.disabled = !this.changeMenus
        return node
      }).toArray()
    },
    menuFormFields () {
      return menuProps.map(prop => ({
        ...prop,
        label: this.$t('app.system.pages.menuSetting.' + prop.name),
      }))
    },
    isEditingLeaf () {
      return this.editingMenu.id && !(this.currentMenu?.children?.length)
    },
    tableButtons () {
      return featureButtons.filter(btn => btn.group === 3 && !btn.hidden).map(btn => {
        return { ...btn, name: this.$t('app.system.' + btn.name), disabled: !this.isEditingLeaf }
      })
    },
    tableColumns () {
      return tableColumns.map(col => ({
        ...col,
        label: this.$t('app.system.pages.menuSetting.table.' + col.name),
      }))
    },
    featureFormFields () {
      return this.tableColumns
    },
    readyToSave () {
      return Boolean(this.editingMenu.title && this.editingMenu.parentName)
    },
    showUseRoot () {
      return this.editingMenu.parentName && !this.editingMenu.id && (this.editingMenu.parentName !== '/')
    },
    featureActions () {
      return {
        btnAddF: this.addFeature,
        btnEditF: this.editFeature,
        btnDelF: this.deleteFeature,
      }
    },
  },

  methods: {
    handleButtonClick (btn) {
      switch (btn.id) {
        case 'btnAdd':
          this.addMenu()
          break
        case 'btnDel':
          this.deleteMenu()
          break
      }
    },
    async handleNodeClick (node) {
      if (this.editingMenu.parentName && !this.editingMenu.id) {
        await this.$confirm(this.$t('app.system.pages.menuSetting.addConfirm'))
      }
      this.currentMenu = node
      this.editingMenu = {
        ...node.attributes,
        parentName: node.attributes.parentName || '/',
        title: node.text,
        id: node.id,
      }
    },
    handleNodeDrop (sourceNode, targetNode, dropType) {
      const point = ['inner', 'before', 'after'].indexOf(dropType)
      api.menu.order({
        source: sourceNode.key,
        target: targetNode.key,
        point,
      }).catch(() => {
        this.reloadTree()
      })
    },

    /**
     * Workaround for lost of checked state after dragging
     * @param node
     */
    onDragEnd (node) {
      if (this.checkedKeys.find(k => node.key === k)) {
        this.$refs.tree.setCheckedKeys(this.checkedKeys)
      }
    },

    /**
     * Update check state for cached nodes
     */
    handleTreeCheck (node, checkStates) {
      const currentCheckedKeys = checkStates.checkedKeys.concat(checkStates.halfCheckedKeys)
      if (currentCheckedKeys.includes(node.id)) {
        const checkedSet = new Set(this.checkedKeys)
        const nodesToCheck = currentCheckedKeys.filter(k => !checkedSet.has(k))
        this.updateMenus(nodesToCheck, false)
      } else {
        const currentCheckedSet = new Set(currentCheckedKeys)
        const nodesToUncheck = this.checkedKeys.filter(k => !currentCheckedSet.has(k))
        this.updateMenus(nodesToUncheck, true)
      }
      this.checkedKeys = currentCheckedKeys
    },

    useRootParent () {
      this.editingMenu.parentName = '/'
      this.editingMenu.parentGuid = null
    },

    selectIcon () {
      if (this.currentMenu) {
        this.$refs.iconDialog.open()
      }
    },
    updateIcon (icon) {
      this.editingMenu.picUrl = icon.src
    },

    reloadTree () {
      api.menu.getAllTree().then(data => {
        this.menuList = data
        this.checkedKeys = new Tree(data).flatFilterMap(menu => menu.checked, menu => menu.id)
        this.$refs.tree.setCheckedKeys(this.checkedKeys)
      })
    },
    reloadTable () {
      this.$refs.table.reload()
    },
    tableLoader () {
      return api.menu.getFeatureListByMenuGuid(this.editingMenu.id)
    },

    addMenu () {
      this.editingMenu = {
        parentGuid: this.currentMenu.id,
        parentName: this.currentMenu.text,
        title: '',
        url: '',
        memo: '',
        picUrl: '',
        isMobile: false,
      }
    },
    deleteMenu () {
      this.$confirm(this.$t('app.system.confirmDelete')).then(() => {
        api.menu.delete(this.editingMenu).then(() => {
          this.editingMenu = {}
          this.reloadTree()
        })
      })
    },
    saveMenu () {
      const path = new Tree(this.menuList).findPath(node => node.id === this.editingMenu.id)
      const parentGuid = this.editingMenu.parentGuid || (path && path[path.length - 2])?.id || ''
      api.menu.save({ ...this.editingMenu, parentGuid }).then(() => {
        this.editingMenu = {}
        this.reloadTree()
      })
    },
    updateMenus (listGuid, isHidden) {
      return api.menu.hiddenMenus({ listGuid, isHidden })
    },

    getDialogTitle (formData) {
      const action = formData?.id ? 'edit' : 'add'
      return [this.$t('app.system.' + action), this.$tc('app.system.pages.menuSetting.feature')].join(' ')
    },

    addFeature () {
      this.$refs.formDialog.open({ parentGuid: this.editingMenu.id })
    },
    editFeature (row) {
      if (!row || !row.id) {
        return this.$message(this.$t('app.system.selectOneRow'))
      }
      this.$refs.formDialog.open({ ...row })
    },
    deleteFeature (row) {
      if (!row || !row.id) {
        return this.$message(this.$t('app.system.selectOneRow'))
      }
      this.$confirm(this.$t('app.system.confirmDelete')).then(() => {
        api.menu.delete({ id: row.id }).then(() => {
          this.reloadTable()
        })
      })
    },
    saveFeature (formData) {
      if (!formData.title) {
        this.$message('')
      }
      return api.menu.saveFeature(formData).then(() => {
        this.reloadTable()
      })
    },
  },

  mounted () {
    this.reloadTree()
  },
}
</script>

<style scoped lang="scss">
.menu-setting-view {
  display: flex;
  height: 100%;

  .menu-tree-container {
    width: 20%;
    min-width: 180px;
    max-width: 250px;

    .tree-toolbar {
      text-align: left;
      padding: 0 10px;
    }
  }

  .menu-form {
    width: 30%;
    min-width: 250px;
    border-left: 1px solid #EBEEF5;
    border-right: 1px solid #EBEEF5;
    padding: 10px;

    .el-form {
      text-align: left;

      .el-button {
        margin-bottom: 10px;
      }
    }
  }

  .feature-table {
    width: 50%;
    min-width: 600px;
  }
}

.icon-preview {
  width: 44px;
  height: 44px;
  cursor: pointer;

  .failed-icon i {
    font-size: 40px;
  }
}

.el-popover__reference.el-button {
  margin-left: 10px;
}

.setting-switch.el-switch {
  display: block;
  user-select: none;

  &:first-child {
    margin-bottom: 10px;
  }
}
</style>
