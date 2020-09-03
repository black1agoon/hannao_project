<template>
  <el-dialog :title="dialogTitle"
             :visible.sync="dialogVisible"
             :width="width"
             :before-close="handleDialogClose" @close="onClose">
    <el-form ref="form" :model="formData" :label-width="labelWidth || '80px'" :inline="inline" :rules="reformRules">
      <el-form-item v-for="field in formFields" :key="field.name" :style="field.style"
                    :class="{ 'custom-style': field.style }"
                    :label="field.label" :prop="field.name" :size="size">
        <image-uploader v-if="field.type === 'image'" :action="field.action" :data="field.data"
                        :list-type="field.listType" :file-list="formData[field.fileList]"
                        v-model="formData[field.name]"
                        :on-remove="(...args) => handleImageUpdate(field, ...args)"
                        :on-success="(...args) => handleImageSuccess(field, ...args)">
        </image-uploader>
        <el-radio-group v-else-if="field.type === 'radio'" v-model="formData[field.name]" :size="size">
          <el-radio v-for="(op, idx) in field.options" :key="idx" :label="op.value" border>{{ op.label }}</el-radio>
        </el-radio-group>
        <tree-select v-else-if="field.type === 'tree-select'" v-model="formData[field.name]" :size="size"
                     :loader="field.loader" :props="field.props"></tree-select>
        <filter-select v-else-if="field.type === 'select'" v-model="formData[field.name]" :size="size"
                       :loader="field.loader" @change="val => updateText(field, val)"></filter-select>
        <el-input v-else-if="field.type === 'number'" v-model.number="formData[field.name]" :size="size"
                  :placeholder="field.placeholder || '请输入'"></el-input>
        <el-input v-else v-model="formData[field.name]" :size="size"
                  :type="field.type || 'text'" :rows="field.rows"
                  :placeholder="field.placeholder || '请输入'"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close" :size="size">{{ labels.close }}</el-button>
      <el-button type="primary" @click="save" :size="size">{{ labels.save }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import FilterSelect from './FilterSelect'
import TreeSelect from './TreeSelect'
import ImageUploader from './ImageUploader'
import { translates } from '@/lang/i18n'

export default {
  name: 'FormDialog',
  components: {
    ImageUploader,
    FilterSelect,
    TreeSelect,
  },
  props: {
    title: {},
    actions: {},
    formFields: {},
    formRules: {},
    labelWidth: {},
    inputOptions: {},
    width: {
      default: '30%',
    },
    inline: {
      default: false,
    },
    size: {
      default: 'small',
    },
    customLabels: {},
  },
  data () {
    return {
      dialogVisible: false,
      formData: {},
      customTitle: '',
    }
  },

  computed: {
    reformRules () {
      return this.formFields && this.formRules ? Object.fromEntries(this.formFields.map(({ name, label }) => {
        return [name, (this.formRules[name] || []).map((rule) => {
          if (rule.required) {
            rule.message = translates('common.fieldRequired', { field: label })
          }
          return rule
        })]
      })) : {}
    },
    dialogTitle () {
      return typeof this.title === 'function' ? this.title(this.formData) : this.title || this.customTitle || ''
    },
    labels () {
      return {
        save: this.customLabels?.save || translates('common.save'),
        close: this.customLabels?.close || translates('common.close'),
      }
    },
  },

  methods: {
    handleDialogClose (done) {
      this.$confirm(translates('common.confirmClose')).then(done || this.close).catch(() => {
        // pass
      })
    },
    onClose () {
      this.formData = {}
      if (typeof this.actions.afterClose === 'function') {
        this.actions.afterClose(this)
      }
    },
    handleImageUpdate (field, file, fileList) {
      if (typeof field.handler === 'function') {
        return field.handler({}, file, fileList, this.formData)
      }
    },
    handleImageSuccess (field, resp, file, fileList) {
      if (typeof field.handler === 'function') {
        return field.handler(resp, file, fileList, this.formData)
      }
    },
    updateText (field, val) {
      if (field.textField) {
        this.formData[field.textField] = val.label
      }
    },
    open (formData, config) {
      this.formData = formData || {}
      this.dialogVisible = true
      if (config && config.title) {
        this.customTitle = config.title
      }
    },
    close () {
      this.dialogVisible = false
    },
    save () {
      if (typeof this.actions.save === 'function') {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.actions.save(this.formData).then(() => {
              this.close()
            })
          }
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.el-form {
  display: flex;
  flex-wrap: wrap;
  margin-right: 40px;
}
</style>
