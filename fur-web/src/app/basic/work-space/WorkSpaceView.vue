<template>
  <section class="work-space-view">
    <data-table name="workspace" :columns="tableColumns" :buttons="tableButtons" :loader="loadWorkSpacePage"
                :actions="workSpaceActions" :reload-trigger="searchCount">
      <template v-slot:barBefore="{ vm }">
        <search-bar :search-fields="searchFields" @search="vm.search"></search-bar>
      </template>
    </data-table>
    <form-dialog ref="dialog" :form-fields="formFields" :form-rules="formRules" :actions="workSpaceActions"
                 label-width="100px"></form-dialog>
    <la-export-dialog ref="exportDialog"></la-export-dialog>
  </section>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api';
import { api } from '@/api';
import { Messenger } from '@/helpers/Messenger';
import { translates } from '@/lang/i18n';
import { DataTable } from '@/components/data';
import { FormDialog, SearchBar } from '@/components/form';
import LaExportDialog from '@/components/base/LaExportDialog.vue';
import { WorkSpace, tableButtons, tableColumns, searchFields } from './work-space.config';
import { AnyObject } from '@/types';
import { makeFormRules } from '@/helpers/FormHelper';

const formFields = tableColumns.filter(col => col.group !== 'table');
const formRules = makeFormRules(formFields);

export default defineComponent({
  name: 'WorkSpaceView',
  components: {
    DataTable,
    FormDialog,
    SearchBar,
    LaExportDialog,
  },

  setup() {
    const dialog = ref() as Ref<Dialog>;
    const exportDialog = ref() as Ref<Dialog>;
    const searchCount = ref(0);
    const loadWorkSpacePage = (params: AnyObject) => api.workSpace.getPage(params);
    const workSpaceActions = {
      btnAdd: () => {
        dialog.value.open(null, { title: '新增加工点' });
      },
      btnEdit: (row: WorkSpace) => {
        dialog.value.open({ ...row }, { title: '编辑加工点' });
      },
      btnDelete: (row: WorkSpace) => {
        return Messenger.confirm(translates('common.confirmDelete')).then(() => {
          return api.workSpace.delete(row.id).then(() => {
            searchCount.value += 1;
          });
        });
      },
      btnExport: (_: never, params: AnyObject) => {
        exportDialog.value.open({
          title: '加工点',
          url: '/api/WorkingSpace/ExportWorkSpaceExcel',
          columns: tableColumns,
          params,
        });
      },
      save: (formData: WorkSpace) => {
        const action = formData.id ? 'update' : 'add';
        return api.workSpace[action](formData).then(() => {
          searchCount.value += 1;
        });
      },
    };
    return {
      dialog,
      exportDialog,
      tableButtons,
      tableColumns,
      formFields,
      formRules,
      searchFields,
      workSpaceActions,
      searchCount,
      loadWorkSpacePage,
    };
  },
});
</script>

<style scoped>
.work-space-view {
  width: 100%;
  height: 100%;
}
</style>
