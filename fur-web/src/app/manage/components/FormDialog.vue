<template>
  <el-dialog :title="dialogTitle"
             :visible.sync="dialogVisible"
             width="30%"
             :before-close="handleDialogClose">
    <el-form ref="form" :model="formData" :label-width="labelWidth || '80px'" :rules="reformRules">
      <el-form-item v-for="field in formFields" :key="field.name"
                    :label="field.label" :prop="field.name">
        <el-input v-model="formData[field.name]"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="close">{{ $t('app.system.close') }}</el-button>
        <el-button type="primary" @click="save">{{ $t('app.system.save') }}</el-button>
      </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'FormDialog',
    props: {
      title: {},
      actions: {},
      formFields: {},
      formRules: {},
      labelWidth: {},
    },
    data () {
      return {
        dialogVisible: false,
        formData: {},
      }
    },

    computed: {
      reformRules () {
        return Object.fromEntries(this.formFields.map(({ name, label }) => {
          return [name, (this.formRules[name] || []).map((rule) => {
            if (rule.required) {
              rule.message = this.$t('common.fieldRequired', { field: label })
            }
            return rule
          })]
        }))
      },
      dialogTitle () {
        return typeof this.title === 'function' ? this.title(this.formData) : this.title || ''
      },
    },

    methods: {
      handleDialogClose (done) {
        this.$confirm(this.$t('app.system.confirmClose')).then(done || this.close).catch(() => {
          console.log()
        })
      },
      open (formData) {
        this.formData = formData
        this.dialogVisible = true
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

<style scoped>

</style>
