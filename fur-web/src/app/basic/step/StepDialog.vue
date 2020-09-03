<template>
  <el-dialog ref="dialog" :visible.sync="state.visible" :title="state.title"
             :before-close="handleDialogClose" @close="onClose">
    <el-form ref="form" :model="state.formData" :rules="stepFormRules">
      <el-form-item size="small" v-for="field in formFields" :key="field.name" :prop="field.name" :label="field.label"
                    label-width="92px">
        <image-uploader v-if="field.type === 'image'" action="/api/Style/UploadImg" :data="{ type: 35 }"
                        list-type="picture-card" :file-list="state.formData[field.name]"
                        :on-success="handleImageUpload" :on-remove="handleImageUpdate"></image-uploader>
        <el-select v-else-if="field.type === 'select'" v-model="state.formData[field.name]" size="small">
          <el-option v-for="(op, idx) in inputOptions[field.name]" :key="idx" :value="op.value" :label="op.label">
            {{ op.label }}
          </el-option>
        </el-select>
        <el-input v-else size="small" v-model="state.formData[field.name]" :type="field.type"
                  :placeholder="field.placeholder || '请输入'"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" size="small">{{ $t('common.close') }}</el-button>
      <el-button type="primary" @click="save" size="small">{{ $t('common.save') }}</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api';
import { AnyObject } from '@/types';
import { Step, stepTableColumns as formFields, stepTypes } from '@/app/basic/step/step.config';
import ImageUploader from '@/components/form/ImageUploader.vue';
import { api } from '@/api';
import { makeFormRules } from '@/helpers/FormHelper';
import { ElForm } from 'element-ui/types/form';
import { translates } from '@/lang/i18n';
import { Messenger } from '@/helpers/Messenger';

export default defineComponent({
  name: 'StepDialog',

  components: {
    ImageUploader,
  },

  setup(props, { emit }) {
    const dialog = ref();
    const form = ref();

    const state = reactive({
      title: '',
      visible: false,
      formData: {} as Step,
    });

    const stepFormRules = makeFormRules(formFields);

    const inputOptions = ref({
      roleId: [],
      type: stepTypes,
    });

    api.dropdown.roles().then((data) => {
      inputOptions.value.roleId = data.rows.map((item: AnyObject) => ({
        value: item.id,
        label: item.title,
      }));
    });

    const openDialog = ({ title, formData }: { title: string; formData: Step }) => {
      state.visible = true;
      state.title = title || state.title;
      state.formData = formData ? {
        ...formData,
        stepImgList: formData.stepImgs?.map((img: string) => ({ url: img })) || [],
      } : {} as Step;
    };
    const closeDialog = () => {
      state.visible = false;
    };

    const handleImageUpdate = (file: AnyObject, fileList: AnyObject) => {
      state.formData.stepImgList = fileList.map((file: AnyObject) => {
        if (file.response) {
          file.url = file.response.filePath;
        }
        return file;
      });
    };

    const handleImageUpload = (resp: AnyObject, file: AnyObject, fileList: AnyObject[]) => {
      handleImageUpdate(file, fileList);
      return Promise.resolve(resp.filePath);
    };

    const onClose = () => {
      state.formData = {} as Step;
    };

    const handleDialogClose = () => {
      Messenger.confirm(translates('common.confirmClose')).then(closeDialog).catch(() => {
        // pass
      });
    };

    const saveForm = () => {
      return (form.value as ElForm).validate((valid: boolean) => {
        if (valid) {
          const formData = JSON.parse(JSON.stringify(state.formData)) as Step;
          if (formData.badReasons) {
            formData.badReasons.replace(/，/g, ',');
          }
          formData.stepImgs = formData.stepImgList?.map((img: AnyObject) => img.url as string) || [];
          delete formData.stepImgList;
          const action = formData.id ? 'update' : 'add';
          api.step[action](formData).then(() => {
            closeDialog();
            emit('saved');
          });
        }
      });
    };

    return {
      state,
      dialog,
      form,
      formFields,
      stepFormRules,
      inputOptions,
      handleImageUpdate,
      handleImageUpload,
      onClose,
      handleDialogClose,
      open: openDialog,
      close: closeDialog,
      save: saveForm,
    };
  },
});
</script>

<style scoped lang="scss">
.el-dialog__wrapper ::v-deep .el-dialog {
  width: 800px;
  max-width: 100%;
  padding-right: 16px;
}

.el-form {
  display: flex;
  flex-wrap: wrap;
}

.el-form-item {
  flex-basis: 33.3%;
}

.el-form-item:nth-child(n+4) {
  flex-basis: 100%;
}
</style>