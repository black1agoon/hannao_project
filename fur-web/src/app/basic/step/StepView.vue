<template>
  <section class="step-view">
    <data-table class="step-table" :features="features" :buttons="stepTableButtons" :columns="stepTableColumns"
                :loader="loadStepPage"
                :reload-trigger="state.searchCount" :actions="stepActions" @select="updateBadReasons">
      <template v-slot:barBefore="{ vm }">
        <search-bar :search-fields="searchFields" @search="vm.search"></search-bar>
      </template>
    </data-table>
    <data-table class="bad-table" :buttons="badTableButtons" :columns="badTableColumns"
                :data="state.badTableData" :pagination="false" :actions="badReasonActions"
                multi-select @selection-change="(checked) => updateCache('selectedBadReasons', checked)"></data-table>
    <step-dialog ref="stepDialog" @saved="reloadTable"></step-dialog>
    <form-dialog ref="badReasonDialog" :form-fields="badTableColumns" :actions="badReasonActions"></form-dialog>
    <la-export-dialog ref="exportDialog"></la-export-dialog>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from '@vue/composition-api';
import { api } from '@/api';
import { DataTable } from '@/components/data';
import { FormDialog, SearchBar } from '@/components/form';
import { BadReason, badTableButtons, badTableColumns, Step, stepTableButtons, stepTableColumns } from './step.config';
import { AnyObject } from '@/types';
import StepDialog from '@/app/basic/step/StepDialog.vue';
import { Messenger } from '@/helpers/Messenger';
import { translates } from '@/lang/i18n';
import { makeSearchFields } from '@/helpers/FormHelper';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import LaExportDialog from '@/components/base/LaExportDialog.vue';

const { useGetters } = createNamespacedHelpers('menus');

export default defineComponent({
  name: 'StepView',

  components: {
    DataTable,
    FormDialog,
    SearchBar,
    StepDialog,
    LaExportDialog,
  },

  setup() {
    const state = reactive({
      badTableData: [],
      searchCount: 0,
    });

    const { features } = useGetters(['features']);

    const cache = {
      selectedStep: {} as Step,
      selectedBadReasons: [] as BadReason[],
    };

    const stepDialog = ref() as Ref<Dialog>;
    const badReasonDialog = ref();
    const exportDialog = ref() as Ref<Dialog>;

    const loadStepPage = (params: AnyObject) => api.step.getPage(params);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateCache = (key: string, value: any) => {
      (cache as AnyObject)[key] = value;
    };

    const resetCache = () => {
      cache.selectedStep = {} as Step;
      cache.selectedBadReasons = [];
      state.badTableData = [];
    };

    const reloadTable = () => {
      state.searchCount += 1;
    };

    const updateBadReasons = (row: AnyObject) => {
      cache.selectedStep = {
        ...JSON.parse(JSON.stringify(row)),
        badReasons: row?.stepBadReasons?.map((reason: BadReason) => reason.reason)?.join() || [],
      };
      state.badTableData = row?.stepBadReasons || [];
    };

    const getSelectedStep = function() {
      if (cache.selectedStep?.id) {
        return Promise.resolve(cache.selectedStep);
      } else {
        Messenger.info(translates('common.selectOneRow'));
        return Promise.reject();
      }
    };

    const stepActions = {
      btnAdd: () => {
        stepDialog.value.open({ title: '新增工序' });
      },
      btnEdit: () => {
        getSelectedStep().then((step: Step) => {
          stepDialog.value.open({ title: '编辑工序', formData: step });
        });
      },
      btnDelete: () => {
        return getSelectedStep().then((step: Step) => {
          const msg = `工序名称: ${step.stepName}`;
          return Messenger.confirm(msg, translates('common.confirmDelete')).then(() => {
            return api.step.delete(step.id).then(() => {
              reloadTable();
            });
          });
        });
      },
      btnExport: (_: never, params: AnyObject) => {
        exportDialog.value.open({
          title: '工序',
          url: '/api/Step/ExportStepExcel',
          columns: stepTableColumns,
          params,
        });
      },
    };

    const badReasonActions = {
      btnAdd: () => {
        badReasonDialog.value.open({});
      },
      save: ({ reason }: BadReason) => {
        const badReasonsList = cache.selectedStep.badReasons.split(',');
        const badReasons = badReasonsList.find(r => r === reason) ? badReasonsList.join() : badReasonsList.concat([reason]).join();
        return api.step.update({
          ...cache.selectedStep,
          badReasons,
        }).then(() => {
          reloadTable();
          resetCache();
        });
      },
      btnDelete: () => {
        Messenger.confirm(translates('common.confirmDelete')).then(() => {
          const checkedReasons = cache.selectedBadReasons.map(r => r.reason);
          const badReasons = cache.selectedStep.badReasons.split(',').filter(reason => !checkedReasons.includes(reason)).join();
          return api.step.update({
            ...cache.selectedStep,
            badReasons,
          }).then(() => {
            reloadTable();
            resetCache();
          });
        });
      },
    };

    return {
      state,
      cache,
      features,
      // refs
      stepDialog,
      badReasonDialog,
      exportDialog,
      // const
      stepTableButtons,
      badTableButtons,
      stepTableColumns: stepTableColumns.filter(col => !col.group || col.group === 'table'),
      badTableColumns,
      searchFields: makeSearchFields(stepTableColumns),
      // methods
      loadStepPage,
      updateCache,
      updateBadReasons,
      reloadTable,
      // options
      stepActions,
      badReasonActions,
    };
  },
});
</script>

<style scoped lang="scss">
.step-view {
  height: 100%;
  width: 100%;
  position: relative;

  .step-table {
    width: calc(100% - 300px);
    float: left;
    border-right: solid 1px #e6e6e6;
  }

  .bad-table {
    width: 300px;
    float: left;
  }
}
</style>