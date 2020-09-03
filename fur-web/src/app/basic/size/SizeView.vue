<template>
  <section class="size-view">
    <data-table :columns="sizeTableColumns" :buttons="sizeTableButtons" :loader="loadSizeList"
                :actions="sizeActions" :reload-trigger="searchCount">
    </data-table>
    <form-dialog ref="dialog" :form-fields="sizeFormFields" :form-rules="sizeFormRules" :actions="sizeActions"></form-dialog>
    <size-edit-dialog ref="editDialog" @close="searchCount += 1"></size-edit-dialog>
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
import SizeEditDialog from './SizeEditDialog.vue';
import { Size, sizeFormFields, sizeTableButtons, sizeTableColumns } from './size.config';
import { AnyObject } from '@/types';
import LaExportDialog from '@/components/base/LaExportDialog.vue';
import { makeFormRules } from '@/helpers/FormHelper';

export default defineComponent({
  name: 'SizeView',
  components: {
    DataTable,
    FormDialog,
    SizeEditDialog,
    LaExportDialog,
  },

  setup() {
    const dialog = ref() as Ref<Dialog>;
    const editDialog = ref() as Ref<Dialog>;
    const exportDialog = ref() as Ref<Dialog>;
    const searchCount = ref(0);
    const loadSizeList = (params: AnyObject) => api.size.getPage(params);
    const sizeActions = {
      btnAdd: () => {
        dialog.value.open(null, { title: '新增尺码' });
      },
      btnEdit: (row: Size) => {
        editDialog.value.open(row, { title: '编辑尺码' });
      },
      btnDelete: (row: Size) => {
        return Messenger.confirm(`${row.type}: ${row.allSize}`, translates('common.confirmDelete')).then(() => {
          return api.size.deleteType(row.type).then(() => {
            searchCount.value += 1;
          });
        });
      },
      btnExport: (_: never, params: AnyObject) => {
        exportDialog.value.open({
          title: '尺码',
          url: '/api/Size/ExportSizeExcel',
          columns: sizeTableColumns,
          params,
        });
      },
      save: (formData: AnyObject) => {
        return api.size.add(formData).then(() => {
          searchCount.value += 1;
        });
      },
    };
    const sizeFormRules = makeFormRules(sizeFormFields);
    return {
      dialog,
      editDialog,
      exportDialog,
      sizeTableButtons,
      sizeTableColumns,
      sizeFormFields,
      sizeFormRules,
      sizeActions,
      searchCount,
      loadSizeList,
    };
  },
});
</script>

<style scoped>
.size-view {
  width: 100%;
  height: 100%;
}
</style>