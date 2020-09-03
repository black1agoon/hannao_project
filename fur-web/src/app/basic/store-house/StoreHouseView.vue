<template>
  <section class="store-house-view">
    <data-table name="storeHouse" :columns="tableColumns" :buttons="tableButtons" :loader="loadStoreHousePage"
                search-key="storeHouseName" :actions="storeHouseActions" :reload-trigger="searchCount">
    </data-table>
    <form-dialog ref="dialog" :form-fields="tableColumns" :actions="storeHouseActions"
                 :form-rules="formRules" label-width="100px"></form-dialog>
    <la-export-dialog ref="exportDialog"></la-export-dialog>
  </section>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api';
import { api } from '@/api';
import { Messenger } from '@/helpers/Messenger';
import { translates } from '@/lang/i18n';
import { DataTable } from '@/components/data';
import { FormDialog } from '@/components/form';
import { StoreHouse, tableButtons, tableColumns } from './store-house.config';
import { AnyObject } from '@/types';
import LaExportDialog from '@/components/base/LaExportDialog.vue';
import { makeFormRules } from '@/helpers/FormHelper';

export default defineComponent({
  name: 'StoreHouseView',
  components: {
    DataTable,
    FormDialog,
    LaExportDialog,
  },

  setup() {
    const dialog = ref() as Ref<Dialog>;
    const searchCount = ref(0);
    const exportDialog = ref() as Ref<Dialog>;
    const loadStoreHousePage = (params: AnyObject) => api.storeHouse.getPage(params);
    const storeHouseActions = {
      btnAdd: () => {
        dialog.value.open(null, { title: '新增仓库' });
      },
      btnEdit: (row: StoreHouse) => {
        dialog.value.open({ ...row }, { title: '编辑仓库' });
      },
      btnDelete: (row: StoreHouse) => {
        return Messenger.confirm(translates('common.confirmDelete')).then(() => {
          return api.storeHouse.delete(row.id).then(() => {
            searchCount.value += 1;
          });
        });
      },
      btnExport: (_: never, params: AnyObject) => {
        exportDialog.value.open({
          title: '仓库',
          url: '/api/StoreHouse/ExportStoreHouseExcel',
          columns: tableColumns,
          params,
        });
      },
      save: (formData: StoreHouse) => {
        const action = formData.id ? 'update' : 'add';
        return api.storeHouse[action](formData).then(() => {
          searchCount.value += 1;
        });
      },
    };
    const formRules = makeFormRules(tableColumns)
    return {
      dialog,
      exportDialog,
      tableButtons,
      tableColumns,
      formRules,
      storeHouseActions,
      searchCount,
      loadStoreHousePage,
    };
  },
});
</script>

<style scoped>
.store-house-view {
  width: 100%;
  height: 100%;
}
</style>
