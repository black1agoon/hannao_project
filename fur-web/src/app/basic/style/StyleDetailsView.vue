<template>
  <section class="style-details-view">
    <div class="main-area">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/basic/style-details' }" @click.native="goToStyleView">款式</el-breadcrumb-item>
        <el-breadcrumb-item>款式详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="toolbar">
        <el-button type="primary" @click="save(2)" size="small">保存并提交</el-button>
        <el-button @click="save(1)" size="small">{{ $t('common.draft') }}</el-button>
        <el-button @click="goBack" size="small">{{ $t('common.back') }}</el-button>
      </div>

      <el-form ref="form" :model="formData" label-width="90px" :rules="formRules" inline>
        <el-form-item v-for="field in formFields" :key="field.name" size="small"
                      :label="field.label" :prop="field.name">
          <tree-select v-if="field.type === 'tree-select'" v-model="formData[field.name]" size="small"
                       :loader="field.loader" :props="field.props"></tree-select>
          <el-input v-else v-model="formData[field.name]" size="small"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <el-tabs v-model="state.activeTab">
      <el-tab-pane label="款式图片" name="image">
        <h4>款式图片上传：</h4>
        <image-uploader ref="imageUploader" action="/api/Style/UploadImg" :data="{ type: 33 }" list-type="picture-card"
                        :file-list="styleImages" :on-success="handleImageUpload" :on-remove="handleImageUpdate">
        </image-uploader>
      </el-tab-pane>

      <el-tab-pane label="颜色尺码" name="color">
        <el-form ref="colorForm" :model="state.sizeFormData" label-width="90px" :rules="sizeFormRules" inline>
          <el-form-item v-for="field in sizeFormFields" :key="field.name" size="small"
                        :label="field.label" :prop="field.name">
            <filter-select v-if="field.type === 'select'" :loader="field.loader"
                           v-model="state.sizeFormData[field.name]"></filter-select>
            <el-input v-else v-model="state.sizeFormData[field.name]" size="small"></el-input>
          </el-form-item>
          <el-form-item size="small">
            <el-button type="primary" size="small" @click="handleColorAdding">{{ $t('common.add') }}</el-button>
            <el-button size="small" @click="handleColorRemoving">批量移除</el-button>
          </el-form-item>
        </el-form>
        <data-table ref="colorTable" class="color-table" :columns="sizeTableColumns" :pagination="false"
                    row-key="sizeId" :data="styleColorTree" multi-select></data-table>
      </el-tab-pane>

      <el-tab-pane label="工序工艺工价" name="process">
        <data-table ref="processTable" :columns="processTableColumns" :buttons="processTableButtons"
                    :actions="processActions"
                    multi-select :data="styleProcess" @select="handleProcessSelection"
                    :pagination="false"></data-table>
        <file-input ref="fileInput" :display="false" confirm="导入该文件？"></file-input>
      </el-tab-pane>
    </el-tabs>

    <form-dialog ref="processDialog" width="80%" label-width="120px" :form-fields="processTableColumns"
                 :actions="processActions" :form-rules="processFormRules" :custom-labels="{ save: '确定' }">
    </form-dialog>
    <la-export-dialog ref="exportDialog"></la-export-dialog>
  </section>
</template>

<script lang="ts">
import { processTableButtons, processTableColumns, sizeTableColumns, tableColumns, } from './style.config';
import { makeFormRules } from '@/helpers/FormHelper';
import { ImageUploader, FilterSelect, TreeSelect, FormDialog } from '@/components/form/';
import { reactive, defineComponent, ref, Ref } from '@vue/composition-api';
import { DataTable } from '@/components/data';
import { AnyObject } from '@/types';
import { ElForm } from 'element-ui/types/form';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { ElUpload } from 'element-ui/types/upload';
import { StyleProcess, StyleColorAddForm, StyleColor } from './Style';
import { Messenger } from '@/helpers/Messenger';
import { randomString } from '@/utils/string';
import FileInput from '@/components/form/FileInput.vue';
import { api } from '@/api';
import LaExportDialog from '@/components/base/LaExportDialog.vue';

const { useState, useGetters, useActions, useMutations } = createNamespacedHelpers('basicStyle');

export default defineComponent({
  name: 'StyleDetailsView',

  components: {
    ImageUploader,
    DataTable,
    TreeSelect,
    FilterSelect,
    FormDialog,
    LaExportDialog,
    FileInput,
  },

  setup(props, { root }) {
    const state = reactive({
      activeTab: 'image',
      sizeFormData: {} as StyleColorAddForm,
      selectedProcess: null as StyleProcess | null,
    });

    const { formData, styleAttList, styleProcess } = useState(['formData', 'styleAttList', 'styleProcess']);
    const { styleImages, styleColorTree } = useGetters(['styleImages', 'styleColorTree']);
    const { updateStyle, updateAttList, addStyleColors, removeStyleColors, addStyleProcess, updateStyleProcess, removeStyleProcess, updateStyleTableCount } =
        useMutations(['updateStyle', 'updateAttList', 'addStyleColors', 'removeStyleColors', 'addStyleProcess', 'updateStyleProcess', 'removeStyleProcess', 'updateStyleTableCount']);
    const { saveStyle } = useActions(['resetState', 'saveStyle']);

    const form = ref() as Ref<ElForm>;
    const imageUploader = ref() as Ref<ElUpload>;
    const colorForm = ref() as Ref<ElForm>;
    const colorTable = ref();
    const processDialog = ref();
    const processTable = ref();
    const exportDialog = ref() as Ref<Dialog>;
    const fileInput = ref();

    const goBack = () => {
      updateStyle({});
      root.$router.back();
    };
    const goToStyleView = () => {
      root.$router.push('/basic/style');
    };

    const saveForm = (styleStatus = 1) => {
      return form.value.validate((valid) => {
        if (valid) {
          return saveStyle(styleStatus).then(() => {
            updateStyleTableCount();
            if (styleStatus === 2) {
              Messenger.success('保存成功');
              goBack();
            } else {
              Messenger.success('暂存成功');
            }
          });
        }
      });
    };

    const handleColorAdding = () => {
      colorForm.value.validate((valid) => {
        if (valid && state.sizeFormData.sizeId?.length) {
          addStyleColors(state.sizeFormData.sizeId.map(size => ({
            colorName: state.sizeFormData.colorName,
            sizeId: size.id,
            type: size.type,
            size: size.size,
          })));
          state.sizeFormData = {} as StyleColorAddForm;
        }
      });
    };

    const handleColorRemoving = () => {
      const checkedRows = colorTable.value.checkedRows.concat(colorTable.value.checkedRows.flatMap((row: StyleColor) => row.children?.flat()));
      if (checkedRows?.length) {
        removeStyleColors(checkedRows);
      }
    };

    const handleProcessSelection = (process: StyleProcess) => {
      state.selectedProcess = process;
    };

    const handleImageUpdate = (file: AnyObject, fileList: Array<AnyObject>) => {
      updateAttList(fileList.map(file => {
        return file.response ? {
          uid: file.uid,
          fileName: file.response.fileName,
          fileUrl: file.response.filePath,
        } : {
          id: file.id,
          uid: file.uid || file.id,
          styleId: file.styleId,
          fileName: file.name,
          fileUrl: file.url,
        };
      }));
    };

    const handleImageUpload = (resp: AnyObject, file: AnyObject, fileList: Array<AnyObject>) => {
      handleImageUpdate(file, fileList);
      return Promise.resolve(resp.filePath);
    }

    const processActions = {
      btnAddProcess: () => {
        processDialog.value.open({}, { title: '新增工序工艺工价' });
      },
      btnEditProcess: () => {
        if (state.selectedProcess) {
          processDialog.value.open(JSON.parse(JSON.stringify(state.selectedProcess)), { title: '编辑工序工艺工价' });
        }
      },
      btnRemoveProcess: () => {
        const checkedRows = processTable.value.checkedRows;
        if (checkedRows?.length) {
          removeStyleProcess(checkedRows);
        } else {
          Messenger.info('请勾选工序工艺');
        }
      },
      btnImportProcess: () => {
        fileInput.value.select().then((file: File) => {
          return api.style.importProcess(file).then((data: AnyObject) => {
            addStyleProcess(data.styleProcess || []);
          });
        });
      },
      btnExportProcess: (_: AnyObject, params: AnyObject) => {
        if (!formData.value.id) {
          return Messenger.info('未保存款式，不能导出');
        }
        exportDialog.value.open({
          title: '工艺单',
          url: '/api/Style/ExportStyleProcessExcel',
          columns: processTableColumns,
          params: {
            ...params,
            styleId: formData.value.id,
            fileName: '[工艺单] ' + [formData.value.styleCode, formData.value.styleName].join(' - '),
          },
        });
      },
      btnTemplateProcess: () => {
        return api.style.downloadTemplate();
      },
      save: (process: AnyObject) => {
        if (process.id) {
          return Promise.resolve(updateStyleProcess(process));
        } else {
          process.id = randomString(8, 'process_');
          return Promise.resolve(addStyleProcess(process));
        }
      },
    };

    const uploadActions = {
      save: ({ file }: AnyObject) => {
        return Promise.resolve(file);
      },
    };

    const formFields = tableColumns.filter(col => !col.group);
    const sizeFormFields = sizeTableColumns.filter(col => !col.group);

    return {
      // State
      state,
      formData,
      styleAttList,
      styleColorTree,
      styleProcess,
      styleImages,

      // Refs
      form,
      imageUploader,
      colorForm,
      colorTable,
      processDialog,
      processTable,
      exportDialog,
      fileInput,

      // Methods
      goBack,
      goToStyleView,
      save: saveForm,
      handleImageUpdate,
      handleImageUpload,
      handleColorAdding,
      handleColorRemoving,
      handleProcessSelection,

      // Config
      formFields,
      formRules: makeFormRules(formFields),
      sizeFormFields,
      sizeTableColumns,
      sizeFormRules: makeFormRules(sizeFormFields),
      processTableButtons,
      processTableColumns,
      processFormRules: makeFormRules(processTableColumns),
      processActions,
      uploadActions,
    };
  },
});
</script>

<style scoped lang="scss">
.el-breadcrumb {
  margin: 16px;
}

.toolbar {
  margin: 16px;
}

.el-tabs {
  margin: 0 16px;
}

.data-table {
  height: 400px;
}

.color-table ::v-deep .el-table__row--level-0 {
  font-weight: bold;
}
</style>
