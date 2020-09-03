<template>
  <section class="style-view">
    <data-tree :buttons="treeButtons" :loader="loadStyleSortTree" :props-map="treePropsMap" :default-expand-all="true"
               :actions="sortActions" :reload-trigger="state.reloadTreeCount"></data-tree>
    <data-table name="style" :columns="tableColumns" :buttons="tableButtons" :loader="loadStylePage" :actions="actions"
                :reload-trigger="tableCount">
      <template v-slot:barBefore="{ vm }">
        <search-bar :search-fields="searchFields" @search="vm.search"></search-bar>
      </template>
    </data-table>
    <form-dialog ref="sortDialog" :form-fields="sortFields" :actions="sortActions"></form-dialog>
    <la-export-dialog ref="exportDialog"></la-export-dialog>
  </section>
</template>

<script lang="ts">
import { DataTree, DataTable } from '@/components/data';
import { FormDialog, SearchBar } from '@/components/form';
import LaExportDialog from '@/components/base/LaExportDialog.vue';
import { sortFields, tableButtons, tableColumns, treeButtons } from './style.config';
import { api } from '@/api';
import { makeSearchFields } from '@/helpers/FormHelper';
import { defineComponent, reactive, Ref, ref } from '@vue/composition-api';
import { AnyObject } from '@/types';
import { Style, StyleProcess, StyleSort } from '@/app/basic/style/Style';
import { Messenger } from '@/helpers/Messenger';
import { translates } from '@/lang/i18n';
import { createNamespacedHelpers } from 'vuex-composition-helpers';

const { useMutations, useState } = createNamespacedHelpers('basicStyle');

export default defineComponent({
  name: 'StyleView',
  components: {
    FormDialog,
    LaExportDialog,
    DataTree,
    DataTable,
    SearchBar,
  },

  setup(props, { root }) {
    const sortDialog = ref() as Ref<Dialog>;
    const exportDialog = ref() as Ref<Dialog>;

    const treePropsMap = {
      label: 'name',
      children: 'styleSortSon',
    };

    const state = reactive({
      reloadTreeCount: 0,
      currentSort: {} as StyleSort,
    });

    const { styleTableCount: tableCount } = useState(['styleTableCount']);
    const { updateStyle, updateStyleTableCount } = useMutations(['updateStyle', 'updateStyleTableCount']);

    const searchFields = makeSearchFields(tableColumns);

    const loadStyleSortTree = () => {
      return api.styleSort.getTree().then((data: StyleSort) => {
        return [{ id: null, name: '所有', styleSortSon: data }];
      });
    };
    const loadStylePage = (params: AnyObject) => {
      return api.style.getPage({ ...params, StyleSortId: state.currentSort?.id });
    };

    const sortActions = {
      btnAddSort: () => {
        sortDialog.value.open(null, { title: '新增款式分类' });
      },
      btnEditSort: (node: StyleSort) => {
        sortDialog.value.open(JSON.parse(JSON.stringify(node)), { title: '编辑款式分类' });
      },
      btnDeleteSort: (node: StyleSort) => {
        return Messenger.confirm(translates('common.confirmDelete')).then(() => {
          return api.styleSort.delete(node.id).then(() => {
            state.reloadTreeCount += 1;
          });
        });
      },
      onChange: (node: StyleSort) => {
        state.currentSort = node;
        updateStyleTableCount();
      },
      save: (node: StyleSort) => {
        const action = node.id ? 'update' : 'add';
        return api.styleSort[action](node).then(() => {
          state.reloadTreeCount += 1;
        });
      },
    };

    const actions = {
      btnAdd: () => {
        updateStyle({});
        root.$router.push('/basic/style-details');
      },
      btnEdit: (style: Style) => {
        updateStyle({});
        return api.style.getDetails(style.id).then((details: AnyObject) => {
          updateStyle({
            style: { ...style },
            ...details,
            styleProcess: details.styleProcess.map((process: StyleProcess) => ({
              ...process,
              processImgList: process.processImgs.map((img: string) => ({ url: img })),
            })),
          });
          root.$router.push('/basic/style-details');
        });
      },
      btnDelete: (style: Style) => {
        return Messenger.confirm(translates('common.confirmDelete')).then(() => {
          return api.style.delete(style.id).then(() => {
            updateStyleTableCount();
          });
        });
      },
      btnExport: (_: never, params: AnyObject) => {
        exportDialog.value.open({
          title: '款式',
          url: '/api/Style/ExportStyleExcel',
          columns: tableColumns,
          params,
        });
      },
    };

    return {
      state,
      actions,
      tableCount,
      sortActions,
      sortFields,
      treeButtons,
      treePropsMap,
      tableButtons,
      tableColumns,
      searchFields,
      sortDialog,
      exportDialog,
      loadStyleSortTree,
      loadStylePage,
    };
  },
});
</script>

<style scoped lang="scss">
.style-view {
  height: 100%;

  .data-tree {
    float: left;
    height: 100%;
    border-right: solid 1px #e6e6e6;
  }

  .data-table {
    float: left;
    width: calc(100% - 200px);
  }
}
</style>
