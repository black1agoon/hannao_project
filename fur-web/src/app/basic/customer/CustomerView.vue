<template>
  <section class="customer-view">
    <data-table name="customer" :columns="tableColumns" :buttons="tableButtons" :loader="loadCustomerPage"
                search-key="customerName" :actions="customerActions" :reload-trigger="searchCount">
    </data-table>
    <form-dialog ref="dialog" :form-fields="formFields" :form-rules="formRules" :actions="customerActions"
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
import { FormDialog } from '@/components/form';
import { Customer, tableButtons, tableColumns } from './customer.config';
import { AnyObject } from '@/types';
import LaExportDialog from '@/components/base/LaExportDialog.vue';
import { makeFormRules } from '@/helpers/FormHelper';

const formFields = tableColumns.filter(col => col.group !== 'table');
const formRules = makeFormRules(formFields);

export default defineComponent({
  name: 'CustomerView',
  components: {
    DataTable,
    FormDialog,
    LaExportDialog,
  },

  setup() {
    const dialog = ref() as Ref<Dialog>;
    const exportDialog = ref() as Ref<Dialog>;
    const searchCount = ref(0);
    const loadCustomerPage = (params: AnyObject) => api.customer.getPage(params);
    const customerActions = {
      btnAdd: () => {
        dialog.value.open(null, { title: '新增客户' });
      },
      btnEdit: (row: Customer) => {
        dialog.value.open({ ...row }, { title: '编辑客户' });
      },
      btnDelete: (row: Customer) => {
        return Messenger.confirm(translates('common.confirmDelete')).then(() => {
          return api.customer.delete(row.id).then(() => {
            searchCount.value += 1;
          });
        });
      },
      btnExport: (_: never, params: AnyObject) => {
        exportDialog.value.open({
          title: '客户',
          url: '/api/Customer/ExportCustomerExcel',
          columns: tableColumns,
          params,
        });
      },
      save: (formData: Customer) => {
        const action = formData.id ? 'update' : 'add';
        return api.customer[action](formData).then(() => {
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
      customerActions,
      searchCount,
      loadCustomerPage,
    };
  },
});
</script>

<style scoped>
.customer-view {
  width: 100%;
  height: 100%;
}
</style>
